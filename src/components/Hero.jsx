import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => initGlobe(canvas);
    document.head.appendChild(script);

    return () => { document.head.removeChild(script); };
  }, []);

  function initGlobe(canvas) {
    const THREE = window.THREE;
    const W = Math.max(canvas.parentElement.offsetWidth || 400, 300);
    const H = Math.max(canvas.parentElement.offsetHeight || 500, 400);
    canvas.width = W; canvas.height = H;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    // Wireframe sphere
    scene.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.SphereGeometry(1, 52, 52)),
      new THREE.LineBasicMaterial({ color: 0x1e4d8c, transparent: true, opacity: 0.5 })
    ));

    // Dots
    const dN = 2400, dP = new Float32Array(dN * 3);
    for (let i = 0; i < dN; i++) {
      const p = Math.acos(-1 + 2 * Math.random()), t = Math.random() * Math.PI * 2;
      dP[i*3] = Math.sin(p)*Math.cos(t); dP[i*3+1] = Math.cos(p); dP[i*3+2] = Math.sin(p)*Math.sin(t);
    }
    const dG = new THREE.BufferGeometry();
    dG.setAttribute('position', new THREE.BufferAttribute(dP, 3));
    scene.add(new THREE.Points(dG, new THREE.PointsMaterial({ color: 0xd4a843, size: 0.013, transparent: true, opacity: 0.7 })));

    // Arcs
    const aN = 200, aP = new Float32Array(aN * 3);
    const arcs = [];
    for (let i = 0; i < aN; i++) arcs.push({ p1: Math.acos(-1+2*Math.random()), t1: Math.random()*Math.PI*2, p2: Math.acos(-1+2*Math.random()), t2: Math.random()*Math.PI*2, p: Math.random(), spd: 0.004+Math.random()*0.006, h: 0.3+Math.random()*0.5 });
    const aG = new THREE.BufferGeometry();
    aG.setAttribute('position', new THREE.BufferAttribute(aP, 3));
    scene.add(new THREE.Points(aG, new THREE.PointsMaterial({ color: 0xe8c574, size: 0.027, transparent: true, opacity: 0.9 })));

    // Glow
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.1,32,32), new THREE.MeshBasicMaterial({ color: 0x1e4d8c, transparent: true, opacity: 0.04, side: THREE.BackSide })));

    // Stars
    const sN = 600, sP2 = new Float32Array(sN * 3);
    for (let i = 0; i < sN; i++) { sP2[i*3]=(Math.random()-.5)*14; sP2[i*3+1]=(Math.random()-.5)*14; sP2[i*3+2]=(Math.random()-.5)*14; }
    const sG = new THREE.BufferGeometry();
    sG.setAttribute('position', new THREE.BufferAttribute(sP2, 3));
    scene.add(new THREE.Points(sG, new THREE.PointsMaterial({ color: 0xffffff, size: 0.007, transparent: true, opacity: 0.25 })));

    function ap(p1,t1,p2,t2,h,p) {
      const x1=Math.sin(p1)*Math.cos(t1),y1=Math.cos(p1),z1=Math.sin(p1)*Math.sin(t1);
      const x2=Math.sin(p2)*Math.cos(t2),y2=Math.cos(p2),z2=Math.sin(p2)*Math.sin(t2);
      const mx=(x1+x2)/2*(1+h),my=(y1+y2)/2*(1+h),mz=(z1+z2)/2*(1+h);
      const[ax,ay,az]=p<.5?[x1+(mx-x1)*p*2,y1+(my-y1)*p*2,z1+(mz-z1)*p*2]:[mx+(x2-mx)*(p*2-1),my+(y2-my)*(p*2-1),mz+(z2-mz)*(p*2-1)];
      const l=Math.sqrt(ax*ax+ay*ay+az*az)||1;
      return [ax/l,ay/l,az/l];
    }

    let drag=false,lx=0,ly=0,rY=0,rX=0,vx=0,vy=0;
    canvas.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;vx=0;vy=0;});
    window.addEventListener('mousemove',e=>{if(!drag)return;vx=(e.clientX-lx)*.005;vy=(e.clientY-ly)*.005;rY+=vx;rX+=vy;lx=e.clientX;ly=e.clientY;});
    window.addEventListener('mouseup',()=>drag=false);

    let animId;
    (function loop(){
      animId=requestAnimationFrame(loop);
      if(!drag){vx*=.96;vy*=.96;rY+=vx;rX+=vy;rY+=.003;}
      rX=Math.max(-.6,Math.min(.6,rX));
      scene.children.forEach(c=>{if(c.isLineSegments||c.isPoints)c.rotation.set(rX,rY,0);});
      arcs.forEach((a,i)=>{a.p+=a.spd;if(a.p>1)a.p=0;const[x,y,z]=ap(a.p1,a.t1,a.p2,a.t2,a.h,a.p);aP[i*3]=x;aP[i*3+1]=y;aP[i*3+2]=z;});
      aG.attributes.position.needsUpdate=true;
      renderer.render(scene,camera);
    })();

    return () => cancelAnimationFrame(animId);
  }

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#',''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="home">
        <div className="hero-left">
          <p className="hero-tag">AI/ML Engineer</p>
          <h1 className="hero-name"><span className="gn">RUDRA GUPTA</span></h1>
          <p className="hero-tagline">Building intelligent systems that bridge the gap between hardware and artificial intelligence</p>
          <div className="hero-roles">
            <span className="h-role">Electronics Engineer</span>
            <span className="h-dot"></span>
            <span className="h-role">AI/ML Developer</span>
            <span className="h-dot"></span>
            <span className="h-role">Game Dev Enthusiast</span>
          </div>
          <p className="hero-desc">Crafting intelligent systems and immersive experiences at the intersection of hardware and AI.</p>
          <div className="hero-btns">
            <a href="#" className="btn-gold">Download CV</a>
            <a href="#contact" className="btn-ghost" onClick={e => handleNav(e, '#contact')}>Contact Me</a>
          </div>
          <div className="scroll-cue">
            <div className="scroll-line"></div>
            Scroll
          </div>
        </div>
        <div className="hero-right">
          <canvas ref={canvasRef}></canvas>
          <div className="globe-tip">drag to rotate</div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          {['Neural Networks','Computer Vision','YOLOv8','Unity 6','TensorFlow','Game Development','PyTorch','IoT & Embedded','CNN-LSTM'].map((t,i) => (
            <><span key={t}>{t}</span><span key={`d${i}`} className="acc">✦</span></>
          ))}
          {['Neural Networks','Computer Vision','YOLOv8','Unity 6','TensorFlow','Game Development','PyTorch','IoT & Embedded','CNN-LSTM'].map((t,i) => (
            <><span key={`t${t}`}>{t}</span><span key={`d2${i}`} className="acc">✦</span></>
          ))}
        </div>
      </div>
    </>
  );
}
