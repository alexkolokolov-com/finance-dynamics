import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import vasily from "@/assets/expert-vasily.jpg";
import { Atom, Briefcase, Quote, type LucideIcon } from "lucide-react";

type FactCard =
  | {
      kind: "bio";
      label: string;
      title: string;
      sub: string;
      icon: LucideIcon;
    }
  | {
      kind: "metric";
      value: string;
      unit?: string;
      sub: string;
    };

const facts: FactCard[] = [
  // пара 1 — биография
  {
    kind: "bio",
    label: "образование",
    title: "ФТИ УрФУ",
    sub: "Прикладная физика и математика",
    icon: Atom,
  },
  {
    kind: "bio",
    label: "карьера",
    title: "Procter & Gamble",
    sub: "Директор по продажам",
    icon: Briefcase,
  },
  // пара 2 — корпоративный результат
  {
    kind: "metric",
    value: "14",
    unit: "лет",
    sub: "корпоративной карьеры",
  },
  {
    kind: "metric",
    value: "6",
    unit: "млрд ₽",
    sub: "бюджет в управлении",
  },
  // пара 3 — практика консультанта
  {
    kind: "metric",
    value: "3",
    unit: "года",
    sub: "консультирования",
  },
  {
    kind: "metric",
    value: "1400",
    sub: "семейных бюджетов разобрано",
  },
];

type CardAboutProps = {
  eyebrow?: string;
  heading?: ReactNode;
  quote?: ReactNode;
  scale?: "hero" | "article";
  cta?: {
    label: string;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  };
};

const defaultHeading = (
  <>
    Личные финансы — это <span className="italic font-normal">физика</span>,
    а не <span className="italic font-normal">магия</span>.
  </>
);

const defaultQuote = (
  <>
    <p>
      Многие совершают ошибки в личных финансах, потому что верят в
      чудеса.
    </p>

    <p>
      Я доступным языком расскажу вам о{" "}
      <span className="underline-accent">законах, по которым приумножается капитал</span>.
    </p>
  </>
);

export const CardAbout = ({
  eyebrow,
  heading,
  quote,
  scale = "hero",
  cta,
}: CardAboutProps = {}) => {
  const isArticle = scale === "article";
  return (
    <section
      id="about"
      className={`relative overflow-hidden bg-grid scroll-mt-20 ${
        isArticle ? "pt-6 md:pt-8 pb-16 md:pb-20" : "pt-8 md:pt-12 pb-24 md:pb-32"
      }`}
    >
      {/* плавный градиент-перетекание */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* заголовок */}
        {eyebrow && (
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5 animate-fade-up">
            {eyebrow}
          </div>
        )}
        <h2
          className={`font-semibold tracking-tight animate-fade-up ${
            isArticle
              ? "font-display leading-[1.12] text-[clamp(1.6rem,3.6vw,2.4rem)]"
              : "font-serif-display leading-[0.95] text-[clamp(2.5rem,8vw,6rem)]"
          }`}
        >
          {heading ?? defaultHeading}
        </h2>

        {/* двухколоночная сетка: речь / эксперт — на планшете тоже в две колонки */}
        <div
          className={`grid grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start ${
            isArticle ? "mt-10 md:mt-12" : "mt-16"
          }`}
        >
          {/* левая колонка — прямая речь */}
          <div
            className="col-span-12 md:col-span-7 animate-fade-up relative"
            style={{ animationDelay: "0.15s" }}
          >
            {/* иконка цитаты слева */}
            <Quote
              className={`absolute -left-1 -top-3 md:-left-6 md:-top-6 text-accent/70 rotate-180 ${
                isArticle ? "hidden" : ""
              }`}
              size={40}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <Quote
              className={`absolute -left-6 -top-6 text-accent/70 rotate-180 ${
                isArticle ? "hidden md:block" : "hidden md:block"
              }`}
              size={isArticle ? 40 : 56}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <div
              className={`font-display leading-[1.45] tracking-tight pl-7 md:pl-14 ${
                isArticle
                  ? "text-lg md:text-xl space-y-4"
                  : "text-xl md:text-2xl lg:text-[1.7rem] space-y-6"
              }`}
            >
              {quote ?? defaultQuote}
            </div>

            {cta && (
              <div className="pl-7 md:pl-14 mt-6 md:mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                {/^https?:\/\//.test(cta.href) ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={cta.onClick}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    to={cta.href}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* правая колонка — фото эксперта (квадрат) */}
          <div
            className="col-span-12 md:col-span-5 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-[56%] md:w-[72%] mx-auto">
              {/* мягкая тёплая подложка под портрет */}
              <span aria-hidden className="absolute -inset-2 rounded-full bg-accent-soft/40 -z-10" style={{ background: "hsl(var(--accent-soft) / 0.45)" }} />
              <img
                src={vasily}
                alt="Василий Мещеряков"
                className="w-full aspect-square object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* лента фактов: 3 пары карточек с разделителями между парами */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-foreground/15 bg-card animate-fade-up ${
            isArticle ? "mt-10 md:mt-12" : "mt-16 md:mt-20"
          }`}
          style={{ animationDelay: "0.45s" }}
        >
          {facts.map((f, i) => {
            // разделитель между парами:
            // lg (6 колонок в ряд): жирная левая граница на 3-й и 5-й (i=2,4)
            // md (3 колонки = 1 пара в ряд): жирная верхняя граница на 3-й и 5-й
            // mobile (2 колонки = 1 пара в ряд): то же — верхняя граница на 3-й и 5-й
            const isPairStart = i === 2 || i === 4;
            const dividerCls = isPairStart
              ? "border-t-2 border-t-foreground/40 md:border-t-2 md:border-t-foreground/40 lg:border-t-0 lg:border-l-2 lg:border-l-foreground/40"
              : "";
            // тонкие внутренние границы между всеми остальными карточками
            const innerCls =
              "border-foreground/10 [&:not(:first-child)]:border-t [&:not(:first-child)]:md:border-t [&:not(:first-child)]:lg:border-t-0 [&:not(:first-child)]:lg:border-l";

            return (
              <div
                key={i}
                className={`p-5 md:p-6 ${innerCls} ${dividerCls}`}
              >
                {f.kind === "bio" ? (
                  <div className="flex flex-col h-full">
                    <div className="w-9 h-9 grid place-items-center bg-foreground text-background mb-4">
                      <f.icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {f.label}
                      </div>
                      <div className="font-serif-display font-semibold text-base lg:text-lg mt-1 leading-tight">
                        {f.title}
                      </div>
                      <div className="font-body text-xs lg:text-sm text-foreground/70 mt-1 leading-snug">
                        {f.sub}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="font-serif-display font-semibold leading-none text-accent text-4xl lg:text-5xl">
                      {f.value}
                      {f.unit && (
                        <span className="font-serif-display italic font-normal text-foreground text-xl lg:text-2xl ml-1">
                          {f.unit}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3 leading-snug">
                      {f.sub}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
