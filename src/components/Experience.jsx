import { useRef, useEffect } from 'react';

const TIMELINE = [
  {
    date: 'Current',
    role: 'AI/ML Intern',
    org: 'Freelance / Remote',
    type: 'work',
    accent: '#d4a843',
    desc: 'Developing and deploying machine learning models for real-world applications.',
    bullets: [
      'Built real-time computer vision systems with 95%+ accuracy.',
      'Optimized neural network architectures for edge deployment.',
      'Collaborated on end-to-end ML pipelines from data collection to production.',
      'Implemented CNN-LSTM models for temporal sequence analysis.',
    ],
    chips: ['Python', 'TensorFlow', 'OpenCV', 'ML Ops'],
  },
  {
    date: 'Current',
    role: 'Game Developer',
    org: 'Self-Directed · Unity 6',
    type: 'self',
    accent: '#a855f7',
    desc: 'Independently building games and interactive experiences using Unity.',
    bullets: [
      'Shipped 2 complete games using Unity 6 with C# scripting.',
      'Built 2D platformers with tilemaps, physics engines, and particle systems.',
      'Developed 3D environments with advanced lighting, cameras, and enemy AI.',
      'Exploring procedural generation and real-time shader programming.',
    ],
    chips: ['Unity 6', 'C#', 'Game Design', 'Physics'],
  },
  {
    date: 'Current',
    role: 'Chrome Extension Developer',
    org: 'Chrome Web Store · Independent',
    type: 'self',
    accent: '#34c4e8',
    desc: 'Building and publishing browser extensions on the Chrome Web Store — real tools for real users.',
    bullets: [
      'BalanceTab — Gamer + Office: productivity/gaming balance dashboard (v2.8).',
      'TimeMark — Video Timestamp Bookmarks: save & revisit video moments instantly (v1.4).',
      'End-to-end ownership: UI design, JavaScript logic, manifest config, and store publishing.',
    ],
    chips: ['JavaScript', 'Chrome APIs', 'HTML/CSS', 'Web Store'],
  },
  {
    date: '2022 — 2026',
    role: 'B.Tech Electronics Engineering',
    org: 'Yeshwantrao Chavan College of Engineering, Nagpur',
    type: 'edu',
    accent: '#4da8e8',
    desc: 'Focusing on VLSI Design and Embedded Systems. Current CGPA: 8.42.',
    bullets: [
      'Major project: Multi-scale ASL recognition using YOLOv8 + CNN (9K images).',
      'Specialization in VLSI design, embedded systems, and digital electronics.',
      'Led sponsorship as VP for ICON technical fest.',
    ],
    chips: ['VLSI', 'Embedded Systems', 'Digital Electronics'],
  },
  {
    date: '2022 — 2023',
    role: 'Engineering Intern',
    org: 'Raj Food Machine',
    type: 'work',
    accent: '#e0935b',
    desc: 'Solid foundation in circuit design, embedded systems, and IoT with hands-on hardware experience.',
    bullets: [
      'Integrated and calibrated sensors for industrial machinery monitoring.',
      'Configured motherboard connections for machine automation.',
      'Performed wiring, circuit connections, and electrical troubleshooting.',
      'Hardware assembly and testing of automated food-processing equipment.',
    ],
    chips: ['IoT', 'PLC', 'Sensors', 'Automation'],
  },
  {
    date: '2021 — 2022',
    role: 'Class XII — Science Stream',
    org: 'St. Paul School, Nagpur',
    type: 'edu',
    accent: '#5be05b',
    desc: 'Completed Higher Secondary education with a Science focus, scoring 77% in board examinations.',
    bullets: [
      'Chose the Science stream with subjects: Mathematics, Physics, Chemistry & Computer Science.',
      'Secured 77% in the Higher Secondary Board Examinations.',
      'Built early programming fundamentals through Computer Science coursework.',
    ],
    chips: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  },
];

const TYPE_BADGE = {
  work: { label: 'Work', color: '#d4a843' },
  self: { label: 'Self', color: '#a855f7' },
  edu:  { label: 'Edu',  color: '#4da8e8' },
};

