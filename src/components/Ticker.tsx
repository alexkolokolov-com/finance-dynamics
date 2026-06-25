const items = [
  "спокойные деньги",
  "без героических усилий",
  "понятный учёт",
  "честные цифры",
  "разумные траты",
  "капитал по плану",
  "финансовая уверенность",
];

export const Ticker = () => (
  <div className="bg-foreground text-background border-y border-foreground overflow-hidden py-3">
    <div className="flex animate-ticker whitespace-nowrap gap-12">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="text-sm flex items-center gap-12">
          {t}
          <span className="text-accent">◆</span>
        </span>
      ))}
    </div>
  </div>
);
