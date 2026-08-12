import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { end: 12, suffix: '+', label: 'Years\nExperience' },
  { end: 1937, suffix: '+', label: 'Clients\nServed' },
  { end: 5, suffix: ' Cr+', label: 'AUM\nManaged', prefix: '₹', isDecimal: true },
  { end: 100, suffix: '%', label: 'NISM\nCertified' },
];

function StatItem({ end, suffix, label, prefix = '', isDecimal = false }) {
  const { count, ref } = useCountUp(isDecimal ? 42 : end, 2000);
  const displayValue = isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 12px' }}>
      <div className="stat-number text-gradient-emerald-gold" style={{ marginBottom: '8px' }}>
        {prefix}{displayValue}{suffix}
      </div>
      <div className="data-label" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section style={{
      background: '#0B0D2A',
      borderTop: '1px solid rgba(16,185,129,0.1)',
      borderBottom: '1px solid rgba(16,185,129,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }} aria-label="Key statistics">
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '200px', borderRadius: '50%', opacity: 0.03, filter: 'blur(100px)', background: 'radial-gradient(ellipse, #10B981, transparent 70%)', pointerEvents: 'none' }} />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-4-col">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
