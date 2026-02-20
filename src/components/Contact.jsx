import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = e => {
    e.preventDefault();
    alert('Message sent! (Demo — connect a backend to enable real submissions)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <div className="sec-label">07 — Let's Connect</div>
      <h2 className="sec-h">Get in <em>Touch</em></h2>
      <div className="contact-wrap">
        <div className="contact-left">
          <h3>Get in Touch</h3>
          <a href="tel:+919075569787" className="c-item">
            <div className="c-icon-wrap">📞</div>
            <div className="c-info"><div className="c-lbl">Mobile</div><div className="c-val">90755 69787</div></div>
          </a>
          <a href="mailto:rudra@example.com" className="c-item">
            <div className="c-icon-wrap">✉️</div>
            <div className="c-info"><div className="c-lbl">Gmail</div><div className="c-val">rudrakumargupta@gmail.com</div></div>
          </a>
          <a href="https://linkedin.com/in/rudra-kumar-gupta" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">💼</div>
            <div className="c-info"><div className="c-lbl">LinkedIn</div><div className="c-val">rudra-kumar-gupta</div></div>
            <span className="c-ext">↗</span>
          </a>
          <a href="https://github.com/Rudra-Gupta15" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">🐙</div>
            <div className="c-info"><div className="c-lbl">GitHub</div><div className="c-val">Rudra-Gupta15</div></div>
            <span className="c-ext">↗</span>
          </a>
          <div className="contact-socials">
            <a href="https://linkedin.com/in/rudra-kumar-gupta" target="_blank" rel="noreferrer" className="soc-btn">💼</a>
            <a href="https://github.com/Rudra-Gupta15" target="_blank" rel="noreferrer" className="soc-btn">🐙</a>
          </div>
        </div>
        <div className="contact-right">
          <div className="coming-soon-badge">Coming Soon</div>
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="f-g">
              <label className="f-lbl">Name</label>
              <input type="text" className="f-in" placeholder="Your name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="f-g">
              <label className="f-lbl">Email</label>
              <input type="email" className="f-in" placeholder="your@email.com" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} />
            </div>
            <div className="f-g">
              <label className="f-lbl">Message</label>
              <textarea className="f-in" placeholder="Your message..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))}></textarea>
            </div>
            <button type="submit" className="f-btn">✈ Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
