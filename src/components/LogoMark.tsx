type LogoMarkProps = {
  size?: "sm" | "md";
  className?: string;
};

/**
 * Кружок-логотип «Физика финансов»: белый центр с ₽,
 * тонкая орбита и акцентная точка на ней.
 */
export const LogoMark = ({ size = "sm", className = "" }: LogoMarkProps) => {
  const box = size === "md" ? "w-9 h-9" : "w-8 h-8";
  const glyph = size === "md" ? "text-[19px]" : "text-[16px]";
  return (
    <span className={`relative inline-flex ${box} items-center justify-center ${className}`}>
      {/* орбита */}
      <span className="absolute inset-0 rounded-full border border-foreground" />
      {/* центр — жёлтый диск с символом рубля (меньше орбиты) */}
      <span className="absolute inset-[7px] rounded-full bg-accent flex items-center justify-center">
        <span className={`font-serif-display font-semibold leading-none text-accent-foreground ${glyph} relative -translate-y-[0.06em]`}>
          ₽
        </span>
      </span>
      {/* точка на орбите — чёрная, в верхнем левом углу (45°) */}
      <span
        aria-hidden
        className="absolute w-1.5 h-1.5 rounded-full bg-foreground"
        style={{ top: "14.64%", left: "14.64%", transform: "translate(-50%, -50%)" }}
      />
    </span>
  );
};
