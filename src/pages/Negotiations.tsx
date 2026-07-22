import { useEffect } from "react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { TrafficRegisterDialog } from "@/components/traffic/TrafficRegisterDialog";
import { nbsp } from "@/lib/nbsp";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О тренинге", id: "about" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#register", label: "Регистрация", cta: true },
];

const program = [
  {
    number: "Блок 1",
    title: "Техника «За 10 минут понимаем, КАК именно нужно вести конкретные переговоры»",
    text: "Большинство людей используют один и тот же стиль в любых ситуациях. Я покажу модель, после которой становится понятно:",
    bullets: [
      "когда нужно жестко торговаться",
      "когда вообще нельзя торговаться",
      "когда нужно искать компромисс",
      "когда создавать новую выгоду вместо борьбы за существующую",
      "и стоит ли в принципе заходить в эти переговоры",
    ],
  },
  {
    number: "Блок 2",
    title: "«Переговорный чемоданчик» — набор техник и инструментов на любой случай",
    text: null,
    bullets: [
      "если жесткие переговоры",
      "если мало времени",
      "если у вас мало опыта",
      "если выгоды хочется, но переговариваться страшно",
    ],
  },
  {
    number: "Игра 1",
    title: "Практическая игра №1 — Жесткие переговоры",
    text: "Каждый получает свою роль, цели и скрытую информацию. После раунда разбираем:",
    bullets: [
      "где вы сами отдали деньги",
      "где могли получить больше",
      "какие сигналы не заметили",
      "почему собеседник победил именно вас / или вы победили собеседника",
    ],
  },
  {
    number: "Игра 2",
    title: "Практическая игра №2 — Переговоры с несколькими параметрами",
    text: "У каждой стороны будут свои скрытые интересы. Победит не тот, кто сильнее давит, а тот, кто сумеет собрать максимально выгодную сделку.",
    bullets: [],
  },
  {
    number: "Игра 3",
    title: "Практическая игра №3 — Как достичь взаимной выгоды в переговорах",
    text: "Две конкурирующие компании. Ограниченный ресурс. Всего 15 минут. На первый взгляд интересы противоположны, но одна деталь полностью меняет переговоры.",
    bullets: [],
  },
];

const afterGames = [
  "персональный разбор",
  "обратная связь",
  "ошибки каждого участника",
  "альтернативные стратегии",
  "демонстрация переговоров «как это сделал бы я»",
];

const audience = [
  "владельцам бизнеса / предпринимателям",
  "руководителям",
  "менеджерам по продажам",
  "тем, кто регулярно обсуждает стоимость своих услуг",
  "тем, кто ведет переговоры о зарплате",
  "закупщикам",
  "всем, кто хочет научиться получать лучшие условия не за счет давления, а за счет понимания психологии переговоров",
];

const outcomes = [
  "модель, которую сможете применять практически в любых переговорах",
  "опыт нескольких реальных переговорных игр",
  "понимание собственных слабых мест",
  "персональную обратную связь",
  "десятки приемов, которые можно использовать уже на следующий день",
];

const eventHeroPhoto = { url: `${import.meta.env.BASE_URL}event-hero.jpg` };

