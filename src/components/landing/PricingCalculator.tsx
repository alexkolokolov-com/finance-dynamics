import { useMemo, useState } from "react";
import { Check, Copy, Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nbsp } from "@/lib/nbsp";

type PriceMode = "official" | "promo" | "webinar";
type CourseId = "budget" | "cashflow" | "invest" | "all";
type SupportId = "none" | "curator" | "vasily";

type Course = {
  id: CourseId;
  number?: string;
  name: string;
  official: number;
  promo: number;
  webinar: number;
  bundle?: boolean;
};

type Support = {
  id: Exclude<SupportId, "none">;
  name: string;
  unit: number;
  three: number;
  threeList: number;
};

const courses: Course[] = [
  { id: "budget", number: "1", name: "Ленивый бюджет", official: 30_000, promo: 19_000, webinar: 14_000 },
  { id: "cashflow", number: "2", name: "Денежный поток", official: 40_000, promo: 29_000, webinar: 24_000 },
  { id: "invest", number: "3", name: "Разумные инвестиции", official: 70_000, promo: 49_000, webinar: 44_000 },
  { id: "all", name: "Весь курс", official: 140_000, promo: 79_000, webinar: 69_000, bundle: true },
];

const modes: { id: PriceMode; label: string; shortLabel: string }[] = [
  { id: "official", label: "Официальная цена", shortLabel: "Официальная" },
  { id: "promo", label: "Акция до 1 октября", shortLabel: "Акция" },
  { id: "webinar", label: "Цена на вебинаре", shortLabel: "На вебинаре" },
];

const supports: Support[] = [
  { id: "curator", name: "С куратором", unit: 10_000, three: 20_000, threeList: 30_000 },
  { id: "vasily", name: "С Василием", unit: 20_000, three: 40_000, threeList: 60_000 },
];

export type CalculatorSelection = {
  course: CourseId;
  mode: PriceMode;
  support: SupportId;
  curatorSteps: number;
  vasilySteps: number;
};

export const initialCalculatorSelection: CalculatorSelection = {
  course: "budget",
  mode: "promo",
  support: "none",
  curatorSteps: 1,
  vasilySteps: 1,
};

const initialState = initialCalculatorSelection;


const rub = (value: number) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

const supportPrice = (support: Support | undefined, steps: number) => {
  if (!support) return 0;
  if (steps === 3) return support.three;
  if (steps === 2) return support.unit * 2 - 5_000;
  return support.unit;
};

const supportSaving = (support: Support | undefined, steps: number) => {
  if (!support) return 0;
  if (steps === 3) return support.threeList - support.three;
  if (steps === 2) return 5_000;
  return 0;
};

type PricingCalculatorProps = {
  pdfMode?: boolean;
  /** Управляемый выбор (нужен, чтобы в PDF попал именно выбранный вариант) */
  selection?: CalculatorSelection;
  onSelectionChange?: (selection: CalculatorSelection) => void;
};

