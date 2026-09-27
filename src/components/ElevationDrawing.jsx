import { useEffect, useId, useRef, useState } from "react"

/* ---------------------------------------------------------------------------
   Geometry of the elevation, in drawing units (the viewBox is 680 × 470).
   --------------------------------------------------------------------------- */
const L = 40 // left edge of the run
const R = 640 // right edge of the run
const FLOOR = 408 // the ground line everything is measured from
const UPPER_TOP = 60
const UPPER_BOT = 172
const WORK_TOP = 250 // top of the worktop slab
const WORK_BOT = 262
const BASE_BOT = 394 // carcass stops here; the plinth is recessed under it
const BAYS = [40, 190, 340, 490, 640]
const DRAWER_LINES = [306, 350]

/* ---------------------------------------------------------------------------
   A drawing made by a person isn't made of perfect lines. Two things give it
   away, and both are baked into the path data here rather than faked with a
   filter at runtime: strokes wander a little, and they overshoot the corner
   they're heading for, so corners cross instead of meeting exactly.

   The wander has to be identical on every render or the drawing would twitch,
   so it comes from a seeded generator rather than Math.random.
   --------------------------------------------------------------------------- */
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rnd = mulberry32(20260927)
const wander = (amount) => (rnd() - 0.5) * 2 * amount

/** One hand-drawn stroke: slight wobble, and a small overshoot past each end. */
function hand(x1, y1, x2, y2, { over = 2.4, wob = 0.55 } = {}) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const nx = -uy // perpendicular, for nudging the control points off the line
  const ny = ux

  const sx = x1 - ux * over
  const sy = y1 - uy * over
  const ex = x2 + ux * over
  const ey = y2 + uy * over

  const c1x = sx + (ex - sx) / 3 + nx * wander(wob)
  const c1y = sy + (ey - sy) / 3 + ny * wander(wob)
  const c2x = sx + ((ex - sx) * 2) / 3 + nx * wander(wob)
  const c2y = sy + ((ey - sy) * 2) / 3 + ny * wander(wob)

  const n = (v) => Math.round(v * 10) / 10
  return `M${n(sx)} ${n(sy)}C${n(c1x)} ${n(c1y)} ${n(c2x)} ${n(c2y)} ${n(ex)} ${n(ey)}`
}

/** A stroke that draws itself, at a given moment in the sequence. */
function Stroke({ from, to, at, dur = 0.34, opts, ...rest }) {
  return (
    <path
      d={hand(from[0], from[1], to[0], to[1], opts)}
      pathLength="1"
      className="dw-stroke"
      style={{ "--delay": `${at}s`, "--dur": `${dur}s` }}
      {...rest}
    />
  )
}

/* ---------------------------------------------------------------------------
   The order a drawing actually gets made in: set out the guides, strike the
   ground line, box the carcasses, divide them, add the detail, hatch the
   floor, wash in the material, and dimension it last. Times are seconds.
   --------------------------------------------------------------------------- */
const T = {
  guides: 0.0,
  floor: 0.34,
  uppers: 0.62,
  worktop: 1.02,
  base: 1.22,
  plinth: 1.62,
  divisions: 1.76,
  handles: 2.12,
  hatch: 2.28,
  wash: 2.46,
  dims: 2.72,
}

