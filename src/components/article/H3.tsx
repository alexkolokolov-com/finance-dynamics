import type { ReactNode } from "react";

export const H3 = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h3
    className={`font-display font-semibold leading-[1.18] tracking-tight text-[clamp(1.25rem,2.6vw,1.6rem)] ${className}`}
  >
    {children}
  </h3>
);

