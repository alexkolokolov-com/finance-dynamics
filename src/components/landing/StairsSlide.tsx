import { profitLevels, priceDeadline } from "@/data/profitLevels";
import { nbsp } from "@/lib/nbsp";

// Восходящая лестница из трёх ступеней курса.
// Геометрия рассчитана под слайд 1280×720: заголовок + три карточки,
// основания выровнены по одной линии, верх уходит вверх слева направо.
// На планшете и телефоне — вертикальный столбик карточек одинаковой высоты.

const STEP_HEIGHTS = ["md:h-[17rem]", "md:h-[20rem]", "md:h-[23rem]"];

export const StairsSlide = () => (
  <div className="container-px mx-auto w-full max-w-7xl">
    <div className="mb-7 md:mb-8">
      <h2 className="font-serif-display text-4xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl">
        {nbsp("Программа")}
      </h2>
      <p className="mt-3 max-w-3xl font-serif-display text-xl italic leading-snug tracking-tight text-foreground/85 md:text-2xl lg:text-3xl">
        {nbsp("3 ступени к вашему Профиту")}
      </p>
    </div>

    <div className="grid gap-5 md:h-[23rem] md:grid-cols-3 md:items-end md:gap-4 lg:gap-6">
      {profitLevels.map((level, i) => (
        <article
          key={level.number}
          aria-label={`${level.number} ступень. ${level.title}`}
          className={`relative flex flex-col overflow-hidden border border-foreground/15 border-t-4 border-t-accent bg-card p-6 md:p-4 lg:p-5 ${STEP_HEIGHTS[i]}`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-0 font-display text-[7rem] font-semibold leading-none text-transparent opacity-20 [-webkit-text-stroke:1px_hsl(var(--foreground))] md:text-[7rem] lg:text-[8rem]"
          >
            {level.number}
          </span>

          <div className="relative z-10 flex h-full flex-col">
            <p className="font-body text-sm font-semibold text-accent">{nbsp(level.durationShort)}</p>
            <h3 className="mt-2 max-w-[13rem] font-display text-3xl font-semibold leading-none md:text-[1.45rem] lg:text-[1.75rem]">
              {nbsp(level.title)}
            </h3>
            <p className="mt-3 font-body leading-snug text-foreground/75 md:text-xs lg:text-sm">
              {nbsp(level.description)}
            </p>

            <div className="mt-auto pt-3">
              <del className="block font-display text-2xl font-semibold leading-none text-foreground/55 decoration-foreground/60 lg:text-[1.65rem]">
                {nbsp(level.oldPrice)}
              </del>
              <strong className="mt-1.5 block font-display text-2xl font-semibold leading-none text-accent lg:text-[1.65rem]">
                {nbsp(level.price)}
              </strong>
              <p className="mt-1.5 font-body text-xs text-foreground/60 lg:text-sm">{nbsp(priceDeadline)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default StairsSlide;
