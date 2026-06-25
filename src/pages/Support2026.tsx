import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Users, MessageSquare, Calendar, FileText, HelpCircle, Sparkles, HeartHandshake, TrendingUp } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { OrbitDiagram } from "@/components/OrbitDiagram";

const SLIDE = "snap-start min-h-screen w-full flex flex-col justify-center relative px-6 md:px-16 py-20";

function H1({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-foreground">
      {children}
    </h2>
  );
}

/** Прогрессивное появление по клику / стрелкам / пробелу, когда секция в зоне видимости */
function useReveal(total: number, sectionRef: React.RefObject<HTMLElement>) {
  const [n, setN] = useState(0);
  const nRef = useRef(0);
  nRef.current = n;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let active = false;
    const io = new IntersectionObserver(
      ([e]) => { active = e.intersectionRatio > 0.55; },
      { threshold: [0, 0.55, 1] }
    );
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (nRef.current < total) {
          e.preventDefault(); e.stopPropagation();
          setN(v => Math.min(v + 1, total));
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (nRef.current > 0) {
          e.preventDefault(); e.stopPropagation();
          setN(v => Math.max(v - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey, { capture: true } as never);
    };
  }, [total, sectionRef]);

  const next = () => setN(v => (v >= total ? 0 : v + 1));
  return { n, next };
}

const wants = [
  "не\u00A0слиться",
  "не\u00A0откладывать",
  "получать поддержку по\u00A0своим ситуациям",
  "видеть примеры других",
  "сохранять фокус на\u00A0финансах",
];

const inside = [
  { Icon: Calendar, title: "Ежемесячные живые встречи" },
  { Icon: FileText, title: "Разборы ваших фин.\u00A0планов" },
  { Icon: HelpCircle, title: "Ответы на\u00A0вопросы" },
  { Icon: MessageSquare, title: "Обсуждение сложных ситуаций" },
  { Icon: Users, title: "Чат участников" },
  { Icon: Sparkles, title: "Записи всех встреч" },
];

const tariffs = [
  {
    name: "Стандарт",
    points: [
      "онлайн-встречи",
      "записи навсегда",
      "чат со\u00A0мной, ответы на\u00A0вопросы",
      "обновления материалов",
    ],
  },
  {
    name: "Личный финансовый советник",
    points: [
      "всё из\u00A0тарифа «Стандарт»",
      "личная связь со\u00A0мной",
      "индивидуальная поддержка по\u00A0всем вопросам",
    ],
  },
];


const results = [
  { Icon: TrendingUp, title: "Системный прогресс", text: "Каждый месяц прокручиваем шестеренки бюджета" },
  { Icon: HeartHandshake, title: "Поддержка от\u00A0меня", text: "Лично общаюсь с\u00A0вами, разбираю ваши ситуации" },
  { Icon: Sparkles, title: "Обновления материалов", text: "Дерево доходов, кэшбек-гайд и\u00A0другие инструменты" },
  { Icon: Users, title: "Общение с\u00A0единомышленниками", text: "Обмен опытом с\u00A0теми, кто идет к\u00A0цели вместе с\u00A0вами" },
];

/** Растущий график по месяцам — статичный SVG-фон */
function GrowthChart() {
  const months = ["Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  // Высоты столбцов в % от высоты области
  const heights = [22, 34, 48, 62, 78, 95];
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    >
      {/* сетка */}
      {[0.25, 0.5, 0.75, 1].map((y, i) => (
        <line
          key={i}
          x1="60" x2="1160"
          y1={700 - 600 * y} y2={700 - 600 * y}
          stroke="currentColor"
          strokeOpacity="0.06"
          strokeDasharray="2 6"
        />
      ))}
      {/* столбцы */}
      {heights.map((h, i) => {
        const barW = 120;
        const gap = (1100 - barW * 6) / 5;
        const x = 60 + i * (barW + gap);
        const barH = (h / 100) * 600;
        const y = 700 - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              className="fill-accent/15"
            />
            <rect
              x={x}
              y={y}
              width={barW}
              height="4"
              className="fill-accent/60"
            />
            <text
              x={x + barW / 2}
              y={690}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: 18, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}
            >
              {months[i].toUpperCase()}
            </text>
          </g>
        );
      })}
      {/* линия тренда */}
      <polyline
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        points={heights.map((h, i) => {
          const barW = 120;
          const gap = (1100 - barW * 6) / 5;
          const x = 60 + i * (barW + gap) + barW / 2;
          const y = 700 - (h / 100) * 600;
          return `${x},${y}`;
        }).join(" ")}
        className="text-accent"
      />
    </svg>
  );
}

