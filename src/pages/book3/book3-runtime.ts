/*
 * Анимации лендинга «Ленивый бюджет» (/book-3).
 * Перенесено 1:1 из HTML-версии: тайминги, порядок и поведение те же.
 * Всё, что запускается здесь, полностью снимается функцией очистки при уходе со страницы.
 * Не переписывать на Framer Motion и не менять значения без необходимости.
 */

type Word = [text: string, left: number, top: number, scale: number, accent?: number];

const WORDS: Word[] = [
  ["−45 000", 4, 14, 1.5], ["куда ушло?", 58, 8, 1.1, 1], ["≈ 0 ₽", 86, 58, 1.8], ["?", 47, 76, 2.6, 1],
  ["кредитка", 6, 74, 1.2], ["−38 000", 74, 30, 1.3], ["отпуск?", 36, 4, 1.1], ["подушка", 62, 88, 1.2],
  ["−12 400", 20, 46, 1.1], ["до зарплаты", 80, 82, 1.1, 1],
];
const HERO_WORDS: Word[] = [
  ["−45 000", 6, 12, 1.4], ["куда ушло?", 56, 3, 1.1, 1], ["≈ 0 ₽", 94, 30, 1.7], ["?", 3, 50, 2.4, 1],
  ["кредитка", 7, 82, 1.1], ["−38 000", 92, 66, 1.2], ["отпуск?", 28, 0, 1], ["подушка", 72, 96, 1.1],
  ["−12 400", 14, 32, 1], ["до зарплаты", 40, 97, 1, 1], ["−3 990", 90, 8, 1.1], ["?", 96, 88, 2, 1],
  ["ипотека", 91, 47, 1], ["кэшбэк?", 20, 64, 1],
];

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=Jost:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Caveat:wght@600&display=swap";
const NS = "http://www.w3.org/2000/svg";
const COL: Record<string, string> = { accent: "var(--accent)", bg: "var(--bg)", ink2: "var(--ink-3)", ink: "var(--ink)" };
const NAMES: Record<string, string> = {
  change: "Ваши изменения", why: "Почему эта книга", contents: "Содержание", chapter: "Первая глава", author: "Об авторе",
};
const GROUPS: [string, string][] = [
  ["change", "change"], ["why", "why"], ["contents", "contents"], ["chapter", "chapter"],
  ["author", "author"], ["notfor", "author"], ["preorder", "author"],
];

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

function inkPath(type: string, w: number, h: number): string {
  switch (type) {
    case "under":
      return "M-2 " + (h + 2) + " C" + w * 0.3 + " " + (h - 3) + "," + w * 0.62 + " " + (h + 7) + "," + (w + 4) + " " + h;
    case "strike":
      return "M-4 " + h * 0.58 + " Q" + w * 0.5 + " " + h * 0.42 + "," + (w + 4) + " " + h * 0.52;
    case "circle": {
      const cx = w / 2, cy = h / 2 + h * 0.03, rx = w / 2 + h * 0.32, ry = h * 0.62, a0 = Math.PI * 0.82, N = 64;
      let d = "";
      for (let k = 0; k <= N; k++) {
        const a = a0 + (k / N) * (Math.PI * 2 + 0.45);
        const wob = 1 + 0.035 * Math.sin((k / N) * Math.PI * 2) + (k / N) * 0.05;
        d += (k ? "L" : "M") + (cx + rx * wob * Math.cos(a)).toFixed(1) + " " + (cy + ry * wob * Math.sin(a) - (k / N) * h * 0.06).toFixed(1) + " ";
      }
      return d;
    }
    case "x":
      return "M3 3 L" + (w - 3) + " " + (h - 3) + " M" + (w - 3) + " 3 L3 " + (h - 3);
    case "check":
      return "M4 " + h * 0.55 + " L" + w * 0.38 + " " + (h - 4) + " L" + (w - 4) + " 4";
  }
  return "";
}

