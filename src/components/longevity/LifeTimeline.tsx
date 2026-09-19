import { useEffect, useMemo, useRef, useState } from "react";
import firstHalfIllustration from "@/assets/longevity-first-half.jpg";
import turnIllustration from "@/assets/longevity-turn.jpg";
import secondActIllustration from "@/assets/longevity-second-act.jpg";
import thirdHalfIllustration from "@/assets/longevity-third-half.jpg";
import { Slider } from "@/components/ui/slider";
import {
  longevityStoryPeople,
  type StoryPerson,
} from "@/data/longevityStoryPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const xPct = (age: number) => 4 + (Math.min(age, MAX_AGE) / MAX_AGE) * 92;
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
    id: 6,
    range: "80–120",
    title: "Третья половина",
    paragraphs: [
      "Роль может измениться, но способность создавать, консультировать, инвестировать и влиять остаётся.",
    ],
  },
] as const;


const personLine = (name: string) => {

  const words = name.split(" ");
  return [words[0] ?? "", words.slice(1).join(" ")] as const;
};

const sortedPeople = [...longevityStoryPeople].sort((first, second) => first.age - second.age || first.id.localeCompare(second.id));

const mapGroups = [
  { range: "40-80", title: "Вторая половина", people: sortedPeople.filter((person) => person.age < 80) },
  { range: "80-120", title: "Третья половина", people: sortedPeople.filter((person) => person.age >= 80) },
];

const PIN_WIDTH = 136;
const PIN_GAP = 12;
const PIN_ROW = 66;
const PIN_LEVELS = 5;
const PIN_LEVELS_NARROW = 7;

type Pin = { person: StoryPerson; x: number; level: number; ageOnRight: boolean };

const layoutPins = (people: StoryPerson[], start: number, end: number, width: number) => {
  const safeWidth = Math.max(width, 240);
  const baseLevels = safeWidth < 520 ? PIN_LEVELS_NARROW : PIN_LEVELS;
  const pillWidth = (PIN_WIDTH / safeWidth) * 100;
  const gap = (PIN_GAP / safeWidth) * 100;

  const lastRight = Array.from({ length: baseLevels }, () => Number.NEGATIVE_INFINITY);
  const pins: Pin[] = [];

  people.forEach((person, index) => {
    const ratio = (Math.min(Math.max(person.age, start), end) - start) / (end - start);
    const x = ratio * 100;
    const ageOnRight = ratio > 0.5;
    const pillLeft = ageOnRight ? x - pillWidth : x;
    const pillRight = ageOnRight ? x : x + pillWidth;

    const order: number[] = [];
    const seed = index % 2 === 0 ? 0 : Math.ceil(baseLevels / 2);
    for (let step = 0; step < baseLevels; step += 1) order.push((seed + step * 2) % baseLevels);
    for (let level = 0; level < baseLevels; level += 1) if (!order.includes(level)) order.push(level);

    const free = order.find((candidate) => pillLeft - lastRight[candidate] >= gap);
    const level = free ?? lastRight.length;
    if (free === undefined) lastRight.push(Number.NEGATIVE_INFINITY);

    lastRight[level] = pillRight;
    pins.push({ person, x, level, ageOnRight });
  });

  return { pins, levels: lastRight.length };
};


