import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Users, Briefcase, CheckCircle, Building } from 'lucide-react';
import { recruitmentServices, recruitmentProcess, industryVerticals } from '../../data/recruitmentServices';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const highlights = [
  { icon: Users, value: '10,000+', label: 'Pre-Screened Candidates' },
  { icon: Briefcase, value: '12+', label: 'Industry Verticals' },
  { icon: CheckCircle, value: '95%', label: 'Placement Success Rate' },
];

export default function StaffRecruitment() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <section id="recruitment" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="Staff recruitment services">
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #6366F1, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">◆ Staff Recruitment Services</p>
          <h2 className="section-title">Build Your Dream Team with the Right Talent</h2>
          <p className="font-body" style={{ color: '#94A3B8', maxWidth: '680px', margin: '16px auto 0', lineHeight: 1.7 }}>
            From sourcing to onboarding, we provide end-to-end recruitment solutions that help businesses across industries find, assess, and hire top talent — quickly and efficiently.
          </p>
        </motion.div>

        {/* Intro + Highlight Metrics */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid-2-col" style={{ marginBottom: '48px' }}>
          <motion.div variants={itemVariants}>
            <p className="font-body" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '24px' }}>
              With over a decade of experience in business development and a deep network across multiple industries,
              we understand what it takes to match the right talent with the right opportunity. Our recruitment services
              are designed to save you time, reduce hiring risks, and deliver candidates who truly fit your culture and goals.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Pan-India talent network & sourcing', 'Rigorous multi-stage screening process', 'Industry-specific recruitment expertise', 'Dedicated account managers for every client'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6366F1' }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {highlights.map((m) => (
              <div key={m.label} className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '10px', flexShrink: 0 }}>
                  <m.icon size={20} style={{ color: '#6366F1' }} />
                </div>
                <div>
                  <p className="font-display" style={{ fontSize: '1.375rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366F1, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</p>
                  <p className="data-label">{m.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Service Cards */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid-1-2-3" style={{ marginBottom: '48px' }}>
          {recruitmentServices.map((service) => (
            <motion.div
              key={service.id} variants={itemVariants}
              onClick={() => setOpenCard(openCard === service.id ? null : service.id)}
              className="card"
              style={{ cursor: 'pointer', borderLeft: openCard === service.id ? '3px solid #6366F1' : '3px solid transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <span className="font-data" style={{ fontSize: '1.375rem', fontWeight: 700, flexShrink: 0, background: 'linear-gradient(135deg, #6366F1, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{service.number}</span>
                <div style={{ flex: 1 }}>
                  <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{service.title}</h3>
                  {openCard === service.id && (
                    <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ listStyle: 'none', padding: 0, marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.bullets.map((bullet, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#94A3B8', fontSize: '0.85rem' }}>
                          <span style={{ color: '#6366F1', marginTop: '2px', flexShrink: 0 }}>•</span>{bullet}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industry Verticals */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '48px' }}>
          <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', textAlign: 'center', marginBottom: '32px' }}>Industries We Serve</h3>
          <div className="industry-grid">
            {industryVerticals.map((vertical) => (
              <motion.div
                key={vertical}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass"
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'default',
                }}
              >
                <Building size={16} style={{ color: '#6366F1', flexShrink: 0 }} />
                <span className="font-body" style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>{vertical}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recruitment Process */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '48px' }}>
          <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', textAlign: 'center', marginBottom: '32px' }}>Our Recruitment Process</h3>
          <div className="recruitment-steps">
            {recruitmentProcess.map((step, i) => (
              <div key={step.step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div className="glass" style={{ padding: '24px', flex: 1, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="font-data" style={{ fontSize: '0.85rem', color: '#6366F1', fontWeight: 700 }}>{step.step}</span>
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>{step.title}</h4>
                  <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.description}</p>
                </div>
                {i < 2 && <ArrowRight size={24} className="recruit-step-arrow" style={{ color: 'rgba(99,102,241,0.5)', margin: '0 16px', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.15), #0B0D2A)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center' }}
          className="recruit-cta"
        >
          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Looking to Hire the Best Talent?</h3>
            <p className="font-body" style={{ color: '#94A3B8' }}>Let us handle the recruitment so you can focus on growing your business.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }} className="recruit-cta-btns">
            <a href="#contact" className="btn-emerald" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 4px 15px -3px rgba(99,102,241,0.4)' }} onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get a Recruitment Quote
            </a>
            <a href="tel:+919878869339" className="btn-outline" style={{ borderColor: 'rgba(99,102,241,0.3)', color: '#818CF8' }}>
              <Phone size={14} /> +91-9878869339
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .recruitment-steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .recruit-step-arrow { display: none; }

        @media (min-width: 640px) {
          .industry-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 768px) {
          .industry-grid { grid-template-columns: repeat(5, 1fr); }
          .recruitment-steps { flex-direction: row; align-items: stretch; }
          .recruit-step-arrow { display: block !important; }
          .recruit-cta { flex-direction: row !important; text-align: left !important; justify-content: space-between; padding: 48px !important; }
          .recruit-cta-btns { flex-direction: row !important; width: auto !important; }
        }
      `}</style>
    </section>
  );
}
