import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#work' },
  { label: 'Contact',    href: '#contact' },
  { label: 'Resume',     href: '/resume.pdf' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [progress, setProgress]   = useState(0);
  const [active,   setActive]     = useState('home');
  const [toggled,  setToggled]    = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const total   = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrollY / total) * 100 : 0);
      setScrolled(scrollY > 60);

      const sections = ['home','about','skills','projects','work','certs','achievements','contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

        {/* ── LOGO IMAGE IN CIRCLE ── */}
        <a href="#home" className="nav-logo-circle" onClick={e => handleNav(e, '#home')}>
          <img src="/images/logo.jpg" alt="MR Logo" />
        </a>

        {/* Nav Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            return (
              <li key={label}>
                <a
                   href={href}
                   className={active === id ? 'active' : ''}
                   onClick={e => href.startsWith('#') ? handleNav(e, href) : undefined}
                   target={href.endsWith('.pdf') ? '_blank' : undefined}
                   rel={href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                  >
                   {label}
                 </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="nav-right">
          <a href="#contact" className="btn-lets-talk" onClick={e => handleNav(e, '#contact')}>
            Let's Talk
          </a>
          <div
            className={`theme-toggle${toggled ? ' on' : ''}`}
            onClick={() => setToggled(t => !t)}
            title="Toggle theme"
          />
        </div>

      </nav>
    </>
  );
}
