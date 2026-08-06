import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardCashback } from "@/components/sections/CardCashback";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardProfit } from "@/components/sections/CardProfit";
import { CardTextbook } from "@/components/sections/CardTextbook";
import { Footer } from "@/components/sections/Footer";

import vasilyPortrait from "@/assets/vasily-hero.png.asset.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const cardPageNav = [
  { href: "/consultations", label: "Консультации" },
  { href: "/landing", label: "Сопровождение" },
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/blog", label: "Блог" },
  { href: "/reviews", label: "Отзывы" },
];

const Card = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Вася и финансы · личный сайт";
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
      <SiteHeader pageNav={cardPageNav} />
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto relative">
          {/* split: текст слева / портрет справа */}
          <div className="grid grid-cols-12 gap-3 md:gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div
              className="col-span-12 md:col-span-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2rem,7vw,4.5rem)]">
                Вася <span className="text-accent">и&nbsp;финансы</span>
              </h1>

              <p className="mt-4 md:mt-8 font-display font-semibold leading-[1.2] tracking-tight text-foreground/85 max-w-2xl text-[clamp(1.35rem,3.2vw,2.5rem)]">
                Простыми словами о&nbsp;том, как избавиться от&nbsp;финансовой тревоги и&nbsp;<span className="italic">жить лучше за&nbsp;те&nbsp;же&nbsp;деньги</span>
              </p>

              <div className="hidden md:block mt-8 md:mt-10">
                <Link
                  to="/consultations"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                >
                  <span>Записаться на&nbsp;консультацию</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>

            <div
              className="col-span-12 md:col-span-6 flex flex-col items-center md:items-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-lg aspect-[4/5] mx-auto md:mx-0 overflow-hidden rounded-[1.75rem]">
                <img
                  src={vasilyPortrait.url}
                  alt="Василий Мещеряков"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-[0.9]"
                />

                <div className="absolute inset-x-0 bottom-3 sm:bottom-4 z-10 flex justify-start px-3 sm:px-4">
                  <span className="badge-tag bg-card/95 backdrop-blur-sm text-xs min-[360px]:text-sm md:text-base whitespace-nowrap px-2.5 py-1.5 inline-flex items-center gap-1.5 shadow-sm font-medium">
                    <span>Василий Мещеряков</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span className="text-foreground/80">ex-sales director <span className="text-accent">P&amp;G</span></span>
                  </span>
                </div>
              </div>

              <div className="md:hidden mt-6 w-full max-w-[360px] sm:max-w-[420px] mx-auto">
                <Link
                  to="/consultations"
                  className="flex w-full items-center justify-center gap-2 px-6 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                >
                  <span>Записаться на&nbsp;консультацию</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CardAbout />
      <CardConsultations />
      <CardProfit />
      <CardCashback />
      <CardTextbook />

    </main>
  );
};

export default Card;
