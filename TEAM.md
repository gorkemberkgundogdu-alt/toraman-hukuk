# Shared workspace contract

All agents work directly in C:/Users/HP/toraman-hukuk. Do not create worktrees, switch branches, commit, push, install dependencies, or alter another owner's files. Parent coordinates integrations. Read PROJECT.md.

## Owners

- Parent: package/config, src/pages/index.astro, src/components/Scene.tsx, assets, final integration and browser testing.
- UI/UX: src/styles/global.css only; optional docs/ui-notes.md.
- Frontend: src/components/Header.astro, Loader.astro, FAQ.astro, Footer.astro; src/scripts/experience.ts. Use markup contracts below.
- SEO: src/data/content.ts, src/layouts/Layout.astro, src/pages/calisma-alanlari/[slug].astro, src/pages/robots.txt.ts, src/pages/sitemap.xml.ts; optional docs/seo-notes.md.
- QA: scripts/verify-build.mjs, docs/qa.md. Do not control parent browser. Build execution after parent reports ready.
- Review: docs/review.md only; analyze source once implemented, report actionable findings to parent. No rewriting implementation.

## Integration contracts

- Astro + React + TypeScript + three + gsap installed by parent. Font: local @fontsource/manrope (400/500/600/700).
- CSS handles shared components. Palette --ink #080b10, --paper #eeeee8, --blue #4469ff, --muted #9398a6. Main composition sculptural black, subtle cobalt, huge type, spacious asymmetry.
- content.ts exports firm (name, telephone, phoneHref, email, address, hours, founded), areas (id string e.g. '01', slug, title, description, topics string[], paragraphs string[], faqs {question,answer}[]), team (name, role, education?, image path /images/name.webp), faqs (question,answer).
- Layout props: title?, description?, dark? default true, schema? object or array. Includes stylesheet and Header/Footer. Loads experience.ts once, imports local fonts. Default domain is https://toramanhukuk.com with environment PUBLIC_SITE_URL override; notes production confirmation required. Scene and Loader only on homepage, not in Layout. HTML lang tr.
- Header markup: .site-header, .brand, .header-links, .menu-toggle, dialog .nav-dialog. Anchor ids #alanlar #yaklasim #ekip #sorular #iletisim. Links on detail pages use /#id. Logo /images/logo.jpeg. Desktop nav text and contact. Mobile small 'Menü' button. Dialog keyboard correct, no giant icon-only hamburger. Footer id iletisim, .contact-section .contact-layout .contact-meta .contact-actions .site-footer.
- Loader: #loader with .loader-mark, four consistent SVG motifs .loader-motif, name, progress (#load-progress max=3) and status (#load-status). Fixed dark screen, aria-hidden decorative shapes; no forced wait. phase fonts, DOM hero visual ready, scene readiness. Scene dispatches window custom event 'toraman:scene-ready' with fallback handled at 4s. experience handles removal, fail-open, reduced motion, gsap reveals/header theme/progress nav. All content accessible without JS, no opacity-zero permanent states. Loader noscript hide and CSS fail-open fallback.
- Scene.tsx parent renders .scene-wrap and canvas aria-hidden. Position fixed large on desktop / hero limited mobile. It reads data-scene sections using DOM bounds and scroll for gradual lighting/object position. WebGL fallback SVG behind canvas always available; dispatch readiness even failure.
- FAQ component props items default content faqs, class .faq-section optional id default sorular, .section-label .faq-heading .faq-list using native details/summary.
- Home sections .hero#baslangic[data-scene=hero], .hero-eyebrow, .hero-title (3 lines İstanbul’da. / Kararlı bir / hukuki duruş.), .hero-description, .hero-actions, .hero-footer with index/scroll. .practice-section#alanlar[data-scene=practice], .section-top, .section-label, .section-title, .practice-grid, .practice-item[data-reveal] links, .practice-number .practice-name .practice-description .practice-arrow. .about-section#yaklasim[data-scene=about], .about-kicker .about-title .about-copy .principles. .team-section#ekip[data-scene=team], .team-intro .team-grid .team-card .team-photo .team-info .team-name .team-role .team-education. FAQ then Footer. .page-progress fixed subtle sidebar on desktop links #ids, hidden mobile. .skip-link.
- Details .detail-page .detail-hero .breadcrumb .detail-number .detail-title .detail-lead .detail-content .detail-topics .detail-body .detail-contact; reusable FAQ. No fake claims or unverified legal advice.
- No testimonials/careers; Senay spelling. Portrait mappings in PROJECT.md. User-authorized images only, no screenshot of WhatsApp conversation in public assets.
- No form backend -> only tel/mail/map actions, no pretend sent success. Navigation all real.

Build status parent will signal QA and Review when source ready. Agents can send each other messages if relevant; do not block on another agent's edits. Report changed paths and any integration limitations.
