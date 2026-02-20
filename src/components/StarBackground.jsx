import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 130;
const MOUSE_REPEL_DIST = 100;
const ACCENT = { r: 212, g: 168, b: 67 }; // gold

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function StarBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles, animId;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.5, 2.5),
        vx: rand(-0.35, 0.35),
        vy: rand(-0.35, 0.35),
        opacity: rand(0.25, 0.85),
        pulse: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.005, 0.02),
        // extra twinkle
        twinkleDir: 1,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
    }

    function draw() {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Pulse opacity
        p.pulse += p.pulseSpeed;
        const pulsed = p.opacity + Math.sin(p.pulse) * 0.2;
        const finalOpacity = Math.max(0.05, Math.min(1, pulsed));

        // Draw star (glow + core)
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${finalOpacity * 0.5})`);
        grd.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${finalOpacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = 0.12 * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse-to-particle connections (within 180px)
        const pdx = particles[i].x - mx;
        const pdy = particles[i].y - my;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 180) {
          const alpha = 0.25 * (1 - pdist / 180);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse glow orb
      if (mx > 0 && mx < W) {
        const mgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        mgrd.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.08)`);
        mgrd.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fillStyle = mgrd;
        ctx.fill();
      }
    }

    const onMouseMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onResize = () => { resize(); };

    init();
    draw();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
