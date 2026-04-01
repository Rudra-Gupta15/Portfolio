import React, { memo, useMemo } from 'react';

// ============================================================================
// DATA & ICONS
// ============================================================================
const SOCIAL_LINKS = [
  { 
    label: 'Email', 
    href: 'mailto:rudrakumargupta@gmail.com', 
    icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' 
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/rudra-kumar-gupta/', 
    icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' 
  },
  { 
    label: 'GitHub', 
    href: 'https://github.com/Rudra-Gupta15', 
    icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' 
  },
  { 
    label: 'Kaggle', 
    href: 'https://www.kaggle.com/rudrakumargupta', 
    icon: 'M9 3v18h3v-6.5l5.5 6.5H21l-6.5-7.5L21 3h-3.5L12 9.5V3H9z' 
  },
];

const Asteroids = memo(() => {
  const streaks = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 40,
    delay: Math.random() * 12,
    dur: 2 + Math.random() * 4,
    width: 80 + Math.random() * 180,
    opacity: 0.3 + Math.random() * 0.5
  })), []);

  return (
    <div className="meteor-layer">
      {streaks.map(s => (
        <div 
          key={s.id} 
          className="meteor-streak" 
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.width}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            opacity: s.opacity
          }} 
        />
      ))}
    </div>
  );
});

// Car component - sedan style, inspired by reference images
const Car = ({ bodyColor, windowColor, direction = true }) => {
  if (direction) {
    // Left-facing car
    return (
      <svg width="160" height="65" viewBox="0 0 160 65">
        {/* Shadow */}
        <ellipse cx="80" cy="58" rx="60" ry="4" fill="rgba(0,0,0,0.15)" />
        
        {/* Bumper */}
        <rect x="12" y="40" width="6" height="8" fill="#333" rx="1" />
        
        {/* Main body - sedan shape */}
        <path d="M20 40 L25 28 L60 24 L120 26 L138 40 Z" fill={bodyColor} />
        
        {/* Roof */}
        <path d="M60 24 L70 12 L110 14 L120 26 Z" fill={bodyColor} />
        
        {/* Front windshield */}
        <path d="M70 12 L75 24 L85 24 L82 14 Z" fill={windowColor} opacity="0.6" />
        
        {/* Rear window */}
        <path d="M110 14 L115 24 L105 26 L108 16 Z" fill={windowColor} opacity="0.6" />
        
        {/* Headlights */}
        <circle cx="18" cy="36" r="2" fill="#fef08a" className="car-headlight" />
        <circle cx="25" cy="36" r="2" fill="#fef08a" className="car-headlight" />
        
        {/* Door lines */}
        <line x1="75" y1="24" x2="75" y2="42" stroke="#222" strokeWidth="1" opacity="0.4" />
        <line x1="100" y1="25" x2="100" y2="42" stroke="#222" strokeWidth="1" opacity="0.4" />
        
        {/* Front wheel */}
        <circle cx="35" cy="50" r="11" fill="#1a1a1a" />
        <circle cx="35" cy="50" r="7" fill="#2a2a2a" />
        <circle cx="35" cy="50" r="5" fill="none" stroke="#888" strokeWidth="1" />
        
        {/* Rear wheel */}
        <circle cx="125" cy="50" r="11" fill="#1a1a1a" />
        <circle cx="125" cy="50" r="7" fill="#2a2a2a" />
        <circle cx="125" cy="50" r="5" fill="none" stroke="#888" strokeWidth="1" />
      </svg>
    );
  } else {
    // Right-facing car
    return (
      <svg width="160" height="65" viewBox="0 0 160 65">
        {/* Shadow */}
        <ellipse cx="80" cy="58" rx="60" ry="4" fill="rgba(0,0,0,0.15)" />
        
        {/* Bumper */}
        <rect x="142" y="40" width="6" height="8" fill="#333" rx="1" />
        
        {/* Main body - sedan shape */}
        <path d="M140 40 L135 28 L100 24 L40 26 L22 40 Z" fill={bodyColor} />
        
        {/* Roof */}
        <path d="M100 24 L90 12 L50 14 L40 26 Z" fill={bodyColor} />
        
        {/* Front windshield */}
        <path d="M90 12 L85 24 L75 24 L78 14 Z" fill={windowColor} opacity="0.6" />
        
        {/* Rear window */}
        <path d="M50 14 L45 24 L55 26 L52 16 Z" fill={windowColor} opacity="0.6" />
        
        {/* Headlights */}
        <circle cx="142" cy="36" r="2" fill="#fef08a" className="car-headlight" />
        <circle cx="135" cy="36" r="2" fill="#fef08a" className="car-headlight" />
        
        {/* Door lines */}
        <line x1="85" y1="24" x2="85" y2="42" stroke="#222" strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="25" x2="60" y2="42" stroke="#222" strokeWidth="1" opacity="0.4" />
        
        {/* Front wheel */}
        <circle cx="125" cy="50" r="11" fill="#1a1a1a" />
        <circle cx="125" cy="50" r="7" fill="#2a2a2a" />
        <circle cx="125" cy="50" r="5" fill="none" stroke="#888" strokeWidth="1" />
        
        {/* Rear wheel */}
        <circle cx="35" cy="50" r="11" fill="#1a1a1a" />
        <circle cx="35" cy="50" r="7" fill="#2a2a2a" />
        <circle cx="35" cy="50" r="5" fill="none" stroke="#888" strokeWidth="1" />
      </svg>
    );
  }
};

