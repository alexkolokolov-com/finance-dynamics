import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { nbsp } from "@/lib/nbsp";

const WIDGET_ID = "da8ad42fc041f8fd668598680c1fb305992fca00";
const WIDGET_SRC = "https://nivz.getcourse.ru/pl/lite/widget/script?id=1670730";

export const HrWebRegisterDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const el = containerRef.current;
      if (!el || el.childElementCount > 0) return;
      const script = document.createElement("script");
      script.id = WIDGET_ID;
      script.src = WIDGET_SRC;
      el.appendChild(script);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="pr-6 text-2xl tracking-normal">{nbsp("Регистрация на вебинар")}</DialogTitle>
          <DialogDescription>{nbsp("23 октября · 19:00 Мск · бесплатно · 60 минут")}</DialogDescription>
        </DialogHeader>
        <div ref={containerRef} className="min-h-[200px] w-full" />
      </DialogContent>
    </Dialog>
  );
};
