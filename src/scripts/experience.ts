function setupMenu() {
  const trigger = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const dialog = document.querySelector<HTMLDialogElement>('.nav-dialog');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;
  const fallback = document.querySelector<HTMLDetailsElement>('.header-fallback');
  let previousFocus: HTMLElement | null = null;
  let previousOverflow = '';
  let sectionTarget: HTMLElement | null = null;
  const close = () => { if (dialog.open) dialog.close(); };
  trigger.addEventListener('click', () => {
    if (dialog.open) { close(); return; }
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    sectionTarget = null;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
  dialog.querySelector('.menu-close')?.addEventListener('click', close);
  // Keep Tab inside page controls instead of allowing native modal traversal into browser chrome.
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'))
      .filter((control) => control.tabIndex >= 0 && !control.closest('[hidden], [inert]') && control.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) { event.preventDefault(); dialog.focus(); return; }
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !controls.includes(active as HTMLElement))) {
      event.preventDefault();
      first.focus();
    }
  });
  // Native Escape closes the modal; close restores the opener.
  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = previousOverflow;
    if (sectionTarget) {
      const target = sectionTarget;
      sectionTarget = null;
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
      target.focus({ preventScroll: true });
    } else previousFocus?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (link) {
      const destination = new URL(link.href, window.location.href);
      if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) {
        try { sectionTarget = document.getElementById(decodeURIComponent(destination.hash.slice(1))); }
        catch { sectionTarget = null; }
      }
      close();
    }
    else if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
    }
  });
  // Enhance only once the working native fallback can be replaced by a ready dialog.
  if (fallback) { fallback.open = false; fallback.hidden = true; }
  trigger.hidden = false;
}

function setupLoader() {
  const loader = document.querySelector<HTMLElement>('#loader');
  const progress = document.querySelector<HTMLProgressElement>('#load-progress');
  const status = document.querySelector<HTMLElement>('#load-status');
  if (!loader || !progress || !status || loader.hidden) return;
  const completed = new Set<string>();
  let finished = false;
  const exit = () => {
    if (finished) return;
    finished = true;
    loader.dispatchEvent(new Event('toraman:loader-exit'));
    window.removeEventListener('toraman:scene-ready', sceneReady);
    loader.dataset.state = 'ready';
    loader.style.pointerEvents = 'none';
    if (typeof loader.animate !== 'function') { loader.hidden = true; return; }
    const animation = loader.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240,
      easing: 'ease-out', fill: 'forwards',
    });
    animation.finished.then(() => { loader.hidden = true; }).catch(() => { loader.hidden = true; });
  };
  const complete = (stage: string) => {
    if (finished) return;
    completed.add(stage);
    progress.value = completed.size;
    const pending = !completed.has('dom') ? 'Sayfa hazırlanıyor' : !completed.has('fonts') ? 'Yazı tipleri hazırlanıyor' : !completed.has('scene') ? 'Görsel sahne hazırlanıyor' : 'Sayfa hazır';
    status.textContent = `${pending} · ${completed.size} / 3 aşama`;
    if (completed.size === 3) exit();
  };
  const sceneReady = () => complete('scene');
  window.addEventListener('toraman:scene-ready', sceneReady, { once: true });
  loader.addEventListener('toraman:loader-timeout', () => {
    finished = true;
    window.removeEventListener('toraman:scene-ready', sceneReady);
  }, { once: true });
  if (loader.dataset.sceneReady === 'true' || document.documentElement.dataset.sceneReady === 'true') sceneReady();
  const domReady = async () => {
    const heroImages = Array.from(document.querySelectorAll<HTMLImageElement>('.hero img'));
    await Promise.allSettled(heroImages.map((image) => image.decode()));
    complete('dom');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', domReady, { once: true });
  else void domReady();
  if ('fonts' in document) void document.fonts.ready.then(() => complete('fonts'));
  else complete('fonts');
}

function setupSectionTracking() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const logo = header?.querySelector<HTMLImageElement>('.brand-logo');
  const about = document.querySelector<HTMLElement>('.about-section');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.page-progress a[href*="#"]'));
  const sections = links.map((link) => {
    const id = new URL(link.href).hash.slice(1);
    return { link, section: document.getElementById(id) };
  }).filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => Boolean(entry.section));
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const headerLine = header ? header.getBoundingClientRect().top + header.offsetHeight / 2 : 48;
    const creamBounds = about?.getBoundingClientRect();
    const light = creamBounds ? creamBounds.top <= headerLine && creamBounds.bottom > headerLine : header?.dataset.defaultTheme === 'light';
    header?.classList.toggle('is-light', Boolean(light));
    if (logo) {
      logo.style.filter = light ? 'none' : 'invert(1)';
      logo.style.mixBlendMode = light ? 'multiply' : 'screen';
    }
    if (!sections.length) return;
    const readingLine = window.innerHeight * 0.35;
    let current = sections[0];
    for (const entry of sections) if (entry.section.getBoundingClientRect().top <= readingLine) current = entry;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = sections[sections.length - 1];
    for (const entry of sections) {
      const active = entry === current;
      entry.link.classList.toggle('is-active', active);
      if (active) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule, { once: true });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  update();
}

async function setupReveals() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Essential interactions initialize first. An animation chunk failure cannot hide HTML.
  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      for (const element of elements) {
        gsap.fromTo(element, { y: 28 }, {
          y: 0, duration: 0.85, ease: 'power2.out', clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      }
    });
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
  } catch {
    for (const element of elements) {
      element.style.removeProperty('transform');
      element.style.removeProperty('opacity');
      element.style.removeProperty('visibility');
    }
  }
}

function initializeExperience() {
  setupLoader();
  setupMenu();
  setupSectionTracking();
  void setupReveals();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeExperience, { once: true });
else initializeExperience();
