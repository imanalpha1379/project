export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  sparkline: number[];
}

export interface NFTItem {
  id: string;
  name: string;
  image: string;
  price: number;
  collection: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface TradingBot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused';
  profit: number;
  trades: number;
  winRate: number;
}

export interface DashboardStats {
  totalValue: number;
  dayChange: number;
  activePositions: number;
  totalNFTs: number;
}