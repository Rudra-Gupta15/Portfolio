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
    image: '/images/cert-prevoyance-internship.jpg',
    topBadge: 'FEATURED CREDENTIAL',
    title: 'AI/ML Internship Completed!',
    program: 'Prevoyance IT Solutions Pvt. Ltd.',
    issuer: 'Prevoyance IT Solutions Pvt. Ltd.',
    date: '1 Jan 2026 – 1 Jun 2026',
    dateShort: 'Jun 2026',
    desc: 'Awarded for outstanding performance and dedication in completing the 6-month AI/ML internship at Prevoyance IT Solutions Pvt. Ltd.',
    highlights: [
      'Worked on real-world AI/ML projects and solutions',
      'Explored LLMs, Machine Learning models and AI applications',
      'Gained hands-on experience in model training, evaluation and deployment',
      'Strengthened problem-solving, research and teamwork skills',
    ],
    accent: '#d4a843',
    accentRgb: '212,168,67',
    tags: ['AI/ML', 'LLMS', 'MACHINE LEARNING', 'PREVOYANCE IT'],
    badge: 'INTERNSHIP',
    verifyUrl: null,
  },
  {
    image: '/images/cert-ai-beginners.jpg',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Artificial Intelligence Beginners Guide',
    program: 'SkillUp by Simplilearn',
    issuer: 'Simplilearn',
    date: '24 Feb 2026',
    dateShort: 'Feb 2026',
    desc: 'Completed the Artificial Intelligence Beginners Guide on Simplilearn SkillUp covering core AI concepts.',
    highlights: [
      'Mastered foundational AI & Machine Learning concepts',
      'Explored neural networks, computer vision, and real-world AI use cases',
      'Earned verified completion certificate (Code: 9886142)',
    ],
    accent: '#f97316',
    accentRgb: '249,115,22',
    tags: ['ARTIFICIAL INTELLIGENCE', 'SIMPLILEARN', 'BEGINNERS'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-claude-101.jpg',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Claude 101',
    program: 'Anthropic',
    issuer: 'Anthropic',
    date: '2026',
    dateShort: '2026',
    desc: 'Completed Claude 101 by Anthropic covering fundamentals of working with Claude AI & prompt engineering.',
    highlights: [
      'Completed official Anthropic prompt engineering & Claude API fundamentals',
      'Learned structured prompting, system messages, and XML formatting',
      'Applied responsible AI safety guidelines and LLM workflow patterns',
    ],
    accent: '#d97706',
    accentRgb: '217,119,6',
    tags: ['CLAUDE', 'ANTHROPIC', 'PROMPT ENG.'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-aws-ml.png',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Getting Started with AWS Machine Learning',
    program: 'AWS Training · Coursera',
    issuer: 'Amazon Web Services · Coursera',
    date: '25 Mar 2026',
    dateShort: 'Mar 2026',
    desc: 'Authorized by Amazon Web Services and offered through Coursera — covering cloud-based AI workflows.',
    highlights: [
      'Authorized course by AWS covering cloud machine learning services',
      'Hands-on experience with Amazon SageMaker, Rekognition & Comprehend',
      'Built end-to-end cloud ML pipelines and automated data workflows',
    ],
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    tags: ['AWS', 'MACHINE LEARNING', 'CLOUD AI'],
    badge: 'CERTIFIED',
    verifyUrl: 'https://coursera.org/verify/E7TD3VGWVBZW',
  },
  {
    image: '/images/cert-genai-beginners.jpg',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Generative AI for Beginners',
    program: 'SkillUp by Simplilearn',
    issuer: 'Simplilearn',
    date: '18 Apr 2026',
    dateShort: 'Apr 2026',
    desc: 'Explored Large Language Models (LLMs), image generation, and practical GenAI applications.',
    highlights: [
      'Hands-on training in Large Language Models (LLMs) and Prompt Engineering',
      'Understood diffusion models, GANs, and generative AI architecture',
      'Earned verified completion certificate (Code: 10122834)',
    ],
    accent: '#8b5cf6',
    accentRgb: '139,92,246',
    tags: ['GENERATIVE AI', 'LLMS', 'SIMPLILEARN'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-ml-python.jpg',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Machine Learning Using Python',
    program: 'SkillUp by Simplilearn',
    issuer: 'Simplilearn',
    date: '21 Apr 2026',
    dateShort: 'Apr 2026',
    desc: 'Covered supervised and unsupervised learning algorithms, model building, and ML pipelines in Python.',
    highlights: [
      'Built end-to-end ML pipelines using Scikit-Learn, Pandas, and NumPy',
      'Model evaluation, feature scaling, hyperparameter tuning & cross-validation',
      'Earned verified completion certificate (Code: 10134812)',
    ],
    accent: '#10b981',
    accentRgb: '16,185,129',
    tags: ['MACHINE LEARNING', 'PYTHON', 'SIMPLILEARN'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-ai-aware.png',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'AI Aware',
    program: 'AI For All',
    issuer: 'Intel · Digital India · CBSE',
    date: '12 Feb 2026',
    dateShort: 'Feb 2026',
    desc: 'Completed the AI Aware stage of the AI For All program — foundational AI concepts.',
    highlights: [
      'Foundational certification by Intel and Digital India',
      'Understanding of AI impact, computer vision, and data science concepts',
    ],
    accent: '#0071c5',
    accentRgb: '0,113,197',
    tags: ['ARTIFICIAL INTELLIGENCE', 'INTEL', 'DIGITAL INDIA'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-ai-appreciate.png',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'AI Appreciate',
    program: 'AI For All',
    issuer: 'Intel · Digital India · CBSE',
    date: '12 Feb 2026',
    dateShort: 'Feb 2026',
    desc: 'Completed the AI Appreciate stage — deeper appreciation of AI capabilities & ethical implications.',
    highlights: [
      'Advanced appreciation stage of Intel AI For All program',
      'Explored AI ethics, privacy-first AI development, and societal impact',
    ],
    accent: '#00aaff',
    accentRgb: '0,170,255',
    tags: ['AI ETHICS', 'INTEL', 'APPLIED AI'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-python-iit.jpg',
    topBadge: 'ACADEMIC CREDENTIAL',
    title: 'Python 3.4.3 Training',
    program: 'Spoken Tutorial · IIT Bombay',
    issuer: 'IIT Bombay · YCCE',
    date: '21 June 2023',
    dateShort: 'Jun 2023',
    desc: 'Passed online exam conducted remotely from IIT Bombay. Credits: 4 | Score: 65%.',
    highlights: [
      'Passed remote online exam conducted directly by IIT Bombay',
      'Earned 4 academic credits in core Python programming & data structures',
    ],
    accent: '#ffd43b',
    accentRgb: '255,212,59',
    tags: ['PYTHON', 'IIT BOMBAY', 'PROGRAMMING'],
    badge: 'CERTIFIED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-cpp-dsa.jpg',
    topBadge: 'VERIFIED CERTIFICATION',
    title: 'Data Structures & Algorithms in C++',
    program: 'Great Learning Academy',
    issuer: 'Great Learning Academy',
    date: 'March 2024',
    dateShort: 'Mar 2024',
    desc: 'Covers core DSA concepts, problem-solving techniques, and algorithmic thinking.',
    highlights: [
      'Algorithmic problem-solving and time/space complexity analysis',
      'Arrays, Linked Lists, Trees, Graphs, Sorting & Searching algorithms',
    ],
    accent: '#a855f7',
    accentRgb: '168,85,247',
    tags: ['C++', 'DSA', 'ALGORITHMS'],
    badge: 'CERTIFIED',
    verifyUrl: 'https://verify.mygreatlearning.com/TFINJJEO',
  },
  {
    image: null,
    topBadge: 'COURSE COMPLETION',
    title: 'Complete C# Unity 2D Game Dev',
    program: 'Udemy Course',
    issuer: 'Udemy · GameDev.tv Team',
    date: '2024',
    dateShort: '2024',
    desc: 'Mastered 2D game mechanics and C# scripting in Unity 6, including physics, enemy AI, and tilemaps.',
    highlights: [
      'Mastered 2D physics, tilemaps, and character controller scripting',
      'Built AI state machines, pathfinding, and animation controllers in Unity',
    ],
    accent: '#a855f7',
    accentRgb: '168,85,247',
    tags: ['UNITY', 'C#', '2D GAMES'],
    badge: 'COMPLETED',
    verifyUrl: null,
  },
  {
    image: null,
    topBadge: 'COURSE COMPLETION',
    title: 'Complete C# Unity 3D Game Dev',
    program: 'Udemy Course',
    issuer: 'Udemy · GameDev.tv Team',
    date: '2024',
    dateShort: '2024',
    desc: 'Advanced 3D creation in Unity 6 — lighting, physics, particle systems, and advanced C# patterns.',
    highlights: [
      'Advanced 3D environment creation, lighting, and particle systems',
      'Implemented C# design patterns, object pooling, and game state managers',
    ],
    accent: '#5be05b',
    accentRgb: '91,224,91',
    tags: ['UNITY 6', 'C#', '3D GAMES'],
    badge: 'COMPLETED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-aeromodel.jpg',
    topBadge: 'WORKSHOP',
    title: 'Glider Making Workshop',
    program: 'Avion · YCCE',
    issuer: 'Yeshwantrao Chavan College of Engineering',
    date: '2024',
    dateShort: '2024',
    desc: 'Hands-on glider making workshop by Avion (Aeromodelling Club) in collaboration with Aerovision.',
    highlights: [
      'Hands-on aerodynamics, wing design, and center of gravity calculations',
      'Fabricated and balanced micro-glider models for competitive flight testing',
    ],
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    tags: ['AEROMODELLING', 'MECHANICAL', 'WORKSHOP'],
    badge: 'PARTICIPATED',
    verifyUrl: null,
  },
  {
    image: '/images/cert-drawing.jpg',
    topBadge: 'COMPETITION',
    title: 'Drawing Competition — Kalasparsh',
    program: 'KALASPARSH Art Club',
    issuer: 'Yeshwantrao Chavan College of Engineering',
    date: '2024',
    dateShort: '2024',
    desc: 'Participated in the Kalasparsh Drawing Competition, showcasing creative imagination and artistry.',
    highlights: [
      'Showcased creative imagination, visual design, and artistic execution',
    ],
    accent: '#ec4899',
    accentRgb: '236,72,153',
    tags: ['ART', 'DRAWING', 'CREATIVE'],
    badge: 'PARTICIPATED',
    verifyUrl: null,
  },
];

/* ══════════════════════════════════════════
   ACHIEVEMENTS DATA
══════════════════════════════════════════ */
const ACHIEVEMENTS = [
  {
    icon: '📊',
    title: 'Kaggle Dataset & Code Expert',
    loc: (
      <span style={{ display: 'inline-block', textAlign: 'left', lineHeight: '1.4', verticalAlign: 'middle' }}>
        Datasets: 220 / 11,018 <br />
        Code: 2,336 / 61,392
      </span>
    ),
    date: '2026',
    sub: 'Kaggle: Dataset Expert (Rank 220/11,018, Peak 217 • 3/4 Silver to Master) • Code Expert (Rank 2,336/61,392, Peak 2,271).',
    accent: '#4da8e8',
    accentRgb: '77,168,232',
    badge: 'Kaggle',
    tags: ['Data Science', 'datasets', 'AI']
  },
  {
    icon: '📦',
    title: 'Chrome Extension Developer',
    loc: '500+ Combined Installs',
    date: '2026',
    sub: 'Designed, built, and launched 3 browser extensions on the Chrome Web Store (BalanceTab, TimeMark, Growth Tracker) with Manifest V3, gaining 500+ installs and active users.',
    accent: '#10b981',
    accentRgb: '16,185,129',
    badge: 'Extensions',
    tags: ['Manifest V3', 'Chrome API', 'Publishing']
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
          <div className="cert-scroll-hint sr-item sr-d2" style={{ marginTop: 8 }}>
            <span>Showing 6 published works — research, platforms, and tools</span>
          </div>
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
                  <a
                    href="https://ieeexplore.ieee.org/document/11469377"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    View IEEE Paper ↗
                  </a>
                </div>
              </div>
            </div>

            {/* ConvoSec AI Official Website */}
            <div className="pub-card sr-item sr-d3">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img
                    src="/images/convosecai.png"
                    alt="ConvoSec AI Website"
                    className="pub-cert-img"
                  />
                </div>
              </div>

              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge presented" style={{ background: '#0ea5e922', border: '1px solid #0ea5e966', color: '#38bdf8' }}>FULL STACK</span>
                  <span className="pub-badge live">Live Website</span>
                  <span className="pub-badge startup">Startup + Education</span>
                </div>

                <h3 className="pub-title">
                  ConvoSec AI — Official Company Platform
                </h3>

                <div className="pub-conf">
                  End-to-end AI & Cybersecurity ecosystem designed for{" "}
                  <strong>ConvoSec AI</strong>
                </div>

                <div className="pub-meta">
                  <span>🌐 www.convosecai.com</span>
                  <span>📍 Nagpur, India</span>
                  <span>⚡ React • Node.js • JWT Security</span>
                </div>

                <p className="pub-desc">
                  Designed and developed the full-stack infrastructure for ConvoSec AI, a multi-faceted firm focusing on AI+Cybersecurity project delivery and professional education. The platform features a high-fidelity learning management system, project showcases, and a secure authenticated backend—leading to a direct full-time engineering offer.
                </p>

                <div className="pub-tags">
                  {[
                    "React",
                    "Node.js",
                    "Cybersecurity",
                    "AI Platform",
                    "Full Stack",
                    "Vercel"
                  ].map((t) => (
                    <span key={t} className="pub-tag">
                      {t}
                    </span>
                  ))}

                  <a
                    href="https://www.convosecai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    Visit Website ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Perfionix AI Enterprise Website */}
            <div className="pub-card sr-item sr-d4">
              <div className="pub-card-left">
                <div className="pub-img-frame">
                  <img
                    src="/images/perfionixai.png"
                    alt="Perfionix AI Website"
                    className="pub-cert-img"
                  />
                </div>
              </div>

              <div className="pub-card-right">
                <div className="pub-badge-row">
                  <span className="pub-badge presented" style={{ background: '#0ea5e922', border: '1px solid #0ea5e966', color: '#38bdf8' }}>FREELANCE</span>
                  <span className="pub-badge live">Live Website</span>
                  <span className="pub-badge conf" style={{ background: '#a855f722', border: '1px solid #a855f766', color: '#c084fc' }}>ENTERPRISE</span>
                </div>

                <h3 className="pub-title">
                  Perfionix AI — Enterprise Website
                </h3>

                <div className="pub-conf">
                  AI Consulting & Product Showcase Frontend for{" "}
                  <strong>Perfionix AI Pvt. Ltd.</strong>
                </div>

                <div className="pub-meta">
                  <span>🌐 www.perfionixai.com</span>
                  <span>📍 Nagpur, India</span>
                  <span>⚡ Next.js 14 • Framer Motion • Spline 3D</span>
                </div>

                <p className="pub-desc">
                  Premium public-facing website designed and developed from scratch for Perfionix AI Pvt. Ltd. Features a Cyber-Ops dark aesthetic with a Spline 3D hero, Framer Motion animations, and complete product showcase sections for four flagship AI products. Delivered with a 92+ Lighthouse performance score.
                </p>

                <div className="pub-tags">
                  {[
                    "Next.js 14",
                    "React 18",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Spline 3D",
                    "Lucide React"
                  ].map((t) => (
                    <span key={t} className="pub-tag">
                      {t}
                    </span>
                  ))}

                  <a
                    href="https://www.perfionixai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    Visit Website ↗
                  </a>
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
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>👤 30+ Active Users</span>
                  <span>📥 185+ Installs</span>
                  <span>⭐ 5.0/5 Rating</span>
                </div>
                <p className="pub-desc">
                  Fuses gamer aesthetics with a productivity dashboard. Features an Orbitron-font dashboard, 7 HTML5 Canvas mini-games, real-time weather, an AI quick-launch dock, and zero-cloud local storage.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'Canvas API', 'Open-Meteo API', 'Pure JS', 'Performance'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                  <a
                    href="https://chromewebstore.google.com/detail/balancetab-%E2%80%94-gamer-+-offi/nglnanlbnedkffjgncmokibcliabkpki"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    View Extension ↗
                  </a>
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
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>👤 10+ Active Users</span>
                  <span>📥 154+ Installs</span>
                </div>
                <p className="pub-desc">
                  Lets users bookmark exact timestamps in any YouTube video with a native in-player button. Features high-precision seeking, green flash feedback, and a dynamic popup panel with real-time playback updates.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'JavaScript', 'MutationObserver', 'Content Scripts', 'Storage API'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                  <a
                    href="https://chromewebstore.google.com/detail/timemark-%E2%80%94-video-timestam/kdpmjbeocligojphcnadcjobbpbkkbea"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    View Extension ↗
                  </a>
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
                  <span>📦 Chrome Web Store (v3)</span>
                  <span>👤 8+ Active Users</span>
                  <span>📥 128+ Installs</span>
                </div>
                <p className="pub-desc">
                  Tracks real browsing behavior all day and grows a live SVG tree based on actual productivity — not a manually started timer. Features Pomodoro mode, declarativeNetRequest site blocking, YouTube smart detection, weekly stats, and a full task manager. Zero data collection, 100% local.
                </p>
                <div className="pub-tags">
                  {['Manifest V3', 'declarativeNetRequest', 'SVG Animation', 'Chrome Storage API', 'Pomodoro', 'Pure JS'].map(t => (
                    <span key={t} className="pub-tag">{t}</span>
                  ))}
                  <a
                    href="https://chromewebstore.google.com/detail/growth-tracker-productivi/npdkgjbiebohlhaielkmojlaailppjoo?hl=en-US&utm_source=ext_sidebar"
                    target="_blank"
                    rel="noreferrer"
                    className="pub-link"
                  >
                    View Extension ↗
                  </a>
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
          <div className="cert-scroll-hint sr-item sr-d2" style={{ marginTop: 8 }}>
            <span>{CERTS.length} certifications & course completions</span>
          </div>
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

                {/* Certificate image preview */}
                {c.image && (
                  <div className="cert-tile-img-strip">
                    <img src={c.image} alt={c.title} className="cert-tile-img" />
                    <div className="cert-tile-img-overlay" />
                  </div>
                )}

                <div className="cert-tile-content">
                  {/* Badge + Date row */}
                  <div className="cert-tile-top">
                    <span className="cert-tile-badge">{c.badge}</span>
                    <span className="cert-tile-date">{c.dateShort || c.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="cert-tile-title">{c.title}</h3>

                  {/* Issuer */}
                  <div className="cert-tile-issuer">{c.issuer}</div>

                  {/* Date line */}
                  <div className="cert-tile-dateline">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,opacity:0.55}}>
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{c.date}</span>
                  </div>

                  {/* Key Highlights */}
                  {c.highlights && c.highlights.length > 0 && (
                    <div className="cert-tile-highlights">
                      <div className="cert-tile-hl-label">KEY HIGHLIGHTS</div>
                      <ul className="cert-tile-hl-list">
                        {c.highlights.slice(0, 3).map((h, hi) => (
                          <li key={hi} className="cert-tile-hl-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,color:'var(--accent)'}}>
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="cert-tile-tags">
                    {c.tags.slice(0, 3).map(t => (
                      <span key={t} className="cert-tile-tag">{t}</span>
                    ))}
                  </div>

                  {/* Footer link */}
                  <div className="cert-tile-tap">
                    <span>CLICK TO VIEW CERTIFICATE</span>
                    <span className="cert-tile-arrow">→</span>
                  </div>
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
          <div className="cert-scroll-hint sr-item sr-d2" style={{ marginTop: 8 }}>
            <span>{ACHIEVEMENTS.length} professional milestones & awards</span>
          </div>
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
                <div className="ach-tile-glow" />
                <div className="ach-tile-top-bar">
                  <div className="ach-tile-icon-wrap">{a.icon}</div>
                  <span className="ach-tile-badge">{a.badge}</span>
                </div>
                <div className="ach-tile-content">
                  <h3 className="ach-tile-title">{a.title}</h3>
                  <div className="ach-tile-meta">
                    <span className="ach-tile-loc">{a.loc}</span>
                    <span className="ach-tile-sep">•</span>
                    <span className="ach-tile-date">{a.date}</span>
                  </div>
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