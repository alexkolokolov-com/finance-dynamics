import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackFizfinCart } from "@/lib/ymGoals";

const MESSAGE_TAG = "traffic-gc-widget-height";

function useRewriteOfertaLinks(iframeRef: React.RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    const target = window.location.origin + "/oferta";
    const interval = window.setInterval(() => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      doc.querySelectorAll("a").forEach((a) => {
        if (/оферт/i.test(a.textContent || "") && a.getAttribute("href") !== target) {
          a.setAttribute("href", target);
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener");
        }
      });
    }, 400);
    return () => window.clearInterval(interval);
  }, [iframeRef]);
}

interface TrafficRegisterDialogProps {
  /** GetCourse widget numeric id (the `id=` query param). */
  widgetId: number;
  /** Hash used as the <script id="..."> attribute. */
  scriptHash: string;
  trigger: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * GetCourse widget popup used on /traffic. Renders the widget inside an
 * isolated iframe so the document.write call cannot break the host page.
 */
export const TrafficRegisterDialog = ({
  widgetId,
  scriptHash,
  trigger,
  title = "Запись на курс",
  subtitle,
}: TrafficRegisterDialogProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(520);
  useRewriteOfertaLinks(iframeRef);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      if ((data as { tag?: string }).tag !== MESSAGE_TAG) return;
      const h = (data as { height?: number }).height;
      if (typeof h === "number" && h > 0) {
        setContentHeight(Math.ceil(h));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const srcDoc = useMemo(
    () => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base target="_parent" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      html,body{margin:0;padding:0;background:transparent;color:#1a1a1a;font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;-webkit-font-smoothing:antialiased;}
      body{padding:8px 4px 16px;}
      form,.gc-widget,.gc-form{max-width:100% !important;}
      input[type="text"],input[type="email"],input[type="tel"],input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]){
        font-family:inherit !important;
        font-size:15px !important;
        padding:14px 0 !important;
        border:0 !important;
        border-bottom:1px solid rgba(0,0,0,0.18) !important;
        background:transparent !important;
        outline:none !important;
        border-radius:0 !important;
        transition:border-color .2s ease;
        width:100% !important;
        box-sizing:border-box !important;
      }
      input:focus{border-bottom-color:#caa54a !important;}
      ::placeholder{color:rgba(0,0,0,0.4) !important;}
      button[type="submit"],input[type="submit"],.gc-submit,.btn,.button{
        font-family:inherit !important;
        font-weight:600 !important;
        font-size:11px !important;
        letter-spacing:0.18em !important;
        text-transform:uppercase !important;
        background:#caa54a !important;
        color:#1a1a1a !important;
        border:0 !important;
        border-radius:0 !important;
        padding:18px 32px !important;
        cursor:pointer !important;
        transition:background .2s ease, color .2s ease !important;
        box-shadow:none !important;
        width:100% !important;
        margin-top:8px !important;
      }
      button[type="submit"]:hover,input[type="submit"]:hover{background:#1a1a1a !important;color:#fff !important;}
      a{color:#8a6d2a !important;}
      label{font-size:13px !important;color:rgba(0,0,0,0.7) !important;}
    </style>
  </head>
  <body>
    <script id="${scriptHash}" src="https://nivz.getcourse.ru/pl/lite/widget/script?id=${widgetId}"></script>
    <script>
      (function(){
        var target = window.parent.location.origin + '/oferta';
        function rewrite(){
          document.querySelectorAll('a').forEach(function(a){
            if(/оферт/i.test(a.textContent || '')){
              a.setAttribute('href', target);
              a.setAttribute('target', '_blank');
              a.setAttribute('rel', 'noopener');
            }
          });
        }
        var last = 0;
        function postHeight(){
          var h = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
          );
          if(h && Math.abs(h - last) > 1){
            last = h;
            window.parent.postMessage({tag: '${MESSAGE_TAG}', height: h}, '*');
          }
        }
        rewrite();
        postHeight();
        new MutationObserver(function(){ rewrite(); postHeight(); }).observe(document.body, {childList:true, subtree:true, attributes:true, characterData:true});
        window.addEventListener('load', postHeight);
        window.addEventListener('resize', postHeight);
        if(window.ResizeObserver){
          new ResizeObserver(postHeight).observe(document.body);
        }
        setInterval(postHeight, 600);
      })();
    </script>
  </body>
</html>`,
    [widgetId, scriptHash],
  );

  return (
    <Dialog onOpenChange={(open) => open && trackFizfinCart()}>
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
          <iframe
            ref={iframeRef}
            title={title}
            srcDoc={srcDoc}
            scrolling="no"
            style={{ height: contentHeight }}
            className="relative w-full border-0 bg-transparent block"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
