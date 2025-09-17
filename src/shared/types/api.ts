import { z } from 'zod';

// Binance API Types
export const BinanceTickerSchema = z.object({
  symbol: z.string(),
  priceChange: z.string(),
  priceChangePercent: z.string(),
  weightedAvgPrice: z.string(),
  prevClosePrice: z.string(),
  lastPrice: z.string(),
  lastQty: z.string(),
  bidPrice: z.string(),
  bidQty: z.string(),
  askPrice: z.string(),
  askQty: z.string(),
  openPrice: z.string(),
  highPrice: z.string(),
  lowPrice: z.string(),
  volume: z.string(),
  quoteVolume: z.string(),
  openTime: z.number(),
  closeTime: z.number(),
  firstId: z.number(),
  lastId: z.number(),
  count: z.number(),
});

export const BinanceKlineSchema = z.array(z.union([z.string(), z.number()]));

export const BinanceWebSocketTickerSchema = z.object({
  e: z.string(), // Event type
  E: z.number(), // Event time
  s: z.string(), // Symbol
  c: z.string(), // Close price
  o: z.string(), // Open price
  h: z.string(), // High price
  l: z.string(), // Low price
  v: z.string(), // Total traded base asset volume
  q: z.string(), // Total traded quote asset volume
  P: z.string(), // Price change percent
});

// OpenSea API Types
export const OpenSeaNFTSchema = z.object({
  identifier: z.string(),
  collection: z.string(),
  contract: z.string(),
  token_standard: z.string(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  display_image_url: z.string().nullable(),
  display_animation_url: z.string().nullable(),
  metadata_url: z.string().nullable(),
  opensea_url: z.string(),
  updated_at: z.string(),
  is_disabled: z.boolean(),
  is_nsfw: z.boolean(),
});

export const OpenSeaCollectionSchema = z.object({
  collection: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  banner_image_url: z.string().nullable(),
  owner: z.string(),
  safelist_status: z.string(),
  category: z.string(),
  is_disabled: z.boolean(),
  is_nsfw: z.boolean(),
  trait_offers_enabled: z.boolean(),
  collection_offers_enabled: z.boolean(),
  opensea_url: z.string(),
  project_url: z.string().nullable(),
  wiki_url: z.string().nullable(),
  discord_url: z.string().nullable(),
  telegram_url: z.string().nullable(),
  twitter_username: z.string().nullable(),
  instagram_username: z.string().nullable(),
  contracts: z.array(z.object({
    address: z.string(),
    chain: z.string(),
  })),
});

// Internal API Types
export type BinanceTicker = z.infer<typeof BinanceTickerSchema>;
export type BinanceKline = z.infer<typeof BinanceKlineSchema>;
export type BinanceWebSocketTicker = z.infer<typeof BinanceWebSocketTickerSchema>;
export type OpenSeaNFT = z.infer<typeof OpenSeaNFTSchema>;
export type OpenSeaCollection = z.infer<typeof OpenSeaCollectionSchema>;

// Normalized Types
export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap?: number;
  high24h: number;
  low24h: number;
  lastUpdated: Date;
  sparkline?: number[];
}

export interface NFTAsset {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  image: string;
  collection: {
    name: string;
    slug: string;
    floorPrice?: number;
  };
  owner?: string;
  price?: number;
  currency?: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  traits?: Array<{
    trait_type: string;
    value: string | number;
    rarity?: number;
  }>;
  lastSale?: {
    price: number;
    currency: string;
    date: Date;
  };
}

export interface TradingBot {
  id: string;
  name: string;
  strategy: string;
  status: 'active' | 'inactive' | 'paused' | 'error';
  pair: string;
  balance: number;
  profit: number;
  profitPercent: number;
  trades: number;
  winRate: number;
  maxDrawdown: number;
  createdAt: Date;
  lastActive: Date;
  settings: {
    stopLoss?: number;
    takeProfit?: number;
    maxPosition?: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

export interface MarketData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  activeAssets: number;
  fearGreedIndex?: number;
}

export interface PortfolioStats {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalProfit: number;
  totalProfitPercent: number;
  activePositions: number;
  totalNFTs: number;
  activeBots: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// WebSocket Types
export interface WebSocketMessage<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

export interface WebSocketError {
  code: number;
  message: string;
  timestamp: number;
}