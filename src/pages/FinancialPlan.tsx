import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { ArticleSection } from "@/components/article/ArticleSection";
import { ArticleFlow } from "@/components/article/ArticleFlow";
import { H2 } from "@/components/article/H2";
import { H3 } from "@/components/article/H3";
import { Pull } from "@/components/article/Pull";
import { Figure } from "@/components/article/Figure";
import { nbsp } from "@/lib/nbsp";
import heroImg from "@/assets/plan-hero.jpg";
import sellersImg from "@/assets/plan-sellers.jpg";
import depositImg from "@/assets/plan-deposit.jpg";
import napkinImg from "@/assets/plan-napkin.jpg";
import cardNumbersImg from "@/assets/plan-card-numbers.jpg";
import cardTablesImg from "@/assets/plan-card-tables.jpg";
import cardBothImg from "@/assets/plan-card-both.jpg";
import mindmapImg from "@/assets/plan-mindmap.jpg";
import icHealth from "@/assets/wheel-health.png";
import icEducation from "@/assets/wheel-education.png";
import icHome from "@/assets/wheel-home.png";
import icFamily from "@/assets/wheel-family.png";
import icImpressions from "@/assets/wheel-impressions.png";
import icTime from "@/assets/wheel-time.png";
import icRelations from "@/assets/wheel-relations.png";
import icFinance from "@/assets/wheel-finance.png";
import expertAvatar from "@/assets/expert-vasily.jpg";
import vasilyPortrait from "@/assets/vasily-hero.png.asset.json";




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
  { name: "Здоровье", icon: icHealth },
  { name: "Образование", icon: icEducation },
  { name: "Жильё", icon: icHome },
  { name: "Семья", icon: icFamily },
  { name: "Впечатления", icon: icImpressions },
  { name: "Время на себя", icon: icTime },
  { name: "Отношения", icon: icRelations },
  { name: "Финансы", icon: icFinance },
];

