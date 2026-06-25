export const OrbitDiagram = ({ className = "" }: { className?: string }) => (
  <div className={`relative aspect-square ${className}`}>
    <svg
      viewBox="0 0 240 240"
      className="absolute inset-0 w-full h-full"
      fill="none"
      stroke="currentColor"
    >
      {/* три эллиптические орбиты, каждая со своим вращением */}
      <g style={{ transformOrigin: "120px 120px", animation: "spin 18s linear infinite" }}>
        <ellipse cx="120" cy="120" rx="100" ry="38" strokeWidth="1.2" className="text-foreground/40" />
        <circle r="5" cx="220" cy="120" className="fill-accent text-accent" stroke="none" />
      </g>
      <g style={{ transformOrigin: "120px 120px", animation: "spin 26s linear infinite reverse" }}>
        <ellipse
          cx="120"
          cy="120"
          rx="100"
          ry="38"
          transform="rotate(60 120 120)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          className="text-foreground/35"
        />
        <circle r="4" cx="170" cy="206.6" className="fill-chalk-coral text-chalk-coral" stroke="none" />
      </g>
      <g style={{ transformOrigin: "120px 120px", animation: "spin 34s linear infinite" }}>
        <ellipse
          cx="120"
          cy="120"
          rx="100"
          ry="38"
          transform="rotate(120 120 120)"
          strokeWidth="1.2"
          className="text-foreground/30"
        />
        <circle r="3.5" cx="70" cy="33.4" className="fill-chalk-blue text-chalk-blue" stroke="none" />
      </g>

      {/* ядро со значком рубля */}
      <circle cx="120" cy="120" r="32" className="fill-foreground" />
      <circle cx="120" cy="120" r="38" className="fill-accent/30" style={{ filter: "blur(8px)" }} />
      <text
        x="120"
        y="120"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-accent font-display"
        style={{ fontSize: "36px", fontWeight: 700 }}
      >
        ₽
      </text>
    </svg>

  </div>
);
