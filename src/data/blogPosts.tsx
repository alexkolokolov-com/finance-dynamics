export type BlogPost = {
  tag: string;
  title: string;
  text: string;
  cta: string;
  href?: string;
  illustration: JSX.Element;
};

const checklistIllustration = (
  <svg viewBox="0 0 360 200" className="w-full h-auto">
    <rect x="80" y="30" width="200" height="150" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8" />
    {[60, 85, 110, 135, 160].map((y, i) => (
      <g key={y}>
        <rect x="98" y={y - 8} width="14" height="14" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.6" />
        {i < 3 && (
          <path d={`M 100 ${y - 1} L 105 ${y + 4} L 112 ${y - 5}`} stroke="hsl(var(--accent))" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        <line x1="124" y1={y} x2={i % 2 === 0 ? 258 : 232} y2={y} stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.55" />
      </g>
    ))}
    <circle cx="300" cy="60" r="14" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.6" />
    <circle cx="320" cy="74" r="14" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.6" />
  </svg>
);

const budgetIllustration = (
  <svg viewBox="0 0 360 200" className="w-full h-auto">
    <rect x="60" y="20" width="240" height="160" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8" />
    {[55, 90, 125, 160].map((y) => (
      <line key={y} x1="60" y1={y} x2="300" y2={y} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" />
    ))}
    <line x1="140" y1="20" x2="140" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" />
    <line x1="220" y1="20" x2="220" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" />
    <text x="100" y="42" fontFamily="Figtree, sans-serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">доходы</text>
    <text x="180" y="42" fontFamily="Figtree, sans-serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">расходы</text>
    <text x="260" y="42" fontFamily="Figtree, sans-serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">сбережения</text>
    <text x="100" y="78" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">120 000 ₽</text>
    <text x="180" y="78" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">85 000 ₽</text>
    <text x="260" y="78" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--accent))" textAnchor="middle">+35 000 ₽</text>
    <text x="100" y="113" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">95 000 ₽</text>
    <text x="180" y="113" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">70 000 ₽</text>
    <text x="260" y="113" fontFamily="Figtree, sans-serif" fontSize="13" fill="hsl(var(--accent))" textAnchor="middle">+25 000 ₽</text>
    <text x="180" y="155" fontFamily="Figtree, sans-serif" fontSize="44" fill="hsl(var(--accent))" textAnchor="middle">19</text>
    <line x1="316" y1="100" x2="338" y2="78" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
    <circle cx="338" cy="78" r="4" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
  </svg>
);

export const blogPosts: BlogPost[] = [
  {
    tag: "чек-лист",
    title: "Финансовый чек-лист для пары",
    text: "23 разговора, которые стоит провести с партнёром до того, как деньги станут поводом для конфликта. Прошлое, настоящее, будущее, риски и забота — по&nbsp;пунктам, без воды.",
    cta: "Открыть чек-лист",
    href: "/checklist",
    illustration: checklistIllustration,
  },
  {
    tag: "бюджет",
    title: "19 способов ведения бюджета",
    text: "19 способов ведения семейного бюджета — от ежемесячного Excel до метода конвертов и FIRE.",
    cta: "Читать",
    href: "/budget-methods",
    illustration: budgetIllustration,
  },
];
