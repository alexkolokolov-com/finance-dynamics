import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appendStoredParams } from "@/lib/ymGoals";
import { nbsp } from "@/lib/nbsp";

type ProfitLevel = {
  number: string;
  title: string;
  duration: string;
  description: string;
  fits: string[];
  href: string;
  featured?: boolean;
};

export const levels: ProfitLevel[] = [
  {
    number: "1",
    title: "Ленивый бюджет",
    duration: "3 недели",
    description: "Шаблоны, механики и способы вести бюджет легко и эффективно.",
    fits: [
      "Начинаете вести бюджет и бросаете",
      "Не понимаете, какое приложение, таблицу или способ учёта выбрать",
      "Записываете расходы, но это не помогает",
      "Ненавидите вести финансы и хотите простое решение",
    ],
    href: "https://nivz.getcourse.ru/profit_level1",
  },
  {
    number: "2",
    title: "Управление деньгами",
    duration: "4 недели",
    description: "Инструменты, которые помогают растить доход, тратить без чувства вины и лучше жить за свои деньги.",
    fits: [
      "Доход нормальный, но хочется большего",
      "Непонятно, куда направлять свободные деньги",
      "Хочется копить, но не отказывать себе в жизни сейчас",
      "Хочется увеличивать доход, а не бесконечно оптимизировать кофе",
      "Доход растёт, а качество жизни — нет",
    ],
    href: "https://nivz.getcourse.ru/profit_level2",
  },
  {
    number: "3",
    title: "Инвестиции",
    duration: "4 недели + личная консультация",
    description: "Шаблон и механика долгосрочного планирования вместе с инструментами инвестирования.",
    fits: [
      "Накопить на пенсию",
      "Купить квартиру, машину, яхту или пароход",
      "Обеспечить детей",
      "Инвестировать, не ошибаясь",
    ],
    href: "https://nivz.getcourse.ru/profit_level3",
  },
];

const trackedHref = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.currentTarget.href = appendStoredParams(event.currentTarget.href);
};

const LevelCard = ({ level }: { level: ProfitLevel }) => (
  <article className="grid border-t border-foreground/20 py-10 md:grid-cols-[12rem_minmax(0,1fr)_minmax(18rem,0.8fr)] md:gap-10 md:py-14">
    <div className="mb-6 md:mb-0">
      <p className="flex items-baseline gap-3">
        <span className="number-display text-7xl text-accent md:text-8xl">{level.number}</span>
        <span className="font-display text-2xl font-semibold leading-none md:text-3xl">{nbsp("ступень")}</span>
      </p>
    </div>
    <div>
      <p className="font-body text-sm font-semibold text-accent">{nbsp(level.duration)}</p>
      <h3 className="mt-2 font-display text-4xl font-semibold leading-none md:text-5xl">{nbsp(level.title)}</h3>
      <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-foreground/75">{nbsp(level.description)}</p>
      <Button asChild size="lg" className="mt-7 rounded-none px-6">
        <a href={level.href} target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
          {nbsp("Выбрать тариф")} <ArrowUpRight aria-hidden="true" />
        </a>
      </Button>
    </div>
    <div className="mt-8 border-l-2 border-accent pl-5 md:mt-0">
      <p className="font-display text-lg font-semibold">{nbsp("Подходит вам, если:")}</p>
      <ul className="mt-5 space-y-4">
        {level.fits.map((item) => (
          <li key={item} className="flex gap-3 font-body leading-snug text-foreground/80">
            <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span>{nbsp(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

export const ProfitLevels = () => (
  <section id="levels" className="scroll-mt-24 border-t border-foreground/10 py-20 md:py-28">
    <div className="container-px mx-auto max-w-7xl">
      <div className="max-w-4xl">
        <h2 className="font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{nbsp("Три ступени курса")}</h2>
        <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-foreground/75">{nbsp("Начните со своей задачи или пройдите весь путь от ведения бюджета до инвестиций.")}</p>
      </div>

      <div className="mt-14">
        {levels.map((level) => <LevelCard key={level.number} level={level} />)}
      </div>

      <article className="mt-4 grid gap-8 bg-board p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-12">
        <div>
          <p className="font-display text-3xl font-semibold leading-none text-accent md:text-5xl">{nbsp("Все 3 ступени")}</p>
          <h3 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-none text-background md:text-6xl">{nbsp("От шаблона бюджета до инвестиций и долгосрочного плана")}</h3>
          <p className="mt-6 font-body text-xl text-background/75">{nbsp("11 недель + личная консультация Василия")}</p>
        </div>
        <Button asChild size="lg" className="rounded-none bg-accent px-6 text-accent-foreground hover:bg-background hover:text-foreground">
          <a href="https://nivz.getcourse.ru/profit_level3" target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
            {nbsp("Выбрать тариф")} <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </article>
    </div>
  </section>
);