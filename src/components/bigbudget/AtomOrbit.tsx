export function AtomOrbit({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <g style={{ transformOrigin: "120px 120px", animation: "spin 14s linear infinite" }}>
        <ellipse cx="120" cy="120" rx="100" ry="38" />
        <circle cx="220" cy="120" r="5" fill="currentColor" stroke="none" />
      </g>
      <g style={{ transformOrigin: "120px 120px", animation: "spin 22s linear infinite reverse" }}>
        <ellipse cx="120" cy="120" rx="100" ry="38" transform="rotate(60 120 120)" />
        <circle cx="170" cy="206.6" r="5" fill="currentColor" stroke="none" />
      </g>
      <g style={{ transformOrigin: "120px 120px", animation: "spin 30s linear infinite" }}>
        <ellipse cx="120" cy="120" rx="100" ry="38" transform="rotate(120 120 120)" />
        <circle cx="70" cy="33.4" r="5" fill="currentColor" stroke="none" />
      </g>

      {/* ядро со значком рубля */}
      <circle cx="120" cy="120" r="28" fill="currentColor" stroke="none" />
      <text
        x="120"
        y="122"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1a1a1a"
        stroke="none"
        style={{ fontSize: "34px", fontWeight: 700, fontFamily: "Georgia, serif" }}
      >
        ₽
      </text>
    </svg>
  );
}
