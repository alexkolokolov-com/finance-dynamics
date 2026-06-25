import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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


interface BigBudgetRegisterDialogProps {
  formIndex: number;
  trigger: ReactNode;
}

/**
 * GetCourse widget popup styled to match the chalkboard theme of /bigbudget.
 */
export const BigBudgetRegisterDialog = ({
  formIndex,
  trigger,
}: BigBudgetRegisterDialogProps) => {
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
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      html,body{margin:0;padding:0;background:transparent;color:#f5f3ee;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
      body{padding:8px 4px 4px;}
      form,.gc-widget,.gc-form{max-width:100% !important;}
      input[type="text"],input[type="email"],input[type="tel"],input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]){
        font-family:inherit !important;
        font-size:15px !important;
        padding:14px 0 !important;
        border:0 !important;
        border-bottom:1.5px dashed rgba(245,243,238,0.45) !important;
        background:transparent !important;
        color:#f5f3ee !important;
        outline:none !important;
        border-radius:0 !important;
        transition:border-color .2s ease;
        width:100% !important;
        box-sizing:border-box !important;
      }
      input:focus{border-bottom-color:#e8c97a !important;border-bottom-style:solid !important;}
      ::placeholder{color:rgba(245,243,238,0.45) !important;}
      label{font-size:13px !important;color:rgba(245,243,238,0.8) !important;}
      a{color:#e8c97a !important;}
      button[type="submit"],input[type="submit"],.gc-submit,.btn,.button{
        font-family:'Caveat',cursive !important;
        font-weight:700 !important;
        font-size:24px !important;
        letter-spacing:0.02em !important;
        text-transform:none !important;
        background:#e8c97a !important;
        color:#1a2b22 !important;
        border:2px solid rgba(26,43,34,0.25) !important;
        border-radius:10px !important;
        padding:12px 32px !important;
        cursor:pointer !important;
        transition:transform .2s ease, box-shadow .2s ease !important;
        box-shadow:0 0 0 3px rgba(232,201,122,0.25), 0 8px 20px -8px rgba(0,0,0,0.5) !important;
        width:100% !important;
        margin-top:14px !important;
      }
      button[type="submit"]:hover,input[type="submit"]:hover{transform:translateY(-2px) !important;box-shadow:0 0 0 3px rgba(232,201,122,0.4), 0 14px 28px -10px rgba(0,0,0,0.55) !important;}
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
      <DialogContent
        className="max-w-md p-0 overflow-hidden gap-0 border-0 rounded-[14px]"
        style={{
          background: "linear-gradient(135deg, oklch(0.42 0.08 50), oklch(0.32 0.06 45))",
          padding: "12px",
          boxShadow:
            "inset 0 0 0 2px oklch(0.55 0.10 55 / 60%), 0 30px 60px -20px oklch(0 0 0 / 60%)",
        }}
      >
        <div
          className="rounded-md overflow-hidden"
          style={{
            background: "oklch(0.27 0.025 165)",
            boxShadow: "inset 0 0 80px oklch(0 0 0 / 35%)",
          }}
        >
          <div
            className="px-6 pt-7 pb-5 text-center"
            style={{ borderBottom: "1.5px dashed oklch(0.96 0.015 90 / 30%)" }}
          >
            <div
              className="text-xl mb-1"
              style={{ fontFamily: "'Caveat', cursive", color: "oklch(0.78 0.12 40)" }}
            >
              ★ 2–4 июня 2026 ★
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "'Caveat', cursive", color: "oklch(0.96 0.015 90)" }}
            >
              Регистрация на марафон
            </h2>
            <p
              className="mt-2 text-sm"
              style={{ color: "oklch(0.96 0.015 90 / 75%)" }}
            >
              Бесплатно · 3 эфира · Zoom
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <Loader2
                className="h-8 w-8 animate-spin"
                strokeWidth={1.5}
                style={{ color: "oklch(0.85 0.10 75)" }}
              />
              <div
                className="text-lg"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "oklch(0.96 0.015 90 / 70%)",
                }}
              >
                форма загружается…
              </div>
            </div>
            <iframe
              ref={iframeRef}
              title="Регистрация на марафон"
              srcDoc={srcDoc}
              className="relative w-full h-[460px] border-0 bg-transparent"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