export default function Experience() {
  const scrollRef  = useRef(null);
  const sectionRef = useRef(null);

  // Scroll-reveal: each card fades + slides up when section enters viewport
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.htl-item');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('htl-item--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" ref={sectionRef}>
      <style>{`
        #work {
          overflow: visible;
          padding-bottom: 60px;
        }

        /* ─── Header ─── */
        .htl-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .htl-legend {
          display: flex;
          gap: 16px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .htl-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--lc);
          opacity: 0.85;
        }
        .htl-legend-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--lc);
        }
        .htl-scroll-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(212,168,67,0.3);
          background: rgba(212,168,67,0.07);
          color: #d4a843;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
          line-height: 1;
        }
        .htl-scroll-btn:hover {
          background: rgba(212,168,67,0.18);
          border-color: rgba(212,168,67,0.6);
        }

        /* ─── Scroll track ─── */
        .htl-scroll {
          display: flex;
          gap: 0;
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          padding: 16px 24px 40px;
          scrollbar-width: none;
        }
        .htl-scroll::-webkit-scrollbar { display: none; }

        /* ─── Card item — starts hidden, revealed by JS ─── */
        .htl-item {
          flex: 0 0 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 0 12px;
          /* initial hidden state */
          opacity: 0;
          transform: translateY(36px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* staggered delays */
        .htl-item:nth-child(1) { transition-delay: 0ms; }
        .htl-item:nth-child(2) { transition-delay: 90ms; }
        .htl-item:nth-child(3) { transition-delay: 180ms; }
        .htl-item:nth-child(4) { transition-delay: 270ms; }
        .htl-item:nth-child(5) { transition-delay: 360ms; }
        .htl-item:nth-child(6) { transition-delay: 450ms; }

        /* revealed state */
        .htl-item--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* connector line between nodes */
        .htl-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 9px;
          left: calc(50% + 11px);
          right: -50%;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
          z-index: 0;
        }

        /* ─── Node ─── */
        .htl-node {
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .htl-dot {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid var(--dc);
          background: color-mix(in srgb, var(--dc) 20%, transparent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--dc) 60%, transparent);
        }
        .htl-date-pill {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--dc);
          background: color-mix(in srgb, var(--dc) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--dc) 30%, transparent);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        /* ─── Card ─── */
        .htl-card {
          width: 100%;
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
          border-radius: 14px;
          padding: 20px;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          min-height: 340px;
        }
        .htl-card:hover {
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
          background: rgba(255,255,255,0.045);
          box-shadow:
            0 6px 32px rgba(0,0,0,0.45),
            0 0 20px color-mix(in srgb, var(--accent) 15%, transparent);
        }
        .htl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.65;
        }

        .htl-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .htl-role {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f0e6c8;
          line-height: 1.3;
        }
        .htl-org {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.42);
          margin-top: 3px;
          line-height: 1.4;
        }
        .htl-type-badge {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .htl-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.6;
        }
        .htl-bullets {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .htl-bullets li {
          font-size: 0.74rem;
          color: rgba(255,255,255,0.48);
          line-height: 1.55;
          padding-left: 14px;
          position: relative;
        }
        .htl-bullets li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent);
          opacity: 0.7;
          font-size: 0.65rem;
          top: 1px;
        }
        .htl-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
          padding-top: 8px;
        }
        .htl-chip {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.48);
          background: rgba(255,255,255,0.04);
        }

        /* ─── Progress bar ─── */
        .htl-progress-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
          padding: 0 24px;
        }
        .htl-progress-track {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .htl-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4a843, #a855f7);
          border-radius: 2px;
          transition: width 0.1s ease;
          width: 0%;
        }
        .htl-hint {
          font-size: 0.62rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        @media (max-width: 600px) {
          .htl-item { flex: 0 0 290px; }
          .htl-card { min-height: 300px; }
        }
      `}</style>

      <div className="sec-label">04 — Professional Path</div>

      <div className="htl-header">
        <div>
          <h2 className="sec-h" style={{ marginBottom: 0 }}>Professional <em>Path</em></h2>
          <p className="wintro-desc" style={{ marginTop: 10, marginBottom: 0 }}>
            From hardware labs to AI pipelines — a journey through electronics, machine learning, and game development.
          </p>
          <div className="htl-legend">
            {Object.entries(TYPE_BADGE).map(([k, v]) => (
              <span key={k} className="htl-legend-item" style={{ '--lc': v.color }}>
                <span className="htl-legend-dot" /> {v.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="htl-scroll-btn" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
          <button className="htl-scroll-btn" onClick={() => scroll(1)}  aria-label="Next">›</button>
        </div>
      </div>

      <div
        className="htl-scroll"
        ref={scrollRef}
        onScroll={(e) => {
          const t = e.currentTarget;
          const maxScroll = t.scrollWidth - t.clientWidth;
          if (maxScroll <= 0) return;
          const pct = (t.scrollLeft / maxScroll) * 100;
          const fill = sectionRef.current?.querySelector('.htl-progress-fill');
          if (fill) fill.style.width = pct + '%';
        }}
      >
        {TIMELINE.map((item, i) => {
          const badge = TYPE_BADGE[item.type];
          return (
            <div className="htl-item" key={i}>
              <div className="htl-node">
                <div className="htl-dot"       style={{ '--dc': item.accent }} />
                <div className="htl-date-pill" style={{ '--dc': item.accent }}>{item.date}</div>
              </div>
              <div className="htl-card" style={{ '--accent': item.accent }}>
                <div className="htl-card-top">
                  <div>
                    <div className="htl-role">{item.role}</div>
                    <div className="htl-org">{item.org}</div>
                  </div>
                  <span
                    className="htl-type-badge"
                    style={{
                      background: badge.color + '22',
                      color: badge.color,
                      border: `1px solid ${badge.color}44`,
                    }}
                  >{badge.label}</span>
                </div>
                <div className="htl-desc">{item.desc}</div>
                {item.bullets.length > 0 && (
                  <ul className="htl-bullets">
                    {item.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {item.chips.length > 0 && (
                  <div className="htl-chips">
                    {item.chips.map(c => <span className="htl-chip" key={c}>{c}</span>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="htl-progress-wrap">
        <div className="htl-progress-track">
          <div className="htl-progress-fill" />
        </div>
        <span className="htl-hint">drag or use arrows to explore</span>
      </div>
    </section>
  );
}