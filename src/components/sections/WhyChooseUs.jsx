import { motion } from 'framer-motion';
import { Shield, Calendar, Home, Building2, Target, MessageCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cards = [
  { icon: Shield, title: 'NISM Certified', body: 'Official NISM-202400188719 registration ensuring professional and SEBI-compliant financial advice for all your investments.' },
  { icon: Calendar, title: 'Decade of Experience', body: '10+ years in financial and business development. Alumni of SBI Life, Bajaj Allianz, and PNB MetLife.' },
  { icon: Home, title: 'One-Stop Solution', body: 'Mutual Funds · Insurance · NPS · Loans · ITR Filing — comprehensive financial services all under one roof.' },
  { icon: Building2, title: 'Government Collaboration', body: 'Direct partnership with State & Central Govt. Registered for seamless retirement planning.' },
  { icon: Target, title: 'Personalized Approach', body: 'Solutions tailored to your risk appetite, timeline, and unique financial goals — no cookie-cutter advice.' },
  { icon: MessageCircle, title: 'Dedicated Support', body: 'CRM-backed B2B & B2C marketing with continuous policy servicing and portfolio monitoring.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding" style={{ background: 'rgba(11,13,42,0.5)', position: 'relative', overflow: 'hidden' }} aria-label="Why choose us">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p className="section-label">◆ Why Choose Us</p>
          <h2 className="section-title">
            Your Trusted Partner for Comprehensive Financial Solutions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid-1-2-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="card corner-accent"
            >
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '12px',
                padding: '12px',
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <card.icon size={22} style={{ color: '#10B981' }} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>{card.title}</h3>
              <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.7 }}>{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
