import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CashbackPreviewFlip } from "@/components/cashback/CashbackPreviewFlip";
import cashbackHero from "@/assets/cashback-hero.jpg";



// ============================================================================
//  /cashback — основная продуктовая страница «Кэшбэк-гайда»
// ============================================================================

// ===== atoms (модель Calculator.tsx — единый визуальный язык) =====
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground border border-foreground/15 rounded-full px-3 py-1">
    {children}
  </div>
);

const GoldBtn = ({ href, onClick, children, block }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-display font-semibold text-sm tracking-wide rounded-md hard-shadow ${block ? "w-full" : ""}`}
  >
    {children}
  </a>
);

const DarkBtn = ({ href, onClick, children, block }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-display font-semibold text-sm tracking-wide rounded-md hover:bg-foreground/85 transition-colors ${block ? "w-full" : ""}`}
  >
    {children}
  </a>
);

const LightBtn = ({ href, onClick, children, block }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-background text-foreground border border-foreground/25 font-display font-semibold text-sm tracking-wide rounded-md hover:border-foreground transition-colors ${block ? "w-full" : ""}`}
  >
    {children}
  </a>
);

// ===== отзывы (повторяем визуальный язык карточек Calculator) =====
type Review = { name: string; role: string; quote: string; text: string };

const reviewsHero: Review[] = [
  {
    name: "Андрей",
    role: "разработчик · Москва",
    quote: "Из\u00A0воздуха заработал 24\u00A0000\u00A0₽ за\u00A0три месяца",
    text: "Три месяца назад начал с\u00A0Путеводителя для начинающих. Из\u00A0воздуха заработал 24k\u00A0— 15k в\u00A0ГПБ и\u00A09k в\u00A0ВТБ. Вошёл во\u00A0вкус, собираю веер карточек.",
  },
  {
    name: "Елена",
    role: "врач · Екатеринбург",
    quote: "За\u00A0март вернулось около 4\u00A0500\u00A0₽",
    text: "Кэшбэком пользуюсь давно, миксуя карты разных банков. Но\u00A0акция Газпромбанка с\u00A0кэшбэком 25% была для меня открытием. За\u00A0март вернулось порядка 4,5\u00A0тыс.\u00A0₽\u00A0— примерно на\u00A03\u00A0тыс. больше, чем вышло\u00A0бы по\u00A0старым картам.",
  },
];

const reviewsAudience: Review[] = [
  {
    name: "Олег",
    role: "предприниматель · Казань",
    quote: "Открыл Альфу\u00A0— там ещё 3\u00A0500\u00A0₽ кэшбэка лежит",
    text: "Купил гайд просто ради интереса, поскольку сам пользуюсь кэшбэками и\u00A0думал, что особо нового для себя не\u00A0подчеркну. Сразу скажу, ошибался. Открыл приложение Альфы, и\u00A0оказалось, что там ещё 3\u00A0500\u00A0₽ кэшбэка хранится.",
  },
  {
    name: "Дмитрий",
    role: "маркетолог · Москва",
    quote: "Окупил годовую подписку за\u00A01\u00A0месяц",
    text: "За\u00A0счёт комбинации сертификаты Ozon и\u00A0Халва окупил годовую подписку на\u00A0гайд за\u00A01\u00A0месяц. Дальше всё, что возвращается\u00A0— уже чистый плюс.",
  },
];

const reviewsPricing: Review[] = [
  {
    name: "Светлана",
    role: "бухгалтер · Новосибирск",
    quote: "За\u00A0полгода вернулось 36\u00A0000\u00A0₽ по\u00A0одной акции",
    text: "Сегодня получила последний кэшбэк по\u00A0акции Газпромбанка для новеньких. Итого за\u00A0полгода 36\u00A0тысяч. Без гайда я\u00A0бы про эту акцию даже не\u00A0узнала\u00A0— банк её\u00A0особо не\u00A0рекламировал.",
  },
  {
    name: "Марина",
    role: "маркетолог · СПб",
    quote: "За\u00A0неделю вернул около 10\u00A0000\u00A0₽ с\u00A0авиабилетов",
    text: "Подсмотрев в\u00A0гайде акции Альфы, за\u00A0неделю набрал кэшбэками около полутора тысяч обычными покупками. А\u00A0сегодня купил авиабилеты с\u00A030% кэшбэком. Сумма возврата составит более 10\u00A0тысяч.",
  },
];

const ReviewCard = ({ r }: { r: Review }) => {
  const [open, setOpen] = useState(false);
  return (
    <figure className="border border-foreground/15 bg-card hover:border-foreground transition-colors duration-300 p-6 md:p-7 flex flex-col">
      <header className="flex items-center gap-4">
        <span
          aria-hidden
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-muted border border-foreground/15 grid place-items-center font-display text-lg text-foreground/55 shrink-0"
        >
          {r.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <div className="font-display font-bold text-xl leading-tight text-foreground">{r.name}</div>
          <div className="font-mono text-[11px] uppercase tracking-widest mt-1 text-muted-foreground">{r.role}</div>
        </div>
      </header>
      <blockquote className="mt-5 mb-6 font-display text-lg leading-snug pl-4 text-foreground border-l-2 border-accent">
        {r.quote}
      </blockquote>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="self-end font-mono text-[11px] uppercase tracking-widest transition-colors inline-flex items-center gap-2 text-foreground hover:text-accent"
      >
        {open ? "Свернуть" : "Читать полностью"}
        <span aria-hidden>{open ? "−" : "→"}</span>
      </button>
      {open && (
        <div className="mt-3 pt-3 border-t border-foreground/10 font-body text-[15px] leading-relaxed text-foreground/85">
          <p>{r.text}</p>
        </div>
      )}
    </figure>
  );
};

const ReviewGrid = ({ items }: { items: Review[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
    {items.map((r, i) => <ReviewCard key={i} r={r} />)}
  </div>
);

// ===== данные секций =====
const inside = [
  { n: 1, t: "Разбор карт и категорий месяца", d: "Какими картами платить за\u00A0продукты, ЖКХ, маркетплейсы, такси, кафе, аптеки и\u00A0АЗС." },
  { n: 2, t: "Обновления по\u00A0банкам", d: "Что изменилось в\u00A0условиях, где упала выгода, какие лимиты и\u00A0исключения появились." },
  { n: 3, t: "Акции и\u00A0накопительные счета", d: "Промо-ставки и\u00A0сценарии, которые дают дополнительную выгоду к\u00A0обычным расходам." },
  { n: 4, t: "Спецвыпуск месяца", d: "Отдельная тема с\u00A0условиями, последовательностью действий и\u00A0предупреждениями." },
  { n: 5, t: "Архив выпусков", d: "При подписке открываются прошлые спецвыпуски и\u00A0материалы на\u00A0весь период доступа." },
];

const audience = [
  { icon: "💳", t: "Платите одной картой", d: "И\u00A0не\u00A0уверены, что она действительно выгодна для продуктов, ЖКХ, маркетплейсов и\u00A0такси." },
  { icon: "🏠", t: "Есть регулярные расходы", d: "Продукты, ЖКХ, аптеки, одежда, доставка и\u00A0крупные покупки дают заметный потенциал возврата." },
  { icon: "⏱", t: "Нет времени следить за\u00A0банками", d: "Нужна не\u00A0энциклопедия условий, а\u00A0понятная выжимка: что изменилось и\u00A0на\u00A0что обратить внимание." },
  { icon: "📈", t: "Уже пользуетесь кэшбэком", d: "Гайд помогает замечать акции, категории и\u00A0ограничения, которые легко пропустить." },
];

const archive = [
  { date: "Июнь 2026", title: "Основной выпуск", items: ["Карты и\u00A0категории месяца", "Разбор банков и\u00A0ограничений", "Комбо-кэшбэк и\u00A0сервисы"] },
  { date: "Июнь 2026", title: "Спецвыпуск", items: ["Яндекс\u00A0Банк и\u00A0ежедневный накоп", "Акции за\u00A0перевод пенсии", "ОТП, Ozon и\u00A0накопительные счета"] },
  { date: "Архив", title: "Прошлые материалы", items: ["Старые спецвыпуски доступны подписчикам", "Темы архива заполняются по\u00A0фактическим выпускам", "Удобно возвращаться к\u00A0рабочим сценариям"] },
];

const usage = [
  { n: 1, t: "Быстро", d: "Открыть текущий выпуск и\u00A0посмотреть, какими картами платить в\u00A0основных категориях месяца." },
  { n: 2, t: "Под задачу", d: "Найти через поиск нужную категорию: продукты, ЖКХ, маркетплейсы, такси, аптеки, АЗС." },
  { n: 3, t: "Глубже", d: "Изучить разборы банков, спецвыпуски, ограничения, накопительные счета и\u00A0комбо-сценарии." },
];

const faqItems = [
  { q: "Что я\u00A0получу после оплаты?", a: "Доступ к\u00A0текущему выпуску Кэшбэк-гайда, спецвыпускам и\u00A0архиву на\u00A0период выбранного тарифа." },
  { q: "Как часто выходят обновления?", a: "Основной выпуск и\u00A0обновления выходят ежемесячно. Спецвыпуски посвящены отдельным темам и\u00A0доступны подписчикам." },
  { q: "Подойдёт\u00A0ли новичку?", a: "Да. Для старта внутри есть Путеводитель для начинающих, который помогает разобраться с\u00A0базовой логикой карт, категорий и\u00A0расходов." },
  { q: "Нужно\u00A0ли открывать много карт?", a: "Нет. Можно начать с\u00A0одной-двух понятных карт и\u00A0постепенно добавлять новые инструменты, если захочется забирать больше выгоды." },
  { q: "Это финансовая консультация?", a: "Нет. Материалы носят информационный характер. Решение об\u00A0оформлении банковских продуктов и\u00A0карт пользователь принимает самостоятельно после проверки актуальных условий банка." },
  { q: "Можно\u00A0ли окупить подписку?", a: "Это зависит от\u00A0ваших расходов, банков, региона, доступных карт и\u00A0готовности применять рекомендации. На\u00A0странице приведены реальные примеры результатов подписчиков, но\u00A0они не\u00A0являются гарантией." },
];

const tariffs = [
  {
    name: "Месяц",
    old: "1\u00A0500\u00A0₽",
    price: "990\u00A0₽",
    per: "",
    note: "Чтобы проверить гайд на\u00A0своих расходах и\u00A0понять, насколько вам подходит формат.",
    items: ["Доступ на\u00A030 дней", "Основной выпуск месяца", "Спецвыпуски и\u00A0архив на\u00A0период доступа"],
    badge: "",
    featured: false,
  },
  {
    name: "Квартал",
    old: "4\u00A0500\u00A0₽",
    price: "2\u00A0990\u00A0₽",
    per: "≈\u00A0997\u00A0₽ в\u00A0месяц",
    note: "Три обновления подряд: удобно спокойно внедрить подход и\u00A0не\u00A0принимать решение каждый месяц.",
    items: ["Доступ на\u00A03\u00A0месяца", "3\u00A0ежемесячных выпуска", "Спецвыпуски и\u00A0архив на\u00A0период доступа"],
    badge: "Акция",
    featured: true,
  },
  {
    name: "Год",
    old: "18\u00A0000\u00A0₽",
    price: "9\u00A0900\u00A0₽",
    per: "825\u00A0₽ в\u00A0месяц",
    note: "Для тех, кто хочет весь год получать обновления без ежемесячного продления.",
    items: ["Доступ на\u00A012\u00A0месяцев", "12\u00A0ежемесячных выпусков", "Все спецвыпуски и\u00A0архив на\u00A0период доступа"],
    badge: "",
    featured: false,
  },
];

const Cashback = () => {
  useEffect(() => {
    document.title = "Кэшбэк-гайд — ежемесячный разбор банковских выгод";
  }, []);

  const [toast, setToast] = useState<string | null>(null);
  const buy = (label: string) => {
    setToast(`Здесь подключается оплата: ${label}`);
    setTimeout(() => setToast(null), 2600);
  };

  const pageNav = [
    { href: "#inside", label: "Что внутри", id: "inside" },
    { href: "#preview", label: "Превью", id: "preview" },
    { href: "#archive", label: "Архив", id: "archive" },
    { href: "#pricing", label: "Тарифы", id: "pricing" },
    { href: "#pricing", label: "Оформить доступ", cta: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={pageNav} />

      <main className="pt-28">
        {/* ============ HERO ============ */}
        <section className="container-px max-w-7xl mx-auto pb-16 md:pb-24 relative">
          <div className="absolute inset-0 -z-10 bg-grid opacity-40 mask-fade-b" />
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="relative">
              {/* Mobile: иллюстрация как декоративный фон, не растягивает блок */}
              <img
                src={cashbackHero}
                alt=""
                aria-hidden
                className="lg:hidden pointer-events-none select-none absolute -right-6 -top-6 w-56 sm:w-72 h-auto opacity-20 -z-10"
                draggable={false}
              />
              <Eyebrow>Ежемесячный аналитический выпуск</Eyebrow>
              <h1 className="font-serif-display font-medium text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight mt-6">
                Кэшбэк-гайд: разбор банковских <span className="italic">выгод</span> каждый месяц
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Карты, категории, акции, накопительные счета, ограничения и&nbsp;рабочие сценарии для обычных расходов&nbsp;— в&nbsp;одном актуальном выпуске.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <GoldBtn href="#pricing">Оформить доступ →</GoldBtn>
                <LightBtn href="#preview">Посмотреть превью</LightBtn>
              </div>

              <div className="mt-8 text-sm text-muted-foreground max-w-lg leading-relaxed">
                Это не&nbsp;курс и&nbsp;не&nbsp;разовая методичка. Это подписка на&nbsp;регулярные обновления и&nbsp;архив выпусков.
              </div>
            </div>

            {/* Hero illustration — только на десктопе */}
            <aside className="hidden lg:flex relative justify-end">
              <img
                src={cashbackHero}
                alt="Иллюстрация: карты и возврат кэшбэка"
                width={1024}
                height={1280}
                className="w-full max-w-none h-auto select-none"
                draggable={false}
              />
            </aside>

          </div>
        </section>

        {/* ============ Отзывы под hero ============ */}
        <section className="container-px max-w-7xl mx-auto pb-16 md:pb-24">
          <ReviewGrid items={reviewsHero} />
        </section>

        {/* ============ Inside ============ */}
        <section id="inside" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <Eyebrow>В&nbsp;текущем выпуске</Eyebrow>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight mt-6">
                Что именно получает подписчик
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Гайд собран как рабочий журнал: можно читать целиком, а&nbsp;можно быстро найти нужную категорию или банк через поиск.
              </p>
            </div>
            <ul className="space-y-5">
              {inside.map((i) => (
                <li key={i.n} className="flex gap-5 border-t border-foreground/15 pt-5 first:border-t-0 first:pt-0">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1 shrink-0 w-8">
                    №{i.n}
                  </span>
                  <div>
                    <div className="font-display font-bold text-xl text-foreground">{i.t}</div>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{i.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ Preview — листалка ============ */}
        <CashbackPreviewFlip />


        {/* ============ Why monthly (dark research) ============ */}
        <section className="container-px max-w-7xl mx-auto py-20 md:py-28">
          <div className="bg-foreground text-background rounded-lg p-8 md:p-12 grid lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
                Почему выпуск обновляется
              </div>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight mt-6">
                Банковские выгоды быстро устаревают
              </h2>
              <p className="mt-5 text-lg text-background/70 leading-relaxed">
                Банки меняют категории, лимиты, ставки, подписки, правила начисления и&nbsp;исключения. Один и&nbsp;тот&nbsp;же совет может быть полезен в&nbsp;мае и&nbsp;уже не&nbsp;работать в&nbsp;июне.
              </p>
              <blockquote className="mt-8 pl-5 border-l-2 border-accent font-display text-lg leading-snug text-background/90">
                Действительно стоящая вещь&nbsp;— тщательная аналитика. Всё чётко разложено, со&nbsp;скринами, как воспользоваться плюшками. Сама регулярно получаю кэшем или баллами 5–20&nbsp;т.&nbsp;р. в&nbsp;месяц, но&nbsp;в&nbsp;гайде нашла новую инфу.
              </blockquote>
            </div>
            <ul className="space-y-4 self-center">
              {[
                "Каждый месяц разбираем, какие условия банков изменились.",
                "Отбираем сценарии, которые можно применить в обычных расходах.",
                "Проверяем лимиты, категории, способы оплаты, исключения и подвохи.",
                "Собираем не общий шум, а практическую выжимку для подписчиков.",
              ].map((t) => (
                <li key={t} className="flex gap-4 border-t border-background/20 pt-4 first:border-t-0 first:pt-0 text-background/85">
                  <span className="text-accent">◆</span>
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ Путеводитель для старта ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <Eyebrow>Для старта</Eyebrow>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight mt-6">
                Если вы новичок, начните с&nbsp;Путеводителя
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Внутри подписки есть вводный материал: от&nbsp;выбора одной карты до&nbsp;понимания, как собирать несколько карт под разные расходы.
              </p>
              <blockquote className="mt-8 pl-5 border-l-2 border-accent font-display text-lg leading-snug text-foreground">
                Три месяца назад начал с&nbsp;Путеводителя для начинающих. Из&nbsp;воздуха заработал 24k&nbsp;— 15k в&nbsp;ГПБ и&nbsp;9k в&nbsp;ВТБ.
              </blockquote>
            </div>
            <ul className="space-y-5">
              {[
                { t: "Первые шаги", d: "Как выбрать карту под свои регулярные расходы и\u00A0не\u00A0утонуть в\u00A0условиях." },
                { t: "Категории", d: "Как понимать супермаркеты, ЖКХ, маркетплейсы, такси, медицину и\u00A0другие типовые расходы." },
                { t: "Дальше", d: "Как постепенно добавлять новые карты, если хочется забирать больше выгоды." },
              ].map((i) => (
                <li key={i.t} className="flex gap-5 border-t border-foreground/15 pt-5 first:border-t-0 first:pt-0">
                  <span className="text-accent font-mono shrink-0 w-6">→</span>
                  <div>
                    <div className="font-display font-bold text-xl">{i.t}</div>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{i.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ Кому подойдёт ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Кому подойдёт
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Тем, кто хочет получать больше выгоды с&nbsp;расходов, которые уже&nbsp;есть, и&nbsp;не&nbsp;хочет каждый месяц самостоятельно разбирать правила банков.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {audience.map((a) => (
              <article key={a.t} className="border border-foreground/15 bg-card p-6 hover:border-foreground transition-colors">
                <div className="text-3xl">{a.icon}</div>
                <h3 className="font-display font-bold text-lg mt-4 leading-tight">{a.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <ReviewGrid items={reviewsAudience} />
          </div>
        </section>

        {/* ============ Архив ============ */}
        <section id="archive" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Архив выпусков и&nbsp;спецвыпусков
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Подписка ценна не&nbsp;только текущим месяцем. Внутри есть архив прошлых спецвыпусков: можно возвращаться к&nbsp;темам, акциям, банкам и&nbsp;сценариям, которые остаются актуальными.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {archive.map((a) => (
              <article key={a.title} className="border border-foreground/15 bg-card p-7 flex flex-col">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{a.date}</div>
                <h3 className="font-display font-bold text-2xl mt-3">{a.title}</h3>
                <ul className="mt-5 space-y-2 text-[15px] text-foreground/85">
                  {a.items.map((it) => (
                    <li key={it} className="flex gap-3"><span className="text-accent">·</span><span>{it}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ============ Как пользоваться ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Как пользоваться гайдом
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Не&nbsp;обязательно читать всё подряд. Гайд можно использовать как справочник по&nbsp;конкретной категории, банку или задаче.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {usage.map((u) => (
              <article key={u.n} className="border border-foreground/15 bg-card p-7">
                <div className="w-11 h-11 rounded-full bg-foreground text-accent grid place-items-center font-display font-bold">
                  {u.n}
                </div>
                <h3 className="font-display font-bold text-2xl mt-5">{u.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{u.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ Автор (dark) ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="bg-foreground text-background rounded-lg p-8 md:p-12 grid lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
                Автор
              </div>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight mt-6">
                Василий Мещеряков
              </h2>
              <p className="mt-5 text-lg text-background/70 leading-relaxed">
                Финансовый консультант, автор канала «Вася и&nbsp;финансы». Учит вести бюджет и&nbsp;работать с&nbsp;личными финансами без сложных схем и&nbsp;потери интереса.
              </p>
              <div className="mt-8 border border-background/20 rounded p-5">
                <div className="font-display font-bold text-xl">«Вася и&nbsp;финансы»</div>
                <p className="mt-2 text-sm text-background/70 leading-relaxed">
                  Практический подход к&nbsp;личным финансам: бюджет, кэшбэк, банковские продукты и&nbsp;понятные действия без лишней теории.
                </p>
              </div>
            </div>
            <div className="space-y-6 self-center">
              <blockquote className="pl-5 border-l-2 border-accent font-display text-lg leading-snug text-background/90">
                Василий, добрый день! Так и&nbsp;хочется сказать&nbsp;— а&nbsp;что, так бывает? Ожидание недели по&nbsp;оплате кухни вылилось в&nbsp;новую посудомоечную машину и&nbsp;«бесплатный» монтаж этой кухни. Большое спасибо за&nbsp;консультацию.
              </blockquote>
              <blockquote className="pl-5 border-l-2 border-accent font-display text-base leading-snug text-background/80">
                И&nbsp;ваша консультация увеличила налоговый вычет на&nbsp;40&nbsp;000. Спасибо.
              </blockquote>
            </div>
          </div>
        </section>

        {/* ============ Pricing ============ */}
        <section id="pricing" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Оформите доступ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12 items-stretch">
            {tariffs.map((t) => (
              <article
                key={t.name}
                className={`relative border bg-card p-7 md:p-8 flex flex-col ${
                  t.featured ? "border-accent shadow-paper lg:-translate-y-3" : "border-foreground/15"
                }`}
              >
                {t.badge && (
                  <div className="absolute right-5 top-5 bg-foreground text-accent font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {t.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl">{t.name}</h3>
                <div className="mt-6 font-mono text-sm text-muted-foreground line-through">{t.old}</div>
                <div className="font-serif-display text-5xl md:text-6xl leading-none tracking-tight mt-2">{t.price}</div>
                {t.per && <div className="font-mono text-xs uppercase tracking-widest text-accent mt-3">{t.per}</div>}
                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground min-h-[78px]">{t.note}</p>
                <ul className="mt-5 space-y-2 text-[15px] text-foreground/85 flex-1">
                  {t.items.map((i) => (
                    <li key={i} className="flex gap-3"><span className="text-accent">✓</span><span>{i}</span></li>
                  ))}
                </ul>
                <div className="mt-7">
                  {t.featured
                    ? <GoldBtn block onClick={() => buy(t.name)}>Оформить доступ</GoldBtn>
                    : <DarkBtn block onClick={() => buy(t.name)}>Оформить доступ</DarkBtn>}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <ReviewGrid items={reviewsPricing} />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Вопросы перед покупкой
            </h2>
          </div>
          <div className="mt-10 max-w-3xl space-y-3">
            {faqItems.map((f, i) => (
              <details key={i} className="border border-foreground/15 bg-card p-5 md:p-6 group">
                <summary className="cursor-pointer font-display font-bold text-lg list-none flex justify-between items-start gap-4">
                  <span>{f.q}</span>
                  <span className="text-accent font-mono shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ============ Final CTA ============ */}
        <section className="container-px max-w-7xl mx-auto py-20 md:py-28 text-center">
          <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Оформите доступ к&nbsp;текущему выпуску и&nbsp;архиву
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Начните с&nbsp;месяца или выберите более длинный доступ, если хотите получать обновления регулярно.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldBtn href="#pricing">Оформить доступ →</GoldBtn>
          </div>
        </section>
      </main>

      <Footer />

      {toast && (
        <div className="fixed left-1/2 bottom-6 -translate-x-1/2 bg-foreground text-background rounded-full px-5 py-3 font-mono text-xs uppercase tracking-widest shadow-paper z-50">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Cashback;