const Support2026 = () => {
  // Слайд 3: поэтапное появление карточек поверх графика
  const continueRef = useRef<HTMLElement>(null);
  const { n: continueStep, next: nextContinue } = useReveal(inside.length, continueRef);

  // Слайд 5: поэтапное раскрытие цен
  const priceRef = useRef<HTMLElement>(null);
  const { n: priceStep, next: nextPrice } = useReveal(3, priceRef);

  // Слайд 6: поэтапное появление карточек «Что вы получите»
  const resultsRef = useRef<HTMLElement>(null);
  const { n: resultsStep, next: nextResults } = useReveal(results.length, resultsRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">

        {/* 1. Title */}
        <section className={SLIDE}>
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <LogoMark size="md" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-xl md:text-2xl tracking-tight">Физика финансов</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Василий&nbsp;Мещеряков
                  </div>
                </div>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight">
                Финансовое<br/>сопровождение<br/>
                <span className="text-accent">2026</span>
              </h1>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <OrbitDiagram className="w-48 md:w-64 lg:w-72 text-foreground" />
            </div>
          </div>
        </section>

        {/* 2. Что вы хотите */}
        <section className={SLIDE}>
          <div className="max-w-5xl">
            <H1>Что вы хотите</H1>
            <ul className="mt-12 space-y-5">
              {wants.map((w, i) => (
                <li key={i} className="flex items-baseline gap-5 text-2xl md:text-3xl">
                  <span className="font-mono text-sm text-accent w-10 shrink-0">0{i+1}</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Сопровождение до конца года — график + карточки по клику */}
        <section
          ref={continueRef}
          className={`${SLIDE} overflow-hidden cursor-pointer select-none`}
          onClick={nextContinue}
        >
          <GrowthChart />
          <div className="relative max-w-6xl w-full">
            <H1>{"Сопровождение"}<br/>{"до\u00A0конца года"}</H1>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {inside.map(({ Icon, title }, i) => {
                const visible = continueStep > i;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 border border-foreground/15 bg-card/90 backdrop-blur p-5 rounded-sm shadow-[var(--shadow-paper)] transition-all duration-500 ease-out ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="shrink-0 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-lg md:text-xl font-medium leading-snug">{title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Тарифы */}
        <section className={SLIDE}>
          <div className="max-w-6xl w-full">
            <H1>Тарифы</H1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tariffs.map((t, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 rounded-sm border-2 ${
                    i === 1 ? "border-accent bg-accent/5" : "border-foreground bg-card"
                  }`}
                >
                  <div className="font-serif text-3xl md:text-4xl font-medium mb-6">{t.name}</div>
                  <ul className="space-y-3">
                    {t.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-lg md:text-xl leading-snug">
                        <Check className={`shrink-0 mt-1 w-5 h-5 ${i === 1 ? "text-accent" : "text-foreground"}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Стоимость — прогрессивное раскрытие */}
        <section ref={priceRef} className={SLIDE} onClick={nextPrice}>
          <div className="max-w-6xl w-full cursor-pointer select-none">
            <H1>Стоимость</H1>

            <div className="mt-10 grid grid-cols-[1.2fr_1fr_1fr] gap-x-6 md:gap-x-10 items-center">
              <div></div>
              <div className="flex justify-center">
                <span className="inline-block px-4 py-2 rounded-sm bg-foreground text-background font-mono text-xs md:text-sm uppercase tracking-[0.2em]">Стандарт</span>
              </div>
              <div className="flex justify-center">
                <span className="inline-block px-4 py-2 rounded-sm bg-accent text-accent-foreground font-mono text-xs md:text-sm uppercase tracking-[0.2em]">Личный советник</span>
              </div>

              {/* За полгода сопровождения — шаг 1 */}
              <PriceRow
                label="За полгода сопровождения"
                visible={priceStep >= 1}
                stdNew={"25\u00A0000\u00A0₽"}
                vipNew={"60\u00A0000\u00A0₽"}
              />

              {/* Спецпредложение для вас — шаг 2 */}
              <PriceRow
                label="Спецпредложение для вас"
                visible={priceStep >= 2}
                stdNew={"14\u00A0900\u00A0₽"}
                vipNew={"39\u00A0900\u00A0₽"}
                accent
              />

              {/* Ограничения — шаг 3 */}
              <PriceRow
                label="Ограничения"
                visible={priceStep >= 3}
                stdNew={"до\u00A010\u00A0июня"}
                vipNew={"первые 7\u00A0мест"}
                small
              />
            </div>
          </div>
        </section>

        {/* 6. Что вы получите */}
        <section ref={resultsRef} className={`${SLIDE} cursor-pointer select-none`} onClick={nextResults}>
          <div className="max-w-6xl w-full">
            <H1>Что вы получите</H1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(({ Icon, title, text }, i) => {
                const visible = resultsStep > i;
                return (
                  <div
                    key={i}
                    className={`p-8 border border-foreground/15 bg-card rounded-sm transition-all duration-500 ease-out ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className={`font-serif text-2xl md:text-3xl font-medium ${title === "Поддержка от\u00A0меня" ? "underline decoration-[#C9A227] decoration-2 underline-offset-4" : ""}`}>{title}</div>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Для кого это */}
        <section className={SLIDE}>
          <div className="max-w-5xl">
            <H1>Для кого это</H1>
            <ul className="mt-12 space-y-5">
              {[
                "Для\u00A0тех, кто\u00A0хочет сохранить результаты курса",
                "Продолжать движение к\u00A0целям",
                "Получать поддержку и\u00A0обратную связь",
                "Не\u00A0заниматься финансами в\u00A0одиночку",
              ].map((t, i) => (
                <li key={i} className="flex items-baseline gap-5 text-2xl md:text-3xl">
                  <span className="font-mono text-sm text-accent w-10 shrink-0">0{i+1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
};

function PriceRow({
  label, visible, stdNew, stdOld, vipNew, vipOld, accent, muted, small,
}: {
  label: string;
  visible: boolean;
  stdNew: string; stdOld?: string;
  vipNew: string; vipOld?: string;
  accent?: boolean;
  muted?: boolean;
  small?: boolean;
}) {
  const base = "py-5 border-t border-foreground/15 transition-all duration-500 ease-out flex items-center";
  const vis = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none";
  const valCls = small
    ? "justify-center font-mono uppercase tracking-[0.15em] text-sm md:text-base text-foreground"
    : `justify-center font-serif ${accent ? "text-4xl md:text-5xl text-accent" : muted ? "text-2xl md:text-3xl text-muted-foreground" : "text-3xl md:text-4xl"}`;
  return (
    <>
      <div className={`${base} ${vis} text-lg md:text-xl ${accent ? "font-medium text-accent" : ""} ${small ? "text-base md:text-lg text-foreground" : ""}`}>{label}</div>
      <div className={`${base} ${vis} ${valCls}`}>
        {stdOld && <span className="line-through text-muted-foreground/60 text-xl md:text-2xl mr-3">{stdOld}</span>}
        {stdNew}
      </div>
      <div className={`${base} ${vis} ${valCls}`}>
        {vipOld && <span className="line-through text-muted-foreground/60 text-xl md:text-2xl mr-3">{vipOld}</span>}
        {vipNew}
      </div>
    </>
  );
}

export default Support2026;
