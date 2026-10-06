#!/usr/bin/env node
// Dependency-free checks of generated HTML. Run after the parent signals build readiness.
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, process.argv[2] || 'dist');
const failures = [], warnings = [];
let checks = 0;
function check(ok, message) { checks++; if (!ok) failures.push(message); }
function warn(message) { warnings.push(message); }
async function exists(path) { try { return (await stat(path)).isFile(); } catch { return false; } }
async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(resolve(path, e.name)) : resolve(path, e.name)))).flat();
}
function decode(s = '') {
  return s.replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, n) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[n]);
}
function attrs(tag) {
  const result = {};
  for (const m of tag.replace(/^<\/?[\w:-]+/, '').matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return result;
}
function text(html) { return decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(); }
function elements(html, tag) { return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi'))].map(m => ({ a: attrs(`<${tag}${m[1]}>`), body: m[2] })); }
function structuredNodes(value) {
  if (Array.isArray(value)) return value.flatMap(structuredNodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(structuredNodes)];
}
let files;
try { files = await walk(dist); } catch {
  console.error(`FAIL: build output missing at ${dist}. Parent must finish the build first.`);
  process.exit(1);
}
const pages = new Map();
for (const file of files.filter(f => extname(f) === '.html')) {
  const html = await readFile(file, 'utf8');
  const path = '/' + relative(dist, file).split(sep).join('/');
  const route = path.replace(/index\.html$/, '').replace(/\.html$/, '');
  pages.set(route, { file, html, visible: text(html), ids: new Set([...html.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/g)].map(m => decode(m[1] ?? m[2]))) });
}
const home = pages.get('/');
check(Boolean(home), 'Homepage dist/index.html exists');
const serviceTitles = ['İdare & Vergi Hukuku', 'Bankacılık & Finans Hukuku', 'Tüketici Hukuku', 'Şirketler Hukuku', 'Ceza Hukuku', 'Enerji & Maden Hukuku', 'İcra & İflas Hukuku', 'Sağlık & İlaç Hukuku', 'İş & Sosyal Güvenlik Hukuku', 'Uyuşmazlık Çözümü', 'Basın & Medya Hukuku', 'Gayrimenkul Hukuku'];
const services = [...pages.entries()].filter(([route]) => /^\/calisma-alanlari\/[^/]+\/?$/.test(route));
check(services.length === 12, `Exactly 12 generated service pages (found ${services.length})`);
const findPage = pathname => pages.get(pathname) || pages.get(pathname.replace(/\/$/, '') + '/') || pages.get(pathname.replace(/\/$/, ''));
const homeLinks = home ? elements(home.html, 'a').map(e => e.a.href) : [];
for (const title of serviceTitles) {
  check(Boolean(home?.visible.includes(title)), `Homepage renders service title: ${title}`);
  const matching = services.filter(([, p]) => elements(p.html, 'h1').some(h => text(h.body) === title));
  check(matching.length === 1, `One service H1 matches ${title} (found ${matching.length})`);
  if (matching.length === 1) check(homeLinks.some(href => { try { return findPage(new URL(href, 'https://qa.invalid/').pathname) === matching[0][1]; } catch { return false; } }), `Homepage links to ${title}`);
}
if (home) {
  for (const id of ['baslangic', 'alanlar', 'yaklasim', 'ekip', 'sorular', 'iletisim']) check(home.ids.has(id), `Homepage section #${id}`);
  for (const value of ['Toraman Hukuk', '2004', 'Tuğrul Toraman', 'Efe Cem Toraman', 'Doğukan Petek', 'Senay Kılıç', 'Sevilay Lektemur', 'Bahariye', 'Sakızgülü', '31/9', 'Kadıköy', 'İstanbul']) check(home.visible.includes(value), `Visible homepage content: ${value}`);
  check(homeLinks.includes('tel:+902164140404'), 'Homepage correct working phone URI');
  check(homeLinks.includes('mailto:tugrul@toramanhukuk.com'), 'Homepage correct working email URI');
  check(homeLinks.some(href => /https:\/\/(?:www\.)?(?:google\.[^/]+\/maps|maps\.google\.|maps\.apple\.|goo\.gl\/maps)/i.test(href || '')), 'Homepage has map/directions link');
  const description = [...home.html.matchAll(/<(?:p|div)\b[^>]*class=["'][^"']*hero-description[^"']*["'][^>]*>([\s\S]*?)<\/(?:p|div)>/gi)].map(m => text(m[1])).join(' ');
  check(description.length > 30 && !/Kadıköy/i.test(description), 'Hero description renders meaningful content without Kadıköy');
  check(/<noscript\b/i.test(home.html), 'Homepage provides explicit noscript fallback');
}
const titles = new Set(), descriptions = new Set();
for (const [route, page] of pages) {
  const { html, visible } = page;
  check(/<html\b[^>]*\blang=["']tr["']/i.test(html), `${route}: Turkish document language`);
  check(elements(html, 'h1').length === 1, `${route}: exactly one server-rendered H1`);
  check(elements(html, 'main').length === 1, `${route}: main landmark`);
  check(!/Şenay|Senay Kilic|\uFFFD|Ã¼|Ä±|ÅŸ/.test(visible), `${route}: correct Senay spelling and no encoding damage`);
  check(!/<form\b/i.test(html), `${route}: no unsupported contact form`);
  const title = text(elements(html, 'title')[0]?.body || '');
  check(title.length > 10 && !titles.has(title), `${route}: meaningful unique title`); titles.add(title);
  const tags = [...html.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)].map(m => ({ tag: m[1].toLowerCase(), a: attrs(m[0]) }));
  const description = tags.find(t => t.tag === 'meta' && t.a.name === 'description')?.a.content || '';
  check(description.length > 30 && !descriptions.has(description), `${route}: meaningful unique description`); descriptions.add(description);
  check(tags.some(t => t.tag === 'meta' && t.a.name === 'viewport' && /width=device-width/.test(t.a.content || '')), `${route}: responsive viewport`);
  const canonical = tags.find(t => t.tag === 'link' && t.a.rel === 'canonical')?.a.href;
  try {
    const url = new URL(canonical);
    check(['https:', 'http:'].includes(url.protocol) && findPage(url.pathname) === page && !url.search && !url.hash, `${route}: absolute canonical matches generated route`);
  } catch { check(false, `${route}: valid absolute canonical`); }
  const ids = tags.filter(t => t.a.id).map(t => t.a.id);
  check(new Set(ids).size === ids.length, `${route}: unique element IDs`);
  const dialogs = elements(html, 'dialog');
  check(dialogs.some(d => (d.a.class || '').split(/\s+/).includes('nav-dialog') && (d.a['aria-label'] || d.a['aria-labelledby'])), `${route}: labeled native menu dialog`);
  const menu = elements(html, 'button').find(b => (b.a.class || '').split(/\s+/).includes('menu-toggle'));
  check(Boolean(menu && /Menü/.test(text(menu.body)) && menu.a['aria-controls'] && page.ids.has(menu.a['aria-controls']) && 'aria-expanded' in menu.a), `${route}: labeled mobile menu control linked to dialog with expanded state`);
  check(elements(html, 'a').some(a => (a.a.class || '').includes('skip-link') && /^#/.test(a.a.href || '')), `${route}: skip-to-content link`);
  for (const heading of elements(html, 'h1')) check(text(heading.body).length > 5, `${route}: H1 available without JS`);
  // A native no-JS navigation fallback also uses details/summary. Only FAQ items
  // carry the question/answer contract; a short "Menü" summary is valid navigation.
  const faqs = elements(html, 'details').filter(d => (d.a.class || '').split(/\s+/).includes('faq-item'));
  check(faqs.length > 0 && faqs.every(d =>
    elements(d.body, 'summary').some(s => text(s.body).length > 5)
    && elements(d.body, 'div').some(answer => (answer.a.class || '').split(/\s+/).includes('faq-answer') && text(answer.body).length > 20)
  ), `${route}: native FAQ with server-rendered questions and answers`);
  for (const image of tags.filter(t => t.tag === 'img')) {
    check('alt' in image.a, `${route}: image ${image.a.src} has alt attribute`);
    check(Number(image.a.width) > 0 && Number(image.a.height) > 0, `${route}: image ${image.a.src} reserves width/height`);
  }
  for (const a of elements(html, 'a')) {
    check(Boolean(text(a.body) || a.a['aria-label'] || /\balt=["'][^"']+["']/.test(a.body)), `${route}: accessible link name for ${a.a.href}`);
    check(Boolean(a.a.href) && a.a.href !== '#' && !/^javascript:/i.test(a.a.href), `${route}: no placeholder/action-trap href ${a.a.href}`);
  }
  const scripts = elements(html, 'script').filter(s => s.a.type === 'application/ld+json');
  check(scripts.length > 0, `${route}: JSON-LD present`);
  const nodes = [];
  for (const script of scripts) {
    try { const value = JSON.parse(script.body); nodes.push(...structuredNodes(value)); check(Boolean(value && typeof value === 'object'), `${route}: JSON-LD is object/array`); }
    catch (error) { check(false, `${route}: invalid JSON-LD: ${error.message}`); }
  }
  check(nodes.some(n => ['LegalService', 'Organization'].some(t => [].concat(n['@type'] || []).includes(t)) && n.name === 'Toraman Hukuk'), `${route}: real firm structured data`);
  check(!nodes.some(n => n.aggregateRating || n.review || n.geo), `${route}: no unverified ratings/reviews/coordinates`);
  for (const node of nodes.filter(n => [].concat(n['@type'] || []).includes('Question'))) {
    check(visible.includes(node.name) && visible.includes(node.acceptedAnswer?.text), `${route}: FAQ schema matches visible content`);
  }
  if (route.startsWith('/calisma-alanlari/')) {
    check(nodes.some(n => [].concat(n['@type'] || []).includes('BreadcrumbList')), `${route}: service breadcrumb schema`);
    check(elements(html, 'p').filter(p => text(p.body).length > 60).length >= 3, `${route}: substantive service content in HTML`);
    check(!page.ids.has('loader'), `${route}: no homepage loader on service page`);
  }
  // Check every local anchor, stylesheet, image, script, preload and srcset target.
  for (const { tag, a } of tags) {
    const refs = [a.href, a.src, a.poster, ...(a.srcset || '').split(',').map(s => s.trim().split(/\s+/)[0])].filter(Boolean);
    for (const ref of refs) {
      if (/^(?:data:|blob:|mailto:|tel:)/i.test(ref)) continue;
      let url;
      try { url = new URL(ref, `https://qa.invalid${route}`); } catch { check(false, `${route}: malformed URL ${ref}`); continue; }
      if (url.origin !== 'https://qa.invalid') continue;
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { check(false, `${route}: invalid URL encoding ${ref}`); continue; }
      const targetPage = findPage(pathname);
      const targetFile = resolve(dist, '.' + pathname);
      check(targetPage || (targetFile.startsWith(dist + sep) && await exists(targetFile)), `${route}: ${tag} local target exists ${ref}`);
      if (url.hash && targetPage) check(targetPage.ids.has(decodeURIComponent(url.hash.slice(1))), `${route}: fragment target exists ${ref}`);
    }
  }
}
const sitemapFile = resolve(dist, 'sitemap.xml');
check(await exists(sitemapFile), 'Generated sitemap.xml exists');
if (await exists(sitemapFile)) {
  const xml = await readFile(sitemapFile, 'utf8');
  check(!/<html\b/i.test(xml) && /<urlset\b/.test(xml), 'Sitemap contains XML, not fallback HTML');
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
  const sitemapRoutes = new Set();
  check(locations.length === 13 && new Set(locations).size === 13, 'Sitemap has 13 unique URLs');
  for (const location of locations) {
    try {
      const url = new URL(location);
      const page = findPage(url.pathname);
      check(Boolean(page), `Sitemap URL has generated HTML: ${location}`);
      if (page) sitemapRoutes.add(page.file);
    } catch { check(false, `Sitemap URL is absolute and valid: ${location}`); }
  }
  for (const page of pages.values()) check(sitemapRoutes.has(page.file), `Sitemap includes ${relative(dist, page.file)}`);
}
const robotsFile = resolve(dist, 'robots.txt');
check(await exists(robotsFile), 'Generated robots.txt exists');
if (await exists(robotsFile)) {
  const robots = await readFile(robotsFile, 'utf8');
  check(!/<html\b/i.test(robots) && /^User-agent:\s*\*/im.test(robots), 'Robots contains directives, not fallback HTML');
  if (/^Disallow:\s*\/\s*$/im.test(robots)) warn('Preview robots disallows indexing; confirm PUBLIC_INDEXABLE and production domain before launch.');
}
for (const file of files) {
  const name = relative(dist, file);
  check(!/screenshot|screenshots|155654|ekran[ _-]?g[oö]r[uü]nt[uü]s[uü]/i.test(name), `No private screenshot in output: ${name}`);
  if (/\.(css|js|html|xml|txt|json)$/i.test(file)) {
    const source = await readFile(file, 'utf8');
    check(!/155654|Pictures[\\/]Screenshots|Ekran görüntüsü 2026-10-06/i.test(source), `No private screenshot reference: ${name}`);
    if (/\.css$/i.test(file)) {
      for (const m of source.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)) {
        if (/^(data:|https?:|#)/i.test(m[1])) continue;
        const target = m[1].startsWith('/') ? resolve(dist, '.' + m[1]) : resolve(dirname(file), m[1]);
        check(await exists(target.split('?')[0].split('#')[0]), `${name}: CSS asset exists ${m[1]}`);
      }
    }
  }
}
// Detect an exact private image even if it has been renamed; transformed copies require manual asset review.
const privatePath = resolve(root, '../Pictures/Screenshots/Ekran görüntüsü 2026-10-06 155654.png');
if (await exists(privatePath)) {
  const hash = buffer => createHash('sha256').update(buffer).digest('hex');
  const privateHash = hash(await readFile(privatePath));
  for (const file of files.filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f))) check(hash(await readFile(file)) !== privateHash, `Private screenshot bytes excluded: ${relative(dist, file)}`);
} else warn('Private source screenshot unavailable for byte comparison; filename/reference scan completed.');
try {
  const css = await readFile(resolve(root, 'src/styles/global.css'), 'utf8');
  check(/prefers-reduced-motion/.test(css), 'Styles define reduced-motion behavior');
  check(/:focus-visible/.test(css), 'Styles define visible keyboard focus');
  check(/@media/.test(css), 'Styles include responsive media rules');
  // Match declarations only: max-width constraints and @media breakpoint widths are not overflow risks.
  for (const m of css.matchAll(/(?:^|[;{])\s*(?:min-width|width)\s*:\s*(\d{3,})px/g)) if (Number(m[1]) > 360) warn(`Review fixed ${m[0].replace(/^[;{]\s*/, '')} near CSS offset ${m.index}: confirm responsive override at 360px.`);
  if (/(?:^|[;{])\s*(?:width|min-width)\s*:\s*100vw/.test(css)) warn('100vw width can overflow with scrollbars; parent must inspect horizontal overflow.');
  warn('Touch target size, CSS cascade, menu focus/Escape, overflow and no-JS loader/reveals require parent browser checks; static markup is not proof of usability.');
} catch { check(false, 'Shared stylesheet available for static responsive risk inspection'); }
console.log(`\nBuild verification: ${checks} checks, ${failures.length} failures, ${warnings.length} review notes; ${pages.size} HTML pages.`);
for (const message of failures) console.error(`FAIL: ${message}`);
for (const message of [...new Set(warnings)]) console.log(`REVIEW: ${message}`);
process.exitCode = failures.length ? 1 : 0;
