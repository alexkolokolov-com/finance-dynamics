import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CalculatorRegisterDialog } from "@/components/calculator/CalculatorRegisterDialog";


const rub = new Intl.NumberFormat("ru-RU");

type CatId =
  | "groceries"
  | "utilities"
  | "marketplaces"
  | "cafes"
  | "transport"
  | "fuel"
  | "medical"
  | "clothes";

const categories: Record<CatId, { name: string; base: number; realistic: number; max: number }> = {
  groceries:    { name: "Продукты",         base: 0.010, realistic: 0.045, max: 0.080 },
  utilities:    { name: "ЖКХ",              base: 0.000, realistic: 0.025, max: 0.045 },
  marketplaces: { name: "Маркетплейсы",     base: 0.005, realistic: 0.040, max: 0.080 },
  cafes:        { name: "Кафе",             base: 0.010, realistic: 0.040, max: 0.070 },
  transport:    { name: "Такси/транспорт",  base: 0.005, realistic: 0.050, max: 0.100 },
  fuel:         { name: "АЗС",              base: 0.010, realistic: 0.040, max: 0.065 },
  medical:      { name: "Аптеки/медицина",  base: 0.005, realistic: 0.040, max: 0.070 },
  clothes:      { name: "Одежда",           base: 0.010, realistic: 0.040, max: 0.080 },
};

const profileSplits: Record<string, Record<CatId, number>> = {
  family:   { groceries: .38, utilities: .12, marketplaces: .18, cafes: .07, transport: .06, fuel: .05, medical: .07, clothes: .07 },
  city:     { groceries: .24, utilities: .07, marketplaces: .20, cafes: .17, transport: .14, fuel: .02, medical: .06, clothes: .10 },
  auto:     { groceries: .28, utilities: .09, marketplaces: .15, cafes: .08, transport: .04, fuel: .22, medical: .05, clothes: .09 },
  balanced: { groceries: .30, utilities: .10, marketplaces: .18, cafes: .10, transport: .08, fuel: .08, medical: .07, clothes: .09 },
};

const detailRanges: Record<CatId, { min: number; max: number; step: number; def: number }> = {
  groceries:    { min: 0, max: 100000, step: 1000, def: 45000 },
  utilities:    { min: 0, max:  50000, step: 1000, def: 12000 },
  marketplaces: { min: 0, max: 100000, step: 1000, def: 25000 },
  cafes:        { min: 0, max:  60000, step: 1000, def: 10000 },
  transport:    { min: 0, max:  50000, step: 1000, def:  8000 },
  fuel:         { min: 0, max:  80000, step: 1000, def:  7000 },
  medical:      { min: 0, max:  60000, step: 1000, def:  6000 },
  clothes:      { min: 0, max:  80000, step: 1000, def:  7000 },
};

// ====== shared atoms ======
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground border border-foreground/15 rounded-full px-3 py-1">
    {children}
  </div>
);

const GoldBtn = ({ href, onClick, children, block }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean }) => {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-display font-semibold text-sm tracking-wide rounded-md hard-shadow ${block ? "w-full" : ""}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
};

const DarkBtn = ({ href, onClick, children, block }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean }) => {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-display font-semibold text-sm tracking-wide rounded-md hover:bg-foreground/85 transition-colors ${block ? "w-full" : ""}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
};


