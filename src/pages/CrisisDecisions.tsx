import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { StorySection } from "@/components/article/StorySection";
import heroImg from "@/assets/krizis-hero.jpg";
import cardsImg from "@/assets/krizis-cards.jpg";
import story1Img from "@/assets/krizis-story-1.jpg";
import story2Img from "@/assets/krizis-story-2.jpg";
import story3Img from "@/assets/krizis-story-3.jpg";

const stories = [
  {
    id: "istoriya-1",
    title: (
      <>
        История первая. <span className="italic font-normal text-accent">Инвестиционная</span>
      </>
    ),
    image: story1Img,
    alt: "График на экране телефона превращается в крючок с монетами-приманкой",
    side: "right" as const,
    paragraphs: [
      <>
        Как-то мне позвонила девушка, которая одна растит 2-х&nbsp;детей
        и&nbsp;очень много работает. Она решила улучшить финансовое положение
        и&nbsp;вложила серьёзные накопления в&nbsp;«интернет-биржу».
      </>,
      <>
        Дальше всё шло прекрасно. Она торговала, что-то покупала, продавала,
        прибыль росла — на&nbsp;экране денег стало вдвое больше. Но&nbsp;для
        вывода денег «биржа» попросила доплатить 400&nbsp;тыс&nbsp;руб: комиссия,
        налог, специальный счёт, или&nbsp;ещё что-то такое. После этого обещали
        вернуть вообще всё.
      </>,
      <>
        Меня спросили: мошенники? Я&nbsp;всеми силами объяснил: к&nbsp;сожалению,
        да. Деньги уже потеряны, ничего больше переводить нельзя.
      </>,
    ],
    comment: [
      <>Проходит примерно 2&nbsp;недели. Она мне снова звонит:</>,
      <span className="block text-foreground/75">
        «Василий, мы&nbsp;с&nbsp;ними ещё раз пообщались. Они пошли навстречу
        и&nbsp;теперь просят не&nbsp;400&nbsp;тысяч, а&nbsp;всего 200. Как
        думаете, может теперь заплатить?»
      </span>,
      <>Занавес 😐</>,
    ],

  },
  {
    id: "istoriya-2",
    title: (
      <>
        История вторая. <span className="italic font-normal text-accent">Бюджетная</span>
      </>
    ),
    image: story2Img,
    alt: "Человек в изнеможении лёг на стол, с которого свисает бесконечная лента расходов",
    side: "left" as const,
    paragraphs: [
      <>
        Клиент несколько лет исправно записывал вообще все расходы
        в&nbsp;CoinKeeper, чтобы четко понимать куда деваются деньги. Прям каждый
        рубль, каждую копейку, почти ежедневно.
      </>,
      <>
        В&nbsp;какой-то момент он настолько устал от&nbsp;собственного финансового
        учёта и&nbsp;тревоги из-за несошедшихся цифр (а&nbsp;они постоянно
        не&nbsp;сходились — бухгалтера меня поймут), что просто бросил его.
        И&nbsp;после этого пять лет вообще ничего не&nbsp;считал и&nbsp;не&nbsp;вёл.
        По&nbsp;моим оценкам, за&nbsp;эти 5&nbsp;лет он потерял ~2&nbsp;млн&nbsp;руб
        (на&nbsp;неэффективных расходах, откровенно слабых инвестициях
        и&nbsp;просто отсутствии внимания к&nbsp;деньгам).
      </>,
    ],
    comment: (
      <>
        Мне ужасно нравится эта история. Человек несколько лет занимался личными
        финансами настолько тщательно, что в&nbsp;результате перестал заниматься
        ими вообще 😂
      </>
    ),
  },
  {
    id: "istoriya-3",
    title: (
      <>
        История третья. <span className="italic font-normal text-accent">Семейная</span>
      </>
    ),
    image: story3Img,
    alt: "Пара сидит спиной друг к другу по обе стороны от стопки монет, соединённых нитью",
    side: "right" as const,
    paragraphs: [
      <>
        У&nbsp;меня была семья, которая почти развелась, тк&nbsp;не&nbsp;могла
        решить как распорядиться накоплениями.
      </>,
      <>
        Жена — очень любила путешествия/шоппинги/обучения и&nbsp;тратила всё
        в&nbsp;ноль. Муж — постоянно и&nbsp;очень разнообразно инвестировал,
        но&nbsp;прогорал. Оба — справедливо обвиняли друг друга, что принимают
        плохие финансовые решения.
      </>,
      <>
        Всё решил простейший инструмент, который я&nbsp;у&nbsp;них внедрил.
      </>,
    ],
    comment: (
      <>
        Но&nbsp;самый прикол в&nbsp;том, что я&nbsp;не&nbsp;знаю их&nbsp;финансового
        результата — как только они помирились (благодаря моему инструменту), они
        больше ни&nbsp;разу не&nbsp;пришли на&nbsp;консультацию.
        А&nbsp;в&nbsp;обратной связи написали, что я&nbsp;«хороший семейный
        психолог» 😊
      </>
    ),
  },
];


