## Что сверял

Прошёл каждый блок построчно по исходникам PPP: `NegotiationsHero.tsx`, `NegotiationsPains.tsx`, `NegotiationsExpert.tsx`, `NegotiationsMethod.tsx`, `NegotiationsSteps.tsx`, `NegotiationsResults.tsx`, `NegotiationsTestimonials.tsx`, `NegotiationsIntroverts.tsx`, `data/negotiationsData.ts`. Ниже — расхождения и как их привести к дизайн-системе «Вася и финансы» (hard-shadow, без радиусов, `bg-card`/`border border-foreground/15`, `font-serif-display` заголовки, `font-mono` эйбров, цвет `accent` вместо PPP-`v2-green`, `destructive` там где в PPP красный).

Ассеты: копирую `hero-photo-new.png`, `expert-chair.png`, `expert-desktop.png` из PPP в `src/assets/`. `clock-method-new.png`, `testimonial-yulia/tatyana/valentina.png` уже скопированы.

---

## Блок Hero

Проблемы: фото не PPP; нет мобильной подписи «онлайн-интенсив».

Правки:
- Импорт `hero-photo-new.png` вместо `expert-vasily.jpg` для правой колонки.
- Оставить рамочный wrapper (полоса `bg-accent/15`, бордер) — это наша дизайн-система, в PPP была маска-градиент, у нас — hard-shadow-карточка. Оставляем hard-shadow.
- Подпись под фото: «Василий Мещеряков» + «эксперт по переговорам» — уже есть, не трогаю.
- Пилюли и всё остальное — не меняю.

## Блок «Мы проигрываем переговоры»

Проблемы: нет иконок (в PPP `Flame`, `HandCoins`, `EyeOff` из `lucide-react`); карточки без иконки.

Правки:
- Импортировать `Flame, HandCoins, EyeOff` из `lucide-react`.
- В каждой карточке слева квадрат `w-10 h-10 border border-destructive/25 bg-destructive/5` с иконкой `text-destructive` (используем токен `destructive` — он есть в шаблоне; если нет, `text-accent`/`border-accent/25`). Убрать эйбров «01/02/03».
- В подзаголовке «теряем деньги» — сейчас `text-accent`; в PPP `text-destructive`. Оставить `text-accent` (в бренде красный = terracotta accent).
- «под давлением» — `text-accent font-semibold`.

## Блок «Об эксперте»

Проблемы: (1) фото не то — надо `expert-desktop.png` (десктоп) + `expert-chair.png` (мобилка); (2) блок «Как я стал тренером…» полностью свёрнут — в PPP видно превью ~3 строки с fade-mask, кнопка со стрелкой `ChevronDown`; (3) у элементов кредлистов нет иконок (в PPP `Briefcase, Award, TrendingUp, Star`).

Правки:
- Импорт `expertChair`, `expertDesktop`, иконки `Briefcase, Award, TrendingUp, Star, ChevronDown` из `lucide-react`.
- Layout `md:grid-cols-[45%_1fr]`: слева фото `expertDesktop` с маской-градиентом справа как в PPP; мобилка — `expertChair` квадратом. Обёртка вписана в текущую секцию `bg-card border-y border-foreground/10`.
- CredentialsList: рядом с каждым пунктом квадрат `w-8 h-8 border border-accent/30 bg-accent/10` с иконкой `text-accent`; «4.92» подсветить `text-accent font-semibold`.
- TrainerStory: превью раскрыто по умолчанию — `max-h-[4.5em]` в свёрнутом состоянии + `mt-3`, при раскрытии `max-h-[2000px] mt-4`, `transition-all duration-500`. Внизу fade-градиент `linear-gradient(to bottom, transparent, hsl(var(--card)))`. Кнопка-триггер: `text-accent font-medium text-sm` с иконкой `ChevronDown`, поворот на 180° при open. Тексты все 7 абзацев дословно из PPP; выделения `text-foreground font-medium` на фразах: «в следующем году получить 100% пятёрок», «На это ушло 5 лет», «вы получите знания о переговорах, с которыми увеличите свои доходы на 20%».

## Блок «Циферблат переговоров»

Проблемы: у нас эйбров «Авторская методика» есть, но заголовок не по системе (у нас `font-serif-display font-semibold`, а в PPP `text-2xl md:text-4xl`). Совпадает по духу — оставить как есть.

