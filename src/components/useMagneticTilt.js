import { useEffect } from 'react';

/**
 * Adds a subtle 3D tilt + glow effect to all elements matching the selector.
 * Call once in App or a top-level component.
 */
export default function useMagneticTilt(selector = '.proj-card, .cert-card, .ach-card') {
  useEffect(() => {
    const TILT = 8; // max degrees
    let cards = [];

    function applyListeners() {
      cards = Array.from(document.querySelectorAll(selector));
      cards.forEach(card => {
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('mouseenter', onEnter);
      });
    }

    function onEnter(e) {
      e.currentTarget.style.transition = 'box-shadow 0.2s ease';
    }

    function onMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * TILT;
      const rotY = dx * TILT;

      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;

      // Dynamic highlight based on mouse pos
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `
        radial-gradient(circle at ${px}% ${py}%, rgba(212,168,67,0.08) 0%, transparent 60%),
        rgba(13,31,60,0.5)
      `;
    }

    function onLeave(e) {
      const card = e.currentTarget;
      card.style.transition = 'transform 0.5s ease, background 0.5s ease, box-shadow 0.5s ease';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.background = '';
    }

    // Initial apply + re-apply when DOM might change (e.g. project filter)
    applyListeners();
    const observer = new MutationObserver(() => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.removeEventListener('mouseenter', onEnter);
      });
      applyListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.removeEventListener('mouseenter', onEnter);
      });
      observer.disconnect();
    };
  }, [selector]);
}
