import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
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

// A4-ish ratio
const PAGE_W = 480;
const PAGE_H = Math.round(PAGE_W * 1.414);

type PageProps = { src: string; index: number };

// eslint-disable-next-line react-refresh/only-export-components
const Page = ({ src, index }: PageProps) => (
  <div className="bg-background overflow-hidden shadow-inner">
    <img
      src={src}
      alt={`Страница ${index + 1}`}
      loading={index < 2 ? "eager" : "lazy"}
      draggable={false}
      className="w-full h-full object-contain pointer-events-none select-none"
    />
  </div>
);

export const CashbackPreviewFlip = () => {
  const bookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } } | null>(null);
  const [page, setPage] = useState(0);
  const total = pages.length;

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();

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
            <span className="text-background font-medium">
              {Math.min(page + 1, total)}
              {page + 1 < total ? `–${Math.min(page + 2, total)}` : ""}
            </span>{" "}
            из {total}
          </div>
        </div>

        <div className="relative flex justify-center">
          <button
            type="button"
            aria-label="Предыдущий разворот"
            onClick={flipPrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
          >
            ←
          </button>

          {/* @ts-expect-error react-pageflip typings */}
          <HTMLFlipBook
            ref={bookRef}
            width={PAGE_W}
            height={PAGE_H}
            size="stretch"
            minWidth={280}
            maxWidth={600}
            minHeight={400}
            maxHeight={850}
            showCover={true}
            maxShadowOpacity={0.5}
            drawShadow={true}
            mobileScrollSupport={true}
            usePortrait={true}
            flippingTime={650}
            className="cashback-flipbook"
            style={{}}
            startPage={0}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={(e: { data: number }) => setPage(e.data)}
          >
            {pages.map((src, i) => (
              <Page key={src} src={src} index={i} />
            ))}
          </HTMLFlipBook>

          <button
            type="button"
            aria-label="Следующий разворот"
            onClick={flipNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
          >
            →
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-background/60 max-w-xl mx-auto">
          Это первые девять страниц июньского выпуска. Полный гайд открывается
          после оплаты.
        </p>
      </div>
    </section>
  );
};
