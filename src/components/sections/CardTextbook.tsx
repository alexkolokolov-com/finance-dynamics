const laws = [
  {
    n: "I",
    tag: "инерция",
    title: "Закон инерции",
    text:
      "Деньги двигаются туда, куда двигались вчера, пока вы не приложите силу. Почему одни копят автоматически, а другие каждый месяц начинают с нуля — и что общего у этого с телегой, которая катится под горку.",
    illustration: (
      <svg viewBox="0 0 360 200" className="w-full h-auto">
        {/* наклонная плоскость */}
        <line
          x1="40"
          y1="160"
          x2="320"
          y2="60"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* штриховка под плоскостью */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 60 + i * 18;
          const y = 160 - ((x - 40) / 280) * 100;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x - 8}
              y2={y + 10}
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              opacity="0.55"
            />
          );
        })}
        {/* телега — корпус */}
        {(() => {
          const x = 130;
          const y = 160 - ((x - 40) / 280) * 100;
          const angle = -Math.atan2(100, 280) * (180 / Math.PI);
          return (
            <g transform={`translate(${x} ${y - 18}) rotate(${angle})`}>
              <rect
                x="-22"
                y="-14"
                width="44"
                height="20"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.8"
              />
              <text
                x="0"
                y="2"
                fontFamily="Cormorant Garamond, serif"
                fontStyle="italic"
                fontSize="12"
                fill="hsl(var(--foreground))"
                textAnchor="middle"
              >
                m
              </text>
              <circle
                cx="-12"
                cy="14"
                r="6"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="14"
                r="6"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
              />
            </g>
          );
        })()}
        {/* стрелка скорости v */}
        <g>
          <line
            x1="170"
            y1="80"
            x2="270"
            y2="45"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 45 L 258 44 M 270 45 L 263 53"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <text
            x="220"
            y="55"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="16"
            fill="hsl(var(--foreground))"
          >
            v
          </text>
        </g>
      </svg>
    ),
  },
  {
    n: "II",
    tag: "ускорение",
    title: "Закон ускорения",
    text:
      "Скорость роста капитала = сила усилия ÷ тяжесть образа жизни. Можно зарабатывать миллион и стоять на месте. Можно откладывать по 5 тысяч и ускоряться. Разбираем, почему так.",
    illustration: (
      <svg viewBox="0 0 360 200" className="w-full h-auto">
        {/* кривая ускорения */}
        <path
          d="M 30 160 Q 110 158, 180 130 T 330 30"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* конечная точка */}
        <circle
          cx="330"
          cy="30"
          r="5"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
        />
        {/* формула a = F/m */}
        <g transform="translate(120 95)">
          <text
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="16"
            fill="hsl(var(--foreground))"
          >
            <tspan x="0" y="0">
              a
            </tspan>
            <tspan x="22" y="0">
              =
            </tspan>
          </text>
          {/* дробь */}
          <line
            x1="46"
            y1="-3"
            x2="120"
            y2="-3"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.4"
          />
          <text
            x="83"
            y="-9"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="14"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            F
          </text>
          <text
            x="83"
            y="13"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="14"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            m
          </text>
          {/* подписи */}
          <text
            x="130"
            y="-9"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="12"
            fill="hsl(var(--foreground))"
            opacity="0.7"
          >
            усилие
          </text>
          <text
            x="130"
            y="13"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="12"
            fill="hsl(var(--chalk-coral))"
          >
            (образ жизни)
          </text>
        </g>
      </svg>
    ),
  },
  {
    n: "III",
    tag: "действие = противодействие",
    title: "Действие и противодействие",
    text:
      "Каждому рублю дохода равен рубль чьего-то расхода. Взрослый взгляд на то, откуда берутся зарплаты, прибыли и дивиденды — и как это меняет ваши решения о деньгах.",
    illustration: (
      <svg viewBox="0 0 360 200" className="w-full h-auto">
        {/* левый кружок */}
        <circle
          cx="70"
          cy="100"
          r="30"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.8"
        />
        <text
          x="70"
          y="106"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="18"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          ₽→
        </text>
        {/* правый кружок */}
        <circle
          cx="290"
          cy="100"
          r="30"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.8"
        />
        <text
          x="290"
          y="106"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="18"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          ←₽
        </text>
        {/* верхняя стрелка F12 */}
        <line
          x1="105"
          y1="80"
          x2="255"
          y2="80"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        <path
          d="M 255 80 L 245 75 M 255 80 L 245 85"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="180"
          y="72"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="14"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          F₁₂
        </text>
        {/* нижняя стрелка F21 */}
        <line
          x1="255"
          y1="125"
          x2="105"
          y2="125"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        <path
          d="M 105 125 L 115 120 M 105 125 L 115 130"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="180"
          y="148"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="14"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          F₂₁ = −F₁₂
        </text>
      </svg>
    ),
  },
];

export const CardTextbook = () => {
  return (
    <section
      id="textbook"
      className="relative py-24 md:py-32 overflow-hidden bg-grid scroll-mt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* заголовок и интро */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
            Статьи из <span className="italic font-normal">учебника</span>.
          </h2>
          <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
            Я решил написать книгу, без обещаний быстрого результата. В ней
            доступным языком я расскажу о законах накопления. Без волшебства,
            только то, что возможно в реальности.
          </p>
        </div>

        {/* три карточки статей */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {laws.map((law, i) => (
            <article
              key={law.n}
              className="col-span-12 md:col-span-4 group relative bg-card border border-foreground/15 p-8 md:p-10 flex flex-col animate-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-8">
                {law.title}
              </h3>

              <div
                className="w-full mb-8 p-5 border border-dashed"
                style={{ borderColor: "hsl(var(--foreground) / 0.25)" }}
              >
                {law.illustration}
              </div>

              <p className="font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1">
                {law.text}
              </p>

              <div className="mt-8 pt-6 border-t border-dashed border-foreground/20">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/90 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                  читать <span className="text-base">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
