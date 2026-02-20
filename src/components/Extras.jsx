import { useRef, useState } from 'react';

const CERTS = [
  {
    icon: '🧠',
    image: '/images/cert-ai-aware.png',
    title: 'AI Aware',
    program: 'AI For All',
    issuer: 'Intel · Digital India · CBSE',
    date: '12 Feb 2026',
    desc: 'Completed the AI Aware stage of the AI For All program — foundational understanding of artificial intelligence concepts and applications.',
    accent: '#0071c5',
    accentRgb: '0,113,197',
    tags: ['Artificial Intelligence', 'Intel', 'Digital India'],
    badge: 'Certified',
    verifyUrl: null,
  },
  {
    icon: '💡',
    image: '/images/cert-ai-appreciate.png',
    title: 'AI Appreciate',
    program: 'AI For All',
    issuer: 'Intel · Digital India · CBSE',
    date: '12 Feb 2026',
    desc: 'Completed the AI Appreciate stage — deeper appreciation of AI capabilities, ethical implications, and real-world use cases.',
    accent: '#00aaff',
    accentRgb: '0,170,255',
    tags: ['AI Ethics', 'Intel', 'Applied AI'],
    badge: 'Certified',
    verifyUrl: null,
  },
  {
    icon: '🐍',
    image: '/images/cert-python-iit.jpg',
    title: 'Python 3.4.3 Training',
    program: 'Spoken Tutorial · IIT Bombay',
    issuer: 'IIT Bombay · YCCE',
    date: 'June 21, 2023',
    desc: 'Completed Python 3.4.3 training organized at Yeshwantrao Chavan College of Engineering via the Spoken Tutorial Project, IIT Bombay. Passed an online exam conducted remotely from IIT Bombay. Credits: 4 | Score: 65%.',
    accent: '#ffd43b',
    accentRgb: '255,212,59',
    tags: ['Python', 'IIT Bombay', 'Programming'],
    badge: 'Certified',
    verifyUrl: null,
  },
  {
    icon: '💻',
    image: '/images/cert-cpp-dsa.jpg',
    title: 'Data Structures & Algorithms in C++',
    program: 'Great Learning Academy',
    issuer: 'Great Learning Academy',
    date: 'March 2024',
    desc: 'Completed the free online course on Data Structures and Algorithms in C++ provided by Great Learning Academy. Covers core DSA concepts, problem-solving techniques, and algorithmic thinking.',
    accent: '#a855f7',
    accentRgb: '168,85,247',
    tags: ['C++', 'DSA', 'Algorithms'],
    badge: 'Certified',
    verifyUrl: 'https://verify.mygreatlearning.com/TFINJJEO',
  },
  {
    icon: '🎮',
    image: null,
    title: 'Complete C# Unity 2D Game Dev',
    program: 'Udemy Course',
    issuer: 'Udemy · GameDev.tv Team',
    date: '2024',
    desc: 'Mastered 2D game mechanics and C# scripting in Unity 6, including physics, enemy AI, tilemaps, and game architecture.',
    accent: '#a855f7',
    accentRgb: '168,85,247',
    tags: ['Unity', 'C#', '2D Games'],
    badge: 'Completed',
    verifyUrl: null,
  },
  {
    icon: '🌌',
    image: null,
    title: 'Complete C# Unity 3D Game Dev',
    program: 'Udemy Course',
    issuer: 'Udemy · GameDev.tv Team',
    date: '2024',
    desc: 'Advanced 3D creation in Unity 6 — lighting, physics, particle systems, advanced C# patterns and complex game architecture.',
    accent: '#5be05b',
    accentRgb: '91,224,91',
    tags: ['Unity 6', 'C#', '3D Games'],
    badge: 'Completed',
    verifyUrl: null,
  },
  {
    icon: '⚡',
    image: '/images/cert-fpga.jpg',
    title: 'FPGA Timings P1: Static Timing Analysis with Vivado 2024',
    program: 'Udemy Course',
    issuer: 'Udemy · Kumar Khandagle',
    date: 'Dec 4, 2025',
    desc: 'In-depth STA concepts with Vivado 2024 — setup/hold timing, path analysis, constraint writing, and timing closure techniques.',
    accent: '#f97316',
    accentRgb: '249,115,22',
    tags: ['FPGA', 'Vivado', 'STA', 'Hardware'],
    badge: 'Completed',
    verifyUrl: 'https://ude.my/UC-ce9653c5-d69d-404f-9f27-911926731761',
  },
  {
    icon: '✈️',
    image: '/images/cert-aeromodel.jpg',
    title: 'Glider Making Workshop',
    program: 'Avion · YCCE',
    issuer: 'Yeshwantrao Chavan College of Engineering',
    date: '2024',
    desc: 'Hands-on glider making workshop by Avion (Aeromodelling Club, Mech Dept.) in collaboration with Aerovision. Practical aerospace engineering concepts.',
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    tags: ['Aeromodelling', 'Mechanical', 'Workshop'],
    badge: 'Participated',
    verifyUrl: null,
  },
  {
    icon: '🎨',
    image: '/images/cert-drawing.jpg',
    title: 'Drawing Competition — Kalasparsh',
    program: 'KALASPARSH Art Club',
    issuer: 'Yeshwantrao Chavan College of Engineering',
    date: '2024',
    desc: 'Participated in the Kalasparsh Drawing Competition, showcasing creative imagination and artistry. Organized by the Art Club of YCCE.',
    accent: '#ec4899',
    accentRgb: '236,72,153',
    tags: ['Art', 'Drawing', 'Creative'],
    badge: 'Participated',
    verifyUrl: null,
  },
];

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={e => e.stopPropagation()} style={{ '--cm-accent': cert.accent }}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        
        {/* Header */}
        <div className="cert-modal-header" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${cert.accent} 25%, #0d1f3c), #0d1f3c)`, borderBottom: `1px solid ${cert.accent}33` }}>
          <div className="cert-modal-header-top">
            <span className="cert-modal-icon">{cert.icon}</span>
            <div>
              <div className="cert-modal-program">{cert.program}</div>
              <h3 className="cert-modal-title">{cert.title}</h3>
              <div className="cert-modal-issuer">{cert.issuer}</div>
            </div>
          </div>
          <div className="cert-modal-meta">
            <span className="cert-modal-date">📅 {cert.date}</span>
            <span className="cert-modal-badge" style={{ background: `${cert.accent}22`, border: `1px solid ${cert.accent}55`, color: cert.accent }}>{cert.badge}</span>
          </div>
        </div>

        {/* Certificate image if available */}
        {cert.image && (
          <div className="cert-modal-img-wrap">
            <img src={cert.image} alt={cert.title} className="cert-modal-img" />
          </div>
        )}

        {/* Body */}
        <div className="cert-modal-body">
          <div className="cert-modal-desc">{cert.desc}</div>
          <div className="cert-modal-tags">
            {cert.tags.map(t => (
              <span key={t} className="cert-modal-tag" style={{ background: `${cert.accent}15`, border: `1px solid ${cert.accent}35`, color: cert.accent }}>{t}</span>
            ))}
          </div>
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-modal-verify" style={{ background: cert.accent }}>
              Verify Certificate ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const scrollRef = useRef(null);
  const [scrollIdx, setScrollIdx] = useState(0);
  const [selected, setSelected] = useState(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardW = 320 + 20;
    scrollRef.current.scrollBy({ left: dir * cardW, behavior: 'smooth' });
    setScrollIdx(i => Math.max(0, Math.min(CERTS.length - 3, i + dir)));
  };

  return (
    <section id="certs">
      <div className="sec-label">05 — Certifications & Courses</div>

      <div className="cert-header-row">
        <div>
          <h2 className="sec-h" style={{ marginBottom: 6 }}>Continuous <em>Learning</em></h2>
          <div className="cert-scroll-hint">
            <span>scroll to explore</span>
            <span className="cert-arrow-anim">→</span>
          </div>
        </div>
        <div className="cert-nav-btns">
          <button className="cert-nav-btn" onClick={() => scroll(-1)} disabled={scrollIdx === 0}>‹</button>
          <button className="cert-nav-btn" onClick={() => scroll(1)} disabled={scrollIdx >= CERTS.length - 3}>›</button>
        </div>
      </div>

      <div className="cert-scroll-wrap">
        <div className="cert-scroll" ref={scrollRef}>
          <div className="cert-track">
            {CERTS.map((c) => (
              <div
                key={c.title}
                className="cert-tile"
                style={{ '--accent': c.accent, '--accent-rgb': c.accentRgb }}
                onClick={() => setSelected(c)}
              >
                <div className="cert-tile-glow" />
                <div className="cert-tile-bar" />
                
                {/* Image preview strip if cert has image */}
                {c.image && (
                  <div className="cert-tile-img-strip">
                    <img src={c.image} alt={c.title} className="cert-tile-img" />
                    <div className="cert-tile-img-overlay" />
                  </div>
                )}

                <div className="cert-tile-content">
                  <div className="cert-tile-top">
                    <span className="cert-tile-icon">{c.icon}</span>
                    <span className="cert-tile-badge">{c.badge}</span>
                  </div>
                  <div className="cert-tile-title">{c.title}</div>
                  <div className="cert-tile-issuer">{c.issuer}</div>
                  <div className="cert-tile-date">{c.date}</div>
                  <div className="cert-tile-tags">
                    {c.tags.slice(0, 3).map(t => <span key={t} className="cert-tile-tag">{t}</span>)}
                  </div>
                  <div className="cert-tile-tap">click to view →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements">
      <div className="sec-label">06 — Leadership & Achievements</div>
      <h2 className="sec-h">Beyond <em>Code</em></h2>
      <div style={{ marginTop: 44 }}>
        <div className="lead-card">
          <div className="lead-role">🎯 Vice President — Sponsorship</div>
          <div className="lead-org">College Technical Fest (ICON)</div>
          <ul className="lead-bullets">
            <li>Coordinated with sponsors and corporate partners to secure funding and support</li>
            <li>Assisted in event planning, budgeting, and resource allocation for technical fest</li>
            <li>Led team coordination and managed sponsor relationships throughout the event</li>
            <li>Gained valuable leadership, communication, and organizational experience</li>
          </ul>
          <div className="lead-tags">
            <span className="lead-tag">Leadership</span>
            <span className="lead-tag">Sponsorship</span>
            <span className="lead-tag">Event Planning</span>
            <span className="lead-tag">Team Coordination</span>
          </div>
        </div>
        <div className="ach-grid">
          <div className="ach-card"><div className="ach-icon">🏆</div><div className="ach-title">Inter-School Chess Champion</div><div className="ach-loc">Nagpur</div><div className="ach-sub">Championship in inter-school chess — strategic thinking and competitive excellence.</div></div>
          <div className="ach-card"><div className="ach-icon">👑</div><div className="ach-title">Nagpur District Chess Champion</div><div className="ach-loc">Nagpur District Level</div><div className="ach-sub">District-level chess victory showcasing advanced strategy and analytical problem-solving.</div></div>
          <div className="ach-card"><div className="ach-icon">⭐</div><div className="ach-title">State-Level Chess Qualifier</div><div className="ach-loc">8th Grade Achievement</div><div className="ach-sub">Qualified for state-level chess in 8th grade — early proof of sustained competitive focus.</div></div>
        </div>
      </div>
    </section>
  );
}
