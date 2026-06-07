import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { faqData } from '../../data/faq';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="FAQ">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">◆ Frequently Asked Questions</p>
          <h2 className="section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="faq-layout">
          {/* Left — CTA */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="faq-cta-col">
            <div className="glass" style={{ padding: '32px', borderRadius: '16px', position: 'sticky', top: '100px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MessageCircle size={28} style={{ color: '#10B981' }} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>Have More Questions?</h3>
              <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Our team is here to help. Get in touch for a free consultation.
              </p>
              <a href="#contact" className="btn-emerald" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Chat With Us <MessageCircle size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="faq-accordion-col">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                style={{
                  borderRadius: openId === faq.id ? '12px' : '0',
                  background: openId === faq.id ? '#0B0D2A' : 'transparent',
                  border: openId === faq.id ? '1px solid rgba(16,185,129,0.2)' : 'none',
                  borderBottom: openId === faq.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  marginBottom: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'white',
                  }}
                >
                  <span className="font-body" style={{ fontSize: '0.9rem', fontWeight: 500, paddingRight: '16px', color: 'white' }}>{faq.question}</span>
                  <motion.span animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
                    <ChevronDown size={18} style={{ color: '#10B981' }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 20px 20px' }}>
                        <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.8 }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .faq-cta-col { order: 2; }
        .faq-accordion-col { order: 1; }

        @media (min-width: 1024px) {
          .faq-layout { grid-template-columns: 2fr 3fr; gap: 3rem; }
          .faq-cta-col { order: 1; }
          .faq-accordion-col { order: 2; }
        }
      `}</style>
    </section>
  );
}
