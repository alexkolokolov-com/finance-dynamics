const items = [
  "E = m·c² · капитал растёт нелинейно",
  "F = m·a · бюджет = масса × ускорение целей",
  "ΣP = const · закон сохранения денег",
  "λ = h/p · длина волны желаний",
  "Δx·Δp ≥ ℏ/2 · принцип неопределённости расходов",
  "v = λ·f · частота инвестиций",
  "PV = nRT · давление обязательств",
];

export const Ticker = () => (
  <div className="bg-foreground text-background border-y border-foreground overflow-hidden py-3">
    <div className="flex animate-ticker whitespace-nowrap gap-12">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="font-mono text-xs uppercase tracking-widest flex items-center gap-12">
          {t}
          <span className="text-accent">◆</span>
        </span>
      ))}
    </div>
  </div>
);
