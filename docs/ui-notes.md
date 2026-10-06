# UI / UX integration notes

Owned files: `src/styles/global.css`, `docs/ui-notes.md`. No other source files changed.

## Composition

Manrope, ink `#080b10`, paper `#eeeee8`, cobalt `#4469ff`. Homepage hero and practice retain the fixed sculpture behind content. The practice layout alternates five-column entries across a twelve-column grid with varied starting positions. Solid section backgrounds conceal the scene from about onward. Cream about and FAQ, dark staggered portraits, and a cobalt contact section create a deliberate editorial rhythm without repeated card containers.

## Mobile contract — 360 / 390 / 430 px

At 800 px and below, `.scene-wrap` becomes **absolute** and occupies a separate lower hero lane. At 480 px and below that lane starts at 560 px and is 310 px high. Hero copy remains above it; the hero gradient darkens the text lane. The hero has a minimum height of 940 px, and its footer follows the sculpture lane. The scene must be a root-level homepage sibling outside the `main` stacking context (the parent should avoid a transformed ancestor). Canvas and fallback must size themselves to this wrapper; the scene camera must use wrapper dimensions on mobile, not the viewport.

All practice entries become one full-width column at 800 px, without alternating margins or offsets. Portraits become one column at 480 px. Buttons, navigation, contact links, breadcrumbs, and hero links have a minimum 44 px touch height. No text truncation is used. Desktop progress navigation is hidden on mobile.

Header switches to a small text menu at 800 px. Dark is the default; the experience script can set `.is-light`, `.light`, `data-theme="light"`, or `data-theme="paper"` on `.site-header` for paper sections. Both themes use an opaque-enough backdrop and their own text color; no blend-mode contrast dependency.

## Interaction and loading

Native FAQ markers are replaced with a visible plus/minus while preserving `summary` semantics. Visible keyboard focus uses cobalt. Native dialog occupies the viewport, scrolls if needed, and its close button has a 44 px target. Focus trapping, Escape, accessible naming, and return focus remain the component/script owner's responsibility.

Loader uses four equal-stroke SVG motifs, a small firm name, and a native cobalt progress line. CSS fail-open hides the overlay after six seconds if initialization fails; it never sets content opacity to zero. Component must include its contracted `noscript` loader hide. Reduced motion uses the first static motif, removes reveal transformations, and disables smooth scrolling. Scene reduced-motion behavior remains the scene owner's responsibility.

## Validation boundary

CSS implements all TEAM selectors, detail pages, desktop and mobile breakpoints. Source was initially absent during styling; parent integration/browser verification must inspect the final markup at **360, 390, 430, 768, and 1440 px**. Specifically check hero copy versus sculpture at all three phone widths, long Turkish headings, header theme switches, portrait crops, keyboard navigation, dialog close control, and horizontal overflow. CSS alone does not validate final camera composition or component behavior.

Actual homepage, Scene, Header, Footer, and Loader markup has now been inspected. Added the actual `.hero-bottom`, `.about-content`, `.practice-text`, `.section-note`, `.team-note`, `.bar-note`, `.hero-coordinate`, portrait index, menu substructure, and contact substructure selectors. Desktop scene occupies the right 65% of the viewport; `.scene-canvas` and canvas fill the wrapper, and `:has(.scene-canvas.scene-ready)` hides the fallback only when WebGL succeeds. Header logo overrides the original inline image treatment to follow the current header theme: invert/screen on dark, original/multiply on paper. The footer logo uses invert/screen on its dark background. Footer spacing accounts for the actual nested `.site-footer` inside `.contact-section`.

Scene currently uses a 760 px mobile camera query; CSS uses 800 px. Parent should align that query to 800 px so 768 px uses the intended mobile camera. Scene sizes from its mount bounds, which matches the CSS contract. Detail-page markup was still unavailable at this integration pass; its TEAM selectors are styled.

PostCSS parser validation passed (209 top-level rules before final loader refinement). Loader motifs follow the actual script's `.is-active` readiness stage instead of cycling independently of progress. Phone menu typography scales down to keep numbered Turkish links and arrows inside 360 px. Current script changes header theme for about only; parent/frontend should add FAQ to light-section tracking if the header is intended to match the cream FAQ (the default dark header remains legible).
