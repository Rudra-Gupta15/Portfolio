import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* ─── Scroll-reveal hook ─── */
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

/* ─── TECHNICAL STEP 1: Define the Icon component ─── */
const ChromeIcon = ({ size = 15, margin = 6 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ marginRight: margin }}>
    <circle cx="24" cy="24" r="24" fill="#DB4437"/>
    <path d="M24 24 L44 24 A20 20 0 0 1 12 42 Z" fill="#0F9D58"/>
    <path d="M24 24 L12 42 A20 20 0 0 1 4 16 Z" fill="#F4B400"/>
    <circle cx="24" cy="24" r="10" fill="#4285F4" stroke="#fff" strokeWidth="2"/>
  </svg>
);

const REVEAL_CSS = `
  .proj-sr {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
    transition:
      opacity  0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .proj-sr.sr--vis {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .proj-sr-d0 { transition-delay: 0ms;   }
  .proj-sr-d1 { transition-delay: 100ms; }
  .proj-sr-d2 { transition-delay: 200ms; }
  .proj-sr-d3 { transition-delay: 300ms; }
`;

const PROJECTS = [
  {
    cat: 'aiml',
    image: '/images/proj-heart-disease.png',
    emoji: '❤️',
    type: 'Healthcare AI',
    title: 'Heart Disease Prediction',
    subtitle: 'ML-Powered Early Detection',
    gradient: ['#3e0a15', '#5a0f1f'],
    gradientBg: 'linear-gradient(135deg, #2a050c 0%, #3e0a15 50%, #5a0f1f 100%)',
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
    cat: 'aiml',
    image: '/images/proj-ml-comparison.png',
    emoji: '📊',
    type: 'Research AI',
    title: 'ML Algorithm Comparison',
    subtitle: 'Benchmarking Framework',
    gradient: ['#006666', '#00cccc'],
    gradientBg: 'linear-gradient(135deg, #001f1f 0%, #006666 50%, #00cccc 100%)',
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
    github: 'https://github.com/Rudra-Gupta15/Algorithm_Comparison'
  },
  {
    cat: 'web',
    image: '/images/proj-weather.png',
    emoji: '🌦️',
    type: 'ML Dashboard',
    title: 'Hyperlocal Weather Impact',
    subtitle: 'Forecasting & Analytics',
    gradient: ['#1a3a6b', '#f0a500'],
    gradientBg: 'linear-gradient(135deg, #0a1428 0%, #1a3a6b 45%, #c47f00 100%)',
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
    live: 'https://weather-app-15-henna.vercel.app/',
  },
  {
    cat: 'web aiml',
    image: '/images/proj-versustech.png',
    emoji: '📱',
    type: 'Full-Stack Data Science',
    title: 'VersusTech',
    subtitle: 'Device Recommendation Engine',
    gradient: ['#4b3621', '#d2b48c'],
    gradientBg: 'linear-gradient(135deg, #2c1e12 0%, #4b3621 50%, #d2b48c 100%)',
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
    cat: 'aiml web',
    image: '/images/proj-movie-recommender.png',
    emoji: '🎬',
    type: 'ML + Streamlit',
    title: 'Movie Recommender System',
    subtitle: 'Content-Based Filtering',
    gradient: ['#1a1a1a', '#d1d1d1'],
    gradientBg: 'linear-gradient(135deg, #121212 0%, #2e2e2e 40%, #d1d1d1 100%)',
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
    gradient: ['#006994', '#a8e6f0'],
    gradientBg: 'linear-gradient(135deg, #001f2e 0%, #006994 45%, #a8e6f0 100%)',
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
    cat: 'aiml dataset',
    image: '/images/proj-asl.png',
    emoji: '🤟',
    type: 'College Major · AI/ML/IoT',
    title: 'ASL Recognition',
    subtitle: 'Multi-Scale Machine Learning',
    gradient: ['#321f0f', '#f5e6d3'],
    gradientBg: 'linear-gradient(135deg, #321f0f 0%, #5c3b1e 40%, #f5e6d3 100%)',
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
    kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/asl-sign-language-dataset-rgb-hsv-and-grayscale',
  },
  {
    cat: 'hardware',
    image: '/images/proj-food-machine.png',
    emoji: '⚙️',
    type: 'Electronics & IoT',
    title: 'Raj Food Machine',
    subtitle: 'Industrial Automation',
    gradient: ['#6a1a4a', '#e05b9a'],
    gradientBg: 'linear-gradient(135deg, #3a0d2a 0%, #6a1a4a 50%, #c0398a 100%)',
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
  cat: 'chrome',
  image: '/images/proj-yt-bookmark.png',
  emoji: '🔖',
  type: 'Chrome Extension · Manifest V3',
  title: 'TimeMark — Video Timestamp Bookmarks',
  subtitle: 'Browser Extension',
  gradient: ['#8b0000', '#FF0000'],
  gradientBg: 'linear-gradient(135deg, #3a0000 0%, #8b0000 50%, #FF0000 100%)',
  overview:
    'A Chrome extension named TimeMark that lets you bookmark exact timestamps in any YouTube video and jump back to them instantly — with a pink in-player button, toast confirmations, and a full popup panel.',
  bullets: [
    'Pink bookmark button (#e91e63) injected directly into YouTube player controls with green flash feedback on save',
    'Toast notification confirms each save with timestamp — warns on duplicates or missing video',
    'Popup panel shows video thumbnail, title, and live playback position updated in real time',
    'One-click seek to any saved bookmark — sorted by time, with delete-one and clear-all options',
    'Flat chrome.storage.local structure (ytbm_all array) with per-video filtering — no server, 100% local',
    'Duplicate guard blocks saves within 2 seconds of an existing bookmark for the same video',
    'Handles YouTube SPA navigation — MutationObserver re-injects the button across page changes without reload',
  ],
  techDetails:
    'Built with Manifest V3. content.js reads video.currentTime directly from the DOM and injects the bookmark button into .ytp-right-controls. chrome.scripting.executeScript is used by popup.js to seek the video by setting currentTime on the active tab. MutationObserver tracks URL changes for SPA re-injection. Bookmarks stored as a flat array keyed by ytbm_all, filtered client-side by videoId.',
  outcome: 'Native YouTube integration at v1.4 — zero dependencies, pure browser APIs',
  tags: ['Chrome Extension', 'Manifest V3', 'JavaScript', 'Chrome Storage API', 'Content Scripts', 'MutationObserver'],
  webstore: 'https://chromewebstore.google.com/detail/timemark-%E2%80%94-video-timestam/kdpmjbeocligojphcnadcjobbpbkkbea',
},
  {
    cat: 'aiml web dataset',
    image: '/images/proj-banking-chatbot.png',
    emoji: '🏦',
    type: 'Machine Learning · Flask',
    title: 'Banking ChatBot',
    subtitle: 'TF-IDF + Cosine Similarity',
    gradient: ['#0a3d2e', '#808000'],
    gradientBg: 'linear-gradient(135deg, #0a3d2e 0%, #414f2e 50%, #808000 100%)',
    overview: 'A banking FAQ chatbot built with Python, Flask, and ML — no LLM, no API key, runs entirely offline. Uses TF-IDF vectorization and Cosine Similarity to match user questions against 100+ banking Q&A pairs with confidence scoring.',
    bullets: [
      '🤖 ML-powered matching — TF-IDF vectorization + Cosine Similarity for best answer retrieval',
      '🏦 100+ Banking Q&A pairs — accounts, loans, UPI, fraud, and general finance',
      '📂 5 categories — Basic Accounts, Digital Banking, Loans & Interest, Operations & Security, General Finance',
      '💬 Rule-based fallback — handles greetings, personal queries, and small talk',
      '📊 Confidence scoring — returns match confidence % with every response',
      '⚡ Evolved into RUD AI — the foundation for a full multi-mode Ollama-powered assistant',
    ],
    techDetails: 'Flask backend loads a pre-trained TF-IDF vectorizer and question vectors from Pickle files. On each query, Cosine Similarity is computed against all stored vectors — best match above 0.15 threshold is returned. Rule-based layer intercepts greetings and personal queries before ML inference. Frontend uses vanilla JS with a clean chat UI.',
    outcome: 'Offline ML chatbot — 100+ Q&A pairs, zero API cost, confidence-scored responses',
    tags: ['Python', 'Flask', 'Scikit-learn', 'TF-IDF', 'NLP', 'JavaScript'],
    github: 'https://github.com/Rudra-Gupta15/Banking-ChatBot',
    kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/banking-faq-dataset-for-chatbot-training',
  },
  {
    cat: 'aiml web dataset',
    image: '/images/proj-rud-ai.png',
    emoji: '🤖',
    type: 'Conversational AI · Flask',
    title: 'RUD AI',
    subtitle: 'Multi-Mode AI Assistant',
    gradient: ['#1a1f00', '#4a5a00'],
    gradientBg: 'linear-gradient(135deg, #0d1000 0%, #1a1f00 50%, #4a5a00 100%)',
    overview: 'A fully offline conversational AI assistant with 6 specialized modes — powered by Ollama (llama3.1) and a custom Flask backend. No API key, no cost, runs entirely on local hardware.',
    bullets: [
      '6 intelligent modes: Normal, Banking, Cooking, Study, Entertainment, Fun',
      'Full conversation memory — context-aware responses across the session',
      'Banking mode powered by a custom 100+ Q&A knowledge base (CSV)',
      'Cooking mode with auto step-by-step recipe formatting',
      'Responsive UI — works seamlessly on mobile and desktop',
      '100% free — zero cloud dependency, runs on local Ollama runtime',
    ],
    techDetails: 'Flask backend routes requests to Ollama (llama3.1) with mode-specific system prompts. Banking knowledge base loaded from CSV into the prompt context. Frontend uses vanilla JS with auto-resizing textarea and animated typing indicator.',
    outcome: 'Production-grade local AI assistant — 6 modes, zero API cost',
    tags: ['Python', 'Flask', 'Ollama', 'JavaScript', 'NLP'],
    github: 'https://github.com/Rudra-Gupta15/Conversational_AI',
    kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/rud-ai-multi-mode-conversational-q-and-a-dataset',
  },
  {
    cat: 'web education dataset',
    image: '/images/proj-prepmaster.png',
    emoji: '⚡',
    type: 'Quiz Platform · React · Vite',
    title: 'PrepMaster',
    subtitle: 'Complete Placement & Interview Prep',
    gradient: ['#2d1b69', '#7c3aed'],
    gradientBg: 'linear-gradient(135deg, #1f0a45 0%, #2d1b69 50%, #7c3aed 100%)',
    overview: 'A premium, high-performance quiz platform built to help students and professionals crack placements and technical interviews — featuring 4000+ curated questions, 5 career tracks, a smart quiz engine, and a dedicated topic notebook.',
    bullets: [
      '4000+ verified questions across TCS NQT, AI & ML, React, SAP, and DevOps tracks',
      'Smart Quiz Engine with per-question timer, progress tracking, and score breakdown',
      'Topic Notebook — detailed library explanations and point-wise notes for major tech stacks',
      'Custom Practice mode — filter by topic and difficulty to build personalized sessions',
      'Mobile-first design with animated hamburger drawer, viewport-locking, and Glassmorphism UI',
      '100% frontend — zero backend dependency, instant load with Vite build system',
    ],
    techDetails: 'Built with React.js and Vite for blazing-fast performance. Routing handled via React Router v6. Custom useQuiz hook manages quiz state, timer logic, and score tracking. 4000+ questions split across modular JS data files with a central index and EXAM_CONFIGS. Styled with vanilla CSS using a custom Glassmorphism design system.',
    outcome: 'Production-grade placement prep platform — 4000+ questions, 5 tracks, zero backend cost',
    tags: ['React', 'Vite', 'JavaScript', 'CSS', 'React Router'],
    github: 'https://github.com/Rudra-Gupta15/Prepmaster',
    live: 'https://prepmaster-gold.vercel.app',
    kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/prepmaster-placement-and-interview-quiz-questions',
  },
  {
    cat: 'aiml',
    image: '/images/proj-aimailassistant.png',
    emoji: '🤖',
    type: 'AI Assistant · Python · FastAPI',
    title: 'AI Mail Assistant',
    subtitle: 'Local LLM-Powered Email & Messaging Automation',
    gradient: ['#4a3d31', '#d1d1d1'],
gradientBg: 'linear-gradient(135deg, #4a3d31 0%, #6f5e4d 40%, #d1d1d1 100%)',
    overview: 'A powerful, privacy-first email and messaging assistant powered by Llama 3.1 via Ollama. Automatically classifies incoming messages and generates professional AI replies — fully local, zero cloud cost, with Gmail and WhatsApp integrations.',
    bullets: [
      'Smart Auto-Reply engine classifies messages as AUTO or HUMAN (needs attention)',
      'Approval Center — review and whitelist senders, with a manual "Process" button for complex messages',
      'AI Agent Signature — every AI-generated reply includes a transparency disclaimer footer',
      'Smart Timestamps — displays exact arrival date and time of pending emails on the dashboard',
      'Gmail Integration via Google Cloud Console; WhatsApp Integration via Twilio API',
      'Privacy-First: all AI processing runs locally via Ollama — no data leaves your machine',
      'Dynamic sidebar navigation: Overview, Connection, API Docs, Helper, and Automation Stats',
      'Built-in one-click "How to use" guide accessible from the sidebar',
    ],
    techDetails: 'Backend built with FastAPI and Python. AI processing handled entirely locally via Ollama running Llama 3.1. Gmail sync via Google Cloud Console OAuth2. WhatsApp integration via Twilio API. Pydantic models for data validation. Structured into api, services, models, and utils layers. Frontend served as static HTML/CSS/JS assets.',
    outcome: 'Production-ready local AI assistant — zero cloud AI cost, full privacy, Gmail + WhatsApp automation in one dashboard',
    tags: ['Python', 'FastAPI', 'Ollama', 'Llama 3.1', 'Gmail API', 'Twilio', 'Pydantic'],
    github: 'https://github.com/Rudra-Gupta15/ai-mail-assistant',
  },
  {
    cat: 'aiml',
    image: '/images/proj-resumeai.png',
    emoji: '🚀',
    type: 'AI Tool · React · Groq · Ollama',
    title: 'ResumeAI',
    subtitle: 'Premium ATS Resume Analyzer',
    gradient: ['#0f2027', '#1a6b4a'],
    gradientBg: 'linear-gradient(135deg, #0f2027 0%, #1a6b4a 50%, #2ecc71 100%)',
    overview: 'An AI-powered ATS resume analyzer delivering instant scoring, domain-specific feedback, cross-functional career insights, and tailored project suggestions. Supports both cloud (Groq) and fully offline (Ollama) modes.',
    bullets: [
      '5-tab split-screen dashboard — ATS Scoring, Domain Review, Improvements, Project Ideas, and Abilities',
      'Dual processing engine: Online via Groq (Llama 3.3 70B) or fully Offline via Ollama — 100% private',
      'Smart Domain Detection — auto-identifies specific roles like "AIML Engineer" or "Full Stack Developer"',
      'Realistic ATS scoring — honest, unbiased section scores across 7 resume dimensions',
      'Cross-Functional Abilities — AI identifies 3–5 alternative roles based on transferable skills',
      'Multi-format support — PDF, DOCX, TXT, MD, and images (JPG, PNG, WebP via OCR)',
      'Real-time streaming feedback with smart rate-limit countdown timer for shared API key',
      'No build step — pure static HTML/CSS/JS with CDN dependencies, Vercel-ready',
    ],
    techDetails: 'Frontend built with React 18 via Babel standalone and Vanilla CSS — no bundler required. Cloud AI via Groq API (Llama 3.3 70B); local AI via Ollama. PDF parsing with pdf.js, OCR via Tesseract.js, DOCX parsing via Mammoth.js.',
    outcome: 'Zero-cost, privacy-first ATS analyzer — dual AI engine, 5-tab insights, runs in any browser with no setup',
    tags: ['React', 'JavaScript', 'Groq API', 'Ollama', 'Llama 3.3', 'pdf.js', 'Tesseract.js'],
    github: 'https://github.com/Rudra-Gupta15/ResumeAI-Premium-ATS-Analyzer',
    live: 'https://resume-ai-analyzer-coral.vercel.app/',
  },
  {
  cat: 'dataset',
  image: '/images/proj-comics.png',
  emoji: '📚',
  type: 'Data Science · Dataset Creation',
  title: 'Comic Books Dataset',
  subtitle: 'Global Comics 2000–2026',
  gradient: ['#1a1a2e', '#e94560'],
  gradientBg: 'linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 50%, #e94560 50%, #e94560 100%)',
  overview: 'The most comprehensive comic book dataset on Kaggle — 10,000 entries spanning Manga, Manhwa, Manhua, Marvel, DC, and European comics with 17 structured columns for analysis and ML.',
  bullets: [
    '10,000 comics across 26 years (2000–2026) with 17 analysis-ready columns',
    'Global coverage: Japan, USA, South Korea, China, Europe — 6 major regions',
    'Unique "Theme" column tracking visual art styles (B&W, Full Color, Webtoon)',
    'Perfect for EDA, rating prediction, genre classification, and NLP clustering',
  ],
  techDetails: 'Combines 40+ verified real entries with synthetically generated data following realistic distributions. Includes rare metadata like color style, awards, and format types across cultures.',
  outcome: 'Filled a massive gap on Kaggle — first structured dataset covering global comic traditions',
  tags: ['Pandas', 'Data Analysis', 'EDA', 'ML', 'NLP'],
  kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/comic-books-dataset-10000-entries',
},
{
  cat: 'dataset',
  image: '/images/proj-animation.png',
  emoji: '🎬',
  type: 'Data Science · Dataset Creation',
  title: 'Animation Movies Dataset',
  subtitle: '147 Years of Cinema (1878–2029)',
  gradient: ['#0d1b2a', '#ffd700'],
gradientBg: 'linear-gradient(135deg, #0d1b2a 0%, #0d1b2a 50%, #ffd700 50%, #ffd700 100%)',
  overview: '25,390 animated films spanning 147 years of cinema history, enriched with 44 features via TMDB API — including Director, Voice Cast, Animation Style, MPAA Rating, and a custom Data Quality Score system.',
  bullets: [
    '25,390 films across 147 years (1878–2029) with 44 analysis-ready columns',
    'Enriched via TMDB API: Director, Voice Cast, Budget, Box Office, MPAA Rating',
    'Custom Data Quality Score (0–5) for instant filtering — 80.9% at score 4–5',
    'Ready for rating prediction, hidden gem detection, and era classification',
  ],
  techDetails: 'Built using TMDB public API with additional enrichment calls for missing metadata. Includes Era classification, Popularity Tiers, ROI calculations, and Hidden Gem flags for ML-ready analysis.',
  outcome: '84.6% overall fill rate with quality scoring — cleanest animation dataset available',
  tags: ['TMDB API', 'Pandas', 'Data Enrichment', 'EDA', 'ML'],
  kaggle: 'https://www.kaggle.com/datasets/rudrakumargupta/animation-movies-complete-dataset-18782029',
},
  {
    cat: 'chrome',
    image: '/images/proj-balancetab.png',
    emoji: '⚖️',
    type: 'Chrome Extension · Manifest V3',
    title: 'BalanceTab',
    subtitle: 'Gamer + Office New Tab Dashboard',
    gradient: ['#1a1a1a', '#555555'],
    gradientBg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 45%, #444444 100%)',
    overview: 'A fully custom Chrome new tab replacement that fuses a gamer aesthetic with a productivity dashboard — live clock, real-time weather, smart multi-engine search, 7 built-in mini-games, AI quick links, recent tabs, and a local notebook.',
    bullets: [
      'Replaces new tab with a sleek Orbitron-font dashboard with animated Yin-Yang background',
      'Live clock with real-time weather via Open-Meteo API + browser geolocation',
      'Smart search bar supporting Google, DuckDuckGo, Bing, YouTube, and GitHub engines',
      'AI Quick Links panel — one-click access to Claude, ChatGPT, Gemini, Perplexity, Copilot & Mistral',
      '7 built-in mini-games: Snake, Breakout, Flappy Bird, Cyber Pong, Super Mario, Dash Racer, Space Shooter',
      'Recent Tabs panel via chrome.sessions API — reopen closed tabs instantly',
      'Auto-saving Notebook — local notes via chrome.storage.local, never uploaded',
      'Productivity & Gaming quick-launch dock — Gmail, Slack, Notion, Steam, Discord & more',
    ],
    techDetails: 'Built with Manifest V3. Weather from Open-Meteo API via browser geolocation. Recent tabs via chrome.sessions + chrome.tabs APIs. All 7 games on HTML5 Canvas with pure JS game loops. Settings and notebook persisted in chrome.storage.local. Zero dependencies — no npm, no bundler, single HTML + JS file.',
    outcome: 'Every new tab becomes a gamer dashboard — 7 games, live weather, AI links, zero cloud storage',
    tags: ['Chrome Extension', 'Manifest V3', 'JavaScript', 'Canvas API', 'Open-Meteo API'],
    webstore: 'https://chromewebstore.google.com/detail/balancetab-%E2%80%94-gamer-+-offi/nglnanlbnedkffjgncmokibcliabkpki',
  },
];

