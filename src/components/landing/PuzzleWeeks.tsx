import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Settings,
  ScanSearch,
  HandCoins,
  Landmark,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

type Piece = {
  n: number;
  title: string;
  href: string;
  Icon: LucideIcon;
};

const PIECES: Piece[] = [
  { n: 1, title: "Диагностика системы", href: "#week-1", Icon: Activity },
  { n: 2, title: "Принцип шестерёнок", href: "#week-2", Icon: Settings },
  { n: 3, title: "Чёрные дыры бюджета", href: "#week-3", Icon: ScanSearch },
  { n: 4, title: "Ускорение доходов", href: "#week-4", Icon: HandCoins },
  { n: 5, title: "Инвестиции", href: "#week-5", Icon: Landmark },
  { n: 6, title: "Психология финансов", href: "#week-6", Icon: HeartHandshake },
];

type Edge = "flat" | "tab" | "blank";

const S = 100;

function piecePath(top: Edge, right: Edge, bottom: Edge, left: Edge) {
  const flatLen = 40;
  const bumpLen = 20;
  const r = 11;
  const seg = (e: Edge, side: "top" | "right" | "bottom" | "left"): string => {
    if (e === "flat") {
      switch (side) {
        case "top": return `l ${S} 0 `;
        case "right": return `l 0 ${S} `;
        case "bottom": return `l -${S} 0 `;
        case "left": return `l 0 -${S} `;
      }
    }
    const sweep = e === "tab" ? 0 : 1;
    switch (side) {
      case "top":
        return `l ${flatLen} 0 a ${r} ${r} 0 0 ${sweep} ${bumpLen} 0 l ${flatLen} 0 `;
      case "right":
        return `l 0 ${flatLen} a ${r} ${r} 0 0 ${sweep} 0 ${bumpLen} l 0 ${flatLen} `;
      case "bottom":
        return `l -${flatLen} 0 a ${r} ${r} 0 0 ${sweep} -${bumpLen} 0 l -${flatLen} 0 `;
      case "left":
        return `l 0 -${flatLen} a ${r} ${r} 0 0 ${sweep} 0 -${bumpLen} l 0 -${flatLen} `;
    }
  };

  let d = `M 0 0 `;
  d += seg(top, "top");
  d += seg(right, "right");
  d += seg(bottom, "bottom");
  d += seg(left, "left");
  d += "Z";
  return d;
}

function edgesFor(col: number, row: number, cols: number, rows: number) {
  const rightOf = (c: number, r: number): Edge =>
    (r + c) % 2 === 0 ? "tab" : "blank";
  const bottomOf = (c: number, r: number): Edge =>
    (r + c) % 2 === 1 ? "tab" : "blank";
  const opp = (e: Edge): Edge => (e === "tab" ? "blank" : "tab");

  const top: Edge = row === 0 ? "flat" : opp(bottomOf(col, row - 1));
  const right: Edge = col === cols - 1 ? "flat" : rightOf(col, row);
  const bottom: Edge = row === rows - 1 ? "flat" : bottomOf(col, row);
  const left: Edge = col === 0 ? "flat" : opp(rightOf(col - 1, row));
  return { top, right, bottom, left };
}

function PuzzlePiece({
  piece,
  col,
  row,
  cols,
  rows,
  interactive = true,
}: {
  piece: Piece;
  col: number;
  row: number;
  cols: number;
  rows: number;
  interactive?: boolean;
}) {
  const e = useMemo(() => edgesFor(col, row, cols, rows), [col, row, cols, rows]);
  const d = useMemo(() => piecePath(e.top, e.right, e.bottom, e.left), [e]);

  const Inner = (
    <>
      <svg
        viewBox={`0 0 ${S} ${S}`}
        overflow="visible"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d={d}
          fill="hsl(var(--card))"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          className={
            interactive
              ? "transition-colors duration-300 group-hover:fill-[hsl(var(--accent))]"
              : ""
          }
        />
      </svg>

      <div className="relative h-full w-full flex items-center justify-center p-6 md:p-8 text-center">
        <piece.Icon
          className="absolute inset-0 m-auto w-1/2 h-1/2 text-foreground/[0.07] pointer-events-none"
          strokeWidth={1.25}
        />
        <h3 className="relative font-display font-bold text-foreground text-lg sm:text-xl md:text-2xl lg:text-[1.6rem] leading-[1.05] tracking-tight">
          {piece.title}
        </h3>
      </div>
    </>
  );

  if (!interactive) {
    return <div className="relative block aspect-square">{Inner}</div>;
  }

  return (
    <a href={piece.href} className="group relative block aspect-square">
      {Inner}
    </a>
  );
}

