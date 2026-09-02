import { useEffect } from "react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Send, Mail } from "lucide-react";
import { nbsp } from "@/lib/nbsp";
import expertPhoto from "@/assets/expert-vasily.jpg";

const pageNav: HeaderNavLink[] = [
  { href: "#requests", label: "Запросы людей", id: "requests" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#formats", label: "Форматы", id: "formats" },
  { href: "#diagnostic", label: "Диагностика", cta: true },
];

const TG = "https://t.me/Vasily_Mescheryakov";

const chain = [
  "Рост дохода",
  "Больше обязательств и решений",
  "Нет системы",
  "Финансовый хаос, тревога, жизнь «в ноль»",
];

const commitments = [
  "Ипотека",
  "Машина",
  "Дети",
  "Путешествия",
  "Инвестиции",
  "Страховки",
  "Налоги",
  "Крупные покупки",
  "Помощь родителям",
  "Будущая пенсия",
];

const bigCases = [
  {
    income: "450 000 ₽",
    who: "Нефтегазовая отрасль",
    quote: "Не выходить в ноль перед зарплатой",
  },
  {
    income: "340 000 ₽",
    who: "Менеджер фармацевтической компании",
    quote: "Не могу позволить себе отдых, который хочу",
  },
  {
    income: "300 000 ₽",
    who: "Руководитель отдела продаж",
    quote: "Победить хаос в личных финансах",
  },
];

const smallRequests = [
  "Доход вырос, но всё равно выходим примерно в ноль",
  "Деньги каждый месяц заканчиваются в ноль. Не могу накопить вообще ни на что",
  "Хочу понять, сколько реально стоит моя жизнь в месяц и в год",
  "Хочу финансовый план на 15–20 лет",
  "Хочу перестать тревожиться из-за денег",
  "Хочу понять, сколько мне нужно накопить к пенсии",
];

const steps = [
  {
    n: "01",
    title: "Считает реальную стоимость своей жизни",
    text: "Не «сколько я примерно трачу», а сколько на самом деле стоит месяц и год с учётом отпусков, страховок, ремонта, крупных покупок и нерегулярных расходов.",
  },
  {
    n: "02",
    title: "Собирает бюджет, которым реально сможет пользоваться",
    text: "Без необходимости записывать каждую чашку кофе.",
  },
  {
    n: "03",
    title: "Определяет размер финансовой подушки",
    text: "И понимает, где и в каких инструментах её хранить.",
  },
  {
    n: "04",
    title: "Планирует крупные расходы заранее",
    text: "Машина, ремонт, путешествия, образование детей, переезд и другие большие траты перестают возникать «внезапно».",
  },
  {
    n: "05",
    title: "Разбирается с кредитами и ипотекой",
    text: "Когда выгодно гасить досрочно, когда нет, и как долговая нагрузка влияет на остальные цели.",
  },
  {
    n: "06",
    title: "Формулирует финансовые цели на несколько горизонтов",
    text: "1 год → 3 года → 10+ лет.",
  },
  {
    n: "07",
    title: "Понимает, какой капитал ему понадобится",
    text: "В том числе для пенсии, образования детей и других долгосрочных целей.",
  },
  {
    n: "08",
    title: "Собирает личный финансовый план",
    text: "Не набор советов, а систему принятия финансовых решений на годы вперёд.",
  },
];

const companyValue = [
  {
    label: "Финансовое wellbeing",
    text: "Компания помогает снизить один из постоянных источников бытового стресса — неопределённость вокруг денег.",
  },
  {
    label: "Ценность компенсационного пакета",
    text: "Сотрудник получает инструмент, который может иметь для него практическую ценность годами.",
  },
  {
    label: "Забота, которую можно почувствовать",
    text: "Не абстрактный доступ к ещё одной образовательной платформе, а решение собственных финансовых вопросов.",
  },
  {
    label: "Более устойчивая команда",
    text: "Когда личные финансовые вопросы структурированы, сотруднику проще планировать свою жизнь и принимать решения без постоянной финансовой неопределённости.",
  },
];

const noSell = [
  "инвестиционные продукты",
  "страховки",
  "брокерские счета",
  "банковские продукты",
  "дополнительные финансовые услуги",
];

const facts = [
  "ex P&G, руководящие позиции",
  "2,5+ года провожу корпоративные тренинги",
  "Тысячи участников образовательных программ",
  "Telegram-сообщество 10 000+ человек",
  "Автор собственной методики личного финансового плана",
];

const formats = [
  {
    kicker: "Формат 1 · Знакомство с темой",
    title: "Вводный воркшоп",
    duration: "1,5–2 часа",
    fitLabel: "Подходит, если компания хочет",
    fit: [
      "проверить интерес сотрудников",
      "провести полезное корпоративное мероприятие",
      "впервые запустить тему financial wellbeing",
    ],
    insideLabel: "Что внутри",
    inside: [
      "диагностика финансовых проблем",
      "основные принципы личной финансовой системы",
      "несколько решений, которые можно внедрить сразу",
    ],
  },
  {
    kicker: "Формат 2 · Собрать собственную систему",
    title: "Корпоративный интенсив",
    duration: "1–2 дня",
    fitLabel: "Подходит, если нужен практический результат",
    fit: ["сотрудники работают со своими реальными цифрами, а не с примерами из учебника"],
    insideLabel: "Что собирают участники",
    inside: [
      "бюджет",
      "систему целей",
      "финансовую подушку",
      "план крупных расходов",
      "базовый личный финансовый план",
    ],
  },
  {
    kicker: "Формат 3 · Изменить финансовые привычки",
    title: "Программа сопровождения",
    duration: "3 месяца",
    fitLabel: "Подходит компаниям, которые хотят",
    fit: ["сделать financial wellbeing полноценным корпоративным benefit"],
    insideLabel: "Внутри",
    inside: [
      "регулярные групповые встречи",
      "практические задания",
      "разбор финансовых ситуаций",
      "индивидуальная работа, если она входит в пакет",
      "отслеживание прогресса",
      "агрегированная обратная связь для HR без раскрытия персональных финансовых данных сотрудников",
    ],
  },
];

const diagnosticOutcomes = [
  "какие денежные вопросы беспокоят сотрудников",
  "какие темы для них наиболее актуальны",
  "где сотрудники чувствуют наибольшую неопределённость",
  "какой образовательный формат имеет смысл запускать",
];

const SectionLabel = ({ children }: { children: string }) => (
  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
    {children}
  </div>
);

const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2
    className={`font-serif-display font-semibold leading-[1.02] tracking-tight text-3xl md:text-5xl lg:text-6xl animate-fade-up max-w-4xl ${className}`}
  >
    {children}
  </h2>
);

