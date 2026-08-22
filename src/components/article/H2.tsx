import type { ReactNode } from "react";

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-[clamp(1.6rem,3.6vw,2.4rem)]">
    {children}
  </h2>
);
