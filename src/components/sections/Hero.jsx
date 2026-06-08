import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const portfolioData = [
  { v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 19 },
  { v: 28 }, { v: 25 }, { v: 35 }, { v: 32 }, { v: 42 },
  { v: 38 }, { v: 48 }, { v: 55 }, { v: 52 }, { v: 65 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const trustItems = ['SEBI Regulated', '10+ Years Experience', '500+ Clients', 'Govt. NPS Partner'];

export default function Hero() {
  const handleScrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="section-padding" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }} aria-label="Hero">
      {/* Background effects */}
      <div className="bg-grid-pattern" />
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', opacity: 0.07, filter: 'blur(120px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', opacity: 0.05, filter: 'blur(150px)', background: 'radial-gradient(circle, #F59E0B, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ textAlign: 'center' }} className="hero-text-col">
            {/* NISM Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <span className="font-data" style={{
                fontSize: '0.6875rem',
                color: '#F59E0B',
                border: '1px solid rgba(245,158,11,0.3)',
                padding: '6px 14px',
                borderRadius: '9999px',
                letterSpacing: '0.1em',
                background: 'rgba(245,158,11,0.05)',
                display: 'inline-block',
              }}>
                ◆ NISM CERTIFIED · NISM-202400188719
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={itemVariants} className="text-hero" style={{ marginBottom: '24px' }}>
              Your Trusted<br />
              Financial &<br />
              <span className="text-gradient-emerald-gold">Business Advisor.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="font-body" style={{
              fontSize: '1rem',
              color: '#94A3B8',
              lineHeight: 1.7,
              maxWidth: '36rem',
              margin: '0 auto 32px',
            }}>
              NISM Certified Mutual Fund Advisor with over a decade of expertise.
              Mutual Funds · Insurance · NPS · Loans · ITR Filing — all under one roof in Delhi.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', alignItems: 'center' }} className="hero-cta-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollTo('#sip-calculator')}
                className="btn-emerald"
              >
                Start Your SIP Today <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollTo('#contact')}
                className="btn-outline"
              >
                Book Free Consultation
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px', justifyContent: 'center' }} className="hero-trust-row">
              {trustItems.map((item) => (
                <span key={item} className="font-data" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.05em' }}>
                  <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content — Floating Dashboard (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-dashboard-col"
            style={{ position: 'relative' }}
          >
            {/* Background glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', borderRadius: '50%', opacity: 0.08, filter: 'blur(100px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

            {/* Main Dashboard Card */}
            <div className="glass" style={{ padding: '24px', position: 'relative', zIndex: 1, borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <p className="font-data" style={{ fontSize: '0.625rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Portfolio Performance</p>
                  <p className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginTop: '4px' }}>₹12,45,000</p>
                </div>
                <span className="font-data" style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '6px' }}>+18.4% XIRR</span>
              </div>
              <div style={{ height: '140px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} fill="url(#heroGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Floating Card 1 — Monthly SIP */}
            <div className="glass" style={{
              position: 'absolute', top: '-16px', right: '-8px',
              padding: '16px', zIndex: 2, width: '180px', borderRadius: '12px',
              animation: 'float 6s ease-in-out infinite',
              boxShadow: '0 0 30px -10px rgba(16,185,129,0.2)',
            }}>
              <p className="data-label">Monthly SIP</p>
              <p className="font-display" style={{ fontSize: '1.375rem', fontWeight: 700, color: 'white', marginTop: '4px' }}>₹5,000</p>
              <p className="font-data" style={{ fontSize: '0.7rem', color: '#10B981', marginTop: '4px' }}>+18.4% XIRR</p>
            </div>

            {/* Floating Card 2 — AUM */}
            <div className="glass" style={{
              position: 'absolute', bottom: '-16px', left: '-8px',
              padding: '16px', zIndex: 2, width: '180px', borderRadius: '12px',
              animation: 'float 6s ease-in-out 2s infinite',
            }}>
              <p className="data-label">Total AUM Managed</p>
              <p className="font-display gold-shimmer" style={{ fontSize: '1.375rem', fontWeight: 700, marginTop: '4px' }}>₹4.2 Cr+</p>
            </div>

            {/* Floating Card 3 — Active Clients */}
            <div className="glass" style={{
              position: 'absolute', bottom: '32px', right: '-4px',
              padding: '16px', zIndex: 2, width: '160px', borderRadius: '12px',
              animation: 'float 6s ease-in-out 1s infinite',
            }}>
              <p className="data-label">Active Clients</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <p className="font-display" style={{ fontSize: '1.375rem', fontWeight: 700, color: 'white' }}>500+</p>
                <span style={{ position: 'relative', width: '10px', height: '10px' }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981', animation: 'pulse-ring 2s ease-out infinite' }} />
                  <span style={{ position: 'relative', display: 'block', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-text-col { text-align: center; }
        .hero-dashboard-col { display: none; }
        .hero-cta-row { flex-direction: column; align-items: center; }
        .hero-trust-row { justify-content: center; }

        @media (min-width: 640px) {
          .hero-cta-row { flex-direction: row !important; }
        }

        @media (min-width: 768px) {
          .hero-dashboard-col { display: block; }
        }

        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
          .hero-text-col { text-align: left; }
          .hero-trust-row { justify-content: flex-start; }
          .hero-cta-row { justify-content: flex-start; }
          .hero-text-col p { margin-left: 0; margin-right: 0; }
        }
      `}</style>
    </section>
  );
}