const Cta = ({
  label,
  className = "",
  variant = "solid",
}: {
  label: string;
  className?: string;
  variant?: "solid" | "outline" | "inverse";
}) => {
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:bg-accent hover:text-foreground hard-shadow"
      : variant === "inverse"
        ? "bg-primary-foreground text-primary hover:bg-accent hover:text-primary-foreground"
        : "border border-foreground/25 text-foreground hover:border-accent hover:text-accent";
  return (
    <a
      href={TG}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-xs uppercase tracking-widest transition-colors ${styles} ${className}`}
    >
      <span>{label}</span>
      <span className="text-base">→</span>
    </a>
  );
};

const Corporate = () => {
  useEffect(() => {
    document.title = "Личная финансовая устойчивость сотрудников — корпоративная программа";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Корпоративная программа по личной финансовой устойчивости сотрудников: бюджет, финансовая подушка, крупные цели и личный финансовый план. Первый шаг — анонимная диагностика финансовых запросов команды.";
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

      {/* 1. Hero */}
      <section className="relative pt-24 md:pt-36 lg:pt-40 pb-16 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 animate-fade-up">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 md:mb-10">
                {nbsp("Корпоративная программа для сотрудников")}
              </div>
              <h1 className="font-serif-display font-semibold leading-[1.0] tracking-tight text-[clamp(2rem,6vw,5rem)]">
                {nbsp("Зарплата выросла.")}
                <br />
                <span className="italic font-normal">
                  {nbsp("А ощущения, что денег стало больше — нет.")}
                </span>
              </h1>

              <div className="mt-8 md:mt-12 max-w-2xl space-y-5 font-body text-base md:text-lg leading-relaxed text-foreground/75">
                <p>
                  {nbsp(
                    "У сотрудника может быть хороший доход и одновременно ипотека, кредитки, отсутствие накоплений, тревога перед крупными покупками и ощущение «куда опять делись деньги?»."
                  )}
                </p>
                <p>
                  {nbsp(
                    "Я помогаю сотрудникам превратить доход в понятную систему: бюджет, финансовую подушку, крупные цели и личный финансовый план."
                  )}
                </p>
              </div>

              <div className="mt-10">
                <Cta label="Обсудить программу" />
                <p className="mt-4 font-body text-xs md:text-sm text-foreground/50">
                  {nbsp("Василий Мещеряков · ex P&G · автор проекта «Вася и финансы»")}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="relative w-full max-w-[380px] lg:max-w-none aspect-square mx-auto overflow-hidden rounded-2xl">
                <img
                  src={expertPhoto}
                  alt="Василий Мещеряков"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Парадокс */}
      <section className="relative py-16 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Парадокс")}</SectionLabel>
          <H2>{nbsp("Хороший доход не гарантирует финансового спокойствия")}</H2>

          <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-6 font-body text-base md:text-lg leading-relaxed text-foreground/80 animate-fade-up">
              <p>
                {nbsp(
                  "Чем больше человек зарабатывает, тем больше у него обычно становится не только возможностей, но и финансовых решений."
                )}
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 pt-2">
                {commitments.map((c) => (
                  <li
                    key={c}
                    className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-foreground/70 border border-foreground/15 px-3 py-2"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="pt-2">
                {nbsp(
                  "Доход растёт, вместе с ним растёт стоимость жизни и количество решений, которые нужно принимать. А личной финансовой системы часто так и не появляется."
                )}
              </p>
              <p>
                {nbsp(
                  "В результате человек может зарабатывать 200, 300 или 500 тысяч рублей и всё равно каждый месяц начинать почти заново."
                )}
              </p>
            </div>

            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <ol className="space-y-0">
                {chain.map((c, i) => (
                  <li key={c}>
                    <div
                      className={`font-serif-display leading-tight tracking-tight text-xl md:text-2xl py-5 ${
                        i === chain.length - 1 ? "text-accent" : "text-foreground/85"
                      }`}
                    >
                      {nbsp(c)}
                    </div>
                    {i !== chain.length - 1 && (
                      <div className="text-foreground/25 font-mono text-sm" aria-hidden="true">
                        ↓
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Реальные запросы */}
      <section id="requests" className="relative py-16 md:py-28 border-t border-foreground/10 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Реальные запросы")}</SectionLabel>
          <H2>{nbsp("С какими задачами приходят люди с хорошим доходом")}</H2>
          <p className="mt-6 font-body text-base md:text-lg text-foreground/70 max-w-2xl animate-fade-up">
            {nbsp(
              "Это реальные запросы участников моих программ. Доходы и профессии показаны обезличенно."
            )}
          </p>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/12 border border-foreground/12">
            {bigCases.map((c, i) => (
              <div
                key={c.income}
                className="bg-background p-7 md:p-9 flex flex-col animate-fade-up"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="font-serif-display font-semibold tracking-tight text-3xl md:text-4xl">
                  {nbsp(c.income)}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-foreground/45">
                  {nbsp("в месяц")}
                </div>
                <div className="mt-4 font-body text-sm text-foreground/60">{nbsp(c.who)}</div>
                <p className="mt-8 font-serif-display italic text-xl md:text-2xl leading-snug text-foreground/90">
                  {nbsp(`«${c.quote}»`)}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {smallRequests.map((r) => (
              <li
                key={r}
                className="font-body text-base text-foreground/70 border-b border-foreground/10 pb-4"
              >
                {nbsp(`«${r}»`)}
              </li>
            ))}
          </ul>

          <p className="mt-14 md:mt-20 font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-4xl lg:text-5xl max-w-4xl animate-fade-up">
            {nbsp("Проблема не всегда в размере зарплаты. Часто проблема в отсутствии системы.")}
          </p>
        </div>
      </section>

      {/* 4. Роль компании */}
      <section className="relative py-20 md:py-36 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <p className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-5xl animate-fade-up">
            {nbsp("Компания не может решить за сотрудника его финансовые проблемы.")}{" "}
            <span className="italic font-normal text-accent">
              {nbsp("Но может дать ему инструменты, чтобы он решил их сам.")}
            </span>
          </p>

          <div className="mt-12 md:mt-20 max-w-2xl space-y-6 font-body text-base md:text-lg leading-relaxed text-foreground/75 animate-fade-up">
            <p>
              {nbsp(
                "Именно поэтому я предлагаю компаниям не очередную лекцию по «финансовой грамотности», а практическую программу по личной финансовой устойчивости сотрудников."
              )}
            </p>
            <p>
              {nbsp(
                "Сотрудник работает со своими реальными цифрами, решениями и целями и в итоге собирает собственную финансовую систему."
              )}
            </p>
          </div>

          <div className="mt-12 md:mt-16 border-t border-foreground/15 pt-8">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              {nbsp("Программа")}
            </div>
            <div className="mt-3 font-serif-display font-semibold tracking-tight text-2xl md:text-4xl">
              {nbsp("Личная финансовая устойчивость сотрудников")}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Что делает сотрудник */}
      <section id="program" className="relative py-16 md:py-28 border-t border-foreground/10 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Что происходит внутри")}</SectionLabel>
          <H2>
            {nbsp("Не лекция про деньги.")}
            <br />
            <span className="italic font-normal">{nbsp("Сотрудник разбирает собственные финансы.")}</span>
          </H2>

          <div className="mt-12 md:mt-20">
            {steps.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 border-t border-foreground/12 py-8 md:py-10 animate-fade-up"
              >
                <div className="md:col-span-1 font-mono text-xs uppercase tracking-widest text-accent pt-1">
                  {s.n}
                </div>
                <h3 className="md:col-span-6 font-serif-display font-semibold leading-[1.1] tracking-tight text-xl md:text-3xl">
                  {nbsp(s.title)}
                </h3>
                <p className="md:col-span-5 font-body text-base text-foreground/70 leading-relaxed">
                  {nbsp(s.text)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-14 md:mt-20 font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-4xl lg:text-5xl max-w-4xl animate-fade-up">
            {nbsp("Цель программы не научить человека экономить.")}{" "}
            <span className="italic font-normal text-accent">
              {nbsp("Цель — помочь ему лучше использовать деньги, которые он уже зарабатывает.")}
            </span>
          </p>
        </div>
      </section>

      {/* 6. Зачем компании */}
      <section className="relative py-16 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Сторона компании")}</SectionLabel>
          <H2>{nbsp("Зачем это компании")}</H2>
          <p className="mt-6 font-body text-base md:text-lg text-foreground/75 max-w-2xl animate-fade-up">
            {nbsp(
              "Финансовая программа — это benefit, который сотрудник использует не только на работе, а в собственной жизни."
            )}
          </p>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {companyValue.map((b, i) => (
              <div
                key={b.label}
                className="border-t border-foreground/15 pt-6 animate-fade-up"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-accent">
                  {nbsp(b.label)}
                </div>
                <p className="mt-4 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
                  {nbsp(b.text)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-14 md:mt-20 font-serif-display italic text-xl md:text-3xl leading-snug text-foreground/90 max-w-3xl border-l-2 border-accent pl-6 md:pl-8 animate-fade-up">
            {nbsp(
              "Программа не заменяет конкурентную зарплату. Она помогает сотруднику получить больше пользы от дохода, который у него уже есть."
            )}
          </p>
        </div>
      </section>

      {/* 7. Никаких продаж */}
      <section className="relative py-16 md:py-28 bg-board text-primary-foreground">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                {nbsp("Границы работы")}
              </div>
              <h2 className="font-serif-display font-semibold leading-[1.02] tracking-tight text-3xl md:text-5xl">
                {nbsp("Никаких продаж сотрудникам")}
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="font-body text-base md:text-lg text-primary-foreground/75 leading-relaxed">
                {nbsp("Внутри корпоративной программы я не продаю участникам:")}
              </p>
              <ul className="mt-6 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                {noSell.map((n) => (
                  <li
                    key={n}
                    className="py-4 font-serif-display text-lg md:text-2xl text-primary-foreground/90"
                  >
                    {nbsp(n)}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-4 font-body text-base md:text-lg text-primary-foreground/75 leading-relaxed">
                <p>
                  {nbsp(
                    "Я не получаю комиссию за выбор участниками конкретных финансовых инструментов."
                  )}
                </p>
                <p>
                  {nbsp("Цель программы — научить человека самостоятельно принимать финансовые решения.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Кто ведёт */}
      <section className="relative py-16 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Кто ведёт программу")}</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 animate-fade-up">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] max-w-md">
                <img
                  src={expertPhoto}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "0.12s" }}>
              <h2 className="font-serif-display font-semibold leading-[1.02] tracking-tight text-3xl md:text-5xl">
                {nbsp("Василий Мещеряков")}
              </h2>
              <p className="mt-3 font-body text-base text-foreground/60">
                {nbsp("Автор проекта «Вася и финансы»")}
              </p>

              <ul className="mt-8 divide-y divide-foreground/12 border-y border-foreground/12">
                {facts.map((f) => (
                  <li key={f} className="py-4 font-body text-base md:text-lg text-foreground/80">
                    {nbsp(f)}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-serif-display text-lg md:text-2xl leading-snug text-foreground/85">
                {nbsp(
                  "Мой подход вырос не из теории финансовой грамотности, а из работы с реальными финансовыми решениями людей: бюджетом, недвижимостью, кредитами, инвестициями, крупными покупками, карьерой и долгосрочными целями."
                )}
              </p>

              <div className="mt-8 space-y-3 font-body text-base text-foreground/70">
                <p>{nbsp("Говорю понятным языком — от рядовых специалистов до топ-менеджеров.")}</p>
                <p>{nbsp("Каждый инструмент программы можно применить сразу после занятия.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Форматы */}
      <section id="formats" className="relative py-16 md:py-28 border-t border-foreground/10 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Форматы")}</SectionLabel>
          <H2>{nbsp("Какую задачу компании решает каждый формат")}</H2>

          <div className="mt-12 md:mt-16 space-y-px bg-foreground/12 border border-foreground/12">
            {formats.map((f) => (
              <div key={f.title} className="bg-background p-7 md:p-10 lg:p-12 animate-fade-up">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                  <div>
                    <div className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-accent">
                      {nbsp(f.kicker)}
                    </div>
                    <h3 className="mt-3 font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-4xl">
                      {nbsp(f.title)}
                    </h3>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">
                    {nbsp(f.duration)}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/45">
                      {nbsp(f.fitLabel)}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {f.fit.map((x) => (
                        <li
                          key={x}
                          className="font-body text-base text-foreground/75 leading-relaxed"
                        >
                          {nbsp(x)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/45">
                      {nbsp(f.insideLabel)}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {f.inside.map((x) => (
                        <li
                          key={x}
                          className="font-body text-base text-foreground/75 leading-relaxed"
                        >
                          {nbsp(x)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 font-body text-sm md:text-base text-foreground/60 max-w-3xl">
            {nbsp(
              "Личные финансы участников остаются конфиденциальными: индивидуальные цифры, бюджеты и решения сотрудников компании не передаются. HR получает только агрегированную картину."
            )}
          </p>
        </div>
      </section>

      {/* 10. Диагностика */}
      <section
        id="diagnostic"
        className="relative py-16 md:py-28 border-t border-foreground/10 scroll-mt-20"
      >
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Первый шаг")}</SectionLabel>
          <H2>{nbsp("Не уверены, нужно ли это вашим сотрудникам?")}</H2>

          <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-6 space-y-6 font-body text-base md:text-lg leading-relaxed text-foreground/80 animate-fade-up">
              <p>{nbsp("Начнём с анонимной диагностики финансовых запросов команды.")}</p>
              <p>
                {nbsp(
                  "Сотрудники отвечают на короткий набор вопросов о своих финансовых задачах и сложностях."
                )}
              </p>
              <p>
                {nbsp(
                  "Персональные финансовые данные конкретных сотрудников компании не передаются. После диагностики я предложу программу именно под реальные запросы вашей команды."
                )}
              </p>
              <Cta label="Обсудить диагностику" className="mt-2" />
            </div>

            <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.12s" }}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/45">
                {nbsp("Компания получает агрегированную картину")}
              </div>
              <ul className="mt-6 divide-y divide-foreground/12 border-y border-foreground/12">
                {diagnosticOutcomes.map((o) => (
                  <li key={o} className="py-5 font-serif-display text-lg md:text-2xl text-foreground/85">
                    {nbsp(o)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Финальный CTA */}
      <section className="relative py-20 md:py-36 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold leading-[1.03] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-5xl animate-fade-up">
            {nbsp(
              "Сначала выясним, какие финансовые вопросы действительно волнуют ваших сотрудников."
            )}
          </h2>
          <p className="mt-8 font-body text-base md:text-lg text-foreground/70 max-w-2xl">
            {nbsp("А уже потом решим, нужен ли воркшоп, интенсив или полноценная программа.")}
          </p>

          <div className="mt-10">
            <Cta label="Обсудить диагностику" />
          </div>

          <div className="mt-12 pt-8 border-t border-foreground/12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="font-body text-base text-foreground/70">
              {nbsp("Василий Мещеряков")}
            </div>
            <a
              href="https://t.me/nivz2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors"
            >
              <Send size={15} strokeWidth={1.5} />
              <span>Telegram @nivz2</span>
            </a>
            <a
              href="mailto:nivz@mail.ru"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors"
            >
              <Mail size={15} strokeWidth={1.5} />
              <span>nivz@mail.ru</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Corporate;
