// Запускается перед `vite dev` и `vite build` (predev/prebuild); пишет public/sitemap.xml.
// Список адресов берётся автоматически из маршрутов приложения (scripts/routes.mjs),
// lastmod — дата последнего изменения файла страницы в истории Git.
// Важно: только Node, без bun/tsx — иначе шаг падает в GitHub Actions.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_URL, getIndexableRoutes } from "./routes.mjs";

const entries = getIndexableRoutes();

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.url}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
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
