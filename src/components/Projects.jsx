import { useState, useEffect, useRef } from 'react';

const PROJECTS = [
  {
    cat: 'aiml',
    image: '/images/proj-ml-comparison.png',
    emoji: '📊',
    type: 'Research AI',
    title: 'ML Algorithm Comparison',
    subtitle: 'Benchmarking Framework',
    gradient: ['#1a3a6e', '#2563a8'],
    gradientBg: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6e 50%, #2563a8 100%)',
    overview: 'A comprehensive ML benchmarking framework that evaluates and visually compares multiple supervised and unsupervised algorithms across key performance metrics — helping pick the right model fast.',
    bullets: [
      'Side-by-side comparison of Accuracy, Precision, Recall, F1-Score',
      'Evaluates computational overhead and training time per model',
      'Visual confusion matrices, ROC curves, and PR curves',
      'Supports both supervised and unsupervised comparison pipelines',
    ],
    techDetails: 'Compares SVM, Random Forest, KNN, Logistic Regression & more. Auto-selects best model per dataset using cross-validation scoring.',
    outcome: 'Accelerates ML development by benchmarking performance fast',
    tags: ['Matplotlib', 'Sklearn', 'Python', 'Analytics', 'NumPy'],
    github: 'https://github.com/Rudra-Gupta15/Algorithm_Comparison',
  },
  {
    cat: 'aiml web',
    image: '/images/proj-movie-recommender.png',
    emoji: '🎬',
    type: 'ML + Streamlit',
    title: 'Movie Recommender System',
    subtitle: 'Content-Based Filtering',
    gradient: ['#1a1a4a', '#4a1a7a'],
    gradientBg: 'linear-gradient(135deg, #0f0f2e 0%, #1a1a4a 50%, #4a1a7a 100%)',
    overview: 'An interactive ML-powered web app that delivers personalized movie recommendations using content-based filtering. Fetches real-time posters and metadata from the TMDB API.',
    bullets: [
      'Smart recommendations via Cosine Similarity on metadata features',
      'Real-time movie posters & details via TMDB API integration',
      'Top 10 movies by genre discovery section',
      'Light/Dark mode toggle + custom navbar UX',
      'Live deployment on Streamlit Cloud',
    ],
    techDetails: 'Model trained in Google Colab using Pandas feature engineering. Cosine Similarity computes distances across cast, plot, and genre vectors. Flask-style Streamlit frontend.',
    outcome: 'Live Streamlit app for instant personalized movie discovery',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'TMDB API', 'Pandas'],
    github: 'https://github.com/Rudra-Gupta15/movie-recommender-system',
  },
  {
    cat: 'web',
    image: '/images/proj-snow-run.png',
    emoji: '🏍️',
    type: 'Game Development · React',
    title: 'Snow Run Game',
    subtitle: 'Multi-Level Browser Racing Game',
    gradient: ['#1a4a7a', '#00b4d8'],
    gradientBg: 'linear-gradient(135deg, #0d2a4a 0%, #1a4a7a 40%, #00b4d8 100%)',
    overview: 'A thrilling browser-based multi-level racing game built purely with React + Vite + Tailwind CSS — no game engine. Speed through icy tracks, dodge polar bears, race to the finish, and fight the BOSS.',
    bullets: [
      'Multiple levels with progressively harder tracks, speed & complexity',
      'Keyboard controls — intuitive input handling for seamless gameplay',
      'Game states: start screen, level transitions, pause, game over',
      'Component-based architecture — modular React elements per game object',
      'Vite-powered build for snappy 60fps performance',
    ],
    techDetails: 'No canvas or game engine — all game physics via React state and hooks. CSS transforms handle movement. Collision detection via bounding-box logic in useEffect.',
    outcome: 'Full browser game with boss fight — zero game engine, pure React',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Game Dev'],
    github: 'https://github.com/Rudra-Gupta15/Snow_Run_Game',
    live: 'https://snow-run-game.vercel.app/',
  },
  {
    cat: 'aiml',
    image: '/images/proj-asl.png',
    emoji: '🤟',
    type: 'College Major · AI/ML/IoT',
    title: 'ASL Recognition',
    subtitle: 'Multi-Scale Machine Learning',
    gradient: ['#1a6b4a', '#2d9b6f'],
    gradientBg: 'linear-gradient(135deg, #0f4a35 0%, #1a6b4a 50%, #2d9b6f 100%)',
    overview: 'Real-time American Sign Language recognition using 3 parallel ML models trained across RGB, HSV, and Grayscale — achieving robust detection regardless of lighting conditions.',
    bullets: [
      '3 parallel models (RGB/HSV/Grayscale) — 9,000 training images total',
      'YOLOv8 + CNN with real-time prediction smoothing algorithm',
      'Tkinter GUI for sentence generation & live monitoring dashboard',
      'Supports full ASL alphabet and 1–10 numerical gestures',
    ],
    techDetails: 'YOLOv8 handles bounding box detection, CNN handles classification. Custom smoothing reduces flicker on borderline predictions.',
    outcome: 'Robust detection across 3 color scales in real-time',
    tags: ['YOLOv8', 'OpenCV', 'CNN', 'Tkinter', 'Python'],
    github: 'https://github.com/Rudra-Gupta15/Sign-Language-Translator-YOLO-CNN',
  },
  {
    cat: 'aiml web',
    image: '/images/proj-weather.png',
    emoji: '🌦️',
    type: 'ML Dashboard',
    title: 'Hyperlocal Weather Impact',
    subtitle: 'Forecasting & Analytics',
    gradient: ['#1a4a7a', '#d4a843'],
    gradientBg: 'linear-gradient(135deg, #0d2a4a 0%, #1a4a7a 40%, #7a5a1a 100%)',
    overview: 'End-to-end weather forecasting comparing 3 ML models through an interactive JS dashboard with live analytics — translating complex ML metrics into clear, actionable visuals.',
    bullets: [
      'Compares Linear Regression, Random Forest & Gradient Boosting',
      'Dashboard: MAE, RMSE, R² and actual vs. predicted charts',
      'Robust ML pipeline with feature lags and interaction terms',
      'JavaScript UI with live forecasts and analytics modal',
    ],
    techDetails: 'Feature engineering: lag features (t-1, t-7, t-30) + seasonal interaction terms. Flask API serves predictions to a vanilla JS frontend.',
    outcome: 'Complex ML results delivered through an interactive dashboard',
    tags: ['Scikit-learn', 'Flask', 'JavaScript', 'Python', 'NumPy'],
    github: 'https://github.com/Rudra-Gupta15/Hyperlocal_Weather_Impact_Prediction',
    live: 'https://hyperlocal-weather-impact-predictio-tau.vercel.app/',
  },
  {
    cat: 'aiml',
    image: '/images/proj-heart-disease.png',
    emoji: '❤️',
    type: 'Healthcare AI',
    title: 'Heart Disease Prediction',
    subtitle: 'ML-Powered Early Detection',
    gradient: ['#7b1a2e', '#c0392b'],
    gradientBg: 'linear-gradient(135deg, #5a0f1f 0%, #8b2030 50%, #c0392b 100%)',
    overview: 'A clinical decision-support system predicting cardiovascular disease risk using Gradient Boosting with a Flask backend — delivering near-zero-latency predictions.',
    bullets: [
      'Gradient Boosting model tuned for high precision and recall',
      'Flask backend with .pkl pipelines — zero-latency predictions',
      'ROC-AUC validation to minimize false negatives in diagnosis',
      'Pandas/NumPy feature scaling & preprocessing pipeline',
    ],
    techDetails: 'Trained on Cleveland Heart Disease dataset. Serialized with joblib for fast inference. Flask API serves predictions in <50ms.',
    outcome: 'Early detection bridge for cardiovascular risks',
    tags: ['Gradient Boosting', 'Flask', 'Sklearn', 'Pandas', 'Python'],
    github: 'https://github.com/Rudra-Gupta15/heart-disease-prediction',
  },
  {
    cat: 'web aiml',
    image: '/images/proj-versustech.png',
    emoji: '📱',
    type: 'Full-Stack Data Science',
    title: 'VersusTech',
    subtitle: 'Device Recommendation Engine',
    gradient: ['#6a1a4a', '#e05b9a'],
    gradientBg: 'linear-gradient(135deg, #3a0d2a 0%, #6a1a4a 50%, #c0398a 100%)',
    overview: 'A full-stack device recommendation engine helping users compare and choose smartphones/laptops using a multi-layered weighted scoring algorithm.',
    bullets: [
      'Multi-layered filtering scoring devices on 12+ weighted parameters',
      'RESTful Flask API serving real-time CSV-to-UI device data',
      'Advanced "Tech-Filter" for granular hardware spec filtering',
      'Automated Amazon & Flipkart marketplace price mapping',
    ],
    techDetails: 'Scoring engine weights specs by user priority. Flask API reads from regularly updated CSV dataset with 500+ devices.',
    outcome: 'Bridged hardware specs with user purchasing decisions',
    tags: ['Flask', 'Python', 'JavaScript', 'CSV', 'REST API'],
    github: 'https://github.com/Rudra-Gupta15/Advance-device-recommendation-system',
  },
  {
    cat: 'hardware',
    image: '/images/proj-food-machine.png',
    emoji: '⚙️',
    type: 'Electronics & IoT',
    title: 'Raj Food Machine',
    subtitle: 'Industrial Automation',
    gradient: ['#7a3a0d', '#c0671a'],
    gradientBg: 'linear-gradient(135deg, #4a2008 0%, #7a3a0d 50%, #c0671a 100%)',
    overview: 'IoT-based automation system for an industrial food production facility — integrating sensors and hardware modules across Boondi, Frier, and Laddo machines.',
    bullets: [
      'IoT modules integrated across Boondi, Frier, and Laddo machines',
      'Hardware-software comms for real-time monitoring and control',
      'Sensor integration for automated process cycles and alerts',
      'Optimized for high-temperature industrial environments',
    ],
    techDetails: 'ESP32 microcontrollers with MQTT protocol. Temperature, pressure, and flow sensors feed real-time monitoring dashboards.',
    outcome: 'Automated cross-device industrial food production system',
    tags: ['IoT', 'ESP32', 'MQTT', 'Sensors', 'Electronics'],
  },
  {
  cat: 'web',
  image: '/images/proj-yt-bookmark.png',
  emoji: '🔖',
  type: 'Chrome Extension · Manifest V3',
  title: 'YouTube Timestamp Bookmarks',
  subtitle: 'Browser Extension',
  gradient: ['#8b0000', '#FF0000'],
  gradientBg: 'linear-gradient(135deg, #3a0000 0%, #8b0000 50%, #FF0000 100%)',
  overview: 'A Chrome extension that lets you bookmark exact timestamps inside any YouTube video and jump back to them instantly — with a custom in-player button and a full popup panel.',
  bullets: [
    'Red bookmark button injected directly into the YouTube player controls',
    'Popup panel shows video thumbnail, title, and live playback position',
    'One-click seek to any saved timestamp — sorted and persistent per video',
    'Per-video storage using chrome.storage.local — no server, 100% local',
    'Duplicate guard prevents saving two bookmarks within 2 seconds',
    'Handles YouTube SPA navigation — works across page changes without reload',
  ],
  techDetails: 'Built with Manifest V3 — the current Chrome extension standard. Uses chrome.scripting.executeScript to read and set video currentTime. MutationObserver handles YouTube\'s SPA routing to re-inject the button on navigation.',
  outcome: 'Native YouTube integration with zero dependencies — pure browser APIs',
  tags: ['Chrome Extension', 'Manifest V3', 'JavaScript', 'Chrome Storage API', 'Content Scripts'],
  github: 'https://github.com/Rudra-Gupta15/YouTube_Bookmark',
},
];

