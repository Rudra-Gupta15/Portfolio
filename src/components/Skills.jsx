import { useEffect, useRef } from 'react';

const SKILLS = [
  { n: '01', label: 'Python / ML', pct: 94 },
  { n: '02', label: 'Computer Vision', pct: 90 },
  { n: '03', label: 'Deep Learning', pct: 86 },
  { n: '04', label: 'Unity / Game Dev', pct: 76 },
  { n: '05', label: 'Hardware / IoT', pct: 72 },
];

const BADGES = [
  { title: '🎮 Game Enthusiast', items: [
    { label: 'Unity', bg: '#1a1a2e', border: '#444', icon: 'https://cdn.simpleicons.org/unity/ffffff' },
    { label: 'C#', bg: '#1e4d8c' },
    { label: '🎮 Game Dev', bg: '#e74c3c' },
  ]},
  { title: '💻 Programming Languages', items: [
    { label: 'Python', bg: '#3572A5', icon: 'https://cdn.simpleicons.org/python/ffffff' },
    { label: 'C', bg: '#555', border: '#777' },
    { label: 'C++', bg: '#00599C', icon: 'https://cdn.simpleicons.org/cplusplus/ffffff' },
    { label: 'C#', bg: '#1e4d8c' },
    { label: 'HTML5', bg: '#e34c26', icon: 'https://cdn.simpleicons.org/html5/ffffff' },
    { label: 'CSS3', bg: '#264de4', icon: 'https://cdn.simpleicons.org/css3/ffffff' },
    { label: 'JS', bg: '#f7df1e', color: '#000', icon: 'https://cdn.simpleicons.org/javascript/000000' },
    { label: 'SQL', bg: '#336791', icon: 'https://cdn.simpleicons.org/postgresql/ffffff' },
  ]},
  { title: '🤖 AI & Computer Vision', items: [
    { label: 'TensorFlow', bg: '#FF6F00', icon: 'https://cdn.simpleicons.org/tensorflow/ffffff' },
    { label: 'OpenCV', bg: '#5C3EE8', icon: 'https://cdn.simpleicons.org/opencv/ffffff' },
    { label: 'Keras', bg: '#D00000' },
    { label: 'NumPy', bg: '#013243', icon: 'https://cdn.simpleicons.org/numpy/ffffff' },
    { label: 'Pandas', bg: '#150458', icon: 'https://cdn.simpleicons.org/pandas/ffffff' },
    { label: '⚡ YOLOv8', bg: '#00bcd4', color: '#000' },
    { label: 'PyTorch', bg: '#EE4C2C', icon: 'https://cdn.simpleicons.org/pytorch/ffffff' },
  ]},
  { title: '🌐 Web & Backend', items: [
    { label: 'Flask', bg: '#222', border: '#555', icon: 'https://cdn.simpleicons.org/flask/ffffff' },
    { label: 'Tkinter', bg: '#f5c518', color: '#000' },
    { label: 'MySQL', bg: '#00758F', icon: 'https://cdn.simpleicons.org/mysql/ffffff' },
    { label: 'Anaconda', bg: '#44A833', icon: 'https://cdn.simpleicons.org/anaconda/ffffff' },
    { label: 'React', bg: '#61dafb', color: '#000', icon: 'https://cdn.simpleicons.org/react/000000' },
    { label: 'Node.js', bg: '#339933', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
  ]},
  { title: '⚙️ Tools & Platforms', items: [
    { label: 'Git', bg: '#F05032', icon: 'https://cdn.simpleicons.org/git/ffffff' },
    { label: 'GitHub', bg: '#222', border: '#555', icon: 'https://cdn.simpleicons.org/github/ffffff' },
    { label: 'VS Code', bg: '#007ACC', icon: 'https://cdn.simpleicons.org/visualstudiocode/ffffff' },
    { label: 'Jupyter', bg: '#F37626', icon: 'https://cdn.simpleicons.org/jupyter/ffffff' },
    { label: 'Google Colab', bg: '#F9AB00', color: '#000' },
    { label: 'Arduino', bg: '#00979D', icon: 'https://cdn.simpleicons.org/arduino/ffffff' },
  ]},
];

export default function Skills() {
  const canvasRef = useRef(null);
  const hudRef = useRef(null);
  const skillBarsRef = useRef([]);
  const observedRef = useRef(false);

  useEffect(() => {
    // Neural net canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const lD=[4,6,6,5,3], lx=[.1,.28,.5,.72,.9];
    const nodes=lD.map((c,li)=>Array.from({length:c},(_,ni)=>({x:W*lx[li],y:H*(.1+(ni+.5)/c*.8),act:Math.random(),target:Math.random(),phase:Math.random()*Math.PI*2})));
    const pulses=[];
    let epoch=0,loss=1,acc=0,t=0;
    const i1=setInterval(()=>{const li=Math.floor(Math.random()*(nodes.length-1));pulses.push({li,ni:Math.floor(Math.random()*nodes[li].length),nj:Math.floor(Math.random()*nodes[li+1].length),p:0,spd:.013+Math.random()*.01});},95);
    const i2=setInterval(()=>{epoch++;loss=Math.max(.015,loss-(.03+Math.random()*.02));acc=Math.min(.99,acc+.02+Math.random()*.015);nodes.forEach(l=>l.forEach(n=>{n.target=Math.random();}));if(hudRef.current)hudRef.current.innerHTML=`EPOCH ${String(epoch).padStart(4,'0')}<br>LOSS&nbsp;&nbsp;${loss.toFixed(4)}<br>ACC&nbsp;&nbsp;&nbsp;${(acc*100).toFixed(1)}%`;},700);

    let animId;
    (function draw(){
      animId=requestAnimationFrame(draw);
      ctx.fillStyle='#0d1f3c';ctx.fillRect(0,0,W,H);t+=.018;
      for(let li=0;li<nodes.length-1;li++)for(const a of nodes[li])for(const b of nodes[li+1]){const w=(a.act+b.act)/2;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(212,168,67,${.015+w*.05})`;ctx.lineWidth=.35+w*.5;ctx.stroke();}
      for(let i=pulses.length-1;i>=0;i--){const pu=pulses[i];pu.p+=pu.spd;if(pu.p>=1){pulses.splice(i,1);continue;}const a=nodes[pu.li][pu.ni],b=nodes[pu.li+1][pu.nj];const px=a.x+(b.x-a.x)*pu.p,py=a.y+(b.y-a.y)*pu.p;const tr=.18,tx=a.x+(b.x-a.x)*Math.max(0,pu.p-tr),ty=a.y+(b.y-a.y)*Math.max(0,pu.p-tr);const g=ctx.createLinearGradient(tx,ty,px,py);g.addColorStop(0,'rgba(212,168,67,0)');g.addColorStop(1,'rgba(232,197,116,.95)');ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(px,py);ctx.strokeStyle=g;ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(px,py,2.8,0,Math.PI*2);ctx.fillStyle='#e8c574';ctx.fill();}
      nodes.forEach(layer=>layer.forEach(n=>{n.act+=(n.target-n.act)*.04;const pulse=1+Math.sin(t*2+n.phase)*.1,r=6.5*pulse,bright=.3+n.act*.7;const gr=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*3.5);gr.addColorStop(0,`rgba(212,168,67,${bright*.25})`);gr.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(n.x,n.y,r*3.5,0,Math.PI*2);ctx.fillStyle=gr;ctx.fill();ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);ctx.fillStyle=`rgba(${Math.floor(170+bright*60)},${Math.floor(120+bright*60)},${Math.floor(30+bright*40)},${.8+bright*.2})`;ctx.fill();ctx.strokeStyle=`rgba(232,197,116,${bright*.65})`;ctx.lineWidth=1.5;ctx.stroke();}));
    })();

    // Animate skill bars on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !observedRef.current) {
          observedRef.current = true;
          skillBarsRef.current.forEach((el, i) => {
            if (el) setTimeout(() => { el.style.width = SKILLS[i].pct + '%'; }, i * 100);
          });
        }
      });
    }, { threshold: 0.3 });
    if (canvas.parentElement.parentElement) observer.observe(canvas.parentElement.parentElement);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(i1);
      clearInterval(i2);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills">
      <div className="sec-label">02 — Capabilities</div>
      <div className="skills-wrap">
        <div>
          <h2 className="sec-h">⚡ Skills & <em>Technologies</em></h2>
          <div style={{ marginTop: 26 }}>
            {BADGES.map(group => (
              <div className="badge-group" key={group.title}>
                <div className="badge-group-title">{group.title}</div>
                <div className="badge-row">
                  {group.items.map(b => (
                    <div key={b.label} className="badge" style={{ background: b.bg, border: b.border ? `1px solid ${b.border}` : undefined, color: b.color || '#fff' }}>
                      {b.icon && <img src={b.icon} alt="" className="badge-icon" style={{width:15,height:15}} />}
                      {b.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>Live Neural Net</h3>
          <div className="nn-wrap">
            <canvas ref={canvasRef}></canvas>
            <div className="nn-hud" ref={hudRef}>EPOCH 0000<br />LOSS&nbsp;&nbsp;1.0000<br />ACC&nbsp;&nbsp;&nbsp;0.0%</div>
          </div>
          <div className="sk-rows">
            {SKILLS.map((sk, i) => (
              <div className="sk-row" key={sk.n}>
                <span className="sk-i">{sk.n}</span>
                <span className="sk-n">{sk.label}</span>
                <div className="sk-tr">
                  <div className="sk-fi" ref={el => skillBarsRef.current[i] = el} style={{ width: 0 }}></div>
                </div>
                <span className="sk-p">{sk.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
