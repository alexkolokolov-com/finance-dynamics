import type { ReactNode } from "react";

export const H3 = ({
  children,
  className = "",
  toc = true,
}: {
  children: ReactNode;
  className?: string;
  /** false — не включать заголовок в содержание статьи */
  toc?: boolean;
}) => (
  <h3
    data-toc={toc ? undefined : "skip"}
    className={`font-display font-semibold leading-[1.18] tracking-tight text-[clamp(1.25rem,2.6vw,1.6rem)] ${className}`}
  >
    {children}
  </h3>
);
