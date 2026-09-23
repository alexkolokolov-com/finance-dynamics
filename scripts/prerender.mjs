// Пре-рендер: после `vite build` открывает каждый маршрут в headless-браузере
// и сохраняет готовый HTML в dist/<route>/index.html.
// Так поисковики и AI-краулеры получают полный текст страницы без JS.

import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const DIST = resolve("dist");
const PORT = 4321;
const SITE_URL = process.env.SITE_URL || "https://vasyaifin.ru";

// Список адресов совпадает с public/sitemap.xml (scripts/generate-sitemap.mjs).
const ROUTES = [
  "/",
  "/blog",
  "/consultations",
  "/landing",
  "/profit",
  "/support-2026",
  "/corporate",
  "/longevity",
  "/financial-horizon",
  "/financial-plan",
  "/crisis-decisions",
  "/gears",
  "/budget-methods",
  "/lectures",
  "/decisions",
  "/negotiations",
  "/event",
  "/conference",
  "/cashback",
  "/checklist",
  "/calculator",
  "/bigbudget",
  "/reviews",
  "/oferta",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const startServer = () =>
  new Promise((ok) => {
    const server = createServer(async (req, res) => {
      const url = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = join(DIST, url);
      if (!extname(filePath) || !existsSync(filePath)) filePath = join(DIST, "index.html");
      try {
        const body = await readFile(filePath);
        res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    server.listen(PORT, () => ok(server));
  });

const run = async () => {
  const { chromium } = await import("playwright");
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });

  const failures = [];

  for (const route of ROUTES) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle", timeout: 60000 });
      // ждём реальный отрендеренный контент, а не только загрузку документа
      await page.waitForSelector("#root h1, #root h2, main", { timeout: 30000 });
      await page.waitForTimeout(600);
      const html = await page.evaluate((canonical) => {
        // раскрываем ленивые картинки, чтобы в HTML остались настоящие src
        document.querySelectorAll("img[loading]").forEach((img) => img.removeAttribute("loading"));
        // canonical и og:url под конкретный адрес страницы
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          document.head.appendChild(link);
        }
        link.setAttribute("href", canonical);
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", canonical);
        return "<!doctype html>\n" + document.documentElement.outerHTML;
      }, `${SITE_URL}${route === "/" ? "/" : route}`);

      const textLength = await page.evaluate(
        () => (document.querySelector("#root")?.innerText || "").trim().length,
      );
      if (textLength < 400) {
        throw new Error(`too little rendered text (${textLength} chars)`);
      }

      const dir = route === "/" ? DIST : join(DIST, route);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.html"), html, "utf8");
      console.log(`prerendered ${route} (${textLength} chars of text)`);
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
      console.error(`prerender failed for ${route}:`, error.message);
    }
  }

  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`\nPrerender failed for ${failures.length} route(s):\n${failures.join("\n")}`);
    process.exit(1);
  }
  console.log(`\nPrerendered ${ROUTES.length} routes successfully.`);
};

run().catch((error) => {
  console.error("prerender crashed:", error);
  process.exit(1);
});