const LightBtn = ({ href, onClick, children, block, type }: { href?: string; onClick?: () => void; children: React.ReactNode; block?: boolean; type?: "submit" | "button" }) => {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-background text-foreground border border-foreground/25 font-display font-semibold text-sm tracking-wide rounded-md hover:border-foreground transition-colors ${block ? "w-full" : ""}`;
  if (type === "submit") return <button type="submit" onClick={onClick} className={cls}>{children}</button>;
  return <a href={href} onClick={onClick} className={cls}>{children}</a>;
};

// ====== Range slider styled ======
const RangeInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    type="range"
    className="w-full h-1.5 appearance-none cursor-pointer bg-foreground/10 rounded-full
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
      [&::-webkit-slider-thumb]:bg-foreground
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-accent
      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
      [&::-moz-range-thumb]:bg-foreground
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-accent
      [&::-moz-range-thumb]:cursor-pointer"
  />
);

// ====== Cashback reviews (test data) ======
type CashbackReview = { name: string; role: string; quote: string; text: string };

const reviewsTop: CashbackReview[] = [
  {
    name: "Андрей",
    role: "разработчик · Москва",
    quote: "Из воздуха заработал 24 000 ₽ за три месяца",
    text: "Три месяца назад начал с Путеводителя для начинающих. Из воздуха заработал 24k — 15k в ГПБ и 9k в ВТБ. Вошёл во вкус, собираю веер карточек.",
  },
  {
    name: "Марина",
    role: "маркетолог · СПб",
    quote: "За неделю вернул около 10 000 ₽ с авиабилетов",
    text: "Подсмотрев в гайде акции Альфы, за неделю набрал кэшбэками около полутора тысяч обычными покупками. А сегодня купил авиабилеты с 30% кэшбэком. Сумма возврата составит более 10 тысяч.",
  },
];

const reviewsBottom: CashbackReview[] = [
  {
    name: "Олег",
    role: "предприниматель · Казань",
    quote: "Открыл Альфу — там ещё 3 500 ₽ кэшбэка лежит",
    text: "Купил гайд просто ради интереса, поскольку сам пользуюсь кэшбэками и думал, что особо нового для себя не подчеркну. Сразу скажу, ошибался. Открыл приложение Альфы, и оказалось, что там ещё 3 500 ₽ кэшбэка хранится.",
  },
  {
    name: "Елена",
    role: "врач · Екатеринбург",
    quote: "За март вернулось около 4 500 ₽ — на 3 000 больше обычного",
    text: "Кэшбэком пользуюсь давно, миксуя карты разных банков. Но акция Газпромбанка с кэшбэком 25% была для меня открытием. За март вернулось порядка 4,5 тыс. ₽ — примерно на 3 тыс. больше, чем вышло бы по старым картам.",
  },
];

const reviewsPricing: CashbackReview[] = [
  {
    name: "Светлана",
    role: "бухгалтер · Новосибирск",
    quote: "За полгода вернулось 36 000 ₽ по одной акции",
    text: "Сегодня получила последний кэшбэк по акции Газпромбанка для новеньких. Итого за полгода 36 тысяч. Без гайда я бы про эту акцию даже не узнала — банк её особо не рекламировал.",
  },
  {
    name: "Дмитрий",
    role: "маркетолог · Москва",
    quote: "Окупил годовую подписку на гайд за 1 месяц",
    text: "За счёт комбинации сертификаты Ozon и Халва окупил годовую подписку на гайд за 1 месяц. Дальше всё, что возвращается — уже чистый плюс.",
  },
];


const CashbackReviewCard = ({ r }: { r: CashbackReview }) => {
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

const CashbackReviewGrid = ({ items, columns = 2 }: { items: CashbackReview[]; columns?: 2 | 3 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""} gap-6 lg:gap-8`}>
    {items.map((r, i) => (
      <CashbackReviewCard key={i} r={r} />
    ))}
  </div>
);