Правки:
- Убрать `rounded-full` вокруг картинки? В PPP `rounded-full` — оставить (это круглая иконка часов).
- Оставить hard-shadow + `border border-foreground/15`.

## Блок «Два шага к результату»

Проблемы: нет иконок `BookOpen`/`Rocket`.

Правки:
- Импорт `BookOpen, Rocket`.
- В шапке карточки — квадрат `w-12 h-12 border border-accent/30 bg-accent/10` с иконкой `text-accent`, рядом эйбров «ШАГ 1/2» (`font-mono text-xs uppercase tracking-widest text-accent`) и заголовок `font-serif-display font-semibold text-xl`.

## Программа

Не трогаю — оставлено по запросу.

## Акцент-блок «За один день…»

Не трогаю.

## Регистрация

Не трогаю.

## Блок «Что вам даст тренинг»

Проблемы: нет иконок `Wallet` (доход) и `Smile` (образ жизни).

Правки:
- Импорт `Wallet, Smile`.
- Верхний ряд «Доход»: квадрат `w-10 h-10 border border-accent/30 bg-accent/10` + `Wallet` `text-accent`.
- Нижний ряд «Образ жизни»: квадрат `w-10 h-10 border border-foreground/15` + `Smile` `text-foreground/60`.
- Убрать текстовые эйбров «₽ Доход / Образ жизни» из шапок карточек (в PPP их нет — иконка сама несёт смысл).

## Отзывы

Проблемы: сейчас 2-колонная сетка, все 4 карточки на одном экране; в PPP на десктопе горизонтальный скролл-снап с кнопками ‹ ›, на мобилке — 2 карточки + кнопка «Ещё отзывы»; знак цитаты — иконка `Quote` а не «"».

Правки:
- Импорт `Quote, ChevronLeft, ChevronRight`, `Avatar, AvatarImage, AvatarFallback`.
- Десктоп: `flex gap-4 overflow-x-auto snap-x snap-mandatory`, каждая карточка `w-[320px] flex-shrink-0 snap-start`; две круглые кнопки навигации абсолютно позиционированы `-left-6 / -right-6`. Использовать `scrollbar-hide` если есть в проекте, иначе inline-стиль.
- Мобилка: state `showAllMobile`, показывать 2 карточки, кнопка «Ещё отзывы» `text-accent`.
- Внутри карточки: `Quote size={24} className="text-accent/40"` вверху вместо ковычек-символа; fade-градиент под clamped-текстом; кнопка «Читать полностью» `text-accent`.
- Аватар: `Avatar` из shadcn h-10/w-10; для Анны Киселевой (`avatar: null`) — AvatarFallback с первой буквой.

## Блок «Почему укрепление отношений»

Проблемы: сейчас стоит символ «♥», в PPP — иконка `Heart` из lucide.

Правки:
- Импорт `Heart, ArrowRight`.
- Квадрат `w-10 h-10 border border-accent/30 bg-accent/10` + `Heart size={20} text-accent`.
- Кнопка CTA внизу — оставить в стиле нашей дизайн-системы (`bg-foreground text-background`, hard-shadow), но добавить `ArrowRight` иконку вместо стрелки-символа для консистентности с Hero-кнопкой.

## Дизайн-система (общее для всех блоков)

- Заголовки h2 везде оставляем `font-serif-display font-semibold` (наш Outfit) вместо PPP-дефолта — не меняем.
- Радиусы: PPP использует `rounded-xl/2xl`, у нас — hard edges + `hard-shadow`. Оставляем hard edges.
- Цвет-акцент: PPP `text-v2-green` → у нас `text-accent`.
- Красный/destructive: PPP `text-destructive` → у нас `text-destructive` если токен присутствует в `index.css`, иначе `text-accent`. Проверю перед правкой.
- Шрифт body — `font-body` (Figtree) уже глобально; специально не задаём.
- Эйбров-плашки (`Идеально для интровертов`, `Авторская методика`) — `font-mono text-xs uppercase tracking-widest text-accent`.

## Проверка

- `bun run build` — ноль ошибок.
- Визуальный обзор `/negotiations` через Playwright: скриншоты десктоп + мобилка, проверить все 8 блоков.

## Что НЕ трогаю

Программу тренинга (5 карточек + «После каждой игры»), акцент-цитату «За один день…», блок регистрации с виджетом GetCourse, SiteHeader, Footer, тексты — все дословно как согласовано.
