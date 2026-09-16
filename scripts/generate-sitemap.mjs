// Запускается перед `vite dev` и `vite build` (predev/prebuild); пишет public/sitemap.xml.
// Важно: только Node, без bun/tsx — иначе шаг падает в GitHub Actions.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://vasyaifin.ru";

const entries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/longevity", changefreq: "monthly", priority: "0.8" },
  { path: "/financial-horizon", changefreq: "monthly", priority: "0.8" },
  { path: "/financial-plan", changefreq: "monthly", priority: "0.8" },
  { path: "/crisis-decisions", changefreq: "monthly", priority: "0.8" },
  { path: "/gears", changefreq: "monthly", priority: "0.8" },
  { path: "/budget-methods", changefreq: "monthly", priority: "0.7" },
  { path: "/consultations", changefreq: "weekly", priority: "0.9" },
  { path: "/corporate", changefreq: "monthly", priority: "0.8" },
  { path: "/lectures", changefreq: "monthly", priority: "0.7" },
  { path: "/decisions", changefreq: "monthly", priority: "0.7" },
  { path: "/negotiations", changefreq: "monthly", priority: "0.7" },
  { path: "/event", changefreq: "monthly", priority: "0.7" },
  { path: "/conference", changefreq: "monthly", priority: "0.6" },
  { path: "/cashback", changefreq: "monthly", priority: "0.7" },
  { path: "/checklist", changefreq: "monthly", priority: "0.6" },
  { path: "/calculator", changefreq: "monthly", priority: "0.6" },
  { path: "/bigbudget", changefreq: "monthly", priority: "0.6" },
  { path: "/reviews", changefreq: "monthly", priority: "0.6" },
  { path: "/oferta", changefreq: "yearly", priority: "0.3" },
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
