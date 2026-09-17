import { useEffect, useMemo, useRef, useState } from "react";
import firstHalfIllustration from "@/assets/longevity-first-half.jpg";
import turnIllustration from "@/assets/longevity-turn.jpg";
import secondActIllustration from "@/assets/longevity-second-act.jpg";
import thirdHalfIllustration from "@/assets/longevity-third-half.jpg";
import {
  longevityStoryPeople,
  type StoryPerson,
} from "@/data/longevityStoryPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const xPct = (age: number) => 4 + (Math.min(age, MAX_AGE) / MAX_AGE) * 92;
const yByLevel = { 1: 54, 2: 65, 3: 76 } as const;
const TIMELINE_GEOMETRY = {
  start: 4,
  end: 96,
  firstEnd: xPct(40),
  secondEnd: xPct(80),
  crisisStart: xPct(35),
  crisisEnd: xPct(45),
  crisisCenter: xPct(40),
} as const;

const chapters = [
  {
    id: 1,
    range: "0–40",
    title: "Первая половина",
    paragraphs: [
      "Примерно с 20 вы работаете — это ваш активный доход. Достигаете базовых целей — семья, жильё и т. д. Ставите новые цели.",
    ],
    accent: true,
  },
  {
    id: 2,
    range: "35–45",
    title: "Точка перелома",
    paragraphs: [
      "Опыта и ресурсов становится больше. Но вместе с ними растут обязательства — дети, жильё, родители, бизнес, здоровье.",
      "Хочу ли я ещё двадцать лет жить по той же финансовой модели?",
    ],
    quote: true,
  },
  {
    id: 4,
    range: "40–80",
    title: "Вторая половина",
    paragraphs: [
      "Новый бизнес. Новая профессия. Новый масштаб. Иногда — после провала первой карьеры.",
    ],
  },
  {
    id: 5,
    range: "80",
    title: "Обычно карта заканчивается здесь",
    paragraphs: [
      "Финансовые планы редко представляют человека после восьмидесяти кем-то кроме пенсионера. Но линия жизни на этом не заканчивается.",
    ],
  },
  {
    id: 6,
    range: "80–100",
    title: "Роль меняется. Субъектность остаётся.",
    paragraphs: [
      "Можно передать операционную роль, но продолжать создавать, консультировать, инвестировать и влиять.",
    ],
  },
  {
    id: 7,
    range: "100+",
    title: "После ста меняется сам тип доказательства",
    paragraphs: [
      "Способность учиться, создавать, работать и ставить новые задачи не обрывается в день столетия.",
    ],
  },
  {
    id: 8,
    range: "110–122",
    title: "Дальше точек мало — и это важно",
    paragraphs: [
      "После 110 лет активная деятельность становится исключительной редкостью. Край шкалы — документально подтверждённые 122 года Жанны Кальман.",
    ],
  },
] as const;

const storySteps = chapters.flatMap((item) => [
  { key: `${item.id}-zone`, item, phase: "zone" as const },
  { key: `${item.id}-card`, item, phase: "card" as const },
]);

const personLine = (name: string) => {
  const words = name.split(" ");
  return [words[0] ?? "", words.slice(1).join(" ")] as const;
};

const sortedPeople = [...longevityStoryPeople].sort((first, second) => first.age - second.age || first.id.localeCompare(second.id));

const mapGroups = [
  { range: "40-80", title: "Вторая половина", people: sortedPeople.filter((person) => person.age < 80) },
  { range: "80-120", title: "Третья половина", people: sortedPeople.filter((person) => person.age >= 80) },
];

const layoutPins = (people: StoryPerson[], start: number, end: number, levels: number, gap: number) => {
  const lastX = Array.from({ length: levels }, () => Number.NEGATIVE_INFINITY);

  return people.map((person, index) => {
    const ratio = (Math.min(Math.max(person.age, start), end) - start) / (end - start);
    const x = 8 + ratio * 84;

    const seed = index % 2 === 0 ? 0 : 1;
    const order: number[] = [];
    for (let step = 0; step < levels; step += 1) order.push((seed + step * 2) % levels);
    for (let level = 0; level < levels; level += 1) if (!order.includes(level)) order.push(level);

    let level = order.find((candidate) => x - lastX[candidate] >= gap);
    if (level === undefined) {
      level = lastX.reduce((best, value, current) => (value < lastX[best] ? current : best), 0);
    }
    lastX[level] = x;

    return { person, x, y: levels === 1 ? 50 : (level / (levels - 1)) * 100 };
  });
};

