import { useEffect } from "react";
import { ArrowDown, Check, CircleDollarSign, HandCoins, Landmark, LineChart, NotebookTabs, ShieldCheck, TrendingUp, WalletCards } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfitLevels } from "@/components/landing/ProfitLevels";
import { InlineReviewGrid, InlineReviewPair } from "@/components/landing/InlineReviews";
import { CardAbout } from "@/components/sections/CardAbout";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { nbsp } from "@/lib/nbsp";

const profitNav = [
  { href: "#tasks", label: "Ваши задачи", id: "tasks" },
  { href: "#levels", label: "Ступени", id: "levels" },
  { href: "#about", label: "Василий", id: "about" },
  { href: "#reviews", label: "Отзывы", id: "reviews" },
  { href: "#levels", label: "Выбрать тариф", id: "levels", cta: true },
];

const tasks = [
  { Icon: NotebookTabs, text: "Собрать понятную финансовую систему" },
  { Icon: WalletCards, text: "Перестать жить в ноль" },
  { Icon: Landmark, text: "Разобраться, куда инвестировать" },
  { Icon: CircleDollarSign, text: "Начать вести бюджет без мучений" },
  { Icon: LineChart, text: "Увеличить доход" },
  { Icon: ShieldCheck, text: "Накопить на пенсию" },
  { Icon: HandCoins, text: "Избавиться от долгов" },
  { Icon: TrendingUp, text: "Перестать тревожиться из-за денег" },
  { Icon: CircleDollarSign, text: "Решить другую финансовую сложность" },
];

const Profit = () => {
  useEffect(() => {
    document.title = "ПРОФИТ — курс о личных финансах Василия Мещерякова";
    const description = "Три ступени курса ПРОФИТ: ленивый бюджет, управление деньгами и инвестиции. Можно выбрать одну задачу или пройти весь курс.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={profitNav} />

      <header className="relative overflow-hidden border-b border-foreground/10 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-px relative mx-auto max-w-7xl">
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            <div className="col-span-12 lg:col-span-9">
              <h1 className="font-display text-7xl font-semibold leading-[0.75] text-accent sm:text-9xl lg:text-[13rem]">ПРОФИТ</h1>
              <p className="mt-10 max-w-5xl font-display text-4xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
                {nbsp("Разные финансовые задачи требуют разных инструментов")}
              </p>
            </div>
            <div className="col-span-12 mt-6 flex items-end justify-between gap-8 lg:col-span-9 lg:col-start-4 lg:mt-12">
              <p className="max-w-2xl font-body text-lg leading-relaxed text-foreground/75 md:text-xl">
                {nbsp("Не один бюджет на все случаи жизни. Выберите ступень под то, что болит сейчас, или пройдите весь путь целиком.")}
              </p>
              <Button asChild variant="outline" size="icon" className="hidden h-14 w-14 shrink-0 rounded-full md:inline-flex">
                <a href="#tasks" aria-label={nbsp("Перейти к задачам")}><ArrowDown /></a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section id="tasks" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{nbsp("У каждого своё «болит»")}</h2>
              <p className="mt-7 max-w-xl font-body text-xl leading-relaxed text-foreground/75">{nbsp("Разная точка старта, разные цели и разный темп. Финансовых сложностей гораздо больше, чем один универсальный шаблон способен решить.")}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-foreground/15 bg-foreground/15 sm:grid-cols-2">
              {tasks.map(({ Icon, text }) => (
                <article key={text} className="min-h-40 bg-card p-6 md:p-8">
                  <Icon aria-hidden="true" className="h-7 w-7 text-accent" strokeWidth={1.6} />
                  <p className="mt-8 font-display text-2xl font-semibold leading-tight">{nbsp(text)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 border-l-4 border-accent py-2 pl-6 md:mt-24 md:pl-10">
            <p className="max-w-5xl font-display text-3xl font-semibold leading-tight md:text-5xl">{nbsp("Я не пытаюсь решить всё «бюджетом» или «долгосрочным планом». Каждую финансовую задачу разбираю отдельно и даю под неё свои инструменты.")}</p>
          </div>
        </div>
      </section>

      <ProfitLevels />

      <section className="border-y border-foreground/10 bg-grid py-16 md:py-20">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-semibold leading-none md:text-6xl">{nbsp("Во всех тарифах")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Прямые эфиры с Василием", "Ответы на вопросы", "Записи уроков навсегда", "Домашние задания самостоятельно"].map((item) => (
              <div key={item} className="flex min-h-32 items-start gap-4 border-t-2 border-foreground pt-5">
                <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                <p className="font-display text-xl font-semibold leading-tight">{nbsp(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CardAbout
        heading="Василий Мещеряков"
        hideEducation
        quote={(
          <>
            <p>{nbsp("Я не подгоняю людей под один правильный способ обращаться с деньгами.")}</p>
            <p>{nbsp("Мы выбираем инструменты под вашу задачу, доход, образ жизни и тот результат, который нужен именно сейчас.")}</p>
          </>
        )}
      />
      <InlineReviewPair indices={[0, 1]} bgClass="bg-grid" />

      <section id="reviews" className="scroll-mt-24 border-t border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">{nbsp("Отзывы участников")}</h2>
        </div>
        <InlineReviewGrid indices={[15, 14, 17, 16, 9, 8]} columns={3} className="pb-0 pt-12" />
      </section>

      <section className="border-t border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="bg-board p-8 text-center md:p-14">
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-none text-background md:text-6xl">{nbsp("Выберите задачу, с которой хотите начать")}</h2>
            <Button asChild size="lg" className="mt-9 rounded-none bg-accent px-7 text-accent-foreground hover:bg-background hover:text-foreground">
              <a href="#levels">{nbsp("Посмотреть ступени")}</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Profit;