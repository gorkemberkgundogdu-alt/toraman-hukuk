import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Exercise production lifecycle code with a virtual clock, without a browser/GPU.
const markup = await readFile(new URL('../src/components/Loader.astro', import.meta.url), 'utf8');
const bootstrap = markup.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
const source = await readFile(new URL('../src/scripts/experience.ts', import.meta.url), 'utf8');
const lifecycle = source.slice(source.indexOf('function setupLoader()'), source.indexOf('function setupSectionTracking()'));
const compiled = ts.transpileModule(lifecycle + '\nsetupLoader();', { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

async function fixture({ repeat = false, reduced = false, storageBlocked = false, sceneReady = true } = {}) {
  let now = 0, sequence = 0, entered = 0;
  const timers = new Map();
  const setTimeout = (callback, delay = 0) => { const id = ++sequence; timers.set(id, { callback, at: now + delay }); return id; };
  const clearTimeout = id => timers.delete(id);
  const window = new EventTarget();
  window.setTimeout = setTimeout; window.clearTimeout = clearTimeout;
  window.matchMedia = () => ({ matches: reduced });
  window.addEventListener('toraman:enter', () => entered++);
  const logo = { getBoundingClientRect: () => ({ left: 300, top: 300, width: 650, height: 130 }), animate: () => ({}) };
  const headerLogo = { getBoundingClientRect: () => ({ left: 24, top: 20, width: 165, height: 33 }) };
  const loader = Object.assign(new EventTarget(), {
    hidden: true, dataset: {}, style: {}, querySelector: () => logo,
    animate: (_, { duration }) => ({ finished: new Promise(resolve => setTimeout(resolve, duration)) }),
  });
  const status = { textContent: '' };
  const html = { dataset: {} };
  const document = {
    documentElement: html, readyState: 'complete', fonts: { ready: Promise.resolve() },
    getElementById: id => id === 'loader' ? loader : status,
    querySelector: selector => selector === '#loader' ? loader : selector === '#load-status' ? status : headerLogo,
    querySelectorAll: () => [],
  };
  const storage = new Map(repeat ? [['toraman:intro:v2', 'seen']] : []);
  const sessionStorage = {
    getItem: key => { if (storageBlocked) throw Error('Storage denied'); return storage.get(key); },
    setItem: (key, value) => { if (storageBlocked) throw Error('Storage denied'); storage.set(key, value); },
  };
  const scope = { window, document, sessionStorage, performance: { now: () => now }, setTimeout, clearTimeout, Event, matchMedia: window.matchMedia };
  runInNewContext(bootstrap, scope);
  if (sceneReady) window.dispatchEvent(new Event('toraman:scene-ready'));
  runInNewContext(compiled, scope);
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  await flush();
  const tick = async target => {
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.at <= target).sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!next) break;
      now = next[1].at; timers.delete(next[0]); next[1].callback(); await flush();
    }
    now = target; await flush();
  };
  return { loader, html, tick, storage, get entered() { return entered; }, ready: () => window.dispatchEvent(new Event('toraman:scene-ready')) };
}

let cases = 0;
{
  const f = await fixture();
  await f.tick(1799); assert.equal(f.loader.hidden, false); assert.equal(f.html.dataset.experienceEntered, undefined);
  await f.tick(1800); assert.equal(f.html.dataset.experienceEntered, 'true');
  await f.tick(2050); assert.equal(f.entered, 1);
  await f.tick(2300); assert.equal(f.loader.hidden, true); assert.equal(f.storage.get('toraman:intro:v2'), 'seen');
  await f.tick(5000); assert.equal(f.entered, 1); cases++;
}
{
  const f = await fixture({ repeat: true });
  await f.tick(180); assert.equal(f.loader.hidden, true); assert.equal(f.entered, 1); cases++;
}
{
  const f = await fixture({ reduced: true });
  await f.tick(0); assert.equal(f.loader.hidden, true); assert.equal(f.entered, 1); cases++;
}
{
  const f = await fixture({ storageBlocked: true });
  await f.tick(2300); assert.equal(f.loader.hidden, true); assert.equal(f.entered, 1); cases++;
}
{
  const f = await fixture({ sceneReady: false });
  await f.tick(3999); assert.equal(f.entered, 0);
  await f.tick(4200); assert.equal(f.loader.hidden, true); assert.equal(f.entered, 1);
  f.ready(); await f.tick(6000); assert.equal(f.entered, 1); cases++;
}
{
  const f = await fixture({ sceneReady: false });
  await f.tick(3900); f.ready(); await f.tick(4400);
  assert.equal(f.entered, 1); assert.equal(f.loader.hidden, true); cases++;
}
console.log(`Loader lifecycle: ${cases} scenarios passed (first visit, repeat, reduced motion, storage denial, timeout, late readiness).`);
