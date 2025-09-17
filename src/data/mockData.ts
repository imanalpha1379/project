import { CryptoData, NFTItem, TradingBot, DashboardStats } from '../types';

export const cryptoData: CryptoData[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.50,
    change24h: 5.24,
    volume: 28500000000,
    marketCap: 847000000000,
    sparkline: [42000, 42500, 43000, 42800, 43100, 43250]
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2680.25,
    change24h: -2.15,
    volume: 15200000000,
    marketCap: 322000000000,
    sparkline: [2750, 2720, 2680, 2695, 2670, 2680]
  },
  {
    id: '3',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.485,
    change24h: 8.42,
    volume: 1200000000,
    marketCap: 17000000000,
    sparkline: [0.45, 0.46, 0.47, 0.48, 0.485, 0.485]
  }
];

export const nftData: NFTItem[] = [
  {
    id: '1',
    name: 'Cyber Punk #2847',
    image: 'https://images.pexels.com/photos/8350582/pexels-photo-8350582.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 2.5,
    collection: 'CyberGenesis',
    rarity: 'Legendary'
  },
  {
    id: '2',
    name: 'Neon Dreams #156',
    image: 'https://images.pexels.com/photos/8439089/pexels-photo-8439089.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1.8,
    collection: 'Digital Futures',
    rarity: 'Epic'
  },
  {
    id: '3',
    name: 'Hologram #9923',
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 0.95,
    collection: 'Virtual Reality',
    rarity: 'Rare'
  }
];

export const tradingBots: TradingBot[] = [
  {
    id: '1',
    name: 'Quantum Scalper',
    status: 'active',
    profit: 2847.50,
    trades: 156,
    winRate: 78.2
  },
  {
    id: '2',
    name: 'Neural Grid',
    status: 'active',
    profit: 1245.80,
    trades: 89,
    winRate: 82.1
  },
  {
    id: '3',
    name: 'Cyber Arbitrage',
    status: 'paused',
    profit: 956.25,
    trades: 43,
    winRate: 69.8
  }
];

export const dashboardStats: DashboardStats = {
  totalValue: 125847.50,
  dayChange: 5.24,
  activePositions: 12,
  totalNFTs: 47
};