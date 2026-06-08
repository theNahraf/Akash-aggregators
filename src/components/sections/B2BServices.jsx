import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, TrendingUp, Clock, Users } from 'lucide-react';
import { b2bServices, strategicSteps } from '../../data/b2bServices';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const metrics = [
  { icon: TrendingUp, value: '25-40%', label: 'Revenue Growth Potential' },
  { icon: Clock, value: '3-6 Months', label: 'ROI Timeline' },
  { icon: Users, value: '50%+', label: 'Lead Conversion Improvement' },
];

export default function B2BServices() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <section id="b2b" className="section-padding" style={{ background: 'rgba(11,13,42,0.5)', position: 'relative', overflow: 'hidden' }} aria-label="B2B services">
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">◆ Business Development Services</p>
          <h2 className="section-title">Accelerate Your Financial Services Business</h2>
        </motion.div>

        {/* Intro + Metrics */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid-2-col" style={{ marginBottom: '48px' }}>
          <motion.div variants={itemVariants}>
            <p className="font-body" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '24px' }}>
              As a seasoned Business Development professional with experience across India's top financial services companies,
              we offer end-to-end B2B consulting services designed to help BFSI companies scale their operations, optimize sales
              channels, and achieve measurable growth.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Strategic market expansion planning', 'Data-driven sales optimization', 'Digital-first marketing strategies', 'Performance analytics & reporting'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.875rem' }}>
                  <span style={{ color: '#10B981' }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {metrics.map((m) => (
              <div key={m.label} className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px', flexShrink: 0 }}>
                  <m.icon size={20} style={{ color: '#10B981' }} />
                </div>
                <div>
                  <p className="font-display text-gradient-emerald-gold" style={{ fontSize: '1.375rem', fontWeight: 700 }}>{m.value}</p>
                  <p className="data-label">{m.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* B2B Service Cards */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid-1-2-3" style={{ marginBottom: '48px' }}>
          {b2bServices.map((service) => (
            <motion.div
              key={service.id} variants={itemVariants}
              onClick={() => setOpenCard(openCard === service.id ? null : service.id)}
              className="card"
              style={{ cursor: 'pointer', borderLeft: openCard === service.id ? '3px solid #10B981' : '3px solid transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <span className="font-data text-gradient-gold" style={{ fontSize: '1.375rem', fontWeight: 700, flexShrink: 0 }}>{service.number}</span>
                <div style={{ flex: 1 }}>
                  <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{service.title}</h3>
                  {openCard === service.id && (
                    <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ listStyle: 'none', padding: 0, marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.bullets.map((bullet, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#94A3B8', fontSize: '0.85rem' }}>
                          <span style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }}>•</span>{bullet}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Strategic Plan */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '48px' }}>
          <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', textAlign: 'center', marginBottom: '32px' }}>Our Strategic Approach</h3>
          <div className="strategic-steps">
            {strategicSteps.map((step, i) => (
              <div key={step.step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div className="glass" style={{ padding: '24px', flex: 1, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="font-data" style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 700 }}>{step.step}</span>
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>{step.title}</h4>
                  <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.description}</p>
                </div>
                {i < 2 && <ArrowRight size={24} className="step-arrow" style={{ color: 'rgba(16,185,129,0.5)', margin: '0 16px', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(to right, rgba(5,150,105,0.2), #0B0D2A)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center' }}
          className="b2b-cta"
        >
          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Ready to Accelerate Your Business Growth?</h3>
            <p className="font-body" style={{ color: '#94A3B8' }}>Let's discuss how we can help scale your financial services business.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }} className="b2b-cta-btns">
            <a href="#contact" className="btn-emerald" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Schedule a Consultation
            </a>
            <a href="tel:+919878869339" className="btn-outline">
              <Phone size={14} /> +91-9878869339
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .strategic-steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .step-arrow { display: none; }

        @media (min-width: 768px) {
          .strategic-steps { 
            flex-direction: row; 
            align-items: stretch; 
          }
          .step-arrow { display: block !important; }
        }

        @media (min-width: 768px) {
          .b2b-cta { flex-direction: row !important; text-align: left !important; justify-content: space-between; padding: 48px !important; }
          .b2b-cta-btns { flex-direction: row !important; width: auto !important; }
        }
      `}</style>
    </section>
  );
}
