import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { profile, about, skills, projects, experience, education } from './data.js'

// Render **bold** markers in content strings as <strong> for keyword emphasis.
function rich(text) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part,
  )
}

/* ============================================================================
   Scroll-driven dreamscape — the base color + the three glow blobs interpolate
   between these light-green "scenes" as you scroll down the page.
============================================================================ */
const SCENES = [
  { bg: '#f1f8ee', a: '#d9f0d2', b: '#cdeede', c: '#e9f5d6' }, // top — fresh mint-lime
  { bg: '#ecf6f0', a: '#c7ecdb', b: '#d7f0cd', c: '#dcf3e9' }, // sage / aqua
  { bg: '#eef6f5', a: '#c5ece9', b: '#d3efda', c: '#d9f3e6' }, // soft teal-green
  { bg: '#f0f6ea', a: '#dcf0c6', b: '#c9edd7', c: '#e4f4d3' }, // light lime
  { bg: '#edf7f1', a: '#cdeede', b: '#d8f1cf', c: '#e0f3e7' }, // calm mint
]
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (h1, h2, t) => {
  const a = hexRgb(h1), b = hexRgb(h2)
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}
function sceneAt(p) {
  const n = SCENES.length - 1
  const x = Math.max(0, Math.min(1, p)) * n
  const i = Math.min(Math.floor(x), n - 1)
  const t = x - i
  const A = SCENES[i], B = SCENES[i + 1]
  return { bg: mix(A.bg, B.bg, t), a: mix(A.a, B.a, t), b: mix(A.b, B.b, t), c: mix(A.c, B.c, t) }
}

/* ============================================================================
   HERO LINE-ART — a single continuous "one-line" drawing of a woman standing at a
   height-adjustable standing desk with a monitor. The whole figure + desk is ONE
   unbroken path that traces itself; the monitor draws first, then the long line,
   then a small green indicator dot. Clicking remounts the group to replay it.
============================================================================ */
const MAIN_LINE =
  'M60 540 L150 540 L150 302 L372 302 ' +
  'C386 300 400 295 412 289 ' +            /* desktop edge sweeps into her hand */
  'C460 267 508 243 543 216 ' +            /* forearm up to shoulder */
  'C549 206 549 196 550 187 ' +            /* neck */
  'C543 180 538 168 541 150 ' +            /* jaw + face front */
  'C543 122 553 104 575 102 ' +            /* forehead over crown */
  'C595 101 603 115 599 131 ' +            /* back of crown */
  'C612 140 611 158 600 168 ' +            /* back of head */
  'C616 177 611 193 598 192 ' +            /* ponytail bump */
  'C590 192 585 188 582 184 ' +            /* nape */
  'C584 206 580 215 572 225 ' +            /* back of neck */
  'C586 259 594 297 588 333 ' +            /* spine + back down to hips */
  'C575 380 560 430 552 470 ' +            /* front thigh — upright */
  'C548 500 544 522 542 535 ' +            /* front shin to foot */
  'C512 546 486 544 482 536 ' +            /* front shoe (points left) */
  'C500 532 525 533 542 533 ' +
  'C560 500 572 450 580 420 ' +            /* up inner leg to hips */
  'C588 455 596 495 604 522 ' +            /* back leg down */
  'C608 532 612 536 616 536 ' +
  'C588 546 562 544 558 536 ' +            /* back shoe */
  'C576 532 600 533 616 533 ' +
  'C672 534 706 540 740 540'               /* line settles onto the floor */

const MONITOR_LINE = 'M188 300 L196 206 L298 214 L290 300 Z'

