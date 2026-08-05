import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardOffers } from "@/components/sections/CardOffers";
import { CardTextbook } from "@/components/sections/CardTextbook";

import vasilyPortrait from "@/assets/vasily-hero.png.asset.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const cardPageNav = [
  { href: "#about", label: "О проекте", id: "about" },
  { href: "#consultations", label: "Консультации", id: "consultations" },
  { href: "/bigbudget", label: "Марафон" },
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/landing", label: "Обучение" },
  { href: "/blog", label: "Блог" },
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
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div
              className="col-span-12 md:col-span-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2rem,7vw,4.5rem)]">
                Вася <span className="text-accent">и&nbsp;финансы</span>
              </h1>

              <p className="mt-6 md:mt-8 font-display font-semibold leading-[1.2] tracking-tight text-foreground/85 max-w-2xl text-[clamp(1.35rem,3.2vw,2.5rem)]">
                Простыми словами о&nbsp;том, как избавиться от&nbsp;финансовой тревоги и&nbsp;<span className="italic">жить лучше за&nbsp;те&nbsp;же&nbsp;деньги</span>
              </p>

              <div className="mt-8 md:mt-10 hidden md:block">
                <Link
                  to="/consultations"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                >
                  <span>Записаться на&nbsp;консультацию</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>


            {/* портрет справа — split-screen */}
            <div
              className="col-span-12 md:col-span-6 flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative w-full max-w-md aspect-[4/5]">

                <img
                  src={vasilyPortrait.url}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-contain rounded-[1.75rem]"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none rounded-b-[1.75rem]" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-base font-body rounded-full bg-card text-foreground/90 border border-border">
                    Василий Мещеряков
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-base font-body rounded-full bg-card text-foreground/90 border border-border">
                    экс-директор по продажам<br />Procter &amp; Gamble
                  </span>
                </div>

              </div>

              <div className="mt-6 md:hidden flex justify-center">
                <Link
                  to="/consultations"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
                >
                  <span>Записаться на&nbsp;консультацию</span>
                  <span className="text-base">→</span>
                </Link>
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

export default Card;
