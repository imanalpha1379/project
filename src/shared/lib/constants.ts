export const APP_NAME = 'PimcoAI';
export const APP_DESCRIPTION = 'Advanced Crypto Trading Platform';

export const API_ENDPOINTS = {
  BINANCE_BASE: 'https://api.binance.com/api/v3',
  BINANCE_WS: 'wss://stream.binance.com:9443/ws',
  OPENSEA_BASE: 'https://api.opensea.io/api/v2',
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
} as const;

export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'BTC', 'ETH'] as const;

export const CRYPTO_SYMBOLS = [
  'BTCUSDT',
  'ETHUSDT', 
  'ADAUSDT',
  'SOLUSDT',
  'DOTUSDT',
  'LINKUSDT',
  'MATICUSDT',
  'AVAXUSDT',
] as const;

export const NFT_COLLECTIONS = [
  'boredapeyachtclub',
  'mutant-ape-yacht-club',
  'cryptopunks',
  'azuki',
  'doodles-official',
] as const;

export const TRADING_PAIRS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETHUSDT', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'ADAUSDT', name: 'Cardano', icon: '₳' },
  { symbol: 'SOLUSDT', name: 'Solana', icon: '◎' },
] as const;

export const BOT_STRATEGIES = [
  'Grid Trading',
  'DCA (Dollar Cost Average)',
  'Arbitrage',
  'Market Making',
  'Momentum',
  'Mean Reversion',
] as const;

export const TIMEFRAMES = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
  { label: '4h', value: '4h' },
  { label: '1d', value: '1d' },
] as const;

export const CHART_INTERVALS = {
  '1m': 60 * 1000,
  '5m': 5 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '4h': 4 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
} as const;

export const WEBSOCKET_RECONNECT_INTERVAL = 5000;
export const API_RATE_LIMIT = 1200; // requests per minute
export const CACHE_DURATION = 30000; // 30 seconds

export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    900: '#14532d',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    900: '#7f1d1d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    900: '#78350f',
  },
} as const;