import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Check, Quote, Users, BookOpen, Compass, ArrowRight } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { OrbitDiagram } from "@/components/OrbitDiagram";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О конференции", id: "about" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#speakers", label: "Спикеры", id: "speakers" },
  { href: "#benefits", label: "Что получите", id: "benefits" },
  { href: "#register", label: "Регистрация", cta: true },
];

const painQuotes = [
  {
    quote: "Бюджет был «нулевой и минусовой» — одна мысль о нём вызывала ужас.",
    author: "Татьяна, врач",
  },
  {
    quote: "Зарабатываю, но не могу точно посчитать — куда уходят деньги. Это давит даже физически.",
    author: "Владимир, IT-предприниматель",
  },
  {
    quote: "Карьерный взлёт и рост зарплаты только добавили стресса и кредитной нагрузки.",
    author: "Сергей, проектировщик",
  },
  {
    quote: "Хочется накапливать быстрее, но непонятно — с какой стороны вообще зайти.",
    author: "Алексей, аналитик",
  },
];

const sections = [
  {
    n: "01",
    icon: Compass,
    title: "Капитал",
    subtitle: "Как на самом деле работают деньги — без мистики и «схем»",
    keynote: "Яков Миркин",
    talks: [
      "Фундаментальный взгляд на деньги и капитал",
      "Данные о финансовом поведении россиян vs. мифы",
      "Личное финансовое планирование без схем",
      "Здоровые финансовые привычки и защита от мошенничества",
    ],
  },
  {
    n: "02",
    icon: BookOpen,
    title: "Психология денег",
    subtitle: "Как мозг и установки управляют нашими финансовыми решениями",
    keynote: "Василий Ключарёв",
    talks: [
      "Нейроэкономика: как мозг принимает финансовые решения",
      "Когнитивные искажения, на которых мы теряем деньги",
      "Подсознательные установки и финансовое благополучие",
      "Денежные сценарии из детства и как с ними работать",
    ],
  },
  {
    n: "03",
    icon: Users,
    title: "Рост дохода",
    subtitle: "Навыки и стратегии, которые увеличивают доход осознанно",
    keynote: "Игорь Рызов",
    talks: [
      "Карьерные стратегии и рынок труда сегодня",
      "Время и продуктивность как ресурс роста дохода",
      "Переговоры о зарплате и деньгах как навык",
      "Публичные выступления и личный бренд как рычаг",
    ],
  },
];

const speakers = [
  // Секция 1 — Капитал
  { section: "Капитал", name: "Яков Миркин", role: "Keynote · ИМЭМО РАН, профессор, д.э.н.", topic: "Фундаментальный взгляд на деньги — без мистики" },
  { section: "Капитал", name: "Гузелия Имаева", role: "Гендиректор Аналитического центра НАФИ", topic: "Финансовое поведение россиян: данные против мифов" },
  { section: "Капитал", name: "Наталья Смирнова", role: "Независимый финансовый советник, 20+ лет", topic: "Личное финансовое планирование без схем" },
  { section: "Капитал", name: "Анна Харнас", role: "Руководитель Центра финграмотности НИФИ Минфина", topic: "Здоровые привычки и защита от мошенничества" },
  { section: "Капитал", name: "Ольга Гогаладзе", role: "Финансовый консультант, основатель школы", topic: "Доступный заход в финансовую грамотность" },
  // Секция 2 — Психология денег
  { section: "Психология денег", name: "Василий Ключарёв", role: "Keynote · профессор НИУ ВШЭ, нейроэкономика", topic: "Как мозг принимает финансовые решения" },
  { section: "Психология денег", name: "Анна Солодухина", role: "К.э.н., доцент экономфака МГУ", topic: "Когнитивные искажения, на которых теряют деньги" },
  { section: "Психология денег", name: "Владислав Чубаров", role: "Психолог, автор «Психологии денег» (Альпина)", topic: "Установки, мешающие финансовому благополучию" },
  { section: "Психология денег", name: "Елена Дорошенко", role: "К.э.н., психолог, транзактный анализ", topic: "Финансовая терапия: экономика и психология" },
  { section: "Психология денег", name: "Ирина Марьевич", role: "Психолог, автор «Дети деньги не зарабатывают»", topic: "Денежные сценарии из детства" },
  // Секция 3 — Рост дохода
  { section: "Рост дохода", name: "Алёна Владимирская", role: "Хедхантер, основатель Pruffi и «Антирабства»", topic: "Карьерные стратегии и рост дохода" },
  { section: "Рост дохода", name: "Глеб Архангельский", role: "Основоположник школы тайм-менеджмента в РФ", topic: "Время как ресурс для роста дохода" },
  { section: "Рост дохода", name: "Максим Дорофеев", role: "Физфак МГУ, автор «Джедайских техник»", topic: "Мыслетопливо и продуктивность" },
  { section: "Рост дохода", name: "Игорь Рызов", role: "Эксперт по переговорам, автор бестселлеров", topic: "Переговоры о деньгах и зарплате" },
  { section: "Рост дохода", name: "Радислав Гандапас", role: "Эксперт по лидерству и ораторскому искусству", topic: "Публичные выступления и личный бренд" },
];