function HeroArt({ drawKey }) {
  return (
    <svg
      className="heroart"
      viewBox="0 0 760 600"
      fill="none"
      role="img"
      aria-label="Single continuous line drawing of a woman standing at a height-adjustable standing desk, working at a computer"
    >
      {/* key forces a remount so the CSS draw animation replays on click */}
      <g key={drawKey}>
        <path className="ln draw-mono" pathLength="1" d={MONITOR_LINE} />
        <path className="ln draw-main" pathLength="1" d={MAIN_LINE} />
        {/* small green indicator light on the monitor */}
        <circle className="dot" cx="283" cy="293" r="5" />
      </g>
    </svg>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="toggle" onClick={onToggle} aria-label="Toggle dark mode" title="Toggle dark mode">
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}

function Nav({ theme, onToggle }) {
  const links = [
    ['about', 'Profile'], ['skills', 'Skills'], ['experience', 'Internship'],
    ['projects', 'Projects'], ['education', 'Education'], ['contact', 'Contact'],
  ]
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          {profile.initials}<span className="nav__dot" />
        </a>
        <div className="nav__links">
          {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </nav>
  )
}

/* ============================================================================
   Hand-drawn botanical wreath — feathery fronds, leaf sprigs and berry stems
   composed around a ring for an organic, illustrated look (white line-art).
============================================================================ */
const f1 = (v) => Number(v).toFixed(1)

function buildSprig({ type, len, leaf, n }) {
  const items = []
  items.push({ t: 'path', cls: 'stem', d: `M0 0 C ${f1(len * 0.35)} -3 ${f1(len * 0.7)} -3 ${f1(len)} -1` })
  const at = (u) => ({ x: u * len, y: -3 * (4 * u * (1 - u)) })

  if (type === 'pine' || type === 'fern') {
    for (let i = 1; i <= n; i++) {
      const u = i / (n + 1)
      const { x, y } = at(u)
      const s = leaf * (1 - 0.5 * u)
      items.push({ t: 'path', cls: 'frond', d: `M${f1(x)} ${f1(y)} q ${f1(s * 0.25)} ${f1(-s * 0.7)} ${f1(s * 0.7)} ${f1(-s * 1.25)}` })
      items.push({ t: 'path', cls: 'frond', d: `M${f1(x)} ${f1(y)} q ${f1(s * 0.25)} ${f1(s * 0.7)} ${f1(s * 0.7)} ${f1(s * 1.25)}` })
    }
    items.push({ t: 'path', cls: 'frond', d: `M${f1(len)} -1 q ${f1(leaf * 0.2)} ${f1(-leaf * 0.4)} ${f1(leaf * 0.5)} ${f1(-leaf * 0.7)}` })
  } else if (type === 'leaf') {
    for (let i = 1; i <= n; i++) {
      const u = i / (n + 1)
      const { x, y } = at(u)
      const s = leaf
      const dir = i % 2 ? 1 : -1
      items.push({ t: 'path', cls: 'leafline', d: `M${f1(x)} ${f1(y)} c ${f1(s * 0.15)} ${f1(dir * s * 0.5)} ${f1(s * 0.55)} ${f1(dir * s * 0.85)} ${f1(s)} ${f1(dir * s)} c ${f1(-s * 0.3)} ${f1(-dir * s * 0.55)} ${f1(-s * 0.55)} ${f1(-dir * s * 0.8)} ${f1(-s)} ${f1(-dir * s)} z` })
    }
  } else { /* berry */
    for (let i = 1; i <= n; i++) {
      const u = i / (n + 0.6)
      const { x, y } = at(u)
      const dir = i % 2 ? 1 : -1
      const ex = x + leaf * 0.45
      const ey = y + dir * leaf * 0.85
      items.push({ t: 'path', cls: 'stem', d: `M${f1(x)} ${f1(y)} L ${f1(ex)} ${f1(ey)}` })
      items.push({ t: 'circle', cls: 'berry', cx: f1(ex), cy: f1(ey), r: 1.9 })
    }
  }
  return items
}

const WREATH_NODES = (() => {
  const TYPES = ['pine', 'berry', 'leaf', 'fern', 'berry', 'leaf', 'pine', 'leaf', 'berry', 'fern', 'leaf', 'berry', 'pine', 'leaf', 'berry', 'fern']
  const CFG = {
    pine: { len: 64, leaf: 11, n: 13 },
    fern: { len: 50, leaf: 8, n: 11 },
    leaf: { len: 42, leaf: 8, n: 5 },
    berry: { len: 32, leaf: 9, n: 4 },
  }
  const N = TYPES.length
  return TYPES.map((type, i) => ({
    a: i * (360 / N) + (i % 2 ? 4 : -3),
    s: 0.9 + (i % 3) * 0.07,
    tilt: i % 2 ? -5 : 4,
    type,
    ...CFG[type],
  }))
})()

/* Second, interleaved layer of smaller sprigs to close the gaps and add depth. */
const WREATH_FILL = (() => {
  const TYPES = ['berry', 'leaf', 'fern', 'berry', 'leaf', 'berry', 'fern', 'leaf', 'berry', 'leaf', 'fern', 'berry', 'leaf', 'berry', 'fern', 'leaf']
  const CFG = {
    fern: { len: 34, leaf: 6, n: 8 },
    leaf: { len: 26, leaf: 6, n: 4 },
    berry: { len: 22, leaf: 7, n: 3 },
  }
  const N = TYPES.length
  const step = 360 / N
  return TYPES.map((type, i) => ({
    a: i * step + step / 2 + (i % 2 ? -3 : 3),
    s: 0.62 + (i % 2) * 0.06,
    tilt: i % 2 ? 9 : -9,
    ty: 56, /* sits slightly inside the main ring */
    type,
    ...CFG[type],
  }))
})()

/* Third micro-layer: tiny leaves & berries scattered to fully close the gaps. */
const WREATH_MICRO = (() => {
  const N = 28
  const step = 360 / N
  return Array.from({ length: N }, (_, i) => {
    const type = i % 3 === 0 ? 'leaf' : 'berry'
    const cfg = type === 'leaf' ? { len: 16, leaf: 4, n: 3 } : { len: 13, leaf: 5, n: 2 }
    return {
      a: i * step + step * 0.25 + (i % 2 ? 2 : -2),
      s: 0.42 + (i % 3) * 0.05,
      tilt: i % 2 ? 14 : -12,
      ty: i % 2 ? 47 : 61, /* scatter just inside & outside the ring */
      type,
      ...cfg,
    }
  })
})()

function Wreath() {
  const layers = [...WREATH_NODES, ...WREATH_FILL, ...WREATH_MICRO]
  return (
    <svg className="hero__wreath" viewBox="0 0 400 400" aria-hidden="true">
      {/* continuous base vine that connects every sprig into one wreath */}
      <circle className="vine" cx="200" cy="200" r="150" />
      {layers.map((node, i) => (
        <g key={i} transform={`rotate(${node.a} 200 200)`}>
          <g transform={`translate(200 ${node.ty ?? 50}) scale(${node.s}) rotate(${node.tilt})`}>
            {buildSprig(node).map((it, j) =>
              it.t === 'circle'
                ? <circle key={j} className={it.cls} cx={it.cx} cy={it.cy} r={it.r} />
                : <path key={j} className={it.cls} d={it.d} />,
            )}
          </g>
        </g>
      ))}
    </svg>
  )
}

/* A small glowing butterfly that slowly drifts around the wreath. */
function Butterfly() {
  return (
    <div className="orbit" aria-hidden="true">
      <span className="butterfly">
        <svg viewBox="0 0 32 32" width="26" height="26">
          <g className="wings">
            <path className="wing" d="M16 16 C 6 3 -3 10 4 18 C -2 25 9 29 16 18 Z" />
            <path className="wing" d="M16 16 C 26 3 35 10 28 18 C 34 25 23 29 16 18 Z" />
          </g>
          <line className="bfly-body" x1="16" y1="8" x2="16" y2="23" />
          <path className="bfly-ant" d="M16 8 C 14 4 12 3 11 2 M16 8 C 18 4 20 3 21 2" />
        </svg>
      </span>
    </div>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__stage">
        <div className="hero__photo">
          <span className="hero__halo" aria-hidden="true" />
          <Wreath />
          <span className="hero__ring" aria-hidden="true" />
          <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt={profile.name} loading="eager" />
          <Butterfly />
        </div>
        <a className="hero__scroll" href="#hero-intro" aria-label="Scroll to content">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </a>
      </div>

      <div className="hero__intro reveal" id="hero-intro">
        <p className="hero__eyebrow"><span className="hero__pin" /> {profile.availability}</p>
        <h1 className="hero__name">{profile.name}<span className="hero__period">.</span></h1>
        <p className="hero__role">{profile.roles.join(' · ')}</p>
        <p className="hero__tag">{rich(profile.tagline)}</p>
        <div className="hero__cta">
          {profile.resume && (
            <a className="btn btn--solid" href={profile.resume} target="_blank" rel="noreferrer">Download Résumé</a>
          )}
          <a className="btn btn--ghost" href="#projects">View Projects</a>
        </div>
      </div>
    </header>
  )
}

function Section({ id, kicker, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="section__head reveal">
        <span className="section__kicker"><span className="section__dot" />{kicker}</span>
        <h2 className="section__title">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function About() {
  return (
    <Section id="about" kicker="Profile" title="A little about me">
      <div className="cards cards--about">
        <article className="card card--about reveal">
          {about.paragraphs.map((p, i) => <p key={i} className="prose">{rich(p)}</p>)}
        </article>
        <article className="card card--stats reveal" style={{ transitionDelay: '.1s' }}>
          {about.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </article>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" kicker="Skills" title="Tools I work with">
      <div className="cards cards--skills">
        {skills.map((g, i) => (
          <article className="card card--skill reveal" style={{ transitionDelay: `${i * 0.08}s` }} key={g.category}>
            <h3 className="card__title card__title--sm">{g.category}</h3>
            <div className="pills">{g.items.map((it) => <span className="pill" key={it}>{it}</span>)}</div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* Reusable vertical timeline used for Internship Experience and Education. */
function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div className="tline reveal" style={{ transitionDelay: `${i * 0.1}s` }} key={i}>
          <span className="tline__dot" />
          <article className="card tline__card">
            <div className="card__row">
              <h3 className="card__title card__title--sm">{it.title}</h3>
              <span className="card__when">{it.period}</span>
            </div>
            <p className="card__org">{it.org}</p>
            {it.detail && <p className="prose prose--sm">{rich(it.detail)}</p>}
            {it.points && <ul className="bullets">{it.points.map((pt, j) => <li key={j}>{rich(pt)}</li>)}</ul>}
          </article>
        </div>
      ))}
    </div>
  )
}

function ExperienceSection() {
  const items = experience.map((e) => ({ title: e.role, period: e.period, org: e.org, points: e.points }))
  return (
    <Section id="experience" kicker="Internship Experience" title="Where I've worked">
      <Timeline items={items} />
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" kicker="Project Experience" title="Things I've built">
      <div className="cards cards--proj">
        {projects.map((p) => (
          <article className="card card--feature reveal" key={p.title}>
            <span className="card__tag">{p.tag}</span>
            <h3 className="card__title">{p.title}</h3>
            <p className="prose">{rich(p.blurb)}</p>
            <div className="pills">{p.tech.map((t) => <span className="pill" key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  const items = education.map((e) => ({ title: e.degree, period: e.period, org: e.org, detail: e.detail }))
  return (
    <Section id="education" kicker="Education" title="Where I studied">
      <Timeline items={items} />
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" kicker="Contact" title="Let's build something">
      <article className="card card--contact reveal">
        <p className="prose">Open to opportunities and collaborations. The fastest way to reach me is by email.</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.resume && (
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">Download Résumé</a>
          )}
        </div>
        <div className="contact__meta">
          <span>📍 {profile.location}</span>
          {profile.phone && <span>{profile.phone}</span>}
          {profile.links.map((l) => (
            <a key={l.type} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </div>
      </article>
    </Section>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // Buttery smooth (inertia) scrolling via Lenis + smooth anchor navigation.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lenis, raf = 0, onClick
    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      })
      const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)

      onClick = (e) => {
        const a = e.target.closest('a[href^="#"]')
        if (!a) return
        const href = a.getAttribute('href')
        if (href.length > 1) {
          const el = document.querySelector(href)
          if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -70 }) }
        }
      }
      document.addEventListener('click', onClick)
    } catch {
      /* fall back to native scrolling */
    }
    return () => {
      if (onClick) document.removeEventListener('click', onClick)
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.destroy()
    }
  }, [])

  // Scroll-driven background: recolor the base + glow blobs as the page scrolls.
  useEffect(() => {
    const root = document.documentElement
    const vars = ['--bg', '--d-a', '--d-b', '--d-c']
    let raf = 0
    const apply = () => {
      raf = 0
      if (root.getAttribute('data-theme') === 'dark') {
        vars.forEach((v) => root.style.removeProperty(v))
        return
      }
      const max = root.scrollHeight - window.innerHeight
      const s = sceneAt(max > 0 ? window.scrollY / max : 0)
      root.style.setProperty('--bg', s.bg)
      root.style.setProperty('--d-a', s.a)
      root.style.setProperty('--d-b', s.b)
      root.style.setProperty('--d-c', s.c)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [theme])

  // Reveal sections / cards as they scroll into view (fade + slide up).
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal--in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('reveal--in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="dreamscape" aria-hidden="true" />
      <Nav theme={theme} onToggle={toggle} />
      <Hero />
      <main className="container">
        <About />
        <Skills />
        <ExperienceSection />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="foot">
        <div className="container">© 2026 {profile.name} · Designed &amp; built with React</div>
      </footer>
    </>
  )
}
