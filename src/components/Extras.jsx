import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/* ══════════════════════════════════════════
   SCROLL-REVEAL HOOK
   Watches every element matching `selector`
   inside the returned ref, adds --visible
   once it enters viewport. Fires once only.
══════════════════════════════════════════ */
function useScrollReveal(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(selector);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('sr--vis');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

/* ══════════════════════════════════════════
   GLOBAL REVEAL CSS (injected once)
══════════════════════════════════════════ */
const REVEAL_CSS = `
  .sr-item {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
    transition:
      opacity  0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sr-item.sr--vis {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  /* delay helpers */
  .sr-d0 { transition-delay: 0ms;   }
  .sr-d1 { transition-delay: 100ms; }
  .sr-d2 { transition-delay: 200ms; }
  .sr-d3 { transition-delay: 300ms; }
  .sr-d4 { transition-delay: 400ms; }
  .sr-d5 { transition-delay: 500ms; }
  .sr-d6 { transition-delay: 600ms; }
  .sr-d7 { transition-delay: 700ms; }

  /* ── cert tile shadow fix ── */
  .cert-scroll-wrap {
    overflow: visible !important;
    padding-bottom: 24px;
  }
  .cert-scroll {
    overflow-x: auto !important;
    overflow-y: hidden !important;
    padding-bottom: 24px !important;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }
  .cert-track {
    overflow: visible !important;
  }
`;

/* ══════════════════════════════════════════
   CERTS DATA
══════════════════════════════════════════ */
const CERTS = [
  {
  icon: '🤖',
  image: '/images/cert-ai-beginners.jpg',
  title: 'Artificial Intelligence Beginners Guide',
  program: 'SkillUp by Simplilearn',
  issuer: 'Simplilearn',
  date: '24 Feb 2026',
  desc: 'Completed the Artificial Intelligence Beginners Guide on Simplilearn SkillUp — covering core AI concepts, applications, and industry use cases. Certificate code: 9886142.',
  accent: '#f97316',
  accentRgb: '249,115,22',
  tags: ['Artificial Intelligence', 'Simplilearn', 'Beginners'],
  badge: 'Certified',
  verifyUrl: null,
},
{
  icon: '🧬',
  image: '/images/cert-claude-101.jpg',
  title: 'Claude 101',
  program: 'Anthropic',
  issuer: 'Anthropic',
  date: '2026',
  desc: 'Completed Claude 101 — an introductory course by Anthropic covering the fundamentals of working with Claude AI, prompt engineering, and responsible AI usage.',
  accent: '#d97706',
  accentRgb: '217,119,6',
  tags: ['Claude', 'Anthropic', 'Prompt Engineering'],
  badge: 'Certified',
  verifyUrl: null,
},
{
  icon: '☁️',
  image: '/images/cert-aws-ml.png',
  title: 'Getting Started with AWS Machine Learning',
  program: 'AWS Training · Coursera',
  issuer: 'Amazon Web Services · Coursera',
  date: '25 Mar 2026',
  desc: 'Completed the AWS Machine Learning course authorized by Amazon Web Services and offered through Coursera — covering ML services, SageMaker, and cloud-based AI workflows.',
  accent: '#f59e0b',
  accentRgb: '245,158,11',
  tags: ['AWS', 'Machine Learning', 'Cloud AI'],
  badge: 'Certified',
  verifyUrl: 'https://coursera.org/verify/E7TD3VGWVBZW',
},
{
  icon: '✨',
  image: '/images/cert-genai-beginners.jpg',
  title: 'Generative AI for Beginners',
  program: 'SkillUp by Simplilearn',
  issuer: 'Simplilearn',
  date: '18 Apr 2026',
  desc: 'Completed the Generative AI for Beginners course on Simplilearn SkillUp — exploring LLMs, image generation, and practical GenAI applications. Certificate code: 10122834.',
  accent: '#8b5cf6',
  accentRgb: '139,92,246',
  tags: ['Generative AI', 'LLMs', 'Simplilearn'],
  badge: 'Certified',
  verifyUrl: null,
},
{
  icon: '🐍',
  image: '/images/cert-ml-python.jpg',
  title: 'Machine Learning Using Python',
  program: 'SkillUp by Simplilearn',
  issuer: 'Simplilearn',
  date: '21 Apr 2026',
  desc: 'Completed Machine Learning Using Python on Simplilearn SkillUp — covering supervised and unsupervised learning, model building, and ML pipelines in Python. Certificate code: 10134812.',
  accent: '#10b981',
  accentRgb: '16,185,129',
  tags: ['Machine Learning', 'Python', 'Simplilearn'],
  badge: 'Certified',
  verifyUrl: null,
},
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

/* ══════════════════════════════════════════
   ACHIEVEMENTS DATA
══════════════════════════════════════════ */
const ACHIEVEMENTS = [
  {
    icon: '📊',
    title: 'Kaggle Datasets Expert',
    loc: 'Global Rank: 360 / 9,044',
    date: '2026',
    sub: 'Ranked in the Top 4% globally for high-quality dataset creation and data science contributions. Recognized for impactful community contributions as a final-year student.',
    accent: '#4da8e8',
    accentRgb: '77,168,232',
    badge: 'Kaggle',
    tags: ['Data Science', 'datasets', 'AI']
  },
  {
    icon: '🎯',
    title: 'Vice President — Sponsorship',
    loc: 'College Technical Fest (ICON)',
    date: '2025',
    sub: 'Coordinated with sponsors and corporate partners to secure funding and support for the technical fest. Led team coordination and managed relationships throughout the event.',
    accent: '#d4a843',
    accentRgb: '212,168,67',
    badge: 'Leadership',
    tags: ['Sponsorship', 'Management', 'Leadership']
  },
  {
  icon: '🤖',
  title: 'Event Manager — RoboRace',
  loc: 'College Technical Fest (ICON)',
  date: '2024',
  sub: 'Managed and executed RoboRace, a flagship robotics competition at ICON. Handled end-to-end event logistics, participant coordination, judging criteria, and on-ground operations.',
  accent: '#e05b9a',
  accentRgb: '224,91,154',
  badge: 'Event Management',
  tags: ['Robotics', 'Event Management', 'Operations']
  },
  {
    icon: '👑',
    title: 'Nagpur District Chess Qualifier',
    loc: 'Nagpur District Level',
    date: '2017',
    sub: 'District-level chess victory demonstrating advanced strategy and analytical problem-solving skills.',
    accent: '#ec4899',
    accentRgb: '236,72,153',
    badge: 'Chess',
    tags: ['Logic', 'Excellence']
  },
  {
    icon: '🏆',
    title: 'Inter-School Chess Champion',
    loc: 'Nagpur',
    date: '2016',
    sub: 'Championship victory in inter-school chess competition, showcasing strategic thinking and competitive excellence.',
    accent: '#a855f7',
    accentRgb: '168,85,247',
    badge: 'Chess',
    tags: ['Strategy', 'Competition']
  },
];

/* ══════════════════════════════════════════
   CERT MODAL
══════════════════════════════════════════ */
function CertModal({ cert, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!cert) return null;

  return createPortal(
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={e => e.stopPropagation()} style={{ '--cm-accent': cert.accent }}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        <div
          className="cert-modal-header"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${cert.accent} 25%, #0d1f3c), #0d1f3c)`,
            borderBottom: `1px solid ${cert.accent}33`,
          }}
        >
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
            <span
              className="cert-modal-badge"
              style={{ background: `${cert.accent}22`, border: `1px solid ${cert.accent}55`, color: cert.accent }}
            >{cert.badge}</span>
          </div>
        </div>
        {cert.image && (
          <div className="cert-modal-img-wrap">
            <img src={cert.image} alt={cert.title} className="cert-modal-img" />
          </div>
        )}
        <div className="cert-modal-body">
          <div className="cert-modal-desc">{cert.desc}</div>
          <div className="cert-modal-tags">
            {cert.tags.map(t => (
              <span
                key={t}
                className="cert-modal-tag"
                style={{ background: `${cert.accent}15`, border: `1px solid ${cert.accent}35`, color: cert.accent }}
              >{t}</span>
            ))}
          </div>
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-modal-verify" style={{ background: cert.accent }}>
              Verify Certificate ↗
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════
   PUBLICATIONS
══════════════════════════════════════════ */
export function Publications() {
  const sectionRef = useScrollReveal('.sr-item');
  const scrollRef = useRef(null);
  const progressRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({ left: dir * (clientWidth + 80), behavior: 'smooth' });
  };

  const onScroll = (e) => {
    const t = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = t;
    const max = scrollWidth - clientWidth;
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < max - 10
    });
    if (max > 0 && progressRef.current) {
      const pct = (scrollLeft / max) * 100;
      progressRef.current.style.width = pct + '%';
    }
  };

  return (
    <section id="publications" ref={sectionRef}>
      <style>{REVEAL_CSS}</style>
      <div className="sec-label sr-item sr-d0">05 — Research &amp; Publications</div>
      <div className="cert-header-row">
        <div>
          <h2 className="sec-h sr-item sr-d1" style={{ marginBottom: 6 }}>Published <em>Work</em></h2>
          <div className="cert-scroll-hint sr-item sr-d2">
            <span>scroll or drag to explore</span>
            <span className="cert-arrow-anim">→</span>
          </div>
        </div>
        <div className="cert-nav-btns sr-item sr-d2">
          <button className="cert-nav-btn" onClick={() => scroll(-1)} disabled={!canScroll.left}>‹</button>
          <button className="cert-nav-btn" onClick={() => scroll(1)} disabled={!canScroll.right}>›</button>
        </div>
      </div>
      <div className="pub-scroll-wrap" style={{ marginTop: 24 }}>
        <div className="pub-scroll" ref={scrollRef} onScroll={onScroll}>
          <div className="pub-track">
            {/* IEEE Publication */}
            <div className="pub-card sr-item sr-d2">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img src="/images/cert-ieee-icetems.jpeg" alt="IEEE Certificate" className="pub-cert-img" />
                </div>
              </div>
              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge ieee">IEEE</span>
                  <span className="pub-badge conf">International Conference</span>
                  <span className="pub-badge presented">Presented</span>
                </div>
                <h3 className="pub-title">Sign Language Translator using Machine Learning Algorithms on RGB Color Space</h3>
                <div className="pub-conf">3rd International Conference on Emerging Trends in Engineering and Medical Sciences <strong>(ICETEMS 2026)</strong></div>
                <div className="pub-meta">
                  <span>📅 6–7 March 2026</span>
                  <span>📍 YCCE, Nagpur, India</span>
                  <span>🏛️ IEEE Maharashtra Section</span>
                </div>
                <p className="pub-desc">Researched and presented a real-time sign language recognition system leveraging machine learning algorithms on RGB color space data.</p>
                <div className="pub-tags">
                  {['Machine Learning', 'Computer Vision', 'Sign Language', 'IEEE'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* BalanceTab Extension */}
            <div className="pub-card sr-item sr-d3">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img src="/images/proj-balancetab.png" alt="BalanceTab Extension" className="pub-cert-img" />
                </div>
              </div>
              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge presented" style={{ background: '#3b82f622', border: '1px solid #3b82f666', color: '#60a5fa' }}>BalanceTab</span>
                  <span className="pub-badge conf" style={{ background: '#0ea5e922', border: '1px solid #0ea5e966', color: '#38bdf8' }}>EXTENSION</span>
                  <span className="pub-badge conf" style={{ background: '#a855f722', border: '1px solid #a855f766', color: '#c084fc' }}>v2.9</span>
                  <span className="pub-badge presented" style={{ background: '#10b98122', border: '1px solid #10b98166', color: '#34d399' }}>🚀 LAUNCHED</span>
                </div>
                <h3 className="pub-title">Gamer + Productivity Dashboard — BalanceTab</h3>
                <div className="pub-conf"> Chrome &amp; Edge New Tab Replacement </div>
                <div className="pub-meta">
                  <span>📅 25 March 2026</span>
                  <span>📅 1 April 2026</span>
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>🎮 7 Arcade Games</span>
                </div>
                <p className="pub-desc">
                  Fuses gamer aesthetics with a productivity dashboard. Features an Orbitron-font dashboard, 7 HTML5 Canvas mini-games, real-time weather, an AI quick-launch dock, and zero-cloud local storage.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'Canvas API', 'Open-Meteo API', 'Pure JS', 'Performance'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* TimeMark Extension */}
            <div className="pub-card sr-item sr-d4">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img src="/images/proj-yt-bookmark.png" alt="TimeMark Extension" className="pub-cert-img" />
                </div>
              </div>
              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge presented" style={{ background: '#e91e6322', border: '1px solid #e91e6366', color: '#f06292' }}>TimeMark</span>
                  <span className="pub-badge conf" style={{ background: '#0ea5e922', border: '1px solid #0ea5e966', color: '#38bdf8' }}>EXTENSION</span>
                  <span className="pub-badge conf" style={{ background: '#a855f722', border: '1px solid #a855f766', color: '#c084fc' }}>v1.4</span>
                  <span className="pub-badge presented" style={{ background: '#10b98122', border: '1px solid #10b98166', color: '#34d399' }}>🚀 LAUNCHED</span>
                </div>
                <h3 className="pub-title">YouTube Timestamp Bookmarks — TimeMark</h3>
                <div className="pub-conf"> Native Browser Integration &amp; Utility </div>
                <div className="pub-meta">
                  <span>📅 24 March 2026</span>
                  <span>📅 1 April 2026</span>
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>🛠️ Pure Browser APIs</span>
                </div>
                <p className="pub-desc">
                  Lets users bookmark exact timestamps in any YouTube video with a native in-player button. Features high-precision seeking, green flash feedback, and a dynamic popup panel with real-time playback updates.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'JavaScript', 'MutationObserver', 'Content Scripts', 'Storage API'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Tracker Extension */}
            <div className="pub-card sr-item sr-d5">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img src="/images/proj-growth-tracker.png" alt="Growth Tracker Extension" className="pub-cert-img" />
                </div>
              </div>
              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge presented" style={{ background: '#14532d22', border: '1px solid #14532d66', color: '#4ade80' }}>Growth Tracker</span>
                  <span className="pub-badge conf" style={{ background: '#0ea5e922', border: '1px solid #0ea5e966', color: '#38bdf8' }}>EXTENSION</span>
                  <span className="pub-badge conf" style={{ background: '#a855f722', border: '1px solid #a855f766', color: '#c084fc' }}>v2.6</span>
                  <span className="pub-badge presented" style={{ background: '#10b98122', border: '1px solid #10b98166', color: '#34d399' }}>🚀 LAUNCHED</span>
                </div>
                <h3 className="pub-title">Productivity Tree — Growth Tracker</h3>
                <div className="pub-conf"> Chrome New Tab · Behavioral Productivity Tracker </div>
                <div className="pub-meta">
                  <span>📅 10 April 2026</span>
                  <span>📅 13 April 2026</span>
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>🌴 4 Tree Themes</span>
                  <span>🏆 15 Achievements</span>
                </div>
                <p className="pub-desc">
                  Tracks real browsing behavior all day and grows a live SVG tree based on actual productivity — not a manually started timer. Features Pomodoro mode, declarativeNetRequest site blocking, YouTube smart detection, weekly stats, and a full task manager. Zero data collection, 100% local.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'declarativeNetRequest', 'SVG Animation', 'Chrome Storage API', 'Pomodoro', 'Pure JS'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }} />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>drag or use arrows to explore</span>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════ */
