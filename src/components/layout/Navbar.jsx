import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'B2B', href: '#b2b' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.5s ease',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        backgroundColor: scrolled ? 'rgba(5, 6, 26, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="section-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span style={{ color: '#F59E0B', fontSize: '1.25rem', fontWeight: 700 }}>◆</span>
            <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              Akash Aggregators
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'none' }} className="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-data"
                style={{
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.color = '#10B981'}
                onMouseOut={(e) => e.target.style.color = '#94A3B8'}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'none' }} className="nav-right-desktop">
            <span className="font-data" style={{
              fontSize: '0.625rem',
              color: '#10B981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '4px 10px',
              borderRadius: '4px',
              letterSpacing: '0.1em',
            }}>
              NISM-202400188719
            </span>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-emerald"
              style={{ fontSize: '0.8125rem', padding: '8px 20px' }}
            >
              Get Free Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 40,
              }}
              className="mobile-overlay"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '300px',
                maxWidth: '85vw',
                background: '#0B0D2A',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                zIndex: 50,
                overflowY: 'auto',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <span className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>
                  <span style={{ color: '#F59E0B' }}>◆</span> Akash Aggregators
                </span>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="font-data"
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: '#94A3B8',
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { e.target.style.color = '#10B981'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { e.target.style.color = '#94A3B8'; e.target.style.background = 'transparent'; }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="font-data" style={{
                  display: 'block',
                  fontSize: '0.625rem',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  letterSpacing: '0.1em',
                }}>
                  NISM-202400188719
                </span>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn-emerald" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Get Free Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; align-items: center; gap: 2rem; }
          .nav-right-desktop { display: flex !important; align-items: center; gap: 1rem; }
          .mobile-menu-btn { display: none !important; }
          .mobile-overlay { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
