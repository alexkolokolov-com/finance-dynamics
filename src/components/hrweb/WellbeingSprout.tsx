type WellbeingSproutProps = {
  className?: string;
};

/**
 * Tall line-art sprout used as a background mark.
 *
 * Every stroke is drawn fully opaque inside a single group whose opacity is
 * applied once to the whole group, so where lines cross each other the
 * transparency never stacks into a darker patch. The drawing keeps the
 * proportions of a plant: a bud on top, a stem running the full height and
 * leaves branching along it.
 */
export const WellbeingSprout = ({ className }: WellbeingSproutProps) => (
  <svg viewBox="18 30 204 570" aria-hidden focusable="false" className={className}>
    <g
      opacity="0.18"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* bud on top of the stem */}
      <path d="M100 200 C 155 175 108 136 130 100" />
      <path d="M95 94 C 106 102 113 116 118 131 C 98 135 83 135 70 128 C 58 122 47 109 40 86 C 68 81 84 86 95 94 Z" />
      <path d="M141 60 A 70 70 0 0 0 130 100 C 149 99 163 94 173 86 C 183 76 189 63 190 40 C 163 41 150 50 141 60 Z" />

      {/* stem running the full height of the block */}
      <path d="M100 200 C 96 300 96 360 100 430 C 104 500 100 550 100 600" />

      {/* leaves branching along the stem */}
      <path d="M98 300 C 76 288 48 292 34 312 C 56 332 86 324 98 300 Z" />
      <path d="M98 300 C 78 302 58 307 40 313" />
      <path d="M100 400 C 124 388 152 394 166 414 C 144 434 112 424 100 400 Z" />
      <path d="M100 400 C 122 402 142 407 160 415" />
      <path d="M100 500 C 82 490 58 494 46 510 C 64 528 90 520 100 500 Z" />
      <path d="M100 500 C 84 502 66 506 52 511" />
    </g>
  </svg>
);
