import { useEffect } from "react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { nbsp } from "@/lib/nbsp";
import expertAvatar from "@/assets/expert-vasily.jpg";
import heroPhoto from "@/assets/vasya-brunch.jpg.asset.json";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О встрече", id: "about" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#register", label: "Регистрация", cta: true },
];

const schedule = [
  {
    time: "10:00–10:30",
    title: "Регистрация, знакомство, кофе",
    note: "Приходите заранее, чтобы успеть познакомиться до начала.",
  },
  {
    time: "10:30–12:00",
    title: "Главное выступление",
    subtitle:
      "«Как принимать финансовые решения в эпоху постоянной неопределенности»",
    parts: [
      {
        title:
          "Часть 1. Почему большинство людей принимают правильные решения слишком поздно",
        bullets: [
          "как перестать реагировать на новости",
          "как отличать шум от действительно важных событий",
          "мой подход к финансовым решениям за последние несколько лет",
        ],
      },
      {
        title: "Часть 2. Как устроена моя финансовая система",
        bullets: [
          "что изменилось за последний год",
          "какие решения оказались правильными, а какие — нет",
          "как изменилось мое отношение к инвестициям, недвижимости, валютам, бизнесу",
        ],
      },
      {
        title:
          "Часть 3. Как строить финансовый план, если невозможно предсказать будущее",
        bullets: [
          "почему большинство финансовых планов ломаются",
          "как планировать так, чтобы не бояться кризисов",
          "как перестать жить ожиданием «когда все стабилизируется»",
        ],
      },
      {
        title:
          "Часть 4. Новые инструменты, которые я пока нигде подробно не показывал",
        bullets: [
          "практические штуки, которые уже использую сам",
          "почему ими не рассказываю публично",
          "как их применить в вашей ситуации",
        ],
      },
    ],
  },
  {
    time: "12:00–13:00",
    title: "Открытые вопросы на любые темы",
    bullets: [
      "Можно разобрать несколько реальных финансовых ситуаций участников.",
      "Вкусный бранч, живое общение и знакомства без формальных бейджей.",
    ],
  },
];

const quoteParagraphs = [
  "Можно годами читать друг друга в соцсетях, но один живой разговор за чашкой кофе иногда оказывается полезнее десятков переписок.",
  "На встрече соберутся люди, которым действительно интересны личные финансы, инвестиции, развитие карьеры, бизнес и осознанное отношение к деньгам.",
  "Никакого формального нетворкинга с бейджиками и натянутыми улыбками. Просто вкусный бранч, живое общение и возможность познакомиться с людьми, с которыми вы, возможно, еще не раз пересечетесь в будущем.",
];

