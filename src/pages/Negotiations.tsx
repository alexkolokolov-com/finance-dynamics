import { useEffect, useRef, useState } from "react";
import {
  Flame,
  HandCoins,
  EyeOff,
  Briefcase,
  Award,
  TrendingUp,
  Star,
  ChevronDown,
  BookOpen,
  Rocket,
  Wallet,
  Smile,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
} from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { TrafficRegisterDialog } from "@/components/traffic/TrafficRegisterDialog";
import { nbsp } from "@/lib/nbsp";
import heroPhoto from "@/assets/neg-hero-photo.png";
import expertDesktop from "@/assets/neg-expert-desktop.png";
import expertChair from "@/assets/neg-expert-chair.png";
import clockImage from "@/assets/clock-method-new.png";
import testimonialYulia from "@/assets/testimonial-yulia.png";
import testimonialTatyana from "@/assets/testimonial-tatyana.png";
import testimonialValentina from "@/assets/testimonial-valentina.png";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О тренинге", id: "about" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#register", label: "Регистрация", cta: true },
];

const pains = [
  "Совершаем ошибки на эмоциях, давим где не надо",
  "Соглашаемся на невыгодные условия, лишь бы избежать конфликта",
  "Не учитываем истинных интересов и мотивацию другой стороны",
];

const painIcons = [Flame, HandCoins, EyeOff];

const credentials = [
  "14 лет в Procter&Gamble",
  "Вырос до директора по продажам",
  "Вёл переговоры от 5 млн до 5 млрд руб",
  "Провёл 20+ тренингов с оценкой 4.92",
];

const credentialIcons = [Briefcase, Award, TrendingUp, Star];

const trainerStory: Array<{ text: string; emphasis?: boolean; highlight?: string }> = [
  {
    text: "У нас в Procter&Gamble была одна особенность: все тренинги вели сами сотрудники. Принцип — обучать тому, что сам проверил на практике.",
  },
  {
    text: "Когда я стал руководителем, то начал вести внутренние тренинги по коммерческим переговорам. Коллеги хвалили и ставили мне высокие оценки: средний балл 4,8 и даже 4,9!",
  },
  {
    text: "И вот я поставил себе цель — в следующем году получить 100% пятёрок. Это удавалось лишь нескольким людям в компании.",
    highlight: "в следующем году получить 100% пятёрок",
  },
  { text: "На это ушло 5 лет", emphasis: true },
  {
    text: "На тренинги приходили не только новички, но и опытные сотрудники, которых сложно удивить. Нужно не только интересно рассказать — нужно провести практику так, чтобы даже бывалый переговорщик вынес что-то полезное.",
  },
  { text: "И вот спустя 5 лет в группе из 40 человек все поставили оценки 5!!!" },
  {
    text: "Вот почему я так уверенно заявляю, что вы получите знания о переговорах, с которыми увеличите свои доходы на 20%.",
    highlight: "вы получите знания о переговорах, с которыми увеличите свои доходы на 20%",
  },
];

const steps = [
  {
    step: "Шаг 1",
    title: "Понять инструменты",
    points: [
      "Что делать",
      "Когда применять",
      "Как комбинировать",
      "Разобрать на практических примерах",
    ],
  },
  {
    step: "Шаг 2",
    title: "Получать выгоду",
    points: [
      "Уверенно вести переговоры",
      "Забирать максимум",
      "Управлять процессом",
      "Проиграть переговоры в безопасной среде",
    ],
  },
];

const stepIcons = [BookOpen, Rocket];

