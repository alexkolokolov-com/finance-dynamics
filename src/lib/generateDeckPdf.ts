// Генерация PDF-КП: монтирует <LandingDeck pdfMode={...}/> оффскрин,
// каждая секция помечена data-pdf-slide и имеет фиксированный размер 1920×1080,
// затем html2canvas + jsPDF собирают слайды в один PDF 16:9.

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

// Виртуальный размер слайда в DOM (натуральный, как на десктопном экране ~1280),
// чтобы max-w-7xl/typography занимали привычную долю экрана.
export const SLIDE_W = 1280;
export const SLIDE_H = 720;
// Итоговый PDF — 1920×1080, поэтому html2canvas рендерим с scale=1.5.
export const PDF_W = 1920;
export const PDF_H = 1080;

export type GenerateOpts = {
  discountApplied: Record<number, boolean>;
  seriesApplied: Record<number, boolean>;
  fileName?: string;
  scale?: number;
};

const withTimeout = <T,>(p: Promise<T>, ms: number, tag: string): Promise<T | "timeout"> => {
  let t: ReturnType<typeof setTimeout> | undefined;
  const timer = new Promise<"timeout">((resolve) => {
    t = setTimeout(() => {
      console.warn(`[pdf] timeout ${ms}ms: ${tag}`);
      resolve("timeout");
    }, ms);
  });
  return Promise.race<T | "timeout">([
    p.then((v) => {
      if (t) clearTimeout(t);
      return v;
    }),
    timer,
  ]);
};

const waitForImages = async (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  console.log(`[pdf] waitForImages: ${imgs.length} <img>`);
  // Форсируем загрузку, даже если они вне вьюпорта
  imgs.forEach((img) => {
    try {
      img.loading = "eager";
      img.decoding = "sync";
    } catch {
      /* noop */
    }
  });
  let done = 0;
  await Promise.all(
    imgs.map((img, i) => {
      if (img.complete && img.naturalWidth > 0) {
        done++;
        return Promise.resolve();
      }
      return withTimeout(
        new Promise<void>((res) => {
          const finish = () => res();
          img.addEventListener("load", finish, { once: true });
          img.addEventListener("error", finish, { once: true });
        }),
        6000,
        `img#${i} ${img.src.slice(0, 80)}`
      ).then(() => {
        done++;
      });
    })
  );
  console.log(`[pdf] waitForImages: ready ${done}/${imgs.length}`);
};

export async function generateDeckPdf({
  discountApplied,
  seriesApplied,
  fileName = "profit-kp",
  scale = PDF_W / SLIDE_W,
}: GenerateOpts) {
  console.log("[pdf] start");
  // динамический импорт, чтобы избежать круговой зависимости
  const { default: LandingDeck } = await import("@/pages/LandingDeck");

  // оффскрин-хост в реальном вьюпорте (opacity:0): html2canvas корректно
  // клонирует фоны/градиенты только для узлов, физически находящихся в окне.
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    `width:${SLIDE_W}px`,
    "z-index:2147483000",
    "opacity:0",
    "pointer-events:none",
    "background:#f5f3ee",
  ].join(";");
  document.body.appendChild(host);

  const root = createRoot(host);

  try {
    root.render(
      createElement(LandingDeck, {
        pdfMode: { discountApplied, seriesApplied },
      } as never)
    );

    // подождать, пока React смонтирует и браузер прогонит layout
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r()))
    );
    console.log("[pdf] mounted");

    if (document.fonts?.ready) {
      try {
        await withTimeout(document.fonts.ready as unknown as Promise<unknown>, 4000, "fonts.ready");
      } catch {
        /* noop */
      }
    }
    console.log("[pdf] fonts ready");

    await waitForImages(host);
    // запас под svg/шрифты
    await new Promise<void>((r) => setTimeout(r, 400));

    const slides = Array.from(
      host.querySelectorAll<HTMLElement>("[data-pdf-slide]")
    );
    if (!slides.length) throw new Error("Слайды для PDF не найдены");
    console.log(`[pdf] slides found: ${slides.length}`);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [PDF_W, PDF_H],
      hotfixes: ["px_scaling"],
    });

    let pagesAdded = 0;
    for (let i = 0; i < slides.length; i++) {
      const node = slides[i];
      // проматываем хост так, чтобы текущий слайд оказался в верхней части окна
      const rect = node.getBoundingClientRect();
      const scrollDelta = rect.top + window.scrollY;
      window.scrollTo(0, scrollDelta);
      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      );

      console.log(`[pdf] slide ${i + 1}/${slides.length} → html2canvas`);
      const t0 = performance.now();
      const result = await withTimeout(
        html2canvas(node, {
          scale,
          backgroundColor: "#f5f3ee",
          useCORS: true,
          logging: false,
          width: SLIDE_W,
          height: SLIDE_H,
          windowWidth: SLIDE_W,
          windowHeight: SLIDE_H,
        }),
        25000,
        `html2canvas slide ${i + 1}`
      );
      if (result === "timeout" || !(result as HTMLCanvasElement)?.toDataURL) {
        console.warn(`[pdf] skip slide ${i + 1} (timeout/no canvas)`);
        continue;
      }
      const canvas = result as HTMLCanvasElement;
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      if (pagesAdded > 0) pdf.addPage([PDF_W, PDF_H], "landscape");
      pdf.addImage(dataUrl, "JPEG", 0, 0, PDF_W, PDF_H, undefined, "FAST");
      pagesAdded++;
      console.log(`[pdf] slide ${i + 1} done in ${Math.round(performance.now() - t0)}ms`);
    }

    if (!pagesAdded) throw new Error("Ни один слайд не отрисован");
    console.log(`[pdf] saving (${pagesAdded} pages)`);
    pdf.save(`${fileName}.pdf`);
    console.log("[pdf] saved");
  } finally {
    root.unmount();
    host.remove();
    document.documentElement.style.overflow = prevOverflow;
    window.scrollTo(0, 0);
  }
}
