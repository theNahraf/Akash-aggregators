import { ExternalLink } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'B2B', href: '#b2b' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const serviceLinks = ['Mutual Funds', 'Life Insurance', 'NPS', 'Fixed Deposits', 'Loans', 'ITR Filing'];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#030411', borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-label="Footer">
      <div className="section-container" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="grid-footer">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
              <span style={{ color: '#F59E0B', fontSize: '1.25rem', fontWeight: 700 }}>◆</span>
              <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Aakash Aggregators</span>
            </a>
            <p className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '16px' }}>
              Your trusted partner for comprehensive financial solutions in India.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <p className="font-data" style={{ fontSize: '0.625rem', color: '#F59E0B', letterSpacing: '0.15em' }}>NISM-202400188719</p>
              <p className="font-data" style={{ fontSize: '0.625rem', color: '#94A3B8', letterSpacing: '0.15em', marginTop: '4px' }}>GST: 07BNKPB0918E1ZF</p>
            </div>
            <a href="https://www.linkedin.com/in/vaneet-bansal-a03749102" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', display: 'inline-block' }} aria-label="LinkedIn">
              <ExternalLink size={18} />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-data" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '20px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseOver={(e) => e.target.style.color = '#10B981'} onMouseOut={(e) => e.target.style.color = '#94A3B8'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-data" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '20px' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((name) => (
                <li key={name}>
                  <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseOver={(e) => e.target.style.color = '#10B981'} onMouseOut={(e) => e.target.style.color = '#94A3B8'}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-data" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '20px' }}>Contact</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="mailto:support@aAakashaggregators.com" className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#10B981'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  support@aAakashaggregators.com
                </a>
              </li>
              <li>
                <a href="tel:+919878869339" className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.target.style.color = '#10B981'} onMouseOut={(e) => e.target.style.color = '#94A3B8'}
                >
                  +91-9878869339
                </a>
              </li>
              <li>
                <p className="font-body" style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Second Floor, E-10, Ram Dutt Enclave,<br />Uttam Nagar, New Delhi 110059</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px 0' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <p className="font-body" style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)', marginBottom: '8px' }}>
            © 2025 Aakash Aggregators. All rights reserved.
          </p>
          <p className="font-data" style={{ fontSize: '0.625rem', color: 'rgba(148,163,184,0.35)', fontStyle: 'italic', maxWidth: '40rem', margin: '0 auto 12px' }}>
            Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            {['Privacy Policy', 'Disclaimer', 'Sitemap'].map((link, i) => (
              <span key={link} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {i > 0 && <span style={{ color: 'rgba(148,163,184,0.15)' }}>·</span>}
                <a href="#" className="font-body" style={{ fontSize: '0.625rem', color: 'rgba(148,163,184,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.target.style.color = '#94A3B8'} onMouseOut={(e) => e.target.style.color = 'rgba(148,163,184,0.35)'}
                >
                  {link}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