const program = [
  {
    number: "Блок 1",
    title: "Техника «За 10 минут понимаем, КАК именно нужно вести конкретные переговоры»",
    text: "Большинство людей используют один и тот же стиль в любых ситуациях. Я покажу модель, после которой становится понятно:",
    bullets: [
      "Когда нужно жёстко торговаться",
      "Когда вообще нельзя торговаться",
      "Когда нужно искать компромисс",
      "Когда создавать новую выгоду вместо борьбы за существующую",
      "И стоит ли в принципе заходить в эти переговоры",
    ],
  },
  {
    number: "Блок 2",
    title: "«Переговорный чемоданчик» — набор техник и инструментов на любой случай",
    text: null as string | null,
    bullets: [
      "Если жёсткие переговоры",
      "Если мало времени",
      "Если у вас мало опыта",
      "Если выгоды хочется, но переговариваться страшно",
    ],
  },
  {
    number: "Игра 1",
    title: "Жёсткие переговоры",
    text: "Каждый получает свою роль, цели и скрытую информацию. После раунда разбираем, где вы сами отдали деньги, где могли получить больше, какие сигналы не заметили и почему собеседник победил именно вас — или вы победили собеседника.",
    bullets: [],
  },
  {
    number: "Игра 2",
    title: "Переговоры с несколькими параметрами",
    text: "У каждой стороны будут свои скрытые интересы. Победит не тот, кто сильнее давит, а тот, кто сумеет собрать максимально выгодную сделку.",
    bullets: [],
  },
  {
    number: "Игра 3",
    title: "Как достичь взаимной выгоды в переговорах",
    text: "Две конкурирующие компании. Ограниченный ресурс. Всего 15 минут. На первый взгляд интересы противоположны, но одна деталь полностью меняет переговоры.",
    bullets: [],
  },
];

const afterGames = [
  "Персональный разбор",
  "Обратная связь",
  "Ошибки каждого участника",
  "Альтернативные стратегии",
  "Демонстрация переговоров «как это сделал бы я»",
];

const resultsFinancial = [
  "Обосновать повышение оклада",
  "Получить премию",
  "Повысить ставку часа",
];

const resultsLifestyle = [
  "Отказ от навязанных трат",
  "Снижение стресса",
  "Сохранение и укрепление авторитета",
];

const testimonials = [
  {
    name: "Юлия Маслова",
    role: "экономист",
    avatar: testimonialYulia as string | null,
    text: "Такая практика совершенно точно не забудется и будет в помощь ещё оооочень долгое время. А самый шик, что применимо и в личных переговорах, и в коммерческих 🔥🔥🔥",
  },
  {
    name: "Анна Киселева",
    role: "переводчик",
    avatar: null,
    text: "Я очень волновалась перед началом игр, но, как оказалось, после первой ступени договариваться я уже немного умею!\nМой главный инсайт в том, что мы несём в любую вводную себя. Даже если интересы совпадают и делить нечего — психика собеседника (или моя) об этом не знает. То есть в двух идентичных ситуациях я могу получить совершенно разные результаты переговоров, просто потому что передо мной сидят разные люди.\nРаньше я переговоров только боялась. Теперь мне стало интересно!",
  },
  {
    name: "Татьяна Тымко",
    role: "врач антивозрастной медицины",
    avatar: testimonialTatyana,
    text: "Я в восторге от последнего дня игр 🔥 это как кульминация! Все поняли это ощущение win-win, его не забыть теперь! Очень понравился тренинг по переговорам 🙏",
  },
  {
    name: "Валентина Павлова",
    role: "предприниматель",
    avatar: testimonialValentina,
    text: "Моё главное открытие: «Переговоры нужны, чтобы договориться! Не поиграть мускулами и доказать, что ты круче, а именно достигнуть точки договора-результата. И если вы не договорились — то вы проиграли».\n\nДля меня это осознание поменяло моё мировозрение, как будто компас был сломан и всё время вёл не в том направлении. Теория без практики остаётся информацией, которая просто засоряет эфир.",
  },
];

const introverts = [
  "Вы не манипулируете, но и не поддаётесь на провокации!",
  "Партнёры ценят, что вы находите Win-Win без конфликта",
  "Вам не нужно снимать стресс после сложного разговора",
];

const scrollToRegister = () => {
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
};

const renderStoryText = (item: (typeof trainerStory)[number]) => {
  if (item.emphasis) {
    return <span className="text-foreground font-semibold">{nbsp(item.text)}</span>;
  }
  if (item.highlight && item.text.includes(item.highlight)) {
    const [before, after] = item.text.split(item.highlight);
    return (
      <>
        {nbsp(before)}
        <span className="text-foreground font-semibold">{nbsp(item.highlight)}</span>
        {nbsp(after)}
      </>
    );
  }
  return nbsp(item.text);
};

