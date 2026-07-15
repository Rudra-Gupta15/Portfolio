import { useState } from 'react';

const STATS = [
  { n: '15+', icon: '🚀', label: 'Projects Built', sub: 'in production', color: '#a855f7' },
  { n: 'Top 2.6%', icon: '📊', label: 'Kaggle Global', sub: (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
      <span>Datasets: 273 / 10k</span>
      <span>Notebooks: 2.3k / 62k</span>
    </span>
  ), color: '#d4a843' },
  { n: '3', icon: '📦', label: 'Extensions Built', sub: 'Chrome + Firefox compatible', color: '#5be05b' },
  { n: '500+', icon: '👥', label: 'Downloads', sub: 'Across 3 Chrome Extensions', color: '#4da8e8' },
];

const TRAITS = [
  { icon: '⚡', label: 'Fast Learner' },
  { icon: '🔬', label: 'Research-Driven' },
  { icon: '🎯', label: 'Problem Solver' },
  { icon: '🤝', label: 'Team Player' },
  { icon: '🚀', label: 'Self-Starter' },
  { icon: '💡', label: 'Innovator' },
];

const SPECS = [
  {
    icon: '🚀', title: 'LLM & Autonomous Agents',
    desc: 'Building self-correcting AI systems like CodeFix and privacy-first local LLM assistants.',
    accent: '#d4a843', accentRgb: '212,168,67',
    chips: ['Ollama', 'FastAPI', 'LangChain'],
    stat: 'Zero', statLabel: 'Cloud Cost',
  },
  {
    icon: '👁️', title: 'Computer Vision',
    desc: 'Developing high-precision biometric systems and real-time ASL recognition models.',
    accent: '#4da8e8', accentRgb: '77,168,232',
    chips: ['Face-API', 'OpenCV', 'YOLOv8'],
    stat: 'Local', statLabel: 'Processing',
  },
  {
    icon: '💻', title: 'Full-Stack Platforms',
    desc: 'Architecting production-ready platforms like PrepMaster and ConvoSec AI.',
    accent: '#a855f7', accentRgb: '168,85,247',
    chips: ['React', 'Node.js', 'Vercel'],
    stat: '4K+', statLabel: 'Users',
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
            Kaggle: Dataset Expert (Rank 273/10,622) • Notebook Expert (Rank 2,334/62,113) • Published 9 datasets and 11 notebooks
          </div>
          <p className="ab-bio-text">
            I am an <strong>Electronics Engineering undergraduate</strong> dedicated to engineering high-impact, AI-driven solutions that bridge the gap between hardware and software. My work ranges from foundational research in <strong>Real-Time Sign Language Recognition</strong> to architecting complex platforms like <strong>ConvoSec AI</strong>.
            I specialize in building autonomous, privacy-first systems such as <strong>CodeFix</strong> (an AI debugger) and a <strong>Biometric Attendance System</strong>, alongside production-grade platforms like <strong>PrepMaster</strong> and <strong>ResumeAI</strong>.
          </p>

          <p className="ab-bio-text">
            I thrive on the full journey: <strong>Concept → Model → Deployment</strong>. My technical stack spans Python, C/C++, OpenCV, and Flask.
          </p>

          <p className="ab-bio-text">
            <strong style={{ color: '#a855f7' }}>My ultimate philosophy is delivering impact.</strong>
            Whether I'm architecting a computer vision system, fine-tuning an LLM, or deploying a full-stack platform, my focus remains the same: <strong>building seamless, interactive technology that works in the real world.</strong>
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
