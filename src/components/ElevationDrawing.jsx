/**
 * Elevation of a kitchen run, drawn the way the workshop draws it before
 * building: hairlines, real dimensions, a hatched floor. The lines draw
 * themselves once on load — the page's only unprompted motion.
 */
export default function ElevationDrawing() {
  // Stagger: carcass first, then doors and fronts, then the dimensions.
  const step = (i) => ({ animationDelay: `${0.15 + i * 0.09}s` })

  return (
    <svg
      viewBox="0 0 680 470"
      className="h-auto w-full max-w-full"
      role="img"
      aria-label="Технички цртеж на кујна во елевација, широка 3200 милиметри"
      fill="none"
      strokeLinecap="square"
    >
      {/* Cabinet bodies, tinted so the drawing reads as wood rather than blueprint */}
      <g className="ink-in" style={{ animationDelay: "1.1s" }} fill="var(--color-caramel)" opacity="0.45">
        <rect x="40" y="60" width="600" height="112" />
        <rect x="40" y="262" width="600" height="146" />
      </g>
      <g className="ink-in" style={{ animationDelay: "1.2s" }} fill="var(--color-mocha)" opacity="0.35">
        <rect x="40" y="250" width="600" height="12" />
      </g>

      {/* Carcass */}
      <g stroke="var(--color-ink)" strokeWidth="1.25">
        <rect className="draw" pathLength="1" style={step(0)} x="40" y="60" width="600" height="112" />
        <rect className="draw" pathLength="1" style={step(1)} x="40" y="250" width="600" height="12" />
        <rect className="draw" pathLength="1" style={step(2)} x="40" y="262" width="600" height="146" />
      </g>

      {/* Fronts: four wall units above, a drawer stack and three doors below */}
      <g stroke="var(--color-ink)" strokeWidth="0.75">
        {[190, 340, 490].map((x, i) => (
          <line className="draw" pathLength="1" style={step(3 + i)} key={`u${x}`} x1={x} y1="60" x2={x} y2="172" />
        ))}
        {[190, 340, 490].map((x, i) => (
          <line className="draw" pathLength="1" style={step(6 + i)} key={`b${x}`} x1={x} y1="262" x2={x} y2="408" />
        ))}
        {[311, 360].map((y, i) => (
          <line className="draw" pathLength="1" style={step(9 + i)} key={`d${y}`} x1="40" y1={y} x2="190" y2={y} />
        ))}
      </g>

      {/* Handles */}
      <g stroke="var(--color-cocoa)" strokeWidth="2.5" className="ink-in" style={{ animationDelay: "1.3s" }}>
        <line x1="100" y1="286" x2="130" y2="286" />
        <line x1="100" y1="335" x2="130" y2="335" />
        <line x1="100" y1="384" x2="130" y2="384" />
        <line x1="205" y1="290" x2="205" y2="330" />
        <line x1="325" y1="290" x2="325" y2="330" />
        <line x1="505" y1="290" x2="505" y2="330" />
        <line x1="175" y1="150" x2="175" y2="164" />
        <line x1="325" y1="150" x2="325" y2="164" />
        <line x1="505" y1="150" x2="505" y2="164" />
      </g>

      {/* Floor line and hatching below it */}
      <g stroke="var(--color-ink)">
        <line className="draw" pathLength="1" style={step(11)} x1="20" y1="408" x2="660" y2="408" strokeWidth="1.25" />
      </g>
      <g stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.45" className="ink-in" style={{ animationDelay: "1.25s" }}>
        {Array.from({ length: 40 }, (_, i) => (
          <line key={i} x1={20 + i * 16} y1="420" x2={32 + i * 16} y2="408" />
        ))}
      </g>

      {/* Dimensions — the only cinnamon on the page */}
      <g
        stroke="var(--color-cinnamon)"
        fill="var(--color-cinnamon)"
        strokeWidth="0.75"
        className="ink-in"
        style={{ animationDelay: "1.35s" }}
      >
        {/* Overall width */}
        <line x1="40" y1="24" x2="286" y2="24" />
        <line x1="394" y1="24" x2="640" y2="24" />
        <line x1="40" y1="17" x2="40" y2="31" />
        <line x1="640" y1="17" x2="640" y2="31" />
        <text x="340" y="28" textAnchor="middle" fontSize="12.5" stroke="none" letterSpacing="0.06em">
          3200 мм
        </text>

        {/* Worktop height from the floor */}
        <line x1="22" y1="262" x2="22" y2="310" />
        <line x1="22" y1="360" x2="22" y2="408" />
        <line x1="15" y1="262" x2="29" y2="262" />
        <line x1="15" y1="408" x2="29" y2="408" />
        <text
          x="22"
          y="340"
          textAnchor="middle"
          fontSize="12.5"
          stroke="none"
          letterSpacing="0.06em"
          transform="rotate(-90 22 340)"
        >
          900 мм
        </text>

        {/* One base unit */}
        <line x1="490" y1="440" x2="537" y2="440" />
        <line x1="593" y1="440" x2="640" y2="440" />
        <line x1="490" y1="433" x2="490" y2="447" />
        <line x1="640" y1="433" x2="640" y2="447" />
        <text x="565" y="444" textAnchor="middle" fontSize="12.5" stroke="none" letterSpacing="0.06em">
          600 мм
        </text>
      </g>
    </svg>
  )
}
