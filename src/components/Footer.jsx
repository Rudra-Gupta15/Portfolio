import { useEffect, useRef } from 'react';

const SOCIAL = [
  { label: 'Email',    href: 'mailto:rudrakumargupta@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rudra-kumar-gupta/' },
  { label: 'GitHub',   href: 'https://github.com/Rudra-Gupta15' },
];

function Meteors({ count = 25 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    top: Math.random() * 75,
    left: Math.random() * 110 - 10,
    delay: Math.random() * 8,
    dur: 2.5 + Math.random() * 3,
    width: 80 + Math.random() * 160,
    op: 0.15 + Math.random() * 0.35,
  }));
  return (
    <div className="ft-meteor-wrap" aria-hidden="true">
      {items.map((m, i) => (
        <span key={i} className="ft-meteor" style={{
          top: `${m.top}%`, left: `${m.left}%`,
          animationDelay: `${m.delay}s`, animationDuration: `${m.dur}s`,
          width: `${m.width}px`, opacity: m.op,
        }} />
      ))}
    </div>
  );
}

function CityScene() {
  return (
    <div className="ft-city-wrap" aria-hidden="true">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax meet" className="ft-city-svg">
        <defs>
          <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0050" stopOpacity="0"/>
            <stop offset="100%" stopColor="#0d0030" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="groundGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0050"/>
            <stop offset="100%" stopColor="#0a0020"/>
          </linearGradient>
        </defs>

        {/* Ground */}
        <rect x="0" y="270" width="1440" height="50" fill="#0a0020"/>
        <rect x="0" y="268" width="1440" height="3" fill="#3b0080"/>

        {/* Far background buildings — dark purple */}
        {[
          [30,80,60,200],[100,100,50,180],[160,60,40,200],[210,120,55,160],[270,90,45,180],
          [320,110,50,170],[380,70,40,200],[420,130,60,150],[490,80,50,190],[550,100,45,180],
          [600,60,35,210],[640,120,55,160],[700,90,40,190],[745,140,60,150],
          [810,80,45,190],[860,100,50,180],[920,120,55,160],[980,70,40,200],
          [1020,90,45,185],[1070,130,60,155],[1140,80,50,190],[1190,100,45,180],
          [1240,60,35,210],[1280,120,55,160],[1340,90,40,190],[1390,110,50,175],
        ].map(([x,h,w,y], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={i%3===0?'#1a0050':i%3===1?'#150040':'#120035'} rx="2"/>
        ))}

        {/* Mid buildings — purple tones */}
        {[
          [0,150,80,160],[85,120,60,190],[150,180,70,140],[225,100,50,210],[280,160,65,155],
          [350,140,75,170],[430,200,80,130],[515,130,60,185],[580,170,70,145],[655,110,55,200],
          [715,190,80,135],[800,140,65,170],[870,160,70,155],[945,120,60,190],
          [1010,180,75,140],[1090,150,65,165],[1160,200,80,130],[1245,130,60,180],[1310,160,70,155],[1385,120,55,195],
        ].map(([x,h,w,y], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={i%4===0?'#220060':i%4===1?'#1c0050':i%4===2?'#1f005a':'#1a0048'} rx="3"/>
        ))}

        {/* Windows — yellow/teal dots */}
        {Array.from({length: 130}, (_, i) => {
          const x = 20 + (i*37) % 1400;
          const y = 145 + (i*17) % 80;
          const gold = i%3===0;
          return <rect key={i} x={x} y={y} width={5} height={4} fill={gold?'#ffd700':'#00e5ff'} opacity={0.4 + (i%3)*0.25} rx="1"/>;
        })}

        {/* Foreground trees */}
        <ellipse cx="180" cy="248" rx="30" ry="22" fill="#0d2a1a"/>
        <rect x="178" y="248" width="4" height="22" fill="#0a1f14"/>
        <ellipse cx="260" cy="252" rx="20" ry="15" fill="#0d2a1a"/>
        <rect x="258" y="252" width="3" height="18" fill="#0a1f14"/>
        <ellipse cx="880" cy="246" rx="34" ry="24" fill="#0d2a1a"/>
        <rect x="878" y="246" width="4" height="24" fill="#0a1f14"/>
        <ellipse cx="960" cy="250" rx="22" ry="17" fill="#0d2a1a"/>
        <rect x="958" y="250" width="3" height="20" fill="#0a1f14"/>

        {/* Teal bus stop like reference */}
        <rect x="940" y="218" width="4" height="52" fill="#00b4a0"/>
        <rect x="918" y="218" width="50" height="4" fill="#00b4a0"/>
        <rect x="918" y="222" width="4" height="24" fill="#00b4a0"/>
        {/* Bench */}
        <rect x="1010" y="254" width="50" height="5" fill="#2a5a8a" rx="2"/>
        <rect x="1015" y="259" width="4" height="12" fill="#2a5a8a"/>
        <rect x="1050" y="259" width="4" height="12" fill="#2a5a8a"/>

        {/* Street lamp posts */}
        {[320, 620, 950, 1250].map((x, i) => (
          <g key={i}>
            <rect x={x} y={220} width={3} height={50} fill="#2a1060"/>
            <rect x={x-12} y={220} width={27} height={4} fill="#2a1060" rx="2"/>
            <ellipse cx={x+8} cy={222} rx={6} ry={4} fill="#ffd700" opacity={0.9}/>
            <ellipse cx={x+8} cy={222} rx={20} ry={14} fill="#ffd700" opacity={0.05}/>
          </g>
        ))}

        {/* Road lane markings */}
        {Array.from({length: 24}, (_, i) => (
          <rect key={i} x={i*70} y={285} width={42} height={3} fill="#ffd700" opacity={0.3} rx="1.5"/>
        ))}
      </svg>

      {/* Animated cyclist */}
      <div className="ft-cyclist">
        <svg viewBox="0 0 60 50" width="70" height="58">
          <circle cx="12" cy="38" r="10" fill="none" stroke="#ffd700" strokeWidth="2.5"/>
          <circle cx="12" cy="38" r="3" fill="#ffd700"/>
          <circle cx="46" cy="38" r="10" fill="none" stroke="#ffd700" strokeWidth="2.5"/>
          <circle cx="46" cy="38" r="3" fill="#ffd700"/>
          <line x1="12" y1="28" x2="12" y2="48" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
          <line x1="2" y1="38" x2="22" y2="38" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
          <line x1="36" y1="28" x2="56" y2="48" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
          <line x1="36" y1="48" x2="56" y2="28" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
          <line x1="12" y1="38" x2="29" y2="22" stroke="#e8d574" strokeWidth="2.5"/>
          <line x1="46" y1="38" x2="29" y2="22" stroke="#e8d574" strokeWidth="2.5"/>
          <line x1="29" y1="22" x2="20" y2="38" stroke="#e8d574" strokeWidth="2"/>
          <line x1="29" y1="22" x2="38" y2="18" stroke="#e8d574" strokeWidth="2"/>
          <line x1="38" y1="16" x2="38" y2="21" stroke="#e8d574" strokeWidth="2.5"/>
          <line x1="29" y1="22" x2="22" y2="18" stroke="#e8d574" strokeWidth="2"/>
          <rect x="18" y="15" width="10" height="3" fill="#e8d574" rx="1.5"/>
          <ellipse cx="26" cy="14" rx="5" ry="6" fill="#e05b5b"/>
          <circle cx="32" cy="7" r="6" fill="#f0a070"/>
          <ellipse cx="32" cy="4" rx="7" ry="4" fill="#e05b5b"/>
          <line x1="26" y1="16" x2="37" y2="18" stroke="#f0a070" strokeWidth="2.5"/>
          <line x1="26" y1="20" x2="18" y2="30" stroke="#4a3a8a" strokeWidth="2.5"/>
          <line x1="26" y1="20" x2="33" y2="28" stroke="#4a3a8a" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Animated car */}
      <div className="ft-car">
        <svg viewBox="0 0 100 55" width="110" height="60">
          <ellipse cx="50" cy="32" rx="44" ry="18" fill="#c0392b"/>
          <rect x="8" y="32" width="84" height="12" fill="#c0392b" rx="4"/>
          <ellipse cx="50" cy="26" rx="28" ry="16" fill="#c0392b"/>
          <ellipse cx="40" cy="24" rx="12" ry="8" fill="#5b8de0" opacity="0.7"/>
          <ellipse cx="62" cy="24" rx="12" ry="8" fill="#5b8de0" opacity="0.7"/>
          <rect x="50" y="18" width="2" height="14" fill="#a0291e"/>
          <rect x="4" y="36" width="8" height="5" fill="#888" rx="2"/>
          <rect x="88" y="36" width="8" height="5" fill="#888" rx="2"/>
          <ellipse cx="10" cy="34" rx="5" ry="4" fill="#f8e870" opacity="0.9"/>
          <ellipse cx="90" cy="34" rx="5" ry="4" fill="#f8e870" opacity="0.5"/>
          <circle cx="22" cy="44" r="10" fill="#222"/>
          <circle cx="22" cy="44" r="5" fill="#555"/>
          <circle cx="78" cy="44" r="10" fill="#222"/>
          <circle cx="78" cy="44" r="5" fill="#555"/>
          <circle cx="22" cy="44" r="3" fill="#ffd700"/>
          <circle cx="78" cy="44" r="3" fill="#ffd700"/>
        </svg>
      </div>
    </div>
  );
}

function SocialIcon({ label, href }) {
  const icons = {
    Email: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    LinkedIn: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>,
    GitHub: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>,

  };
  return (
    <a href={href} target="_blank" rel="noreferrer" className="ft-soc-btn" title={label}>
      {icons[label]}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer ft-purple">
      <Meteors />

      {/* Main footer content — centered like reference */}
      <div className="ft-main-content">
        <div className="ft-green-dot" aria-hidden="true" />
        <div className="ft-connect-text">Feel free to connect on social media.</div>
        <div className="ft-soc-row">
          {SOCIAL.map(s => <SocialIcon key={s.label} {...s} />)}
        </div>
      </div>

      <CityScene />

      <div className="ft-copy">© 2025 Rudra Kumar Gupta · Built with React</div>
    </footer>
  );
}
