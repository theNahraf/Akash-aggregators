import { useState, useEffect, useCallback } from 'react';

// TradingView symbols
const SYMBOLS = {
  indices: [
    { symbol: 'BSE:SENSEX', name: 'SENSEX', region: 'india' },
    { symbol: 'NSE:NIFTY', name: 'NIFTY 50', region: 'india' },
    { symbol: 'NSE:BANKNIFTY', name: 'BANK NIFTY', region: 'india' },
    { symbol: 'NSE:CNXIT', name: 'NIFTY IT', region: 'india' },
  ],
  commoditiesCurrency: [
    { symbol: 'COMEX:GC1!', name: 'Gold (Intl)', unit: 'USD/oz', region: 'global' },
    { symbol: 'COMEX:SI1!', name: 'Silver (Intl)', unit: 'USD/oz', region: 'global' },
    { symbol: 'FX_IDC:USDINR', name: 'USD/INR', unit: '', region: 'global' },
    { symbol: 'FX_IDC:EURINR', name: 'EUR/INR', unit: '', region: 'global' },
  ],
};

const REFRESH_INTERVAL = 60_000; // 60 seconds

// Static fallback data
const FALLBACK_INDICES = [
  { name: 'SENSEX', price: '79,802.28', change: '+312.10 (0.39%)', direction: 'up' },
  { name: 'NIFTY 50', price: '24,346.70', change: '+98.55 (0.41%)', direction: 'up' },
  { name: 'BANK NIFTY', price: '52,788.15', change: '+245.30 (0.47%)', direction: 'up' },
  { name: 'NIFTY IT', price: '42,150.80', change: '-128.45 (0.30%)', direction: 'down' },
];

const FALLBACK_COMMODITIES = [
  { name: 'Gold (Intl)', rate: '$2,348.50/oz', direction: 'up' },
  { name: 'Silver (Intl)', rate: '$31.20/oz', direction: 'up' },
  { name: 'USD/INR', rate: '₹83.42', direction: 'down' },
  { name: 'EUR/INR', rate: '₹90.15', direction: 'up' },
];

const FALLBACK_TICKER = [
  { label: 'INDEX', name: 'SENSEX', value: '79,802.28', change: '+312.10', direction: 'up' },
  { label: 'INDEX', name: 'NIFTY 50', value: '24,346.70', change: '+98.55', direction: 'up' },
  { label: 'INDEX', name: 'BANK NIFTY', value: '52,788.15', change: '+245.30', direction: 'up' },
  { label: 'INDEX', name: 'NIFTY IT', value: '42,150.80', change: '-128.45', direction: 'down' },
  { label: 'COMMODITY', name: 'Gold', value: '$2,348.50', change: '+12.30', direction: 'up' },
  { label: 'COMMODITY', name: 'Silver', value: '$31.20', change: '+0.45', direction: 'up' },
  { label: 'FOREX', name: 'USD/INR', value: '₹83.42', change: '-0.15', direction: 'down' },
  { label: 'FOREX', name: 'EUR/INR', value: '₹90.15', change: '+0.22', direction: 'up' },
];

