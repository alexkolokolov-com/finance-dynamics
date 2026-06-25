// Yandex.Metrika goal helpers + UTM forwarding.
// Each goal is fired at most once per browser session (sessionStorage).

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const COUNTER_ID = 109783521;
const STORAGE_PREFIX = "ym_goal_sent:";
const UTM_STORAGE_KEY = "phf_utm_params";
const UTM_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_referrer",
  "gclid",
  "yclid",
  "ysclid",
  "fbclid",
  "_openstat",
  "from",
  "ref",
];

const sendGoalOnce = (goal: string) => {
  if (typeof window === "undefined") return;
  const key = STORAGE_PREFIX + goal;
  try {
    if (window.sessionStorage.getItem(key)) return;
  } catch {
    // ignore storage errors
  }
  const fire = () => {
    if (typeof window.ym !== "function") return false;
    window.ym(COUNTER_ID, "reachGoal", goal);
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }
    return true;
  };
  if (fire()) return;
  // ym not ready yet — retry briefly until it loads.
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (fire() || attempts > 40) window.clearInterval(timer);
  }, 250);
};

/** Fired once per visit when any application-form popup opens. */
export const trackFizfinCart = () => {
  sendGoalOnce("fizfin_cart");
};

/** Fired once per visit when a /calculator GetCourse form popup opens. */
export const trackGuideCart = () => {
  sendGoalOnce("guide_cart");
};

// Backwards-compatible aliases — all map to the single fizfin_cart goal.
export const trackCartOpen = trackFizfinCart;
export const trackDiagnos = trackFizfinCart;
export const trackOrder = trackFizfinCart;


// ============ UTM persistence ============

type StoredParams = { params: Record<string, string>; savedAt: number };

const readStored = (): StoredParams | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredParams;
    if (!parsed || typeof parsed !== "object") return null;
    if (Date.now() - parsed.savedAt > UTM_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeStored = (params: Record<string, string>) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify({ params, savedAt: Date.now() } satisfies StoredParams),
    );
  } catch {
    // ignore
  }
};

/** Capture tracked params from the current URL into localStorage. Run once on app load. */
export const captureTrackingParams = () => {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of TRACKED_PARAMS) {
    const v = search.get(key);
    if (v) fresh[key] = v;
  }
  if (Object.keys(fresh).length === 0) return;

  // Merge with previously stored params (new params override old).
  const prev = readStored()?.params ?? {};
  writeStored({ ...prev, ...fresh });
};

/** Append stored tracking params to a URL (used for nivz.getcourse.ru anketa links). */
export const appendStoredParams = (url: string): string => {
  const stored = readStored();
  if (!stored) return url;
  try {
    const u = new URL(url, window.location.origin);
    for (const [k, v] of Object.entries(stored.params)) {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return url;
  }
};

// ============ Anketa link click handlers ============

const handleAnketaClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  goalFn: () => void,
) => {
  goalFn();
  const a = e.currentTarget;
  const tracked = appendStoredParams(a.href);
  if (tracked !== a.href) {
    // Rewrite href so middle-click / right-click also carries UTM,
    // and let the browser handle the normal open in a new tab.
    a.href = tracked;
  }
};

export const handleCartAnketaClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
  handleAnketaClick(e, trackCartOpen);

export const handleDiagnosAnketaClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
  handleAnketaClick(e, trackDiagnos);
