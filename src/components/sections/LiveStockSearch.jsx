import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveStockSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const symbol = query.trim().toUpperCase();
    if (!symbol) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://scanner.tradingview.com/india/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          symbols: { tickers: [`NSE:${symbol}`, `BSE:${symbol}`] },
          columns: ["description", "close", "change_abs", "change"]
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        // Prefer NSE, fallback to BSE
        const match = data.data.find(d => d.s.startsWith('NSE:')) || data.data[0];
        setResult({
          symbol: match.s.split(':')[1],
          exchange: match.s.split(':')[0],
          name: match.d[0],
          price: match.d[1],
          changeAbs: match.d[2],
          changePct: match.d[3],
        });
      } else {
        setError('Stock not found. Try a valid NSE/BSE symbol (e.g. RELIANCE).');
      }
    } catch (err) {
      setError('Failed to fetch live data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return '—';
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="glass" style={{
      padding: '24px',
      borderRadius: '16px',
      marginTop: '32px',
      width: '100%',
      maxWidth: '500px',
      margin: '32px auto 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle glow effect inside the card */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)', pointerEvents: 'none' }} />

      <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Search size={18} style={{ color: '#10B981' }} /> Live Stock Price
      </h3>
      <p className="font-body" style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '16px' }}>
        Get real-time share market values directly from NSE/BSE.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. RELIANCE, TCS, INFY"
          className="font-body"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '10px 16px',
            color: 'white',
            outline: 'none',
            textTransform: 'uppercase',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-emerald"
          style={{ padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '100px' }}
        >
          {isLoading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 'Search'}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontSize: '0.8rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: '8px' }}
          >
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              background: 'rgba(11,13,42,0.6)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h4 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{result.symbol}</h4>
                <span className="font-data" style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#94A3B8' }}>{result.exchange}</span>
              </div>
              <p className="font-body" style={{ fontSize: '0.75rem', color: '#94A3B8', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {result.name}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                ₹{formatNumber(result.price)}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', color: result.changeAbs >= 0 ? '#10B981' : '#EF4444' }}>
                {result.changeAbs >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="font-data" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                  {result.changeAbs >= 0 ? '+' : ''}{formatNumber(result.changeAbs)} ({result.changePct >= 0 ? '+' : ''}{formatNumber(result.changePct)}%)
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