export default function ElevationDrawing() {
  const uid = useId().replace(/:/g, "")
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  // Draw when the sheet is actually looked at, rather than on load — and skip
  // straight to the finished drawing when motion isn't wanted.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true)
      return
    }
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) {
      setDrawn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setDrawn(true)
        io.disconnect()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hatch = Array.from({ length: 36 }, (_, i) => 20 + i * 18)

  return (
    <svg
      ref={ref}
      data-draw={drawn ? "on" : "off"}
      viewBox="0 0 680 470"
      className="h-auto w-full max-w-full"
      role="img"
      aria-label="Технички цртеж на кујна во елевација: горни елементи, работна плоча на 900 мм и долни елементи, вкупна ширина 3200 мм"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {/* The colour wash is wiped across the drawing, the way it would be
            laid on with a marker once the linework is finished. */}
        <clipPath id={`wash-${uid}`}>
          <rect
            className="dw-wash"
            x="0"
            y="0"
            width="680"
            height="470"
            style={{ "--delay": `${T.wash}s`, "--dur": "0.9s" }}
          />
        </clipPath>
      </defs>

      {/* Setting out: light pencil guides that hold the extents while the
          drawing is made, then fade once it can stand on its own. */}
      <g stroke="var(--color-ink)" strokeWidth="0.7" strokeDasharray="4 6">
        {[
          [[L, 26], [L, 452]],
          [[R, 26], [R, 452]],
          [[16, WORK_TOP], [664, WORK_TOP]],
          [[26, UPPER_BOT], [654, UPPER_BOT]],
        ].map(([a, b], i) => (
          <line
            key={i}
            className="dw-guide"
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            style={{ "--delay": `${T.guides + i * 0.07}s`, "--dur": "3.1s" }}
          />
        ))}
      </g>

      {/* Material, washed in under the linework. */}
      <g clipPath={`url(#wash-${uid})`}>
        <g fill="var(--color-caramel)" opacity="0.5">
          <rect x={L} y={UPPER_TOP} width={R - L} height={UPPER_BOT - UPPER_TOP} />
          <rect x={L} y={WORK_BOT} width={R - L} height={BASE_BOT - WORK_BOT} />
        </g>
        <g fill="var(--color-mocha)" opacity="0.42">
          <rect x="34" y={WORK_TOP} width="612" height={WORK_BOT - WORK_TOP} />
        </g>
        <g fill="var(--color-cocoa)" opacity="0.3">
          <rect x="52" y={BASE_BOT} width="576" height={FLOOR - BASE_BOT} />
        </g>
      </g>

      {/* The ground line: the datum the whole elevation sits on, struck first. */}
      <g stroke="var(--color-ink)" strokeWidth="1.7">
        <Stroke from={[16, FLOOR]} to={[664, FLOOR]} at={T.floor} dur={0.62} opts={{ over: 0 }} />
      </g>

      {/* Carcasses, boxed one stroke at a time so the corners cross. */}
      <g stroke="var(--color-ink)" strokeWidth="1.5">
        {/* Upper run */}
        <Stroke from={[L, UPPER_TOP]} to={[R, UPPER_TOP]} at={T.uppers} dur={0.42} />
        <Stroke from={[R, UPPER_TOP]} to={[R, UPPER_BOT]} at={T.uppers + 0.1} dur={0.26} />
        <Stroke from={[R, UPPER_BOT]} to={[L, UPPER_BOT]} at={T.uppers + 0.19} dur={0.42} />
        <Stroke from={[L, UPPER_BOT]} to={[L, UPPER_TOP]} at={T.uppers + 0.29} dur={0.26} />

        {/* Worktop slab, with its overhang */}
        <Stroke from={[34, WORK_TOP]} to={[646, WORK_TOP]} at={T.worktop} dur={0.4} />
        <Stroke from={[34, WORK_BOT]} to={[646, WORK_BOT]} at={T.worktop + 0.12} dur={0.4} />

        {/* Base run */}
        <Stroke from={[L, WORK_BOT]} to={[L, BASE_BOT]} at={T.base} dur={0.28} />
        <Stroke from={[L, BASE_BOT]} to={[R, BASE_BOT]} at={T.base + 0.1} dur={0.44} />
        <Stroke from={[R, BASE_BOT]} to={[R, WORK_BOT]} at={T.base + 0.22} dur={0.28} />
      </g>

      {/* Recessed plinth under the base units. */}
      <g stroke="var(--color-ink)" strokeWidth="1.1">
        <Stroke from={[52, BASE_BOT]} to={[52, FLOOR]} at={T.plinth} dur={0.16} opts={{ over: 1.2 }} />
        <Stroke from={[52, FLOOR]} to={[628, FLOOR]} at={T.plinth + 0.06} dur={0.34} opts={{ over: 1.2 }} />
        <Stroke from={[628, FLOOR]} to={[628, BASE_BOT]} at={T.plinth + 0.16} dur={0.16} opts={{ over: 1.2 }} />
      </g>

      {/* Dividing the runs into doors and drawers — lighter, quicker strokes. */}
      <g stroke="var(--color-ink)" strokeWidth="0.9">
        {BAYS.slice(1, -1).map((x, i) => (
          <Stroke
            key={`u${x}`}
            from={[x, UPPER_TOP]}
            to={[x, UPPER_BOT]}
            at={T.divisions + i * 0.07}
            dur={0.24}
            opts={{ over: 1.4, wob: 0.45 }}
          />
        ))}
        {BAYS.slice(1, -1).map((x, i) => (
          <Stroke
            key={`b${x}`}
            from={[x, WORK_BOT]}
            to={[x, BASE_BOT]}
            at={T.divisions + 0.12 + i * 0.07}
            dur={0.26}
            opts={{ over: 1.4, wob: 0.45 }}
          />
        ))}
        {DRAWER_LINES.map((y, i) => (
          <Stroke
            key={`d${y}`}
            from={[L, y]}
            to={[190, y]}
            at={T.divisions + 0.3 + i * 0.07}
            dur={0.2}
            opts={{ over: 1.2, wob: 0.4 }}
          />
        ))}
      </g>

      {/* Handles: short, decisive marks, the last thing drawn on the fronts. */}
      <g stroke="var(--color-cocoa)" strokeWidth="2.6" strokeLinecap="round">
        {[176, 326, 476, 626].map((x, i) => (
          <Stroke
            key={`uh${x}`}
            from={[x, 144]}
            to={[x, 164]}
            at={T.handles + i * 0.035}
            dur={0.14}
            opts={{ over: 0, wob: 0.3 }}
          />
        ))}
        {[204, 354, 504].map((x, i) => (
          <Stroke
            key={`bh${x}`}
            from={[x, 276]}
            to={[x, 320]}
            at={T.handles + 0.14 + i * 0.035}
            dur={0.16}
            opts={{ over: 0, wob: 0.3 }}
          />
        ))}
        {[284, 328, 372].map((y, i) => (
          <Stroke
            key={`dh${y}`}
            from={[90, y]}
            to={[140, y]}
            at={T.handles + 0.25 + i * 0.035}
            dur={0.16}
            opts={{ over: 0, wob: 0.3 }}
          />
        ))}
      </g>

      {/* Floor hatching, scribbled in quickly the way it is by hand. */}
      <g stroke="var(--color-ink)" strokeWidth="0.65" opacity="0.5">
        {hatch.map((x, i) => (
          <Stroke
            key={`h${x}`}
            from={[x, 421]}
            to={[x + 13, FLOOR]}
            at={T.hatch + i * 0.013}
            dur={0.13}
            opts={{ over: 0.6, wob: 0.3 }}
          />
        ))}
      </g>

      {/* Dimensions last, in cinnamon — the only colour that measures. Each one
          builds the way it's drawn: extension lines out from the piece, the
          dimension line run between them, the ticks struck, the figure written. */}
      <g stroke="var(--color-cinnamon)" fill="var(--color-cinnamon)" strokeWidth="0.75">
        {/* Overall width, above the upper run */}
        <Stroke from={[L, 54]} to={[L, 22]} at={T.dims} dur={0.22} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[R, 54]} to={[R, 22]} at={T.dims + 0.05} dur={0.22} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[L, 30]} to={[290, 30]} at={T.dims + 0.16} dur={0.3} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[R, 30]} to={[390, 30]} at={T.dims + 0.16} dur={0.3} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[L - 4, 35]} to={[L + 4, 25]} at={T.dims + 0.4} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <Stroke from={[R - 4, 35]} to={[R + 4, 25]} at={T.dims + 0.43} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <text
          className="dw-in"
          style={{ "--delay": `${T.dims + 0.46}s`, "--dur": "0.45s" }}
          x="340"
          y="34"
          textAnchor="middle"
          fontSize="12.5"
          stroke="none"
          letterSpacing="0.06em"
        >
          3200 мм
        </text>

        {/* Worktop height off the floor */}
        <Stroke from={[36, WORK_TOP]} to={[14, WORK_TOP]} at={T.dims + 0.3} dur={0.2} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[36, FLOOR]} to={[14, FLOOR]} at={T.dims + 0.35} dur={0.2} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[22, WORK_TOP]} to={[22, 302]} at={T.dims + 0.46} dur={0.26} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[22, FLOOR]} to={[22, 356]} at={T.dims + 0.46} dur={0.26} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[17, WORK_TOP + 5]} to={[27, WORK_TOP - 5]} at={T.dims + 0.68} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <Stroke from={[17, FLOOR + 5]} to={[27, FLOOR - 5]} at={T.dims + 0.71} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <text
          className="dw-in"
          style={{ "--delay": `${T.dims + 0.74}s`, "--dur": "0.45s" }}
          x="22"
          y="329"
          textAnchor="middle"
          fontSize="12.5"
          stroke="none"
          letterSpacing="0.06em"
          transform="rotate(-90 22 329)"
        >
          900 мм
        </text>

        {/* One base unit, below the ground line */}
        <Stroke from={[490, BASE_BOT]} to={[490, 448]} at={T.dims + 0.58} dur={0.22} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[R, BASE_BOT]} to={[R, 448]} at={T.dims + 0.63} dur={0.22} opts={{ over: 1, wob: 0.3 }} />
        <Stroke from={[490, 440]} to={[537, 440]} at={T.dims + 0.74} dur={0.22} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[R, 440]} to={[593, 440]} at={T.dims + 0.74} dur={0.22} opts={{ over: 0, wob: 0.25 }} />
        <Stroke from={[486, 445]} to={[494, 435]} at={T.dims + 0.92} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <Stroke from={[R - 4, 445]} to={[R + 4, 435]} at={T.dims + 0.95} dur={0.1} opts={{ over: 0, wob: 0.2 }} />
        <text
          className="dw-in"
          style={{ "--delay": `${T.dims + 0.98}s`, "--dur": "0.45s" }}
          x="565"
          y="444"
          textAnchor="middle"
          fontSize="12.5"
          stroke="none"
          letterSpacing="0.06em"
        >
          600 мм
        </text>
      </g>
    </svg>
  )
}
