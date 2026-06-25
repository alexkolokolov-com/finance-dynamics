import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Заявка принята", {
        description: "Василий свяжется с вами в течение 24 часов.",
      });
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-foreground/10">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-5">
            <span className="badge-tag">§ 07 · контакт</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mt-6">
              Подайте
              <br />
              <span className="italic font-light">сигнал</span>.
              <br />
              <span className="text-accent">Поймаем волну.</span>
            </h2>
            <p className="mt-6 font-body text-foreground/70 max-w-md leading-relaxed">
              Расскажите, что хотите изменить в&nbsp;своих финансах. Мы&nbsp;подберём подходящий формат — марафон, курс или личное сопровождение.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { k: "telegram", v: "@vasily_meshcheryakov" },
                { k: "email", v: "hello@phys-finance.ru" },
                { k: "офис", v: "Москва · Долгопрудный" },
              ].map((c) => (
                <div key={c.k} className="flex items-baseline gap-4 border-b border-foreground/10 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 w-20">{c.k}</span>
                  <span className="font-body">{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="bg-foreground text-background p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-accent/40" style={{ borderStyle: 'dashed' }} />
              <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_hsl(var(--accent))]" />

              <div className="font-mono text-[11px] uppercase tracking-widest text-background/60 mb-8 relative">
                форма обратной связи · F(x) → ответ за 24 ч
              </div>

              <div className="space-y-6 relative">
                <Field label="Имя" name="name" required />
                <Field label="Email или Telegram" name="contact" required />
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-background/60 block mb-2">
                    Интересует
                  </label>
                  <select
                    name="interest"
                    className="w-full bg-transparent border-b border-background/30 py-3 font-body text-background focus:outline-none focus:border-accent transition-colors"
                  >
                    <option className="text-foreground">Марафон «Теория большого бюджета»</option>
                    <option className="text-foreground">Курс «Квант капитала» (1 мес)</option>
                    <option className="text-foreground">Программа «Орбита благосостояния» (12 мес)</option>
                    <option className="text-foreground">Личная консультация</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-background/60 block mb-2">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Опишите ситуацию или цель..."
                    className="w-full bg-transparent border-b border-background/30 py-3 font-body text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {loading ? "Отправляем..." : "Отправить сигнал →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, required }: { label: string; name: string; required?: boolean }) => (
  <div>
    <label className="font-mono text-[11px] uppercase tracking-widest text-background/60 block mb-2">
      {label} {required && <span className="text-accent">*</span>}
    </label>
    <input
      type="text"
      name={name}
      required={required}
      className="w-full bg-transparent border-b border-background/30 py-3 font-body text-background focus:outline-none focus:border-accent transition-colors"
    />
  </div>
);