const TABS = ['all', 'aiml', 'web', 'hardware', 'dataset', 'chrome'];
const TABS_LABELS = {
  all: 'All',
  aiml: 'AI / ML',
  web: 'Web & Game',
  hardware: 'Hardware',
  dataset: 'Datasets',
  chrome: 'Chrome Ext',
};

function ProjectModal({ project, onClose }) {
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
  if (!project) return null;

  return createPortal(
    <div className="pmodal-overlay" onClick={onClose}>
      <div className="pmodal pmodal-v2" onClick={e => e.stopPropagation()}>
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
          <div className="pmodal-section">
            <div className="pmodal-section-label">📋 Overview</div>
            <p className="pmodal-overview">{project.overview}</p>
          </div>
          <div className="pmodal-section">
            <div className="pmodal-section-label">🔧 What It Does</div>
            <ul className="pmodal-bullets">
              {project.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
          {project.techDetails && (
            <div className="pmodal-section">
              <div className="pmodal-section-label">⚙️ Technical Details</div>
              <p className="pmodal-tech-detail">{project.techDetails}</p>
            </div>
          )}
          <div className="pmodal-outcome">
            <span className="pmodal-outcome-icon">🏆</span>
            {project.outcome}
          </div>
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
              {project.webstore && (
                <a href={project.webstore} target="_blank" rel="noreferrer"
                  className="pmodal-github" style={{background: '#ffffff', color: '#000000'}}>
                  Web-Store ↗
                </a>
              )}              
              {project.kaggle && (
                <a href={project.kaggle} target="_blank" rel="noreferrer"
                  className="pmodal-github" style={{ background: '#3b82f6', color: '#fff' }}>
                  Kaggle ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="pmodal-github"
                  style={{background: `linear-gradient(135deg, #000000, #fff)`}}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const scrollRef   = useRef(null);
  const progressRef = useRef(null);
  const sectionRef  = useScrollReveal('.proj-sr');
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
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
    <section id="projects" ref={sectionRef}>
      <style>{REVEAL_CSS}</style>

      <div className="sec-label proj-sr proj-sr-d0">03 — Selected Work</div>

      <div className="proj-header-row proj-sr proj-sr-d1">
        <h2 className="sec-h">🚀 <em>Projects</em></h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 340 }}>
          Production systems — real pipelines solving real problems.
        </p>
      </div>

      <div className="proj-tabs proj-sr proj-sr-d2">
        {TABS.map(tab => (
          <button key={tab} className={`p-tab${filter === tab ? ' active' : ''}`} onClick={() => setFilter(tab)}>
            {TABS_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="pcard-nav proj-sr proj-sr-d3">
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

      <div className="pcard-scroll" ref={scrollRef} onScroll={(e) => {
        const t = e.currentTarget;
        const max = t.scrollWidth - t.clientWidth;
        if (max <= 0) return;
        if (progressRef.current) progressRef.current.style.width = (t.scrollLeft / max * 100) + '%';
        checkScroll();
      }}>
        <div className="pcard-track">
          {visible.map((p, i) => (
            <div key={p.title} className="pcard" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => setSelected(p)}>
              <div className="pcard-bg" style={{ background: p.gradientBg }} />
              <div className="pcard-blob1" style={{ background: p.gradient[1] }} />
              <div className="pcard-blob2" style={{ background: p.gradient[0] }} />
              <div className="pcard-top">
                <div className="pcard-type" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {p.cat.includes('chrome') && <ChromeIcon size={20} margin={0} />}
                  {p.type}
                </div>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-sub">{p.subtitle}</p>
              </div>
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

      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, padding: '0 24px' }}>
        <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, #d4a843, #a855f7)', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }} />
        </div>
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          drag or use arrows to explore
        </span>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}