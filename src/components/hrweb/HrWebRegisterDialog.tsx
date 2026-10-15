import { useState, type FormEvent } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { nbsp } from "@/lib/nbsp";

export const HrWebRegisterDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [tested, setTested] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setTested(true);
  };
  return (
    <Dialog open={open} onOpenChange={(next) => { setTested(false); onOpenChange(next); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="pr-6 text-2xl tracking-normal">{nbsp("Регистрация на вебинар")}</DialogTitle>
          <DialogDescription>{nbsp("21 октября · бесплатно · 60 минут")}</DialogDescription>
        </DialogHeader>
        <p className="flex items-start gap-3 rounded-md bg-secondary p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{nbsp("Пока это пробная форма. Данные не отправляются и не сохраняются; запись на вебинар ещё не открыта.")}</span>
        </p>
        {tested ? (
          <div role="status" className="space-y-4 py-3">
            <p className="text-lg font-medium">{nbsp("Пробная форма проверена")}</p>
            <p className="text-muted-foreground">{nbsp("Вы не зарегистрированы на вебинар. Данные не отправлены и не сохранены.")}</p>
            <Button className="w-full" onClick={() => onOpenChange(false)}>Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block space-y-2 text-sm font-medium"><span>Имя</span><Input name="name" required autoComplete="off" placeholder="Ваше имя" maxLength={100} /></label>
            <label className="block space-y-2 text-sm font-medium"><span>Email</span><Input name="email" type="email" required autoComplete="off" placeholder="name@company.ru" maxLength={254} /></label>
            <label className="block space-y-2 text-sm font-medium"><span>Компания</span><Input name="company" autoComplete="off" placeholder="Название компании" maxLength={150} /></label>
            <label className="block space-y-2 text-sm font-medium"><span>{nbsp("Какой вопрос про удержание вас волнует?")}</span><textarea name="question" rows={3} maxLength={2000} className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            <Button type="submit" size="lg" className="h-auto min-h-12 w-full whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90">{nbsp("Проверить форму")}<ArrowRight /></Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};