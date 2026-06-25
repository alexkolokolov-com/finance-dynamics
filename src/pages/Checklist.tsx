import { useCallback, useEffect, useMemo, type MouseEvent } from "react";
import {
  Download,
  History,
  Compass,
  Telescope,
  ShieldAlert,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

type Block = {
  num: string;
  title: string;
  Icon: LucideIcon;
  items: string[];
};

const blocks: Block[] = [
  {
    num: "01",
    title: "История",
    Icon: History,
    items: [
      "Как выглядела финансовая модель в семье родителей? Что из этого вам нравится, а что хочется поменять? Поделитесь друг с другом открыто.",
      "Как вы относитесь к помощи родителям, друзьям, родственникам деньгами?",
      "Что каждый из вас изучал про финансы и как планируете обучаться в этой теме?",
      "Какими финансовыми успехами каждый из вас гордится?",
      "Какие финансовые ошибки каждый из вас совершал раньше?",
    ],
  },
  {
    num: "02",
    title: "Сейчас",
    Icon: Compass,
    items: [
      "Сколько денег вам нужно в месяц, в год, на ближайшие 10 лет?",
      "Хотите ли вы вести семейный бюджет?",
      "Хотите ли вы составить долгосрочный финансовый план для семьи?",
      "Насколько комфортно вам говорить о деньгах и обсуждать финансы? Есть ли темы, которые вызывают стыд, тревогу или чувство вины?",
      "Планируете ли вы инвестировать и как?",
    ],
  },
  {
    num: "03",
    title: "Будущее",
    Icon: Telescope,
    items: [
      "Как вы будете принимать крупные финансовые решения?",
      "Что для вас финансовый риск? Какой риск для вас неприемлем?",
      "Планируете ли вы финансово помогать выросшим детям?",
      "Как вы хотите жить через 10–20 лет? И совпадают ли ваши картинки будущего?",
      "Какой уровень личной финансовой свободы нужен каждому из вас?",
    ],
  },
  {
    num: "04",
    title: "Риски",
    Icon: ShieldAlert,
    items: [
      "Как вы будете решать конфликты из-за денег, если взгляды не совпадают?",
      "Как вы будете действовать, если один временно потеряет доход?",
      "Есть ли план на случай внезапной гибели одного из членов семьи — логины, пароли, знания о накоплениях? Планируете ли составлять завещания?",
      "Как вы будете распределять обязанности по управлению деньгами в семье?",
      "Как вы будете делить деньги в случае развода?",
    ],
  },
];

const Checklist = () => {
  const pdfHref = useMemo(() => {
    if (typeof window === "undefined") return "/checklist-finance-family.pdf";

    const url = new URL("/checklist-finance-family.pdf", window.location.origin);
    const previewToken = new URLSearchParams(window.location.search).get("__lovable_token");

    if (previewToken) url.searchParams.set("__lovable_token", previewToken);

    return url.toString();
  }, []);

  const handlePdfDownload = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(pdfHref, { credentials: "include" });
        if (!response.ok) throw new Error("PDF download failed");

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "checklist-finance-family.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(objectUrl);
      } catch {
        window.open(pdfHref, "_blank", "noopener,noreferrer");
      }
    },
    [pdfHref]
  );

  useEffect(() => {
    document.title = "Чек-лист · финансы в семье";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Чек-лист для разговора с партнёром о финансах в семье: история, настоящее, будущее и риски. 20 вопросов для гармонии и роста семейного капитала.";
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
      <SiteHeader />
      {/* Hero */}
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-grid">
        {/* decorative hero icon */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-10 -right-16 md:-top-16 md:-right-20 text-accent/15"
        >
          <HeartHandshake
            strokeWidth={1}
            className="w-[260px] h-[260px] md:w-[440px] md:h-[440px]"
          />
        </div>
        {/* dotted corner mark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-6 md:top-32 md:right-16 hidden sm:block"
        >
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
            ))}
          </div>
        </div>

        <div className="container-px max-w-5xl mx-auto relative">
          <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)] animate-fade-up">
            Финансы
            <br />
            <span className="italic font-normal">в&nbsp;семье</span>.
          </h1>

          <p
            className="mt-8 font-serif-display italic font-normal leading-[1.25] tracking-tight text-[clamp(1.25rem,3.5vw,2rem)] max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Пункты, которые стоит обсудить с&nbsp;партнёром, чтобы деньги{" "}
            <span className="underline-accent">приносили счастье и&nbsp;гармонию</span>.
          </p>

          <p
            className="mt-6 font-body text-base md:text-lg text-foreground/70 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Возвращайтесь к&nbsp;этому разговору каждые 1–2 года: жизнь меняется, и&nbsp;ответы меняются вместе с&nbsp;ней.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={pdfHref}
              download="checklist-finance-family.pdf"
              onClick={handlePdfDownload}
              className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Download size={14} />
              скачать pdf
            </a>
            <a
              href="#blocks"
              className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/30 font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              читать онлайн →
            </a>
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section id="blocks" className="relative pb-24 md:pb-32 scroll-mt-20">
        <div className="container-px max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-px bg-foreground/15 border border-foreground/15">
            {blocks.map((block, bi) => (
              <article
                key={block.num}
                className="relative overflow-hidden bg-card p-8 md:p-12 animate-fade-up"
                style={{ animationDelay: `${0.05 * bi}s` }}
              >
                {/* big decorative icon: bottom-left on md+, top-right on mobile */}
                <block.Icon
                  aria-hidden="true"
                  strokeWidth={0.9}
                  className="
                    pointer-events-none select-none absolute text-accent/15
                    -top-6 -right-6 w-32 h-32
                    md:top-auto md:right-auto md:-bottom-10 md:-left-10
                    md:w-[280px] md:h-[280px]
                    lg:-bottom-14 lg:-left-14 lg:w-[340px] lg:h-[340px]
                  "
                />

                <div className="relative grid grid-cols-12 gap-6 md:gap-10">
                  <div className="col-span-12 md:col-span-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      § {block.num}
                    </div>
                    <h2 className="mt-3 font-serif-display font-semibold leading-none text-5xl md:text-6xl">
                      {block.title}
                    </h2>
                  </div>

                  <ul className="col-span-12 md:col-span-8 space-y-5">
                    {block.items.map((item, i) => {
                      const id = `chk-${block.num}-${i}`;
                      return (
                        <li key={i} className="group">
                          <label
                            htmlFor={id}
                            className="flex gap-4 cursor-pointer select-none"
                          >
                            <input
                              id={id}
                              type="checkbox"
                              className="peer sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className="mt-1 shrink-0 w-5 h-5 border-2 border-foreground/40 group-hover:border-accent transition-colors flex items-center justify-center peer-checked:bg-accent peer-checked:border-accent [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
                            >
                              <svg
                                className="w-3 h-3 text-accent-foreground transition-opacity"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <p className="font-body text-base md:text-lg leading-relaxed text-foreground/85 peer-checked:line-through peer-checked:text-foreground/50 transition-colors">
                              {item}
                            </p>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* footer note */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-foreground/15 pt-8">
            <p className="font-body text-sm text-foreground/65 max-w-xl">
              Автор: Василий Мещеряков. Телеграм-канал{" "}
              <a
                href="https://t.me/vasya_lfp"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-accent hover:text-accent transition-colors"
              >
                «Вася и&nbsp;финансы»
              </a>
              .
            </p>
            <a
              href={pdfHref}
              download="checklist-finance-family.pdf"
              onClick={handlePdfDownload}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest hover:text-accent transition-colors"
            >
              <Download size={14} />
              версия для печати
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checklist;
