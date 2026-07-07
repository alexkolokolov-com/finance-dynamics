import { useCallback, useEffect, useRef, useState } from "react";
import p1 from "@/assets/cashback-preview-local/page-1.jpg";
import p2 from "@/assets/cashback-preview-local/page-2.jpg";
import p3 from "@/assets/cashback-preview-local/page-3.jpg";
import p4 from "@/assets/cashback-preview-local/page-4.jpg";
import p5 from "@/assets/cashback-preview-local/page-5.jpg";
import p6 from "@/assets/cashback-preview-local/page-6.jpg";
import p7 from "@/assets/cashback-preview-local/page-7.jpg";
import p8 from "@/assets/cashback-preview-local/page-8.jpg";
import p9 from "@/assets/cashback-preview-local/page-9.jpg";

const pages = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
const N = pages.length;
const FLIP_MS = 650;

const PageImg = ({ src, alt }: { src?: string; alt: string }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className="w-full h-full object-contain pointer-events-none select-none"
    />
  ) : (
    <div className="w-full h-full bg-background" />
  );

export const CashbackPreviewFlip = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // pageIndex = индекс левой страницы текущего разворота на десктопе,
  // или просто индекс единственной страницы на мобиле
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState<null | "next" | "prev">(null);
  const lockRef = useRef(false);

  const spreadCount = Math.ceil(N / 2);
  const spread = Math.floor(page / 2);

  const goNext = useCallback(() => {
    if (lockRef.current) return;
    if (isDesktop) {
      if (spread >= spreadCount - 1) return;
      lockRef.current = true;
      setFlip("next");
      window.setTimeout(() => {
        setPage((spread + 1) * 2);
        setFlip(null);
        lockRef.current = false;
      }, FLIP_MS);
    } else {
      if (page >= N - 1) return;
      lockRef.current = true;
      setPage((p) => p + 1);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 300);
    }
  }, [isDesktop, page, spread, spreadCount]);

  const goPrev = useCallback(() => {
    if (lockRef.current) return;
    if (isDesktop) {
      if (spread <= 0) return;
      lockRef.current = true;
      setFlip("prev");
      window.setTimeout(() => {
        setPage((spread - 1) * 2);
        setFlip(null);
        lockRef.current = false;
      }, FLIP_MS);
    } else {
      if (page <= 0) return;
      lockRef.current = true;
      setPage((p) => p - 1);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 300);
    }
  }, [isDesktop, page, spread]);

  // клавиатура
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // свайп
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    touchX.current = null;
    touchY.current = null;
    if (Math.abs(dx) < 25 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  // источники для разворота
  const leftSrc = pages[spread * 2];
  const rightSrc = pages[spread * 2 + 1];
  const nextLeftSrc = pages[(spread + 1) * 2];
  const nextRightSrc = pages[(spread + 1) * 2 + 1];
  const prevLeftSrc = pages[(spread - 1) * 2];
  const prevRightSrc = pages[(spread - 1) * 2 + 1];

  const label = isDesktop
    ? rightSrc
      ? `${spread * 2 + 1}–${spread * 2 + 2} из ${N}`
      : `${spread * 2 + 1} из ${N}`
    : `${page + 1} из ${N}`;

  const canPrev = isDesktop ? spread > 0 : page > 0;
  const canNext = isDesktop ? spread < spreadCount - 1 : page < N - 1;

  return (
    <section
      id="preview"
      className="bg-foreground text-background py-20 md:py-28 scroll-mt-24"
    >
      <style>{`
        @keyframes cbFlipNext { from { transform: rotateY(0deg); } to { transform: rotateY(-180deg); } }
        @keyframes cbFlipPrev { from { transform: rotateY(0deg); } to { transform: rotateY(180deg); } }
      `}</style>

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
            <span className="text-background font-medium">{label}</span>
          </div>
        </div>

        <div className="relative flex justify-center select-none">
          <button
            type="button"
            aria-label="Предыдущий разворот"
            onClick={goPrev}
            disabled={!canPrev}
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg disabled:opacity-30 disabled:pointer-events-none"
          >
            ←
          </button>

          <div
            className="relative w-full max-w-[960px] md:aspect-[2/1.414] aspect-[1/1.414]"
            style={{ perspective: "2200px", touchAction: "pan-y" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {isDesktop ? (
              <>
                {/* Левая база */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-background overflow-hidden shadow-inner">
                  <PageImg
                    src={flip === "prev" ? prevLeftSrc : leftSrc}
                    alt={`Страница ${spread * 2 + 1}`}
                  />
                </div>
                {/* Правая база */}
                <div className="absolute inset-y-0 right-0 w-1/2 bg-background overflow-hidden shadow-inner">
                  <PageImg
                    src={flip === "next" ? nextRightSrc : rightSrc}
                    alt={`Страница ${spread * 2 + 2}`}
                  />
                </div>

                {/* Перелистываем правую страницу налево */}
                {flip === "next" && (
                  <div
                    className="absolute inset-y-0 left-1/2 w-1/2 z-10"
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "left center",
                      animation: `cbFlipNext ${FLIP_MS}ms ease-in-out forwards`,
                      willChange: "transform",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-background overflow-hidden shadow-2xl"
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <PageImg src={rightSrc} alt="" />
                    </div>
                    <div
                      className="absolute inset-0 bg-background overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <PageImg src={nextLeftSrc} alt="" />
                    </div>
                  </div>
                )}

                {/* Перелистываем левую страницу направо */}
                {flip === "prev" && (
                  <div
                    className="absolute inset-y-0 right-1/2 w-1/2 z-10"
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "right center",
                      animation: `cbFlipPrev ${FLIP_MS}ms ease-in-out forwards`,
                      willChange: "transform",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-background overflow-hidden shadow-2xl"
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <PageImg src={leftSrc} alt="" />
                    </div>
                    <div
                      className="absolute inset-0 bg-background overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(-180deg)",
                      }}
                    >
                      <PageImg src={prevRightSrc} alt="" />
                    </div>
                  </div>
                )}

                {/* Тень корешка */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 pointer-events-none z-[5]"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.18))",
                  }}
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-background overflow-hidden shadow-xl">
                <img
                  key={page}
                  src={pages[page]}
                  alt={`Страница ${page + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none select-none animate-fade-in"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Следующий разворот"
            onClick={goNext}
            disabled={!canNext}
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background text-foreground flex items-center justify-center text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg disabled:opacity-30 disabled:pointer-events-none"
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
