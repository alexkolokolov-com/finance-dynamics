import { nbsp } from "@/lib/nbsp";

const lessons: { title: string; points: string[] }[] = [
  {
    title: "Инвестиционное планирование и целевой капитал",
    points: [
      "Расчёт капитала под ваши финансовые цели",
      "Срок, норма сбережений и требуемая доходность",
      "Сценарий создания пассивного дохода 100\u00A0000\u00A0₽ в месяц",
    ],
  },
  {
    title: "Риск, доходность и инвестиционные стратегии",
    points: [
      "Соотношение риска, доходности и инвестиционного горизонта",
      "Краткосрочные, среднесрочные и долгосрочные инвестиции",
      "Сценарии, которые работают — и стратегии, которые не работают",
    ],
  },
  {
    title: "Классы активов и структура портфеля",
    points: ["Депозиты и облигации", "Акции и фонды", "Недвижимость, золото и альтернативные инвестиции"],
  },
  {
    title: "Формирование инвестиционного портфеля",
    points: [
      "Диверсификация и управление риском",
      "Выбор структуры портфеля под срок и цели",
      "Разбор инвестиционных сценариев на реальных цифрах",
    ],
  },
  {
    title: "Пассивное инвестирование и поведение инвестора",
    points: [
      "Активное vs пассивное управление",
      "Индексное инвестирование, рыночные циклы и поведенческие ошибки",
      "«Одна хорошая и три плохие новости» + мой личный опыт инвестирования",
    ],
  },
  {
    title: "Персональная инвестиционная стратегия",
    points: [
      "Корректировка стратегии в вашем долгосрочном плане",
      "Готовый инвестиционный план: сколько, куда и на какой срок инвестировать",
    ],
  },
];

export const Level3Program = () => (
  <section id="level3-program" className="scroll-mt-32 border-t border-foreground/10 py-20 md:py-28">
    <div className="container-px mx-auto max-w-7xl">
      <p className="flex items-baseline gap-3">
        <span className="number-display text-6xl text-accent md:text-7xl">3</span>
        <span className="font-display text-2xl font-semibold leading-none md:text-3xl">{nbsp("ступень")}</span>
      </p>
      <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{nbsp("Разумные инвестиции")}</h2>
      <p className="mt-5 font-body text-xl font-semibold text-accent">{nbsp("6 уроков + личная консультация")}</p>

      <div className="mt-14 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, i) => (
          <article key={lesson.title} className="border-t border-foreground/20 py-8">
            <p className="number-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-4 font-body text-sm font-semibold text-foreground/60">{nbsp(`Урок ${i + 1}`)}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">{nbsp(lesson.title)}</h3>
            <ul className="mt-5 space-y-2.5 border-l-2 border-accent pl-4">
              {lesson.points.map((p) => (
                <li key={p} className="font-body leading-snug text-foreground/80">{nbsp(p)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