const Negotiations = () => {
  const [storyOpen, setStoryOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showAllMobile, setShowAllMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const mobileTestimonials = showAllMobile ? testimonials : testimonials.slice(0, 2);

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
            <div className="flex flex-wrap gap-2 animate-fade-up">
              <span className="badge-tag inline-flex items-center text-xs">
                1&nbsp;августа, 14:00–18:00
              </span>
              <span className="badge-tag inline-flex items-center text-xs">
                Москва, Новоданиловская наб.&nbsp;4
              </span>
            </div>

            <p
              className="mt-6 font-mono text-xs uppercase tracking-widest text-accent animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              Живой тренинг-практикум
            </p>

            <h1
              className="mt-3 font-serif-display font-semibold leading-[1.02] tracking-tight text-[clamp(2rem,7vw,3rem)] animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {nbsp("Коммерческие переговоры")}
            </h1>

            <p
              className="mt-4 font-serif-display italic text-accent text-lg md:text-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              «Я&nbsp;знаю, что стою дороже —<br />
              но&nbsp;соглашаюсь на&nbsp;меньшее»
            </p>

            <p
              className="mt-4 text-base md:text-lg text-foreground/80 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {nbsp("Как перестать сливать деньги и возможности")}
            </p>

            <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <button
                type="button"
                onClick={scrollToRegister}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
              >
                Успеть со&nbsp;скидкой 50%
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-14 items-center">
            <div className="col-span-7">
              <div className="flex flex-wrap items-center gap-3 animate-fade-up">
                <span className="badge-tag inline-flex items-center text-xs">
                  1&nbsp;августа, 14:00–18:00
                </span>
                <span className="badge-tag inline-flex items-center text-xs">
                  Москва, Новоданиловская наб.&nbsp;4
                </span>
              </div>

              <p
                className="mt-8 font-mono text-xs uppercase tracking-widest text-accent animate-fade-up"
                style={{ animationDelay: "0.05s" }}
              >
                Живой тренинг-практикум
              </p>

              <h1
                className="mt-4 font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,5.5vw,4.5rem)] animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {nbsp("Коммерческие переговоры")}
              </h1>

              <p
                className="mt-6 font-serif-display italic text-accent text-xl md:text-2xl leading-relaxed max-w-lg animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                «Я&nbsp;знаю, что стою дороже —<br />
                но&nbsp;соглашаюсь на&nbsp;меньшее»
              </p>

              <p
                className="mt-5 text-lg md:text-xl leading-relaxed text-foreground/80 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                {nbsp("Как перестать сливать деньги и возможности")}
              </p>

              <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
                >
                  Успеть со&nbsp;скидкой 50%
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <figure className="relative">
                <div
                  className="absolute -inset-4 border border-foreground/15 pointer-events-none"
                  aria-hidden
                />
                <div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-accent/15 pointer-events-none"
                  aria-hidden
                />
                <div className="relative overflow-hidden border border-foreground/15 hard-shadow aspect-[4/5] bg-card">
                  <img
                    src={heroPhoto}
                    alt="Василий Мещеряков"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                <figcaption className="mt-6 text-center">
                  <p className="font-serif-display font-semibold">
                    {nbsp("Василий Мещеряков")}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {nbsp("эксперт по переговорам")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="relative py-20 md:py-28">
        <div className="container-px max-w-5xl mx-auto">
          <h2 className="font-serif-display font-semibold leading-tight text-3xl md:text-5xl text-center animate-fade-up">
            {nbsp("Мы проигрываем переговоры — ")}
            <span className="text-destructive">{nbsp("теряем деньги")}</span>
            {nbsp(" и качество жизни")}
          </h2>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pains.map((pain, i) => {
              const Icon = painIcons[i];
              return (
                <div
                  key={pain}
                  className="flex items-start gap-4 bg-card border border-foreground/15 p-6 hard-shadow animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <div className="w-10 h-10 border border-destructive/25 bg-destructive/5 grid place-items-center shrink-0">
                    <Icon size={20} strokeWidth={1.5} className="text-destructive" />
                  </div>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {nbsp(pain)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center animate-fade-up">
            <p className="text-lg md:text-xl font-serif-display font-semibold mb-3">
              {nbsp("Дело не в уверенности или «характере»!")}
            </p>
            <ul className="space-y-1 text-base md:text-lg text-foreground/80">
              <li>{nbsp("Вам просто не хватает системы")}</li>
              <li>
                {nbsp("И практики переговоров ")}
                <span className="text-destructive font-semibold">{nbsp("под давлением")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Expert */}
      <section
        id="about"
        className="relative bg-card border-y border-foreground/10 overflow-hidden scroll-mt-20"
      >
        {/* Desktop / tablet */}
        <div className="hidden md:grid md:grid-cols-[45%_1fr]">
          <div className="relative">
            <img
              src={expertDesktop}
              alt="Василий Мещеряков"
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: "linear-gradient(to right, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 65%, transparent 100%)",
              }}
              loading="lazy"
            />
          </div>
          <div className="py-16 px-10 lg:px-20">
            <div className="max-w-xl">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                Об эксперте
              </div>
              <h2 className="font-serif-display font-semibold text-3xl md:text-4xl mb-8">
                {nbsp("Василий Мещеряков")}
              </h2>
              <CredentialsList />
              <TrainerStory open={storyOpen} setOpen={setStoryOpen} />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="relative">
            <img
              src={expertChair}
              alt="Василий Мещеряков"
              className="w-full aspect-square object-cover object-center"
              loading="lazy"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, hsl(var(--card)) 100%)",
              }}
            />
          </div>
          <div className="px-6 pb-14 pt-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Об эксперте
            </div>
            <h2 className="font-serif-display font-semibold text-2xl mb-6">
              {nbsp("Василий Мещеряков")}
            </h2>
            <CredentialsList />
            <TrainerStory open={storyOpen} setOpen={setStoryOpen} />
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="relative py-20 md:py-28">
        <div className="container-px max-w-4xl mx-auto text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 animate-fade-up">
            Авторская методика
          </div>
          <h2 className="font-serif-display font-semibold text-3xl md:text-5xl mb-12 animate-fade-up">
            {nbsp("Циферблат переговоров")}
          </h2>

          <div className="flex justify-center mb-10 animate-fade-up">
            <img
              src={clockImage}
              alt="Циферблат переговоров — 8 секторов: Бартер, Торг о цене, Жёсткие торги, Сделки, Торги с уступками, Win-win, Партнёрство, Долгосрочные отношения"
              className="w-72 md:w-96 h-72 md:h-96 rounded-full object-cover"
            />
          </div>

          <p className="text-base md:text-lg text-foreground/80 max-w-xl mx-auto leading-relaxed animate-fade-up">
            {nbsp("Зная, в каком секторе находитесь вы и ваш оппонент, вы сможете выбирать верные инструменты и ")}
            <span className="text-accent font-semibold">
              {nbsp("договариваться без конфликта")}
            </span>
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-20 md:py-28 bg-card border-y border-foreground/10">
        <div className="container-px max-w-5xl mx-auto">
          <h2 className="font-serif-display font-semibold text-3xl md:text-5xl mb-12 text-center animate-fade-up">
            {nbsp("Два шага к результату")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div
                  key={s.step}
                  className="bg-background border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 border border-accent/30 bg-accent/10 grid place-items-center shrink-0">
                      <Icon size={24} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-accent">
                        {s.step}
                      </div>
                      <h3 className="font-serif-display font-semibold text-xl md:text-2xl">
                        {nbsp(s.title)}
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {s.points.map((p, j) => {
                      const isLast = j === s.points.length - 1;
                      return (
                        <li
                          key={p}
                          className={`flex items-start gap-3 ${
                            isLast ? "text-accent font-semibold" : "text-foreground/85"
                          }`}
                        >
                          <span
                            className={`mt-2 w-1.5 h-1.5 shrink-0 rounded-full ${
                              isLast ? "bg-accent" : "bg-foreground/40"
                            }`}
                          />
                          <span>{nbsp(p)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
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

            {/* Snake timeline: horizontal zigzag on md+, vertical on mobile */}
            <ol className="mt-8 flex flex-col md:flex-row md:flex-wrap md:items-stretch gap-y-4 md:gap-y-6">
              {afterGames.map((step, i) => {
                const isLast = i === afterGames.length - 1;
                const zig = i % 2 === 1 ? "md:translate-y-3" : "md:-translate-y-0";
                return (
                  <li
                    key={step}
                    className="flex md:flex-1 md:min-w-[180px] items-stretch"
                  >
                    <div
                      className={`flex-1 flex flex-col gap-3 bg-background border border-foreground/15 p-4 md:p-5 hard-shadow ${zig}`}
                    >
                      <span className="badge-tag text-[10px] w-fit">{`0${i + 1}`}</span>
                      <span className="text-sm md:text-[15px] leading-snug text-foreground/85">
                        {nbsp(step)}
                      </span>
                    </div>
                    {!isLast && (
                      <div className="hidden md:flex items-center justify-center text-accent shrink-0 px-2 md:px-3">
                        <ArrowRight size={20} strokeWidth={2.5} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Promise (accent) */}
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
                <TrafficRegisterDialog
                  widgetId={1630667}
                  scriptHash="0f1335c2fa8be25975f08b80fddadddf65106ed8"
                  title="Регистрация на тренинг"
                  subtitle="Коммерческие переговоры · 3,5 часа практики"
                  trigger={
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Зарегистрироваться <ArrowRight size={16} />
                    </button>
                  }
                />
                <p className="mt-4 text-sm text-foreground/60">
                  {nbsp("Места ограничены. После регистрации пришлем детали и счет на оплату.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results — Что вам даст тренинг */}
      <section className="relative py-20 md:py-28">
        <div className="container-px max-w-5xl mx-auto">
          <h2 className="font-serif-display font-semibold text-3xl md:text-5xl mb-4 text-center animate-fade-up">
            {nbsp("Что вам даст тренинг")}
          </h2>
          <p className="text-base md:text-lg text-center mb-12 max-w-2xl mx-auto text-foreground/80 animate-fade-up">
            <span className="text-accent font-semibold">10&nbsp;минут разговора</span>
            {nbsp(", которые в нужный момент принесут вам ")}
            <span className="text-accent font-semibold">
              {nbsp("сотни тысяч рублей")}
            </span>
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {resultsFinancial.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-card border border-foreground/15 p-5 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="w-10 h-10 border border-accent/30 bg-accent/10 grid place-items-center shrink-0">
                  <Wallet size={20} strokeWidth={1.5} className="text-accent" />
                </div>
                <p className="text-foreground leading-relaxed">{nbsp(item)}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {resultsLifestyle.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-card border border-foreground/15 p-5 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="w-10 h-10 border border-foreground/15 grid place-items-center shrink-0">
                  <Smile size={20} strokeWidth={1.5} className="text-foreground/60" />
                </div>
                <p className="text-foreground leading-relaxed">{nbsp(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 md:py-28 bg-card border-y border-foreground/10">
        <div className="container-px max-w-6xl mx-auto">
          <h2 className="font-serif-display font-semibold text-3xl md:text-5xl mb-12 text-center animate-fade-up">
            {nbsp("Отзывы участников")}
          </h2>

          {/* Desktop: horizontal scroll */}
          <div className="hidden md:block relative">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Предыдущий отзыв"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-foreground/15 bg-background hard-shadow grid place-items-center hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Следующий отзыв"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-foreground/15 bg-background hard-shadow grid place-items-center hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="w-[320px] flex-shrink-0 snap-start"
                >
                  <TestimonialCard
                    t={t}
                    isExpanded={expanded.has(i)}
                    onToggle={() => toggle(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden flex flex-col gap-5">
            {mobileTestimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                t={t}
                isExpanded={expanded.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}
            {!showAllMobile && testimonials.length > mobileTestimonials.length && (
              <button
                type="button"
                onClick={() => setShowAllMobile(true)}
                className="mt-2 mx-auto font-mono text-xs uppercase tracking-widest text-accent hover:underline"
              >
                Ещё отзывы
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Introverts — Почему укрепление отношений */}
      <section className="relative py-20 md:py-28">
        <div className="container-px max-w-5xl mx-auto text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 animate-fade-up">
            Идеально для интровертов
          </div>
          <h2 className="font-serif-display font-semibold text-3xl md:text-5xl mb-12 animate-fade-up">
            {nbsp("Почему укрепление отношений")}
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {introverts.map((item, i) => (
              <div
                key={item}
                className="bg-card border border-foreground/15 p-6 hard-shadow text-left animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="w-10 h-10 border border-accent/30 bg-accent/10 grid place-items-center mb-4">
                  <Heart size={20} strokeWidth={1.5} className="text-accent" />
                </div>
                <p className="text-foreground leading-relaxed">{nbsp(item)}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow"
          >
            Записаться на&nbsp;тренинг
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const CredentialsList = () => (
  <ul className="space-y-3">
    {credentials.map((c, i) => {
      const Icon = credentialIcons[i] || Briefcase;
      const has492 = c.includes("4.92");
      return (
        <li key={c} className="flex items-start gap-3">
          <div className="w-8 h-8 border border-accent/30 bg-accent/10 grid place-items-center shrink-0 mt-0.5">
            <Icon size={16} strokeWidth={1.5} className="text-accent" />
          </div>
          <span className="text-foreground/85 leading-relaxed text-sm md:text-[0.9375rem]">
            {has492 ? (
              <>
                {nbsp(c.split("4.92")[0])}
                <span className="text-accent font-semibold">4.92</span>
              </>
            ) : (
              nbsp(c)
            )}
          </span>
        </li>
      );
    })}
  </ul>
);

const TrainerStory = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}) => (
  <div className="mt-6">
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-accent hover:underline"
    >
      Как я&nbsp;стал тренером по&nbsp;переговорам
      <ChevronDown
        size={14}
        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </button>

    <div className="relative">
      <div
        className={`text-sm md:text-[0.9375rem] text-foreground/85 leading-relaxed space-y-4 overflow-hidden transition-all duration-500 ${
          open ? "max-h-[2400px] mt-4" : "max-h-[4.5em] mt-3"
        }`}
      >
        {trainerStory.map((item, i) => (
          <p key={i}>{renderStoryText(item)}</p>
        ))}
      </div>
      {!open && (
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--card)))",
          }}
        />
      )}
    </div>
  </div>
);

const TestimonialCard = ({
  t,
  isExpanded,
  onToggle,
}: {
  t: (typeof testimonials)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const isLong = t.text.length > 220;
  return (
    <div className="bg-background border border-foreground/15 p-6 hard-shadow flex flex-col h-full">
      <Quote size={24} strokeWidth={1.5} className="text-accent/50 mb-3" />
      <div className="relative flex-1">
        <p
          className={`text-foreground/85 leading-relaxed whitespace-pre-line text-sm md:text-base ${
            !isExpanded && isLong ? "line-clamp-5" : ""
          }`}
        >
          {t.text}
        </p>
        {!isExpanded && isLong && (
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 self-start font-mono text-xs uppercase tracking-widest text-accent hover:underline"
        >
          {isExpanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
      <div className="mt-5 pt-5 border-t border-foreground/10 flex items-center gap-3">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover border border-foreground/15 shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-foreground/15 bg-foreground/5 grid place-items-center font-serif-display font-semibold text-foreground/60 shrink-0">
            {t.name[0]}
          </div>
        )}
        <div>
          <p className="font-serif-display font-semibold text-sm">{nbsp(t.name)}</p>
          <p className="text-xs text-foreground/60">{nbsp(t.role)}</p>
        </div>
      </div>
    </div>
  );
};

export default Negotiations;