const Event = () => {
  useEffect(() => {
    document.title = "Бизнес-завтрак «Вася и финансы»";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Бизнес-завтрак с Василием Мещеряковым: главное выступление о финансовых решениях в неопределенности, открытые вопросы, бранч и нетворкинг.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={pageNav} />

      {/* Hero */}
      <section className="relative pt-24 md:pt-28 lg:pt-40 pb-10 md:pb-16 lg:pb-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          {/* Mobile / Tablet: photo with pills on top and subtitle at bottom */}
          <div className="lg:hidden">
            <div className="relative w-full aspect-[4/5] max-h-[62svh] overflow-hidden border border-foreground/15 hard-shadow bg-card animate-fade-up">
              <img
                src={heroPhoto.url}
                alt="Василий Мещеряков на бизнес-завтраке"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              {/* Pills over photo */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                <span className="badge-tag inline-flex items-center gap-2">
                  <MapPin size={14} className="text-accent" />
                  Москва, Новоданиловская наб.&nbsp;4
                </span>
                <span className="badge-tag inline-flex items-center gap-2">
                  <Calendar size={14} className="text-accent" />
                  1&nbsp;августа, 10:00–13:00
                </span>
              </div>
              {/* Bottom gradient + subtitle */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
              <p className="absolute bottom-4 left-4 right-4 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80">
                Бизнес-завтрак<br />
                с&nbsp;Василием Мещеряковым
              </p>
            </div>

            <h1
              className="mt-6 font-serif-display font-semibold leading-[1.02] tracking-tight text-[clamp(1.6rem,5.6vw,2.6rem)] animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {nbsp("Как принимать финансовые решения в эпоху постоянной неопределенности")}
            </h1>

            <div className="mt-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <a
                href="#register"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
              >
                Зарегистрироваться
                <span className="text-base">→</span>
              </a>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-14 items-center">
            <div className="col-span-7">
              <div className="flex flex-wrap items-center gap-3 animate-fade-up">
                <span className="badge-tag inline-flex items-center gap-2">
                  <Calendar size={14} className="text-accent" />
                  1&nbsp;августа, 10:00–13:00
                </span>
                <span className="badge-tag inline-flex items-center gap-2">
                  <MapPin size={14} className="text-accent" />
                  Москва, Новоданиловская наб.&nbsp;4
                </span>
              </div>

              <h1
                className="mt-8 font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.25rem,5.5vw,4.5rem)] animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {nbsp("Как принимать финансовые решения в эпоху постоянной неопределенности")}
              </h1>

              <p
                className="mt-6 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                {nbsp("Бизнес-завтрак с Василием Мещеряковым")}
              </p>

              <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
                >
                  Зарегистрироваться
                  <span className="text-base">→</span>
                </a>
              </div>
            </div>

            <div className="col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="relative">
                <div
                  className="absolute -inset-4 border border-foreground/15 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/15 pointer-events-none" aria-hidden />
                <div className="relative overflow-hidden border border-foreground/15 hard-shadow aspect-[4/5] bg-card">
                  <img
                    src={heroPhoto.url}
                    alt="Василий Мещеряков на бизнес-завтраке"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-foreground text-background px-4 py-2 font-mono text-[10px] uppercase tracking-widest hard-shadow">
                  River Loft · Москва
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About / Quote */}
      <section id="about" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            О встрече
          </div>

          <figure className="bg-card border border-foreground/15 p-6 md:p-12 hard-shadow animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="flex items-center gap-4 md:flex-col md:items-start md:col-span-3 md:text-left">
                <img
                  src={expertAvatar}
                  alt="Василий Мещеряков"
                  className="w-16 h-16 md:w-36 md:h-36 rounded-full object-cover shrink-0"
                  loading="lazy"
                />
                <figcaption>
                  <div className="font-serif-display font-semibold text-base md:text-lg">
                    Василий Мещеряков
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/55 md:mt-1">
                    Вася и финансы
                  </div>
                </figcaption>
              </div>

              <div className="md:col-span-9">
                <blockquote className="font-serif-display text-lg md:text-2xl leading-relaxed text-foreground/90 md:border-l-0 md:pl-0">
                  {quoteParagraphs.map((p) => (
                    <p key={p} className="mt-4 first:mt-0">
                      {nbsp(p)}
                    </p>
                  ))}
                </blockquote>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="relative py-24 md:py-32 bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Программа
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            Что будет на завтраке.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-6">
            {schedule.map((item, i) => {
              if (item.parts) {
                return (
                  <div key={item.time} className="contents">
                    <article
                      className="bg-card border border-foreground/15 p-7 md:p-9 hard-shadow animate-fade-up"
                      style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                    >
                      <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                        {item.time}
                      </div>
                      <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-3xl">
                        {nbsp(item.title)}
                      </h3>
                      <p className="mt-3 font-serif-display text-lg md:text-xl italic text-foreground/70">
                        {nbsp(item.subtitle)}
                      </p>
                    </article>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {item.parts.map((part, pi) => (
                        <article
                          key={part.title}
                          className="bg-card border border-foreground/15 p-7 md:p-9 hard-shadow animate-fade-up"
                          style={{ animationDelay: `${0.18 + i * 0.08 + pi * 0.06}s` }}
                        >
                          <h4 className="font-serif-display font-semibold text-lg leading-snug">
                            {nbsp(part.title)}
                          </h4>
                          <ul className="mt-4 space-y-2">
                            {part.bullets.map((b) => (
                              <li key={b} className="flex gap-3 text-foreground/80">
                                <span className="text-accent">•</span>
                                <span>{nbsp(b)}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <article
                  key={item.time}
                  className="bg-card border border-foreground/15 p-7 md:p-9 hard-shadow animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                    {item.time}
                  </div>
                  <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-3xl">
                    {nbsp(item.title)}
                  </h3>
                  {item.bullets && (
                    <ul className="mt-6 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-foreground/80">
                          <span className="text-accent">•</span>
                          <span>{nbsp(b)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.note && (
                    <p className="mt-6 text-foreground/70">{nbsp(item.note)}</p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="relative py-24 md:py-32 overflow-hidden bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Регистрация
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            Забронировать место.
          </h2>

          <div
            className="mt-12 bg-card border border-foreground/15 p-7 md:p-10 hard-shadow animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-2">
                  Стоимость
                </div>
                <div className="font-serif-display font-semibold text-5xl md:text-7xl leading-none text-foreground/45 line-through decoration-2">
                  5 000 ₽
                </div>
                <div className="mt-4 font-serif-display font-semibold text-5xl md:text-7xl leading-none text-accent">
                  3 500 ₽
                </div>
                <div className="mt-5 inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hard-shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground animate-pulse" />
                  Первые 10&nbsp;мест по&nbsp;акции
                </div>
              </div>

              <div className="md:border-l md:border-foreground/10 md:pl-12">
                <a
                  href="https://t.me/Vasily_Mescheryakov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Зарегистрироваться <ArrowRight size={14} />
                </a>
                <div className="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-accent" />
                    1&nbsp;августа · 10:00–13:00
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-accent" />
                    Москва, Новоданиловская наб. 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Venue */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Место проведения
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            River Loft.
          </h2>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-up">
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 aspect-[4/3] hard-shadow">
              <img
                src="/river-loft.png"
                alt="River Loft — зал для бизнес-завтрака"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-serif-display font-semibold text-xl md:text-2xl">
                    Москва, Новоданиловская наб. 4
                  </h3>
                  <p className="mt-1 text-foreground/70 text-base md:text-lg leading-relaxed">
                    Уютное место на м. Тульская, на набережной. Удобно добраться, приятно провести время и поговорить о деньгах без спешки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Event;