const Wheel = () => {
  const [importance, setImportance] = useState<number[]>(
    () => SPHERES.map(() => 5),
  );
  const [result, setResult] = useState<number[]>(() => SPHERES.map(() => 5));

  const size = 400;
  const c = size / 2;
  const R = size / 2 - 44; // место под иконки и подписи над ними
  const R0 = 18; // маленькая «дырка» в центре

  const angle = (i: number) =>
    (Math.PI * 2 * i) / SPHERES.length - Math.PI / 2;

  const point = (i: number, v: number) => {
    const a = angle(i);
    const r = R0 + (v / 10) * (R - R0);
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };

  const atRadius = (i: number, r: number) => {
    const a = angle(i);
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
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-[2fr_1fr]">
        {/* Диаграмма */}
        <div className="p-4 md:p-5">
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-body text-[12px] text-foreground/60">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-[2px] bg-foreground" /> важность
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-[2px] bg-accent" /> результат
            </span>
          </div>

          <div className="relative w-full max-w-[560px] mx-auto aspect-square">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label="Колесо сфер жизни: важность и результат"
            >
              {[2, 4, 6, 8, 10].map((v) => (
                <polygon
                  key={v}
                  points={poly(SPHERES.map(() => v))}
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.8"
                  opacity="0.08"
                />
              ))}
              {SPHERES.map((s, i) => {
                const [x1, y1] = atRadius(i, R0);
                const [x2, y2] = atRadius(i, R);
                return (
                  <line
                    key={s.name}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="0.8"
                    opacity="0.08"
                  />
                );
              })}

              <polygon
                points={poly(importance)}
                fill="hsl(var(--foreground))"
                fillOpacity="0.05"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.6"
              />
              <polygon
                points={poly(result)}
                fill="hsl(var(--accent))"
                fillOpacity="0.16"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
              />
              {SPHERES.map((s, i) => {
                const [x, y] = point(i, result[i]);
                const a = angle(i);
                return (
                  <g key={s.name}>
                    <circle cx={x} cy={y} r="3.2" fill="hsl(var(--accent))" />
                    <text
                      x={x + Math.cos(a) * 12}
                      y={y + Math.sin(a) * 12}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-accent font-body"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      {result[i]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Иконки сфер с подписями над ними */}
            {SPHERES.map((s, i) => {
              const [x, y] = atRadius(i, R + 22);
              return (
                <div
                  key={s.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[24%] text-center"
                  style={{ left: `${(x / size) * 100}%`, top: `${(y / size) * 100}%` }}
                >
                  <div className="font-display font-semibold leading-tight text-[clamp(9px,1.8vw,11px)] text-foreground/70">
                    {s.name}
                  </div>
                  <img
                    src={s.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="mx-auto mt-0.5 w-[clamp(24px,5.6vw,34px)] h-[clamp(24px,5.6vw,34px)]"
                  />
                </div>
              );
            })}
          </div>

          <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
            {gap.value <= 1 ? (
              <>
                Разрывов почти нет — важность и&nbsp;результат совпадают.
                Это редкая и&nbsp;хорошая ситуация.
              </>
            ) : (
              <>
                Самый большой разрыв — <strong className="text-accent">
                  {SPHERES[gap.idx].name.toLowerCase()}
                </strong>{" "}
                ({gap.value} баллов). Именно здесь деньги и&nbsp;время могут
                купить больше качества жизни, чем любая инвестиция.
              </>
            )}
          </p>
        </div>

        {/* Ползунки — в том же фрейме, за разделителем */}
        <div className="p-4 md:p-5 border-t lg:border-t-0 lg:border-l border-border">
          <div className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1">
            {SPHERES.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-semibold text-[13px] leading-none">
                    {s.name}
                  </span>
                  <span className="ml-auto font-body text-[12px] tabular-nums text-foreground/60">
                    {importance[i]} / <span className="text-accent">{result[i]}</span>
                  </span>
                </div>
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
                  className="mt-1 w-full h-1 accent-foreground"
                  aria-label={`Важность: ${s.name}`}
                />
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={result[i]}
                  onChange={(e) =>
                    setResult((p) => p.map((v, j) => (j === i ? +e.target.value : v)))
                  }
                  className="mt-0.5 w-full h-1 accent-[hsl(var(--accent))]"
                  aria-label={`Результат: ${s.name}`}
                />
              </div>
            ))}
          </div>
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
            {nbsp("Почему вопрос ")}
            <strong>{nbsp("куда вложить деньги")}</strong>
            {nbsp(" — самый последний. И что должно появиться раньше любых инвестиций.")}
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

      <ArticleSection>
        <ArticleFlow>
          <p>
            {nbsp("Вы несколько лет хорошо зарабатывали. Или получили крупную премию, продали квартиру или бизнес. На руках — свободный миллион, 3, 5, 10... Вроде бы начинается приятная часть — распоряжаться этими деньгами. Но вместе с ними приходят и риски.")}
          </p>
          <p>
            <strong>{nbsp("Чем больше сумма, тем выше цена ошибки.")}</strong>
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* Цитата эксперта */}
      <ArticleSection>
        <ArticleFlow>
          <figure className="bg-card border border-border rounded-2xl p-6 md:p-10">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0">
                <img
                  src={expertAvatar}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-top scale-125"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3">
                <blockquote className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
                  {nbsp("В этой статье я расскажу, как избежать этих рисков и дам инструмент диагностики, как найти сферы вложения под ваши личные цели и ценности, не только по доходности.")}
                </blockquote>
                <figcaption className="font-body text-[15px] md:text-base leading-snug text-foreground/80">
                  <strong className="text-foreground">{nbsp("Василий Мещеряков")}</strong>
                  {", "}
                  {nbsp("автор книги «Ленивый бюджет»")}
                </figcaption>
              </div>
            </div>
          </figure>
        </ArticleFlow>
      </ArticleSection>


      {/* Продавцы */}
      <ArticleSection id="prodavcy">
        <ArticleFlow>
          <H2>{nbsp("Ваши деньги притягивают «продавцов счастья»")}</H2>
          <p>
            {nbsp("Вокруг появляются люди, которые точно знают, как их вложить: недвижимость, бизнес, закрытый клуб, криптовалюта. Они давно не похожи на мошенников: офисы, договоры, известные партнёры. ")}
            <strong>{nbsp("Чем выше ваш доход, тем качественнее вам продают.")}</strong>
          </p>
        </ArticleFlow>
      </ArticleSection>

      <Figure
        src={sellersImg}
        alt="Банкир, брокер, застройщик и предприниматель — каждый продаёт свой продукт"
        caption="Честный товар не значит подходящий вам"
      />

      <ArticleSection>
        <ArticleFlow>
          <p>
            {nbsp("Но главный риск — не мошенники. Брокер предложит инвестиционный продукт. Застройщик — квартиру. Предприниматель, которому нужны деньги, — долю в своём бизнесе. И каждый будет честен: квартира существует, облигация настоящая, бизнес работает. ")}
            <strong>{nbsp("Только они продают то, что выгодно им, а не вам.")}</strong>
          </p>
        </ArticleFlow>
      </ArticleSection>


      {/* Депозит */}
      <ArticleSection id="depozit">
        <ArticleFlow>
          <H2>{nbsp("Депозит: коварное спокойствие")}</H2>
          <p>
            {nbsp("«Тогда просто депозит», — скажете вы. Спокойно: деньги в банке, проценты капают, ничего делать не нужно. Но вопросы никуда не деваются: какую часть капитала держать в банках, что делать с суммой выше страхового покрытия, в какой валюте хранить, что останется после инфляции.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      <Figure
        src={depositImg}
        alt="Копилка спит в надёжном сейфе, но сейф стоит на тающей льдине"
        caption="Депозит защищает от воров, но не от инфляции и не от несбывшихся целей"
      />

      <ArticleSection>
        <ArticleFlow>
          <p>
            <strong>{nbsp("Но главный вопрос — достаточно ли этой доходности для ваших целей?")}</strong>{" "}
            {nbsp("Можно несколько лет радоваться хорошей ставке, а потом обнаружить: капитал вырос — а нужная квартира, образование детей или пассивный доход не приблизились.")}
          </p>
        </ArticleFlow>
      </ArticleSection>


      <ArticleSection>
        <ArticleFlow>
          <H2>
            {nbsp("В бизнесе это очевидно, а в личных финансах — почему-то нет")}
          </H2>
        </ArticleFlow>
      </ArticleSection>


      {/* Методика */}
      <ArticleSection id="plan">
        <ArticleFlow>
          <p>
            {nbsp("Предлагаю на минуту отложить выбор между депозитом, квартирой и облигациями и ответить на вопрос: если у вас есть свободные деньги — ")}
            <strong>{nbsp("у вас есть финансовый план?")}</strong>{" "}
            {nbsp("Не список активов в приложении брокера и не абстрактное «хочу финансовую свободу».")}
          </p>
          <p>
            {nbsp("Вы могли находить в интернете стандартный рецепт: посчитайте доходы и расходы, накопите подушку, поставьте цели и потом наполняйте его инструментами. ")}
            <strong>{nbsp("Всё правильно, но в реальности не работает.")}</strong>
          </p>
          <p>
            {nbsp("Хотя вы понимаете, что бизнесом движет не бухгалтерский учёт, а коммерческая функция: поиск, где купить за рубль и продать за сто. Бизнес-план будет хоть на салфетке, но в нём поставлены цели: на что мы тратим и за счёт каких действий получим прибыль. Может при этом быть кривым и косым — но заточенным под одну главную возможность. Математика обслуживает её, а всё остальное написано крупными мазками.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      <Figure
        src={napkinImg}
        alt="План на салфетке рядом с закрытой бухгалтерской книгой"
        caption="Бизнес-план на салфетке работает, если в нём есть главная возможность"
      />

      <ArticleSection>
        <ArticleFlow>
          <Pull>{nbsp("Простота и понятность плана важнее его правильности.")}</Pull>
          <p>
            <strong>{nbsp("Личный финансовый план")}</strong>{" "}
            {nbsp("— это как в бизнесе, не про учёт расходов, а про поиск точки приложения ваших усилий. И я предлагаю вам следующие 5 минут сделать пару шагов в сторону вашего личного бизнес-плана.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* С чего начинается личный финансовый план */}
      <ArticleSection>
        <ArticleFlow>
          <H2>{nbsp("С чего начинается личный финансовый план")}</H2>
          <p>
            {nbsp("Универсального шаблона не существует: чужой бизнес-план можно скачать, но докручивать придётся под себя. Каркас общий — доходы, расходы, финансовая подушка, цели, капитал... Но это скелет, а не план. План — то, куда конкретно вы приложите усилия.")}
          </p>
          <p>
            {nbsp("Первый вопрос я задаю: а как вы мыслите? То есть я пытаюсь понять, а что в принципе человек думает про деньги, как он размышляет? Все мы умеем планировать свою жизнь, но выражаем это разными словами, фиксируем разными способами. Тут важно понять тот, который будет вам органичен. Иначе вы забросите это дело через 2 недели.")}
          </p>
          <p className="font-semibold">
            {nbsp("Я выделяю 3 группы людей:")}
          </p>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row gap-5">
              <div className="md:w-1/3">
                <img
                  src={cardNumbersImg}
                  alt="Человек работает с таблицей и диаграммой на ноутбуке"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-[4/3] md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("Вы дружите с цифрами")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Собираем модель в Excel. Иногда подробную, иногда предельно простую: какая сумма есть и какие у неё сценарии. Моя роль — помочь настроить и упростить: вы видели одну свою таблицу, я — тысячу.")}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row-reverse gap-5">
              <div className="md:w-1/3">
                <img
                  src={cardTablesImg}
                  alt="Простой план на салфетке с крупными цифрами и стрелками"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-[4/3] md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("Вы не любите таблицы")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Составляем простейший план: заработаю столько-то, потрачу столько-то, останется столько-то; умножаем на десять лет — хватает ли на жизнь? Если нет, ищем, где усилить. Часто это карьерный план или план роста бизнеса, а финансовый план остаётся одной большой цифрой.")}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row gap-5">
              <div className="md:w-1/3">
                <img
                  src={cardBothImg}
                  alt="Стол с бюджетной таблицей, блокнотом и стикерами"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-[4/3] md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("И то, и другое")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Один базовый табличный элемент, от которого отталкиваемся, — например бюджет. Его прорабатываем подробно: доходы, расходы или инвестиционный план. А всё остальное докручиваем без таблиц.")}
                </p>
              </div>
            </div>
          </div>

          <p>
            {nbsp("Работая с чужими бюджетами, я заметил странную вещь: все фокусируются на расходах. Доход дан «по умолчанию», а расходы экономят, оптимизируют, налаживают эффективность. Складывается ощущение, что никто не хочет больше зарабатывать — все хотят эффективнее тратить.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* Дерево доходов */}
      <ArticleSection>
        <ArticleFlow>
          <H2>{nbsp("Дерево роста доходов")}</H2>
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
        </ArticleFlow>
      </ArticleSection>

      <Figure
        src={mindmapImg}
        alt="Ментальная карта источников дохода: зарплата, бизнес, инвестиции, сдача недвижимости, фриланс"
        caption="Ментальная карта источников дохода — отправная точка для роста"
      />


      <ArticleSection>
        <ArticleFlow>
          <H3>
            Расходы: не&nbsp;«где сэкономить», а&nbsp;«что я&nbsp;покупаю
            на&nbsp;самом деле»
          </H3>
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
        </ArticleFlow>
      </ArticleSection>

      {/* Качество жизни */}
      <ArticleSection id="kachestvo">
        <ArticleFlow>
          <H2>
            Во&nbsp;что вы&nbsp;на&nbsp;самом деле инвестируете: как измерить
            качество жизни
          </H2>
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
          <Pull>
            Качество жизни измеряется не&nbsp;ценой вещей, а&nbsp;тем,
            в&nbsp;какие сферы жизни на&nbsp;самом деле уходят деньги.
          </Pull>
        </ArticleFlow>
      </ArticleSection>




      {/* Колесо сфер */}
      <ArticleSection id="koleso">
        <ArticleFlow>
          <H3>Колесо сфер жизни: важность и&nbsp;результат</H3>
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
        </ArticleFlow>

        <div className="container-px max-w-5xl mx-auto mt-6 md:mt-8">
          <Wheel />
        </div>

        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            Если по&nbsp;какой-то сфере терракотовая линия отстала
            от&nbsp;тёмной — вы&nbsp;нашли место, где деньги и&nbsp;время могут
            купить больше качества жизни, чем любая инвестиция. Это тоже часть
            финансового плана: не&nbsp;только «куда вложить капитал»,
            но&nbsp;и&nbsp;«куда направить расходы, чтобы жизнь стала лучше уже
            сейчас».
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* Пример */}
      <ArticleSection>
        <ArticleFlow>
          <H2>
            Одни и&nbsp;те&nbsp;же 5&nbsp;миллионов — четыре разных правильных
            решения
          </H2>
          <p>
            Только после того, как собран план, появляется смысл обсуждать
            инструменты. Смотрите, как одна и&nbsp;та&nbsp;же сумма превращается
            в&nbsp;четыре разных правильных решения — в&nbsp;зависимости
            от&nbsp;плана человека.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
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

          <p>
            Инструмент один. Правильное решение — разное. И&nbsp;выбрать его
            можно не&nbsp;по&nbsp;принципу «где сейчас обещают больше
            процентов», а&nbsp;по&nbsp;тому, насколько каждый вариант приближает
            вас к&nbsp;нужному результату. Без плана вы&nbsp;фактически сначала
            выбираете ответ — а&nbsp;потом пытаетесь придумать, к&nbsp;какому
            вопросу он подходит.
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* Два формата */}
      <ArticleSection id="format">
        <ArticleFlow>
          <H2>Как собрать свой план: курс или&nbsp;персональный разбор</H2>
          <p>У&nbsp;меня два формата работы, и&nbsp;логика у&nbsp;них разная.</p>

          <div className="grid gap-4 md:grid-cols-2">
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
        </ArticleFlow>
      </ArticleSection>

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
