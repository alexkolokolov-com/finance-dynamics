// Пре-рендер: после `vite build` открывает каждый маршрут в headless-браузере
// и сохраняет готовый HTML в dist/<route>/index.html.
// Так поисковики и AI-краулеры получают полный текст страницы без JS.

import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const DIST = resolve("dist");
const PORT = 4321;

const ROUTES = [
  "/",
  "/blog",
  "/financial-horizon",
  "/financial-plan",
  "/crisis-decisions",
  "/gears",
  "/budget-methods",
  "/consultations",
  "/corporate",
  "/lectures",
  "/decisions",
  "/negotiations",
  "/event",
  "/conference",
  "/cashback",
  "/checklist",
  "/calculator",
  "/bigbudget",
  "/landing",
  "/support-2026",
  "/traffic",
  "/reviews",
  "/oferta",
  "/old",
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
  const browser = await chromium.launch({ channel: "chromium" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });

  for (const route of ROUTES) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(600);
      const html = await page.evaluate(() => {
        // раскрываем ленивые картинки, чтобы в HTML остались настоящие src
        document.querySelectorAll("img[loading]").forEach((img) => img.removeAttribute("loading"));
        return "<!doctype html>\n" + document.documentElement.outerHTML;
      });
      const dir = route === "/" ? DIST : join(DIST, route);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.html"), html, "utf8");
      console.log(`prerendered ${route}`);
    } catch (error) {
      console.error(`prerender failed for ${route}:`, error.message);
    }
  }

  await browser.close();
  server.close();
};

run();
