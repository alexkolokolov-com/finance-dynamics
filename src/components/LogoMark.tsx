type LogoMarkProps = {
  size?: "sm" | "md";
  className?: string;
};

/**
 * Мягкая монограмма «Вася и финансы» — кружок с инициалами «ВФ»
 * на тёплом акценте. Без орбит, без школьной графики.
 */
export const LogoMark = ({ size = "sm", className = "" }: LogoMarkProps) => {
  const box = size === "md" ? "w-9 h-9 text-[13px]" : "w-8 h-8 text-[12px]";
  return (
    <span
      className={`inline-flex ${box} items-center justify-center rounded-full bg-accent text-accent-foreground font-display font-semibold tracking-tight ${className}`}
      aria-hidden
    >
      ВФ
    </span>
  );
};
