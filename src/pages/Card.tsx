import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardOffers } from "@/components/sections/CardOffers";
import { CardTextbook } from "@/components/sections/CardTextbook";

import vasilyLaptop from "@/assets/vasily-laptop.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nbsp } from "@/lib/nbsp";

const cardPageNav = [
  { href: "/consultations", label: "Консультации" },
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/landing", label: "Обучение" },
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
          {/* Mobile / Tablet */}
          <div className="lg:hidden">
            <figure className="relative w-full aspect-[4/5] max-h-[62svh] overflow-hidden border border-foreground/15 hard-shadow bg-card animate-fade-up">
              <img
                src={vasilyLaptop}
                alt="Василий Мещеряков"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                <span className="badge-tag !text-foreground !bg-background/95 !text-sm font-medium shadow-sm">
                  {nbsp("Василий Мещеряков")}
                </span>
                <span className="badge-tag !text-foreground !bg-background/95 !text-sm font-medium shadow-sm">
                  {nbsp("экс-директор по продажам Procter & Gamble")}
                </span>
              </div>
            </figure>

            <h1
              className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-[clamp(1.75rem,6.5vw,2.5rem)] animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Вася и <span className="text-accent">финансы</span>
            </h1>

            <p
              className="mt-4 font-body text-lg text-foreground leading-snug max-w-md animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="font-semibold">
                {nbsp("Простыми словами о том, как избавиться от финансовой тревоги и")}
              </span>
              {"\u00A0"}
              <span className="italic">{nbsp("жить лучше за те же деньги")}</span>
            </p>

            <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/consultations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-body text-sm hover:bg-accent hover:text-foreground transition-colors"
              >
                {nbsp("Записаться на консультацию")}
              </Link>
            </div>
          </div>


          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-14 items-center min-h-[80vh]">
            <div className="col-span-7">
              <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,5vw,4rem)] animate-fade-up">
                Вася <span className="italic font-light">и</span>{" "}
                <span className="text-accent">финансы</span>
              </h1>

              <p
                className="mt-6 font-body text-lg md:text-xl text-foreground/75 leading-relaxed max-w-xl animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="font-semibold text-foreground">
                  {nbsp("Простыми словами о том, как избавиться от финансовой тревоги и")}
                </span>
                {"\u00A0"}
                <span className="italic">{nbsp("жить лучше за те же деньги")}</span>
              </p>

              <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <Link
                  to="/consultations"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm hover:bg-accent transition-colors"
                >
                  Записаться на консультацию
                </Link>
              </div>
            </div>

            <div className="col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <figure className="relative">
                <div
                  className="absolute -inset-4 border border-foreground/15 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/15 pointer-events-none" aria-hidden />
                <div className="relative overflow-hidden border border-foreground/15 hard-shadow aspect-[4/5] bg-card">
                  <img
                    src={vasilyLaptop}
                    alt="Василий Мещеряков"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="badge-tag inline-flex items-center text-xs">
                    {nbsp("Василий Мещеряков")}
                  </span>
                  <span className="badge-tag inline-flex items-center text-xs">
                    {nbsp("экс-директор по продажам Procter & Gamble")}
                  </span>
                </div>
              </figure>
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
