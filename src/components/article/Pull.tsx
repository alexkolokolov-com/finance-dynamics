import type { ReactNode } from "react";

export const Pull = ({ children }: { children: ReactNode }) => (
  <blockquote className="rounded-xl border border-border border-l-2 border-l-accent bg-card px-5 py-4">
    <p className="font-body text-[17px] md:text-lg leading-relaxed text-foreground/85">
      {children}
    </p>
  </blockquote>
);
