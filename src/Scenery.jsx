// Ghibli-inspired watercolor scenes, hand-built in SVG.
// Soft pastel palettes + a gentle blur give a "lower-res painterly" feel,
// while a light wash over the top keeps foreground text easy to read.

const SVG = (props) => (
  <svg
    viewBox="0 0 320 200"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
)

const softDefs = (id) => (
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="0.7" />
  </filter>
)

function Cloud({ x, y, s = 1, o = 0.95 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity={o}>
      <ellipse cx="0" cy="0" rx="22" ry="11" />
      <ellipse cx="16" cy="3" rx="16" ry="9" />
      <ellipse cx="-16" cy="3" rx="15" ry="8" />
      <ellipse cx="4" cy="-7" rx="13" ry="9" />
    </g>
  )
}

// 0 — HERO: bright meadow sky
const HeroScene = (
  <SVG>
    <defs>
      <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bfe6fb" />
        <stop offset="55%" stopColor="#e8f6fb" />
        <stop offset="100%" stopColor="#f3faf0" />
      </linearGradient>
      {softDefs('hb')}
    </defs>
    <rect width="320" height="200" fill="url(#hSky)" />
    <circle cx="262" cy="40" r="26" fill="#fff4c2" opacity="0.85" filter="url(#hb)" />
    <g filter="url(#hb)">
      <Cloud x="60" y="46" s="1.1" />
      <Cloud x="210" y="70" s="0.85" o="0.9" />
      <Cloud x="135" y="32" s="0.7" o="0.8" />
    </g>
    <g filter="url(#hb)">
      <ellipse cx="70" cy="210" rx="170" ry="72" fill="#c2e39a" />
      <ellipse cx="250" cy="214" rx="180" ry="66" fill="#a9d885" />
      <ellipse cx="160" cy="226" rx="200" ry="60" fill="#92cc78" />
    </g>
  </SVG>
)

// 1 — ABOUT: dusk seaside with the little train
const AboutScene = (
  <SVG>
    <defs>
      <linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe2c0" />
        <stop offset="45%" stopColor="#f6d2e0" />
        <stop offset="72%" stopColor="#d9def2" />
        <stop offset="100%" stopColor="#bfd8ee" />
      </linearGradient>
      {softDefs('ab')}
    </defs>
    <rect width="320" height="200" fill="url(#aSky)" />
    <circle cx="160" cy="120" r="20" fill="#fff1d0" opacity="0.8" filter="url(#ab)" />
    <g filter="url(#ab)" opacity="0.95">
      <Cloud x="55" y="40" s="0.7" o="0.85" />
      <Cloud x="245" y="54" s="0.6" o="0.8" />
    </g>
    {/* sea */}
    <rect x="0" y="138" width="320" height="62" fill="#cfe6f3" />
    <g opacity="0.55" fill="#ffffff">
      <rect x="120" y="150" width="80" height="2" rx="1" />
      <rect x="105" y="160" width="110" height="2" rx="1" />
      <rect x="90" y="172" width="140" height="2" rx="1" />
    </g>
    {/* track + tiny train */}
    <rect x="0" y="146" width="320" height="2" fill="#9bb4c7" opacity="0.7" />
    <g transform="translate(196 134)" fill="#6b7b96" opacity="0.9">
      <rect x="0" y="0" width="16" height="10" rx="2" />
      <rect x="18" y="2" width="11" height="8" rx="2" />
      <rect x="31" y="2" width="11" height="8" rx="2" />
    </g>
  </SVG>
)

// 2 — SKILLS: flower meadow
const SkillsScene = (
  <SVG>
    <defs>
      <linearGradient id="sSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d7eefc" />
        <stop offset="60%" stopColor="#eef9ef" />
        <stop offset="100%" stopColor="#f4fbe6" />
      </linearGradient>
      {softDefs('sb')}
    </defs>
    <rect width="320" height="200" fill="url(#sSky)" />
    <g filter="url(#sb)">
      <Cloud x="80" y="38" s="0.8" o="0.85" />
      <Cloud x="240" y="50" s="0.7" o="0.8" />
    </g>
    <g filter="url(#sb)">
      <ellipse cx="160" cy="220" rx="220" ry="78" fill="#bfe39a" />
      <ellipse cx="60" cy="232" rx="160" ry="60" fill="#a9d883" />
    </g>
    {/* flowers */}
    <g>
      {[
        [40, 168, '#ffb3c7'], [78, 182, '#fff1a8'], [120, 172, '#ffffff'],
        [160, 186, '#c9b6f2'], [200, 174, '#ffb3c7'], [240, 184, '#fff1a8'],
        [280, 170, '#ffffff'], [300, 188, '#c9b6f2'], [20, 188, '#ffb3c7'],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill={c} opacity="0.95" />
      ))}
    </g>
  </SVG>
)

