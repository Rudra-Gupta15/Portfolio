import { useState } from 'react';

const STATS = [
  { n: '95%', icon: '🤖', label: 'ML Accuracy',     sub: 'across deployed models',  color: '#d4a843' },
  { n: '9K+', icon: '📸', label: 'Training Images', sub: 'for computer vision',     color: '#4da8e8' },
  { n: '7+',  icon: '🚀', label: 'Projects Built',  sub: 'in production',           color: '#a855f7' },
  { n: '2',   icon: '🎮', label: 'Games Shipped',   sub: 'Unity engine',            color: '#5be05b' },
];

const TRAITS = [
  { icon: '⚡', label: 'Fast Learner' },
  { icon: '🔬', label: 'Research-Driven' },
  { icon: '🎯', label: 'Problem Solver' },
  { icon: '🤝', label: 'Team Player' },
  { icon: '🚀', label: 'Self-Starter' },
  { icon: '🎮', label: 'Game Dev' },
];

const SPECS = [
  {
    icon: '🤖', title: 'AI/ML Engineering',
    desc: 'Building and deploying ML models with 95%+ accuracy across real-world applications.',
    accent: '#d4a843', accentRgb: '212,168,67',
    chips: ['TensorFlow', 'PyTorch', 'Sklearn'],
    stat: '95%', statLabel: 'Accuracy',
  },
  {
    icon: '👁️', title: 'Computer Vision',
    desc: 'YOLOv8, CNN-LSTM, real-time object detection for security and medical AI.',
    accent: '#4da8e8', accentRgb: '77,168,232',
    chips: ['YOLOv8', 'OpenCV', 'CNN'],
    stat: '9K+', statLabel: 'Images',
  },
  {
    icon: '🎮', title: 'Game Development',
    desc: 'Interactive 2D/3D experiences using Unity 6 with C#, physics systems, and game architecture.',
    accent: '#a855f7', accentRgb: '168,85,247',
    chips: ['Unity 6', 'C#', 'Physics'],
    stat: '2', statLabel: 'Games',
  },
];

export default function About() {
  const [activeSpec, setActiveSpec] = useState(0);

  return (
    <section id="about">
      <div className="sec-label">01 — About Me</div>
      <h2 className="sec-h" style={{ marginBottom: 36 }}>Who I <em>Am</em></h2>

      {/* ROW 1: Bio (left, tall) + 2x2 Stats (right) */}
      <div className="abt-row1">
        {/* Bio card */}
        <div className="ab-card abt-bio-card">
          <div className="ab-bio-tag">
            <span className="ab-dot" />
            Electronics Engineer · AI/ML Developer
          </div>
<p className="ab-bio-text">
  I'm an <strong>Electronics Engineering undergraduate</strong> passionate about building intelligent, real-world systems. 
  I bridge hardware and AI to solve meaningful problems through diverse applications: from <strong>Real-Time Sign Language Recognition</strong> and <strong>Violence Detection</strong> to high-precision systems like my <strong>Hyperlocal Weather Predictor</strong> and <strong>Heart Disease Prediction</strong> apps. 
  My portfolio also spans intelligent <strong>Recommendation Engines</strong> and deep <strong>ML Algorithm Comparisons</strong>.
</p>

<p className="ab-bio-text">
  I thrive on the full journey: <strong>Concept → Model → Deployment</strong>. My technical stack spans Python, C/C++, OpenCV, and Flask. 
</p>

<p className="ab-bio-text">
  <strong style={{ color: '#a855f7' }}>Beyond AI, I’m deeply invested in Game Development</strong>, 
  using Unity and C# to craft immersive, logic-driven experiences. For me, whether it’s a computer vision system or a 5-level 2D platformer, the goal is the same: <strong>building seamless, interactive technology that works.</strong>
</p>
          <div className="ab-trait-row">
            {TRAITS.map(t => (
              <span key={t.label} className="ab-trait">{t.icon} {t.label}</span>
            ))}
          </div>
        </div>

        {/* 2x2 Stats grid */}
        <div className="abt-stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="ab-card ab-stat-card" style={{ '--sc': s.color }}>
              <div className="ab-stat-n">{s.n}</div>
              <div className="ab-stat-icon">{s.icon}</div>
              <div className="ab-stat-l">{s.label}</div>
              <div className="ab-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: 3 Spec cards */}
      <div className="abt-specs-row">
        {SPECS.slice(0, 3).map((s, i) => (
          <div
            key={s.title}
            className={'ab-card ab-spec' + (activeSpec === i ? ' ab-spec-active' : '')}
            style={{ '--accent': s.accent, '--accent-rgb': s.accentRgb }}
            onMouseEnter={() => setActiveSpec(i)}
            onClick={() => setActiveSpec(i)}
          >
            <div className="ab-spec-glow" />
            <div className="ab-spec-bar" />
            <div className="ab-spec-top">
              <span className="ab-spec-icon">{s.icon}</span>
              <span className="ab-spec-badge">{s.stat}<small>{s.statLabel}</small></span>
            </div>
            <div className="ab-spec-title">{s.title}</div>
            <div className="ab-spec-desc">{s.desc}</div>
            <div className="ab-spec-chips">
              {s.chips.map(c => <span key={c} className="ab-chip">{c}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* ROW 3: Quote */}
      <div className="ab-card abt-quote-card" style={{ marginTop: 14 }}>
        <div className="abt-q-mark">"</div>
        <p className="abt-q-text">Continuously learning and looking for opportunities where I can apply my skills, grow as a developer, and contribute to impactful software and AI-driven solutions.</p>
        <div className="abt-q-author">— Rudra Kumar Gupta</div>
      </div>

    </section>
  );
}
