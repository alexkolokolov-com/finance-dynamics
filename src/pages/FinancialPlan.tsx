import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { ArticleSection } from "@/components/article/ArticleSection";
import { ArticleFlow } from "@/components/article/ArticleFlow";
import { H2 } from "@/components/article/H2";
import { H3 } from "@/components/article/H3";
import { Pull } from "@/components/article/Pull";
import { Figure } from "@/components/article/Figure";
import { ArticleToc } from "@/components/article/ArticleToc";
import { nbsp } from "@/lib/nbsp";
import { Varioqub } from "@/components/Varioqub";
import { handleDiagnosticClick } from "@/lib/ymGoals";
import heroImg from "@/assets/plan-hero.jpg";
import sellersImg from "@/assets/plan-sellers.jpg";
import depositImg from "@/assets/plan-deposit.jpg";
import cardNumbersImg from "@/assets/plan-card-numbers.jpg";
import cardTablesImg from "@/assets/plan-card-tables.jpg";
import cardBothImg from "@/assets/plan-card-both.jpg";
import person1Img from "@/assets/plan-person-1.jpg";
import person2Img from "@/assets/plan-person-2.jpg";
import person3Img from "@/assets/plan-person-3.jpg";
import person4Img from "@/assets/plan-person-4.jpg";
import stress1Img from "@/assets/stress-1.jpg";
import stress2Img from "@/assets/stress-2.jpg";
import stress3Img from "@/assets/stress-3.jpg";
import stress4Img from "@/assets/stress-4.jpg";
import stress5Img from "@/assets/stress-5.jpg";


import icHealth from "@/assets/wheel-health.png";
import icEducation from "@/assets/wheel-education.png";
import icHome from "@/assets/wheel-home.png";
import icFamily from "@/assets/wheel-family.png";
import icImpressions from "@/assets/wheel-impressions.png";
import icTime from "@/assets/wheel-time.png";
import icRelations from "@/assets/wheel-relations.png";
import icFinance from "@/assets/wheel-finance.png";
import expertAvatar from "@/assets/expert-vasily.jpg";




