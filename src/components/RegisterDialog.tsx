import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackFizfinCart, trackOrder } from "@/lib/ymGoals";

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

function useTrackOrderOnSubmit(iframeRef: React.RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    let attached = false;
    const interval = window.setInterval(() => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc || attached) return;
      const forms = doc.querySelectorAll("form");
      if (forms.length === 0) return;
      forms.forEach((f) => {
        f.addEventListener("submit", () => trackOrder(), { capture: true });
      });
      attached = true;
    }, 400);
    return () => window.clearInterval(interval);
  }, [iframeRef]);
}

interface RegisterDialogProps {
  /** GetCourse form index (p=1, p=2, ...). Must be unique per form on the page. */
  formIndex: number;
  trigger: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * GetCourse widget popup.
 * The widget script uses document.write, so we render it inside an isolated
 * iframe via srcDoc and style the form to match the site's design system.
 */
export const RegisterDialog = ({
  formIndex,
  trigger,
  title = "Регистрация на марафон",
  subtitle = "19–21 мая · 3 эфира · бесплатно",
}: RegisterDialogProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useRewriteOfertaLinks(iframeRef);
  useTrackOrderOnSubmit(iframeRef);
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
      body{padding:8px 4px 4px;}
      /* GetCourse form polish */
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
    <script id="9e8eeedc49d1eaf7cc58193322c8e73a753bbd2f" src="https://nivz.getcourse.ru/pl/lite/widget/script?id=1586210?p=${formIndex}"></script>
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
        rewrite();
        new MutationObserver(rewrite).observe(document.body, {childList:true, subtree:true});
      })();
    </script>
  </body>
</html>`,
    [formIndex],
  );

  return (
    <Dialog onOpenChange={(open) => open && trackFizfinCart()}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-foreground/15 bg-card rounded-none gap-0">
        <div className="px-6 pt-7 pb-5 border-b border-foreground/10 bg-grid">
          <h2 className="font-serif-display text-2xl md:text-[1.6rem] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-foreground/55">
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative">
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
            className="relative w-full h-[460px] border-0 bg-transparent"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
