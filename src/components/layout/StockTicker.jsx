import { useLiveMarketData } from '../../hooks/useLiveMarketData';

export default function StockTicker() {
  const { tickerItems, isLive } = useLiveMarketData();
  const items = [...tickerItems, ...tickerItems];

  return (
    <div style={{
      background: '#0B0D2A',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative',
      marginTop: '64px',
    }} aria-label="Live market ticker">
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(to right, #0B0D2A, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(to left, #0B0D2A, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Live indicator */}
      {isLive && (
        <div style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 3, display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
            animation: 'pulse-ring 2s ease-out infinite',
          }} />
          <span className="font-data" style={{ fontSize: '0.55rem', color: '#10B981', letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      )}

      <div className="ticker-container" style={{ marginLeft: isLive ? '50px' : '0' }}>
        <div className="ticker-content">
          {items.map((item, index) => (
            <div key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 20px', flexShrink: 0 }}>
              <span className="font-data" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(148,163,184,0.6)', background: 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '3px' }}>
                {item.label}
              </span>
              <span className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.name}</span>
              <span className="font-data" style={{ fontSize: '0.7rem', color: 'white', fontWeight: 500 }}>{item.value}</span>
              {item.change && (
                <span className="font-data" style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: item.direction === 'up' ? '#10B981' : item.direction === 'down' ? '#EF4444' : '#F59E0B',
                }}>
                  {item.direction === 'up' ? '▲' : item.direction === 'down' ? '▼' : '●'} {item.change}
                </span>
              )}
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem' }}>│</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
