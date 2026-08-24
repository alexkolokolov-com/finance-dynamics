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

  return null;
};

export default UtmPersistence;
