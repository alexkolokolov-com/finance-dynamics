import { useEffect } from "react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Calendar, MapPin, ArrowRight, Quote } from "lucide-react";
import { nbsp } from "@/lib/nbsp";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О встрече", id: "about" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#networking", label: "Люди", id: "networking" },
  { href: "#register", label: "Регистрация", cta: true },
];

const schedule = [
  {
    time: "10:00–10:30",
    title: "Регистрация, знакомство, кофе",
    note: "Приходите заранее, чтобы успеть познакомиться до начала.",
  },
  {
    time: "10:30–11:40",
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
        title: "Часть 4. Новые инструменты, которые я пока нигде подробно не показывал",
        bullets: [
          "практические штуки, которые уже использую сам",
          "почему ими не рассказываю публично",
          "как их применить в вашей ситуации",
        ],
      },
    ],
  },
  {
    time: "11:40–12:30",
    title: "Открытые вопросы на любые темы",
    note: "Можно разобрать несколько реальных финансовых ситуаций участников.",
  },
  {
    time: "12:30–13:30",
    title: "Бранч + нетворкинг",
    note: "Вкусный бранч, живое общение и знакомства без формальных бейджей.",
  },
];

const aboutParagraphs = [
  "Это не формальная лекция и не продажа курса. Мы встречаемся в небольшой компании, чтобы поговорить о деньгах, инвестициях, карьере и планировании — без мистики и «волшебных таблеток».",
  "Главная тема — как принимать финансовые решения в эпоху постоянной неопределенности. Я расскажу, как устроена моя система, что изменилось за последний год, какие инструменты использую и почему большинство планов ломается, когда будущее кажется непредсказуемым.",
  "А потом у нас будет открытый разговор: вы можете задать вопросы или разобрать свою ситуацию. И, конечно, бранч с нетворкингом.",
];

const quoteParagraphs = [
  "Можно годами читать друг друга в соцсетях, но один живой разговор за чашкой кофе иногда оказывается полезнее десятков переписок.",
  "На встрече соберутся люди, которым действительно интересны личные финансы, инвестиции, развитие карьеры, бизнес и осознанное отношение к деньгам. Люди, которые не будут смотреть на вас странно, если вы начнете обсуждать финансовые цели, доходность или долгосрочные планы.",
  "Никакого формального нетворкинга с бейджиками и натянутыми улыбками. Просто вкусный бранч, живое общение и возможность познакомиться с людьми, с которыми вы, возможно, еще не раз пересечетесь в будущем — как друзья, партнеры, клиенты или просто единомышленники.",
  "По моему опыту, именно такие знакомства иногда оказываются самым ценным результатом подобных встреч.",
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
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="animate-fade-up">
            <span className="badge-tag inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Бизнес-завтрак · офлайн
            </span>
          </div>

          <h1
            className="mt-8 font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)] max-w-4xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Бизнес-завтрак с Василием Мещеряковым.
          </h1>

          <p
            className="mt-6 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Как принимать финансовые решения в эпоху постоянной неопределенности.
          </p>

          <div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="border border-foreground/15 bg-card p-4 hard-shadow">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55 mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-accent" /> Когда
              </div>
              <div className="font-display text-lg font-semibold">Дата уточняется</div>
            </div>
            <div className="border border-foreground/15 bg-card p-4 hard-shadow">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55 mb-2 flex items-center gap-2">
                <Clock size={14} className="text-accent" /> Время
              </div>
              <div className="font-display text-lg font-semibold">10:00–13:30</div>
            </div>
            <div className="border border-foreground/15 bg-card p-4 hard-shadow">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55 mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-accent" /> Где
              </div>
              <div className="font-display text-lg font-semibold">Москва, место уточняется</div>
            </div>
            <div className="border border-foreground/15 bg-card p-4 hard-shadow">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55 mb-2 flex items-center gap-2">
                <Users size={14} className="text-accent" /> Формат
              </div>
              <div className="font-display text-lg font-semibold">Офлайн</div>
            </div>
          </div>

          <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
            >
              Зарегистрироваться
              <span className="text-base">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            О встрече
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            Живая встреча, а не лекция.
          </h2>

          <div
            className="mt-12 max-w-3xl space-y-5 text-lg text-foreground/80 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {aboutParagraphs.map((p) => (
              <p key={p}>{nbsp(p)}</p>
            ))}
          </div>
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
            {schedule.map((item, i) => (
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
                {item.subtitle && (
                  <p className="mt-3 font-serif-display text-lg md:text-xl italic text-foreground/70">
                    {nbsp(item.subtitle)}
                  </p>
                )}
                {item.parts && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {item.parts.map((part) => (
                      <div key={part.title}>
                        <h4 className="font-serif-display font-semibold text-lg leading-snug">
                          {nbsp(part.title)}
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {part.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-foreground/80">
                              <span className="text-accent">•</span>
                              <span>{nbsp(b)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {item.note && (
                  <p className="mt-6 text-foreground/70">{nbsp(item.note)}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Networking / Quote */}
      <section id="networking" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Люди
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            Самое ценное — живое общение.
          </h2>

          <figure
            className="mt-12 bg-card border border-foreground/15 p-8 md:p-12 hard-shadow animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Quote size={28} className="text-accent mb-6" />
            <blockquote className="font-serif-display text-xl md:text-2xl leading-relaxed text-foreground/90 space-y-5">
              {quoteParagraphs.map((p) => (
                <p key={p}>{nbsp(p)}</p>
              ))}
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="relative py-24 md:py-32 bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-4xl mx-auto relative text-center">
          <span className="badge-tag inline-flex">Регистрация</span>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-6">
            Забронировать место.
          </h2>
          <p className="mt-5 text-foreground/70 max-w-xl mx-auto">
            Количество мест ограничено. Дату и место сообщим после регистрации.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/Vasily_Mescheryakov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow"
            >
              Зарегистрироваться <ArrowRight size={14} />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/40 font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors"
            >
              На главную
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Event;