const steps = [
  {
    num: "1",
    title: "Выгрузить всё",
    text: "Выписываем вообще все нерешённые финансовые вопросы. Не по памяти, а полностью: пока вопрос в голове, он занимает в ней место.",
  },
  {
    num: "2",
    title: "Рассортировать по цене",
    text: "Решить всё одновременно невозможно. Какие вопросы ничего не стоят и могут подождать? Какие желательно решить? А какие способны изменить финансовое положение на миллионы рублей?",
  },
  {
    num: "3",
    title: "Месяц — один вопрос",
    text: "Дальше начинается самая сложная финансовая технология в мире: один месяц — один важный денежный вопрос.",
  },
];

const QUESTIONS = [
  "Ипотека: гасить досрочно или нет",
  "Куда инвестировать накопления",
  "Подушка: сколько и в какой валюте",
  "Инфляция и ставки по вкладам",
  "Курс доллара",
  "Откладывать детям",
  "Когда менять машину",
  "Пенсия и пассивный доход",
  "Страховки",
  "Налоги",
  "Переезд через пару лет",
  "Уйти из найма / открыть бизнес",
  "Кредиты и долги",
  "Как увеличить доход",
  "Недвижимость: покупать, продавать, сдавать",
  "«А вдруг завтра кризис»",
];

const verdict = (n: number) => {
  if (n === 0)
    return <>Пока ничего не отмечено. Отметьте честно — никто не смотрит.</>;
  if (n <= 3)
    return (
      <>
        <strong className="text-accent">Редкая ясность.</strong> У вас почти ничего
        не&nbsp;висит — берегите это.
      </>
    );
  if (n <= 8)
    return (
      <>
        <strong className="text-accent">Нормальная нагрузка.</strong> Но помните:
        хорошо принять одно решение — не&nbsp;значит хорошо принять восемь
        одновременно.
      </>
    );
  if (n <= 13)
    return (
      <>
        <strong className="text-accent">Зона перегрузки.</strong> Часть этих решений
        уже откладывается — или принимается на&nbsp;эмоциях.
      </>
    );
  return (
    <>
      <strong className="text-accent">Вы жонглёр.</strong> Задача — не&nbsp;лучше
      жонглировать, а&nbsp;убрать большую часть шаров.
    </>
  );
};


const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-[clamp(1.6rem,3.6vw,2.4rem)] mb-6">
    {children}
  </h2>
);

