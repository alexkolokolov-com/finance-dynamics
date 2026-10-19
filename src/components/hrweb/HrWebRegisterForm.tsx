import { useEffect, useRef } from "react";

const WIDGET_ID = "da8ad42fc041f8fd668598680c1fb305992fca00";
const WIDGET_SRC = "https://nivz.getcourse.ru/pl/lite/widget/script?id=1670730";

export const HrWebRegisterForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const el = containerRef.current;
      if (!el || el.childElementCount > 0) return;
      const script = document.createElement("script");
      script.id = WIDGET_ID;
      script.src = WIDGET_SRC;
      script.onload = () => {
        const start = (window as unknown as Record<string, unknown>)[`startWidget${WIDGET_ID}`];
        if (typeof start === "function") start();
      };
      el.appendChild(script);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="min-h-[360px] w-full overflow-hidden rounded-lg bg-card text-card-foreground [&_iframe]:block [&_iframe]:w-full [&_iframe]:max-w-full" />
  );
};