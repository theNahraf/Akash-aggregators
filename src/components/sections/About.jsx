import { motion } from 'framer-motion';
import { MapPin, Award, Building } from 'lucide-react';
import vaneetPhoto from '../../assets/vaneet-bansal.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const timeline = [
  { company: 'SBI Life Insurance', role: 'Financial Management & BD', current: false },
  { company: 'Bajaj Allianz', role: 'Sales Management & Customer Servicing', current: false },
  { company: 'PNB MetLife', role: 'Policy Servicing & Business Development', current: false },
  { company: 'Akash Aggregators', role: 'Independent Advisor (Current)', current: true },
];

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="About the advisor">
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #F59E0B, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid-2-col"
        >
          {/* Left — Photo & Credentials */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="about-left">
            {/* Profile Photo */}
            <div className="profile-photo" style={{
              borderRadius: '50%',
              border: '4px solid rgba(16,185,129,0.4)',
              outline: '4px solid #05061A',
              overflow: 'hidden',
              marginBottom: '32px',
              boxShadow: '0 0 40px -10px rgba(16,185,129,0.3)',
              flexShrink: 0,
            }}>
              <img
                src={vaneetPhoto}
                alt="Mr. Vaneet Bansal — NISM Certified Mutual Fund Advisor"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {/* Credential cards */}
            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Award size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <div>
                  <p className="data-label">NISM Registration</p>
                  <p className="font-data" style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 500 }}>NISM-202400188719</p>
                </div>
              </div>
              <div className="glass" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Building size={18} style={{ color: '#94A3B8', flexShrink: 0 }} />
                <div>
                  <p className="data-label">GST Number</p>
                  <p className="font-data" style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500 }}>07BNKPB0918E1ZF</p>
                </div>
              </div>
              <div className="glass" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} style={{ color: '#10B981', flexShrink: 0 }} />
                <div>
                  <p className="data-label">Location</p>
                  <p className="font-body" style={{ fontSize: '0.85rem', color: 'white' }}>Second Floor, E-10, Ram Dutt Enclave, Uttam Nagar, New Delhi 110059</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Bio & Timeline */}
          <motion.div variants={itemVariants}>
            <p className="section-label">◆ About Mr Bansal</p>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>Mr. Vaneet Bansal</h2>
            <p className="font-body" style={{ color: '#10B981', marginBottom: '24px' }}>
              NISM Certified Mutual Fund Advisor · Business Development Expert
            </p>
            <p className="font-body" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '32px' }}>
              With over a decade of hands-on experience in the financial services industry, Mr. Vaneet Bansal brings
              deep expertise in mutual fund advisory, insurance solutions, and comprehensive financial planning. Having
              worked with leading insurance companies including SBI Life Insurance, Bajaj Allianz, and PNB MetLife, he
              has developed an unparalleled understanding of the Indian financial ecosystem. Now, as the founder of
              Akash Aggregators, he provides personalized, SEBI-compliant financial solutions — from SIP investments
              and NPS management to ITR filing and loan assistance — all under one roof.
            </p>

            {/* Experience Timeline */}
            <div style={{ marginBottom: '32px' }}>
              <h3 className="font-body" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Professional Journey</h3>
              <div style={{ borderLeft: '2px solid rgba(16,185,129,0.3)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: '-27px', top: '4px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: item.current ? '#10B981' : 'rgba(16,185,129,0.6)',
                      boxShadow: item.current ? '0 0 10px rgba(16,185,129,0.5)' : 'none',
                    }} />
                    <p className="font-body" style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{item.company}</p>
                    <p className="font-body" style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{item.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Quote */}
            <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: '20px', paddingTop: '8px', paddingBottom: '8px' }}>
              <p className="font-display" style={{ fontSize: '1.125rem', fontStyle: 'italic', color: '#94A3B8', lineHeight: 1.7 }}>
                "To empower every individual and business with expert financial guidance, making wealth creation
                accessible, transparent, and aligned with their unique life goals."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .profile-photo {
          width: 240px;
          height: 240px;
        }
        @media (min-width: 1024px) {
          .profile-photo {
            width: 320px;
            height: 320px;
          }
          .about-left { 
            align-items: center !important; 
          }
        }
      `}</style>
    </section>
  );
}
