import { useEffect } from "react";

const EXP_SRC = "https://abt.s3.yandex.net/expjs/latest/exp.js";
const COUNTER = "metrika.109783521";
const ANTIFLICKER_CLASS = "varioqub-antiflicker";
const STYLE_ID = "varioqub-antiflicker-style";

declare global {
  interface Window {
    ymab?: ((...args: unknown[]) => void) & { a?: unknown[]; antiFlicker?: unknown };
  }
}

type VarioqubProps = {
  /** Скрывать страницу до применения эксперимента (макс. 4с). */
  antiFlicker?: boolean;
};

/** Varioqub experiments (Яндекс) — подключается один раз за загрузку страницы. */
export const Varioqub = ({ antiFlicker = false }: VarioqubProps) => {
  useEffect(() => {
    const w = window;
    const root = document.documentElement;

    // очередь команд
    if (!w.ymab) {
      const q: ((...args: unknown[]) => void) & { a?: unknown[] } = function (
        ...args: unknown[]
      ) {
        (q.a = q.a || []).push(args);
      };
      w.ymab = q;
    }

    let timer: number | undefined;
    if (antiFlicker) {
      if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `.${ANTIFLICKER_CLASS} {opacity: 0 !important;}`;
        document.head.appendChild(style);
      }
      root.classList.add(ANTIFLICKER_CLASS);
      const cb = () => root.classList.remove(ANTIFLICKER_CLASS);
      w.ymab!.antiFlicker = { [COUNTER]: true, callback: cb };
      timer = window.setTimeout(cb, 4000);
    }

    if (!document.querySelector(`script[src="${EXP_SRC}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = EXP_SRC;
      s.addEventListener("error", () => {
        const cb = (args: unknown) => {
          const list = args as unknown[];
          const fn = list[list.length - 1];
          if (typeof fn === "function") (fn as (o: unknown) => void)({ flags: {} });
        };
        if (Array.isArray(w.ymab?.a)) w.ymab!.a!.forEach(cb);
        w.ymab = ((...args: unknown[]) => cb(args)) as Window["ymab"];
        root.classList.remove(ANTIFLICKER_CLASS);
      });
      document.head.appendChild(s);
      w.ymab!(COUNTER, "init");
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      root.classList.remove(ANTIFLICKER_CLASS);
    };
  }, [antiFlicker]);

  return null;
};