// ====== Page ======
const Calculator = () => {
  const [mode, setMode] = useState<"quick" | "detail">("quick");
  const [totalSpend, setTotalSpend] = useState(120000);
  const [profile, setProfile] = useState<"family" | "city" | "auto" | "balanced">("family");
  const [current, setCurrent] = useState<"one" | "few" | "some" | "pro">("one");
  const [style, setStyle] = useState<"lazy" | "optimal" | "max" | "safe">("lazy");
  const [detail, setDetail] = useState<Record<CatId, number>>(() => {
    const d = {} as Record<CatId, number>;
    (Object.keys(detailRanges) as CatId[]).forEach((k) => (d[k] = detailRanges[k].def));
    return d;
  });

  useEffect(() => {
    document.title = "Калькулятор потерянного кэшбэка — Физика финансов";
  }, []);

  const styleMul = style === "lazy" ? 0.72 : style === "optimal" ? 0.9 : style === "max" ? 1.12 : 0.62;
  const penalty = current === "one" ? 1.0 : current === "few" ? 0.82 : current === "some" ? 0.62 : 0.38;

  const spendMap = useMemo<Record<CatId, number>>(() => {
    if (mode === "quick") {
      const split = profileSplits[profile];
      const m = {} as Record<CatId, number>;
      (Object.keys(categories) as CatId[]).forEach((k) => (m[k] = Math.round(totalSpend * split[k])));
      return m;
    }
    return detail;
  }, [mode, totalSpend, profile, detail]);

  const losses = useMemo(() => {
    return (Object.keys(categories) as CatId[]).map((id) => {
      const cat = categories[id];
      const cur = spendMap[id] * cat.base;
      const tgt = spendMap[id] * cat.realistic * styleMul;
      return { id, name: cat.name, loss: Math.round(Math.max(0, tgt - cur) * penalty) };
    });
  }, [spendMap, styleMul, penalty]);

  const totalLoss = Math.round(losses.reduce((s, i) => s + i.loss, 0) / 50) * 50;
  const top = [...losses].sort((a, b) => b.loss - a.loss).slice(0, 5);

  const strategy =
    style === "lazy"
      ? { name: "Ленивая выгода", text: "Вам не нужно 10 карт и сложные схемы. Достаточно настроить 1–3 основные карты и раз в месяц проверять актуальные категории." }
      : style === "optimal"
      ? { name: "Оптимальная система", text: "Вам подойдёт связка из 2–4 карт: базовая карта для рутины и дополнительные карты под сильные категории месяца." }
      : style === "max"
      ? { name: "Охотник за выгодой", text: "Вам подойдут спецвыпуски, банковские акции, накопительные счета, связки карт и продвинутые сценарии." }
      : { name: "Спокойная стратегия", text: "Вам важна не максимизация любой ценой, а понятная схема без лишних банков, рисков и постоянной суеты." };

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const pageNav = [
    { href: "#guide", label: "Гайд" },
    { href: "#pricing", label: "Тарифы" },
    { href: "#faq", label: "Вопросы" },
    { href: "#calc", label: "Рассчитать", cta: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={pageNav} />

      <main className="pt-28">
        {/* ============ HERO ============ */}
        <section className="container-px max-w-7xl mx-auto pb-16 md:pb-24 relative">
          <div className="absolute inset-0 -z-10 bg-grid opacity-40 mask-fade-b" />
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <Eyebrow>Бесплатный расчёт за 2 минуты</Eyebrow>
              <h1 className="font-serif-display font-medium text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight mt-6">
                Сколько <span className="italic">кэшбэка</span> вы упускаете каждый месяц?
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                При тех же расходах вы можете получать 15 000 ₽ вместо 1 500 ₽. Проверьте, сколько денег можно вернуть с продуктов, ЖКХ, маркетплейсов, такси, кафе, аптек и АЗС.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <GoldBtn href="#calc">Рассчитать мою выгоду →</GoldBtn>
                <LightBtn href="#guide">Что такое Кэшбэк-гайд</LightBtn>
              </div>


              <div className="mt-8 flex flex-wrap gap-2">
                {["Ежемесячные обновления", "Для новичков и продвинутых", "Карты, акции, категории, лимиты"].map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground border border-foreground/15 rounded-full px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Mock card */}
            <aside className="bg-foreground text-background rounded-lg p-6 md:p-8 shadow-paper border border-foreground/40">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-background/60">
                <span>Пример расчёта</span>
                <span className="px-2 py-1 border border-accent/60 text-accent rounded-full">потенциал</span>
              </div>
              <div className="mt-6 space-y-5">
                {[
                  { label: "Продукты и супермаркеты", val: "45 000 ₽", w: 72 },
                  { label: "Маркетплейсы", val: "25 000 ₽", w: 49 },
                  { label: "ЖКХ", val: "12 000 ₽", w: 26 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-background/80">{r.label}</span>
                      <b className="font-mono">{r.val}</b>
                    </div>
                    <div className="h-1.5 bg-background/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${r.w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-background/15">
                <div className="text-xs font-mono uppercase tracking-widest text-background/60">Можно недополучать</div>
                <div className="font-display font-bold text-4xl md:text-5xl mt-2 text-accent">4 850 ₽/мес</div>
                <div className="text-xs text-background/50 mt-2">или около 58 200 ₽ в год</div>
              </div>
            </aside>
          </div>
        </section>





        {/* ============ PROBLEM ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Одна и та же покупка может вернуть 0 ₽ или 500 ₽
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Всё зависит от карты, категории, лимита, способа оплаты и условий конкретного месяца. Банки постоянно меняют правила, поэтому «лучшая карта» не бывает вечной.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🛒", title: "Продукты", body: "Категории супермаркетов, партнёры, округления и лимиты могут менять реальную выгоду в разы." },
              { icon: "💡", title: "ЖКХ", body: "Иногда важно платить не из приложения банка, а через сайт поставщика или другой сценарий оплаты." },
              { icon: "📦", title: "Маркетплейсы", body: "Ozon, WB, Яндекс Маркет и другие площадки часто попадают в разные категории и акции." },
              { icon: "🏦", title: "Банки", body: "Категории, подписки, промоставки, ограничения и исключения обновляются каждый месяц." },
            ].map((c) => (
              <article key={c.title} className="bg-card border border-foreground/10 rounded-lg p-6 hover:border-accent/60 hover:-translate-y-0.5 transition-all">
                <div className="text-2xl">{c.icon}</div>
                <h3 className="font-display font-bold text-lg mt-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ CALCULATOR ============ */}
        <section id="calc" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
            {/* Calc card */}
            <div className="bg-card border border-foreground/10 rounded-lg p-6 md:p-10 shadow-paper">
              
              <h2 className="font-serif-display text-3xl md:text-4xl leading-tight mt-4">
                Калькулятор потерянного кэшбэка
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Введите примерные ежемесячные расходы. Калькулятор покажет диапазон денег, которые можно дополнительно возвращать с помощью актуальной кэшбэк-стратегии.
              </p>

              {/* Tabs */}
              <div className="mt-7 inline-flex p-1 bg-foreground/5 border border-foreground/10 rounded-md">
                {(["quick", "detail"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setMode(t)}
                    className={`px-5 py-2 text-sm font-display font-semibold rounded-[4px] transition-all ${
                      mode === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "quick" ? "Быстро" : "Точно"}
                  </button>
                ))}
              </div>

              {/* Quick mode */}
              {mode === "quick" && (
                <div className="mt-8 space-y-8">
                  <div>
                    <div className="flex justify-between items-baseline mb-3">
                      <label className="text-sm font-medium">Ваши расходы в месяц</label>
                      <span className="font-mono font-semibold text-accent">{rub.format(totalSpend)} ₽</span>
                    </div>
                    <RangeInput min={30000} max={300000} step={5000} value={totalSpend} onChange={(e) => setTotalSpend(Number(e.currentTarget.value))} />
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                      Какой у вас профиль расходов?
                    </div>
                    <Segmented
                      name="profile"
                      value={profile}
                      onChange={(v) => setProfile(v as typeof profile)}
                      options={[
                        { value: "family", label: "Семья: продукты, ЖКХ, маркетплейсы" },
                        { value: "city", label: "Город: кафе, такси, сервисы, доставка" },
                        { value: "auto", label: "Авто: АЗС, магазины, крупные покупки" },
                        { value: "balanced", label: "Смешанный: расходы распределены" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Detail mode */}
              {mode === "detail" && (
                <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-6">
                  {(Object.keys(detailRanges) as CatId[]).map((id) => (
                    <div key={id}>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-sm font-medium">{categories[id].name}</label>
                        <span className="font-mono text-sm text-accent">{rub.format(detail[id])} ₽</span>
                      </div>
                      <RangeInput
                        min={detailRanges[id].min}
                        max={detailRanges[id].max}
                        step={detailRanges[id].step}
                        value={detail[id]}
                        onChange={(e) => setDetail({ ...detail, [id]: Number(e.currentTarget.value) })}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Common controls */}
              <div className="mt-10">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  Как вы сейчас пользуетесь картами?
                </div>
                <Segmented
                  name="current"
                  value={current}
                  onChange={(v) => setCurrent(v as typeof current)}
                  options={[
                    { value: "one", label: "Плачу одной основной картой" },
                    { value: "few", label: "Есть 2–3 карты, но без системы" },
                    { value: "some", label: "Иногда выбираю категории" },
                    { value: "pro", label: "Уже слежу за кэшбэком" },
                  ]}
                />
              </div>

              <div className="mt-8">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  Какую стратегию хотите?
                </div>
                <Segmented
                  name="style"
                  value={style}
                  onChange={(v) => setStyle(v as typeof style)}
                  options={[
                    { value: "lazy", label: "Без заморочек: 1–2 карты" },
                    { value: "optimal", label: "Оптимально: 2–4 карты" },
                    { value: "max", label: "Максимум выгоды" },
                    { value: "safe", label: "Спокойно и без риска" },
                  ]}
                />
              </div>
            </div>

            {/* Result card */}
            <aside className="bg-foreground text-background rounded-lg p-6 md:p-8 shadow-paper border border-foreground/40 lg:sticky lg:top-24 self-start">
              <div className="text-xs font-mono uppercase tracking-widest text-background/60">
                Ваш предварительный расчёт
              </div>
              <div className="font-display font-bold text-5xl md:text-6xl mt-3 text-accent leading-none number-display">
                {rub.format(totalLoss)} <span className="text-3xl md:text-4xl">₽/мес</span>
              </div>
              <p className="mt-4 text-sm text-background/70 leading-relaxed">
                примерно столько вы можете недополучать на кэшбэке и банковских выгодах при текущем стиле оплаты.
              </p>

              <div className="mt-6 space-y-2">
                {top.map((it) => (
                  <div key={it.id} className="flex justify-between items-center py-2 border-b border-background/10 text-sm">
                    <span className="text-background/80">{it.name}</span>
                    <strong className="font-mono text-accent">{rub.format(it.loss)} ₽/мес</strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-background/[0.04] border border-background/15 rounded-md">
                <div className="text-xs font-mono uppercase tracking-widest text-background/60">Ваш тип стратегии</div>
                <b className="block font-display text-xl mt-2 text-accent">{strategy.name}</b>
                <p className="mt-2 text-sm text-background/75 leading-relaxed">{strategy.text}</p>
              </div>

              <div className="mt-6">
                <GoldBtn href="#pricing" block>Оформить доступ →</GoldBtn>
              </div>
            </aside>
          </div>
        </section>

        {/* ============ REVIEWS UNDER CALC ============ */}
        <section className="container-px max-w-7xl mx-auto py-12 md:py-16">
          <CashbackReviewGrid items={reviewsTop} columns={2} />
        </section>



        {/* ============ WHY NOT ONE CARD ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Почему нельзя просто один раз выбрать лучшую карту
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Кэшбэк — это не статичная настройка. Банки меняют категории, лимиты, подписки, исключения и акции. Поэтому задача не в том, чтобы найти «лучшую карту навсегда», а в том, чтобы каждый месяц иметь актуальную схему.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { n: "1", title: "Банки меняют правила", body: "То, что работало весной, летом может уже не давать нужную категорию или иметь новые ограничения." },
              { n: "2", title: "Вы теряете на деталях", body: "Способ оплаты, MCC, лимит, подписка и место покупки могут съесть большую часть выгоды." },
              { n: "3", title: "Нужна навигация", body: "Проще получать готовую выжимку месяца, чем самому читать правила банков и ловить изменения." },
            ].map((s) => (
              <article key={s.n} className="bg-card border border-foreground/10 rounded-lg p-7 relative">
                <div className="font-serif-display text-6xl text-accent/40 leading-none">{s.n}</div>
                <h3 className="font-display font-bold text-xl mt-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ GUIDE / EXPERT (dark) ============ */}
        <section id="guide" className="py-16 md:py-24 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="bg-foreground text-background rounded-lg p-8 md:p-14 border border-foreground/30 shadow-paper">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
                    Как устроен продукт
                  </div>
                  <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] mt-6">
                    Мы каждый месяц разбираем рынок банковских выгод
                  </h2>
                  <div className="mt-6 font-serif-display italic text-xl text-background/85 leading-snug border-l-2 border-accent pl-5">
                    «Я со своей командой смотрю не на рекламные обещания банков, а на то, что реально можно применить в обычных расходах».
                  </div>

                  <div className="mt-8 flex items-center gap-4 p-5 bg-background/[0.04] border border-background/15 rounded-md">
                    <div className="w-14 h-14 rounded-full bg-accent text-foreground font-display font-bold flex items-center justify-center text-lg shrink-0">
                      ВМ
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">Василий Мещеряков</h3>
                      <p className="text-sm text-background/70 leading-snug mt-1">
                        Финансовый консультант, автор канала «Вася и финансы». Учит вести бюджет и работать с личными финансами без сложных схем и потери интереса.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-lg text-background/85 leading-relaxed">
                    Кэшбэк-гайд — это не разовый PDF. Это регулярная выжимка по картам, категориям, акциям, накопительным счетам и изменениям в условиях банков.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Смотрим, какие условия банков изменились в этом месяце.",
                      "Отбираем рабочие сценарии для продуктов, ЖКХ, маркетплейсов, такси, аптек, АЗС и других расходов.",
                      "Проверяем важные ограничения: лимиты, категории, способы оплаты, исключения и подвохи.",
                      "Обновляем основной выпуск и спецвыпуски, чтобы у подписчиков была актуальная картина, а не устаревший список карт.",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm text-background/85 leading-relaxed">
                        <span className="text-accent shrink-0 mt-0.5">→</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <blockquote className="mt-6 border-l-2 border-accent pl-4 py-1 text-sm italic font-serif-display text-background/85 leading-snug">
                    «Действительно стоящая вещь — тщательная аналитика. Всё чётко разложено, со скринами, как воспользоваться плюшками, а не только теория. Сама регулярно получаю кэшем или баллами 5–20 т. р. в месяц, но в гайде нашла новую инфу.»
                  </blockquote>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Основной выпуск месяца",
                      "Ежемесячные спецвыпуски",
                      "Архив прошлых выпусков",
                      "Карты, категории, лимиты",
                      "Акции и накопительные счета",
                      "Предупреждения об изменениях",
                    ].map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-widest text-background/70 border border-background/25 rounded-full px-3 py-1.5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <GoldBtn href="#pricing">Оформить доступ →</GoldBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ AUDIENCE ============ */}
        <section className="container-px max-w-7xl mx-auto py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Кому подойдёт
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Тем, кто хочет вернуть деньги с расходов, которые уже есть, но не хочет каждый месяц самостоятельно разбирать правила банков.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "💳", title: "Платите одной картой", body: "И не уверены, что она действительно выгодна для продуктов, ЖКХ, маркетплейсов и такси." },
              { icon: "🏠", title: "Есть регулярные расходы", body: "Продукты, ЖКХ, аптеки, одежда, доставка и крупные покупки дают заметный потенциал возврата." },
              { icon: "⏱", title: "Нет времени следить за банками", body: "Нужна не энциклопедия условий, а понятная выжимка: что изменилось и на что обратить внимание." },
              { icon: "📈", title: "Хотите больше выгоды", body: "Подходит тем, кто уже пользуется кэшбэком, но хочет видеть свежие акции, категории и ограничения." },
            ].map((a) => (
              <article key={a.title} className="bg-card border border-foreground/10 rounded-lg p-6 hover:border-accent/60 hover:-translate-y-0.5 transition-all">
                <div className="text-2xl">{a.icon}</div>
                <h3 className="font-display font-bold text-lg mt-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <CashbackReviewGrid items={reviewsBottom} columns={2} />
          </div>

        </section>

        {/* ============ PRICING ============ */}
        <section id="pricing" className="container-px max-w-7xl mx-auto py-16 md:py-24 scroll-mt-24">
          <div className="max-w-3xl">
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Оформите доступ
            </h2>
          </div>

          {/* Promo info block */}
          <div className="mt-8 max-w-3xl border border-foreground/15 bg-card p-6 md:p-7 rounded-md">
            <p className="font-display text-lg md:text-xl leading-snug">
              Первый месяц доступа&nbsp;— <span className="text-accent font-semibold">490&nbsp;₽</span> вместо <span className="line-through text-muted-foreground">1000&nbsp;₽</span>
            </p>
            <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              Если оформляете подписку сразу на&nbsp;квартал или год, получаете дополнительную скидку:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm md:text-[15px] text-foreground/85">
              <li className="flex gap-2"><span className="text-accent">•</span><span>Квартал&nbsp;— экономия <span className="font-semibold">20%</span></span></li>
              <li className="flex gap-2"><span className="text-accent">•</span><span>Год&nbsp;— экономия <span className="font-semibold">48%</span></span></li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Подписка продлевается вручную, никаких автосписаний.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Месяц",
                old: "1 000 ₽",
                price: "490 ₽",
                per: null as string | null,
                note: "Чтобы проверить гайд на своих расходах и понять, насколько вам подходит формат.",
                bullets: ["Доступ на 30 дней", "Основной выпуск месяца", "Спецвыпуски и архив на период доступа."],
                renewNote: "После окончания акции стоимость продления — 1000 ₽/мес.",
                cta: "Оформить доступ",
                featured: false,
                widgetId: 1621375,
                scriptHash: "2f41da3e5af8ff88280570e177ab427e35ce06a6",
              },
              {
                title: "Квартал",
                old: "2 490 ₽",
                price: "1 990 ₽",
                per: "Экономия 500 ₽ (20%)",
                note: "Три обновления подряд: удобно спокойно внедрить подход и не принимать решение каждый месяц.",
                bullets: ["Доступ на 3 месяца", "3 ежемесячных выпуска", "Спецвыпуски и архив на период доступа."],
                renewNote: "",

                cta: "Оформить доступ",
                featured: false,
                widgetId: 1621378,
                scriptHash: "cf181ba313b7d0d0d9bd33a3bb9846f932e37d24",
              },
              {
                title: "Год",
                old: "11 490 ₽",
                price: "5 990 ₽",
                per: "Экономия 5500 ₽ (48%)",
                note: "Для тех, кто хочет весь год получать обновления без ежемесячного продления.",
                bullets: ["Доступ на 12 месяцев", "12 ежемесячных выпусков", "Все спецвыпуски и архив на период доступа."],
                renewNote: "",

                cta: "Оформить доступ",
                featured: true,
                badge: "Двойная выгода",
                widgetId: 1621380,
                scriptHash: "26ca5b0f38d10d912ac517ee8471423fbaf59584",
              },
            ].map((p) => (
              <article
                key={p.title}
                className={`relative bg-card rounded-lg p-7 flex flex-col ${
                  p.featured
                    ? "border-2 border-accent shadow-hard-amber md:-translate-y-2"
                    : "border border-foreground/10"
                }`}
              >
                {p.featured && p.badge && (
                  <div className="absolute -top-3 left-7 px-3 py-1 bg-accent text-accent-foreground font-mono text-[10px] uppercase tracking-widest rounded">
                    {p.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl">{p.title}</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <div className="font-display font-bold text-4xl">{p.price}</div>
                  <div className="font-mono text-sm text-muted-foreground line-through">{p.old}</div>
                </div>
                {p.per && <div className="mt-1 text-xs font-mono text-accent">{p.per}</div>}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-foreground/85">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {p.renewNote && (
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    {p.renewNote}
                  </p>
                )}

                <div className="mt-6">
                  <CalculatorRegisterDialog
                    widgetId={p.widgetId}
                    scriptHash={p.scriptHash}
                    title={`Тариф «${p.title}»`}
                    subtitle="Оформление доступа"
                    trigger={
                      p.featured ? (
                        <GoldBtn block>{p.cta}</GoldBtn>
                      ) : (
                        <DarkBtn block>{p.cta}</DarkBtn>
                      )
                    }
                  />
                </div>
              </article>
            ))}
          </div>


          <div className="mt-12">
            <CashbackReviewGrid items={reviewsPricing} columns={2} />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="container-px max-w-3xl mx-auto py-16 md:py-24 scroll-mt-24">
          <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Вопросы перед покупкой
          </h2>
          <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            {[
              { q: "Это точно окупится?", a: "Зависит от ваших расходов, банков, региона, доступных карт и готовности внедрять рекомендации. Калькулятор показывает ориентир, а не гарантию.", open: true },
              { q: "Мне нужно открывать много карт?", a: "Нет. Для старта есть ленивая стратегия на 1–3 карты. Продвинутые схемы нужны только тем, кто хочет забирать максимум." },
              { q: "Почему это подписка, а не разовый файл?", a: "Потому что банки каждый месяц меняют категории, лимиты, акции и условия. Разовый гайд быстро устаревает." },
              { q: "Это финансовая консультация?", a: "Нет. Материалы носят информационный характер. Решение об оформлении банковских продуктов и карт пользователь принимает самостоятельно после проверки актуальных условий банка." },
              { q: "Подойдёт новичку?", a: "Да. Внутри есть путеводитель для начинающих и стартовый маршрут: с чего начать, если не хочется разбираться во всех деталях." },
            ].map((f, i) => (
              <details key={i} open={f.open} className="group py-5">
                <summary className="flex justify-between items-start gap-4 cursor-pointer list-none">
                  <span className="font-display font-semibold text-lg">{f.q}</span>
                  <span className="text-accent text-2xl leading-none mt-0.5 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="container-px max-w-7xl mx-auto pb-24">
          <div className="bg-foreground text-background rounded-lg p-10 md:p-16 text-center border border-foreground/30 shadow-paper">
            <h2 className="font-serif-display text-3xl md:text-5xl leading-[1.1] max-w-3xl mx-auto">
              Начните с расчёта — и заберите первую выгоду уже в этом месяце
            </h2>
            <p className="mt-5 text-background/75 max-w-xl mx-auto leading-relaxed">
              Проверьте, где в ваших расходах лежит недополученный кэшбэк, и получите актуальный выпуск.
            </p>
            <div className="mt-8">
              <GoldBtn href="#calc">Рассчитать мою выгоду →</GoldBtn>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-3 bg-foreground text-background text-sm font-mono rounded-md shadow-paper transition-all z-50 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {toast}
      </div>
    </div>
  );
};

// ====== Segmented control ======
const Segmented = ({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="grid sm:grid-cols-2 gap-2">
    {options.map((o) => {
      const active = value === o.value;
      return (
        <label
          key={o.value}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-all text-sm ${
            active
              ? "border-accent bg-accent/10 text-foreground"
              : "border-foreground/15 hover:border-foreground/30 text-foreground/80"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={active}
            onChange={() => onChange(o.value)}
            className="sr-only"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
              active ? "border-accent" : "border-foreground/30"
            }`}
          >
            {active && <span className="w-2 h-2 bg-accent rounded-full" />}
          </span>
          <span>{o.label}</span>
        </label>
      );
    })}
  </div>
);

export default Calculator;
