/** Подпись эксперта поверх фото: одна пилюля от 360 px, на узких телефонах — две друг под другом. */
const pill = "badge-tag bg-card/95 backdrop-blur-sm shadow-sm font-medium whitespace-nowrap px-2.5 py-1.5 inline-flex items-center gap-1.5";

const Role = () => (
  <span className="text-foreground/80">ex-Sales Director <span className="text-accent">P&amp;G</span></span>
);
const Dot = () => <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />;

export const ExpertPhotoBadge = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-x-0 bottom-3 z-10 flex px-3 sm:bottom-4 sm:px-4 ${className}`}>
    <div className="flex flex-col items-start gap-1.5 text-xs min-[360px]:hidden">
      <span className={pill}>Василий Мещеряков</span>
      <span className={pill}><Role /></span>
    </div>
    <span className={`${pill} hidden text-xs min-[360px]:inline-flex sm:text-sm`}>
      <span>Василий Мещеряков</span>
      <Dot />
      <Role />
    </span>
  </div>
);