const people = [
  {
    num: "Человек 1",
    img: person1Img,
    text: (
      <>
        Доход стабилен, целей в&nbsp;ближайшие 10&nbsp;лет нет, подушка собрана.
        Его 5&nbsp;млн разумно инвестировать на&nbsp;долгий срок,
        спокойно переживая колебания рынка.
      </>
    ),
  },
  {
    num: "Человек 2",
    img: person2Img,
    text: (
      <>
        Через два года – покупка квартиры. Его 5&nbsp;млн – это будущий
        первоначальный взнос. Правильное решение: консервативные инструменты
        с&nbsp;понятной датой возврата, а&nbsp;не&nbsp;доходность.
      </>
    ),
  },
  {
    num: "Человек 3",
    img: person3Img,
    text: (
      <>
        Доход высокий, но&nbsp;неровный, подушки нет. Его первые деньги должны
        стать резервом. Инвестировать на&nbsp;15&nbsp;лет ему пока рано, хотя
        именно это ему и&nbsp;посоветуют.
      </>
    ),
  },
  {
    num: "Человек 4",
    img: person4Img,
    text: (
      <>
        Через два года деньги понадобятся на&nbsp;бизнес. Ему вообще
        не&nbsp;стоит сейчас брать на&nbsp;себя инвестиционный риск, какой бы
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
                Разрывов почти нет: важность и&nbsp;результат совпадают.
                Это редкая и&nbsp;хорошая ситуация.
              </>
            ) : (
              <>
                Самый большой разрыв – <strong className="text-accent">
                  {SPHERES[gap.idx].name.toLowerCase()}
                </strong>{" "}
                ({gap.value} баллов). Именно здесь деньги и&nbsp;время могут
                купить больше качества жизни, чем любая инвестиция.
              </>
            )}
          </p>
        </div>

        {/* Ползунки – в том же фрейме, за разделителем */}
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
    document.title = "Вы заработали деньги. Теперь главное – не потерять их";
    const content =
      "Почему вопрос «куда вложить деньги» – последний, а не первый. Личный финансовый план как бизнес-план вашей жизни: доходы, расходы, качество жизни и колесо сфер в деньгах.";
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
      <ArticleToc title="Содержание" />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="container-px max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="font-display font-semibold leading-[1.08] tracking-tight text-[clamp(2rem,5.4vw,3.6rem)]">
            Вы&nbsp;заработали деньги. Теперь главное –{" "}
            <span className="italic font-normal text-accent">
              не&nbsp;потерять их
            </span>
          </h1>
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl mx-auto">
            {nbsp("Почему вопрос ")}
            <strong>{nbsp("куда вложить деньги")}</strong>
            {nbsp(" – самый последний. И что должно появиться раньше любых инвестиций.")}
          </p>

        </div>

        <div className="md:container-px md:max-w-5xl md:mx-auto mt-10 md:mt-14">
          <img
            src={heroImg}
            alt="Человек с мешком денег на перекрёстке: банк, квартира, инвестиции"
            width={1600}
            height={912}
            className="w-full h-auto aspect-[16/10] object-cover object-center bg-card md:aspect-auto md:object-contain md:rounded-2xl md:border md:border-border"
          />
        </div>
      </section>

      <ArticleSection>
        <ArticleFlow>
          <p>
            {nbsp("Вы несколько лет хорошо зарабатывали. Или получили крупную премию, продали квартиру или бизнес. На руках – свободный миллион, 3, 5, 10... Вроде бы начинается приятная часть: распоряжаться этими деньгами. Но вместе с ними приходят и риски.")}
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
            <blockquote className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
              {nbsp("В этой статье расскажу, как избежать самых главных рисков для вас и дам инструмент диагностики, чтобы достигать максимального результата.")}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 md:gap-4">
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 block">
                <img
                  src={expertAvatar}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-top scale-125"
                  loading="lazy"
                />
              </span>
              <span className="font-body text-[15px] md:text-base leading-snug text-foreground/80">
                <strong className="text-foreground">{nbsp("Василий Мещеряков")}</strong>
                {", "}
                {nbsp("автор книги «Ленивый бюджет»")}
              </span>
            </figcaption>
          </figure>
        </ArticleFlow>
      </ArticleSection>


      {/* Продавцы */}
      <ArticleSection id="prodavcy">
        <ArticleFlow>
          <H2>{nbsp("Риск 1. Ваши деньги притягивают «продавцов счастья»")}</H2>
          <p>
            {nbsp("Вокруг появляются люди, которые точно знают, как их вложить: недвижимость, бизнес, закрытый клуб, криптовалюта. Они давно не похожи на мошенников: офисы, договоры, известные партнёры. ")}
            <strong>{nbsp("Чем выше ваш доход, тем качественнее вам продают.")}</strong>
          </p>
        </ArticleFlow>
      </ArticleSection>

      <Figure
        src={sellersImg}
        alt="Банкир, брокер, застройщик и предприниматель – каждый продаёт свой продукт"
        caption="Честный товар не значит подходящий вам"
      />

      <ArticleSection>
        <ArticleFlow>
          <p>
            {nbsp("Но главный риск не в мошенниках. Брокер предложит инвестиционный продукт. Застройщик – квартиру. Предприниматель, которому нужны деньги, – долю в своём бизнесе. И каждый будет честен: квартира существует, облигация настоящая, бизнес работает. ")}
            <strong>{nbsp("Только они продают то, что выгодно им, а не вам.")}</strong>
          </p>
          <p>
            {nbsp("И мотивация их ясна: они зарабатывают на том, что вам предлагают. Именно поэтому вы всегда видите товар «с наилучшей стороны». Принесёт ли это максимальную выгоду вам? 99%, что нет! Удачных кейсов среди таких инвестиций я встречал единицы. Но вот желающих подсказать вам всегда будут сотни.")}
          </p>

        </ArticleFlow>
      </ArticleSection>


      {/* Депозит */}
      <ArticleSection id="depozit">
        <ArticleFlow>
          <H2>{nbsp("Риск 2. Депозит: коварное спокойствие")}</H2>
          <p>
            {nbsp("«Тогда просто депозит», – скажете вы. Спокойно: деньги в банке, проценты капают, ничего делать не нужно. Но вопросы никуда не деваются: какую часть капитала держать в банках, что делать с суммой выше страхового покрытия, в какой валюте хранить, что останется после инфляции.")}
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
            <strong>{nbsp("Но главный вопрос: достаточно ли этой доходности для ваших целей?")}</strong>{" "}
            {nbsp("Можно несколько лет радоваться хорошей ставке, а потом обнаружить: капитал вырос, а нужная квартира, образование детей или пассивный доход не приблизились.")}
          </p>
        </ArticleFlow>
      </ArticleSection>


      <ArticleSection>
        <ArticleFlow>
          <H2>
            {nbsp("Риск 3. В бизнесе это очевидно, а в личных финансах почему-то нет")}

          </H2>
        </ArticleFlow>
      </ArticleSection>


      {/* Методика */}
      <ArticleSection id="plan">
        <ArticleFlow>
          <p>
            {nbsp("Предлагаю на минуту отложить выбор между депозитом, квартирой и облигациями и ответить на вопрос: ")}
            <strong>{nbsp("у вас финансовый план-то есть?")}</strong>{" "}

            {nbsp("Не список активов в приложении брокера и не абстрактное «хочу финансовую свободу».")}
          </p>
          <p>
            {nbsp("Вы могли находить в интернете стандартный рецепт: посчитайте доходы и расходы, накопите подушку, поставьте цели и потом наполняйте его инструментами. ")}
            <strong>{nbsp("Всё правильно, но в реальности не работает.")}</strong>
          </p>
          <p>
            {nbsp("Возьмем для примера бизнес. Бизнесом движет не бухгалтерский учёт, а коммерческая функция: поиск выгоды, оптимизаций, построение планов, где купить за рубль и продать за сто. Бизнес-план может быть хоть на салфетке, но в нём всегда есть взгляд в будущее: за счёт каких действий мы получим прибыль. План может при этом быть кривым и косым, потому что его эффективность важнее. Точная математика важна уже после того, как этот план написан.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      <ArticleSection>
        <ArticleFlow>
          <Pull>{nbsp("Простота и понятность плана важнее его правильности.")}</Pull>
          <p>
            <strong>{nbsp("Личный финансовый план")}</strong>
            {nbsp(", как в бизнесе, не про учёт расходов, а про поиск точки приложения ваших усилий. И я предлагаю вам следующие 5 минут сделать пару шагов в сторону вашего личного бизнес-плана.")}
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* С чего начинается личный финансовый план */}
      <ArticleSection>
        <ArticleFlow>
          <H2>{nbsp("С чего начинается личный финансовый план")}</H2>
          <p>
            {nbsp("Универсального шаблона не существует: чужой бизнес-план можно скачать, но докручивать придётся под себя. Каркас общий – доходы, расходы, финансовая подушка, цели, капитал... Но это скелет, а не план. План показывает, куда конкретно вы приложите усилия.")}
          </p>
          <p>
            {nbsp("Форма конечно важна, но не критична. Чаще всего это конечно таблицы (Excel, Google sheets и т.д.), но может быть доска Miro, где стикерами формируем ход мыслей. Может быть блокнот, или тетрадь. Да хоть рисунки, главное понять, как вы в принципе планируете жизнь и думаете о ней. А финансовый план уже подстраивается под ваш ход мыслей.")}
          </p>
          <p>
            {nbsp("Первый вопрос, который я обычно задаю: а как вы мыслите? То есть я пытаюсь понять, а что в принципе человек думает про деньги, как он размышляет? Все мы умеем планировать свою жизнь, но выражаем это разными словами, фиксируем разными способами. Тут важно понять тот, который будет вам органичен. Иначе вы забросите это дело через 2 недели.")}
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
                  className="w-full h-auto md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 toc={false} className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("Вы дружите с цифрами")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Собираем модель в Excel. Иногда подробную, иногда предельно простую: какая сумма есть и какие у неё сценарии. Моя роль – помочь настроить и упростить: вы видели одну свою таблицу, я – тысячу.")}
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
                  className="w-full h-auto md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 toc={false} className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("Вы не любите таблицы")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Тогда сначала ищем форму. Это может быть доска Miro со стикерами. Может быть блокнот, или тетрадь. Записи «на салфетке», или любой другой удобный вам способ. Главное осознать: применять сложную математику вообще не обязательно! Вам не понадобится ничего дальше знаний 5-го класса.")}
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
                  className="w-full h-auto md:aspect-auto md:h-full md:object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <H3 toc={false} className="text-[clamp(1.1rem,2vw,1.3rem)]">
                  {nbsp("И то, и другое")}
                </H3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/80">
                  {nbsp("Один базовый табличный элемент, от которого отталкиваемся, – например бюджет. Его прорабатываем подробно: доходы, расходы или инвестиционный план. А всё остальное докручиваем без таблиц.")}
                </p>
              </div>
            </div>
          </div>

          <p>
            {nbsp("Работая с чужими бюджетами, я заметил странную вещь: все фокусируются на расходах. Доход дан «по умолчанию», а расходы экономят, оптимизируют, налаживают эффективность. Складывается ощущение, что никто не хочет больше зарабатывать, и все хотят эффективнее тратить.")}
          </p>
        </ArticleFlow>
      </ArticleSection>



      {/* Стресс-тест капитала */}
      <ArticleSection id="stress-test">
        <ArticleFlow>
          <H2>{nbsp("Стресс-тест вашего капитала")}</H2>

          <p>
            {nbsp("Сначала я бы на время забыл про инвестиционные инструменты. Допустим, у вас есть те самые 3–5–10 млн рублей, неважно, где они сейчас лежат: на депозите, брокерском счёте или просто ждут решения. Прежде чем куда-то их вкладывать, я бы прогнал эти деньги через пять простых вопросов.")}
          </p>

          <Pull>
            {nbsp("Это не тест на финансовую грамотность: правильных и неправильных ответов здесь нет. Это проверка одного: понимаете ли вы, какую работу должны выполнить ваши деньги.")}
          </Pull>

          <H3>{nbsp("1. Когда вам понадобятся эти деньги?")}</H3>
          <p>
            {nbsp("Самый простой вопрос, который почему-то часто пропускают. Если деньги не понадобятся вам 15 лет – это один капитал. Если через два года вы хотите купить квартиру, совершенно другой. А если вы пока не знаете, будете ли через год покупать квартиру, переезжать в другую страну или открывать бизнес, то это третий. Хотя сумма на счёте во всех трёх случаях может быть одинаковой.")}
          </p>
          <p>
            {nbsp("Поэтому попробуйте ответить не «на долгий срок», а конкретнее:")}
          </p>
          <ul className="list-disc pl-5">
            <li>{nbsp("какая часть этих денег точно не понадобится мне 10+ лет;")}</li>
            <li>{nbsp("какая может понадобиться через 3–5 лет;")}</li>
            <li>{nbsp("какая должна быть доступна в любой момент.")}</li>
          </ul>
        </ArticleFlow>
        <Figure
          src={stress1Img}
          alt="Иллюстрация: деньги на разные сроки"
          caption={nbsp("Одна и та же сумма – это три разных капитала с разными сроками")}
        />
        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            {nbsp("Очень часто уже на этом этапе оказывается, что никаких «6 млн для инвестиций» у вас нет. Есть 1 млн резерва, 3 млн на квартиру через три года и ещё 2 млн действительно долгосрочного капитала. Относиться к этим трём суммам одинаково довольно странно.")}
          </p>

          <H3>{nbsp("2. Что должно произойти благодаря этим деньгам?")}</H3>
          <p>
            {nbsp("Здесь обычно появляется ответ: «Ну… они должны расти». Но рост капитала сам по себе довольно бессмысленная цель. Вопрос не в количестве денег на счёте, а в том, что они позволяют сделать. Например:")}
          </p>
          <ul className="list-disc pl-5">
            <li>{nbsp("перестать зависеть от зарплаты к 50 годам;")}</li>
            <li>{nbsp("купить квартиру без ипотеки через пять лет;")}</li>
            <li>{nbsp("оплачивать образование детей;")}</li>
            <li>{nbsp("иметь возможность год не работать;")}</li>
            <li>{nbsp("переехать или открыть свой бизнес;")}</li>
            <li>{nbsp("просто больше тратить сейчас и не чувствовать за это вину.")}</li>
          </ul>
        </ArticleFlow>
        <Figure
          src={stress2Img}
          alt="Иллюстрация: деньги превращаются в события жизни"
          caption={nbsp("Важно не сколько денег на счёте, а что они позволяют сделать")}
        />
        <ArticleFlow className="mt-6 md:mt-8">
          <Pull>
            {nbsp("Последний пункт ничем не хуже остальных. Финансовый план нужен не только для того, чтобы больше накопить: иногда его задача – доказать человеку, что он уже может больше тратить.")}
          </Pull>

          <H3>{nbsp("3. Хватит ли вам вообще этих денег?")}</H3>
          <p>
            {nbsp("10 млн рублей могут быть одновременно и большой суммой, и совершенно недостаточным капиталом. Всё зависит от того, какие цели уже стоят в очереди на эти деньги.")}
          </p>
          <p>
            {nbsp("Как-то ко мне пришёл клиент с вопросом: «Куда мне вложить 18 млн?» Он перебирал недвижимость, облигации, акции, фонды, крипту и хотел всё диверсифицировать и сделать максимально грамотно. А потом мы начали собирать финансовый план, и выяснилось, что в ближайшие несколько лет эти деньги уже расписаны: квартира побольше через 2–3 года, университет для старшего ребёнка ещё через четыре, и собственный бизнес, который он всерьёз хотел запустить.")}
          </p>
        </ArticleFlow>
        <Figure
          src={stress3Img}
          alt="Иллюстрация: капитал распадается на будущие траты"
          caption={nbsp("Часть капитала уже распределена, просто вы об этом пока не посчитали")}
        />
        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            {nbsp("И внезапно оказалось, что инвестиционного капитала у него нет: деньги уйдут не на одно, так на другое.")}
          </p>
          <Pull>
            {nbsp("Самое неприятное, что первоначальное решение выглядело бы технически безупречным: хороший брокер собрал бы хороший портфель, хороший консультант подобрал бы хорошую квартиру.")}
          </Pull>
          <p>
            {nbsp("Ошибка была бы не в инструменте, а в том, что человек вложил деньги, которые у него есть только номинально. Для инвестиций их нет. И через два года ему пришлось бы продавать активы тогда, когда нужны деньги, а не тогда, когда это выгодно.")}
          </p>

          <H3>{nbsp("4. Что произойдёт, если ваша жизнь изменится?")}</H3>
          <p>
            {nbsp("Этот вопрос особенно важен для длинных планов: на горизонте 10–20 лет почти наверняка что-нибудь пойдёт не так, как задумано. Появится ребёнок, вы решите переехать, уйдёте из найма, доход вырастет вдвое или временно упадёт, захочется купить дом, помочь родителям, взять год перерыва.")}
          </p>
        </ArticleFlow>
        <Figure
          src={stress4Img}
          alt="Иллюстрация: план выдерживает повороты жизни"
          caption={nbsp("Хороший план не угадывает жизнь, а выдерживает её повороты")}
        />
        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            {nbsp("Поэтому хороший финансовый план – это не таблица, которая пытается угадать вашу жизнь до 2046 года. Его задача в другом: выдерживать изменения этой жизни.")}
          </p>
          <Pull>
            {nbsp("Я проверяю планы одним вопросом: что должно произойти, чтобы план перестал работать? Если небольшое отклонение от сценария ломает всю конструкцию, прогноз пора корректировать.")}
          </Pull>

          <H3>{nbsp("5. А точно ли эти деньги нужно инвестировать?")}</H3>
          <p>
            {nbsp("Наверное, самый странный вопрос для статьи про капитал. Но иногда лучше не инвестировать деньги вообще. Потратить миллион на образование, которое заметно увеличит доход. Вложиться в собственный бизнес. Купить квартиру и убрать огромную статью будущих расходов. Взять полгода без работы, потратить больше на здоровье или на путешествия с детьми сейчас, а не когда им будет 25 лет.")}
          </p>
        </ArticleFlow>
        <Figure
          src={stress5Img}
          alt="Иллюстрация: выбор между ростом цифры и жизнью"
          caption={nbsp("Деньги существуют для жизни, а не жизнь для цифры на счёте")}
        />
        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            {nbsp("Мы привыкли считать, что финансово грамотный человек должен постоянно превращать деньги в ещё большее количество денег. Мне кажется, это перевёрнутая логика.")}
          </p>
          <Pull>
            {nbsp("Деньги существуют для жизни, а не для увеличения цифры на брокерском счёте.")}
          </Pull>
          <p>
            {nbsp("Поэтому прежде чем распределять капитал между акциями, облигациями, депозитами и недвижимостью, я бы сделал ещё одну вещь.")}
          </p>
        </ArticleFlow>

      </ArticleSection>





      {/* Колесо сфер */}
      <ArticleSection id="koleso">
        <ArticleFlow>
          <H2>Колесо сфер жизни: важность и&nbsp;результат</H2>
          <p>
            В&nbsp;классических методиках диагностики просят оценить каждую
            сферу жизни от&nbsp;1&nbsp;до&nbsp;10: «насколько
            вы&nbsp;довольны». Но&nbsp;это оценка настроения,
            а&nbsp;не&nbsp;факта.
          </p>
          <p>
            Я&nbsp;предлагаю две точки вместо одной, обе
            по&nbsp;десятибалльной шкале: насколько сфера вам важна,
            и&nbsp;какой у&nbsp;вас в&nbsp;ней результат сейчас. Важность –
            это ваши слова. Результат – это факты: здоровье, жильё,
            отношения, время. И&nbsp;разрыв между этими двумя оценками
            – самая честная диагностика, которая у&nbsp;вас есть: именно
            он&nbsp;подсказывает, куда направить деньги и&nbsp;время
            в&nbsp;первую очередь.
          </p>
          <p>
            Попробуйте прямо здесь. Поставьте два ползунка по&nbsp;каждой
            сфере и&nbsp;посмотрите на&nbsp;своё колесо.
          </p>
        </ArticleFlow>

        <div className="container-px max-w-5xl mx-auto mt-6 md:mt-8">
          <Wheel />
        </div>

        <ArticleFlow className="mt-6 md:mt-8">
          <p>
            Если по&nbsp;какой-то сфере терракотовая линия отстала
            от&nbsp;тёмной, вы&nbsp;нашли место, где деньги и&nbsp;время могут
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
            Одни и&nbsp;те&nbsp;же 5&nbsp;миллионов дают четыре разных правильных
            решения
          </H2>
          <p>
            Только после того, как собран план, появляется смысл обсуждать
            инструменты. Смотрите, как одна и&nbsp;та&nbsp;же сумма превращается
            в&nbsp;четыре разных правильных решения – в&nbsp;зависимости
            от&nbsp;плана человека.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {people.map((p) => (
              <div
                key={p.num}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"
              >
                <img
                  src={p.img}
                  alt=""
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover bg-card border-b border-border/70"
                />
                <div className="p-5">
                  <div className="font-body text-xs uppercase tracking-[0.1em] text-accent mb-2">
                    {p.num}
                  </div>
                  <p className="font-body text-[15px] leading-relaxed text-foreground/80">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p>
            Инструмент один. Правильное решение: разное. И&nbsp;выбрать его
            можно не&nbsp;по&nbsp;принципу «где сейчас обещают больше
            процентов», а&nbsp;по&nbsp;тому, насколько каждый вариант приближает
            вас к&nbsp;нужному результату. Без плана вы&nbsp;фактически сначала
            выбираете ответ, а&nbsp;потом пытаетесь придумать, к&nbsp;какому
            вопросу он подходит.
          </p>
        </ArticleFlow>
      </ArticleSection>

      {/* Блок эксперта */}
      <ArticleSection className="mb-10 md:mb-14">
        <ArticleFlow>
          <H2>{nbsp("Давайте поговорим")}</H2>
          <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
            {nbsp("Многие ищут правильный инвестиционный продукт, не поняв сначала, чего хотят от жизни.")}
          </p>
          <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
            {nbsp("А это решается через Финансовый план. Приходите на Диагностику – моя команда расскажет, как раз и навсегда разобраться со сложностями в доходах, расходах, финансовых целях и их достижении.")}
          </p>
          <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
            {nbsp("После заполнения анкеты с вами свяжется менеджер и персонально разберет вашу ситуацию.")}
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              href="https://nivz.getcourse.ru/diagnostic_article2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDiagnosticClick}
              className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-accent text-background font-body text-[15px] font-medium whitespace-nowrap hover:bg-foreground transition-colors"
            >
              {nbsp("Записаться на диагностику")}
            </a>
            <span className="flex items-center gap-3">
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 block">
                <img
                  src={expertAvatar}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-top scale-125"
                  loading="lazy"
                />
              </span>
              <span className="font-body text-[15px] leading-snug text-foreground/80">
                <strong className="text-foreground">{nbsp("Василий Мещеряков")}</strong>
                <br />
                {nbsp("автор книги «Ленивый бюджет»")}
              </span>
            </span>
          </div>

          <p className="font-body text-sm text-foreground/70 mt-4">
            {nbsp("Диагностика бесплатна и ни к чему не обязывает")}
          </p>
        </ArticleFlow>
      </ArticleSection>


      <Varioqub antiFlicker />

      <Footer />
    </main>
  );
};

export default FinancialPlan;
