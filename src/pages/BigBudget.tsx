import { useEffect, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "@/components/SiteHeader";
import { BigBudgetBoard } from "@/components/bigbudget/BigBudgetBoard";
import { AtomOrbit } from "@/components/bigbudget/AtomOrbit";
import { BigBudgetRegisterDialog } from "@/components/bigbudget/BigBudgetRegisterDialog";
import expertPhoto from "@/assets/bigbudget/expert.png";
import pennyAvatar from "@/assets/bigbudget/penny.png";
import sheldonAvatar from "@/assets/bigbudget/sheldon.png";

const BIGBUDGET_OG = "https://storage.googleapis.com/gpt-engineer-file-uploads/CEQZIQSuo1TccWnlhIZOGYc4SUe2/social-images/social-1778340347363-Screenshot_2026-05-09_182452.webp";
const BIGBUDGET_TITLE = "Теория большого бюджета — практикум 2–4 июня";
const BIGBUDGET_DESC = "Бесплатный практикум по личным финансам от Василия Мещерякова.";

const bigBudgetPageNav = [
  { href: "#program", label: "Программа", id: "program" },
  { href: "#results", label: "Результаты", id: "results" },
  { href: "#reviews", label: "Отзывы", id: "reviews" },
  { href: "#register", label: "Регистрация", id: "register", cta: true },
];

function CTAButton({ label = "Регистрация", formIndex }: { label?: string; formIndex: number }) {
  return (
    <BigBudgetRegisterDialog
      formIndex={formIndex}
      trigger={
        <button type="button" className="btn-chalk !font-sans !font-medium !tracking-normal">
          {label}
        </button>
      }
    />
  );
}


function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      {kicker && <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">{kicker}</div>}
      <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Hero() {
  return (
    <section className="px-4 pt-24 md:pt-28">
      <BigBudgetBoard date="2–4 июня 2026" cta={<CTAButton formIndex={1} />} />
    </section>
  );
}

function DialogueLine({
  avatar,
  name,
  text,
  color,
  reverse,
}: {
  avatar: string;
  name: string;
  text: ReactNode;
  color: string;
  reverse?: boolean;
}) {
  return (
    <div className={`flex items-start gap-5 ${reverse ? "flex-row-reverse text-right" : ""}`}>
      <div
        className="shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2"
        style={{ background: "oklch(1 0 0 / 90%)", borderColor: color }}
      >
        <img src={avatar} alt={name} width={256} height={256} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="chalk-card px-5 py-4 max-w-[80%]">
        <p className="chalk-text text-base md:text-lg italic">{text}</p>
      </div>
    </div>
  );
}

function PainSection() {
  const pains = [
    { e: "🌪️", t: "У вас хаос в финансах и деньги «утекают сквозь пальцы»" },
    { e: "📉", t: "Вы пробовали вести бюджет и бросали это дело" },
    { e: "💸", t: "У вас хорошие доходы, но они не задерживаются в кошельке" },
    { e: "🐿️", t: "Устали бегать как белка в колесе и хотите финансовой стабильности" },
  ];
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif-display font-semibold text-foreground text-center text-4xl md:text-6xl leading-[0.95] tracking-tight">
          Хотите понять природу финансов?
        </h2>

        {/* Диалог Пенни и Шелдона — просто текстовые пузыри на странице (DialogueLine сам рендерит chalk-card) */}
        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          <DialogueLine
            avatar={pennyAvatar}
            name="Пенни"
            text={<>Шелдон, почему счета за квартплату у тебя лежат в папке <strong className="font-bold chalk-accent">Тёмная материя</strong>?</>}
            color="oklch(0.78 0.12 40)"
          />
          <DialogueLine
            avatar={sheldonAvatar}
            name="Шелдон"
            text={<>Потому что они <strong className="font-bold chalk-accent">расширяются</strong> и даже я не могу их объяснить</>}
            color="oklch(0.65 0.12 240)"
            reverse
          />
        </div>

        <h3 className="mt-20 font-serif-display font-semibold text-foreground text-center text-3xl md:text-5xl leading-[0.95] tracking-tight">
          Узнаёте себя?
        </h3>
        {/* Боли — тёмно-зелёные плашки с тонкой границей */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pains.map((p) => (
            <div key={p.t} className="chalk-card p-6 flex gap-4 items-start">
              <div className="text-4xl shrink-0">{p.e}</div>
              <p className="chalk-text text-base md:text-lg leading-snug">{p.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertSection() {
  const groups = [
    [
      { a: "Образование: ФТИ УрФУ", b: "прикладная физика и математика" },
      { a: "Карьера: Procter & Gamble", b: "директор по продажам" },
    ],
    [
      { a: "14 лет", b: "корпоративной карьеры" },
      { a: "6 млрд ₽", b: "бюджет в управлении" },
    ],
    [
      { a: "3 года", b: "консультирования" },
      { a: "1400", b: "семейных бюджетов разобрано" },
    ],
  ];
  return (
    <section className="px-4 py-10 md:py-14 relative">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif-display font-semibold text-foreground text-center text-4xl md:text-6xl leading-[0.95] tracking-tight">
          Личные финансы — это <em className="italic font-normal text-accent">физика</em>, а не <em className="italic font-normal">магия</em>
        </h2>
        <div className="mt-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="shrink-0 relative">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div
                className="w-full h-full rounded-full overflow-hidden border-4"
                style={{ borderColor: "oklch(0.85 0.10 75 / 70%)", background: "oklch(0.34 0.03 165)" }}
              >
                <img src={expertPhoto} alt="Василий Мещеряков" width={512} height={512} loading="lazy" className="w-full h-full object-cover" />
              </div>
              {/* орбита рубля */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ animation: "spin 18s linear infinite" }}
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-xl"
                  style={{
                    background: "oklch(0.85 0.10 75)",
                    color: "oklch(0.22 0.025 165)",
                    boxShadow: "0 4px 12px -4px oklch(0 0 0 / 50%)",
                  }}
                >
                  ₽
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div
                className="px-4 py-1.5 font-chalk text-lg"
                style={{
                  background: "oklch(0.85 0.10 75)",
                  color: "oklch(0.22 0.025 165)",
                  borderRadius: "6px",
                  boxShadow: "0 6px 14px -6px oklch(0 0 0 / 50%)",
                }}
              >
                Василий Мещеряков
              </div>
            </div>
          </div>
          <div className="chalk-frame p-8 md:p-10 relative flex-1">
            <div className="absolute -top-4 left-6 chalk-warm font-chalk text-6xl leading-none opacity-70">"</div>
            <p className="font-chalk chalk-text text-2xl md:text-3xl leading-snug">
              Многие совершают ошибки в личных финансах, потому что верят в чудеса.
            </p>
            <p className="mt-4 font-chalk chalk-accent text-2xl md:text-3xl leading-snug">
              Я доступным языком расскажу вам о законах, по которым приумножается капитал
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {groups.map((group, gi) => {
            const colorClass = ["chalk-accent", "chalk-warm", "chalk-blue"][gi];
            return (
              <div key={gi} className="grid grid-cols-2 md:grid-cols-1 gap-5">
                {group.map((row, i) => (
                  <div key={i} className="p-5">
                    <p className={`font-bold ${colorClass} text-lg md:text-xl leading-tight`}>{row.a}</p>
                    <p className="mt-1.5 chalk-text text-sm md:text-base opacity-90">{row.b}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <SineWave />
      </div>
    </section>
  );
}

function SineWave() {
  const buildPath = (offset: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 1200; x += 4) {
      const y = 50 + Math.sin(((x + offset) / 200) * Math.PI * 2) * 32;
      pts.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(2)}`);
    }
    return pts.join(" ");
  };
  return (
    <div className="mt-12 md:mt-16 -mb-12 md:-mb-16 relative overflow-hidden">
      <svg viewBox="0 0 600 100" className="w-full h-24 md:h-32" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="50" x2="600" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" className="chalk-text opacity-40" />
        <g style={{ animation: "sine-scroll 6s linear infinite reverse" }}>
          <path d={buildPath(0)} fill="none" stroke="var(--chalk-accent)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
      <style>{`
        @keyframes sine-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-200px); }
        }
      `}</style>
    </div>
  );
}

function ProgramSection() {
  const series = [
    {
      n: "Серия 1",
      title: "РАСХОДЫ",
      date: "Дата выхода — 2 июня",
      bullets: [
        "Как сделать чтобы деньги не утекали, но и не думать постоянно об экономии",
        "Диагностика на «здоровое управление расходами»",
        "Откуда берется тревога по поводу финансов и как от нее избавиться",
        "Живые разборы ваших бюджетов с практическими рекомендациями",
        
      ],
      result: "Проведете чек-ап своего финансового здоровья.",
    },
    {
      n: "Серия 2",
      title: "ДОХОДЫ",
      date: "Дата выхода — 3 июня",
      bullets: [
        "Обзор моей финансовой системы и почему она дает +30% в год",
        "3 правила создания плана по росту дохода, который даст результат за ближайшие 3-6 месяцев",
        
        "Как найти от 100.000 руб свободных денег в год при любом доходе",
        "Диагностика «на сколько конкретно вы можете вырастить свой доход?»",
      ],
      result: "Поймете как увеличить свой доход на 20-30% в год",
    },
    {
      n: "Серия 3",
      title: "ИНВЕСТИЦИИ",
      date: "Дата выхода — 4 июня",
      bullets: [
        "Почему у 90% инвесторов не получается разбогатеть (а у тех кто рассказывает про инвестиции — получается 🙂)",
        "3 ловушки инвестирования, в которые попадаются все",
        "Психология финансов. Как не бояться заглядывать в будущее",
        "7 шагов для создания свободного будущего за ближайшие 5 лет",
        "5 рабочих решений, которые помогут сформировать подушку и капитал",
      ],
      result: "Узнаете как прийти к жизни в 2-3 раза более богатой за 3-5 лет, чем у вас могла быть до этого",
    },
  ];
  return (
    <section id="program" className="px-4 pt-5 pb-10 md:pt-7 md:pb-14 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader title="Программа практикума" />
        <div className="space-y-8">
          {series.map((s) => (
            <div key={s.n} className="blackboard-frame">
              <div className="blackboard-inner relative overflow-hidden p-6 md:p-10">
                <div
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-dashed pb-4 mb-6"
                  style={{ borderColor: "oklch(0.96 0.015 90 / 25%)" }}
                >
                  <h3 className="font-chalk chalk-text text-3xl md:text-4xl">
                    {s.n}. <span className="chalk-accent">{s.title}</span>
                  </h3>
                  <span className="font-chalk chalk-warm text-xl md:text-2xl">{s.date}</span>
                </div>
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 chalk-text text-base md:text-lg">
                      <span className="chalk-accent shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <div className="font-chalk chalk-warm text-xl mb-1">Результат:</div>
                  <p className="chalk-text text-base md:text-lg">{s.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton formIndex={2} />
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const groups = [
    {
      title: "Финансы",
      items: [
        "Система управления деньгами, требующая не больше 2-х часов в месяц",
        "Рост дохода на 20-30% через проверенные стратегии",
        "Подушка безопасности и начальные инвестиции",
        "Экономия и оптимизация на 10%+ от текущих трат",
      ],
    },
    {
      title: "Знания и навыки",
      items: [
        "Долгосрочный план финансового благополучия на 5+ лет",
        "Понимание, как стать в 2-3 раза богаче за 3-5 лет",
        "Инструменты и принципы, которые работают всю жизнь",
        "База для грамотного инвестирования",
      ],
    },
    {
      title: "Эмоциональное состояние",
      items: [
        "Уверенность в завтрашнем дне вместо финансовой тревоги",
        "Контроль над деньгами вместо ощущения «все утекает»",
        "Понимание своих финансовых целей и путей их достижения",
      ],
    },
  ];
  return (
    <section id="results" className="px-4 py-10 md:py-14 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Что вы получите" />
        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="chalk-card-light p-7 flex flex-col">
              <h3 className="font-chalk chalk-accent text-3xl mb-5">{g.title}</h3>
              <ul className="space-y-4 flex-1">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-3 chalk-text text-base">
                    <span className="chalk-warm shrink-0">✦</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton formIndex={3} />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Жанна", role: "руководитель в туризме", text: "Кредитная нагрузка была 4.7 млн, стала 3.3 млн. Если бы пришла в Василию раньше — сэкономила бы миллионы!" },
    { name: "Юлия", role: "аналитик в трейд-маркетинге", text: "Кредиты закрыты за 6 мес вместо 12. Эффект — сотни тысяч рублей" },
    { name: "Татьяна", role: "врач", text: "Кредиты закрыты за 6 мес вместо 12. Эффект — сотни тысяч рублей" },
    { name: "Светлана", role: "менеджер по продажам", text: "Доход вырос на 30%. Обучение окупилось за 2 месяца" },
    { name: "Владимир", role: "предприниматель", text: "Трачу на учёт 1,5-3 часа в месяц. Эффект — до конца жизни!" },
    { name: "Спартак", role: "проектировщик", text: "Появилось внимание на доходы. До этого фокус был только на расходах" },
  ];
  return (
    <section id="reviews" className="px-4 py-10 md:py-14 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
            Отзывы учеников <em className="italic font-normal text-accent">Василия Мещерякова</em>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name + r.role} className="chalk-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-chalk text-2xl"
                  style={{
                    background: "oklch(0.85 0.10 75 / 25%)",
                    color: "oklch(0.85 0.10 75)",
                    border: "1.5px dashed oklch(0.85 0.10 75 / 60%)",
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-chalk chalk-text text-xl leading-tight">{r.name}</div>
                  <div className="text-sm chalk-text opacity-70">{r.role}</div>
                </div>
              </div>
              <p className="chalk-text text-base leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="register" className="px-4 pt-0 pb-20 md:pb-28 scroll-mt-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto w-[80%] max-w-[480px]">
          <AtomOrbit className="w-full h-auto chalk-text opacity-70" />
        </div>
        <h2 className="mt-8 font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
          Готовы запустить
          <br />
          <em className="italic font-normal text-accent">большой взрыв бюджета?</em>
        </h2>
        <p className="mt-8 font-chalk chalk-text text-2xl md:text-3xl">
          2–4 июня. Три эпизода, которые изменят вашу жизнь.
        </p>
        <div className="mt-10">
          <BigBudgetRegisterDialog
            formIndex={4}
            trigger={
              <button type="button" className="btn-chalk">✦ Зарегистрироваться бесплатно</button>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-10 chalk-text opacity-70 text-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-center md:flex-wrap gap-2 md:gap-x-6 md:gap-y-2 text-center">
        <div>ООО «ВАСЯ и ФИНАНСЫ»</div>
        <div>ИНН 5040197296</div>
        <div>ОГРН 1255000069213</div>
        <a
          href="https://nivz.getcourse.ru/PDP_Policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:chalk-accent"
        >
          Политика обработки перс. данных
        </a>
      </div>
    </footer>
  );
}

const BigBudget = () => {
  useEffect(() => {
    document.title = BIGBUDGET_TITLE;
  }, []);
  return (
    <main className="bigbudget-theme min-h-screen">
      <Helmet>
        <title>{BIGBUDGET_TITLE}</title>
        <meta name="description" content={BIGBUDGET_DESC} />
        <meta property="og:title" content={BIGBUDGET_TITLE} />
        <meta property="og:description" content={BIGBUDGET_DESC} />
        <meta property="og:image" content={BIGBUDGET_OG} />
        <meta property="og:url" content="https://physics-of-finance.lovable.app/bigbudget" />
        <meta name="twitter:title" content={BIGBUDGET_TITLE} />
        <meta name="twitter:description" content={BIGBUDGET_DESC} />
        <meta name="twitter:image" content={BIGBUDGET_OG} />
      </Helmet>
      <SiteHeader pageNav={bigBudgetPageNav} />
      <Hero />
      <PainSection />
      <ExpertSection />
      <ProgramSection />
      <ResultsSection />
      <Reviews />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default BigBudget;
