import type { ReactNode } from "react";

export const ArticleFlow = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`container-px max-w-3xl mx-auto
      [&>p]:font-body [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-foreground/80
      [&>ul]:font-body [&>ul]:text-lg [&>ul]:leading-relaxed [&>ul]:text-foreground/80
      [&>*:not(:first-child)]:mt-5
      [&>h2:not(:first-child)]:mt-6 [&>h2:not(:first-child)]:md:mt-8
      [&>h2+*]:mt-3
      [&>h3:not(:first-child)]:mt-5 [&>h3:not(:first-child)]:md:mt-6
      [&>h3+*]:mt-3
      ${className}`}
  >
    {children}
  </div>
);
