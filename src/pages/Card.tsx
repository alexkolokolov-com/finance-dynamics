import { OrbitDiagram } from "@/components/OrbitDiagram";
import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardProject } from "@/components/sections/CardProject";
import { CardSoon } from "@/components/sections/CardSoon";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardTextbook } from "@/components/sections/CardTextbook";
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
    document.title = "Физика финансов · визитка";
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
      <section className="relative min-h-screen pt-20 pb-16 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />

        <div className="container-px max-w-7xl mx-auto relative">

          {/* асимметричная сетка: текст 8 / орбита 4 */}
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
            <div
              className="col-span-12 md:col-span-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {/* название */}
              <h1 className="font-serif-display font-semibold leading-[0.92] tracking-tight text-[clamp(3rem,9vw,9rem)]">
                Физика
                <br />
                <span className="text-accent italic">финансов</span>
              </h1>

              {/* дескриптор — вдвое меньше заголовка */}
              <p className="mt-8 font-serif-display font-normal italic leading-[1.15] tracking-tight text-[clamp(1.5rem,4vw,4rem)]">
                Деньги не берутся
                <br />
                из&nbsp;воздуха —{" "}
                <span className="underline-accent">у&nbsp;них есть законы</span>.
              </p>

              {/* мини-баннер: ближайший практикум */}
              <Link
                to="/bigbudget"
                className="group relative mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 animate-fade-up border border-foreground/25 hover:border-accent bg-card hard-shadow px-5 sm:px-7 py-5 sm:py-6 pr-5 sm:pr-28 transition-colors"
                style={{ animationDelay: "0.35s" }}
              >
                <span className="flex-1 min-w-0">
                  <span className="block font-serif-display font-semibold text-xl sm:text-2xl leading-tight tracking-tight">
                    Теория большого бюджета
                  </span>
                  <span className="mt-1 block font-body text-sm sm:text-base text-foreground/70">
                    Бесплатный практикум · 2 – 4 июня
                  </span>
                  <span className="mt-3 font-mono text-xs uppercase tracking-widest text-foreground/70 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                    зарегистрироваться <span className="text-base">→</span>
                  </span>
                </span>

                {/* аватарки Пенни и Шелдона в правом нижнем углу */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-end -space-x-2"
                >
                  <img
                    src={pennyAvatar}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-background ring-1 ring-foreground/20"
                  />
                  <img
                    src={sheldonAvatar}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-background ring-1 ring-foreground/20"
                  />
                </span>
              </Link>
            </div>

            {/* орбита справа */}
            <div
              className="col-span-12 md:col-span-6 flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <OrbitDiagram className="w-52 sm:w-64 md:w-full max-w-md" />
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
