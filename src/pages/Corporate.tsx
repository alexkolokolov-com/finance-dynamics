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
    kicker: "Формат 1",
    title: "Вводный воркшоп",
    subtitle: "Знакомство с темой",
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
    kicker: "Формат 2",
    title: "Корпоративный интенсив",
    subtitle: "Собрать собственную систему",
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
    kicker: "Формат 3",
    title: "Программа сопровождения",
    subtitle: "Изменить финансовые привычки",
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
      "агрегированная обратная связь для HR без раскрытия персональных данных сотрудников",
    ],
  },
];

const diagnosticOutcomes = [
  "какие денежные вопросы беспокоят сотрудников",
  "какие темы для них наиболее актуальны",
  "где сотрудники чувствуют наибольшую неопределённость",
  "какой образовательный формат имеет смысл запускать",
];

const Kicker = ({ children }: { children: string }) => (
  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5 animate-fade-up">
    {children}
  </div>
);

const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2
    className={`font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl animate-fade-up max-w-3xl ${className}`}
  >
    {children}
  </h2>
);

const Lede = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-6 font-serif-display text-lg md:text-2xl leading-snug text-foreground/80 max-w-3xl animate-fade-up">
    {children}
  </p>
);

const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <div
    className={`bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const Bullets = ({ items, dark = false }: { items: string[]; dark?: boolean }) => (
  <ul className="mt-4 space-y-3">
    {items.map((x) => (
      <li key={x} className="flex gap-3">
        <span
          className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-accent" : "bg-accent"}`}
        />
        <span
          className={`font-body text-base leading-relaxed ${dark ? "text-primary-foreground/80" : "text-foreground/75"}`}
        >
          {nbsp(x)}
        </span>
      </li>
    ))}
  </ul>
);

