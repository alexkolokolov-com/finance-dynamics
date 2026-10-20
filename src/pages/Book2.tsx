import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, ChevronDown, Plus } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { nbsp } from "@/lib/nbsp";
import cover from "@/assets/book2-cover.png.asset.json";
import pgLogo from "@/assets/pg-logo.webp.asset.json";
import authorPhoto from "@/assets/author.jpg.asset.json";
import {
  CHANNEL_URL,
  PDP_URL,
  PREORDER_URL,
  book2Author,
  book2Change,
  book2Chapter,
  book2Contents,
  book2Hook,
  book2Hero,
  book2NotFor,
  book2Preorder,
  book2Problem,
  book2StickyNav,
  book2Trust,
  book2Why,
} from "@/data/book2";

const inner = "container-px mx-auto max-w-7xl";
const h2 = "font-display font-semibold tracking-normal leading-[1.08] text-[clamp(30px,4vw,48px)]";
const sectionPad = "py-[72px] lg:py-[120px]";
const scrollMt = "scroll-mt-[112px] lg:scroll-mt-[124px]";
const bodyText = "text-lg leading-relaxed";

/* Появление секции снизу вверх, один раз; без анимаций при reduced-motion */
const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
};

/* Липкая полоса книги: появляется, когда первый экран ушёл вверх */
const StickyBar = () => {
  const [hidden, setHidden] = useState(true);
  const [top, setTop] = useState(64);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const preorder = document.getElementById("preorder");
    if (!hero || !preorder) return;
    const heroObs = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0 });
    heroObs.observe(hero);

    const sections = book2StickyNav
      .flatMap((item) => item.ids as readonly string[])
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const secObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const item = book2StickyNav.find((nav) => (nav.ids as readonly string[]).includes(visible[0].target.id));
          if (item) setActive(item.href);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => secObs.observe(s));

    const onScroll = () => {
      const header = document.querySelector("header");
      if (header) setTop(header.offsetHeight);
      const heroTop = hero.offsetTop;
      const end = preorder.offsetTop + preorder.offsetHeight;
      const value = end > heroTop ? (window.scrollY - heroTop) / (end - heroTop) : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      heroObs.disconnect();
      secObs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-sticky-dropdown]")) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const activeLabel = book2StickyNav.find((item) => item.href === active)?.label ?? book2Hero.titleLead;

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-200 ${
        hidden ? "-translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{ top }}
      aria-hidden={hidden}
    >
      <div className="relative border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className={`${inner} flex h-12 items-center justify-between gap-4 lg:h-14`}>
          <div className="flex min-w-0 items-center gap-3">
            <a href="/book2" className="hidden shrink-0 items-center md:flex" aria-label="К началу страницы">
              <img src={cover.url} alt="" className="h-8 w-auto" loading="lazy" />
            </a>
            <a href="/book2" className="hidden text-[15px] font-semibold whitespace-nowrap lg:block">
              {nbsp("Ленивый бюджет")}
            </a>
            <div className="relative md:hidden" data-sticky-dropdown>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 text-[15px] font-semibold"
              >
                <span className="truncate">{activeLabel}</span>
                <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <ul className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-background py-2 shadow-lg">
                  {book2StickyNav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-2.5 text-[15px] hover:bg-foreground/5 ${
                          active === item.href ? "font-semibold text-accent" : ""
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <nav aria-label="Разделы страницы" className="hidden min-w-0 items-center gap-5 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {book2StickyNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-sm whitespace-nowrap transition-colors ${
                  active === item.href ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {active === item.href && (
                  <span aria-hidden="true" className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={PREORDER_URL}
            className="inline-flex shrink-0 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Предзаказ
          </a>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
};

/* Лестница «Бюджет → Активы для жизни → Инвестиции» в стиле сайта */
const Stairs = ({ steps }: { steps: readonly string[] }) => (
  <div className="mt-5 flex items-end gap-2" role="img" aria-label={steps.join(", ")}>
    {steps.map((label, index) => (
      <div
        key={label}
        className={`flex flex-1 items-start justify-center rounded-t-lg pt-2 text-center text-sm font-medium ${
          index === 0
            ? "h-16 bg-accent text-accent-foreground"
            : index === 1
              ? "h-24 bg-accent-soft/60"
              : "h-32 bg-accent-soft/35"
        }`}
      >
        {nbsp(label)}
      </div>
    ))}
  </div>
);

/* Раскрывающийся пункт: высота анимируется через grid-rows */
const Disclosure = ({ open, children }: { open: boolean; children: ReactNode }) => (
  <div
    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`}
  >
    <div className="overflow-hidden">{children}</div>
  </div>
);

const ChapterLeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = book2Chapter.errorEmpty;
    if (!email.trim()) next.email = book2Chapter.errorEmpty;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = book2Chapter.errorEmail;
    if (!consent) next.consent = book2Chapter.errorConsent;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // TODO: подключить отправку
    void (async () => {
      await Promise.resolve({ name, email });
      setSubmitted(true);
    })();
  };

  if (submitted) {
    return <p className="text-xl font-semibold">{nbsp(book2Chapter.success)}</p>;
  }

  const fieldCls =
    "w-full rounded-md border border-primary-foreground/25 bg-primary-foreground/5 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const errorCls = "mt-1.5 text-sm text-accent-soft";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={book2Chapter.namePlaceholder}
          aria-label={book2Chapter.namePlaceholder}
          className={fieldCls}
        />
        {errors.name && <p className={errorCls}>{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={book2Chapter.emailPlaceholder}
          aria-label={book2Chapter.emailPlaceholder}
          className={fieldCls}
        />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm leading-snug">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[hsl(var(--accent))]"
          />
          <span>
            {nbsp(book2Chapter.consent)}{" "}
            <a href={PDP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent-soft">
              {nbsp(book2Chapter.consentLink)}
            </a>
          </span>
        </label>
        {errors.consent && <p className={errorCls}>{errors.consent}</p>}
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-md bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-background/90"
      >
        {nbsp(book2Chapter.submit)}
      </button>
      <p className="text-sm text-primary-foreground/70">{nbsp(book2Chapter.note)}</p>
    </form>
  );
};

const Book2 = () => {
  usePageMeta({
    title: "Ленивый бюджет — книга Василия Мещерякова",
    description: nbsp(book2Hero.subtitle),
    path: "/book2",
  });
  const [openWhy, setOpenWhy] = useState<number[]>([]);
  const [openPart, setOpenPart] = useState<number[]>([0]);
  const [hookVisible, setHookVisible] = useState(false);
  const hookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hookRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHookVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHookVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = (list: number[], index: number) =>
    list.includes(index) ? list.filter((i) => i !== index) : [...list, index];

  const hookWords = nbsp(book2Hook.question).split(/\s+/);

  return (
    <>
      <SiteHeader />
      <StickyBar />
      <main className="bg-background text-foreground">
        {/* 1. Первый экран */}
        <section id="hero" className="bg-grid pb-10 pt-36 md:pb-16 md:pt-40">
          <div className={`${inner} grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16`}>
            <div className="min-w-0">
              <span className="badge-tag mb-6 hidden md:inline-flex">
                <BookOpen size={16} className="text-accent" />
                {nbsp(book2Hero.pill)}
              </span>
              <h1 className="font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-normal">
                {nbsp(book2Hero.titleLead)} {nbsp(book2Hero.titlePlain)}
                <span className="text-accent">{nbsp(book2Hero.titleAccent)}</span>
                {book2Hero.titleDot}
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-snug md:text-[22px]">{nbsp(book2Hero.subtitle)}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-auto min-h-14 px-7 py-4 text-base">
                  <a href={PREORDER_URL}>{nbsp(book2Hero.ctaPreorder)}</a>
                </Button>
                <a
                  href="#chapter"
                  className="badge-tag h-auto min-h-14 justify-center whitespace-normal px-7 py-4 text-base transition-colors hover:border-accent"
                >
                  {nbsp(book2Hero.ctaChapter)}
                </a>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{nbsp(book2Hero.note)}</p>
            </div>
            <figure className="order-first mx-auto w-[70%] md:order-last md:w-full">
              <img
                src={cover.url}
                alt={book2Hero.coverAlt}
                width={1456}
                height={1088}
                loading="eager"
                fetchPriority="high"
                className="mx-auto w-full object-contain shadow-[0_40px_80px_-40px_hsl(28_16%_11%/0.4)]"
              />
            </figure>
          </div>
        </section>

        {/* 2. Полоса доверия */}
        <section id="trust" className="border-y border-foreground/15 py-8 lg:py-12">
          <div className={`${inner} grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4`}>
            {book2Trust.map((stat) => (
              <div key={stat.label}>
                {stat.topLogo ? (
                  <img src={pgLogo.url} alt="P&G" className="h-8 w-auto grayscale opacity-60" loading="lazy" />
                ) : (
                  <div className="number-display text-[28px] md:text-[32px]">{stat.top}</div>
                )}
                <div className="mt-1.5 text-sm text-muted-foreground">{nbsp(stat.label)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Хук-вопрос */}
        <section id={`hook`} className={`bg-accent py-[72px] text-accent-foreground lg:py-[120px] ${hookVisible ? "hook-in" : ""}`}>
          <div ref={hookRef} className={`${inner} text-center`}>
            <h2
              className="mx-auto max-w-6xl font-display font-semibold leading-[1.0] tracking-normal text-[clamp(44px,8vw,128px)]"
              aria-label={nbsp(book2Hook.question)}
            >
              {hookWords.map((word, i) => (
                <span key={i} aria-hidden="true" className="hook-word inline-block" style={{ animationDelay: `${i * 60}ms` }}>
                  {word}
                  {i < hookWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-8 max-w-[640px] text-lg leading-relaxed text-accent-foreground/85">{nbsp(book2Hook.sub)}</p>
          </div>
        </section>

        {/* 4. Проблема */}
        <section id="problem" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <h2 className={h2}>{nbsp(book2Problem.title)}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {book2Problem.items.map((text, index) => (
                <div key={index} className="relative flex flex-col rounded-xl border border-border bg-card p-6">
                  <span aria-hidden="true" className="absolute right-5 top-5 text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={`${bodyText} pt-6`}>{nbsp(text)}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xl font-semibold">{nbsp(book2Problem.outro)}</p>
          </Reveal>
        </section>

        {/* 5. Что изменится */}
        <section id="change" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <h2 className={h2}>{nbsp(book2Change.title)}</h2>
            <div className="mt-10">
              <div className="hidden grid-cols-[1fr_auto_1fr] gap-6 pb-3 text-xs uppercase tracking-wider text-muted-foreground md:grid">
                <div>{book2Change.wasLabel}</div>
                <div />
                <div>{book2Change.willLabel}</div>
              </div>
              <div className="border-t border-foreground/10">
                {book2Change.rows.map((row, index) => (
                  <div key={index} className="border-b border-foreground/10 py-5">
                    <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
                      <div className="text-[17px] text-muted-foreground">{nbsp(row.was)}</div>
                      <span aria-hidden="true" className="hidden text-accent md:block">→</span>
                      <span aria-hidden="true" className="text-accent md:hidden">↓</span>
                      <div className="text-[17px] font-semibold">{nbsp(row.will)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-xl border border-accent bg-transparent p-6 text-xl leading-relaxed md:p-8">
              {nbsp(book2Change.highlight)}
            </div>
          </Reveal>
        </section>

        {/* 6. Почему эта книга */}
        <section id="why" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <h2 className={h2}>{nbsp(book2Why.title)}</h2>
            <div className="mt-10 border-t border-foreground/10">
              {book2Why.items.map((item, index) => {
                const open = openWhy.includes(index);
                return (
                  <div key={index} className="border-b border-foreground/10">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenWhy((list) => toggle(list, index))}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-baseline gap-5">
                        <span aria-hidden="true" className="shrink-0 font-display text-lg text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[22px] font-semibold leading-snug tracking-normal md:text-2xl">
                          {nbsp(item.title)}
                        </span>
                      </span>
                      <Plus
                        size={22}
                        aria-hidden="true"
                        className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      />
                    </button>
                    <Disclosure open={open}>
                      <div className="pb-7 pl-0 md:pl-12">
                        <p className={`${bodyText} max-w-3xl`}>{nbsp(item.text)}</p>
                        {item.stairs && <Stairs steps={item.stairs} />}
                      </div>
                    </Disclosure>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* 7. Содержание */}
        <section id="contents" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <h2 className={h2}>{nbsp(book2Contents.title)}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{nbsp(book2Contents.subtitle)}</p>
            <div className="mt-10 border-t border-foreground/10">
              {book2Contents.parts.map((part, index) => {
                const open = openPart.includes(index);
                return (
                  <div key={part.title} className="border-b border-foreground/10">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenPart((list) => toggle(list, index))}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-xl font-semibold tracking-normal md:text-2xl">{nbsp(part.title)}</span>
                      <ChevronDown
                        size={22}
                        aria-hidden="true"
                        className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    <Disclosure open={open}>
                      <ul className="pb-7">
                        {part.chapters.map((chapter) => (
                          <li key={chapter.n} className="flex items-baseline gap-6 border-t border-foreground/5 py-3.5 first:border-t-0">
                            <span className="w-24 shrink-0 text-sm text-muted-foreground">{chapter.n}</span>
                            <span className="flex flex-wrap items-baseline gap-3 text-lg leading-snug">
                              {nbsp(chapter.title)}
                              {chapter.key && (
                                <span className="badge-tag !rounded-full !px-2.5 !py-0.5 !text-xs border-accent text-accent">
                                  {nbsp(book2Contents.keyPill)}
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* 8. Первая глава бесплатно */}
        <section id="chapter" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2 className={h2}>{nbsp(book2Chapter.title)}</h2>
                  <p className={`mt-5 text-primary-foreground/90 ${bodyText}`}>{nbsp(book2Chapter.text)}</p>
                </div>
                <div className="min-w-0">
                  <ChapterLeadForm />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 9. Об авторе */}
        <section id="author" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <figure className="order-first md:order-none">
                <img
                  src={authorPhoto.url}
                  alt={book2Author.photoAlt}
                  width={836}
                  height={1045}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
              </figure>
              <div className="min-w-0">
                <span className="badge-tag">{nbsp(book2Author.pill)}</span>
                <h2 className={`${h2} mt-6`}>{nbsp(book2Author.title)}</h2>
                <p className="mt-6 text-xl font-semibold">{nbsp(book2Author.name)}</p>
                <div className={`mt-4 space-y-4 ${bodyText}`}>
                  {book2Author.paragraphs.map((text) => (
                    <p key={text}>{nbsp(text)}</p>
                  ))}
                </div>
                <p className={`mt-4 text-muted-foreground ${bodyText}`}>{nbsp(book2Author.muted)}</p>
                <blockquote className="mt-8 border-l-[3px] border-accent pl-5 text-[22px] font-medium leading-snug md:text-2xl">
                  {nbsp(book2Author.quote)}
                </blockquote>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-accent"
                >
                  {nbsp(book2Author.channelLink)}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 10. Кому книга не подойдёт */}
        <section id="not-for" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <h2 className={h2}>{nbsp(book2NotFor.title)}</h2>
            <ul className={`mt-10 max-w-3xl space-y-5 ${bodyText}`}>
              {book2NotFor.items.map((text) => (
                <li key={text} className="flex gap-4">
                  <span aria-hidden="true" className="shrink-0 text-muted-foreground">×</span>
                  <span>{nbsp(text)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-display text-[clamp(28px,4vw,36px)] font-semibold leading-tight tracking-normal">
              {nbsp(book2NotFor.finalLead)}{" "}
              <span className="text-accent">{nbsp(book2NotFor.finalAccent)}</span>.
            </p>
          </Reveal>
        </section>

        {/* 11. Предзаказ */}
        <section id="preorder" className={`${sectionPad} ${scrollMt}`}>
          <Reveal className={inner}>
            <div className="grid items-center gap-10 rounded-3xl bg-card p-8 md:grid-cols-[1fr_1.2fr] md:p-12 lg:p-16">
              <div className="mx-auto w-[60%] md:w-full">
                <img
                  src={cover.url}
                  alt={book2Hero.coverAlt}
                  width={1456}
                  height={1088}
                  loading="lazy"
                  className="w-full -rotate-3 object-contain shadow-[0_40px_80px_-40px_hsl(28_16%_11%/0.4)]"
                />
              </div>
              <div>
                <h2 className={h2}>{nbsp(book2Preorder.title)}</h2>
                <p className={`mt-5 ${bodyText}`}>{nbsp(book2Preorder.text)}</p>
                <Button asChild size="lg" className="mt-8 h-auto min-h-14 px-8 py-4 text-lg">
                  <a href={PREORDER_URL}>{nbsp(book2Preorder.cta)}</a>
                </Button>
                <a href="#chapter" className="mt-5 block text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline">
                  {nbsp(book2Preorder.chapterLink)}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Book2;
