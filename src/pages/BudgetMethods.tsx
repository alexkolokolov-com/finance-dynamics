import { useEffect } from "react";
import { Youtube } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const methods: string[] = [
  "Ежемесячный в Excel — доходы / расходы / сбережения",
  "Самый простой способ — «бюджет на аутсорсе»",
  "Финансовый чекап (он же Ленивый бюджет) — ведётся раз в квартал",
  "Записывать ручкой в блокноте",
  "Бюджет через кредитку (с контролем суммы по закрытию периода)",
  "«Бюджет в голове» — без таблиц и записей, на интуиции",
  "Метод 50/30/20 — нужды / желания / сбережения",
  "Zero-based budget — каждому рублю своя задача",
  "Бюджет через мобильные приложения (CoinKeeper, Дзен-мани и&nbsp;т.&nbsp;п.)",
  "Бюджет по&nbsp;категориям с лимитами",
  "Бюджет «pay yourself first» — сначала сбережения, потом всё остальное",
  "Семейный бюджет с раздельным учётом «моё / твоё / общее»",
  "Бюджет через денежный поток (чтобы избегать кассовых разрывов)",
  "Метод конвертов (с наличкой или отдельными счетами)",
  "Когда семейный бюджет — часть бизнесового бюджета",
  "FIRE-бюджет",
  "«Всего 2 цифры»",
  "Через специализированные сайты",
  "Продвинутый Excel с подтягиванием данных из банков через сводные таблицы или csv-файлы",
];

const YT_URL = "https://www.youtube.com/@Vasya_i_finance";

const BudgetMethods = () => {
  useEffect(() => {
    document.title = "19 способов ведения бюджета · Физика финансов";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "19 способов ведения семейного бюджета — от Excel и метода конвертов до FIRE и «бюджета на аутсорсе». С ссылками на YouTube-шортсы автора.";
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
      <section className="relative pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden bg-grid">
        <div className="container-px max-w-5xl mx-auto relative">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground animate-fade-up">
            § бюджет
          </div>
          <h1 className="mt-4 font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.25rem,7vw,5.5rem)] animate-fade-up">
            <span className="italic font-normal">19&nbsp;способов</span>
            <br />
            ведения бюджета.
          </h1>

          <p
            className="mt-8 font-serif-display italic font-normal leading-[1.25] tracking-tight text-[clamp(1.15rem,2.8vw,1.6rem)] max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            От ежемесячного Excel и&nbsp;метода конвертов до&nbsp;FIRE и&nbsp;«бюджета
            на&nbsp;аутсорсе» — <span className="underline-accent">девятнадцать рабочих систем</span>,
            из&nbsp;которых можно собрать свою.
          </p>

          <p
            className="mt-6 font-body text-base md:text-lg text-foreground/70 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Про каждый способ есть отдельный шортс с&nbsp;пояснениями
            на&nbsp;YouTube-канале «Вася и&nbsp;финансы».
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={YT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Youtube size={14} />
              смотреть на youtube
            </a>
            <a
              href="#list"
              className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/30 font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              читать список →
            </a>
          </div>
        </div>
      </section>

      {/* List */}
      <section id="list" className="relative pb-24 md:pb-32 scroll-mt-20">
        <div className="container-px max-w-5xl mx-auto">
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
            {methods.map((m, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={i}
                  className="group relative bg-card p-6 md:p-8 animate-fade-up hover:bg-accent/5 transition-colors"
                  style={{ animationDelay: `${0.03 * i}s` }}
                >
                  <div className="flex gap-5">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors shrink-0 pt-1">
                      § {num}
                    </div>
                    <p
                      className="font-body text-base md:text-lg leading-relaxed text-foreground/85"
                      dangerouslySetInnerHTML={{ __html: m }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

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
              href={YT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest hover:text-accent transition-colors"
            >
              <Youtube size={14} />
              шортсы на youtube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BudgetMethods;
