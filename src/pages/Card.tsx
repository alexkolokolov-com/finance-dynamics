import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardProject } from "@/components/sections/CardProject";
import { CardSoon } from "@/components/sections/CardSoon";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardTextbook } from "@/components/sections/CardTextbook";
import vasilyPortrait from "@/assets/vasily-portrait.jpg";
import pennyAvatar from "@/assets/bigbudget/penny.png";
import sheldonAvatar from "@/assets/bigbudget/sheldon.png";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
              <p className="text-sm text-muted-foreground mb-6">
                Привет, я&nbsp;Вася
              </p>

              <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(3rem,9vw,8rem)]">
                Вася <br />
                <span className="text-accent">и&nbsp;финансы</span>
              </h1>

              <p className="mt-8 font-display font-light leading-[1.25] tracking-tight text-[clamp(1.25rem,3vw,2.25rem)] text-foreground/85 max-w-xl">
                Помогаю обычным людям спокойно разобраться с&nbsp;деньгами —
                без&nbsp;паники, формул и&nbsp;громких обещаний.
              </p>

              <Link
                to="/bigbudget"
                className="group relative mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 animate-fade-up rounded-2xl border border-border hover:border-accent bg-card hard-shadow px-5 sm:px-7 py-5 sm:py-6 pr-5 sm:pr-28 transition-colors"
                style={{ animationDelay: "0.35s" }}
              >
                <span className="flex-1 min-w-0">
                  <span className="block font-display font-semibold text-xl sm:text-2xl leading-tight tracking-tight">
                    Теория большого бюджета
                  </span>
                  <span className="mt-1 block font-body text-sm sm:text-base text-foreground/70">
                    Бесплатный практикум · 2 – 4 июня
                  </span>
                  <span className="mt-3 text-sm text-foreground/70 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                    зарегистрироваться <span className="text-base">→</span>
                  </span>
                </span>

                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-end -space-x-2"
                >
                  <img
                    src={pennyAvatar}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-background ring-1 ring-border"
                  />
                  <img
                    src={sheldonAvatar}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-background ring-1 ring-border"
                  />
                </span>
              </Link>
            </div>

            {/* портрет справа — split-screen */}
            <div
              className="col-span-12 md:col-span-6 flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative w-full max-w-md aspect-[4/5]">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-accent-soft/40 -z-10"
                  style={{ background: "hsl(var(--accent-soft) / 0.45)" }}
                />
                <img
                  src={vasilyPortrait}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover rounded-[1.75rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CardAbout />
      <CardProject />
      <CardSoon />
      <CardConsultations />
      <CardTextbook />
    </main>
  );
};

export default Card;