export const PricingCalculator = ({ pdfMode = false, selection, onSelectionChange }: PricingCalculatorProps) => {
  const [innerState, setInnerState] = useState(initialState);
  const [copied, setCopied] = useState(false);

  const state = selection ?? innerState;
  const setState = (updater: (current: CalculatorSelection) => CalculatorSelection) => {
    const next = updater(state);
    if (selection) onSelectionChange?.(next);
    else setInnerState(next);
  };

  const selectedCourse = courses.find((course) => course.id === state.course) ?? courses[0];
  const selectedSupport = state.support === "none" ? undefined : supports.find((support) => support.id === state.support);
  const supportSteps = selectedSupport ? state[`${selectedSupport.id}Steps`] : 0;
  const supportCost = supportPrice(selectedSupport, supportSteps);
  const total = selectedCourse[state.mode] + supportCost;
  const saving = selectedCourse.official - selectedCourse[state.mode] + supportSaving(selectedSupport, supportSteps);
  const selectedMode = modes.find((mode) => mode.id === state.mode) ?? modes[0];

  const summary = useMemo(() => {
    const supportLine = selectedSupport
      ? `${selectedSupport.name} · ${supportSteps} ${supportSteps === 1 ? "ступень" : "ступени"} · ${rub(supportCost)}`
      : "Без сопровождения";
    return `${selectedCourse.name} · ${selectedMode.shortLabel}\n${supportLine}\nИтого: ${rub(total)}`;
  }, [selectedCourse, selectedMode, selectedSupport, supportCost, supportSteps, total]);

  const selectPrice = (course: CourseId, mode: PriceMode) => {
    if (pdfMode) return;
    setState((current) => ({ ...current, course, mode }));
  };

  const selectSupport = (support: SupportId) => {
    if (pdfMode) return;
    setState((current) => ({ ...current, support }));
  };

  const updateSteps = (support: Support, delta: number) => {
    if (pdfMode) return;
    const key = `${support.id}Steps` as "curatorSteps" | "vasilySteps";
    setState((current) => ({
      ...current,
      support: support.id,
      [key]: Math.min(3, Math.max(1, current[key] + delta)),
    }));
  };

  if (pdfMode) {
    const stepsWord = supportSteps === 1 ? "ступень" : "ступени";
    return (
      <div className="container-px mx-auto w-full max-w-5xl">
        <header className="mb-6">
          <h2 className="font-serif-display text-3xl font-semibold leading-none text-foreground md:text-5xl">
            Ваш расчёт
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-foreground/65 md:text-base">
            {nbsp("Выбранная ступень и формат сопровождения")}
          </p>
        </header>

        <div className="border border-foreground/15 bg-card">
          <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 px-6 py-5">
            <div>
              <div className="font-body text-[11px] uppercase tracking-wide text-foreground/45">Ступень</div>
              <div className="mt-1 font-display text-2xl font-semibold text-foreground">{nbsp(selectedCourse.name)}</div>
              <div className="mt-1 font-body text-xs text-foreground/55">{nbsp(selectedMode.label)}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-3xl font-semibold text-foreground">{rub(selectedCourse[state.mode])}</div>
              {state.mode !== "official" && (
                <del className="mt-1 block font-body text-xs text-foreground/45">{rub(selectedCourse.official)}</del>
              )}
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 px-6 py-5">
            <div>
              <div className="font-body text-[11px] uppercase tracking-wide text-foreground/45">Сопровождение</div>
              <div className="mt-1 font-display text-2xl font-semibold text-foreground">
                {selectedSupport ? nbsp(`${selectedSupport.name} · ${supportSteps} ${stepsWord}`) : "Без сопровождения"}
              </div>
            </div>
            <div className="text-right font-display text-3xl font-semibold text-foreground">
              {supportCost > 0 ? `+ ${rub(supportCost)}` : "—"}
            </div>
          </div>

          <div className="grid gap-4 bg-foreground px-6 py-5 text-background md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="font-body text-[11px] uppercase tracking-wide text-background/50">Экономия</div>
              <div className="mt-1 font-display text-xl font-semibold text-accent">{saving > 0 ? rub(saving) : "—"}</div>
            </div>
            <div className="md:text-right">
              <div className="font-body text-[11px] uppercase tracking-wide text-background/50">Итого</div>
              <div className="mt-1 font-display text-4xl font-semibold">{rub(total)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const copySummary = async () => {
    await navigator.clipboard?.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="container-px mx-auto w-full max-w-7xl">
      <header className="mb-5 flex items-end justify-between gap-5 md:mb-7">
        <div>
          <h2 className="font-serif-display text-3xl font-semibold leading-none text-foreground md:text-5xl">
            Калькулятор стоимости
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-foreground/65 md:text-base">
            {nbsp("Выберите ступень, цену и формат сопровождения")}
          </p>
        </div>
        {!pdfMode && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setState(initialState)}
            aria-label="Сбросить выбор"
            title="Сбросить выбор"
            className="shrink-0 rounded-none border-foreground/20 bg-card"
          >
            <RotateCcw />
          </Button>
        )}
      </header>

      <div className="hidden overflow-hidden border border-foreground/15 bg-card md:block">
        <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b border-foreground/15 bg-muted/45">
          <div className="px-4 py-2.5 font-display text-xs font-semibold text-foreground">Ступень</div>
          {modes.map((mode) => (
            <div key={mode.id} className="border-l border-foreground/15 px-3 py-2.5 text-center font-body text-xs text-foreground/60">
              {nbsp(mode.label)}
            </div>
          ))}
        </div>
        {courses.map((course) => (
          <div key={course.id} className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b border-foreground/10 last:border-b-0">
            <div className="flex items-center gap-3 px-4 py-2.5">
              {course.number && <span className="number-display text-xl text-accent">{course.number}</span>}
              <span className="font-display text-sm font-semibold text-foreground">{nbsp(course.name)}</span>
              {course.bundle && (
                <span className="border border-accent/35 bg-accent/10 px-2 py-0.5 font-body text-[10px] font-semibold text-accent">
                  3 ступени
                </span>
              )}
            </div>
            {modes.map((mode) => {
              const active = state.course === course.id && state.mode === mode.id;
              return (
                <Button
                  key={mode.id}
                  type="button"
                  variant="ghost"
                  onClick={() => selectPrice(course.id, mode.id)}
                  aria-pressed={active}
                  className={`h-full min-h-14 rounded-none border-l border-foreground/15 px-2 font-display text-base font-semibold ${
                    active ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-card hover:bg-muted"
                  }`}
                >
                  <span>
                    {rub(course[mode.id])}
                    {mode.id !== "official" && (
                      <del className={`mt-0.5 block font-body text-[10px] font-normal ${active ? "text-background/55" : "text-foreground/45"}`}>
                        {rub(course.official)}
                      </del>
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="space-y-3 md:hidden">
        <div className="grid grid-cols-2 border border-foreground/15 bg-card">
          {courses.map((course) => {
            const active = state.course === course.id;
            return (
              <Button
                key={course.id}
                type="button"
                variant="ghost"
                onClick={() => selectPrice(course.id, state.mode)}
                aria-pressed={active}
                className={`h-auto min-h-12 whitespace-normal rounded-none border-b border-r border-foreground/15 px-3 py-2 text-left font-display text-xs font-semibold ${
                  active ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-card hover:bg-muted"
                }`}
              >
                {nbsp(`${course.number ? `${course.number}. ` : ""}${course.name}`)}
              </Button>
            );
          })}
        </div>
        <div className="grid grid-cols-3 border border-foreground/15 bg-card">
          {modes.map((mode) => {
            const active = state.mode === mode.id;
            return (
              <Button
                key={mode.id}
                type="button"
                variant="ghost"
                onClick={() => selectPrice(state.course, mode.id)}
                aria-pressed={active}
                className={`h-auto min-h-14 whitespace-normal rounded-none border-r border-foreground/15 px-2 py-2 font-body text-[11px] ${
                  active ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-card hover:bg-muted"
                }`}
              >
                <span>
                  {mode.shortLabel}
                  <strong className="mt-1 block font-display text-sm">{rub(selectedCourse[mode.id])}</strong>
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="mb-2 mt-5 font-display text-sm font-semibold text-foreground md:mt-6">Сопровождение</div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[0.8fr_1.1fr_1.1fr] md:gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => selectSupport("none")}
          aria-pressed={state.support === "none"}
          className={`h-auto min-h-16 justify-start whitespace-normal rounded-none border-foreground/15 px-4 py-3 text-left ${
            state.support === "none" ? "border-foreground bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-card"
          }`}
        >
          <span>
            <span className="block font-display text-sm font-semibold">Без сопровождения</span>
            <span className={`mt-1 block font-body text-xs ${state.support === "none" ? "text-background/60" : "text-foreground/55"}`}>Только курс</span>
          </span>
        </Button>

        {supports.map((support) => {
          const active = state.support === support.id;
          const steps = state[`${support.id}Steps`];
          const price = supportPrice(support, steps);
          const saved = supportSaving(support, steps);
          return (
            <div
              key={support.id}
              role="button"
              tabIndex={pdfMode ? -1 : 0}
              aria-pressed={active}
              onClick={() => selectSupport(support.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") selectSupport(support.id);
              }}
              className={`flex min-h-16 items-center justify-between gap-3 border px-4 py-3 ${
                active ? "border-foreground bg-card shadow-[inset_0_0_0_1px_hsl(var(--foreground))]" : "border-foreground/15 bg-card"
              }`}
            >
              <div>
                <div className="flex items-center gap-2 font-display text-sm font-semibold">
                  {active && <Check className="h-4 w-4 text-accent" />}
                  {support.name}
                </div>
                <div className="mt-1 font-body text-[11px] text-foreground/55">{rub(support.unit)} за ступень</div>
                <div className="mt-1 font-display text-base font-semibold text-accent">
                  + {rub(price)}
                  {saved > 0 && <del className="ml-2 font-body text-[10px] font-normal text-foreground/45">{rub(support.unit * steps)}</del>}
                </div>
              </div>
              <div className="flex shrink-0 items-center border border-foreground/15 bg-background" onClick={(event) => event.stopPropagation()}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={steps <= 1 || pdfMode}
                  onClick={() => updateSteps(support, -1)}
                  aria-label={`Уменьшить количество ступеней для тарифа «${support.name}»`}
                  className="h-8 w-8 rounded-none"
                >
                  <Minus />
                </Button>
                <span className="w-7 text-center font-display text-sm font-semibold">{steps}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={steps >= 3 || pdfMode}
                  onClick={() => updateSteps(support, 1)}
                  aria-label={`Увеличить количество ступеней для тарифа «${support.name}»`}
                  className="h-8 w-8 rounded-none"
                >
                  <Plus />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 bg-foreground px-5 py-4 text-background md:grid-cols-[1.4fr_1fr_0.7fr_0.85fr_auto] md:items-center md:px-6">
        <div>
          <div className="font-body text-[10px] text-background/50">Выбрано</div>
          <div className="mt-1 font-display text-sm font-semibold">{nbsp(`${selectedCourse.name} · ${selectedMode.shortLabel}`)}</div>
        </div>
        <div>
          <div className="font-body text-[10px] text-background/50">Сопровождение</div>
          <div className="mt-1 font-display text-sm font-semibold">
            {selectedSupport ? nbsp(`${selectedSupport.name} · ${supportSteps}`) : "Без сопровождения"}
          </div>
        </div>
        <div>
          <div className="font-body text-[10px] text-background/50">Экономия</div>
          <div className="mt-1 font-display text-sm font-semibold text-accent">{saving > 0 ? rub(saving) : "—"}</div>
        </div>
        <div className="md:text-right">
          <div className="font-body text-[10px] text-background/50">Итого</div>
          <div className="mt-1 font-display text-2xl font-semibold">{rub(total)}</div>
        </div>
        {!pdfMode && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={copySummary}
            aria-label="Скопировать расчёт"
            title="Скопировать расчёт"
            className="rounded-none bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        )}
      </div>
    </div>
  );
};