import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import heroImg from "@/assets/plan-hero.jpg";
import sellersImg from "@/assets/plan-sellers.jpg";
import depositImg from "@/assets/plan-deposit.jpg";
import treeImg from "@/assets/plan-tree.jpg";
import wheelImg from "@/assets/plan-wheel.jpg";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-[clamp(1.6rem,3.6vw,2.4rem)] mb-6">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display font-semibold leading-[1.18] tracking-tight text-[clamp(1.25rem,2.6vw,1.6rem)] mb-4">
    {children}
  </h3>
);

const Pull = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 rounded-xl border border-border border-l-2 border-l-accent bg-card px-5 py-4">
    <p className="font-body text-[17px] md:text-lg leading-relaxed text-foreground/85">
      {children}
    </p>
  </div>
);

const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) => (
  <figure className="container-px max-w-5xl mx-auto py-6">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1600}
      height={912}
      className="w-full aspect-square object-cover md:aspect-auto md:object-contain rounded-2xl border border-border"
    />
    <figcaption className="mt-3 text-center font-body text-sm text-foreground/55">
      {caption}
    </figcaption>
  </figure>
);

const thinkingTypes = [
  {
    num: "1",
    title: "«Я шарю в цифрах»",
    text: "Собираем модель в Excel. Иногда подробную, иногда предельно простую: какая сумма есть и какие у неё сценарии. Моя роль — помочь настроить и упростить: вы видели одну свою таблицу, я — тысячу.",
  },
  {
    num: "2",
    title: "«Не люблю таблицы»",
    text: "Составляем простейший план: заработаю столько-то, потрачу столько-то, останется столько-то; умножаем на десять лет — хватает ли на жизнь? Если нет, ищем, где усилить. Часто это карьерный план или план роста бизнеса, а финансовый план остаётся одной большой цифрой.",
  },
  {
    num: "3",
    title: "«Что-то посередине»",
    text: "Один базовый табличный элемент, от которого отталкиваемся, — например бюджет. Его прорабатываем подробно: доходы, расходы или инвестиционный план. А всё остальное докручиваем без таблиц.",
  },
];

const people = [
  {
    num: "Человек 1",
    text: (
      <>
        Доход стабилен, целей в&nbsp;ближайшие 10&nbsp;лет нет, подушка собрана.
        Его 5&nbsp;млн разумно инвестировать на&nbsp;долгий срок —
        и&nbsp;спокойно переживать колебания рынка.
      </>
    ),
  },
  {
    num: "Человек 2",
    text: (
      <>
        Через два года — покупка квартиры. Его 5&nbsp;млн — это будущий
        первоначальный взнос. Правильное решение — консервативные инструменты
        с&nbsp;понятной датой возврата, а&nbsp;не&nbsp;доходность.
      </>
    ),
  },
  {
    num: "Человек 3",
    text: (
      <>
        Доход высокий, но&nbsp;неровный, подушки нет. Его первые деньги должны
        стать резервом. Инвестировать на&nbsp;15&nbsp;лет ему пока рано — хотя
        именно это ему и&nbsp;посоветуют.
      </>
    ),
  },
  {
    num: "Человек 4",
    text: (
      <>
        Через два года деньги понадобятся на&nbsp;бизнес. Ему вообще
        не&nbsp;стоит сейчас брать на&nbsp;себя инвестиционный риск — какой бы
        доходностью ни&nbsp;манила презентация.
      </>
    ),
  },
];

const SPHERES = [
  "Здоровье",
  "Образование",
  "Жильё и среда",
  "Семья",
  "Впечатления",
  "Время на себя",
  "Отношения",
  "Финансы",
];

