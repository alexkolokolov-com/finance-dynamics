import { ArrowUpRight, Check, GraduationCap, Heart, House, Info, Plane } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { PlanCalculator } from "@/components/plan2027/PlanCalculator";
import { PlanProgram } from "@/components/plan2027/PlanProgram";
import { usePageMeta } from "@/hooks/usePageMeta";
import { plan2027 } from "@/data/plan2027";
import { nbsp } from "@/lib/nbsp";
import planImage from "@/assets/plan2027-year.jpg";
import portrait from "@/assets/vasily-hero.png.asset.json";

const pageNav = [
  { href: "#about", id: "about", label: "Зачем участвовать" },
  { href: "#program", id: "program", label: "Программа" },
  { href: "#result", id: "result", label: "Результат" },
  { href: "#expert", id: "expert", label: "Ведущий" },
  { href: "#prices", id: "prices", label: "Тарифы" },
];
const inner = "container-px mx-auto max-w-7xl";
const section = "scroll-mt-40 py-12 md:py-16";
const heading = "text-3xl font-semibold leading-tight md:text-5xl";
const goalIcons = [Plane, House, GraduationCap, Heart];

const Plan2027 = () => {
  usePageMeta({ title: "Год в деньгах — 2027", description: "Пятидневная финансовая стратсессия с Василием Мещеряковым. 31 октября — 4 ноября: три эфира, два дня практики и ваш финансовый план на 12 месяцев.", path: "/plan2027" });
  return (
    <div className="bg-background font-body text-foreground [&_h1]:tracking-normal [&_h2]:tracking-normal [&_h3]:tracking-normal [&_h4]:tracking-normal">
      <SiteHeader pageNav={pageNav} />
      <main>
        <section className="border-b border-border pb-10 pt-40 md:pb-12 md:pt-40">
          <div className={`${inner} grid items-center gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-12`}>
            <div className="min-w-0">
              <h1 className="font-display text-5xl font-semibold leading-[1.05] lg:text-6xl xl:text-7xl">Год<br />{nbsp("в деньгах.")}<br /><span className="text-accent">2027</span></h1>
              <p className="mt-6 text-xl leading-relaxed lg:text-2xl">{nbsp("Вы знаете, чего хотите в следующем году. А знаете, сколько денег вам на это понадобится?")}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{nbsp("За пять дней составьте свой финансовый план на 2027 год: переведите цели в цифры, рассчитайте бюджет и определите, что нужно сделать, чтобы планы сбылись.")}</p>
              <Button size="lg" asChild className="mt-7"><a href="#prices">Регистрация <ArrowUpRight /></a></Button>
            </div>
            <img src={planImage} alt="Годовой финансовый план: календарь на двенадцать месяцев, накопления, жильё и отпуск" width={1024} height={1024} className="aspect-square w-full rounded-lg object-contain" />
          </div>
        </section>

        <div className="bg-primary text-primary-foreground">
          <div className={`${inner} grid grid-cols-5 py-5 md:py-6`}>{plan2027.days.map((day) => <div key={day.date} className="min-w-0 border-r border-primary-foreground/20 px-1 text-center last:border-0"><p className="text-xs text-primary-foreground/65">{day.month}</p><p className="my-1 font-display text-2xl font-semibold md:text-3xl">{day.date}.{day.date === "31" ? "10" : "11"}</p><p className="text-xs md:text-sm">{day.kind}</p></div>)}</div>
        </div>

        <section id="about" className={section}><div className={`${inner} grid items-center gap-8 lg:grid-cols-2 lg:gap-16`}>
          <div><p className="mb-3 text-sm text-accent">{nbsp("Вместо списка обещаний себе")}</p><h2 className={heading}>{nbsp("Планы на жизнь.")}<br /><span className="text-accent">{nbsp("В пересчёте на деньги.")}</span></h2><p className="mt-5 leading-relaxed text-muted-foreground">{nbsp("Отпуск, жильё, образование детей, подушка безопасности, новые привычки. Обычно эти планы существуют отдельно от семейного бюджета.")}</p><p className="mt-4 leading-relaxed text-muted-foreground">{nbsp("На стратсессии вы соберёте их в единую картину, поймёте реальную стоимость желаемого года и определите финансовые решения, которые нужны для его реализации.")}</p><blockquote className="mt-6 border-l-2 border-accent pl-5 text-lg">{nbsp("Хороший план отвечает не только на вопрос «чего я хочу?», но и на вопрос «за счёт чего?»")}</blockquote></div>
          <div className="border-y border-border py-6"><div className="mb-4 flex flex-wrap justify-between gap-2"><h3 className="text-lg font-semibold">{nbsp("Что я хочу в 2027 году")}</h3><span className="text-sm text-muted-foreground">Пример целей</span></div>{plan2027.goals.map((goal, i) => { const Icon = goalIcons[i] ?? Check; return <div key={goal.title} className="grid grid-cols-[24px_1fr_auto] items-center gap-3 border-t border-border py-4"><Icon className="size-5 text-accent" /><div><p className="font-medium">{nbsp(goal.title)}</p><p className="text-xs text-muted-foreground">{nbsp(goal.subtitle)}</p></div><span className="text-sm font-semibold">{nbsp(goal.price)}</span></div>; })}<div className="mt-2 flex flex-wrap items-center justify-between gap-3 bg-accent-soft/35 p-5"><div><p className="text-sm">{nbsp("Стоимость целей на год")}</p><p className="mt-1 text-xs text-muted-foreground">{nbsp("Пока без повседневных расходов")}</p></div><strong className="font-display text-2xl">1 200 000 ₽</strong></div></div>
        </div></section>

        <section className={`${section} bg-secondary/60`}><div className={inner}><p className="mb-3 text-sm text-accent">{nbsp("Как мы будем работать")}</p><h2 className={heading}>{nbsp("От замыслов до конкретных решений.")}</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{plan2027.steps.map((step) => <article key={step.title} className="border-t-2 border-accent pt-5"><h3 className="text-2xl font-semibold">{nbsp(step.title)}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{nbsp(step.description)}</p></article>)}</div></div></section>

        <section id="program" className={section}><div className={inner}><p className="mb-3 text-sm text-accent">{nbsp("Программа · 31 октября — 4 ноября")}</p><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><h2 className={heading}>{nbsp("Пять дней.")}<br /><span className="text-accent">{nbsp("Один готовый план.")}</span></h2><p className="max-w-md leading-relaxed text-muted-foreground">{nbsp("Три живых эфира с Василием и два дня, чтобы применить методику к собственным цифрам.")}</p></div><PlanProgram /></div></section>

        <section id="result" className={`${section} bg-secondary/60`}><div className={`${inner} grid items-center gap-8 lg:grid-cols-2 lg:gap-14`}><div><p className="mb-3 text-sm text-accent">{nbsp("В результате у вас на руках")}</p><h2 className={heading}>{nbsp("Один документ.")}<br /><span className="text-accent">{nbsp("Весь год под рукой.")}</span></h2><p className="mt-5 leading-relaxed text-muted-foreground">{nbsp("Вы получите шаблон финансового плана. Постепенно заполните его на эфирах и в дни практики — своими доходами, расходами, целями и решениями.")}</p><ul className="mt-6 space-y-4">{["Помесячный план поступлений и расходов", "Календарь больших покупок и целей", "План накоплений и финансового резерва", "Базовый и запасной сценарии"].map((text) => <li key={text} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" />{nbsp(text)}</li>)}</ul></div><PlanCalculator /></div></section>

        <section id="expert" className={`${section} bg-primary text-primary-foreground`}><div className={`${inner} grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14`}><img src={portrait.url} alt="Василий Мещеряков" loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-sm rounded-lg bg-accent-soft object-cover object-top" /><div><p className="mb-3 text-sm text-accent-soft">Ведущий стратсессии</p><h2 className={heading}>Василий<br /><span className="text-accent-soft">Мещеряков</span></h2><p className="mt-5 leading-relaxed text-primary-foreground/75">{nbsp("Финансовый консультант и автор проекта «Вася и финансы». Объясняет законы денег понятным языком и помогает превращать личный бюджет в инструмент для достижения жизненных целей.")}</p><div className="mt-7 grid grid-cols-3 gap-3 border-t border-primary-foreground/20 pt-6">{[{ value: "14 лет", text: "корпоративной карьеры" }, { value: "6 млрд ₽", text: "бюджет в управлении" }, { value: "1400", text: "семейных бюджетов разобрано" }].map((stat) => <div key={stat.value}><strong className="font-display text-2xl text-accent-soft md:text-3xl">{nbsp(stat.value)}</strong><p className="mt-2 text-xs leading-relaxed text-primary-foreground/65">{nbsp(stat.text)}</p></div>)}</div><p className="mt-5 text-xs text-primary-foreground/55">{nbsp("Опыт и данные о ведущем — по материалам проекта «Вася и финансы».")}</p></div></div></section>

        <section id="prices" className={section}><div className={inner}><p className="mb-3 text-sm text-accent">Форматы участия</p><h2 className={heading}>{nbsp("Составьте план")} <span className="text-accent">по-своему.</span></h2><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{nbsp("В обоих тарифах — полная пятидневная программа. Отличие — персональная проверка вашего плана Василием.")}</p><div className="mt-8 grid gap-5 md:grid-cols-2">{plan2027.prices.map((offer, i) => <article key={offer.name} className={`flex flex-col rounded-lg border border-border p-6 md:p-8 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-card"}`}><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-semibold">{nbsp(offer.name)}</h3><span className={`text-sm ${i === 1 ? "text-accent-soft" : "text-accent"}`}>{nbsp(offer.badge)}</span></div><p className={`mt-6 font-display text-5xl font-semibold ${i === 1 ? "text-accent-soft" : ""}`}>{new Intl.NumberFormat("ru-RU").format(offer.price)} ₽</p><p className="mt-4 text-sm leading-relaxed opacity-70">{nbsp(offer.description)}</p><ul className="my-6 space-y-4 border-t border-current/20 pt-6">{offer.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-relaxed"><Check className={`mt-0.5 size-4 shrink-0 ${i === 1 ? "text-accent-soft" : "text-accent"}`} />{nbsp(feature)}</li>)}</ul><div className="mt-auto"><Button size="lg" asChild className={`w-full ${i === 1 ? "bg-accent-soft text-foreground hover:bg-accent-soft/90" : ""}`}><a href={offer.href} aria-label={`Оставить заявку: ${offer.name}, ${offer.price} рублей`}>Оставить заявку <ArrowUpRight /></a></Button><p className="mt-3 text-center text-xs opacity-65">{nbsp(offer.note)}</p></div></article>)}</div><p className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><Info className="mt-1 size-4 shrink-0" />{nbsp("Сейчас запись организована через email: при нажатии на кнопку откроется подготовленное письмо. Оплата на этой странице не производится. Точное время эфиров сообщается после подтверждения участия.")}</p></div></section>

        <section className={`${section} bg-secondary/60`}><div className={`${inner} grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14`}><div><p className="mb-3 text-sm text-accent">Частые вопросы</p><h2 className={heading}>{nbsp("Нужно ли готовиться?")}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{nbsp("Вот что стоит знать перед началом пятидневной работы над своим планом.")}</p></div><div className="border-t border-border">{plan2027.faq.map((item) => <details key={item.question} className="group border-b border-border"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">{nbsp(item.question)}<span aria-hidden="true" className="text-2xl text-accent group-open:hidden">+</span><span aria-hidden="true" className="hidden text-2xl text-accent group-open:block">−</span></summary><p className="pb-5 leading-relaxed text-muted-foreground">{nbsp(item.answer)}</p></details>)}</div></div></section>

        <section className={`${section} bg-accent-soft/60`}><div className={`${inner} flex flex-col justify-between gap-6 lg:flex-row lg:items-center`}><div className="max-w-3xl"><p className="mb-3 text-sm">{nbsp("Встретим 2027 год подготовленными")}</p><h2 className={heading}>{nbsp("У нового года должен быть финансовый план.")}</h2><p className="mt-4 leading-relaxed">{nbsp("31 октября — 4 ноября. Три эфира, два дня практики и конкретные решения на следующие 12 месяцев.")}</p></div><Button asChild size="lg" className="self-start lg:self-center"><a href="#prices">Выбрать тариф <ArrowUpRight /></a></Button></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default Plan2027;