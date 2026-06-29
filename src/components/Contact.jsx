import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', contact: '', related: 'to hire', customRelated: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/c99e20fd2b9a3c80171b560bf7d31b91", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: form.name,
          Subject: form.subject,
          Contact_Info: form.contact,
          Related_To: form.related === 'custom' ? form.customRelated : form.related,
          Message: form.message,
          _subject: form.subject ? `Portfolio: ${form.subject}` : `New message from ${form.name} on Portfolio`
        })
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setForm({ name: '', subject: '', contact: '', related: 'to hire', customRelated: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="sec-label">07 — Let's Connect</div>
      <h2 className="sec-h">Get in <em>Touch</em></h2>
      <div className="contact-wrap">
        <div className="contact-left">
          <h3>Get in Touch</h3>
          <a href="tel:+919075569787" className="c-item">
            <div className="c-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.27 1.11l-2.2 2.2z" />
              </svg>
            </div>
            <div className="c-info"><div className="c-lbl">Mobile</div><div className="c-val">90755 69787</div></div>
          </a>
          <a href="mailto:rudrakumargupta@gmail.com" className="c-item">
            <div className="c-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className="c-info"><div className="c-lbl">Gmail</div><div className="c-val">rudrakumargupta@gmail.com</div></div>
          </a>
          <a href="https://linkedin.com/in/rudra-kumar-gupta" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div className="c-info"><div className="c-lbl">LinkedIn</div><div className="c-val">rudra-kumar-gupta</div></div>
            <span className="c-ext">↗</span>
          </a>
          <a href="https://github.com/Rudra-Gupta15" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </div>
            <div className="c-info"><div className="c-lbl">GitHub</div><div className="c-val">Rudra-Gupta15</div></div>
            <span className="c-ext">↗</span>
          </a>
            
          <a href="https://www.kaggle.com/rudrakumargupta" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 3v18h3v-6.5l5.5 6.5H21l-6.5-7.5L21 3h-3.5L12 9.5V3H9z" />
              </svg>
            </div>
            <div className="c-info"><div className="c-lbl">Kaggle</div><div className="c-val">rudrakumargupta</div></div>
            <span className="c-ext">↗</span>
          </a>
          
          <div className="contact-socials">
            <a href="https://linkedin.com/in/rudra-kumar-gupta" target="_blank" rel="noreferrer" className="soc-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href="https://github.com/Rudra-Gupta15" target="_blank" rel="noreferrer" className="soc-btn" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
            <a href="https://www.kaggle.com/rudrakumargupta" target="_blank" rel="noreferrer" className="soc-btn" aria-label="Kaggle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 3v18h3v-6.5l5.5 6.5H21l-6.5-7.5L21 3h-3.5L12 9.5V3H9z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="contact-right">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="f-g">
              <label className="f-lbl">From (Name)</label>
              <input type="text" className="f-in" placeholder="Your name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required />
            </div>
            <div className="f-g">
              <label className="f-lbl">Mail / Contact No.</label>
              <input type="text" className="f-in" placeholder="Email or Phone Number" value={form.contact} onChange={e => setForm(f=>({...f,contact:e.target.value}))} required />
            </div>
            <div className="f-g">
              <label className="f-lbl">Subject</label>
              <input type="text" className="f-in" placeholder="What is this regarding?" value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))} required />
            </div>
            <div className="f-g">
              <label className="f-lbl">Related To</label>
              <select className="f-in" value={form.related} onChange={e => setForm(f=>({...f,related:e.target.value}))} required style={{ appearance: 'none', cursor: 'pointer', backgroundColor: 'rgba(13, 31, 60, 0.5)' }}>
                <option value="to hire">To Hire</option>
                <option value="make freelancer">Make Freelancer</option>
                <option value="custom">Custom</option>
              </select>
              {form.related === 'custom' && (
                <input type="text" className="f-in" placeholder="Please specify..." value={form.customRelated} onChange={e => setForm(f=>({...f,customRelated:e.target.value}))} required style={{ marginTop: 10 }} />
              )}
            </div>
            <div className="f-g">
              <label className="f-lbl">Message</label>
              <textarea className="f-in" placeholder="Your message..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} required></textarea>
            </div>
            <button type="submit" className="f-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : '✈ Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
