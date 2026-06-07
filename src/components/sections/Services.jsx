import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Heart, Shield, Activity, Car, PiggyBank, Lock, CreditCard, FileText, ArrowRight } from 'lucide-react';
import { services, serviceCategories } from '../../data/services';

const iconMap = { TrendingUp, Heart, Shield, Activity, Car, PiggyBank, Lock, CreditCard, FileText };

const colorMap = {
  emerald: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', text: '#10B981' },
  gold: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', text: '#F59E0B' },
  indigo: { bg: 'rgba(79,70,229,0.1)', border: 'rgba(79,70,229,0.2)', text: '#4F46E5' },
  slate: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', text: '#94A3B8' },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function Services() {
  const [activeTab, setActiveTab] = useState('All');
  const filteredServices = useMemo(() => activeTab === 'All' ? services : services.filter(s => s.category === activeTab), [activeTab]);

  return (
    <section id="services" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="Our services">
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '500px', height: '500px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p className="section-label">◆ Our Services</p>
          <h2 className="section-title">Comprehensive BFSI Financial Solutions</h2>
        </motion.div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="font-data"
              style={{
                fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '8px 16px', borderRadius: '9999px', cursor: 'pointer',
                transition: 'all 0.3s', border: 'none',
                background: activeTab === cat ? '#10B981' : 'rgba(255,255,255,0.05)',
                color: activeTab === cat ? 'white' : '#94A3B8',
                boxShadow: activeTab === cat ? '0 4px 15px -3px rgba(16,185,129,0.4)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid-1-2-3">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon];
              const colors = colorMap[service.iconColor] || colorMap.emerald;

              return (
                <motion.div key={service.id} variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }} className="card corner-accent" style={{ position: 'relative', overflow: 'hidden' }}>
                  {/* Background watermark */}
                  <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', opacity: 0.03, transition: 'opacity 0.5s', transform: 'rotate(15deg)' }}>
                    <IconComponent size={100} style={{ color: 'white' }} />
                  </div>

                  <div style={{
                    background: colors.bg, border: `1px solid ${colors.border}`,
                    borderRadius: '12px', padding: '12px',
                    width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <IconComponent size={22} style={{ color: colors.text }} />
                  </div>

                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>{service.name}</h3>
                  <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.6 }}>{service.description}</p>

                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.bullets.map((bullet, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#94A3B8', fontSize: '0.85rem' }}>
                        <span style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }}>•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#10B981', fontSize: '0.85rem', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)' }}>
                    Learn More <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
