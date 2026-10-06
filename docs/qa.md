# QA — Toraman Hukuk v1

## Status

Latest 16:36 rebuilt output verified after parent run signal on 2026-10-06: **2,175 checks, zero failures**. QA did not rebuild or use a browser. QA owns only `scripts/verify-build.mjs` and this document.

## Automated verification

After the parent signals readiness, run from the project root:

```powershell
npm.cmd run build
node scripts/verify-build.mjs
```

When an existing build is already ready, run `npm.cmd run verify` without rebuilding. This was the command used for the first QA pass.

The script uses only Node builtins. An optional first argument selects an existing output directory. Missing output or failed assertions exits with status 1. It reads actual generated HTML, rather than assuming source data appears in the page.

Checks cover all 12 service pages and their homepage links/titles; substantive static content; Turkish encoding and correct **Senay Kılıç** spelling; five team names; verified office information and contact URIs; real local link, fragment, image, stylesheet, script and CSS asset targets; unique headings/metadata/IDs; canonical routes and complete sitemap; non-HTML robots/sitemap endpoints; native FAQs; accessible image/link names; image dimensions; labeled dialog/menu relationships; skip links; JSON-LD parsing, firm identity, breadcrumbs and visible FAQ consistency; absence of unsupported forms, fake link actions and private screenshot filenames/references. Exact source screenshot bytes are compared when available; renamed transformed copies still require asset review.

Responsive static checks cover viewport metadata, media rules, visible keyboard focus, reduced motion and fixed-width/100vw risks. These are review aids, not computed layout or accessibility certification.

## Parent browser acceptance matrix

Final parent checks: Chrome viewport emulation at 360, 390, 430, 768 and 1440 CSS px showed no document overflow or clipped main text/CTA elements on the homepage and a representative service page. Production WebGL scene reached readiness; all five portraits loaded and visually matched supplied names. Mobile Tab/Shift+Tab wrapping, Escape return focus, section-link dismissal and a native service FAQ expansion passed. Real iPhone/Safari hardware, disabled-JS runtime and simulated GPU context loss were not tested; source fallback review is recorded separately. Final static verification after transparent logo preparation: 2,177 checks, zero failures. The Three.js bundle emits a size warning; further performance tuning remains possible after visual approval.

- Viewport widths: **360, 390, 430, 768 and 1440 CSS px**. Check homepage and a representative service page, plus all service links. Assert `scrollWidth <= clientWidth` on the document and inspect clipped descendants; hiding overflow alone does not establish correctness.
- Readable mobile text in one column, portrait framing, scene/text/CTA separation, header overlap during scroll, and viewport height changes.
- Mobile menu: labeled control; practical touch targets (aim 44 × 44 CSS px); dialog opening focus, Tab/Shift+Tab containment, Escape, return focus and close after section selection. Hidden menus must not remain keyboard targets.
- Keyboard skip link, visible focus, section navigation, native FAQ expansion and working phone/email/directions links.
- JavaScript disabled: hero, service descriptions, team, FAQ and contact remain readable; loader does not cover content. JavaScript failure and WebGL failure must also fail open.
- Reduced motion: no forced loader delay or continuous scene animation; content stays available. Check console errors and a slow-loading page.
- Private asset and portrait/name mapping inspection remains manual, including any transformed screenshot.

Browser testing belongs to the parent. These viewport checks must not be described as actual mobile hardware testing or iPhone/Safari device coverage.

## Results and integration issues

Latest command: `npm.cmd run verify`. Result: **2,175 checks, 0 failures, 2 review notes, 13 generated HTML pages; exit 0**. All portrait targets and the favicon resolve in the current build.

The first verification of the 16:36 build incorrectly produced 13 FAQ failures because the new native navigation fallback also uses `<details>` with a valid short `Menü` summary. The FAQ assertion previously applied question-length rules to every `<details>` on each page. It now selects `details.faq-item` and independently requires both a meaningful server-rendered question and a `.faq-answer` containing actual answer text. This corrects the selector and strengthens answer coverage; the existing FAQ markup itself required no change. Rerun passed on the same output without rebuilding.

### First-build history — resolved

First run: **1,902 checks, 5 failures, 2 review notes, 13 generated HTML pages; exit 1**.

The five genuine failures are missing portrait files referenced by the current homepage build:

| Built reference missing from dist | Existing output asset |
| --- | --- |
| `/images/tugrul-toraman.webp` | `/images/tugrul.webp` |
| `/images/efe-cem-toraman.webp` | `/images/efe.webp` |
| `/images/dogukan-petek.webp` | `/images/dogukan.webp` |
| `/images/senay-kilic.webp` | `/images/senay.webp` |
| `/images/sevilay-lektemur.webp` | `/images/sevilay.webp` |

Parent/SEO resolved these five portrait references in the latest build; none is failing now. All 12 service routes contain a distinct Turkish H1, substantive paragraphs, native FAQs and breadcrumbs, and are linked from the homepage. Local fragments and asset links resolved; phone/email/directions links have correct markup. JSON-LD parses and visible FAQ/schema content agrees. No unsupported form, placeholder anchor, encoding corruption, private screenshot filename/reference or exact source image copy was detected.

Refined the width risk matcher: the initial scan incorrectly treated `max-width` declarations and `@media` breakpoint widths as fixed element widths. These are valid responsive constructs and now produce no warning. Real `width`/`min-width` pixel declarations remain eligible for review.

Static source inspection confirms native `showModal()`/`close()` usage, opener focus restoration, section-link menu closing and expanded-state updates. CSS declares menu-toggle `min-width: 64px; min-height: 44px` and dialog button `min-width: 72px; min-height: 44px`. Computed targets, focus behavior and the 360/390/430/768/1440 layout matrix still belong to parent browser testing. The loader is initially HTML-hidden with a noscript hide rule, timed fail-open paths and CSS fallback; reveals animate position rather than initially hiding text. These source safeguards are not a runtime test.

Review notes: preview robots deliberately blocks indexing; production domain and `PUBLIC_INDEXABLE` must be confirmed before launch. Static verification does not contact external links, validate a real map pin, test computed layout or establish real mobile hardware coverage.

### Parent-reported browser results

These are parent observations supplied to QA, not browser tests independently performed by QA:

- **390 CSS px**: no horizontal overflow; menu control measured **44 × 64 CSS px**; Escape dismissal and opener focus restoration passed.
- Production build scene reached canvas-ready state. No runtime errors reported; GPU shader precision warnings were observed.
- Shift+Tab with native dialog/browser chrome exposed a focus-wrap issue. Explicit wrapping is being added by the frontend owner. At this verification run, source inspection still shows native dialog handling without the explicit Tab listener. The parent must verify both Tab directions after that change reaches the next build.

The 360, 430, 768 and 1440 viewport checks, no-JS/failure/reduced-motion scenarios, and final focus-wrap regression remain unconfirmed in this QA record. No full hardware test was performed. Zero static failures does not close these browser checks.