const Cta = ({
  label,
  className = "",
  variant = "solid",
}: {
  label: string;
  className?: string;
  variant?: "solid" | "outline";
}) => {
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground hard-shadow"
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
      <section className="relative pt-24 md:pt-32 lg:pt-36 pb-14 md:pb-20 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                {nbsp("Корпоративная программа для сотрудников")}
              </div>
              <h1 className="font-serif-display font-semibold leading-[1.0] tracking-tight text-[clamp(2rem,5.2vw,4rem)]">
                {nbsp("Зарплата выросла.")}
                <br />
                <span className="italic font-normal">
                  {nbsp("А ощущения, что денег стало больше — нет.")}
                </span>
              </h1>

              <p className="mt-7 font-serif-display text-lg md:text-2xl leading-snug text-foreground/80 max-w-2xl">
                {nbsp(
                  "Я помогаю сотрудникам превратить доход в понятную систему: бюджет, финансовая подушка, крупные цели и личный финансовый план."
                )}
              </p>
              <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">
                {nbsp(
                  "У сотрудника может быть хороший доход и одновременно ипотека, кредитки, отсутствие накоплений, тревога перед крупными покупками и ощущение «куда опять делись деньги?»."
                )}
              </p>

              <div className="mt-9">
                <Cta label="Обсудить программу" />
                <p className="mt-4 font-body text-sm text-foreground/55">
                  {nbsp("Василий Мещеряков · ex P&G · автор проекта «Вася и финансы»")}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="relative max-w-sm lg:max-w-none mx-auto">
                <div className="absolute -inset-4 md:-inset-6 bg-accent/10 rounded-[2rem] -rotate-3 pointer-events-none" />
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-hard aspect-[4/5]">
                  <img
                    src={expertPhoto}
                    alt="Василий Мещеряков"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Парадокс */}
      <section className="relative py-16 md:py-24">
        <div className="container-px max-w-7xl mx-auto">
          <Kicker>{nbsp("Парадокс")}</Kicker>
          <H2>{nbsp("Хороший доход не гарантирует финансового спокойствия")}</H2>
          <Lede>
            {nbsp(
              "Чем больше человек зарабатывает, тем больше у него становится не только возможностей, но и финансовых решений."
            )}
          </Lede>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <Card>
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-5">
                {nbsp("Решения, которые появляются с ростом дохода")}
              </div>
              <ul className="flex flex-wrap gap-2">
                {commitments.map((c) => (
                  <li
                    key={c}
                    className="font-body text-sm text-foreground/75 bg-secondary/70 border border-foreground/10 rounded-full px-3.5 py-1.5"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7 space-y-4 font-body text-base leading-relaxed text-foreground/75">
                <p>
                  {nbsp(
                    "Доход растёт, вместе с ним растёт стоимость жизни и количество решений. А личной финансовой системы часто так и не появляется."
                  )}
                </p>
                <p>
                  {nbsp(
                    "В результате человек может зарабатывать 200, 300 или 500 тысяч рублей и всё равно каждый месяц начинать почти заново."
                  )}
                </p>
              </div>
            </Card>

            <Card delay={0.1}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-5">
                {nbsp("Как это обычно развивается")}
              </div>
              <ol className="space-y-3">
                {chain.map((c, i) => (
                  <li key={c} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-foreground/40 pt-1.5 w-5 shrink-0">
                      {i + 1}
                    </span>
                    <span
                      className={`font-serif-display leading-snug text-lg md:text-xl ${
                        i === chain.length - 1 ? "text-accent" : "text-foreground/85"
                      }`}
                    >
                      {nbsp(c)}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Реальные запросы */}
      <section id="requests" className="relative py-16 md:py-24 bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <Kicker>{nbsp("Реальные запросы")}</Kicker>
          <H2>{nbsp("С какими задачами приходят люди с хорошим доходом")}</H2>
          <Lede>
            {nbsp(
              "Это запросы участников моих программ. Доходы и профессии показаны обезличенно."
            )}
          </Lede>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {bigCases.map((c, i) => (
              <Card key={c.income} delay={0.08 * i} className="h-full">
                <div className="font-serif-display font-semibold tracking-tight text-3xl md:text-4xl">
                  {nbsp(c.income)}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                  {nbsp("в месяц")}
                </div>
                <div className="mt-3 font-body text-sm text-foreground/60">{nbsp(c.who)}</div>
                <p className="mt-6 font-serif-display italic text-xl leading-snug text-foreground">
                  {nbsp(`«${c.quote}»`)}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-8 md:mt-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-5">
              {nbsp("Частые формулировки")}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {smallRequests.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="font-body text-base text-foreground/75 leading-relaxed">
                    {nbsp(`«${r}»`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 md:mt-16 font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-4xl max-w-3xl animate-fade-up">
            {nbsp("Проблема не всегда в размере зарплаты.")}{" "}
            <span className="italic font-normal text-accent">
              {nbsp("Чаще — в отсутствии системы.")}
            </span>
          </p>
        </div>
      </section>

      {/* 4. Роль компании */}
      <section className="relative py-16 md:py-24">
        <div className="container-px max-w-7xl mx-auto">
          <Kicker>{nbsp("Роль компании")}</Kicker>
          <H2>
            {nbsp("Компания не решит финансовые проблемы за сотрудника.")}{" "}
            <span className="italic font-normal text-accent">
              {nbsp("Но может дать инструменты, чтобы он решил их сам.")}
            </span>
          </H2>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="space-y-5 font-body text-base md:text-lg leading-relaxed text-foreground/75 animate-fade-up">
              <p>
                {nbsp(
                  "Поэтому я предлагаю компаниям не очередную лекцию по «финансовой грамотности», а практическую программу по личной финансовой устойчивости сотрудников."
                )}
              </p>
              <p>
                {nbsp(
                  "Сотрудник работает со своими реальными цифрами, решениями и целями и в итоге собирает собственную финансовую систему."
                )}
              </p>
            </div>

            <Card delay={0.1} className="justify-center">
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {nbsp("Программа")}
              </div>
              <div className="mt-3 font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl">
                {nbsp("Личная финансовая устойчивость сотрудников")}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Что делает сотрудник */}
      <section id="program" className="relative py-16 md:py-24 bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <Kicker>{nbsp("Что происходит внутри")}</Kicker>
          <H2>
            {nbsp("Не лекция про деньги.")}{" "}
            <span className="italic font-normal">
              {nbsp("Сотрудник разбирает собственные финансы.")}
            </span>
          </H2>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {steps.map((s, i) => (
              <Card key={s.n} delay={0.05 * i} className="h-full">
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  {s.n}
                </div>
                <h3 className="font-serif-display font-semibold leading-[1.15] tracking-tight text-xl md:text-2xl mb-3">
                  {nbsp(s.title)}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {nbsp(s.text)}
                </p>
              </Card>
            ))}
          </div>

          <p className="mt-12 md:mt-16 font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-4xl max-w-3xl animate-fade-up">
            {nbsp("Цель не научить экономить.")}{" "}
            <span className="italic font-normal text-accent">
              {nbsp("Цель — лучше использовать деньги, которые человек уже зарабатывает.")}
            </span>
          </p>
        </div>
      </section>

      {/* 6. Зачем компании */}
      <section className="relative py-16 md:py-24">
        <div className="container-px max-w-7xl mx-auto">
          <Kicker>{nbsp("Сторона компании")}</Kicker>
          <H2>{nbsp("Зачем это компании")}</H2>
          <Lede>
            {nbsp(
              "Финансовая программа — это benefit, который сотрудник использует не только на работе, а в собственной жизни."
            )}
          </Lede>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {companyValue.map((b, i) => (
              <Card key={b.label} delay={0.06 * i} className="h-full">
                <h3 className="font-serif-display font-semibold leading-[1.15] tracking-tight text-xl md:text-2xl mb-3">
                  {nbsp(b.label)}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {nbsp(b.text)}
                </p>
              </Card>
            ))}
          </div>

          <p className="mt-12 md:mt-16 font-serif-display italic text-xl md:text-2xl leading-snug text-foreground/90 max-w-3xl border-l-2 border-accent pl-6 animate-fade-up">
            {nbsp(
              "Программа не заменяет конкурентную зарплату. Она помогает сотруднику получить больше пользы от дохода, который у него уже есть."
            )}
          </p>
        </div>
      </section>

      {/* 7. Никаких продаж */}
      <section className="relative py-16 md:py-24 bg-board text-primary-foreground">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
                {nbsp("Границы работы")}
              </div>
              <h2 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl">
                {nbsp("Никаких продаж сотрудникам")}
              </h2>
              <div className="mt-7 space-y-4 font-body text-base md:text-lg text-primary-foreground/75 leading-relaxed">
                <p>
                  {nbsp(
                    "Я не получаю комиссию за выбор участниками конкретных финансовых инструментов."
                  )}
                </p>
                <p>
                  {nbsp(
                    "Цель программы — научить человека самостоятельно принимать финансовые решения."
                  )}
                </p>
              </div>
            </div>

            <div className="border border-primary-foreground/15 rounded-2xl p-7 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary-foreground/60">
                {nbsp("Внутри программы я не продаю участникам")}
              </p>
              <Bullets items={noSell} dark />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Кто ведёт */}
      <section className="relative py-16 md:py-24">
        <div className="container-px max-w-7xl mx-auto">
          <Kicker>{nbsp("Кто ведёт программу")}</Kicker>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 animate-fade-up">
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-hard aspect-[4/5] max-w-sm">
                <img
                  src={expertPhoto}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "0.12s" }}>
              <h2 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl">
                {nbsp("Василий Мещеряков")}
              </h2>
              <p className="mt-3 font-body text-base text-foreground/60">
                {nbsp("Автор проекта «Вася и финансы»")}
              </p>

              <p className="mt-7 font-serif-display text-lg md:text-2xl leading-snug text-foreground/85">
                {nbsp(
                  "Мой подход вырос не из теории финансовой грамотности, а из работы с реальными решениями людей: бюджетом, недвижимостью, кредитами, инвестициями, крупными покупками и долгосрочными целями."
                )}
              </p>

              <div className="mt-7">
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                  {nbsp("Коротко об опыте")}
                </div>
                <Bullets items={facts} />
              </div>

              <div className="mt-7 space-y-3 font-body text-base text-foreground/70 leading-relaxed">
                <p>{nbsp("Говорю понятным языком — от рядовых специалистов до топ-менеджеров.")}</p>
                <p>{nbsp("Каждый инструмент программы можно применить сразу после занятия.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Форматы */}
      <section id="formats" className="relative py-16 md:py-24 bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <Kicker>{nbsp("Форматы")}</Kicker>
          <H2>{nbsp("Какую задачу компании решает каждый формат")}</H2>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {formats.map((f, i) => (
              <Card key={f.title} delay={0.08 * i} className="h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {nbsp(f.kicker)}
                </div>
                <h3 className="mt-3 font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl">
                  {nbsp(f.title)}
                </h3>
                <p className="mt-2 font-body text-sm text-foreground/60">
                  {nbsp(`${f.subtitle} · ${f.duration}`)}
                </p>

                <div className="mt-6 pt-6 border-t border-foreground/10">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                    {nbsp(f.fitLabel)}
                  </div>
                  <Bullets items={f.fit} />
                </div>

                <div className="mt-6 pt-6 border-t border-foreground/10">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                    {nbsp(f.insideLabel)}
                  </div>
                  <Bullets items={f.inside} />
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-8 font-body text-sm md:text-base text-foreground/60 max-w-3xl">
            {nbsp(
              "Личные финансы участников остаются конфиденциальными: индивидуальные цифры, бюджеты и решения сотрудников не передаются компании. HR получает только агрегированную картину."
            )}
          </p>
        </div>
      </section>

      {/* 10. Диагностика */}
      <section id="diagnostic" className="relative py-16 md:py-24 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <Kicker>{nbsp("Первый шаг")}</Kicker>
          <H2>{nbsp("Не уверены, нужно ли это вашим сотрудникам?")}</H2>
          <Lede>{nbsp("Начнём с анонимной диагностики финансовых запросов команды.")}</Lede>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="space-y-5 font-body text-base md:text-lg leading-relaxed text-foreground/75 animate-fade-up">
              <p>
                {nbsp(
                  "Сотрудники отвечают на короткий набор вопросов о своих финансовых задачах и сложностях."
                )}
              </p>
              <p>
                {nbsp(
                  "Персональные данные конкретных сотрудников компании не передаются. После диагностики я предложу программу под реальные запросы вашей команды."
                )}
              </p>
              <Cta label="Обсудить диагностику" className="mt-2" />
            </div>

            <Card delay={0.1}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {nbsp("Компания получает агрегированную картину")}
              </div>
              <Bullets items={diagnosticOutcomes} />
            </Card>
          </div>
        </div>
      </section>

      {/* 11. Финальный CTA */}
      <section className="relative py-16 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl animate-fade-up">
            {nbsp("Сначала выясним, какие финансовые вопросы волнуют ваших сотрудников.")}
          </h2>
          <p className="mt-6 font-body text-base md:text-lg text-foreground/70 max-w-2xl">
            {nbsp("А уже потом решим, нужен ли воркшоп, интенсив или полноценная программа.")}
          </p>

          <div className="mt-9">
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
