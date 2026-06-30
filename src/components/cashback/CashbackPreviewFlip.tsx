import { useState } from "react";
import p1 from "@/assets/cashback-preview/page-1.jpg.asset.json";
import p2 from "@/assets/cashback-preview/page-2.jpg.asset.json";
import p3 from "@/assets/cashback-preview/page-3.jpg.asset.json";
import p4 from "@/assets/cashback-preview/page-4.jpg.asset.json";
import p5 from "@/assets/cashback-preview/page-5.jpg.asset.json";
import p6 from "@/assets/cashback-preview/page-6.jpg.asset.json";
import p7 from "@/assets/cashback-preview/page-7.jpg.asset.json";
import p8 from "@/assets/cashback-preview/page-8.jpg.asset.json";
import p9 from "@/assets/cashback-preview/page-9.jpg.asset.json";

const pages = [p1, p2, p3, p4, p5, p6, p7, p8, p9].map((a) => a.url);

export const CashbackPreviewFlip = () => {
  const [i, setI] = useState(0);
  const total = pages.length;
  const prev = () => setI((v) => (v - 1 + total) % total);
  const next = () => setI((v) => (v + 1) % total);

  return (
    <section
      id="preview"
      className="bg-foreground text-background py-20 md:py-28 scroll-mt-24"
    >
      <div className="container-px max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <div className="inline-flex text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              Превью
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight mt-6">
              Полистайте первые страницы
            </h2>
          </div>
          <div className="text-sm text-background/70">
            страница{" "}
            <span className="text-background font-medium">{i + 1}</span> из{" "}
            {total}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto max-w-3xl aspect-[1/1.414] bg-background rounded-lg overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
            {pages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Страница ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                  idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Предыдущая страница"
            onClick={prev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Следующая страница"
            onClick={next}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
          >
            →
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Страница ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i
                  ? "w-8 bg-accent"
                  : "w-4 bg-background/30 hover:bg-background/60"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-background/60 max-w-xl mx-auto">
          Это первые девять страниц июньского выпуска. Полный гайд открывается
          после оплаты.
        </p>
      </div>
    </section>
  );
};
