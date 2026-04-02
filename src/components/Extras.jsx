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
    // Scroll by full view width + gap for predictable card-by-card movement
    // The gap in CSS is 80px, so we scroll by roughly 100% of container
    scrollRef.current.scrollBy({ left: dir * (clientWidth + 80), behavior: 'smooth' });
  };

  const onScroll = (e) => {
    const t = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = t;
    const max = scrollWidth - clientWidth;

    // Update buttons
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < max - 10
    });

    // Update progress bar
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
                <div className="pub-conf">
                  3rd International Conference on Emerging Trends in Engineering and Medical Sciences <strong>(ICETEMS 2026)</strong>
                </div>
                <div className="pub-meta">
                  <span>📅 6–7 March 2026</span>
                  <span>📍 YCCE, Nagpur, India</span>
                  <span>🏛️ IEEE Maharashtra Section</span>
                </div>
                <p className="pub-desc">
                  Researched and presented a real-time sign language recognition system leveraging machine learning algorithms on RGB color space data.
                </p>
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
          </div>
        </div>
      </div>

      {/* Progress bar + hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            ref={progressRef}
            style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }}
          />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          drag or use arrows to explore
        </span>
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
    // Scroll by roughly 80% of view width for better UX on all devices
    scrollRef.current.scrollBy({ left: dir * clientWidth * 0.8, behavior: 'smooth' });
  };

  const onScroll = (e) => {
    const t = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = t;
    const max = scrollWidth - clientWidth;

    // Update buttons
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < max - 10
    });

    // Update progress bar
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
                    {c.tags.slice(0, 3).map(t => <span key={t} className="cert-tile-tag">{t}</span>)}
                  </div>
                  <div className="cert-tile-tap">click to view →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar + hint — same as Experience section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            ref={progressRef}
            style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }}
          />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          drag or use arrows to explore
        </span>
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ══════════════════════════════════════════
   ACHIEVEMENTS
══════════════════════════════════════════ */
export function Achievements() {
  const ref = useScrollReveal('.sr-item');

  return (
    <section id="achievements" ref={ref}>
      <div className="sec-label sr-item sr-d0">07 — Leadership &amp; Achievements</div>
      <h2 className="sec-h sr-item sr-d1">Beyond <em>Code</em></h2>

      <div style={{ marginTop: 44 }}>
        <div className="lead-card sr-item sr-d2">
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

        <div className="ach-grid" style={{ marginTop: 24 }}>
          {[
            { icon: '🏆', title: 'Inter-School Chess Champion', loc: 'Nagpur', sub: 'Championship in inter-school chess — strategic thinking and competitive excellence.' },
            { icon: '👑', title: 'Nagpur District Chess Champion', loc: 'Nagpur District Level', sub: 'District-level chess victory showcasing advanced strategy and analytical problem-solving.' },
            { icon: '⭐', title: 'State-Level Chess Qualifier', loc: '8th Grade Achievement', sub: 'Qualified for state-level chess in 8th grade — early proof of sustained competitive focus.' },
          ].map((a, i) => (
            <div key={a.title} className={`ach-card sr-item sr-d${i + 3}`}>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-title">{a.title}</div>
              <div className="ach-loc">{a.loc}</div>
              <div className="ach-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}