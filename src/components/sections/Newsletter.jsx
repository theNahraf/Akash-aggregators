import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    
    const formData = new FormData();
    formData.append('access_key', '76c316a3-28c7-42d1-9994-8d2c3ca99e7b');
    formData.append('subject', 'New Newsletter Subscriber');
    formData.append('from_name', 'Akash Aggregators Website');
    formData.append('email', email);

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="Newsletter">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,150,105,0.1), #05061A, rgba(79,70,229,0.1))', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '40rem', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display" style={{ fontSize: '1.875rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
            Stay Updated with Financial Insights
          </h2>
          <p className="font-body" style={{ color: '#94A3B8', marginBottom: '32px' }}>
            Get the latest on mutual funds, insurance, tax planning, and financial tips.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '28rem', margin: '0 auto 16px' }} className="newsletter-form">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required
              style={{ flex: 1, background: '#111435', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '12px 20px', color: 'white', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
            <button type="submit" disabled={status === 'submitting'} className="btn-emerald" style={{ opacity: status === 'submitting' ? 0.7 : 1 }}>
              {status === 'submitting' ? 'Subscribing...' : <><Send size={14} /> Subscribe</>}
            </button>
          </form>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body" style={{ fontSize: '0.85rem', color: '#10B981', marginBottom: '8px' }}>
              Thank you for subscribing! 🎉
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body" style={{ fontSize: '0.85rem', color: '#EF4444', marginBottom: '8px' }}>
              Failed to subscribe. Please try again.
            </motion.p>
          )}

          <p className="font-data" style={{ fontSize: '0.6rem', color: 'rgba(148,163,184,0.4)', letterSpacing: '0.15em' }}>
            We respect your privacy. No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .newsletter-form { flex-direction: row !important; }
        }
      `}</style>
    </section>
  );
}