const Wheel = () => {
  const [importance, setImportance] = useState<number[]>(
    () => SPHERES.map(() => 7),
  );
  const [result, setResult] = useState<number[]>(() => SPHERES.map(() => 5));

  const size = 300;
  const c = size / 2;
  const R = size / 2 - 26;

  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / SPHERES.length - Math.PI / 2;
    const r = (v / 10) * R;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };

  const poly = (vals: number[]) =>
    vals.map((v, i) => point(i, v).join(",")).join(" ");

  const gap = useMemo(() => {
    let idx = 0;
    let best = -Infinity;
    importance.forEach((v, i) => {
      const d = v - result[i];
      if (d > best) {
        best = d;
        idx = i;
      }
    });
    return { idx, value: best };
  }, [importance, result]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
      <div className="space-y-4">
        {SPHERES.map((s, i) => (
          <div key={s} className="bg-card border border-border rounded-xl p-4">
            <div className="font-display font-semibold text-[15px] mb-3">
              {s}
            </div>
            <div className="space-y-2.5">
              <label className="block">
                <span className="font-body text-xs uppercase tracking-[0.08em] text-foreground/55">
                  Насколько важно · {importance[i]}
                </span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={importance[i]}
                  onChange={(e) =>
                    setImportance((p) =>
                      p.map((v, j) => (j === i ? +e.target.value : v)),
                    )
                  }
                  className="mt-1 w-full accent-foreground"
                  aria-label={`Важность: ${s}`}
                />
              </label>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-[0.08em] text-foreground/55">
                  Мой результат · {result[i]}
                </span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={result[i]}
                  onChange={(e) =>
                    setResult((p) =>
                      p.map((v, j) => (j === i ? +e.target.value : v)),
                    )
                  }
                  className="mt-1 w-full accent-[hsl(var(--accent))]"
                  aria-label={`Результат: ${s}`}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="bg-card border border-border rounded-2xl p-5">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-auto"
            role="img"
            aria-label="Колесо сфер жизни: важность и результат"
          >
            {[2.5, 5, 7.5, 10].map((v) => (
              <polygon
                key={v}
                points={poly(SPHERES.map(() => v))}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.8"
                opacity="0.18"
              />
            ))}
            {SPHERES.map((s, i) => {
              const [x, y] = point(i, 10);
              return (
                <line
                  key={s}
                  x1={c}
                  y1={c}
                  x2={x}
                  y2={y}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.8"
                  opacity="0.16"
                />
              );
            })}
            <polygon
              points={poly(importance)}
              fill="hsl(var(--foreground))"
              fillOpacity="0.08"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.6"
            />
            <polygon
              points={poly(result)}
              fill="hsl(var(--accent))"
              fillOpacity="0.14"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
            />
          </svg>

          <div className="mt-4 flex flex-wrap gap-4 font-body text-[13px] text-foreground/65">
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-[2px] bg-foreground" /> Насколько важно
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-[2px] bg-accent" /> Мой результат
            </span>
          </div>

          <p className="mt-4 font-body text-[15px] leading-relaxed text-foreground/80">
            {gap.value <= 1 ? (
              <>
                Разрывов почти нет — важность и&nbsp;результат совпадают.
                Это редкая и&nbsp;хорошая ситуация.
              </>
            ) : (
              <>
                Самый большой разрыв — <strong className="text-accent">
                  {SPHERES[gap.idx].toLowerCase()}
                </strong>{" "}
                ({gap.value} баллов). Именно здесь деньги и&nbsp;время могут
                купить больше качества жизни, чем любая инвестиция.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const FinancialPlan = () => {
  useEffect(() => {
    document.title = "Вы заработали деньги. Теперь главное — не потерять их";
    const content =
      "Почему вопрос «куда вложить деньги» — последний, а не первый. Личный финансовый план как бизнес-план вашей жизни: доходы, расходы, качество жизни и колесо сфер в деньгах.";
    const desc = document.querySelector('meta[name="description"]');
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
      <section className="pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="container-px max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="font-display font-semibold leading-[1.08] tracking-tight text-[clamp(2rem,5.4vw,3.6rem)]">
            Вы&nbsp;заработали деньги. Теперь главное —{" "}
            <span className="italic font-normal text-accent">
              не&nbsp;потерять их
            </span>
          </h1>
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl mx-auto">
            Почему вопрос «куда вложить деньги» — последний вопрос,
            а&nbsp;не&nbsp;первый. И&nbsp;что должно появиться раньше любых
            инвестиций: личный финансовый план, который работает как бизнес-план
            вашей жизни.
          </p>
        </div>

        <div className="container-px max-w-5xl mx-auto mt-10 md:mt-14">
          <img
            src={heroImg}
            alt="Человек с мешком денег на перекрёстке: банк, квартира, инвестиции"
            width={1600}
            height={912}
            className="w-full aspect-square object-cover md:aspect-auto md:object-contain rounded-2xl border border-border"
          />
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-px max-w-3xl mx-auto space-y-5 font-body text-lg leading-relaxed text-foreground/80">
          <p>
            Человек несколько лет хорошо зарабатывал. Или&nbsp;получил крупную
            премию, продал квартиру или&nbsp;бизнес. На&nbsp;руках — 3,
            5,&nbsp;10&nbsp;миллионов рублей. Вроде бы&nbsp;начинается приятная
            часть: деньги должны работать. Но&nbsp;вместе со&nbsp;свободными
            деньгами приходят и&nbsp;риски.
          </p>
          <p>
            Депозит, квартира, облигации, акции, валюта, чужой бизнес —
            или&nbsp;вообще пока ничего не&nbsp;делать?
          </p>
          <p>
            <strong>Чем больше сумма, тем выше цена ошибки.</strong>
          </p>
        </div>
      </section>

      {/* Продавцы */}
      <section id="prodavcy" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>Свободные деньги притягивают продавцов</H2>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Как только появляются свободные деньги, вокруг появляются люди,
              которые знают, как их&nbsp;вложить: недвижимость, бизнес, закрытый
              клуб, криптовалюта, торговые роботы. Часть — откровенные
              мошенники, но&nbsp;давно не&nbsp;похожие на&nbsp;мошенников:
              офисы, договоры, известные партнёры. Чем выше ваш доход, тем
              качественнее вам продают.
            </p>
            <p>
              Но&nbsp;главный риск — не&nbsp;мошенники. Банк предложит продукт,
              на&nbsp;котором зарабатывает банк. Брокер — инвестиционный
              продукт. Застройщик — квартиру. Предприниматель, которому нужны
              деньги, — долю в&nbsp;своём бизнесе. И&nbsp;каждый может быть
              абсолютно честен: квартира существует, облигация настоящая, бизнес
              работает.
            </p>
            <p>
              Из&nbsp;этого не&nbsp;следует, что конкретно вам нужно вкладывать
              туда деньги. Обещания и&nbsp;реальность почти всегда различаются:
              доходность ниже ожидаемой, комиссии выше, деньги понадобились
              раньше, чем планировали. Это не&nbsp;обман — любая инвестиция
              сложнее презентации.
            </p>
          </div>
        </div>
      </section>

      <Figure
        src={sellersImg}
        alt="Банкир, брокер, застройщик и предприниматель — каждый продаёт свой продукт"
        caption="Честный товар не значит подходящий вам"
      />

      {/* Депозит */}
      <section id="depozit" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>Депозит: спокойствие, которое не&nbsp;приближает к&nbsp;цели</H2>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              «Тогда просто депозит», — решает человек. Спокойно: деньги
              в&nbsp;банке, проценты капают, ничего делать не&nbsp;нужно.
              Но&nbsp;вопросы никуда не&nbsp;деваются: какую часть капитала
              держать в&nbsp;банках, что делать с&nbsp;суммой выше страхового
              покрытия, в&nbsp;какой валюте хранить, что останется после
              инфляции. И&nbsp;главный — достаточно ли&nbsp;этой доходности для
              ваших целей?
            </p>
            <p>
              Можно несколько лет радоваться хорошей ставке, а&nbsp;потом
              обнаружить: капитал вырос — а&nbsp;нужная квартира, образование
              детей или&nbsp;пассивный доход не&nbsp;приблизились.
            </p>
          </div>
          <Pull>
            Само по&nbsp;себе отсутствие риска ещё не&nbsp;означает хорошего
            финансового решения.
          </Pull>
        </div>
      </section>

      <Figure
        src={depositImg}
        alt="Копилка спит в надёжном сейфе, но сейф стоит на тающей льдине"
        caption="Депозит защищает от воров, но не от инфляции и не от несбывшихся целей"
      />

      {/* Принцип */}
      <section className="py-10 md:py-14">
        <div className="container-px max-w-3xl mx-auto">
          <H2>
            В&nbsp;бизнесе это очевидно, а&nbsp;в&nbsp;личных финансах —
            почему-то нет
          </H2>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Обычно поиск выглядит так: человек с&nbsp;условными пятью
              миллионами спрашивает знакомых, читает Telegram, идёт в&nbsp;банк,
              разговаривает с&nbsp;брокером — и&nbsp;вариантов становится
              больше, чем было вначале. При&nbsp;этом пропущен один важный шаг.
            </p>
            <p>
              Ни&nbsp;один банк не&nbsp;вкладывает деньги, не&nbsp;посмотрев
              прогноз окупаемости. Ни&nbsp;одно предприятие не&nbsp;запускает
              серьёзный проект без бизнес-плана. Ни&nbsp;один инвестор
              не&nbsp;отдаёт деньги, не&nbsp;понимая срока возврата, доходности
              и&nbsp;риска.
            </p>
          </div>
          <Pull>
            В&nbsp;нормальном бизнесе логика обратная. Сначала цифры
            и&nbsp;план. Потом — решение.
          </Pull>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Их&nbsp;объединяет одна скучная вещь: у&nbsp;них есть{" "}
              <strong>финансовый план</strong>.
            </p>
            <p>
              <strong>А&nbsp;у&nbsp;вас он есть?</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Методика */}
      <section id="plan" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>
            Личный финансовый план — это не&nbsp;таблица, а&nbsp;поиск точки
            роста
          </H2>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Предлагаю на&nbsp;минуту отложить выбор между депозитом,
              квартирой и&nbsp;облигациями и&nbsp;ответить на&nbsp;вопрос: если
              у&nbsp;вас есть свободные деньги — у&nbsp;вас есть финансовый
              план? Не&nbsp;список активов в&nbsp;приложении брокера
              и&nbsp;не&nbsp;абстрактное «хочу финансовую свободу».
            </p>
            <p>
              В&nbsp;интернете на&nbsp;этот вопрос есть стандартный рецепт:
              посчитайте доходы и&nbsp;расходы, накопите подушку, поставьте
              цели, прикиньте нужный капитал — и&nbsp;потом наполняйте его
              инструментами. Всё абсолютно правильно. И&nbsp;в&nbsp;реальности
              почти никогда не&nbsp;работает.
            </p>
            <p>
              Потому что бизнес движет не&nbsp;учёт, а&nbsp;коммерческая
              функция: поиск, где купить за&nbsp;рубль и&nbsp;продать
              за&nbsp;сто. Бизнес-план при&nbsp;этом может быть кривым
              и&nbsp;косым — но&nbsp;заточенным под одну главную возможность.
              Математика обслуживает её, а&nbsp;всё остальное написано крупными
              мазками.
            </p>
          </div>
          <Pull>Простота и&nbsp;понятность плана важнее его правильности.</Pull>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Неправильный на&nbsp;старте, но&nbsp;простой план легко дойдёт
              до&nbsp;правильного: вы&nbsp;будете им&nbsp;пользоваться
              и&nbsp;поправлять по&nbsp;ходу. Правильный,
              но&nbsp;непонятный, будет всё дальше уходить от&nbsp;реальности —
              и&nbsp;вы&nbsp;его бросите.
            </p>
            <p>
              Личный финансовый план — это не&nbsp;универсальная табличка,
              которую вы&nbsp;тупо заполняете цифрами. Это
              в&nbsp;гораздо большей степени{" "}
              <strong>поиск точки приложения ваших усилий</strong>.
            </p>
          </div>

          <div className="mt-10">
            <H3>Первый вопрос диагностики: «Как вы&nbsp;мыслите?»</H3>
            <p className="font-body text-lg leading-relaxed text-foreground/80">
              Планировать умеет любой, кто справляется со&nbsp;штанами
              по&nbsp;утрам: одна нога — в&nbsp;одну брючину, вторая —
              во&nbsp;вторую. Но&nbsp;люди мыслят по-разному, и&nbsp;план должен
              родиться под то, как мыслите именно вы. Есть три базовых типа.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {thinkingTypes.map((t) => (
                <div
                  key={t.num}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="font-display font-semibold text-accent text-2xl leading-none mb-3">
                    {t.num}
                  </div>
                  <h4 className="font-display font-semibold text-base mb-2">
                    {t.title}
                  </h4>
                  <p className="font-body text-[15px] leading-relaxed text-foreground/75">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-body text-lg leading-relaxed text-foreground/80">
              Универсального шаблона не&nbsp;существует: чужой бизнес-план можно
              скачать, но&nbsp;докручивать придётся под себя. Каркас общий —
              доходы, расходы, подушка, цели, капитал, инструменты. Но&nbsp;это
              скелет, а&nbsp;не&nbsp;план. План — то, куда конкретно
              вы&nbsp;приложите усилия. Вот пример такой точки.
            </p>
          </div>
        </div>
      </section>

      {/* Дерево доходов */}
      <section className="py-10 md:py-14">
        <div className="container-px max-w-3xl mx-auto">
          <H3>Дерево роста доходов: как родился этот инструмент</H3>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Работая с&nbsp;чужими бюджетами, я&nbsp;заметил странную вещь: все
              фокусируются на&nbsp;расходах. Доход дан «по&nbsp;умолчанию»,
              а&nbsp;расходы экономят, оптимизируют, налаживают эффективность.
              Складывается ощущение, что никто не&nbsp;хочет больше
              зарабатывать — все хотят эффективнее тратить.
            </p>
            <p>
              Поэтому я&nbsp;пришёл к&nbsp;простой модели: в&nbsp;любом бюджете
              50% места и&nbsp;усилий должны занимать доходы —
              и&nbsp;только оставшиеся 50% расходы. Резонный вопрос: как, если
              доход — это зарплата и&nbsp;премия, а&nbsp;категорий расходов
              двадцать?
            </p>
            <p>
              Отвечая на&nbsp;это «как», я&nbsp;сделал до&nbsp;тупости простую
              вещь, которая оказалась рабочей: собрал бюджеты людей,
              у&nbsp;которых получается растить доход, в&nbsp;единую ментальную
              карту. Она не&nbsp;из&nbsp;интернета и&nbsp;не&nbsp;из&nbsp;мотивационных
              книг — это обобщённые реальные истории. Дерево не&nbsp;работает
              быстро и&nbsp;не&nbsp;сразу, но&nbsp;шаг за&nbsp;шагом смещает
              фокус с&nbsp;расходов на&nbsp;доходы.
            </p>
          </div>
        </div>
      </section>

      <Figure
        src={treeImg}
        alt="Дерево роста доходов: корни — навыки и знания, плоды — доход"
        caption="Дерево роста доходов — ментальная карта, собранная из реальных бюджетов"
      />

      <section className="py-10 md:py-14">
        <div className="container-px max-w-3xl mx-auto">
          <H3>
            Расходы: не&nbsp;«где сэкономить», а&nbsp;«что я&nbsp;покупаю
            на&nbsp;самом деле»
          </H3>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Второй блок — расходы. Здесь тоже есть методика глубже, чем
              «записывайте траты месяц»: разложить бюджет не&nbsp;по&nbsp;статьям
              из&nbsp;приложения банка, а&nbsp;по&nbsp;смыслу. Сколько уходит
              на&nbsp;здоровье, сколько на&nbsp;образование — своё
              и&nbsp;детей, сколько на&nbsp;жильё и&nbsp;среду, сколько
              на&nbsp;семью и&nbsp;отдых — и&nbsp;сколько на&nbsp;то, что
              перестаёт радовать через неделю.
            </p>
            <p>
              Такой разбор обычно показывает не&nbsp;перерасход,
              а&nbsp;перекос: деньги есть, но&nbsp;распределены они
              не&nbsp;в&nbsp;пользу того, что человек сам называет важным.
            </p>
          </div>
        </div>
      </section>

      {/* Качество жизни */}
      <section id="kachestvo" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>
            Во&nbsp;что вы&nbsp;на&nbsp;самом деле инвестируете: как измерить
            качество жизни
          </H2>
          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Остался вопрос, на&nbsp;который бизнес-план предприятия
              не&nbsp;отвечает, а&nbsp;личный — обязан. Если личный финансовый
              план — это план на&nbsp;жизнь, он должен отвечать
              на&nbsp;вопрос: в&nbsp;чём конкретно повысится моё качество жизни?
            </p>
            <p>
              Качество жизни чаще всего меряют в&nbsp;двух координатах: шмотки
              стали дороже, машина стала дороже. Но&nbsp;система координат шире:
              здоровье, образование — своё и&nbsp;детей, жильё и&nbsp;среда,
              время на&nbsp;семью и&nbsp;на&nbsp;себя, впечатления, отношения
              с&nbsp;детьми и&nbsp;родителями.
            </p>
            <p>
              Расходы не&nbsp;равны по&nbsp;отдаче. Одни радуют неделю, другие
              работают годами: вылеченные зубы, выученный язык, квартира
              с&nbsp;окнами в&nbsp;парк, поездка, которую вспоминаете десять
              лет, время с&nbsp;родителями, пока оно есть. Когда люди
              раскладывают бюджет по&nbsp;этим осям, часто выясняется:
              на&nbsp;действительно важное вы&nbsp;тратите меньше, чем могли
              бы, — разница уходит на&nbsp;импульсивные покупки и&nbsp;статусные
              вещи, которые перестали радовать ещё в&nbsp;примерочной.
            </p>
          </div>
          <Pull>
            Качество жизни измеряется не&nbsp;ценой вещей, а&nbsp;тем,
            в&nbsp;какие сферы жизни на&nbsp;самом деле уходят деньги.
          </Pull>
        </div>
      </section>

      <Figure
        src={wheelImg}
        alt="Личная орбитальная система: в центре человек, вокруг — сферы жизни"
        caption="Личная «орбитальная система»: в центре вы, вокруг — сферы, в которые вы инвестируете"
      />

      {/* Колесо сфер */}
      <section id="koleso" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <H3>Колесо сфер жизни: важность и&nbsp;результат</H3>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
              <p>
                В&nbsp;классических методиках диагностики просят оценить каждую
                сферу жизни от&nbsp;1&nbsp;до&nbsp;10 — «насколько
                вы&nbsp;довольны». Но&nbsp;это оценка настроения,
                а&nbsp;не&nbsp;факта.
              </p>
              <p>
                Я&nbsp;предлагаю две точки вместо одной, обе
                по&nbsp;десятибалльной шкале: насколько сфера вам важна —
                и&nbsp;какой у&nbsp;вас в&nbsp;ней результат сейчас. Важность —
                это ваши слова. Результат — это факты: здоровье, жильё,
                отношения, время. И&nbsp;разрыв между этими двумя оценками —
                самая честная диагностика, которая у&nbsp;вас есть: именно
                он&nbsp;подсказывает, куда направить деньги и&nbsp;время
                в&nbsp;первую очередь.
              </p>
              <p>
                Попробуйте прямо здесь. Поставьте два ползунка по&nbsp;каждой
                сфере — и&nbsp;посмотрите на&nbsp;своё колесо.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Wheel />
          </div>

          <p className="mt-8 max-w-3xl font-body text-lg leading-relaxed text-foreground/80">
            Если по&nbsp;какой-то сфере терракотовая линия отстала
            от&nbsp;тёмной — вы&nbsp;нашли место, где деньги и&nbsp;время могут
            купить больше качества жизни, чем любая инвестиция. Это тоже часть
            финансового плана: не&nbsp;только «куда вложить капитал»,
            но&nbsp;и&nbsp;«куда направить расходы, чтобы жизнь стала лучше уже
            сейчас».
          </p>
        </div>
      </section>

      {/* Пример */}
      <section className="py-10 md:py-14">
        <div className="container-px max-w-3xl mx-auto">
          <H2>
            Одни и&nbsp;те&nbsp;же 5&nbsp;миллионов — четыре разных правильных
            решения
          </H2>
          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Только после того, как собран план, появляется смысл обсуждать
            инструменты. Смотрите, как одна и&nbsp;та&nbsp;же сумма превращается
            в&nbsp;четыре разных правильных решения — в&nbsp;зависимости
            от&nbsp;плана человека.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {people.map((p) => (
              <div
                key={p.num}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="font-body text-xs uppercase tracking-[0.1em] text-accent mb-2">
                  {p.num}
                </div>
                <p className="font-body text-[15px] leading-relaxed text-foreground/80">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 font-body text-lg leading-relaxed text-foreground/80">
            Инструмент один. Правильное решение — разное. И&nbsp;выбрать его
            можно не&nbsp;по&nbsp;принципу «где сейчас обещают больше
            процентов», а&nbsp;по&nbsp;тому, насколько каждый вариант приближает
            вас к&nbsp;нужному результату. Без плана вы&nbsp;фактически сначала
            выбираете ответ — а&nbsp;потом пытаетесь придумать, к&nbsp;какому
            вопросу он подходит.
          </p>
        </div>
      </section>

      {/* Два формата */}
      <section id="format" className="py-10 md:py-14 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>Как собрать свой план: курс или&nbsp;персональный разбор</H2>
          <p className="font-body text-lg leading-relaxed text-foreground/80">
            У&nbsp;меня два формата работы, и&nbsp;логика у&nbsp;них разная.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="font-body text-xs uppercase tracking-[0.1em] text-accent mb-2">
                Формат 1 · Курс
              </div>
              <div className="space-y-3 font-body text-[15px] leading-relaxed text-foreground/80">
                <p>
                  Проходит 2–3&nbsp;раза в&nbsp;год, в&nbsp;группе — поэтому
                  дешевле. Это учебник о&nbsp;том, как не&nbsp;потерять деньги:
                  доходы, расходы, подушка, цели, капитал, инструменты.
                </p>
                <p>
                  Курс обычно выбирают те, кто давно читает мой канал:
                  информации много, но&nbsp;самостоятельно она
                  не&nbsp;складывается в&nbsp;систему. Если это про&nbsp;вас —
                  напишите мне и&nbsp;отметьте «курс»: расскажем программу
                  и&nbsp;даты ближайшего потока.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="font-body text-xs uppercase tracking-[0.1em] text-accent mb-2">
                Формат 2 · Персональный разбор
              </div>
              <div className="space-y-3 font-body text-[15px] leading-relaxed text-foreground/80">
                <p>
                  Индивидуальная работа, бесплатно. Это моя рекомендация для
                  читателя этой статьи — человека, у&nbsp;которого вопрос
                  доходов и&nbsp;расходов базово решён. Главная задача другая:
                  не&nbsp;потерять накопленную разницу.
                </p>
                <p>
                  Цена ошибки здесь совсем иная. Одно дело — зарабатывать
                  150&nbsp;тысяч, тратить 140 и&nbsp;искать дополнительные 10.
                  Совсем другое — держать на&nbsp;руках 5&nbsp;миллионов,
                  ошибиться на&nbsp;10% и&nbsp;потерять 500. Здесь время дороже
                  сэкономленных денег: пока вы&nbsp;учитесь на&nbsp;своих
                  ошибках, можно совершить несколько очень дорогих.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              В&nbsp;результате вопрос «куда вложить деньги» перестаёт
              существовать сам по&nbsp;себе и&nbsp;становится частью
              последовательности: что я&nbsp;хочу получить → когда понадобятся
              деньги → сколько нужно накопить → какой риск допустим →
              и&nbsp;только потом какие инструменты подходят.
            </p>
            <p>
              Это безопаснее, чем сначала заработать несколько миллионов,
              а&nbsp;потом ходить по&nbsp;рынку и&nbsp;искать, кому бы
              их&nbsp;отдать.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="diagnostika"
        className="py-16 md:py-24 bg-board text-background scroll-mt-24"
      >
        <div className="container-px max-w-3xl mx-auto text-center">
          <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-[clamp(1.6rem,3.6vw,2.4rem)] mb-4">
            Если у&nbsp;вас сейчас как раз есть вопрос «что делать
            с&nbsp;деньгами?»
          </h2>
          <p className="font-body text-lg leading-relaxed text-background/85">
            Начните с&nbsp;бесплатной диагностики. Мы&nbsp;смотрим, какие задачи
            у&nbsp;вас есть сейчас и&nbsp;чего не&nbsp;хватает в&nbsp;вашей
            системе. В&nbsp;любом случае после диагностики вы&nbsp;получите
            шаблоны финансовых планов и&nbsp;рекомендации, с&nbsp;чего
            бы&nbsp;я&nbsp;начал именно в&nbsp;вашей ситуации.
          </p>
          <a
            href="/consultations"
            className="mt-8 inline-flex items-center rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-[0.08em] px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
          >
            Хочу на&nbsp;персональный разбор
          </a>
          <div className="mt-4 font-body text-[13px] text-background/70">
            Диагностика бесплатна и&nbsp;ни&nbsp;к&nbsp;чему не&nbsp;обязывает
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FinancialPlan;
