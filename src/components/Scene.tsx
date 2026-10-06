import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// The rising curve in Toraman's wordmark becomes the beam of a real balance.
// Every mesh is original geometry; no reference-site model or texture is used.
export default function Scene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = mount.current;
    if (!node) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 800px)');
    const releases: (() => void)[] = [];
    let renderer: THREE.WebGLRenderer | undefined;
    let frame = 0;
    let disposed = false;
    let contextLost = false;
    const ready = () => {
      document.documentElement.dataset.sceneReady = 'true';
      dispatchEvent(new CustomEvent('toraman:scene-ready'));
    };
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      node.classList.remove('scene-ready');
      releases.reverse().forEach(release => release());
      renderer?.dispose(); renderer?.domElement.remove();
    };
    if (motion.matches) { ready(); return; }
    try {
      renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'low-power' });
      renderer.setClearColor(0,0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = mobile.matches ? 0.98 : 1.10;
      node.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35,1,.1,60);
      camera.position.set(0,.15,13.2);
      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      releases.push(()=>room.dispose(),()=>pmrem.dispose());
      const env = pmrem.fromScene(room,.02);
      releases.push(()=>env.dispose());
      scene.environment = env.texture;
      const metal = new THREE.MeshPhysicalMaterial({ color:0x17295b, metalness:1, roughness:.18, clearcoat:1, envMapIntensity:.85 });
      const blueMetal = new THREE.MeshPhysicalMaterial({ color:0x405bfa, metalness:.93, roughness:.2, clearcoat:1, emissive:0x111c65, emissiveIntensity:.3 });
      releases.push(()=>metal.dispose(),()=>blueMetal.dispose());
      const geometries: THREE.BufferGeometry[] = [];
      releases.push(()=>geometries.forEach(g=>g.dispose()));
      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const add = (geometry:THREE.BufferGeometry, parent:THREE.Group = sculpture, material:THREE.Material = metal) => {
        geometries.push(geometry);
        const mesh = new THREE.Mesh(geometry,material); parent.add(mesh); return mesh;
      };
      const lathe = (points:number[][], parent:THREE.Group = sculpture) => add(new THREE.LatheGeometry(points.map(([x,y])=>new THREE.Vector2(x,y)),96),parent);
      // Broad stepped pedestal, tapering fluted column and polished pivot.
      lathe([[0,-3.05],[.95,-3.05],[1,-2.98],[1,-2.87],[.92,-2.8],[.77,-2.75],[.77,-2.62],[.55,-2.54],[.4,-2.44],[.29,-2.1],[.15,-1.9],[.11,1.7],[.2,1.88],[.2,2],[.11,2.12],[0,2.12]]);
      for (const y of [-2.73,-2.56,-1.96,1.68,1.93]) {
        const ring = add(new THREE.TorusGeometry(y < -2.5 ? .7 : .17,.026,10,64));
        ring.rotation.x = Math.PI/2; ring.position.y = y;
      }
      const finial = add(new THREE.SphereGeometry(.16,32,24)); finial.position.y=2.22; finial.scale.y=1.45;
      const beam = new THREE.Group(); beam.position.y=1.68; sculpture.add(beam);
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.85,0,0),new THREE.Vector3(-2.35,.03,0),new THREE.Vector3(-1.1,.55,0),
        new THREE.Vector3(0,.66,0),new THREE.Vector3(1.1,.55,0),new THREE.Vector3(2.35,.03,0),new THREE.Vector3(2.85,0,0),
      ]);
      add(new THREE.TubeGeometry(curve,100,.115,16,false),beam);
      const trim = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.85,-.04,.12),new THREE.Vector3(-1.15,.48,.12),new THREE.Vector3(0,.59,.12),new THREE.Vector3(1.15,.48,.12),new THREE.Vector3(2.85,-.04,.12),
      ]);
      add(new THREE.TubeGeometry(trim,90,.023,8,false),beam,blueMetal);
      // Hanging pans use three chains each, visibly connected to the beam.
      for (const side of [-1,1]) {
        const eye = add(new THREE.TorusGeometry(.13,.037,12,40),beam); eye.position.set(side*2.78,-.08,0);
        const hanger = new THREE.Group(); hanger.position.set(side*2.78,-.18,0); beam.add(hanger);
        const pan = lathe([[0,-2.4],[.12,-2.4],[.4,-2.34],[.66,-2.22],[.85,-2.03],[.9,-1.96],[.9,-1.91],[.84,-1.94],[.6,-2.16],[.3,-2.28],[0,-2.3]],hanger);
        pan.castShadow=false;
        const rim = add(new THREE.TorusGeometry(.88,.035,12,64),hanger); rim.rotation.x=Math.PI/2; rim.position.y=-1.94;
        for (let chain=0;chain<3;chain++) {
          const angle=chain*Math.PI*2/3;
          const end = new THREE.Vector3(Math.cos(angle)*.86,-1.95,Math.sin(angle)*.86);
          const path = new THREE.LineCurve3(new THREE.Vector3(0,0,0),end);
          add(new THREE.TubeGeometry(path,1,.014,6,false),hanger);
          for(let link=1;link<14;link++) {
            const loop=add(new THREE.TorusGeometry(.025,.006,4,8),hanger);
            loop.position.copy(end).multiplyScalar(link/14);
            loop.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.clone().normalize());
            loop.rotation.y += link%2*Math.PI/2;
          }
        }
      }
      const key = new THREE.DirectionalLight(0xffffff,2); key.position.set(-4,6,5);
      const cobalt = new THREE.PointLight(0x3456ff,100,25,1.6); cobalt.position.set(4,1,5);
      const rim = new THREE.DirectionalLight(0x9cabff,4); rim.position.set(-3,-1,-4);
      scene.add(key,cobalt,rim,new THREE.AmbientLight(0x9fa9d4,.65));
      let y = scrollY;
      let targetY = y;
      let opening = 0;
      let entered = false;
      let visible = !document.hidden;
      const lerp = THREE.MathUtils.lerp;
      const clamp = THREE.MathUtils.clamp;
      const positions = () => {
        const top=(id:string)=>document.getElementById(id)?.offsetTop ?? 0;
        return {practice:top('alanlar'),about:top('yaklasim'),team:top('ekip'),faq:top('sorular'),contact:top('iletisim')};
      };
      let stops=positions();
      const render = () => {
        frame=0;
        if(disposed || contextLost || !visible || motion.matches) return;
        y=lerp(y,targetY,.12);
        if(entered) opening=lerp(opening,1,.055);
        const p=clamp((y-stops.practice)/(stops.about-stops.practice),0,1);
        const a=THREE.MathUtils.smoothstep(y,stops.about-innerHeight*.7,stops.about);
        const t=THREE.MathUtils.smoothstep(y,stops.team-innerHeight*.8,stops.team-innerHeight*.05);
        const f=THREE.MathUtils.smoothstep(y,stops.faq-innerHeight*.5,stops.faq);
        const c=THREE.MathUtils.smoothstep(y,stops.contact-innerHeight*.6,stops.contact);
        const light=clamp(a*(1-t)+f,0,1);
        // Hero: full balance right. Practice: camera closes in and travels past the pans.
        // About: full object recedes into a white-lit field. Team: it moves to the margin.
        const heroX=mobile.matches ? 2.65 : 4.6;
        const travel=mobile.matches
          ? [{x:heroX,y:-.65,s:.92},{x:1.8,y:-.9,s:.88},{x:1.2,y:-1,s:.84},{x:.9,y:-1.1,s:.82},{x:.8,y:-1.2,s:.8},{x:.8,y:-1.2,s:.8}]
          : [{x:heroX,y:0,s:1.15},{x:4.2,y:-.3,s:1.25},{x:3.8,y:.2,s:1.32},{x:4.0,y:-.2,s:1.30},{x:3.7,y:.1,s:1.24},{x:4.2,y:0,s:1.18}];
        const segment=Math.min(4,Math.floor(p*5));
        const blend=THREE.MathUtils.smoothstep(p*5-segment,0,1);
        const from=travel[segment],to=travel[segment+1];
        const scale=mobile.matches ? lerp(.92,.8,p)*(1-.28*a)*(1-.45*t) : lerp(lerp(from.s,to.s,blend),.95,a)*(1-.22*t);
        const targetX=mobile.matches ? lerp(heroX,.8,p) : lerp(lerp(from.x,to.x,blend),4.4,a)+t*2.2-c*2;
        const targetHeight=mobile.matches ? lerp(-.65,-1.2,p) : lerp(lerp(from.y,to.y,blend),-.1,a)+t*.2;
        const logo=document.querySelector('.site-header .brand-logo')?.getBoundingClientRect();
        const viewHeight=2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.position.z;
        const originX=logo ? ((logo.left+logo.width/2)/innerWidth-.5)*viewHeight*camera.aspect : -3.3;
        const originY=logo ? (.5-(logo.top+logo.height/2)/innerHeight)*viewHeight : 2.4;
        sculpture.position.set(lerp(originX,targetX,opening),lerp(originY,targetHeight,opening),0);
        sculpture.scale.setScalar(scale*lerp(.07,1,opening));
        sculpture.rotation.set(.03+p*.07,lerp(-.32,.38,p)-a*.16+t*.2,-.035+p*.07);
        beam.rotation.z=Math.sin(p*Math.PI*2)*.035*(1-a);
        metal.color.setRGB(lerp(.035,.88,light),lerp(.055,.9,light),lerp(.18,.97,light));
        metal.roughness=lerp(.14,.28,light);
        key.intensity=lerp(mobile.matches?1.2:1.6,5,light); cobalt.intensity=lerp(mobile.matches?75:95,25,light);
        cobalt.position.x=lerp(5,-4,p); cobalt.position.y=lerp(2,-2,p);
        const bg=Math.round(lerp(2,250,light));
        document.body.style.setProperty('--flow-background',`rgb(${bg} ${bg} ${bg+Math.round((1-light)*2)})`);
        document.body.style.setProperty('--flow-ink',light>.55?'#09090c':'#fafafa');
        document.body.style.setProperty('--flow-muted',light>.55?'#52525d':'#b8b8c4');
        document.body.style.setProperty('--halo-opacity',String((1-light)*.32));
        document.querySelector('.site-header')?.classList.toggle('is-light',light>.55);
        node.style.opacity=String(mobile.matches ? lerp(1,.13,clamp((y-innerHeight*.55)/(innerHeight*.55),0,1)) : lerp(1,.55,t)*(1-.7*c));
        renderer!.render(scene,camera);
        if(Math.abs(targetY-y)>.4 || (entered && opening<.999)) frame=requestAnimationFrame(render);
      };
      const schedule=()=>{if(!frame && !disposed) frame=requestAnimationFrame(render);};
      const resize=()=>{
        const r=node.getBoundingClientRect();
        renderer!.setPixelRatio(Math.min(devicePixelRatio,mobile.matches?1.4:1.8));
        renderer!.setSize(r.width,r.height,false);
        camera.aspect=r.width/Math.max(1,r.height); camera.position.z=mobile.matches?13.8:13.2; camera.updateProjectionMatrix();
        stops=positions(); schedule();
      };
      const scroll=()=>{targetY=scrollY; schedule();};
      const enter=()=>{entered=true;schedule();};
      const visibility=()=>{visible=!document.hidden; schedule();};
      const changeMotion=()=>{node.classList.toggle('scene-ready',!motion.matches&&!contextLost); schedule();};
      const lost=(event:Event)=>{event.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;node.classList.remove('scene-ready');};
      const restored=()=>{contextLost=false;resize();if(!motion.matches)node.classList.add('scene-ready');};
      addEventListener('resize',resize); addEventListener('scroll',scroll,{passive:true}); addEventListener('toraman:enter',enter);
      document.addEventListener('visibilitychange',visibility); motion.addEventListener('change',changeMotion);
      renderer.domElement.addEventListener('webglcontextlost',lost); renderer.domElement.addEventListener('webglcontextrestored',restored);
      const observer=new ResizeObserver(()=>{stops=positions();schedule();}); observer.observe(document.body);
      releases.push(()=>{removeEventListener('resize',resize);removeEventListener('scroll',scroll);removeEventListener('toraman:enter',enter);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',changeMotion);renderer?.domElement.removeEventListener('webglcontextlost',lost);renderer?.domElement.removeEventListener('webglcontextrestored',restored);observer.disconnect();});
      void document.fonts.ready.then(()=>{if(!disposed){stops=positions();schedule();}});
      entered=document.documentElement.dataset.experienceEntered==='true';
      resize(); renderer.render(scene,camera); node.classList.add('scene-ready'); ready();
      return cleanup;
    } catch { cleanup(); ready(); }
  },[]);
  return <div className="scene-wrap" aria-hidden="true">
    <svg className="scene-fallback" viewBox="0 0 700 800" fill="none"><defs><linearGradient id="scale-metal" x1="80" y1="140" x2="620" y2="650"><stop stopColor="#d8deef"/><stop offset=".35" stopColor="#304aa7"/><stop offset=".62" stopColor="#94a6e1"/><stop offset="1" stopColor="#171d39"/></linearGradient></defs><g stroke="url(#scale-metal)" strokeLinecap="round"><path d="M350 120v560M280 710h140M310 680h80" strokeWidth="18"/><path d="M100 240c120 0 130-85 250-85s130 85 250 85" strokeWidth="15"/><path d="m110 245-80 235m80-235 80 235m400-235-80 235m80-235 80 235" strokeWidth="3"/><path d="M30 480q80 110 160 0ZM510 480q80 110 160 0Z" strokeWidth="9"/><circle cx="350" cy="112" r="17" strokeWidth="7"/></g></svg>
    <div ref={mount} className="scene-canvas" />
  </div>;
}