const GroupTimeline = ({ range, title, people }: { range: string; title: string; people: StoryPerson[] }) => {
  const [start, end] = range.split("-").map(Number);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = areaRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;
      setWidth((current) => (Math.abs(current - next) < 1 ? current : next));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { pins, levels } = useMemo(() => layoutPins(people, start, end, width), [people, start, end, width]);

  return (
    <div className={`flex min-h-0 flex-col rounded-lg border border-dashed bg-transparent ${start >= 80 ? "border-[hsl(var(--longevity-third)/0.9)]" : "border-[hsl(var(--longevity-second)/0.8)]"}`}>
      <div className="shrink-0 px-4 py-4 md:px-5">
        <p className={`font-display text-4xl font-semibold leading-none ${start >= 80 ? "text-[hsl(var(--longevity-third-foreground))]" : "text-accent"}`}>{nbsp(range)}</p>
        <p className="mt-2 font-display text-lg font-semibold leading-none md:text-xl">{nbsp(title)}</p>
      </div>

      <div ref={areaRef} className="relative flex-1 px-3 py-2" style={{ minHeight: `${levels * PIN_ROW}px` }}>
        {width > 0 ? pins.map(({ person, x, level, ageOnRight }) => {
          const [firstName, lastName] = personLine(person.name);
          const y = levels === 1 ? 50 : 6 + (level / (levels - 1)) * 88;
          return (
            <div
              key={person.id}
              className="group absolute z-10 -translate-y-1/2 hover:z-40 focus-within:z-40"
              style={{ left: `${x}%`, top: `${y}%`, transform: `translate(${ageOnRight ? "calc(-100% + 20px)" : "-20px"}, -50%)` }}
            >
              <div tabIndex={0} role="button" aria-label={`${person.name}, ${person.age}`} className={`flex w-[136px] items-center gap-1.5 rounded-full border border-accent/60 bg-card py-1 shadow-paper transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${ageOnRight ? "flex-row-reverse pl-2.5 pr-1" : "pl-1 pr-2.5"}`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-accent-foreground">{person.age}</span>
                <span className={`min-w-0 flex-1 ${ageOnRight ? "text-right" : "text-left"}`}>
                  <span className="block truncate font-body text-[13px] font-semibold leading-tight">{nbsp(firstName)}</span>
                  {lastName ? <span className="block truncate font-body text-[13px] leading-tight text-foreground">{nbsp(lastName)}</span> : null}
                </span>
              </div>
              <div className={`pointer-events-none absolute z-50 w-[min(17rem,78vw)] rounded-xl border border-foreground bg-foreground p-4 text-background opacity-0 shadow-hard transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 ${level < levels / 2 ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"} ${ageOnRight ? "right-0" : "left-0"}`}>
                <p className="font-body text-sm font-semibold leading-snug">{nbsp(person.role.charAt(0).toUpperCase() + person.role.slice(1))}</p>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-background/80">{nbsp(person.turn)}</p>
              </div>

            </div>
          );
        }) : null}
      </div>

      <div className="relative mx-4 mb-3 mt-2 grid shrink-0 grid-cols-3 border-t-[3px] border-foreground pt-2 font-body text-[10px] text-muted-foreground md:hidden">
        <span className="before:absolute before:left-0 before:top-0 before:h-2 before:w-px before:-translate-y-1/2 before:bg-foreground">{start}</span>
        <span className="relative text-center before:absolute before:left-1/2 before:top-[-8px] before:h-2 before:w-px before:-translate-x-1/2 before:bg-foreground">{start + 20}</span>
        <span className="relative text-right before:absolute before:right-0 before:top-[-8px] before:h-2 before:w-px before:bg-foreground">{end}</span>
      </div>
    </div>
  );
};





const chapterImage = (chapter: number) => {
  if (chapter === 1) return firstHalfIllustration;
  if (chapter === 2) return turnIllustration;
  if (chapter === 4) return secondActIllustration;
  return thirdHalfIllustration;
};

const axisWidth = (chapter: number) => {
  if (chapter === 1) return 30;
  if (chapter === 2) return 34;
  if (chapter === 4) return 61;
  return chapter === 6 ? 96 : 30;
};

const storyColumnClass = (chapter: number) => {
  if (chapter === 1) return "md:col-start-1 md:justify-self-start";
  if (chapter === 2) return "md:col-start-2 md:justify-self-start";
  if (chapter === 4) return "md:col-start-2 md:justify-self-center";
  return "md:col-start-3 md:justify-self-end";
};


const Zone = ({ className, visible, range, title, start, end, labelClassName = "", rangeClassName = "text-accent", delay = 0 }: { className: string; visible: boolean; range: string; title: string; start: number; end: number; labelClassName?: string; rangeClassName?: string; delay?: number }) => (
  <div
    className={`absolute bottom-0 origin-left rounded-lg border border-dashed border-border transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${className} ${
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
        className={`absolute bottom-0 z-[5] h-[55%] rounded-lg border border-dashed border-[hsl(var(--longevity-crisis)/0.35)] bg-[hsl(var(--longevity-crisis)/0.08)] transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${visible ? "scale-x-100 opacity-100" : "scale-x-[0.94] opacity-0"}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />

      <div
        className={`absolute bottom-[55%] z-20 flex -translate-x-full translate-y-1/2 items-center transition-[opacity,transform] duration-[900ms] motion-reduce:transition-none ${visible ? "opacity-100" : "translate-y-[calc(50%+0.5rem)] opacity-0"}`}
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

const OUT_MS = 180;
const IN_MS = 220;
const LOCK_MS = 520;
const GESTURE_GAP_MS = 90;
const WHEEL_THRESHOLD = 12;
const SWIPE_THRESHOLD = 40;

export const LifeTimeline = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const phaseRef = useRef<"idle" | "out" | "in">("idle");
  const lockUntilRef = useRef(0);
  const lastWheelRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const touchStartRef = useRef<number | null>(null);
  const maxIndex = chapters.length - 1;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  const goTo = (nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), maxIndex);
    if (bounded === indexRef.current || phaseRef.current !== "idle") return;

    const outMs = reducedMotion ? 120 : OUT_MS;
    const inMs = reducedMotion ? 120 : IN_MS;

    phaseRef.current = "out";
    setPhase("out");
    lockUntilRef.current = performance.now() + outMs + inMs + 120;

    timersRef.current.push(window.setTimeout(() => {
      indexRef.current = bounded;
      setIndex(bounded);
      phaseRef.current = "in";
      setPhase("in");

      timersRef.current.push(window.setTimeout(() => {
        phaseRef.current = "idle";
        setPhase("idle");
      }, inMs));
    }, outMs));
  };

  const canStep = (direction: number) => {
    const next = indexRef.current + direction;
    return next >= 0 && next <= maxIndex;
  };

  const isPinned = () => {
    const node = trackRef.current;
    if (!node) return false;
    const rect = node.getBoundingClientRect();
    return rect.top <= 64 && rect.bottom >= window.innerHeight;
  };

  const step = (direction: number) => {
    const now = performance.now();
    if (phaseRef.current !== "idle" || now < lockUntilRef.current) return;
    goTo(indexRef.current + direction);
    lockUntilRef.current = performance.now() + LOCK_MS;
  };

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
      if (Math.abs(delta) < WHEEL_THRESHOLD) return;
      const direction = delta > 0 ? 1 : -1;
      if (!isPinned() || !canStep(direction)) return;

      event.preventDefault();
      const now = performance.now();
      const continuation = now - lastWheelRef.current < GESTURE_GAP_MS;
      lastWheelRef.current = now;
      if (continuation) return;
      step(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const current = event.touches[0]?.clientY;
      if (start === null || current === undefined) return;
      const delta = start - current;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      const direction = delta > 0 ? 1 : -1;
      if (!isPinned() || !canStep(direction)) return;
      event.preventDefault();
      touchStartRef.current = current;
      step(direction);
    };

    const onTouchEnd = () => {
      touchStartRef.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keys: Record<string, number> = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
      const direction = keys[event.key];
      if (!direction) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.getAttribute("role") === "slider")) return;
      if (!isPinned() || !canStep(direction)) return;
      event.preventDefault();
      step(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, maxIndex]);

  const activeChapter = chapters[index];
  const chapter = activeChapter.id;

  const zoneVisibility = useMemo(
    () => ({
      first: chapter >= 1,
      turn: chapter >= 2,
      second: chapter >= 4,
      third: chapter >= 6,
    }),
    [chapter],
  );

  const cardStyle = () => {
    const duration = phase === "out" ? (reducedMotion ? 120 : OUT_MS) : reducedMotion ? 120 : IN_MS;
    if (phase === "out") {
      return { opacity: 0, transform: reducedMotion ? "none" : "translateY(-28px)", transitionDuration: `${duration}ms` };
    }
    if (phase === "in") {
      return { opacity: 1, transform: "translateY(0px)", transitionDuration: `${duration}ms` };
    }
    return { opacity: 1, transform: "translateY(0px)", transitionDuration: `${duration}ms` };
  };

  return (
    <>
      <div id="timeline" ref={trackRef} className="relative h-[180vh] scroll-mt-16">
        <div data-timeline-scene className="pointer-events-none sticky top-16 z-10 flex h-[calc(100vh-4rem)] items-center justify-center px-2 sm:px-5">
          <div className="relative h-[min(590px,76vh)] w-full max-w-[1420px] overflow-hidden rounded-lg border border-border bg-card shadow-paper">
            <div className="pointer-events-auto absolute inset-x-4 top-4 z-30 flex items-center gap-4 sm:inset-x-8 sm:top-5">
              <p className="hidden min-w-40 font-body text-sm text-muted-foreground sm:block">{nbsp(`${activeChapter.range} · ${activeChapter.title}`)}</p>
              <Slider
                aria-label={nbsp("Перемотка таймлайна")}
                min={0}
                max={maxIndex}
                step={1}
                value={[index]}
                onValueChange={(value) => {
                  const nextIndex = value[0];
                  if (typeof nextIndex !== "number") return;
                  goTo(nextIndex);
                }}
                className="min-w-0 flex-1"
              />
            </div>
            <div className="absolute inset-x-3 bottom-5 top-16 sm:inset-x-8 sm:bottom-7 sm:top-20">
              <div className="absolute inset-x-0 bottom-[8%] top-[2%]">
                <Zone className="h-[40%] border-[hsl(var(--longevity-first)/0.8)] bg-[hsl(var(--longevity-first)/0.5)]" rangeClassName="text-[hsl(var(--longevity-first-foreground))]" start={TIMELINE_GEOMETRY.start} end={TIMELINE_GEOMETRY.firstEnd} visible={zoneVisibility.first} range="0-40" title="Первая половина" />
                <Zone className="h-[70%] border-[hsl(var(--longevity-second)/0.8)] bg-[hsl(var(--longevity-second)/0.42)]" start={TIMELINE_GEOMETRY.firstEnd} end={TIMELINE_GEOMETRY.secondEnd} labelClassName="pl-2 sm:pl-5" visible={zoneVisibility.second} range="40-80" title="Вторая половина" delay={80} />
                <Zone className="h-full border-[hsl(var(--longevity-third)/0.9)] bg-[hsl(var(--longevity-third)/0.46)]" rangeClassName="text-[hsl(var(--longevity-third-foreground))]" start={TIMELINE_GEOMETRY.secondEnd} end={TIMELINE_GEOMETRY.end} visible={zoneVisibility.third} range="80-120" title="Третья половина" delay={100} />
                <CrisisMarker visible={zoneVisibility.turn} />
              </div>
              <div className="absolute left-[4%] right-[4%] top-[92%] h-px bg-border" />
              <div className="absolute left-[4%] top-[92%] h-0.5 bg-foreground transition-[width] duration-[320ms] ease-out motion-reduce:transition-none" style={{ width: `${axisWidth(chapter)}%` }} />
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                 <div key={tick} className="absolute top-[calc(92%+14px)] -translate-x-1/2 font-body text-[10px] text-muted-foreground sm:text-xs" style={{ left: `${xPct(tick)}%` }}>
                  <span className="absolute -top-[14px] left-1/2 h-2 w-px bg-muted-foreground" />{tick}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-4 top-[9vh] z-20 grid grid-cols-1 sm:inset-x-[5vw] md:grid-cols-3">
              <div
                data-story-node
                data-story-card
                data-chapter={activeChapter.id}
                className={`col-start-1 row-start-1 w-[92vw] overflow-hidden rounded-lg border border-border bg-card/95 shadow-hard backdrop-blur-md transition-[opacity,transform] ease-out will-change-transform sm:w-[28rem] md:w-[20rem] lg:w-[22rem] xl:w-[24rem] ${storyColumnClass(activeChapter.id)}`}
                style={cardStyle()}
              >
                <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                  <img src={chapterImage(activeChapter.id)} alt="" aria-hidden="true" width={1536} height={1024} className="h-full w-full scale-125 object-cover mix-blend-multiply" />
                </div>
                <div className="p-5 sm:p-7">
                  {activeChapter.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraph} className={`font-body leading-snug ${("accent" in activeChapter && activeChapter.accent) || ("quote" in activeChapter && activeChapter.quote && paragraphIndex === 1) ? "text-[clamp(1.15rem,2.3vw,1.8rem)] font-semibold" : "text-base sm:text-lg"} ${paragraphIndex ? "mt-4" : ""}`}>{nbsp(paragraph)}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="relative z-40 border-t border-border bg-card px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <h2 className="font-display text-4xl font-semibold leading-none sm:text-7xl">{nbsp("Посмотрите, у вас все еще впереди!")}</h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-foreground/75">{nbsp("Наведите на точку и вспомните истории людей, которые преодолели кризисы и после 40 реализовали себя. А также тех, кто и после 80 продолжает активную жизнь!")}</p>
          </div>

          <div className="mt-10 hidden md:block">
            <div className="grid grid-cols-2 items-stretch gap-4">
              {mapGroups.map((group) => <GroupTimeline key={group.range} {...group} />)}
            </div>
            <div className="relative mx-4 mt-4 border-t-[3px] border-foreground pt-3">
              {[40, 60, 80, 100, 120].map((tick) => (
                <span
                  key={tick}
                  className="absolute top-3 -translate-x-1/2 font-body text-xs text-muted-foreground before:absolute before:left-1/2 before:top-[-14px] before:h-2.5 before:w-px before:-translate-x-1/2 before:bg-foreground"
                  style={{ left: `${((tick - 40) / 80) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-5 md:hidden">
            {mapGroups.map((group) => <GroupTimeline key={`m-${group.range}`} {...group} />)}
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