type Props = {
  variant?: "default" | "plan";
  /** Принудительно задать прогресс анимации (для PDF/превью). 0..1 */
  forceProgress?: number;
};

export default function PuzzleWeeks({ variant = "default", forceProgress }: Props) {
  const isPlan = variant === "plan";
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(forceProgress ?? 0); // 0..1

  useEffect(() => {
    if (!isPlan || forceProgress !== undefined) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 — верх блока на нижней кромке вьюпорта; 1 — низ блока на верхней кромке
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // Найти ближайший скроллящийся контейнер (для snap-scroll лендингов вроде /deck)
    const scrollParents: (Window | HTMLElement)[] = [window];
    let p: HTMLElement | null = ref.current?.parentElement ?? null;
    while (p) {
      const s = getComputedStyle(p);
      if (/auto|scroll|overlay/.test(s.overflowY)) scrollParents.push(p);
      p = p.parentElement;
    }
    update();
    scrollParents.forEach((sp) =>
      sp.addEventListener("scroll", onScroll, { passive: true } as never)
    );
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      scrollParents.forEach((sp) =>
        sp.removeEventListener("scroll", onScroll as never)
      );
      window.removeEventListener("resize", onScroll);
    };
  }, [isPlan, forceProgress]);

  // mapping
  const map = (a: number, b: number) =>
    Math.max(0, Math.min(1, (progress - a) / (b - a)));
  const blurAmt = map(0.12, 0.3) * 5; // px
  const puzzleOpacity = 1 - map(0.12, 0.3) * 0.35;
  const line1 = map(0.22, 0.34);
  const line2 = map(0.32, 0.44);
  const line3 = map(0.42, 0.54);

  const Line = ({ t, children }: { t: number; children: React.ReactNode }) => (
    <span
      className="block leading-[1.25] sm:leading-[0.95] my-1.5 sm:my-0"
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * 16}px)`,
        transition: "none",
      }}
    >
      {children}
    </span>
  );

  return (
    <div className="mt-20">
      {!isPlan && (
        <div className="mb-10">
          <h3 className="font-serif-display italic text-2xl md:text-3xl lg:text-4xl text-foreground/85 leading-snug tracking-tight">
            У&nbsp;вас сложится полная картина финансовых инструментов
          </h3>
        </div>
      )}

      <div ref={ref} className="relative w-[80%] mx-auto">
        {/* Пазлы (фон, под оверлеем) */}
        <div
          style={
            isPlan
              ? {
                  filter: `blur(${blurAmt}px)`,
                  opacity: puzzleOpacity,
                  willChange: "filter, opacity",
                }
              : undefined
          }
        >
          {/* Desktop / tablet: 3 cols × 2 rows */}
          <div className="hidden sm:grid grid-cols-3 gap-0">
            {PIECES.map((p, i) => (
              <PuzzlePiece
                key={p.n}
                piece={p}
                col={i % 3}
                row={Math.floor(i / 3)}
                cols={3}
                rows={2}
                interactive={!isPlan}
              />
            ))}
          </div>

          {/* Mobile: 2 cols × 3 rows */}
          <div className="grid sm:hidden grid-cols-2 gap-0">
            {PIECES.map((p, i) => (
              <PuzzlePiece
                key={p.n}
                piece={p}
                col={i % 2}
                row={Math.floor(i / 2)}
                cols={2}
                rows={3}
                interactive={!isPlan}
              />
            ))}
          </div>
        </div>

        {/* Оверлей — три строки контурным шрифтом, по очереди при скролле */}
        {isPlan && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "2px hsl(var(--foreground))",
              fontSize: "clamp(1.25rem, 5.6vw, 5.5rem)",
              textTransform: "uppercase",
            }}
          >
            <Line t={line1}>долгосрочный</Line>
            <Line t={line2}>финансовый</Line>
            <Line t={line3}>план</Line>
          </div>
        )}
      </div>
    </div>
  );
}

