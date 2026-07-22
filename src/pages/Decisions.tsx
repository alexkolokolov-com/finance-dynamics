import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardOffers } from "@/components/sections/CardOffers";
import { CardTextbook } from "@/components/sections/CardTextbook";

import vasilyPortrait from "@/assets/vasily-hero.png.asset.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const decisionsPageNav = [
  { href: "#outcomes", label: "Результаты", id: "outcomes" },
  { href: "#about", label: "О проекте", id: "about" },
  { href: "#consultations", label: "Консультации", id: "consultations" },
  { href: "/bigbudget", label: "Марафон" },
  { href: "/landing", label: "Обучение" },
  { href: "/blog", label: "Блог" },
];

const outcomes = [
  "Перестать совершать дорогие финансовые ошибки",
  "Откладывать без ощущения, что во\u00A0всём себя ограничиваете",
  "Создать финансовую подушку",
  "Закрыть кредиты и\u00A0больше к\u00A0ним не\u00A0возвращаться",
  "Накопить на\u00A0квартиру, машину, путешествия и\u00A0другие крупные цели",
  "Избавиться от\u00A0хаоса в\u00A0деньгах",
  "Понимать, сколько денег можно тратить без\u00A0чувства вины",
  "Подготовиться к\u00A0рождению ребёнка, смене работы, переезду или\u00A0пенсии",
  "Эффективно растить доход, не\u00A0устраиваясь на\u00A02-ю работу",
  "Инвестировать только тогда, когда это имеет смысл",
  "Построить капитал, который будет работать на\u00A0семью",
];

const Decisions = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Правильные финансовые решения · Вася и\u00A0финансы";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Как научиться принимать правильные финансовые решения: закрыть кредиты, создать подушку, накопить на крупные цели и построить капитал — спокойно и без паники.";
    if (desc) desc.setAttribute("content", content);
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [hash]);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader pageNav={decisionsPageNav} />

      {/* HERO */}
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div
              className="col-span-12 md:col-span-7 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="badge-tag">Личные финансы без&nbsp;паники</span>
              <h1 className="mt-6 font-display font-semibold leading-[0.98] tracking-tight text-[clamp(2.5rem,7vw,6rem)]">
                Как принимать{" "}
                <span className="text-accent">правильные</span> финансовые решения
              </h1>

              <p className="mt-8 font-display font-light leading-[1.25] tracking-tight text-[clamp(1.15rem,2.4vw,1.75rem)] text-foreground/85 max-w-2xl">
                Спокойная система, в&nbsp;которой деньги растут без&nbsp;героических усилий,
                хаоса и&nbsp;чувства вины за&nbsp;каждую покупку.
              </p>


              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#outcomes"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow"
                >
                  Что вы получите
                </a>
                <a
                  href="#consultations"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/40 text-foreground font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                >
                  Консультация 1&nbsp;на&nbsp;1
                </a>
              </div>
            </div>

            <div
              className="col-span-12 md:col-span-5 flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative w-full max-w-md aspect-[4/5]">
                <img
                  src={vasilyPortrait.url}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-contain rounded-[1.75rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="relative py-24 md:py-32 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-4">
              <span className="badge-tag">Что это значит</span>
              <h2 className="mt-6 font-display font-semibold leading-[1.02] tracking-tight text-[clamp(2rem,5vw,4rem)]">
                Правильные решения —{" "}
                <span className="text-accent">это конкретно</span>
              </h2>
              <p className="mt-6 font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-md">
                Не\u00A0абстрактная «финансовая грамотность», а\u00A0одиннадцать точных
                результатов, к\u00A0которым мы\u00A0идём вместе.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                {outcomes.map((text, i) => (
                  <li
                    key={i}
                    className="bg-background p-6 md:p-7 flex gap-4 items-start hover:bg-accent-soft/20 transition-colors"
                  >
                    <span className="font-mono text-xs text-accent tracking-widest shrink-0 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-base md:text-lg text-foreground/90 leading-snug">
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CardAbout />
      <CardConsultations />
      <CardOffers />
      <CardTextbook />
    </main>
  );
};

export default Decisions;
