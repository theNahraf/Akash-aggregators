import { motion } from 'framer-motion';
import { useLiveMarketData, mutualFundNAVs, macroIndicators } from '../../hooks/useLiveMarketData';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

export default function MarketOverview() {
  const { indices, goldCurrency, isLive, lastUpdated } = useLiveMarketData();

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }} aria-label="Live market overview">
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #F59E0B, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="section-label">◆ Live Market Overview</p>
          <h2 className="section-title">Stay Ahead of the Markets</h2>
          {/* Live status badge */}
          {isLive && lastUpdated && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '9999px', padding: '4px 14px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
              <span className="font-data" style={{ fontSize: '0.6rem', color: '#10B981', letterSpacing: '0.1em' }}>
                LIVE · Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid-1-2-3">
          {/* Market Indices */}
          <motion.div variants={itemVariants} className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 className="font-data" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#F59E0B', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Market Indices
              {isLive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {indices.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: 'white', fontWeight: 500 }}>{item.price}</span>
                    <span className="font-data" style={{ fontSize: '0.7rem', fontWeight: 500, color: item.direction === 'up' ? '#10B981' : '#EF4444', minWidth: '60px', textAlign: 'right' }}>
                      {item.direction === 'up' ? '▲' : '▼'} {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mutual Fund NAVs (static) */}
          <motion.div variants={itemVariants} className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 className="font-data" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#F59E0B', marginBottom: '20px' }}>Popular Mutual Fund NAVs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mutualFundNAVs.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-data" style={{ fontSize: '0.6rem', color: '#94A3B8', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: 'white', fontWeight: 500 }}>{item.nav}</span>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 500, minWidth: '50px', textAlign: 'right' }}>{item.return1Y}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-data" style={{ fontSize: '0.55rem', color: 'rgba(148,163,184,0.4)', marginTop: '16px', fontStyle: 'italic' }}>
              *NAV data for illustration. Past performance ≠ future returns.
            </p>
          </motion.div>

          {/* Gold, Currency & Macro */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <h3 className="font-data" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#F59E0B', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Gold & Currency
                {isLive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {goldCurrency.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="font-data" style={{ fontSize: '0.7rem', color: 'white', fontWeight: 500 }}>{item.rate}</span>
                      <span style={{ fontSize: '0.7rem', color: item.direction === 'up' ? '#10B981' : '#EF4444' }}>{item.direction === 'up' ? '▲' : '▼'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <h3 className="font-data" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#F59E0B', marginBottom: '20px' }}>Macro Indicators</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {macroIndicators.map((item) => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.name}</span>
                    <span className="font-data" style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="font-data" style={{ fontSize: '0.6rem', color: 'rgba(148,163,184,0.4)', textAlign: 'center', marginTop: '32px', fontStyle: 'italic', maxWidth: '40rem', margin: '32px auto 0' }}>
          {isLive
            ? 'Market data refreshes every 60 seconds via Yahoo Finance. Data may be delayed by 15-20 minutes. Consult your advisor before making investment decisions.'
            : 'Data shown for illustration purposes. Live data unavailable. Consult your advisor before making any investment decisions.'}
        </p>
      </div>
    </section>
  );
}