// 3 — PROJECTS: bathhouse lanterns at twilight
const ProjectsScene = (
  <SVG>
    <defs>
      <linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd9b0" />
        <stop offset="50%" stopColor="#f6c2c4" />
        <stop offset="100%" stopColor="#e7c6dd" />
      </linearGradient>
      {softDefs('pb')}
    </defs>
    <rect width="320" height="200" fill="url(#pSky)" />
    <circle cx="56" cy="48" r="18" fill="#fff0cf" opacity="0.8" filter="url(#pb)" />
    {/* bathhouse silhouette */}
    <g fill="#b07c83" opacity="0.85" filter="url(#pb)">
      <rect x="96" y="120" width="128" height="80" rx="4" />
      <rect x="110" y="100" width="100" height="26" rx="4" />
      <rect x="128" y="82" width="64" height="24" rx="4" />
      {/* roofs */}
      <path d="M86 122 L160 104 L234 122 Z" fill="#8f5f68" />
      <path d="M104 102 L160 88 L216 102 Z" fill="#8f5f68" />
      <path d="M122 84 L160 74 L198 84 Z" fill="#8f5f68" />
    </g>
    {/* glowing lanterns */}
    <g>
      {[[112, 140], [136, 150], [184, 150], [208, 140], [160, 134]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#ffd36b" opacity="0.5" filter="url(#pb)" />
          <circle cx={x} cy={y} r="2.4" fill="#fff2c2" />
        </g>
      ))}
    </g>
  </SVG>
)

// 4 — EXPERIENCE: calm starry evening with moon
const ExperienceScene = (
  <SVG>
    <defs>
      <linearGradient id="eSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cdd6f4" />
        <stop offset="60%" stopColor="#e3e0f1" />
        <stop offset="100%" stopColor="#eef0e6" />
      </linearGradient>
      {softDefs('eb')}
    </defs>
    <rect width="320" height="200" fill="url(#eSky)" />
    <circle cx="250" cy="46" r="22" fill="#fff7df" opacity="0.92" filter="url(#eb)" />
    <g fill="#ffffff">
      {[
        [40, 30], [70, 60], [110, 40], [150, 64], [190, 34],
        [120, 90], [80, 100], [200, 80], [30, 80], [160, 28],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" opacity="0.9" />
      ))}
    </g>
    <g filter="url(#eb)">
      <ellipse cx="80" cy="216" rx="180" ry="66" fill="#aebbd6" />
      <ellipse cx="250" cy="220" rx="180" ry="58" fill="#9aa8c6" />
    </g>
  </SVG>
)

// 5 — CONTACT: warm sunset over the sea
const ContactScene = (
  <SVG>
    <defs>
      <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe6b8" />
        <stop offset="45%" stopColor="#ffc9c2" />
        <stop offset="100%" stopColor="#f6b9cf" />
      </linearGradient>
      {softDefs('cb')}
    </defs>
    <rect width="320" height="200" fill="url(#cSky)" />
    <circle cx="160" cy="120" r="34" fill="#fff0c0" opacity="0.85" filter="url(#cb)" />
    <g filter="url(#cb)" opacity="0.9">
      <Cloud x="60" y="42" s="0.7" o="0.8" />
      <Cloud x="250" y="56" s="0.6" o="0.75" />
    </g>
    <rect x="0" y="140" width="320" height="60" fill="#f2b6c6" opacity="0.85" />
    <g opacity="0.6" fill="#fff2cf">
      <rect x="130" y="150" width="60" height="3" rx="1.5" />
      <rect x="118" y="162" width="84" height="3" rx="1.5" />
      <rect x="104" y="176" width="112" height="3" rx="1.5" />
    </g>
  </SVG>
)

const SCENES = [HeroScene, AboutScene, SkillsScene, ProjectsScene, ExperienceScene, ContactScene]

export default function Scenery({ scene }) {
  return (
    <div className="scenery" aria-hidden="true">
      {SCENES.map((node, i) => (
        <div key={i} className={`scene ${scene === i ? 'scene--on' : ''}`}>
          {node}
        </div>
      ))}
      <div className="scene-wash" />
    </div>
  )
}
