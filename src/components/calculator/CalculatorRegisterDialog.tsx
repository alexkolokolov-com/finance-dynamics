import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { appendStoredParams, trackGuideCart } from "@/lib/ymGoals";

const MESSAGE_TAG = "calc-gc-widget-height";

interface CalculatorRegisterDialogProps {
  /** GetCourse widget numeric id (the `id=` query param). */
  widgetId: number;
  /** Hash used as the <script id="..."> attribute (kept for parity with GC snippet). */
  scriptHash: string;
  trigger: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * GetCourse widget popup for /calculator.
 *
 * Loads the widget inside an iframe pointing at `/gc-widget.html`.
 * Real URL (not srcDoc) is used so UTM params propagate into the widget's
 * `window.location.search` and end up in the order on the next domain.
 *
 * Fires Yandex.Metrika goal `guide_cart` at most once per visit on open.
 */
export const CalculatorRegisterDialog = ({
  widgetId,
  scriptHash,
  trigger,
  title = "Оформление доступа",
  subtitle,
}: CalculatorRegisterDialogProps) => {
  const [contentHeight, setContentHeight] = useState<number>(560);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      if ((data as { tag?: string }).tag !== MESSAGE_TAG) return;
      const h = (data as { height?: number }).height;
      if (typeof h === "number" && h > 0) setContentHeight(Math.ceil(h));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const iframeSrc = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `/gc-widget.html?id=${encodeURIComponent(String(widgetId))}&hash=${encodeURIComponent(scriptHash)}`;
    return appendStoredParams(window.location.origin + base);
  }, [widgetId, scriptHash]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          trackGuideCart();
          setMounted(true);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-foreground/15 bg-card rounded-none gap-0 max-h-[92dvh] flex flex-col">
        <div className="px-6 pt-7 pb-5 border-b border-foreground/10 bg-grid shrink-0">
          <h2 className="font-serif-display text-2xl md:text-[1.6rem] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-foreground/55">
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card pointer-events-none">
            <Loader2 className="h-8 w-8 text-accent animate-spin" strokeWidth={1.5} />
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55">
              форма загружается
            </div>
          </div>
          {mounted && iframeSrc && (
            <iframe
              ref={iframeRef}
              title={title}
              src={iframeSrc}
              scrolling="no"
              style={{ height: contentHeight }}
              className="relative w-full border-0 bg-transparent block"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