function formatNumber(num, decimals = 2) {
  if (num == null || isNaN(num)) return '—';
  return num.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function formatPrice(symbol, price) {
  if (symbol.includes('INR')) return `₹${formatNumber(price)}`;
  if (symbol.includes('GC') || symbol.includes('SI')) return `$${formatNumber(price)}`;
  return formatNumber(price);
}

async function fetchTradingViewData(region, tickers) {
  const url = `https://scanner.tradingview.com/${region}/scan`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      symbols: { tickers },
      columns: ["close", "change_abs", "change"]
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.data || [];
}

async function fetchAllLiveQuotes() {
  const indiaTickers = [...SYMBOLS.indices, ...SYMBOLS.commoditiesCurrency]
    .filter(s => s.region === 'india')
    .map(s => s.symbol);
    
  const globalTickers = [...SYMBOLS.indices, ...SYMBOLS.commoditiesCurrency]
    .filter(s => s.region === 'global')
    .map(s => s.symbol);

  const [indiaData, globalData] = await Promise.all([
    indiaTickers.length > 0 ? fetchTradingViewData('india', indiaTickers) : Promise.resolve([]),
    globalTickers.length > 0 ? fetchTradingViewData('global', globalTickers) : Promise.resolve([])
  ]);

  return [...indiaData, ...globalData];
}

function parseQuotes(quotes) {
  const symbolMap = {};
  for (const q of quotes) {
    // q.d = [close, change_abs, change_percent]
    symbolMap[q.s] = {
      price: q.d[0],
      changeAbs: q.d[1],
      changePct: q.d[2]
    };
  }

  // Build indices data
  const indices = SYMBOLS.indices.map((s) => {
    const q = symbolMap[s.symbol];
    if (!q) return null;
    const direction = q.changeAbs >= 0 ? 'up' : 'down';
    return {
      name: s.name,
      price: formatNumber(q.price),
      change: `${q.changeAbs >= 0 ? '+' : ''}${formatNumber(q.changeAbs)} (${Math.abs(q.changePct).toFixed(2)}%)`,
      direction,
      rawPrice: q.price,
      rawChange: q.changeAbs,
    };
  }).filter(Boolean);

  // Build commodities/currency data
  const goldCurrency = SYMBOLS.commoditiesCurrency.map((s) => {
    const q = symbolMap[s.symbol];
    if (!q) return null;
    const direction = q.changeAbs >= 0 ? 'up' : 'down';
    return {
      name: s.name,
      rate: formatPrice(s.symbol, q.price),
      direction,
      rawPrice: q.price,
      rawChange: q.changeAbs,
    };
  }).filter(Boolean);

  // Build ticker data
  const tickerItems = [];
  for (const s of SYMBOLS.indices) {
    const q = symbolMap[s.symbol];
    if (!q) continue;
    tickerItems.push({
      label: 'INDEX',
      name: s.name,
      value: formatNumber(q.price),
      change: `${q.changeAbs >= 0 ? '+' : ''}${formatNumber(q.changeAbs)}`,
      direction: q.changeAbs >= 0 ? 'up' : 'down',
    });
  }
  for (const s of SYMBOLS.commoditiesCurrency) {
    const q = symbolMap[s.symbol];
    if (!q) continue;
    const label = s.symbol.includes('INR') ? 'FOREX' : 'COMMODITY';
    tickerItems.push({
      label,
      name: s.name,
      value: formatPrice(s.symbol, q.price),
      change: `${q.changeAbs >= 0 ? '+' : ''}${formatNumber(q.changeAbs)}`,
      direction: q.changeAbs >= 0 ? 'up' : 'down',
    });
  }

  return { indices, goldCurrency, tickerItems };
}

/**
 * Hook that fetches live market data from TradingView.
 * Auto-refreshes every 60 seconds.
 * Falls back to static data on error.
 */
export function useLiveMarketData() {
  const [data, setData] = useState({
    indices: FALLBACK_INDICES,
    goldCurrency: FALLBACK_COMMODITIES,
    tickerItems: FALLBACK_TICKER,
    isLive: false,
    lastUpdated: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const quotes = await fetchAllLiveQuotes();
      const parsed = parseQuotes(quotes);
      setData({
        indices: parsed.indices.length > 0 ? parsed.indices : FALLBACK_INDICES,
        goldCurrency: parsed.goldCurrency.length > 0 ? parsed.goldCurrency : FALLBACK_COMMODITIES,
        tickerItems: parsed.tickerItems.length > 0 ? parsed.tickerItems : FALLBACK_TICKER,
        isLive: true,
        lastUpdated: new Date(),
        error: null,
      });
    } catch (err) {
      console.warn('Live market data unavailable, using static data:', err.message);
      setData((prev) => ({
        ...prev,
        isLive: false,
        error: err.message,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return data;
}

// Re-export static data that doesn't have a live source
export const macroIndicators = [
  { name: 'RBI Repo Rate', value: '6.50%' },
  { name: 'CPI Inflation', value: '4.83%' },
  { name: 'GDP Growth (Q3)', value: '8.4%' },
  { name: '10Y Govt Bond', value: '7.12%' },
];

export const mutualFundNAVs = [
  { name: 'SBI Bluechip Fund', nav: '₹82.45', return1Y: '+28.3%' },
  { name: 'HDFC Mid-Cap Fund', nav: '₹45.12', return1Y: '+42.1%' },
  { name: 'Axis Small Cap', nav: '₹95.67', return1Y: '+38.7%' },
  { name: 'ICICI Pru Value', nav: '₹67.89', return1Y: '+35.2%' },
  { name: 'Mirae Large Cap', nav: '₹98.23', return1Y: '+24.8%' },
  { name: 'Kotak Flexi Cap', nav: '₹72.56', return1Y: '+31.5%' },
];
