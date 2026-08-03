import { Link } from "react-router-dom";
import vasilyLaptop from "@/assets/vasily-laptop.jpg";
import { nbsp } from "@/lib/nbsp";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen pt-24 pb-16 overflow-hidden">
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
            {/* Pills over photo */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="badge-tag inline-flex items-center text-xs">
                {nbsp("Василий Мещеряков")}
              </span>
              <span className="badge-tag inline-flex items-center text-xs">
                {nbsp("экс-директор по продажам Procter & Gamble")}
              </span>
            </div>
          </figure>

          <h1
            className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2rem,7.5vw,3rem)] animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Вася <span className="italic font-light">и</span>{" "}
            <span className="text-accent">финансы</span>
          </h1>

          <p
            className="mt-4 font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-md animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="font-semibold text-foreground">
              {nbsp("Простыми словами о том, как избавиться от финансовой тревоги и")}
            </span>
            {"\u00A0"}
            <span className="italic">{nbsp("жить лучше за те же деньги")}</span>
          </p>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/consultations"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm hover:bg-accent transition-colors"
            >
              Записаться на консультацию
            </Link>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-12 gap-14 items-center">
          <div className="col-span-7">
            <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.75rem,5.5vw,4.5rem)] animate-fade-up">
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
              {/* Pills over photo */}
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

        {/* Stats */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mt-20 items-center">
          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 animate-fade-up md:col-start-7" style={{ animationDelay: '0.6s' }}>
            {[
              { n: "14", l: "лет в корпорациях" },
              { n: "3 200+", l: "учеников" },
              { n: "1400+", l: "разобранных бюджетов" },
              { n: "6 млрд ₽", l: "в управлении" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-3">
                <div className="number-display text-3xl md:text-4xl">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
