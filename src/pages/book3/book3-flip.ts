// @ts-nocheck
/*
 * Лендинг «Ленивый бюджет» (/book-3): книга в блоке предзаказа перелистывается от прокрутки.
 * 3D на three.js. Подключается из Book3.tsx динамическим импортом, чтобы three.js
 * грузился отдельно и не утяжелял первый экран.
 * Не переписывать на другие библиотеки и не менять значения без необходимости.
 */
import * as THREE from "three";
import p1 from "@/assets/book3/pages/p1.webp";
import p2 from "@/assets/book3/pages/p2.webp";
import p3 from "@/assets/book3/pages/p3.webp";
import p4 from "@/assets/book3/pages/p4.webp";
import p5 from "@/assets/book3/pages/p5.webp";
import p6 from "@/assets/book3/pages/p6.webp";

function createBookFlip(THREE, container, opts) {
  const pages = opts.pages;              // 6 адресов картинок страниц
  const section = opts.section;          // блок, от которого считается прокрутка
  const startAt = opts.startAt ?? 0.66;  // старт: верх блока на 66% высоты экрана
  const endGap = opts.endGap ?? 30;      // финиш: за 30px до низа страницы
  const topOffset = opts.topOffset || (() => 90); // высота липких панелей сверху: книга не должна уехать под них
  const onDone = opts.onDone || (() => {});

  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const W = 1, H = 1.416;                // пропорции страницы 1000×1416
  const COLS = 60, ROWS = 36;
  const K = 0.55, D = 0.38;              // изгиб вдоль листа и «диагональ» (угол ведёт)
  const G = 0.034, GL = 0.1;             // прогиб у корешка
  const T = 0.045;                       // толщина блока страниц
  let alive = true;

  /* ---------- запасной вариант без WebGL ---------- */
  function fallback() {
    container.classList.add("flip-fallback");
    container.innerHTML = '<div class="ff"><img alt="" src="' + pages[4] + '"><img alt="" src="' + pages[5] + '"></div>';
    onDone(true);
    return () => { container.innerHTML = ""; };
  }

  let renderer;
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return fallback();
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { return fallback(); }

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;opacity:0;transition:opacity .5s ease";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1.25, 0.1, 50);

  /* ---------- свет ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xece6dc, 2.1));
  const sun = new THREE.DirectionalLight(0xfffdf8, 1.35);
  sun.position.set(-1.5, 1.3, 3.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -2.4, right: 2.4, top: 2.0, bottom: -2.0, near: 0.5, far: 9 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.012;
  scene.add(sun);

  const book = new THREE.Group();
  book.rotation.z = -0.1;
  scene.add(book);
  sun.target = book;

  /* ---------- текстуры страниц (+ тень у корешка) ---------- */
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  function makeTex(img, gutterSide) {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(img, 0, 0);
    const gw = c.width * 0.12;
    const g = gutterSide === "left" ? x.createLinearGradient(0, 0, gw, 0) : x.createLinearGradient(c.width, 0, c.width - gw, 0);
    g.addColorStop(0, "rgba(60,45,35,0.20)"); g.addColorStop(0.35, "rgba(60,45,35,0.07)"); g.addColorStop(1, "rgba(60,45,35,0)");
    x.fillStyle = g; x.fillRect(0, 0, c.width, c.height);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAniso;
    return t;
  }
  function mirrored(t) {
    const m = t.clone();
    m.wrapS = THREE.RepeatWrapping; m.repeat.x = -1; m.offset.x = 1; m.needsUpdate = true;
    return m;
  }

  /* ---------- геометрия ---------- */
  const gutter = (ax) => -G * Math.exp(-ax / GL);
  function staticPage(side) {
    const geo = new THREE.PlaneGeometry(W, H, COLS, 8);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const lx = p.getX(i) + W / 2;               // 0..W
      const X = side === "r" ? lx : lx - W;        // правая: 0..W, левая: -W..0
      p.setXYZ(i, X, p.getY(i), gutter(Math.abs(X)));
    }
    geo.computeVertexNormals();
    return geo;
  }
  const paperMat = (map) => new THREE.MeshStandardMaterial({ map, roughness: 0.92, metalness: 0 });
  const leftPage = new THREE.Mesh(staticPage("l"), paperMat(null));
  const rightPage = new THREE.Mesh(staticPage("r"), paperMat(null));
  leftPage.receiveShadow = rightPage.receiveShadow = true;
  book.add(leftPage, rightPage);

  // торцы блока страниц: полосатая «бумажная» текстура
  const edgeCanvas = document.createElement("canvas"); edgeCanvas.width = 8; edgeCanvas.height = 128;
  {
    const x = edgeCanvas.getContext("2d");
    for (let i = 0; i < 128; i++) { const v = 238 - (i % 2) * 10 - (i % 7 === 0 ? 8 : 0); x.fillStyle = "rgb(" + v + "," + (v - 4) + "," + (v - 10) + ")"; x.fillRect(0, i, 8, 1); }
  }
  const edgeTex = new THREE.CanvasTexture(edgeCanvas);
  edgeTex.colorSpace = THREE.SRGBColorSpace;
  edgeTex.wrapS = edgeTex.wrapT = THREE.RepeatWrapping;
  const edgeMat = new THREE.MeshStandardMaterial({ map: edgeTex, roughness: 1 });

  function blockSides() {
    // внешний торец и верх/низ, повторяющие прогиб у корешка
    const pos = [], uv = [], idx = [];
    const push = (x, y, z, u, v) => { pos.push(x, y, z); uv.push(u, v); return pos.length / 3 - 1; };
    for (const side of [-1, 1]) {
      // внешний торец (x = ±W)
      const a = push(side * W, -H / 2, gutter(W), 0, 0), b = push(side * W, H / 2, gutter(W), 1, 0),
        c = push(side * W, H / 2, -T, 1, 1), d = push(side * W, -H / 2, -T, 0, 1);
      idx.push(a, b, c, a, c, d);
      // верх и низ (y = ±H/2)
      for (const ys of [-1, 1]) {
        const N = 24; let prevTop = null, prevBot = null;
        for (let k = 0; k <= N; k++) {
          const ax = (k / N) * W, X = side * ax;
          const top = push(X, ys * H / 2, gutter(ax), k / N * 6, 0), bot = push(X, ys * H / 2, -T, k / N * 6, 1);
          if (prevTop !== null) idx.push(prevTop, top, bot, prevTop, bot, prevBot);
          prevTop = top; prevBot = bot;
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  const sides = new THREE.Mesh(blockSides(), new THREE.MeshStandardMaterial({ map: edgeTex, roughness: 1, side: THREE.DoubleSide }));
  sides.castShadow = true;
  book.add(sides);

  // обложка под блоком
  const cover = new THREE.Mesh(
    new THREE.BoxGeometry(2 * W + 0.07, H + 0.06, 0.028),
    new THREE.MeshStandardMaterial({ color: 0xf1ebe1, roughness: 0.85 })
  );
  cover.position.z = -T - 0.014;
  cover.castShadow = true; cover.receiveShadow = true;
  book.add(cover);

  // пол, на который падает тень книги (сам невидим)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.position.z = -T - 0.029;
  ground.receiveShadow = true;
  book.add(ground);

  // переворачиваемый лист: лицо и оборот на общей геометрии
  const leafGeo = new THREE.PlaneGeometry(W, H, COLS, ROWS);
  const leafFront = new THREE.Mesh(leafGeo, paperMat(null));
  const leafBack = new THREE.Mesh(leafGeo, new THREE.MeshStandardMaterial({ map: null, roughness: 0.92, side: THREE.BackSide }));
  leafFront.castShadow = true;
  leafBack.castShadow = true;
  const leaf = new THREE.Group();
  leaf.add(leafFront, leafBack);
  leaf.visible = false;
  book.add(leaf);

  const lp = leafGeo.attributes.position;
  const ease = (u) => u * u * (3 - 2 * u);
  function bendLeaf(t) {
    const ds = W / COLS;
    for (let r = 0; r <= ROWS; r++) {
      const y = H / 2 - (r * H) / ROWS;
      const v = 1 - r / ROWS;                       // 0 — низ страницы, 1 — верх
      let X = 0, Z = 0;
      for (let c = 0; c <= COLS; c++) {
        let th = 0;
        if (c > 0) {
          const sm = (c - 0.5) / COLS;
          const u = Math.min(1, Math.max(0, t * (1 + K + D) - K * (1 - sm) - D * v));
          th = Math.PI * ease(u);
          X += Math.cos(th) * ds;
          Z += Math.sin(th) * ds;
        }
        const flat = Math.pow(Math.abs(Math.cos(th)), 3);
        lp.setXYZ(r * (COLS + 1) + c, X, y, Z + gutter(Math.abs(X)) * flat + 0.0025);
      }
    }
    lp.needsUpdate = true;
    leafGeo.computeVertexNormals();
    leafGeo.computeBoundingSphere();
  }

  /* ---------- кадр ---------- */
  const fitPts = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
    fitPts.push([sx * (W + 0.035), sy * (H / 2 + 0.03), 0], [sx * (W + 0.035), sy * (H / 2 + 0.03), -T - 0.03]);
  }
  for (const sy of [-1, 1]) for (const x of [-0.35, 0, 0.35]) fitPts.push([x, sy * H / 2, 0.92]);
  const vtmp = new THREE.Vector3();
  function frameCamera() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    book.updateMatrixWorld(true);
    // подбираем расстояние так, чтобы книга и поднятый лист целиком помещались в область
    const dir = new THREE.Vector3(0.012, -0.56, 0.83).normalize();
    const target = new THREE.Vector3(0, 0.0, 0.16);
    const fits = (d) => {
      camera.position.copy(target).addScaledVector(dir, d);
      camera.lookAt(target);
      camera.updateMatrixWorld(true);
      return fitPts.every((q) => {
        vtmp.set(q[0], q[1], q[2]).applyMatrix4(book.matrixWorld).project(camera);
        return Math.abs(vtmp.x) <= 0.94 && Math.abs(vtmp.y) <= 0.94;
      });
    };
    let lo = 1.5, hi = 14;
    for (let k = 0; k < 28; k++) { const mid = (lo + hi) / 2; if (fits(mid)) hi = mid; else lo = mid; }
    fits(hi);
  }

  /* ---------- состояние ---------- */
  let tex = null, cur = 0, target = 0, raf = 0, lastT = 0, lastKey = "";
  function show(q) {
    const k = Math.min(1, Math.floor(q)), t = Math.min(1, q - k);
    let L, R, key;
    if (t <= 0.0005) { L = 2 * k; R = 2 * k + 1; leaf.visible = false; key = "s" + k; }
    else if (t >= 0.9995) { L = 2 * k + 2; R = 2 * k + 3; leaf.visible = false; key = "e" + k; }
    else {
      L = 2 * k; R = 2 * k + 3; key = "f" + k;
      if (lastKey !== key) { leafFront.material.map = tex[2 * k + 1].front; leafBack.material.map = tex[2 * k + 2].back; leafFront.material.needsUpdate = leafBack.material.needsUpdate = true; }
      leaf.visible = true;
      bendLeaf(t);
    }
    if (lastKey !== key) {
      leftPage.material.map = tex[L].front; rightPage.material.map = tex[R].front;
      leftPage.material.needsUpdate = rightPage.material.needsUpdate = true;
      lastKey = key;
    }
    renderer.render(scene, camera);
    onDone(q >= 1.995);
  }

  function computeTarget() {
    if (RM) return 2;
    const vh = window.innerHeight;
    const secTop = section.getBoundingClientRect().top + window.scrollY;
    const start = secTop - vh * startAt;
    const maxScroll = document.documentElement.scrollHeight - vh;
    // финиш: низ страницы или момент, когда книга доходит до верха экрана (на телефоне это раньше)
    const boxTop = container.getBoundingClientRect().top + window.scrollY;
    let end = Math.min(maxScroll - endGap, boxTop - topOffset());
    if (end - start < 260) end = start + 260;
    const p = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
    return 2 * p;
  }
  function tick(now) {
    raf = 0;
    if (!alive || !tex) return;
    const dt = Math.min(64, now - (lastT || now)); lastT = now;
    const diff = target - cur;
    if (Math.abs(diff) < 0.0008) cur = target;
    else cur += diff * (1 - Math.pow(1 - 0.14, dt / 16.7));
    show(cur);
    if (cur !== target) raf = requestAnimationFrame(tick); else lastT = 0;
  }
  function kick() { target = computeTarget(); if (!raf && tex) raf = requestAnimationFrame(tick); }

  const onScroll = () => kick();
  const onResize = () => { frameCamera(); if (tex) show(cur); kick(); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  const ro = new ResizeObserver(onResize); ro.observe(container);

  /* ---------- загрузка страниц ---------- */
  const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.decoding = "async"; i.onload = () => res(i); i.onerror = rej; i.src = src; });
  frameCamera();
  Promise.all(pages.map(loadImg)).then((imgs) => {
    if (!alive) return;
    tex = imgs.map((img, i) => {
      const front = makeTex(img, i % 2 === 1 ? "left" : "right");
      return { front, back: mirrored(front) };
    });
    target = computeTarget();
    cur = RM ? target : target;   // сразу в текущее положение, дальше — плавно
    show(cur);
    renderer.domElement.style.opacity = "1";
  }).catch(() => { if (alive) { renderer.domElement.remove(); fallback(); } });

  /* ---------- очистка ---------- */
  return () => {
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    ro.disconnect();
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    if (tex) tex.forEach((t) => { t.front.dispose(); t.back.dispose(); });
    edgeTex.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

/** Запуск на странице: находит область #pre-flip внутри корня лендинга. Возвращает функцию очистки. */
export function initBookFlip(root: HTMLElement): () => void {
  const el = root.querySelector("#pre-flip");
  const section = root.querySelector("#preorder");
  if (!el || !section) return () => {};
  const card = el.closest(".pre-card");
  return createBookFlip(THREE, el, {
    pages: [p6, p3, p1, p2, p4, p5],
    section,
    topOffset: () =>
      (root.querySelector("#bbar")?.offsetHeight || 60) +
      (parseFloat(getComputedStyle(root).getPropertyValue("--lb3-top")) || 0) + 24,
    onDone: (d) => card && card.classList.toggle("flip-done", d),
  });
}
