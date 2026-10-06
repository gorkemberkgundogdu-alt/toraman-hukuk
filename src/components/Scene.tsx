import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Original interlocking portal geometry, derived from the logo's rising curve. */
function portalGeometry(width: number, height: number, band: number, depth: number) {
  const outerRadius = width / 2;
  const spring = height - outerRadius;
  const shape = new THREE.Shape();
  shape.moveTo(-outerRadius, 0);
  shape.lineTo(-outerRadius, spring);
  shape.absarc(0, spring, outerRadius, Math.PI, 0, true);
  shape.lineTo(outerRadius, 0);
  shape.lineTo(outerRadius - band, 0);
  shape.lineTo(outerRadius - band, spring);
  shape.absarc(0, spring, outerRadius - band, 0, Math.PI, false);
  shape.lineTo(-outerRadius + band, 0);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true, bevelSegments: 5, steps: 1,
    bevelSize: 0.045, bevelThickness: 0.045, curveSegments: 72,
  });
  geometry.translate(0, -height / 2, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export default function Scene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = mount.current;
    if (!node) return;
    let renderer: THREE.WebGLRenderer | undefined;
    let frame = 0;
    let disposed = false;
    let visible = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 800px)');
    const ready = () => {
      document.documentElement.dataset.sceneReady = 'true';
      window.dispatchEvent(new CustomEvent('toraman:scene-ready'));
    };
    if (reduced.matches) { ready(); return; }
    const releases: (() => void)[] = [];
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      node.classList.remove('scene-ready');
      releases.reverse().forEach((release) => release());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile.matches ? 1.4 : 1.8));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      node.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
      camera.position.set(0, 0.25, 10.7);
      const pmrem = new THREE.PMREMGenerator(renderer);
      releases.push(() => pmrem.dispose());
      const room = new RoomEnvironment();
      releases.push(() => room.dispose());
      const env = pmrem.fromScene(room, 0.03);
      releases.push(() => env.dispose());
      scene.environment = env.texture;
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x343a4d, metalness: 0.98, roughness: 0.17,
        clearcoat: 1, clearcoatRoughness: 0.15, envMapIntensity: 1.65,
      });
      releases.push(() => material.dispose());
      const edgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4469ff, metalness: 0.82, roughness: 0.23,
        emissive: 0x0b1648, emissiveIntensity: 0.45,
      });
      releases.push(() => edgeMaterial.dispose());
      const group = new THREE.Group();
      const geometries: THREE.BufferGeometry[] = [];
      releases.push(() => geometries.forEach((geometry) => geometry.dispose()));
      const largeGeometry = portalGeometry(3.0, 5.7, 0.37, 0.52);
      geometries.push(largeGeometry);
      const smallGeometry = portalGeometry(2.8, 4.1, 0.34, 0.5);
      geometries.push(smallGeometry);
      const large = new THREE.Mesh(largeGeometry, material);
      large.rotation.y = -0.48;
      large.rotation.z = -0.17;
      large.position.set(-0.15, 0.1, 0);
      const small = new THREE.Mesh(smallGeometry, material);
      small.rotation.y = 0.78;
      small.rotation.z = 0.25;
      small.position.set(0.72, -0.66, 0.6);
      group.add(large, small);
      // A ribbon intersects both arches, connecting their otherwise independent forms.
      const ribbonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.9, -0.7, 0.4), new THREE.Vector3(-1.3, -0.2, 1.1),
        new THREE.Vector3(0, 0.1, 1.35), new THREE.Vector3(1.2, 0.65, 0.5),
        new THREE.Vector3(1.8, 1.1, -0.4),
      ]);
      const ribbonGeometry = new THREE.TubeGeometry(ribbonCurve, 90, 0.045, 10, false);
      geometries.push(ribbonGeometry);
      group.add(new THREE.Mesh(ribbonGeometry, edgeMaterial));
      scene.add(group);
      const key = new THREE.DirectionalLight(0xecf1ff, 4.0);
      key.position.set(-4, 6, 4);
      const blue = new THREE.PointLight(0x3158ff, 55, 12, 1.8);
      blue.position.set(2.5, 1.5, 3);
      const rim = new THREE.DirectionalLight(0xa7beff, 3.2);
      rim.position.set(4, -2, -3);
      scene.add(key, blue, rim, new THREE.AmbientLight(0x6173a6, 0.7));
      let targetProgress = 0;
      let currentProgress = 0;
      let pointerX = 0;
      let pointerY = 0;
      let time = 0;
      const resize = () => {
        const { width, height } = node.getBoundingClientRect();
        renderer!.setSize(width, height, false);
        renderer!.setPixelRatio(Math.min(window.devicePixelRatio, mobile.matches ? 1.4 : 1.8));
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        group.scale.setScalar(mobile.matches ? 0.95 : 1);
        camera.position.z = mobile.matches ? 8.7 : 10.7;
        scroll();
        if (visible && !reduced.matches) renderer!.render(scene, camera);
      };
      const scroll = () => {
        const practice = document.getElementById('alanlar');
        const top = practice ? practice.offsetTop : innerHeight;
        targetProgress = Math.max(0, Math.min(1, (window.scrollY - top * 0.3) / (top * 2.7)));
        const about = document.getElementById('yaklasim');
        const limit = mobile.matches ? innerHeight * 1.4 : (about?.offsetTop ?? 10000) + innerHeight;
        visible = window.scrollY < limit && !document.hidden && !reduced.matches && !contextLost;
        if (!frame && visible) render();
      };
      const pointer = (event: PointerEvent) => {
        if (mobile.matches || reduced.matches) return;
        pointerX = (event.clientX / innerWidth - 0.5) * 0.12;
        pointerY = (event.clientY / innerHeight - 0.5) * 0.07;
      };
      let contextLost = false;
      const render = () => {
        frame = 0;
        if (disposed || !visible) return;
        currentProgress += (targetProgress - currentProgress) * 0.045;
        time += 0.007;
        const drift = reduced.matches ? 0 : Math.sin(time) * 0.025;
        group.rotation.y = -0.25 + currentProgress * 1.25 + pointerX;
        group.rotation.z = -0.09 + currentProgress * 0.14;
        group.position.y = drift - currentProgress * 0.15 + pointerY;
        blue.position.y = 2.1 - currentProgress * 4;
        blue.color.setHSL(0.63 + currentProgress * 0.025, 1, 0.58);
        material.roughness = 0.17 + currentProgress * 0.06;
        renderer!.render(scene, camera);
        if (!reduced.matches || Math.abs(targetProgress - currentProgress) > 0.002) frame = requestAnimationFrame(render);
      };
      const visibility = () => { scroll(); };
      const changeMotion = () => {
        pointerX = pointerY = 0;
        node.classList.toggle('scene-ready', !reduced.matches && !contextLost);
        scroll();
      };
      const lost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        visible = false;
        cancelAnimationFrame(frame); frame = 0;
        node.classList.remove('scene-ready');
      };
      const restored = () => {
        contextLost = false;
        resize();
        if (!reduced.matches) node.classList.add('scene-ready');
      };
      window.addEventListener('resize', resize);
      window.addEventListener('scroll', scroll, { passive: true });
      window.addEventListener('pointermove', pointer, { passive: true });
      document.addEventListener('visibilitychange', visibility);
      reduced.addEventListener('change', changeMotion);
      renderer.domElement.addEventListener('webglcontextlost', lost);
      renderer.domElement.addEventListener('webglcontextrestored', restored);
      releases.push(() => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', scroll);
        window.removeEventListener('pointermove', pointer);
        document.removeEventListener('visibilitychange', visibility);
        reduced.removeEventListener('change', changeMotion);
        renderer?.domElement.removeEventListener('webglcontextlost', lost);
        renderer?.domElement.removeEventListener('webglcontextrestored', restored);
      });
      resize();
      scroll();
      if (!frame) render();
      node.classList.add('scene-ready');
      ready();
      return cleanup;
    } catch {
      cleanup();
      ready();
    }
  }, []);
  return <div className="scene-wrap" aria-hidden="true">
    <svg className="scene-fallback" viewBox="0 0 560 740" fill="none"><defs><linearGradient id="metal" x1="110" y1="80" x2="420" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#b9c6df"/><stop offset="0.25" stopColor="#171f36"/><stop offset="0.55" stopColor="#5678ff"/><stop offset="0.7" stopColor="#080c19"/><stop offset="1" stopColor="#8fa7d6"/></linearGradient></defs><path d="M145 655V230C145 55 405 55 405 230V655" stroke="url(#metal)" strokeWidth="46" transform="rotate(-12 280 370)"/><path d="M235 670V350C235 220 455 220 455 350V670" stroke="url(#metal)" strokeWidth="39" transform="rotate(16 330 420)"/><path d="M95 445C235 320 370 495 495 285" stroke="#4469ff" strokeWidth="5"/></svg>
    <div ref={mount} className="scene-canvas" />
  </div>;
}
