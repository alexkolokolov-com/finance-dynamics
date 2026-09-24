// Единый источник адресов для карты сайта и пре-рендера.
// Маршруты читаются прямо из src/App.tsx, чтобы список не расходился с приложением.
// Только Node, без bun/tsx — иначе шаг падает в GitHub Actions.

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

export const BASE_URL = "https://vasyaifin.ru";

// Служебные страницы и презентации: в карту не попадают, закрыты от индексации.
// Юридические страницы (оферта) тоже без поисковой ценности.
const EXCLUDED = new Set([
  "*",
  "/landing2",
  "/landing-deck",
  "/landing-deck-2",
  "/traffic",
  "/old",
  "/oferta",
  // Завершившиеся офферы — закрыты от индексации
  "/support-2026",
  "/negotiations",
  "/bigbudget",
]);

// Приоритет и частота обновления по смыслу страницы.
const WEIGHTS = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/blog": { changefreq: "weekly", priority: "0.9" },
  "/consultations": { changefreq: "weekly", priority: "0.9" },
  "/landing": { changefreq: "weekly", priority: "0.9" },
  "/profit": { changefreq: "weekly", priority: "0.9" },
  "/support-2026": { changefreq: "monthly", priority: "0.8" },
  "/corporate": { changefreq: "monthly", priority: "0.8" },
  "/longevity": { changefreq: "monthly", priority: "0.8" },
  "/financial-horizon": { changefreq: "monthly", priority: "0.8" },
  "/financial-plan": { changefreq: "monthly", priority: "0.8" },
  "/crisis-decisions": { changefreq: "monthly", priority: "0.8" },
  "/gears": { changefreq: "monthly", priority: "0.8" },
};
const DEFAULT_WEIGHT = { changefreq: "monthly", priority: "0.6" };

/** Дата последнего изменения файла страницы из истории Git (page-specific). */
const lastCommitDate = (file) => {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? out.slice(0, 10) : null;
  } catch {
    return null;
  }
};

/**
 * Возвращает список индексируемых маршрутов приложения.
 * Каждый элемент: { path, url, lastmod?, changefreq, priority }.
 * url всегда со завершающим слэшем — ровно в том виде, который отдаёт сервер.
 */
export const getIndexableRoutes = () => {
  const app = readFileSync(resolve("src/App.tsx"), "utf8");

  // import Blog from "./pages/Blog.tsx";
  const files = new Map();
  for (const m of app.matchAll(/import\s+(\w+)\s+from\s+"\.\/(pages\/[\w./-]+)"/g)) {
    files.set(m[1], `src/${m[2]}`);
  }

  // <Route path="/blog" element={<Blog />} />
  const routes = [];
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g)) {
    const [, path, component] = m;
    if (EXCLUDED.has(path) || path.includes(":")) continue;
    if (routes.some((r) => r.path === path)) continue;
    const file = files.get(component);
    const lastmod = file ? lastCommitDate(file) : null;
    routes.push({
      path,
      url: path === "/" ? "/" : `${path}/`,
      lastmod: lastmod || undefined,
      ...(WEIGHTS[path] || DEFAULT_WEIGHT),
    });
  }

  const order = Object.keys(WEIGHTS);
  routes.sort((a, b) => {
    const ia = order.indexOf(a.path);
    const ib = order.indexOf(b.path);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  return routes;
};
