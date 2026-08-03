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
              <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(3rem,9vw,8rem)]">
                Вася <br />
                <span className="text-accent">и&nbsp;финансы</span>
              </h1>

              <p className="mt-8 font-display font-light leading-[1.25] tracking-tight text-[clamp(1.25rem,3vw,2.25rem)] text-foreground/85 max-w-xl">
                Помогаю обычным людям спокойно разобраться с&nbsp;деньгами —
                без&nbsp;паники, формул и&nbsp;громких обещаний.
              </p>
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

              </div>
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
