import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureTrackingParams, getStoredParams } from "@/lib/ymGoals";

/**
 * Keeps tracking params (utm_*, gclid, yclid…) in the URL while the user
 * navigates between pages of the site. Runs inside the Router.
 */
export const UtmPersistence = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Pick up params that appeared in the URL (e.g. after a full page load).
    captureTrackingParams();

    const stored = getStoredParams();
    const keys = Object.keys(stored);
    if (keys.length === 0) return;

    const search = new URLSearchParams(location.search);
    let changed = false;
    for (const key of keys) {
      if (!search.has(key)) {
        search.set(key, stored[key]);
        changed = true;
      }
    }
    if (!changed) return;

    navigate(
      { pathname: location.pathname, search: `?${search.toString()}`, hash: location.hash },
      { replace: true },
    );
  }, [location.pathname, location.search, location.hash, navigate]);

  // Rewrite same-origin links on click so tracking params travel with the
  // navigation itself (works for full page loads, middle-click, new tab).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const stored = getStoredParams();
      let changed = false;
      for (const [k, v] of Object.entries(stored)) {
        if (!url.searchParams.has(k)) {
          url.searchParams.set(k, v);
          changed = true;
        }
      }
      if (changed) anchor.setAttribute("href", url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
};


export default UtmPersistence;
