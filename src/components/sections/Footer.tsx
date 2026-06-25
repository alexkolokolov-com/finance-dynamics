import { LogoMark } from "@/components/LogoMark";

export const Footer = () => (
  <footer className="bg-background border-t border-foreground/15">
    <div className="container-px max-w-7xl mx-auto py-14">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark size="md" />
            <div>
              <div className="font-display font-bold">Физика финансов</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 · в. мещеряков</div>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-4">Навигация</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-accent transition">Главная</a></li>
            <li><a href="/bigbudget" className="hover:text-accent transition">Марафон</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-4">Контакты</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://t.me/Vasily_Mescheryakov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                @Vasily_Mescheryakov
              </a>
            </li>
            <li><a href="mailto:nivz@mail.ru" className="hover:text-accent transition">nivz@mail.ru</a></li>
          </ul>
        </div>

      </div>

      <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between md:flex-wrap gap-2 md:gap-4 text-xs text-foreground/55">
        <div>ООО «ВАСЯ и&nbsp;ФИНАНСЫ»</div>
        <div>ИНН&nbsp;5040197296</div>
        <div>ОГРН&nbsp;1255000069213</div>
        <a
          href="https://nivz.getcourse.ru/PDP_Policy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition"
        >
          Политика обработки персональных&nbsp;данных
        </a>
        <a
          href="https://disk.360.yandex.ru/i/eHBNlukSATIVaA"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition"
        >
          Оферта
        </a>

      </div>
    </div>
  </footer>
);
