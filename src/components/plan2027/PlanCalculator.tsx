import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { calculatePlanBalance } from "@/data/plan2027";
import { nbsp } from "@/lib/nbsp";

const money = (amount: number) => `${new Intl.NumberFormat("ru-RU").format(amount)} ₽`;

export const PlanCalculator = () => {
  const [income, setIncome] = useState(400000);
  const [goals, setGoals] = useState(1200000);
  const balance = calculatePlanBalance(income, goals);
  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8">
      <p className="mb-2 text-sm text-accent">Мини-демо</p>
      <h3 className="text-2xl font-semibold">{nbsp("А что, если изменить планы?")}</h3>
      <div className="mt-8 space-y-8">
        {[{ label: "Ежемесячный доход", value: income, min: 250000, max: 650000, step: 10000, change: setIncome, captions: ["250 тыс.", "650 тыс."] }, { label: "Большие цели за год", value: goals, min: 0, max: 2500000, step: 50000, change: setGoals, captions: ["0 ₽", "2,5 млн"] }].map((item) => (
          <div key={item.label}>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><span className="text-sm text-muted-foreground">{nbsp(item.label)}</span><output className="font-display text-xl font-semibold">{money(item.value)}</output></div>
            <Slider thumbLabel={item.label} value={[item.value]} min={item.min} max={item.max} step={item.step} onValueChange={([value]) => { if (value !== undefined) item.change(value); }} />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">{item.captions.map((caption) => <span key={caption}>{nbsp(caption)}</span>)}</div>
          </div>
        ))}
      </div>
      <dl className="mt-7 grid grid-cols-[1fr_auto] gap-x-3 gap-y-3 border-t border-border pt-6 text-sm">
        <dt>{nbsp("Доход за год")}</dt><dd className="font-semibold">{money(income * 12)}</dd>
        <dt>{nbsp("Повседневные расходы за год")}</dt><dd className="font-semibold">{money(3000000)}</dd>
        <dt>{nbsp("Цели за год")}</dt><dd className="font-semibold">{money(goals)}</dd>
      </dl>
      <div aria-live="polite" className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-md p-5 ${balance < 0 ? "bg-destructive/10 text-destructive" : "bg-accent-soft/40 text-foreground"}`}>
        <span className="text-sm">{nbsp(balance < 0 ? "Денег не хватает на" : "Останется для накоплений")}</span><strong className="font-display text-3xl">{money(Math.abs(balance))}</strong>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{nbsp("Это пример расчёта с условными расходами 250 000 ₽ в месяц, без учёта налогов, кредитов и начального капитала. На спринте вы построите подробную модель со своими данными.")}</p>
    </div>
  );
};