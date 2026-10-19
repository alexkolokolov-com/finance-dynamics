// Пост-обработка сборки для публикации: чтобы карточки для соцсетей и поисковики
// получали готовый HTML каждой страницы, а не общую заглушку главной.
// 1. Кладёт копию index.html в dist/<route>/index.html как запасной вариант (SPA-фолбэк).
// 2. Пытается выполнить пререндер реального HTML. Любая ошибка (нет браузера,
//    нет сети и т.п.) не должна ломать сборку — остаётся запасной вариант из п.1.

import { cpSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { getIndexableRoutes } from "./routes.mjs";

const DIST = resolve("dist");

if (!existsSync(DIST)) {
  console.error("postbuild: dist/ not found, skipping");
  process.exit(0);
}

// 1. Запасные точки входа для глубоких ссылок.
const routes = getIndexableRoutes();
for (const route of routes) {
  const dir = route.path === "/" ? DIST : join(DIST, route.path);
  if (route.path !== "/") {
    mkdirSync(dir, { recursive: true });
    cpSync(join(DIST, "index.html"), join(dir, "index.html"));
  }
}
cpSync(join(DIST, "index.html"), join(DIST, "404.html"));
console.log(`postbuild: fallback entries written for ${routes.length} routes`);

// 2. Пререндер реального HTML (нефатально).
try {
  const res = spawnSync("node", ["scripts/prerender.mjs"], { stdio: "inherit", timeout: 15 * 60_000 });
  if (res.status !== 0) {
    console.error("postbuild: prerender failed, keeping fallback entries");
  }
} catch (error) {
  console.error(`postbuild: prerender skipped (${error.message}), keeping fallback entries`);
}