export default function PortfolioFooter() {
  return (
    <footer className="footer-container">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .footer-container {
          position: relative;
          width: 100%;
          min-height: 580px;
          background: #0a0e27 url('images/background.png') no-repeat center bottom;
          background-size: cover;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .footer-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(2, 6, 23, 0.3) 0%,
            rgba(2, 6, 23, 0.5) 50%,
            rgba(2, 6, 23, 0.85) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .meteor-layer { 
          position: absolute; 
          inset: 0; 
          pointer-events: none; 
          z-index: 2; 
        }
        
        .meteor-streak {
          position: absolute; 
          height: 2px;
          background: linear-gradient(
            90deg, 
            rgba(34, 211, 238, 0) 0%,
            rgba(34, 211, 238, 0.8) 20%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.6) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          transform: rotate(-35deg); 
          opacity: 0;
          animation: falling-star linear infinite;
          filter: blur(0.5px);
        }
        
        @keyframes falling-star {
          0% { 
            transform: translate(200px, -200px) rotate(-35deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 0.4; }
          100% { 
            transform: translate(-1000px, 1000px) rotate(-35deg); 
            opacity: 0; 
          }
        }

        .moon {
          position: absolute;
          top: 60px;
          right: 80px;
          width: 120px;
          height: 120px;
          background: #fef3c7;
          border-radius: 50%;
          box-shadow: 0 0 40px rgba(254, 243, 199, 0.4), inset -20px -20px 40px rgba(0, 0, 0, 0.2);
          z-index: 3;
        }

        .moon::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
          border-radius: 50%;
        }

        .top-content {
          position: relative; 
          z-index: 20;
          display: flex; 
          flex-direction: column; 
          align-items: center;
          padding-top: 80px;
          padding-bottom: 40px;
        }

        .status-pill {
          background: linear-gradient(
            135deg,
            rgba(6, 182, 212, 0.15) 0%,
            rgba(14, 165, 233, 0.1) 100%
          );
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(34, 211, 238, 0.4);
          padding: 12px 28px; 
          border-radius: 50px;
          font-size: 0.75rem; 
          letter-spacing: 2.5px; 
          color: #22d3ee;
          margin-bottom: 32px; 
          box-shadow: 
            0 0 20px rgba(34, 211, 238, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          text-transform: uppercase; 
          font-weight: 600;
          position: relative;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .status-pill::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #22d3ee;
          border-radius: 50%;
          box-shadow: 0 0 10px #22d3ee;
          animation: pulse-dot 2s ease-in-out infinite;
        }
          

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateY(-50%) scale(1.2); }
        }

        .social-row { 
          display: flex; 
          gap: 18px; 
        }
        
        .social-btn {
          width: 56px; 
          height: 56px; 
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 100%
          );
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          color: #e0f2fe; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .social-btn svg {
          position: relative;
          z-index: 1;
          transition: all 0.4s ease;
        }
        
        .social-btn:hover {
          border-color: #22d3ee;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 
            0 12px 28px rgba(34, 211, 238, 0.4),
            0 0 40px rgba(34, 211, 238, 0.2);
        }

        .social-btn:hover::before {
          opacity: 1;
        }

        .social-btn:hover svg {
          color: #ffffff;
          transform: scale(1.1);
        }

        .social-btn:active {
          transform: translateY(-6px) scale(1.02);
        }

        .vehicle-stage {
          position: absolute; 
          bottom: 82px;
          width: 100%; 
          height: 100px;
          pointer-events: none; 
          z-index: 15;
          overflow: hidden;
        }
        
        .car { 
          position: absolute; 
          animation: car-drive linear infinite;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
          will-change: transform;
        }

        .car-1 {
          left: -180px;
          bottom: 22px;
          animation-name: car-drive-left;
          animation-duration: 18s;
        }

        .car-2 {
          right: -180px;
          bottom: 14px;
          animation-name: car-drive-right;
          animation-duration: 22s;
          animation-delay: 3s;
        }

        .car-3 {
          left: -180px;
          bottom: 8px;
          animation-name: car-drive-left;
          animation-duration: 20s;
          animation-delay: 7s;
        }

        .car-4 {
          right: -180px;
          bottom: 18px;
          animation-name: car-drive-right;
          animation-duration: 24s;
          animation-delay: 11s;
        }
        
        @keyframes car-drive-left { 
          from { left: -180px; } 
          to { left: calc(100% + 180px); } 
        }

        @keyframes car-drive-right { 
          from { right: -180px; } 
          to { right: calc(100% + 180px); } 
        }

        .car-headlight {
          animation: headlight-pulse 1.5s ease-in-out infinite;
        }

        @keyframes headlight-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        .bottom-bar {
          position: relative; 
          z-index: 25;
          background: linear-gradient(
            to top,
            rgba(2, 6, 23, 0.98) 0%,
            rgba(2, 6, 23, 0.92) 100%
          );
          backdrop-filter: blur(8px);
          color: #64748b; 
          text-align: center;
          padding: 24px 20px; 
          font-size: 0.85rem;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .bottom-bar span {
          color: #94a3b8;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .footer-container {
            min-height: 500px;
          }

          .top-content {
            padding-top: 60px;
          }

          .status-pill {
            font-size: 0.65rem;
            padding: 10px 24px;
          }

          .social-btn {
            width: 50px;
            height: 50px;
          }

          .social-row {
            gap: 14px;
          }

          .vehicle-stage {
            bottom: 72px;
          }

          .moon {
            width: 80px;
            height: 80px;
            top: 40px;
            right: 40px;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            min-height: 450px;
          }

          .status-pill {
            font-size: 0.6rem;
            padding: 8px 20px;
            letter-spacing: 2px;
          }

          .social-btn {
            width: 46px;
            height: 46px;
          }

          .bottom-bar {
            font-size: 0.75rem;
            padding: 20px 16px;
          }

          .moon {
            width: 60px;
            height: 60px;
            top: 30px;
            right: 20px;
          }
        }
      `}</style>

      <Asteroids />

      {/* Moon */}
      <div className="moon" />

      <div className="top-content">
        <div className="status-pill">Available for New Projects</div>
        <div className="social-row">
          {SOCIAL_LINKS.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              target="_blank" 
              rel="noreferrer" 
              className="social-btn"
              aria-label={link.label}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d={link.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="vehicle-stage">
        {/* Red Car - Left side */}
        <div className="car car-1">
          <Car 
            bodyColor="#991b1b"
            windowColor="#38bdf8"
            direction={false}
          />
        </div>

        {/* Blue Car - Right side */}
        <div className="car car-2">
          <Car 
            bodyColor="#1e40af"
            windowColor="#0284c7"
            direction={true}
          />
        </div>

        {/* Yellow Car - Left side */}
        <div className="car car-3">
          <Car 
            bodyColor="#a16207"
            windowColor="#fbbf24"
            direction={false}
          />
        </div>

        {/* Green Car - Right side */}
        <div className="car car-4">
          <Car 
            bodyColor="#15803d"
            windowColor="#4ade80"
            direction={true}
          />
        </div>
      </div>

      <div className="bottom-bar">
        © {new Date().getFullYear()} <span>Rudra Kumar Gupta</span> · Portfolio
      </div>
    </footer>
  );
}