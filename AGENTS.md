# Project architecture

- Register public pages as direct imports and literal Route entries in src/App.tsx so the existing sitemap and prerender scripts discover them automatically.
- Keep Plan2027 source content and calculation rules in src/data/plan2027.ts, with programme tabs and calculator in focused components so presentation stays separate from testable offer rules.
- Use usePageMeta for page metadata and the shared SiteHeader/Footer for public pages to preserve site-wide navigation and search conventions.
- Keep HR webinar offer facts and programme in src/data/hrWeb.ts and the embedded GetCourse form in a focused component so offer rules stay testable and widget loading stays independent of page layout.
- Reuse CardAbout for the HR webinar author section with page-specific heading, quote and optional facts overrides, so the portrait and presentation stay shared without changing credentials on other pages.
- Draw translucent decorative line-art as fully opaque strokes inside one group whose opacity is applied once to that group, so crossing lines never stack into darker patches; keep such a mark as a component in the page's tree (e.g. src/components/hrweb/WellbeingSprout.tsx) rather than a standalone asset so it inherits theme color and scales with its block.
- Keep the registration checklist line-art in a focused component behind the gift text, isolated from the external GetCourse widget so decoration cannot interfere with form controls.
- Set page-specific social images through usePageMeta using absolute published asset URLs; restore previous image tags on unmount so route images do not leak into other pages, and let the existing prerender pipeline capture them for static hosting.
