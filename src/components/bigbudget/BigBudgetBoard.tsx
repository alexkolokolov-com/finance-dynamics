import type { ReactNode } from "react";
import { ChalkFormulas } from "@/components/bigbudget/ChalkFormulas";
import pennyAvatar from "@/assets/bigbudget/penny.png";
import sheldonAvatar from "@/assets/bigbudget/sheldon.png";

function GrowthChart() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18] z-0"
    >
      <line x1="60" y1="260" x2="560" y2="260" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="260" x2="60" y2="30" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="555,255 562,260 555,265" fill="none" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="55,35 60,28 65,35" fill="none" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="70" y="48" fontFamily="'Caveat', cursive" fontSize="22" fill="var(--chalk-accent, #ffd56b)">доход</text>
      <text x="500" y="282" fontFamily="'Caveat', cursive" fontSize="22" fill="var(--chalk-accent, #ffd56b)">время</text>
      <path
        d="M 60 250 C 180 245, 280 235, 360 200 S 500 90, 555 45"
        fill="none"
        stroke="var(--chalk-accent, #ffd56b)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="60" y1="200" x2="555" y2="200" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.5" />
      <line x1="60" y1="140" x2="555" y2="140" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.5" />
      <line x1="60" y1="80" x2="555" y2="80" stroke="var(--chalk-text, #f5ecd6)" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.5" />
    </svg>
  );
}

/**
 * Меловая «доска» практикума «Теория большого бюджета».
 * Используется как hero на /bigbudget и как блок-анонс на главной.
 * Принимает CTA-ноду — на /bigbudget это диалог регистрации,
 * на главной — Link на /bigbudget.
 */
export const BigBudgetBoard = ({
  date = "19–21 мая 2026",
  cta,
  className = "",
  showAvatars = false,
}: {
  date?: string;
  cta: ReactNode;
  className?: string;
  showAvatars?: boolean;
}) => {
  return (
    <div className={`bigbudget-theme mx-auto max-w-6xl blackboard-frame ${className}`}>
      <div className="blackboard-inner relative overflow-hidden px-4 py-10 md:px-16 md:py-16">
        <ChalkFormulas />
        <GrowthChart />
        <div className="relative z-10 text-center">
          <div className="font-chalk chalk-warm text-2xl md:text-3xl mb-6">{date}</div>
          <h2 className="font-chalk chalk-text leading-[0.95]">
            <span className="block text-5xl md:text-7xl">Теория</span>
            <span className="block text-6xl md:text-[7.5rem] chalk-accent my-2 animate-chalk-pulse">
              БОЛЬШОГО
            </span>
            <span className="block text-5xl md:text-7xl">бюджета</span>
          </h2>
          <p className="mt-8 font-sans chalk-text text-xl md:text-2xl max-w-3xl mx-auto font-normal">
            Бесплатный&nbsp;практикум по&nbsp;личным&nbsp;финансам
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span
              className="chalk-pill !font-sans !font-normal !text-base !tracking-normal"
              style={{ borderColor: "var(--chalk-accent)", color: "var(--chalk-accent)" }}
            >
              Доходы
            </span>
            <span
              className="chalk-pill !font-sans !font-normal !text-base !tracking-normal"
              style={{ borderColor: "var(--chalk-warm)", color: "var(--chalk-warm)" }}
            >
              Расходы
            </span>
            <span
              className="chalk-pill !font-sans !font-normal !text-base !tracking-normal"
              style={{ borderColor: "var(--chalk-blue)", color: "var(--chalk-blue)" }}
            >
              Инвестиции
            </span>
          </div>
          <div className="mt-10">{cta}</div>
        </div>

        {/* аватарки Пенни и Шелдона в правом нижнем углу — только в мини-баннере */}
        {showAvatars && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-3 md:bottom-6 md:right-6 z-10 flex items-end gap-2"
          >
            <img
              src={pennyAvatar}
              alt=""
              className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2"
              style={{ borderColor: "var(--chalk-accent)" }}
            />
            <img
              src={sheldonAvatar}
              alt=""
              className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2"
              style={{ borderColor: "var(--chalk-blue)" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