const Negotiations = () => {
  useEffect(() => {
    document.title = "Коммерческие переговоры — тренинг-практикум";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Живой тренинг-практикум по коммерческим переговорам. 3,5 часа практики, переговорные игры, персональный разбор ошибок.";
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
          {/* Mobile / Tablet */}
          <div className="lg:hidden">
            <figure className="relative w-full aspect-[4/5] max-h-[62svh] overflow-hidden border border-foreground/15 hard-shadow bg-card animate-fade-up">
              <picture className="absolute inset-0 block">
                <img
                  src={eventHeroPhoto.url}
                  alt="Василий Мещеряков на тренинге по переговорам"
                  className="h-full w-full object-cover"
                  width="1440"
                  height="2560"
                  loading="eager"
                />
              </picture>
              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                <span className="badge-tag inline-flex items-center text-xs">
                  {nbsp("3,5 часа практики")}
                </span>
                <span className="badge-tag inline-flex items-center text-xs">
                  {nbsp("Только 10 мест")}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
              <p className="absolute bottom-4 left-4 right-4 font-serif-display font-semibold text-xl md:text-2xl leading-snug text-foreground">
                {nbsp("Живой тренинг-практикум")}
                <br />
                {nbsp("«Коммерческие переговоры»")}
              </p>
            </figure>

            <h1
              className="mt-6 font-serif-display font-semibold leading-[1.02] tracking-tight text-[clamp(1.6rem,5.6vw,2.6rem)] animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {nbsp("Как вести переговоры, чтобы не уступать деньги")}
            </h1>

            <p
              className="mt-4 text-foreground/80 text-base md:text-lg leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {nbsp(
                "За 3,5 часа вы проведете несколько настоящих переговоров, получите разбор своих ошибок и поймете, почему одни люди постоянно получают выгоду, а другие сами того не замечая уступают."
              )}
            </p>

            <div className="mt-5 animate-fade-up" style={{ animationDelay: "0.3s" }}>
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
                <span className="badge-tag inline-flex items-center text-xs">
                  {nbsp("3,5 часа практики")}
                </span>
                <span className="badge-tag inline-flex items-center text-xs">
                  {nbsp("Только 10 мест")}
                </span>
              </div>

              <p
                className="mt-8 font-serif-display font-semibold text-xl md:text-2xl leading-snug text-foreground/80 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {nbsp("Живой тренинг-практикум «Коммерческие переговоры»")}
              </p>

              <h1
                className="mt-6 font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.25rem,5.5vw,4.5rem)] animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                {nbsp("Как вести переговоры, чтобы не уступать деньги")}
              </h1>

              <p
                className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/80 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                {nbsp(
                  "За 3,5 часа вы проведете несколько настоящих переговоров, получите разбор своих ошибок и поймете, почему одни люди постоянно получают выгоду, а другие сами того не замечая уступают."
                )}
              </p>

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

            <div className="col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <figure className="relative">
                <div
                  className="absolute -inset-4 border border-foreground/15 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/15 pointer-events-none" aria-hidden />
                <div className="relative overflow-hidden border border-foreground/15 hard-shadow aspect-[4/5] bg-card">
                  <picture className="block h-full w-full">
                    <img
                      src={eventHeroPhoto.url}
                      alt="Василий Мещеряков на тренинге по переговорам"
                      className="h-full w-full object-cover"
                      width="1440"
                      height="2560"
                      loading="eager"
                    />
                  </picture>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-foreground text-background px-4 py-2 font-mono text-[10px] uppercase tracking-widest hard-shadow">
                  {nbsp("Оффлайн-формат")}
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* About / Promise */}
      <section id="about" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            О тренинге
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            {nbsp("Это не лекция. Это тренировка.")}
          </h2>
          <p className="mt-6 text-lg md:text-2xl leading-relaxed text-foreground/80 max-w-3xl animate-fade-up">
            {nbsp(
              "И именно поэтому провести ее онлайн невозможно. Практика, моментальная обратная связь и разбор невербалики — то, что практически невозможно воспроизвести онлайн."
            )}
          </p>
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
            {nbsp("Что будет на тренинге")}
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {program.map((item, i) => (
              <article
                key={item.title}
                className="bg-card border border-foreground/15 p-7 md:p-9 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="badge-tag text-xs">{nbsp(item.number)}</span>
                <h3 className="mt-3 font-serif-display font-semibold text-xl md:text-2xl leading-snug">
                  {nbsp(item.title)}
                </h3>
                {item.text && (
                  <p className="mt-3 text-foreground/80 leading-relaxed">{nbsp(item.text)}</p>
                )}
                {item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-foreground/80">
                        <span className="text-accent">•</span>
                        <span>{nbsp(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div
            className="mt-16 bg-card border border-foreground/15 p-7 md:p-10 hard-shadow animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h3 className="font-serif-display font-semibold text-2xl md:text-3xl leading-snug">
              {nbsp("После каждой игры")}
            </h3>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {afterGames.map((b) => (
                <li key={b} className="flex gap-3 text-foreground/80">
                  <span className="text-accent">•</span>
                  <span>{nbsp(b)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="relative py-24 md:py-32">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Кому подойдет
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            {nbsp("Кому особенно полезен тренинг")}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {audience.map((item, i) => (
              <div
                key={item}
                className="bg-card border border-foreground/15 p-6 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="flex gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground/90 leading-relaxed">{nbsp(item)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative py-24 md:py-32 bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Что заберете
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl animate-fade-up">
            {nbsp("Результат после тренинга")}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-4 bg-card border border-foreground/15 p-6 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                  <span className="text-accent font-display font-semibold">{i + 1}</span>
                </div>
                <p className="text-foreground/90 leading-relaxed pt-1">{nbsp(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="relative py-24 md:py-32 bg-board text-primary-foreground">
        <div className="container-px max-w-7xl mx-auto">
          <blockquote className="font-serif-display text-2xl md:text-4xl leading-snug max-w-4xl animate-fade-up">
            {nbsp(
              "За один день вы проведете больше осознанных переговоров, чем большинство людей проводят за несколько лет работы."
            )}
          </blockquote>
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
            {nbsp("Забронировать место")}
          </h2>

          <div
            className="mt-12 bg-card border border-foreground/15 p-7 md:p-10 hard-shadow animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-2">
                  Стоимость
                </div>

                <div className="opacity-50">
                  <div className="font-serif-display font-semibold text-3xl md:text-4xl leading-none text-foreground/70 line-through decoration-2">
                    15 000 ₽
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 bg-foreground/10 text-foreground/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hard-shadow">
                    {nbsp("Стандартная цена")}
                  </div>
                </div>

                <div>
                  <div className="font-serif-display font-semibold text-5xl md:text-6xl leading-none text-accent">
                    9 900 ₽
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hard-shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground animate-pulse" />
                    {nbsp("Только 10 мест по акции")}
                  </div>
                </div>
              </div>

              <div className="md:border-l md:border-foreground/10 md:pl-12">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Зарегистрироваться <ArrowRight size={14} />
                </button>
                <p className="mt-4 text-sm text-foreground/60">
                  {nbsp("Скоро откроется форма регистрации. Следите за обновлениями.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Negotiations;
