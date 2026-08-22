import type { ReactNode } from "react";

export const ArticleSection = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`scroll-mt-24 mt-6 md:mt-8 first:mt-0 ${className}`}
  >
    {children}
  </section>
);