export function Certifications() {
  const scrollRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useScrollReveal('.sr-item');
  const [selected, setSelected] = useState(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({ left: dir * clientWidth * 0.8, behavior: 'smooth' });
  };

  const onScroll = (e) => {
    const t = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = t;
    const max = scrollWidth - clientWidth;
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < max - 10
    });
    if (max > 0 && progressRef.current) {
      const pct = (scrollLeft / max) * 100;
      progressRef.current.style.width = pct + '%';
    }
  };

  return (
    <section id="certs" ref={sectionRef}>
      <div className="sec-label sr-item sr-d0">06 — Certifications &amp; Courses</div>
      <div className="cert-header-row">
        <div>
          <h2 className="sec-h sr-item sr-d1" style={{ marginBottom: 6 }}>Continuous <em>Learning</em></h2>
          <div className="cert-scroll-hint sr-item sr-d2">
            <span>scroll to explore</span>
            <span className="cert-arrow-anim">→</span>
          </div>
        </div>
        <div className="cert-nav-btns sr-item sr-d2">
          <button className="cert-nav-btn" onClick={() => scroll(-1)} disabled={!canScroll.left}>‹</button>
          <button className="cert-nav-btn" onClick={() => scroll(1)} disabled={!canScroll.right}>›</button>
        </div>
      </div>
      <div className="cert-scroll-wrap">
        <div className="cert-scroll" ref={scrollRef} onScroll={onScroll}>
          <div className="cert-track">
            {CERTS.map((c, i) => (
              <div
                key={c.title}
                className={`cert-tile sr-item sr-d${Math.min(i, 7)}`}
                style={{ '--accent': c.accent, '--accent-rgb': c.accentRgb }}
                onClick={() => setSelected(c)}
              >
                <div className="cert-tile-glow" />
                <div className="cert-tile-bar" />
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
                    {c.tags.slice(0, 3).map(t => (
                      <span key={t} className="cert-tile-tag">{t}</span>
                    ))}
                  </div>
                  <div className="cert-tile-tap">click to view →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }} />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>drag or use arrows to explore</span>
      </div>
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ══════════════════════════════════════════
   ACHIEVEMENTS
══════════════════════════════════════════ */
export function Achievements() {
  const scrollRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useScrollReveal('.sr-item');
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({ left: dir * clientWidth * 0.8, behavior: 'smooth' });
  };

  const onScroll = (e) => {
    const t = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = t;
    const max = scrollWidth - clientWidth;
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < max - 10
    });
    if (max > 0 && progressRef.current) {
      const pct = (scrollLeft / max) * 100;
      progressRef.current.style.width = pct + '%';
    }
  };

  return (
    <section id="achievements" ref={sectionRef}>
      <div className="sec-label sr-item sr-d0">07 — Leadership &amp; Achievements</div>
      <div className="cert-header-row">
        <div>
          <h2 className="sec-h sr-item sr-d1" style={{ marginBottom: 6 }}>Beyond <em>Code</em></h2>
          <div className="cert-scroll-hint sr-item sr-d2">
            <span>scroll or drag to explore</span>
            <span className="cert-arrow-anim">→</span>
          </div>
        </div>
        <div className="cert-nav-btns sr-item sr-d2">
          <button className="cert-nav-btn" onClick={() => scroll(-1)} disabled={!canScroll.left}>‹</button>
          <button className="cert-nav-btn" onClick={() => scroll(1)} disabled={!canScroll.right}>›</button>
        </div>
      </div>
      <div className="cert-scroll-wrap" style={{ marginTop: 24 }}>
        <div className="cert-scroll" ref={scrollRef} onScroll={onScroll}>
          <div className="cert-track">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={a.title}
                className={`ach-tile sr-item sr-d${Math.min(i, 7)}`}
                style={{ '--accent': a.accent, '--accent-rgb': a.accentRgb }}
              >
                <div className="ach-tile-left">
                  <div className="ach-tile-glow" />
                  <div className="ach-tile-icon-wrap">{a.icon}</div>
                  <div className="ach-tile-badge">{a.badge}</div>
                </div>
                <div className="ach-tile-right">
                  <div className="ach-tile-title">{a.title}</div>
                  <div className="ach-tile-loc">{a.loc}</div>
                  <div className="ach-tile-date">{a.date}</div>
                  <div className="ach-tile-desc">{a.sub}</div>
                  <div className="ach-tile-tags">
                    {a.tags.map(t => (
                      <span key={t} className="ach-tile-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }} />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>drag or use arrows to explore</span>
      </div>
    </section>
  );
}