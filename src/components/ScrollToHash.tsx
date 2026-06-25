import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Прокручивает к элементу с id из URL hash после перехода.
 * Делает несколько попыток, т.к. изображения/шрифты могут менять высоту
 * после первичного рендера и якорь оказывается выше нужной точки.
 */
export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = hash.slice(1);
    let cancelled = false;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
      attempts += 1;
      if (attempts < 8) {
        // 0, 100, 250, 500, 900, 1400, 2000, 2700 мс — ловим догрузку картинок
        const delays = [100, 150, 250, 400, 500, 600, 700];
        window.setTimeout(tick, delays[attempts - 1] ?? 500);
      }
    };
    tick();

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
};
