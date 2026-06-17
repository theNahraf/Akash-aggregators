import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const presets = [
  { label: 'Conservative 8%', rate: 8 },
  { label: 'Moderate 12%', rate: 12 },
  { label: 'Aggressive 15%', rate: 15 },
];

function formatINR(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

function formatAxis(value) {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(0)}L`;
  return `${(value / 1000).toFixed(0)}K`;
}

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(20);
  const [annualRate, setAnnualRate] = useState(12);

  const { chartData, totalInvested, estimatedReturns, totalCorpus, absoluteReturn } = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const data = [];
    for (let year = 1; year <= duration; year++) {
      const months = year * 12;
      const invested = monthlyAmount * months;
      const fv = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      data.push({ year: `Yr ${year}`, invested: Math.round(invested), corpus: Math.round(fv) });
    }
    const totalMonths = duration * 12;
    const totalInv = monthlyAmount * totalMonths;
    const totalFV = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    return {
      chartData: data,
      totalInvested: Math.round(totalInv),
      estimatedReturns: Math.round(totalFV - totalInv),
      totalCorpus: Math.round(totalFV),
      absoluteReturn: (((totalFV - totalInv) / totalInv) * 100).toFixed(1),
    };
  }, [monthlyAmount, duration, annualRate]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="glass" style={{ padding: '12px', minWidth: '160px' }}>
        <p className="font-data" style={{ fontSize: '0.6rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{payload[0]?.payload?.year}</p>
        <p className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Invested: <span style={{ color: 'white' }}>{formatINR(payload[0]?.payload?.invested)}</span></p>
        <p className="font-data" style={{ fontSize: '0.7rem', color: '#10B981' }}>Corpus: <span style={{ fontWeight: 500 }}>{formatINR(payload[0]?.payload?.corpus)}</span></p>
      </div>
    );
  };

  return (
    <section id="sip-calculator" className="section-padding" style={{ background: '#0B0D2A', position: 'relative', overflow: 'hidden' }} aria-label="SIP Growth Visualizer">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(150px)', background: 'radial-gradient(circle, #10B981, transparent 70%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="section-label">◆ SIP Calculator</p>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>Watch Your Money Grow</h2>
          <p className="font-body" style={{ color: '#94A3B8' }}>Power of compounding with a Systematic Investment Plan</p>
        </motion.div>

        <div className="sip-layout">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sip-controls">
            {/* Expected Return Rate */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p className="data-label">Expected Return Rate (%)</p>
                <input
                  type="number"
                  min="0"
                  max="200"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="font-data"
                  style={{
                    width: '90px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(16,185,129,0.3)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#10B981',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textAlign: 'right',
                    outline: 'none',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                {presets.map((p) => (
                  <button key={p.rate} onClick={() => setAnnualRate(p.rate)} className="font-data" style={{
                    fontSize: '0.65rem', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', border: 'none', transition: 'all 0.3s',
                    background: annualRate === p.rate ? '#10B981' : 'rgba(255,255,255,0.05)', color: annualRate === p.rate ? 'white' : '#94A3B8',
                    boxShadow: annualRate === p.rate ? '0 4px 15px -3px rgba(16,185,129,0.4)' : 'none',
                  }}>{p.label}</button>
                ))}
              </div>
            </div>

            {/* Monthly SIP slider */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p className="data-label">Monthly SIP Amount</p>
                <p className="font-data" style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 500 }}>₹{monthlyAmount.toLocaleString('en-IN')}</p>
              </div>
              <input type="range" min="1000" max="100000" step="1000" value={monthlyAmount} onChange={(e) => setMonthlyAmount(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span className="data-label">₹1,000</span>
                <span className="data-label">₹1,00,000</span>
              </div>
            </div>

            {/* Duration slider */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p className="data-label">Duration</p>
                <p className="font-data" style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 500 }}>{duration} Years</p>
              </div>
              <input type="range" min="5" max="30" step="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span className="data-label">5 Years</span>
                <span className="data-label">30 Years</span>
              </div>
            </div>

            {/* Results */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="glass" style={{ padding: '16px' }}>
                <p className="data-label" style={{ marginBottom: '4px' }}>Total Invested</p>
                <p className="font-data" style={{ fontSize: '1rem', color: 'white', fontWeight: 500 }}>{formatINR(totalInvested)}</p>
              </div>
              <div className="glass" style={{ padding: '16px' }}>
                <p className="data-label" style={{ marginBottom: '4px' }}>Est. Returns</p>
                <p className="font-data" style={{ fontSize: '1rem', color: '#10B981', fontWeight: 500 }}>{formatINR(estimatedReturns)}</p>
              </div>
              <div className="glass" style={{ padding: '16px', gridColumn: 'span 2' }}>
                <p className="data-label" style={{ marginBottom: '4px' }}>Total Corpus</p>
                <p className="font-data gold-shimmer" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatINR(totalCorpus)}</p>
              </div>
              <div className="glass" style={{ padding: '16px', gridColumn: 'span 2' }}>
                <p className="data-label" style={{ marginBottom: '4px' }}>Absolute Returns</p>
                <p className="font-data" style={{ fontSize: '1rem', color: '#10B981', fontWeight: 500 }}>{absoluteReturn}%</p>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass sip-chart" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ height: '100%', minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#94A3B8" tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} interval={Math.floor(duration / 6)} />
                  <YAxis tickFormatter={formatAxis} stroke="#94A3B8" tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="invested" stroke="#94A3B8" strokeWidth={1.5} fill="url(#investedGrad)" />
                  <Area type="monotone" dataKey="corpus" stroke="#10B981" strokeWidth={2} fill="url(#corpusGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#94A3B8' }} />
                <span className="data-label">Amount Invested</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
                <span className="data-label" style={{ color: '#10B981' }}>Estimated Corpus</span>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="font-data" style={{ fontSize: '0.6rem', color: 'rgba(148,163,184,0.5)', textAlign: 'center', marginTop: '24px', fontStyle: 'italic' }}>
          *Returns are estimated at assumed rate. Actual returns may vary. Mutual Fund investments are subject to market risks. Invest wisely.
        </p>
      </div>

      <style>{`
        .sip-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .sip-controls { order: 2; }
        .sip-chart { order: 1; min-height: 400px; }

        @media (min-width: 1024px) {
          .sip-layout { grid-template-columns: 1fr 2fr; gap: 2rem; }
          .sip-controls { order: 1; }
          .sip-chart { order: 2; }
        }
      `}</style>
    </section>
  );
}