const benefits = [
  "Рабочая модель личного бюджета — забираете шаблон сразу после конференции",
  "Карта долгосрочного плана: цели, активы, защита, пенсия",
  "Чек-листы по налоговым льготам и инструментам с понятной логикой",
  "Разбор реальных кейсов участников «Физики финансов»",
  "Запись всех выступлений и материалы спикеров",
  "Доступ к сообществу — без продаж «волшебных таблеток»",
];

const Conference = () => {
  useEffect(() => {
    document.title = "Конференция «Физика финансов» · бесплатно";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Бесплатная онлайн-конференция «Физика финансов»: 10 практиков, 3 секции и понятная система управления личным капиталом в непростое время.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader pageNav={pageNav} />

      {/* HERO */}
      <section className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-chalk)" }} />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="flex items-center mb-10 animate-fade-up">
            <span className="badge-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
              Конференция · бесплатно · онлайн
            </span>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <h1 className="font-serif-display font-semibold leading-[0.92] tracking-tight text-[clamp(2.75rem,9vw,7.5rem)]">
                Физика
                <br />
                <span className="text-accent italic">финансов</span>
              </h1>
              <p className="mt-6 font-serif-display italic font-normal leading-[1.15] tracking-tight text-[clamp(1.4rem,3.6vw,3rem)] max-w-3xl">
                Конференция для тех, кто хочет уверенно смотреть в&nbsp;будущее —
                <span className="underline-accent"> с&nbsp;цифрами, а&nbsp;не&nbsp;обещаниями</span>.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:pb-4 animate-fade-up" style={{ animationDelay: "0.25s" }}>
              <div className="flex flex-col gap-4">
                <div className="border-l-2 border-accent pl-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">когда</div>
                  <div className="font-display text-xl font-bold mt-1 flex items-center gap-2">
                    <Calendar size={18} className="text-accent" /> Дата уточняется
                  </div>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">формат</div>
                  <div className="font-display text-xl font-bold mt-1 flex items-center gap-2">
                    <MapPin size={18} className="text-accent" /> Онлайн, прямой эфир
                  </div>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">участие</div>
                  <div className="font-display text-xl font-bold mt-1 flex items-center gap-2">
                    <Ticket size={18} className="text-accent" /> Бесплатно, по&nbsp;регистрации
                  </div>
                </div>
                <a
                  href="#register"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow"
                >
                  Забронировать место <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-10 mt-20 items-center">
            <div className="col-span-12 md:col-span-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="font-display text-3xl md:text-4xl font-medium tracking-tight">
                <span className="text-accent">10</span> практиков ·{" "}
                <span className="text-accent">3</span> секции
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-3 leading-relaxed">
                Только те, у&nbsp;кого есть личный капитал и&nbsp;ученики с&nbsp;результатом. Никаких «денег из&nbsp;воздуха».
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <OrbitDiagram className="w-64 md:w-72" />
            </div>
            <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              {[
                { n: "10", l: "спикеров-практиков" },
                { n: "3", l: "тематические секции" },
                { n: "0 ₽", l: "стоимость участия" },
                { n: "∞", l: "доступ к записям" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-accent pl-3">
                  <div className="number-display text-3xl md:text-4xl">{s.n}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / МАНИФЕСТ */}
      <section id="about" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden scroll-mt-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(42 27% 94%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 27% 94%) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <span className="badge-tag border-background/30 text-background/70">§ 01 · зачем мы это делаем</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mt-6 max-w-4xl">
            Финансовая грамотность —{" "}
            <span className="text-accent italic">не&nbsp;роскошь</span>, а&nbsp;способ
            не&nbsp;терять годы.
          </h2>

          <div className="grid grid-cols-12 gap-6 lg:gap-12 mt-12">
            <div className="col-span-12 lg:col-span-7 space-y-5 text-base md:text-lg text-background/80 leading-relaxed max-w-3xl">
              <p>
                Времена непростые: ставки, валюты, новости меняются быстрее, чем успеваешь принимать решения.
                В&nbsp;такие моменты особенно громко звучат те, кто обещает «лёгкие деньги» и&nbsp;«доход
                из&nbsp;воздуха».
              </p>
              <p>
                Мы&nbsp;собрали конференцию <span className="text-accent italic">«Физика финансов»</span>, чтобы
                выступали практики — люди, которые сами управляют капиталом и&nbsp;ведут учеников
                к&nbsp;результату. Без волшебных таблеток, маркетинговых масок и&nbsp;курсов «как
                заработать миллион за&nbsp;месяц».
              </p>
              <p>
                Конференция бесплатная — потому что грамотность не&nbsp;должна быть привилегией.
                Хотим, чтобы каждый, кто пришёл, мог уверенно смотреть в&nbsp;будущее своей
                семьи&nbsp;— и&nbsp;принимать решения, опираясь на&nbsp;цифры, а&nbsp;не&nbsp;на&nbsp;страх.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="border border-background/20 p-6 md:p-8 bg-background/[0.03]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 mb-4">
                  наши принципы
                </div>
                <ul className="space-y-3 text-background/90">
                  {[
                    "Только практики с реальным капиталом и учениками",
                    "Никаких «гарантий доходности» и продаж со сцены",
                    "Прозрачные формулы вместо красивых обещаний",
                    "Материалы и записи остаются у участников навсегда",
                  ].map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check size={18} className="text-accent shrink-0 mt-1" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN QUOTES */}
      <section className="relative py-24 md:py-32 bg-grid scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-chalk)" }} />
        <div className="container-px max-w-7xl mx-auto relative">
          <span className="badge-tag">§ 02 · знакомо?</span>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-6 max-w-4xl">
            С&nbsp;чем приходят люди — словами{" "}
            <span className="italic text-accent">самих участников</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-foreground/70">
            Эти цитаты — из&nbsp;отзывов учеников «Физики финансов». Если хотя&nbsp;бы одна откликается, конференция для&nbsp;вас.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {painQuotes.map((q) => (
              <figure
                key={q.author}
                className="relative border border-foreground/20 bg-card hard-shadow p-6 md:p-7"
              >
                <Quote size={22} className="text-accent mb-3" />
                <blockquote className="font-serif-display text-xl md:text-2xl leading-snug">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-widest text-foreground/60">
                  — {q.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <span className="badge-tag">§ 03 · программа</span>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-6 max-w-4xl">
            Три секции — от&nbsp;основ до&nbsp;уверенности
            <span className="text-accent italic"> в&nbsp;будущем</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.n}
                  className="relative border border-foreground/20 bg-card hard-shadow p-6 md:p-8 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/55">
                      Секция {s.n}
                    </span>
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-foreground/70">{s.subtitle}</p>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground/55">
                    Keynote · <span className="text-foreground/80">{s.keynote}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {s.talks.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-accent">▸</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section id="speakers" className="relative py-24 md:py-32 bg-grid scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-chalk)" }} />
        <div className="container-px max-w-7xl mx-auto relative">
          <span className="badge-tag">§ 04 · спикеры</span>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-6 max-w-4xl">
            15&nbsp;практиков, а&nbsp;не&nbsp;
            <span className="italic text-accent">продавцов мечты</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-foreground/70">
            Учёные, финансовые советники, психологи и&nbsp;эксперты по&nbsp;карьере и&nbsp;переговорам — каждый говорит из&nbsp;своей практики и&nbsp;данных.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15 mt-12">
            {speakers.map((sp, i) => (
              <div key={sp.name} className="bg-background p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {sp.section}
                  </div>
                </div>
                <div className="font-display text-lg font-bold mt-2 leading-tight">{sp.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 mt-1">
                  {sp.role}
                </div>
                <div className="mt-4 text-sm text-foreground/80 border-t border-foreground/10 pt-3">
                  {sp.topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden scroll-mt-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(42 27% 94%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 27% 94%) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <span className="badge-tag border-background/30 text-background/70">§ 05 · что заберёте</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mt-6 max-w-4xl">
            После конференции у&nbsp;вас будет{" "}
            <span className="text-accent italic">рабочая система</span>, а&nbsp;не&nbsp;конспект.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/15 border border-background/15 mt-12">
            {benefits.map((b, i) => (
              <div key={b} className="bg-foreground p-6 flex gap-4">
                <div className="font-display text-3xl font-bold text-accent leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-background/90 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER CTA */}
      <section id="register" className="relative py-24 md:py-32 bg-grid scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-chalk)" }} />
        <div className="container-px max-w-4xl mx-auto relative text-center">
          <span className="badge-tag inline-flex">бесплатное участие</span>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-6">
            Забронируйте место{" "}
            <span className="text-accent italic">на&nbsp;конференцию</span>
          </h2>
          <p className="mt-5 text-foreground/70 max-w-xl mx-auto">
            Пришлём программу, ссылки на&nbsp;эфиры и&nbsp;материалы спикеров. Без спама — только по&nbsp;делу.
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
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/40 font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Conference;
