## Правки hero на mobile/tablet (`src/pages/Event.tsx`)

1. **Пилюли — вернуть исходный стиль**: класс `badge-tag` (как было), иконка `size={14}`. Никаких `bg-background/85 backdrop-blur-sm border font-mono text-[10px]`. Оставить только позиционирование `absolute top-3 left-3 right-3 flex flex-wrap gap-2`.
2. **Порядок пилюль**: сверху адрес (`MapPin` — Москва, Новоданиловская наб. 4), ниже дата (`Calendar` — 1 августа, 10:00–13:00).
3. **Подзаголовок**: вернуть в 2 строки — `Бизнес-завтрак` / `с Василием Мещеряковым` (не разрывать «Василием Мещеряковым»).
4. **Шрифт подзаголовка**: не менять — использовать те же классы, что и в оригинале (`font-serif-display text-xl md:text-2xl leading-snug text-foreground/80`). Никаких `text-2xl leading-tight` вне брейкпоинтов.

Десктоп — не трогаю.
