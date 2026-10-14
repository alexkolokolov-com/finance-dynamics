# Project architecture

- Register public pages as direct imports and literal Route entries in src/App.tsx so the existing sitemap and prerender scripts discover them automatically.
- Keep Plan2027 source content and calculation rules in src/data/plan2027.ts, with programme tabs and calculator in focused components so presentation stays separate from testable offer rules.
- Use usePageMeta for page metadata and the shared SiteHeader/Footer for public pages to preserve site-wide navigation and search conventions.