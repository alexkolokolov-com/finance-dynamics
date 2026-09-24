import { nbsp } from "@/lib/nbsp";

type Lesson = { title: string; points: string[] };

const lessons3: { title: string; points: string[] }[] = [
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


const lessons1: Lesson[] = [
  { title: "Выбираем индивидуальный шаблон", points: ["19 форматов ведения бюджета: от блокнота до автоматизации", "Выбор системы под ваш образ жизни", "Как вести бюджет 1–2 часа в месяц и не забросить"] },
  { title: "Принцип шестеренок", points: ["Авторская система «План → Факт → Новый план»", "Планирование на 3–6 месяцев вперёд", "Как понимать, что происходит с деньгами, без учёта каждой покупки"] },
  { title: "Оптимизация расходов", points: ["Авторские инструменты оптимизации расходов", "Как сокращать не расходы, а неэффективные расходы"] },
  { title: "Финансовая эффективность бюджета", points: ["Анализ годовых расходов и поиск «серых зон»", "Кредиты, страховки, кешбэк и другие точки оптимизации", "Как превращать бюджет из учёта расходов в инструмент принятия решений"] },
];

const lessons2: Lesson[] = [
  { title: "Диагностика и стратегия роста дохода", points: ["Улучшаем эффективность расходов", "Поиск ограничений и точек роста дохода", "Дерево роста доходов: 50+ инструментов увеличения дохода"] },
  { title: "Авторские инструменты роста дохода", points: ["Диаграмма Ганта", "Правила работы с диаграммой", "Как превращать идеи в конкретные действия и финансовый план"] },
  { title: "Управление денежным потоком и капиталом", points: ["Денежный поток как главный показатель личных финансов", "Подушка, активы для жизни и свободный капитал", "Как распределять деньги между жизнью сегодня и целями на 5+ лет"] },
  { title: "Долгосрочное финансовое планирование", points: ["Финансовая модель на 5+ лет", "Крупные покупки, дети, недвижимость и другие цели", "Сколько можно тратить сегодня, не жертвуя своим будущим"] },
  { title: "Персональная финансовая стратегия", points: ["Сводим доходы, расходы, капитал и цели в одну модель", "Сценарии изменения дохода и качества жизни", "Готовый план: как больше зарабатывать, лучше жить и накапливать капитал"] },
];

const LevelProgram = ({ id, number, title, subtitle, lessons }: { id: string; number: string; title: string; subtitle: string; lessons: Lesson[] }) => (
  <section id={id} className="scroll-mt-32 border-t border-foreground/10 py-20 md:py-28">
    <div className="container-px mx-auto max-w-7xl">
      <p className="flex items-baseline gap-3">
        <span className="number-display text-6xl text-accent md:text-7xl">{number}</span>
        <span className="font-display text-2xl font-semibold leading-none md:text-3xl">{nbsp("ступень")}</span>
      </p>
      <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{nbsp(title)}</h2>
      <p className="mt-5 font-body text-xl font-semibold text-accent">{nbsp(subtitle)}</p>

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

export const Level1Program = () => <LevelProgram id="level1-program" number="1" title="Ленивый бюджет" subtitle="4 урока" lessons={lessons1} />;
export const Level2Program = () => <LevelProgram id="level2-program" number="2" title="Денежный поток" subtitle="5 уроков" lessons={lessons2} />;
export const Level3Program = () => <LevelProgram id="level3-program" number="3" title="Разумные инвестиции" subtitle="6 уроков + личная консультация" lessons={lessons3} />;