const GroupTimeline = ({ range, title, people, levels, gap, areaClassName }: { range: string; title: string; people: StoryPerson[]; levels: number; gap: number; areaClassName: string }) => {
  const [start, end] = range.split("-").map(Number);
  const pins = useMemo(() => layoutPins(people, start, end, levels, gap), [people, start, end, levels, gap]);

  return (
    <div className={`flex min-h-0 flex-col rounded-lg border border-dashed bg-transparent ${start >= 80 ? "border-[hsl(var(--longevity-third)/0.9)]" : "border-[hsl(var(--longevity-second)/0.8)]"}`}>
      <div className="shrink-0 px-4 py-4 md:px-5">
        <p className={`font-display text-4xl font-semibold leading-none ${start >= 80 ? "text-[hsl(var(--longevity-third-foreground))]" : "text-accent"}`}>{nbsp(range)}</p>
        <p className="mt-2 font-display text-lg font-semibold leading-none md:text-xl">{nbsp(title)}</p>
      </div>

      <div className={`relative flex-1 ${areaClassName}`}>
        {pins.map(({ person, x, y }, index) => {
          const [firstName, lastName] = personLine(person.name);
          return (
            <div
              key={person.id}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 hover:z-40 focus-within:z-40"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div tabIndex={0} role="button" aria-label={`${person.name}, ${person.age}`} className="flex w-[104px] items-center rounded-full border-2 border-accent bg-card pr-1.5 shadow-paper transition-transform duration-200 group-hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-display text-[10px] font-semibold text-accent-foreground">{person.age}</span>
                <span className="min-w-0 px-1.5 py-1 text-left">
                  <span className="block truncate font-body text-[10px] font-semibold leading-none">{nbsp(firstName)}</span>
                  {lastName ? <span className="mt-0.5 block truncate font-body text-[10px] leading-none text-foreground/70">{nbsp(lastName)}</span> : null}
                </span>
              </div>
              <div className={`pointer-events-none absolute bottom-[calc(100%+8px)] w-[min(15rem,72vw)] rounded-lg border border-border bg-card p-3 opacity-0 shadow-hard transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 ${x > 60 ? "right-0" : "left-0"}`}>
                <p className="font-body text-xs font-semibold text-accent">{nbsp(person.role)}</p>
                <p className="mt-1.5 font-body text-sm leading-snug">{nbsp(person.turn)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid shrink-0 grid-cols-3 border-t border-dashed border-border/60 px-4 py-2 font-body text-[10px] text-muted-foreground">
        <span>{start}</span><span className="text-center">{start + 20}</span><span className="text-right">{end}</span>
      </div>
    </div>
  );
};




const chapterImage = (chapter: number) => {
  if (chapter === 1) return firstHalfIllustration;
  if (chapter === 2) return turnIllustration;
  if (chapter === 4 || chapter === 5) return secondActIllustration;
  return thirdHalfIllustration;
};

const axisWidth = (chapter: number) => {
  if (chapter === 1) return 30;
  if (chapter === 2) return 34;
  if (chapter === 4 || chapter === 5) return 61;
  if (chapter === 6) return 88;
  return chapter >= 7 ? 96 : 30;
};

const Zone = ({ className, visible, range, title, start, end, labelClassName = "", rangeClassName = "text-accent", delay = 0 }: { className: string; visible: boolean; range: string; title: string; start: number; end: number; labelClassName?: string; rangeClassName?: string; delay?: number }) => (
  <div
    className={`absolute bottom-0 origin-left rounded-lg border border-dashed border-border transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${className} ${
      visible ? "scale-x-100 opacity-100" : "scale-x-[0.94] opacity-0"
    }`}
    style={{ left: `${start}%`, width: `${end - start}%`, transitionDelay: visible ? `${delay}ms` : "0ms" }}
  >
    <div className={`absolute inset-x-2 top-4 text-left sm:inset-x-4 sm:top-6 ${labelClassName}`}>
      <p className={`whitespace-nowrap font-display text-[clamp(2rem,4.2vw,4rem)] font-semibold leading-none ${rangeClassName}`}>{nbsp(range)}</p>
      <p className="mt-3 font-display text-[clamp(0.95rem,1.7vw,1.5rem)] font-semibold leading-[0.95] text-foreground">
        {title.split(" ").map((word) => <span key={word} className="block sm:inline">{nbsp(word)}<span className="hidden sm:inline"> </span></span>)}
      </p>
    </div>
  </div>
);

const CrisisMarker = ({ visible }: { visible: boolean }) => {
  const left = TIMELINE_GEOMETRY.crisisStart;
  const width = TIMELINE_GEOMETRY.crisisEnd - TIMELINE_GEOMETRY.crisisStart;

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute bottom-0 z-[5] h-[55%] rounded-lg border border-dashed border-[hsl(var(--longevity-crisis)/0.35)] bg-[hsl(var(--longevity-crisis)/0.08)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${visible ? "scale-x-100 opacity-100" : "scale-x-[0.94] opacity-0"}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />

      <div
        className={`absolute bottom-[55%] z-20 flex -translate-x-full translate-y-1/2 items-center transition-[opacity,transform] duration-500 motion-reduce:transition-none ${visible ? "opacity-100" : "translate-y-[calc(50%+0.5rem)] opacity-0"}`}
        style={{ left: `${TIMELINE_GEOMETRY.crisisStart}%` }}
      >
        <div className="rounded-md bg-accent px-3 py-2 text-left text-accent-foreground shadow-paper sm:px-4">
          <p className="whitespace-nowrap font-display text-xl font-semibold leading-none sm:text-2xl">{nbsp("35-45")}</p>
          <p className="mt-1 whitespace-nowrap font-display text-sm font-semibold leading-none">{nbsp("Кризис")}</p>
        </div>
        <span aria-hidden="true" className="h-px w-3 bg-accent sm:w-5" />
      </div>
    </>
  );
};

export const LifeTimeline = () => {
  const [chapter, setChapter] = useState(1);
  const [phase, setPhase] = useState<"zone" | "card">("zone");
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const syncChapter = () => {
      frame = 0;
      const viewportAnchor = window.innerHeight * 0.5;
      let nearestChapter = 1;
      let nearestPhase: "zone" | "card" = "zone";
      let nearestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportAnchor);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestChapter = Number(node.dataset.chapter);
          nearestPhase = node.dataset.phase === "card" ? "card" : "zone";
        }
      });

      setChapter((current) => current === nearestChapter ? current : nearestChapter);
      setPhase((current) => current === nearestPhase ? current : nearestPhase);
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncChapter);
    };

    syncChapter();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const zoneVisibility = useMemo(
    () => ({
      first: chapter >= 1,
      turn: chapter >= 2,
      second: chapter >= 4,
      third: chapter >= 6,
    }),
    [chapter],
  );

  return (
    <>
      <div id="timeline" className="relative scroll-mt-16">
        <div data-timeline-scene className="pointer-events-none sticky top-16 z-10 flex h-[calc(100vh-4rem)] items-center justify-center px-2 sm:px-5">
          <div className="relative h-[min(590px,76vh)] w-full max-w-[1420px] overflow-hidden rounded-lg border border-border bg-card shadow-paper">
            <div className="absolute inset-x-3 bottom-5 top-5 sm:inset-x-8 sm:bottom-7 sm:top-7">
              <div className="absolute inset-x-0 bottom-[8%] top-[2%]">
                <Zone className="h-[40%] border-[hsl(var(--longevity-first)/0.8)] bg-[hsl(var(--longevity-first)/0.5)]" rangeClassName="text-[hsl(var(--longevity-first-foreground))]" start={TIMELINE_GEOMETRY.start} end={TIMELINE_GEOMETRY.firstEnd} visible={zoneVisibility.first} range="0-40" title="Первая половина" />
                <Zone className="h-[70%] border-[hsl(var(--longevity-second)/0.8)] bg-[hsl(var(--longevity-second)/0.42)]" start={TIMELINE_GEOMETRY.firstEnd} end={TIMELINE_GEOMETRY.secondEnd} labelClassName="pl-2 sm:pl-5" visible={zoneVisibility.second} range="40-80" title="Вторая половина" delay={140} />
                <Zone className="h-full border-[hsl(var(--longevity-third)/0.9)] bg-[hsl(var(--longevity-third)/0.46)]" rangeClassName="text-[hsl(var(--longevity-third-foreground))]" start={TIMELINE_GEOMETRY.secondEnd} end={TIMELINE_GEOMETRY.end} visible={zoneVisibility.third} range="80-120" title="Третья половина" delay={180} />
                <CrisisMarker visible={zoneVisibility.turn} />
              </div>
              <div className="absolute left-[4%] right-[4%] top-[92%] h-px bg-border" />
              <div className="absolute left-[4%] top-[92%] h-0.5 bg-foreground transition-[width] duration-1000 ease-out motion-reduce:transition-none" style={{ width: `${axisWidth(chapter)}%` }} />
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                 <div key={tick} className="absolute top-[calc(92%+14px)] -translate-x-1/2 font-body text-[10px] text-muted-foreground sm:text-xs" style={{ left: `${xPct(tick)}%` }}>
                  <span className="absolute -top-[14px] left-1/2 h-2 w-px bg-muted-foreground" />{tick}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-30 -mt-[calc(100vh-4rem)] pointer-events-none">
          {storySteps.map(({ key, item, phase: stepPhase }, index) => (
            <section
              key={key}
              data-story-step
              data-chapter={item.id}
              data-phase={stepPhase}
              ref={(node) => { stepRefs.current[index] = node; }}
              className={`flex items-center px-4 sm:px-[5vw] ${stepPhase === "zone" ? "min-h-[62vh]" : "min-h-[92vh] py-[10vh]"} ${item.id % 2 ? "justify-start" : "justify-end"}`}
            >
              {stepPhase === "card" ? (
                <div className={`pointer-events-none w-[92vw] overflow-hidden rounded-lg border border-border bg-card/95 shadow-hard backdrop-blur-md transition-[opacity,transform] duration-500 motion-reduce:transition-none sm:w-[50vw] lg:w-[33vw] ${chapter === item.id && phase === "card" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                    <img src={chapterImage(item.id)} alt="" aria-hidden="true" loading="lazy" width={1536} height={1024} className="h-full w-full scale-125 object-cover mix-blend-multiply" />
                  </div>
                  <div className="p-5 sm:p-7">
                    {item.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraph} className={`font-body leading-snug ${"accent" in item && item.accent || "quote" in item && item.quote && paragraphIndex === 1 ? "text-[clamp(1.15rem,2.3vw,1.8rem)] font-semibold" : "text-base sm:text-lg"} ${paragraphIndex ? "mt-4" : ""}`}>{nbsp(paragraph)}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <section className="relative z-40 border-t border-border bg-background px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <h2 className="font-display text-4xl font-semibold leading-none sm:text-7xl">{nbsp("Посмотрите, у вас все еще впереди!")}</h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-foreground/75">{nbsp("Наведите на точку и вспомните истории людей, которые преодолели кризисы и после 40 реализовали себя. А также тех, кто и после 80 продолжает активную жизнь!")}</p>
          </div>

          <div className="mt-10 hidden h-[520px] grid-cols-2 gap-3 md:grid">
            {mapGroups.map((group) => <GroupTimeline key={group.range} {...group} />)}
          </div>

          <div className="mt-10 space-y-5 md:hidden">
            {mapGroups.map((group) => <GroupTimeline key={group.range} {...group} />)}
          </div>
        </div>
      </section>

      <section className="relative z-40 grid min-h-[88vh] place-items-center bg-background px-5 py-24 text-center">
        <div className="max-w-5xl">
          <h2 className="font-display text-5xl font-semibold leading-[0.94] sm:text-8xl">{nbsp("Долгая жизнь требует длинных денег.")}</h2>
          <p className="mx-auto mt-8 max-w-3xl font-body text-xl leading-relaxed text-foreground/75">{nbsp("Чем длиннее возможная активная жизнь, тем хуже работает финансовая стратегия, построенная вокруг идеи «до шестидесяти зарабатываю, потом как-нибудь живу на накопленное».")}</p>
          <p className="mx-auto mt-9 max-w-3xl font-body text-xs leading-relaxed text-muted-foreground">{nbsp("120 лет на этой странице — не прогноз продолжительности жизни. Это предельный сценарий, который помогает увидеть цену слишком короткого финансового горизонта.")}</p>
        </div>
      </section>

    </>
  );
};