const CrisisDecisions = () => {
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    document.title = "Почему в кризис нужно принимать меньше финансовых решений";
    const content =
      "Три истории о том, как теряют деньги не от глупости, а от перегрузки решениями. Технология «один месяц — один важный денежный вопрос».";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  const toggle = (i: number) =>
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="container-px max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="font-display font-semibold leading-[1.08] tracking-tight text-[clamp(2rem,5.4vw,3.6rem)]">
            Почему в&nbsp;кризис нужно принимать{" "}
            <span className="italic font-normal text-accent">меньше</span>{" "}
            финансовых решений
          </h1>
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl mx-auto">
            Три истории о&nbsp;том, как теряют деньги не&nbsp;от&nbsp;глупости,
            а&nbsp;от&nbsp;перегрузки. И&nbsp;простая технология: один месяц —
            один важный денежный вопрос.
          </p>
        </div>


        <div className="container-px max-w-5xl mx-auto mt-10 md:mt-14">
          <img
            src={heroImg}
            alt="Человек жонглирует шарами с финансовыми символами и начинает их ронять"
            width={1600}
            height={912}
            className="w-full rounded-2xl border border-border"
          />
        </div>
      </section>

      <div id="istorii" className="scroll-mt-24">
        {stories.map((s) => (
          <StorySection key={s.id} {...s} />
        ))}
      </div>

      <section className="py-10 md:py-14">
        <div className="container-px max-w-3xl mx-auto">
          <H2>Что объединяет эти три истории?</H2>
          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Моя версия: это не&nbsp;глупость. Во&nbsp;всех трёх случаях люди были
            перегружены <strong>количеством финансовых решений</strong> —
            и&nbsp;все эти решения были важными.
          </p>
        </div>
      </section>


      <section id="paradoks" className="py-12 md:py-16 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>Чем больше зарабатываешь, тем тяжелее</H2>

          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Это одна из&nbsp;самых недооценённых проблем в&nbsp;личных
              финансах. И&nbsp;здесь есть парадокс: чем больше человек
              зарабатывает и&nbsp;чем серьёзнее занимается своими деньгами, тем
              актуальнее она становится.
            </p>
            <p>
              Что делать с&nbsp;ипотекой? Куда вложить накопления? Как учесть
              инфляцию? Как реагировать на&nbsp;курс доллара? Сколько держать
              в&nbsp;подушке и&nbsp;в&nbsp;какой валюте? Сколько откладывать
              детям? Когда менять машину? Как готовиться к&nbsp;пенсии?
              А&nbsp;если через два года переезд? А&nbsp;если хочется уйти
              из&nbsp;найма и&nbsp;открыть бизнес?
            </p>
          </div>

          <div className="my-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-7 bg-card border border-border rounded-2xl p-6 md:p-7">
            <div className="font-display font-semibold text-accent leading-none text-[clamp(2.6rem,6vw,4rem)] whitespace-nowrap">
              30–50
            </div>
            <p className="font-body text-[15px] md:text-base leading-relaxed text-foreground/75">
              нерешённых финансовых вопросов одновременно висит на&nbsp;человеке
              с&nbsp;хорошим доходом. Я&nbsp;специально посчитал. И&nbsp;все они
              важные, и&nbsp;все висят тяжёлым грузом.
            </p>
          </div>

          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Многие считают: если вы&nbsp;способны хорошо принять одно финансовое
            решение, то&nbsp;так же хорошо примете двадцать одновременно.{" "}
            <strong>Так не&nbsp;работает.</strong> Внимание размазывается, часть
            решений откладывается, часть принимается на&nbsp;эмоциях —
            и&nbsp;в&nbsp;итоге вы&nbsp;теряете деньги.
          </p>

          {/* счётчик вопросов */}
          <div className="mt-10 bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-display font-semibold text-xl">
              Посчитайте свои
            </h3>
            <p className="mt-2 font-body text-[15px] text-foreground/70">
              Отметьте вопросы, которые висят на&nbsp;вас прямо сейчас, —
              счётчик покажет вашу нагрузку.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {QUESTIONS.map((q, i) => {
                const on = checked.includes(i);
                return (
                  <button
                    key={q}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className={`font-body font-semibold text-[13px] rounded-full px-4 py-2 border transition-colors ${
                      on
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground/50"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 pt-6 border-t border-border flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div className="font-display font-semibold text-5xl leading-none text-accent md:min-w-[5.5rem] md:text-center">
                {checked.length}
              </div>
              <p className="font-body text-[15px] leading-relaxed text-foreground/75">
                {verdict(checked.length)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="krizis" className="py-12 md:py-16 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>А теперь добавьте к&nbsp;этому кризис</H2>

          <p className="font-body text-lg leading-relaxed text-foreground/80">
            К&nbsp;вашим условным тридцати нерешённым вопросам моментально
            добавляются новые. Именно в&nbsp;тот момент, когда особенно важно
            принимать хорошие финансовые решения, их&nbsp;количество резко
            возрастает.
          </p>
          <blockquote className="mt-8 pl-6 border-l-4 border-accent font-display font-semibold leading-[1.35] text-[clamp(1.3rem,2.6vw,1.8rem)]">
            Количество решений растёт —{" "}
            <span className="italic font-normal text-accent">
              качество каждого следующего падает
            </span>
            .
          </blockquote>
        </div>
      </section>

      <section
        id="strategiya"
        className="py-14 md:py-20 my-6 scroll-mt-24"
        style={{ background: "hsl(var(--accent-soft) / 0.35)" }}
      >
        <div className="container-px max-w-3xl mx-auto">
          <H2>Меньше решений, а&nbsp;не&nbsp;больше усилий</H2>

          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Поэтому моя стратегия подготовки к&nbsp;кризису звучит так:{" "}
            <strong>
              снизьте до&nbsp;минимума количество принимаемых финансовых решений.
            </strong>{" "}
            Несколько лет назад я&nbsp;начал использовать с&nbsp;клиентами простой
            подход из&nbsp;трёх шагов.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="font-display text-3xl leading-none text-accent mb-2">
                  {s.num}
                </div>
                <h3 className="font-display font-semibold text-base mb-2">
                  {s.title}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-foreground/75">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Например: в&nbsp;этом месяце разбираемся с&nbsp;недвижимостью.
            В&nbsp;следующем — с&nbsp;ростом дохода. Потом инвестиции, подушка,
            налоги, автомобиль, образование детей. Последовательность
            у&nbsp;каждого своя, потому что финансовая жизнь у&nbsp;каждого своя.
          </p>
        </div>
      </section>

      <figure className="container-px max-w-5xl mx-auto py-6">
        <img
          src={cardsImg}
          alt="Человек держит одну карту, позади — аккуратная стопка из двенадцати карт"
          loading="lazy"
          width={1600}
          height={912}
          className="w-full rounded-2xl border border-border"
        />
        <figcaption className="mt-3 text-center font-body text-sm text-foreground/55">
          Один месяц — один важный денежный вопрос
        </figcaption>
      </figure>

      <section className="py-12 md:py-16">
        <div className="container-px max-w-3xl mx-auto">
          <H2>
            Через год — не&nbsp;папка со&nbsp;статьями, а&nbsp;12&nbsp;закрытых
            проблем
          </H2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                text: "Папка с сохранёнными статьями, несколько купленных курсов и двадцать вопросов, которыми «обязательно надо когда-нибудь заняться».",
              },
              {
                text: "Двенадцать закрытых проблем. Финансы занимают в голове всё меньше места — и жизнь становится проще.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5"
              >
                <p className="font-body text-[15px] leading-relaxed text-foreground/80">
                  {c.text}
                </p>
              </div>
            ))}
          </div>


          <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-7 bg-card border border-border rounded-2xl p-6 md:p-7">
            <div className="font-display font-semibold text-accent leading-none text-[clamp(2.4rem,5.5vw,3.6rem)] whitespace-nowrap">
              2% → 24%
            </div>
            <p className="font-body text-[15px] md:text-base leading-relaxed text-foreground/75">
              так выросла средняя доходность капитала в&nbsp;рублях
              у&nbsp;тех, кто уже в&nbsp;работе.
            </p>
          </div>
        </div>
      </section>

      <section id="format" className="py-12 md:py-16 scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto">
          <H2>«12 самых важных денежных вопросов»</H2>

          <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/80">
            <p>
              Вокруг этой идеи я&nbsp;сейчас строю новый формат работы — условно
              я&nbsp;называю его «12&nbsp;самых важных денежных вопросов». Моя
              задача — не&nbsp;добавить вам ещё финансовой грамотности.
              Я&nbsp;просто помогаю есть «финансового слона» по&nbsp;частям.
            </p>
            <p>
              Если сейчас на&nbsp;вас одновременно висят ипотека, инвестиции,
              квартира, пенсия, дети, налоги, курс валют, карьера
              и&nbsp;«а&nbsp;вдруг завтра кризис» — моя задача не&nbsp;научить вас
              лучше жонглировать этими шарами.
            </p>
            <p>
              <strong>
                Моя задача — постепенно убрать большую часть шаров вообще.
              </strong>
            </p>
            <p>
              Тогда любой кризис вы&nbsp;встретите не&nbsp;человеком
              с&nbsp;пятьюдесятью нерешёнными денежными вопросами,
              а&nbsp;человеком, у&nbsp;которого финансовая жизнь уже собрана
              в&nbsp;систему — и&nbsp;которому нужно принять лишь несколько
              действительно важных решений. Это и&nbsp;есть финансовая
              устойчивость.
            </p>
          </div>
        </div>
      </section>

      <section id="diagnostika" className="py-16 md:py-24 bg-board text-background scroll-mt-24">
        <div className="container-px max-w-3xl mx-auto text-center">
          <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-[clamp(1.6rem,3.6vw,2.4rem)] mb-4">

            Сколько вопросов висит на&nbsp;вас прямо сейчас?
          </h2>
          <p className="font-body text-lg leading-relaxed text-background/85">
            На&nbsp;бесплатной диагностике выгрузим все ваши нерешённые денежные
            вопросы, рассортируем их&nbsp;по&nbsp;цене и&nbsp;составим очередь:
            какой вопрос вы&nbsp;закроете в&nbsp;этом месяце.
          </p>
          <a
            href="/consultations"
            className="mt-8 inline-flex items-center rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-[0.08em] px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
          >
            Записаться на&nbsp;диагностику
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

export default CrisisDecisions;