const TABS = ['all', 'aiml', 'web', 'hardware'];
const TABS_LABELS = { all: 'All', aiml: 'AI / ML', web: 'Web & Game', hardware: 'Hardware' };

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);
  if (!project) return null;
  const [g0, g1] = project.gradient;

  return (
    <div className="pmodal-overlay" onClick={onClose}>
      <div className="pmodal pmodal-v2" onClick={e => e.stopPropagation()}>

        {/* Gradient header */}
        <div className="pmodal-header" style={{ background: project.gradientBg }}>
          <button className="pmodal-close" onClick={onClose}>✕</button>
          <div className="pmodal-header-content">
            <span className="pmodal-emoji">{project.emoji}</span>
            <div>
              <div className="pmodal-type">{project.type}</div>
              <h2 className="pmodal-title">{project.title}</h2>
              <div className="pmodal-subtitle-txt">{project.subtitle}</div>
            </div>
          </div>
        </div>

        {/* Project image if available */}
        {project.image ? (
          <div className="pmodal-img-wrap">
            <img src={project.image} alt={project.title} className="pmodal-img"
              onError={e => { e.target.parentElement.classList.add('pmodal-img-missing'); e.target.style.display = 'none'; }} />
            <div className="pmodal-img-placeholder">{project.emoji}</div>
          </div>
        ) : (
          <div className="pmodal-emoji-banner" style={{ background: project.gradientBg + '88' }}>
            <span className="pmodal-banner-emoji">{project.emoji}</span>
          </div>
        )}

        <div className="pmodal-body">
          {/* Overview */}
          <div className="pmodal-section">
            <div className="pmodal-section-label">📋 Overview</div>
            <p className="pmodal-overview">{project.overview}</p>
          </div>

          {/* What it does */}
          <div className="pmodal-section">
            <div className="pmodal-section-label">🔧 What It Does</div>
            <ul className="pmodal-bullets">
              {project.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>

          {/* Tech details */}
          {project.techDetails && (
            <div className="pmodal-section">
              <div className="pmodal-section-label">⚙️ Technical Details</div>
              <p className="pmodal-tech-detail">{project.techDetails}</p>
            </div>
          )}

          {/* Outcome */}
          <div className="pmodal-outcome">
            <span className="pmodal-outcome-icon">🏆</span>
            {project.outcome}
          </div>

          {/* Footer: tags + buttons */}
          <div className="pmodal-footer">
            <div className="pmodal-tags">
              {project.tags.map(t => <span key={t} className="pmodal-tag">{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="pmodal-github" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  Live Demo ↗
                </a>
              )}
              <a href={project.github} target="_blank" rel="noreferrer"
                className="pmodal-github"
                style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}>
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [filter]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 440, behavior: 'smooth' });
  };

  const visible = PROJECTS.filter(p => filter === 'all' || p.cat.includes(filter));

  return (
    <section id="projects">
      <div className="sec-label">03 — Selected Work</div>
      <div className="proj-header-row">
        <h2 className="sec-h">🚀 <em>Projects</em></h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 340 }}>
          Production systems — real pipelines solving real problems.
        </p>
      </div>

      <div className="proj-tabs">
        {TABS.map(tab => (
          <button key={tab} className={`p-tab${filter === tab ? ' active' : ''}`} onClick={() => setFilter(tab)}>
            {TABS_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="pcard-nav">
        <div className="pscroll-hint">
          <span className="pscroll-arrow-anim">←</span>
          swipe to explore
          <span className="pscroll-arrow-anim" style={{ animationDelay: '0.5s' }}>→</span>
        </div>
        <div className="pnav-btns">
          <button className="pnav-btn" onClick={() => scroll(-1)} disabled={!canScrollLeft}>‹</button>
          <button className="pnav-btn" onClick={() => scroll(1)} disabled={!canScrollRight}>›</button>
        </div>
      </div>

      <div className="pcard-scroll" ref={scrollRef}>
        <div className="pcard-track">
          {visible.map((p, i) => (
            <div key={p.title} className="pcard" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => setSelected(p)}>
              <div className="pcard-bg" style={{ background: p.gradientBg }} />
              <div className="pcard-blob1" style={{ background: p.gradient[1] }} />
              <div className="pcard-blob2" style={{ background: p.gradient[0] }} />

              <div className="pcard-top">
                <div className="pcard-type">{p.type}</div>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-sub">{p.subtitle}</p>
              </div>

              {/* Image or emoji fallback */}
              <div className="pcard-img-stage">
                <div className="pcard-img-frame">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="pcard-img"
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.classList.add('pcard-img-miss'); }} />
                  ) : null}
                  <div className="pcard-img-placeholder" style={{ opacity: p.image ? 0.12 : 0.5, fontSize: p.image ? 72 : 56 }}>{p.emoji}</div>
                </div>
              </div>

              <div className="pcard-bottom">
                <p className="pcard-desc">{p.outcome}</p>
                <div className="pcard-tags">
                  {p.tags.slice(0, 3).map(t => <span key={t} className="pcard-tag">{t}</span>)}
                </div>
              </div>

              <div className="pcard-tap">tap to expand ↗</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pscroll-dots">
        {visible.map((_, i) => <div key={i} className="pscroll-dot" />)}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