export function initLazyBudget(root: HTMLElement): () => void {
  const ac = new AbortController();
  const on = { signal: ac.signal };
  const onPassive = { signal: ac.signal, passive: true };
  const timers = new Set<number>();
  const rafs = new Set<number>();
  const observers: IntersectionObserver[] = [];
  const touched = new Set<Element>();
  const addCls = (el: Element, ...c: string[]) => { el.classList.add(...c); touched.add(el); };
  let alive = true;

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => { timers.delete(id); if (alive) fn(); }, ms);
    timers.add(id);
  };
  const frame = (fn: FrameRequestCallback) => {
    const id = requestAnimationFrame((t) => { rafs.delete(id); if (alive) fn(t); });
    rafs.add(id);
  };
  const byId = <T extends HTMLElement = HTMLElement>(id: string) => root.querySelector<T>("#" + id);
  const all = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  // Шрифты страницы (подключаются один раз)
  if (!document.getElementById("lb3-fonts")) {
    const l = document.createElement("link");
    l.id = "lb3-fonts";
    l.rel = "stylesheet";
    l.href = FONTS_HREF;
    document.head.appendChild(l);
  }

  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!RM) root.classList.add("anim");
  const html = document.documentElement;
  const prevScrollBehavior = html.style.scrollBehavior;
  if (!RM) html.style.scrollBehavior = "smooth";

  /* ---------- туман ---------- */
  function fogBuild(host: HTMLElement | null, words: Word[], cls: string, focus: boolean) {
    if (!host) return;
    host.querySelectorAll(":scope > .lay").forEach((n) => n.remove());
    const L = document.createElement("div");
    L.className = "lay " + cls;
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "fw" + (w[4] ? " a" : "");
      s.textContent = w[0];
      s.style.left = w[1] + "%";
      s.style.top = w[2] + "%";
      s.style.fontSize = "calc(" + w[3] + " * clamp(13px,1.5vw,19px))";
      s.style.setProperty("--d", 9 + (i % 5) * 2.3 + "s");
      s.style.setProperty("--dl", -i * 1.7 + "s");
      s.style.setProperty("--dx", (i % 2 ? 1 : -1) * (10 + (i % 4) * 5) + "px");
      s.style.setProperty("--dy", (i % 3 ? -1 : 1) * (8 + (i % 3) * 4) + "px");
      if (focus) {
        s.style.setProperty("--f", 7 + (i % 4) * 1.3 + "s");
        s.style.setProperty("--fl", (-((i * 2.9) % 9)).toFixed(1) + "s");
      }
      L.appendChild(s);
    });
    host.appendChild(L);
  }
  fogBuild(byId("hero-fog"), HERO_WORDS, "", true);
  fogBuild(byId("prob-fog"), WORDS.map((w) => [w[0], (w[1] + 37) % 96, (w[2] + 23) % 92, w[3], w[4]] as Word), "blur", false);

  /* ---------- рукописные пометки ---------- */
  function inkify() {
    all<HTMLElement>("[data-ink]").forEach((el) => {
      let svg = el.querySelector<SVGSVGElement>(":scope > svg.ink");
      let p: SVGPathElement;
      if (!svg) {
        svg = document.createElementNS(NS, "svg");
        svg.setAttribute("class", "ink");
        svg.setAttribute("aria-hidden", "true");
        p = document.createElementNS(NS, "path");
        p.setAttribute("class", "pen");
        p.setAttribute("pathLength", "1");
        p.style.stroke = COL[el.dataset.col || "accent"];
        p.style.strokeWidth = el.dataset.w || "3";
        if (el.dataset.pd) p.style.setProperty("--pd", el.dataset.pd + "s");
        if (el.dataset.pdur) p.style.setProperty("--pdur", el.dataset.pdur + "s");
        svg.appendChild(p);
        el.appendChild(svg);
      } else {
        p = svg.firstChild as SVGPathElement;
      }
      const w = el.offsetWidth, h = el.offsetHeight;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      p.setAttribute("d", inkPath(el.dataset.ink || "", w, h));
    });
  }
  inkify();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) inkify(); });
  let rz = 0;
  window.addEventListener("resize", () => { clearTimeout(rz); timers.delete(rz); rz = window.setTimeout(() => { if (alive) inkify(); }, 120); timers.add(rz); }, on);

  /* ---------- появление при прокрутке ---------- */
  function countUp() {
    if (RM) return;
    all<HTMLElement>("[data-count]").forEach((s) => {
      const to = Number(s.dataset.count), t0 = performance.now(), D = 1300;
      const f = (now: number) => {
        const p = clamp((now - t0) / D), e = 1 - Math.pow(1 - p, 3);
        s.textContent = Math.round(to * e).toLocaleString("ru-RU");
        if (p < 1) frame(f);
      };
      f(t0);
    });
  }
  function onIn(el: Element) {
    el.classList.remove("pre");
    addCls(el, "in");
    if (el.id === "tgrid") countUp();
  }
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { onIn(e.target); io!.unobserve(e.target); } });
      }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" })
    : null;
  if (io) observers.push(io);
  all("[data-a]").forEach((el) => {
    if (RM || !io) { addCls(el, "in"); return; }
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.9) later(() => onIn(el), 250);
    else { addCls(el, "pre"); io.observe(el); }
  });

  /* ---------- «Что изменится»: строки появляются по мере прокрутки ---------- */
  if (!RM && io) {
    const rows = all<HTMLElement>("#chg .chg-r");
    const queued = new WeakSet<Element>();
    const queue: HTMLElement[] = [];
    let busy = false;
    const next = () => {
      if (!queue.length) { busy = false; return; }
      busy = true;
      const r = queue.shift()!;
      r.classList.remove("wait");
      addCls(r, "half");
      later(() => r.classList.remove("half"), 320);
      later(next, 260);
    };
    const push = (r: HTMLElement) => { if (queued.has(r)) return; queued.add(r); queue.push(r); if (!busy) next(); };
    const o = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { o.unobserve(e.target); push(e.target as HTMLElement); } });
    }, { threshold: 0.5, rootMargin: "0px 0px -8% 0px" });
    observers.push(o);
    rows.forEach((r) => {
      if (r.getBoundingClientRect().top < window.innerHeight * 0.85) return;
      addCls(r, "wait");
      o.observe(r);
    });
    window.addEventListener("scroll", () => {
      rows.forEach((r) => { if (!queued.has(r) && r.getBoundingClientRect().bottom < 0) { o.unobserve(r); push(r); } });
    }, onPassive);
  }

  /* ---------- аккордеоны ---------- */
  const stairs = byId("stairs");
  if (stairs && RM) addCls(stairs, "build");
  all<HTMLButtonElement>(".acc-b").forEach((b) => {
    b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      const panel = byId(b.getAttribute("aria-controls") || "");
      if (!panel) return;
      b.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("open", open);
      if (panel.id === "w4" && stairs && !RM) {
        stairs.classList.remove("build");
        if (open) { void stairs.offsetWidth; later(() => addCls(stairs, "build"), 120); }
      }
    }, on);
  });

  /* ---------- липкая полоса (оглавление + прогресс) ---------- */
  const bar = byId("bbar")!, prog = byId("bb-p")!, gear = root.querySelector<SVGPathElement>("#bb-gear")!;
  {
    const n = 10, ro = 22, ri = 17, s = (2 * Math.PI) / n;
    let d = "";
    for (let i = 0; i < n; i++) {
      const a = i * s;
      ([[ri, a], [ro, a + 0.18 * s], [ro, a + 0.47 * s], [ri, a + 0.65 * s]] as [number, number][]).forEach((q, k) => {
        d += (i === 0 && k === 0 ? "M" : "L") + (q[0] * Math.cos(q[1])).toFixed(2) + " " + (q[0] * Math.sin(q[1])).toFixed(2) + " ";
      });
    }
    gear.setAttribute("d", d + "Z");
  }
  // Шапка сайта: если она липкая/фиксированная, полоса книги встаёт сразу под ней.
  const siteHeader = Array.from(document.querySelectorAll("header")).find((h) => !root.contains(h)) || null;
  const headerOffset = () => {
    if (!siteHeader) return 0;
    const pos = getComputedStyle(siteHeader).position;
    if (pos !== "sticky" && pos !== "fixed") return 0;
    return Math.max(0, Math.round(siteHeader.getBoundingClientRect().bottom));
  };
  const prob = byId("problem")!, pre = byId("preorder")!;
  const links = all<HTMLAnchorElement>("#bb-n a, #bb-dd a");
  const cur = byId("bb-cur")!;
  const mb = byId<HTMLButtonElement>("bb-m")!, dd = byId("bb-dd")!;
  let lastAct = "", ticking = false, lastTop = -1;
  const closeDD = () => { dd.hidden = true; mb.setAttribute("aria-expanded", "false"); };
  function upd() {
    ticking = false;
    const top = headerOffset();
    if (top !== lastTop) { lastTop = top; root.style.setProperty("--lb3-top", top + "px"); }
    const barH = bar.offsetHeight;
    const show = prob.getBoundingClientRect().top <= top + barH + 2;
    bar.classList.toggle("show", show);
    touched.add(bar);
    if (!show) closeDD();
    const start = prob.getBoundingClientRect().top + window.scrollY;
    const end = pre.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
    const p = clamp((window.scrollY - start) / Math.max(1, end - start));
    prog.style.setProperty("--p", String(p));
    gear.setAttribute("transform", "rotate(" + (p * 720).toFixed(1) + ")");
    let act = "";
    GROUPS.forEach((g) => { const el = byId(g[0]); if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) act = g[1]; });
    if (act !== lastAct) {
      lastAct = act;
      links.forEach((a) => a.classList.toggle("on", a.dataset.s === act));
      cur.textContent = act ? NAMES[act] : "Ленивый бюджет";
    }
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; frame(upd); } }, onPassive);
  window.addEventListener("resize", upd, on);
  upd();
  mb.addEventListener("click", (e) => { e.stopPropagation(); const o = dd.hidden; dd.hidden = !o; mb.setAttribute("aria-expanded", String(o)); }, on);
  dd.addEventListener("click", (e) => { if ((e.target as Element).closest("a")) closeDD(); }, on);
  document.addEventListener("click", (e) => { if (!dd.hidden && !(e.target as Element).closest("#bbar")) closeDD(); }, on);

  /* ---------- форма первой главы ---------- */
  const form = byId<HTMLFormElement>("lform")!;
  // TODO: подключить отправку (email-сервис / CRM)
  const submitLeadMagnet = (data: { name: string; email: string }) => data;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = byId<HTMLInputElement>("f-name")!, m = byId<HTMLInputElement>("f-email")!, ok = byId<HTMLInputElement>("f-ok")!;
    let good = true;
    const set = (id: string, msg: string) => { byId(id)!.textContent = msg; if (msg) good = false; };
    set("e-name", n.value.trim() ? "" : "Заполните поле");
    set("e-email", !m.value.trim() ? "Заполните поле" : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value.trim()) ? "" : "Проверьте адрес почты");
    set("e-ok", ok.checked ? "" : "Нужно согласие на обработку данных");
    if (!good) return;
    submitLeadMagnet({ name: n.value.trim(), email: m.value.trim() });
    form.hidden = true;
    byId("lok")!.hidden = false;
  }, on);

  /* ---------- очистка ---------- */
  return () => {
    alive = false;
    ac.abort();
    timers.forEach((t) => clearTimeout(t));
    rafs.forEach((r) => cancelAnimationFrame(r));
    observers.forEach((o) => o.disconnect());
    root.querySelectorAll(".fog > .lay, svg.ink").forEach((n) => n.remove());
    touched.forEach((el) => el.classList.remove("pre", "in", "wait", "half", "build", "show"));
    touched.clear();
    root.classList.remove("anim");
    root.style.removeProperty("--lb3-top");
    html.style.scrollBehavior = prevScrollBehavior;
  };
}
