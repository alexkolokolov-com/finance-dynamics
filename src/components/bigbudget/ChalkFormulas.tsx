export function ChalkFormulas() {
  return (
    <div className="formula-bg" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="bb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bb-grid)" opacity="0.25" />
      </svg>
      <div className="absolute left-[4%] top-[8%] text-3xl md:text-5xl rotate-[-4deg]">E = mc²</div>
      <div className="absolute right-[6%] top-[14%] text-2xl md:text-4xl rotate-[3deg]">F = ma</div>
      <div className="absolute left-[10%] top-[40%] text-2xl md:text-3xl rotate-[-2deg]">∑ Доходы − ∑ Расходы = Δ Капитал</div>
      <div className="absolute right-[8%] top-[55%] text-3xl md:text-5xl rotate-[5deg]">∫ $ dt</div>
      <div className="absolute left-[6%] bottom-[18%] text-2xl md:text-4xl rotate-[-3deg]">a² + b² = c²</div>
      <div className="absolute right-[12%] bottom-[10%] text-2xl md:text-3xl rotate-[2deg]">FV = PV(1+r)ⁿ</div>
      <div className="absolute left-[40%] bottom-[6%] text-xl md:text-2xl rotate-[-1deg]">π · r²</div>
    </div>
  );
}
