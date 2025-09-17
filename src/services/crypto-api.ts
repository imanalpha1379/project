import axios from 'axios';
import { z } from 'zod';
import { 
  BinanceTickerSchema, 
  BinanceKlineSchema,
  CryptoAsset,
  MarketData 
} from '@/shared/types/api';
import { API_ENDPOINTS, CRYPTO_SYMBOLS } from '@/shared/lib/constants';
import { getAssetName } from '@/shared/lib/utils';

class CryptoApiService {
  private baseURL = API_ENDPOINTS.BINANCE_BASE;
  private client = axios.create({
    baseURL: this.baseURL,
    timeout: 10000,
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Crypto API Error:', error);
        throw new Error(
          error.response?.data?.msg || 
          error.message || 
          'Failed to fetch crypto data'
        );
      }
    );
  }

  async getTicker(symbol: string): Promise<CryptoAsset> {
    const response = await this.client.get(`/ticker/24hr?symbol=${symbol}`);
    const ticker = BinanceTickerSchema.parse(response.data);
    
    return this.normalizeTicker(ticker);
  }

  async getAllTickers(): Promise<CryptoAsset[]> {
    const symbols = CRYPTO_SYMBOLS.join('","');
    const response = await this.client.get(`/ticker/24hr?symbols=["${symbols}"]`);
    const tickers = z.array(BinanceTickerSchema).parse(response.data);
    
    return tickers.map(ticker => this.normalizeTicker(ticker));
  }

  async getKlines(
    symbol: string, 
    interval: string = '1h', 
    limit: number = 24
  ): Promise<number[]> {
    const response = await this.client.get(
      `/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    const klines = z.array(BinanceKlineSchema).parse(response.data);
    
    return klines.map(kline => parseFloat(kline[4] as string)); // Close prices
  }

  async getMarketData(): Promise<MarketData> {
    // This would typically come from multiple endpoints
    // For now, we'll calculate from available data
    const tickers = await this.getAllTickers();
    
    const totalVolume24h = tickers.reduce(
      (sum, ticker) => sum + ticker.volume24h, 0
    );
    
    const btcTicker = tickers.find(t => t.symbol === 'BTCUSDT');
    const totalMarketCap = btcTicker ? btcTicker.price * 19000000 : 0; // Approximate BTC supply
    
    return {
      totalMarketCap,
      totalVolume24h,
      btcDominance: 45, // Mock data
      activeAssets: tickers.length,
      fearGreedIndex: Math.floor(Math.random() * 100), // Mock data
    };
  }

  private normalizeTicker(ticker: any): CryptoAsset {
    const symbol = ticker.symbol;
    const name = getAssetName(symbol);
    
    return {
      id: symbol.toLowerCase(),
      symbol,
      name,
      price: parseFloat(ticker.lastPrice),
      change24h: parseFloat(ticker.priceChange),
      changePercent24h: parseFloat(ticker.priceChangePercent),
      volume24h: parseFloat(ticker.volume),
      high24h: parseFloat(ticker.highPrice),
      low24h: parseFloat(ticker.lowPrice),
      lastUpdated: new Date(ticker.closeTime),
    };
  }
}

export const cryptoApi = new CryptoApiService();