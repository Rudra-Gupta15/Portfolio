const TIMELINE = [
  {
    date: 'Current',
    role: 'AI/ML Intern',
    org: 'Freelance / Remote',
    type: 'work',
    accent: '#d4a843',
    desc: 'Developing and deploying machine learning models for real-world applications. Key achievements include:',
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
    desc: 'Independently building games and interactive experiences using Unity — driven by passion for game mechanics, physics, and immersive design.',
    bullets: [
      'Shipped 2 complete games using Unity 6 with C# scripting.',
      'Built 2D platformers with tilemaps, physics engines, and particle systems.',
      'Developed 3D environments with advanced lighting, cameras, and enemy AI.',
      'Exploring procedural generation and real-time shader programming.',
    ],
    chips: ['Unity 6', 'C#', 'Game Design', 'Physics'],
  },
  {
    date: '2022 — 2026',
    role: 'B.Tech Electronics Engineering',
    org: 'Yeshwantrao Chavan College of Engineering, Nagpur',
    type: 'edu',
    accent: '#4da8e8',
    desc: 'Focusing on VLSI Design and Embedded Systems. Current CGPA: 8.42. Honors: VLSI Design.',
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
    desc: 'Solid foundation in circuit design, embedded systems, and IoT with hands-on hardware experience. Focused on electronics integration and machine automation systems.',
    bullets: [
      'Integrated and calibrated sensors for industrial machinery monitoring and control systems.',
      'Configured motherboard connections and managed operations for machine automation.',
      'Performed wiring, circuit connections, and electrical troubleshooting for production-ready systems.',
      'Hardware assembly and testing of automated industrial food-processing equipment.',
    ],
    chips: ['IoT', 'PLC', 'Sensors', 'Automation'],
  },
  {
    date: '2021 — 2022',
    role: 'Class XII (Senior Secondary)',
    org: 'St. Paul School, Nagpur',
    type: 'edu',
    accent: '#5be05b',
    desc: 'Secured 77% in Higher Secondary Examinations.',
    bullets: [],
    chips: [],
  },
];

const TYPE_BADGE = {
  work: { label: 'Work', color: '#d4a843' },
  self: { label: 'Self', color: '#a855f7' },
  edu:  { label: 'Edu',  color: '#4da8e8' },
};

export default function Experience() {
  return (
    <section id="work">
      <div className="sec-label">04 — Professional Path</div>
      <div className="work-grid">
        <div>
          <h2 className="wintro-title">Professional <em>Path</em></h2>
          <p className="wintro-desc">From hardware labs to AI pipelines — a journey through electronics, machine learning, and game development.</p>
          <div className="tl-legend">
            {Object.entries(TYPE_BADGE).map(([k, v]) => (
              <span key={k} className="tl-legend-item" style={{'--lc': v.color}}>
                <span className="tl-legend-dot" /> {v.label}
              </span>
            ))}
          </div>
        </div>
        <div className="timeline">
          {TIMELINE.map((item, i) => {
            const badge = TYPE_BADGE[item.type];
            return (
              <div className="tl-item" key={i}>
                <div className="tl-dot" style={{'--dc': item.accent}} />
                <div className="tl-card" style={{'--accent': item.accent}}>
                  <div className="tl-card-top">
                    <div>
                      <div className="tl-date">{item.date}</div>
                      <div className="tl-role">{item.role}</div>
                      <div className="tl-org">{item.org}</div>
                    </div>
                    <span className="tl-type-badge" style={{background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44`}}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="tl-desc">{item.desc}</div>
                  {item.bullets.length > 0 && (
                    <ul className="tl-bullets">
                      {item.bullets.map(b => <li key={b}>{b}</li>)}
                    </ul>
                  )}
                  {item.chips.length > 0 && (
                    <div className="tl-chips">
                      {item.chips.map(c => <span className="tl-chip" key={c}>{c}</span>)}
                    </div>
                  )}
                  <div className="tl-accent-bar" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
