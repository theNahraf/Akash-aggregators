import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Award, Send, CheckCircle, AlertCircle } from 'lucide-react';

const serviceOptions = ['Mutual Funds', 'Life Insurance', 'Term Insurance', 'Health Insurance', 'Motor Insurance', 'NPS', 'Fixed Deposits', 'Loans', 'ITR Filing', 'B2B Services', 'Other'];
const investmentRanges = ['Under ₹5,000/mo', '₹5,000–₹25,000/mo', '₹25,000–₹1L/mo', '₹1L+ or Lumpsum'];

const inputStyle = {
  width: '100%', background: '#111435', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
  padding: '12px 16px', color: 'white', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
  outline: 'none', transition: 'all 0.3s',
};

export default function ContactSection() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.target);
    formData.append('access_key', '76c316a3-28c7-42d1-9994-8d2c3ca99e7b');
    formData.append('subject', 'New Inquiry — Akash Aggregators');
    formData.append('from_name', 'Akash Aggregators Website');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) { setStatus('success'); e.target.reset(); } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="Contact us">
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">◆ Get in Touch</p>
          <h2 className="section-title">Start Your Financial Journey Today</h2>
        </motion.div>

        <div className="grid-2-col">
          {/* Left — Contact Info */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-body" style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: '32px' }}>
              Free initial consultation to understand your financial goals. Reach out to us through any of the channels below.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { href: 'mailto:support@aakashwealthmanagement.com', icon: Mail, iconColor: '#10B981', label: 'Email', value: 'support@aakashwealthmanagement.com' },
                { href: 'tel:+919878869339', icon: Phone, iconColor: '#10B981', label: 'Phone', value: '+91-9878869339' },
                { href: null, icon: MapPin, iconColor: '#10B981', label: 'Address', value: 'Tilak Nagar, West Delhi, Delhi 110018' },
                { href: 'https://www.linkedin.com/in/vaneet-bansal-a03749102', icon: ExternalLink, iconColor: '#4F46E5', label: 'LinkedIn', value: 'Connect with Vaneet Bansal', target: '_blank' },
              ].map((item) => {
                const Wrapper = item.href ? 'a' : 'div';
                return (
                  <Wrapper key={item.label} href={item.href || undefined} target={item.target} rel={item.target ? 'noopener noreferrer' : undefined}
                    className="glass" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', cursor: item.href ? 'pointer' : 'default', transition: 'all 0.3s' }}
                  >
                    <div style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30`, borderRadius: '10px', padding: '10px', flexShrink: 0 }}>
                      <item.icon size={18} style={{ color: item.iconColor }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="data-label">{item.label}</p>
                      <p className="font-body" style={{ fontSize: '0.85rem', color: 'white', wordBreak: 'break-all' }}>{item.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* NISM Badge */}
            <div className="glass" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderColor: 'rgba(245,158,11,0.2)', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '10px', flexShrink: 0 }}>
                <Award size={18} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <p className="data-label" style={{ color: '#F59E0B' }}>NISM Certified Advisor</p>
                <p className="font-data" style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 500 }}>NISM-202400188719</p>
              </div>
            </div>

            {/* Map */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.94424688!2d77.08!3d28.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04c3c8f45e1d%3A0x9e9a3f7a8e3a3e3!2sTilak%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="200" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)', display: 'block' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location"
              />
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Full Name *</label>
                <input type="text" id="name" name="name" required placeholder="Enter your full name" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#10B981'; e.target.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="form-row">
                <div>
                  <label htmlFor="email" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Email *</label>
                  <input type="email" id="email" name="email" required placeholder="you@example.com" style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#10B981'; e.target.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Phone *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="+91-XXXXXXXXXX" style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#10B981'; e.target.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="form-row">
                <div>
                  <label htmlFor="service" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Service</label>
                  <select id="service" name="service" style={inputStyle}>
                    <option value="">Choose a service...</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="investment" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Investment Range</label>
                  <select id="investment" name="investment_range" style={inputStyle}>
                    <option value="">Select range...</option>
                    {investmentRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="message" className="data-label" style={{ display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your financial goals..." style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = '#10B981'; e.target.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button type="submit" disabled={status === 'submitting'} className="btn-emerald" style={{ width: '100%', padding: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: status === 'submitting' ? 0.6 : 1 }}>
                {status === 'submitting' ? 'Sending...' : <><Send size={16} /> Send Message</>}
              </button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
                  <CheckCircle size={20} style={{ color: '#10B981', flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: '0.85rem', color: '#10B981' }}>Thank you! We'll contact you within 24 hours.</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
                  <AlertCircle size={20} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: '0.85rem', color: '#EF4444' }}>Something went wrong. Please try again or call us directly.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
