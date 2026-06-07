import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (current + i + testimonials.length) % testimonials.length;
      items.push({ ...testimonials[index], offset: i });
    }
    return items;
  };

  const TestimonialCard = ({ item, isCenter = false }) => (
    <div className="glass glow-emerald-hover" style={{
      padding: '32px', borderRadius: '16px', opacity: isCenter ? 1 : 0.7, transform: isCenter ? 'scale(1)' : 'scale(0.97)',
      transition: 'all 0.5s ease',
    }}>
      <span className="font-display" style={{ fontSize: '3rem', color: 'rgba(16,185,129,0.3)', lineHeight: 1 }}>"</span>
      <p className="font-display" style={{ fontSize: '1rem', fontStyle: 'italic', color: '#E2E8F0', lineHeight: 1.7, marginBottom: '24px', marginTop: '-16px', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #059669, #10B981)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-body)', flexShrink: 0,
        }}>
          {item.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <p className="font-body" style={{ fontSize: '0.875rem', color: 'white', fontWeight: 600 }}>{item.name}</p>
          <p className="font-body" style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{item.role}</p>
        </div>
      </div>
      <div style={{ color: '#F59E0B', fontSize: '0.875rem', letterSpacing: '0.15em', marginTop: '12px' }}>★★★★★</div>
    </div>
  );

  return (
    <section className="section-padding" style={{ background: '#0B0D2A', position: 'relative', overflow: 'hidden' }} aria-label="Testimonials">
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #F59E0B, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">◆ Client Testimonials</p>
          <h2 className="section-title">Trusted by Hundreds of Satisfied Clients</h2>
        </motion.div>

        {/* Mobile: Single card */}
        <div className="testimonial-mobile">
          <TestimonialCard item={testimonials[current]} isCenter={true} />
        </div>

        {/* Desktop: 3 visible */}
        <div className="testimonial-desktop">
          {getVisibleItems().map((item) => (
            <TestimonialCard key={`${item.id}-${item.offset}`} item={item} isCenter={item.offset === 0} />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <button onClick={() => { prev(); setIsAutoPlaying(false); }} aria-label="Previous" style={{
            width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
            background: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevronLeft size={18} />
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); setIsAutoPlaying(false); }} aria-label={`Testimonial ${i + 1}`} style={{
                width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px',
                background: i === current ? '#10B981' : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
              }} />
            ))}
          </div>
          <button onClick={() => { next(); setIsAutoPlaying(false); }} aria-label="Next" style={{
            width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
            background: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .testimonial-mobile { display: block; }
        .testimonial-desktop { display: none; }

        @media (min-width: 768px) {
          .testimonial-mobile { display: none; }
          .testimonial-desktop {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
