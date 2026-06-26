import { useEffect, useRef, useState } from 'react'

// A susuwatari (soot sprite) that follows the mouse with a soft trailing lag,
// and scatters konpeito (star candy) wherever you click.

const KONPEITO_COLORS = ['#ff9ec4', '#ffd86b', '#9ad9ff', '#b6e8a0', '#d3b4ff', '#ffb38a']

function Sprite({ size = 34 }) {
  const N = 18
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.3
  const spike = size * 0.16
  const spikes = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2
    return {
      x1: cx + Math.cos(a) * (r - 1),
      y1: cy + Math.sin(a) * (r - 1),
      x2: cx + Math.cos(a) * (r + spike),
      y2: cy + Math.sin(a) * (r + spike),
    }
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="soot__svg">
      <g stroke="#23202b" strokeWidth="2" strokeLinecap="round">
        {spikes.map((s, i) => (
          <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill="#26222e" />
      {/* eyes */}
      <ellipse cx={cx - r * 0.42} cy={cy - r * 0.18} rx={r * 0.32} ry={r * 0.42} fill="#fff" />
      <ellipse cx={cx + r * 0.42} cy={cy - r * 0.18} rx={r * 0.32} ry={r * 0.42} fill="#fff" />
      <circle cx={cx - r * 0.38} cy={cy - r * 0.1} r={r * 0.15} fill="#1a1820" />
      <circle cx={cx + r * 0.46} cy={cy - r * 0.1} r={r * 0.15} fill="#1a1820" />
    </svg>
  )
}

export default function SootCursor() {
  const main = useRef(null)
  const g1 = useRef(null)
  const g2 = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [bits, setBits] = useState([])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('soot-on')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const p0 = { ...target }
    const p1 = { ...target }
    const p2 = { ...target }

    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf
    const tick = () => {
      p0.x += (target.x - p0.x) * 0.22
      p0.y += (target.y - p0.y) * 0.22
      p1.x += (p0.x - p1.x) * 0.28
      p1.y += (p0.y - p1.y) * 0.28
      p2.x += (p1.x - p2.x) * 0.32
      p2.y += (p1.y - p2.y) * 0.32
      if (main.current) main.current.style.transform = `translate(${p0.x}px, ${p0.y}px)`
      if (g1.current) g1.current.style.transform = `translate(${p1.x}px, ${p1.y}px)`
      if (g2.current) g2.current.style.transform = `translate(${p2.x}px, ${p2.y}px)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onDown = (e) => {
      const base = Date.now() + Math.random()
      const n = 6
      const parts = Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + Math.random()
        const dist = 34 + Math.random() * 30
        return {
          id: `${base}-${i}`,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(a) * dist,
          dy: Math.sin(a) * dist - 14,
          rot: Math.floor(Math.random() * 360),
          c: KONPEITO_COLORS[i % KONPEITO_COLORS.length],
        }
      })
      setBits((b) => [...b, ...parts])
      const ids = new Set(parts.map((p) => p.id))
      setTimeout(() => setBits((b) => b.filter((p) => !ids.has(p.id))), 900)
    }
    window.addEventListener('mousedown', onDown)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      document.body.classList.remove('soot-on')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={g2} className="soot soot--ghost soot--g2"><Sprite size={22} /></div>
      <div ref={g1} className="soot soot--ghost soot--g1"><Sprite size={28} /></div>
      <div ref={main} className="soot soot--main"><Sprite size={36} /></div>
      {bits.map((p) => (
        <span
          key={p.id}
          className="konpeito"
          style={{
            left: p.x,
            top: p.y,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            background: p.c,
          }}
        />
      ))}
    </>
  )
}
