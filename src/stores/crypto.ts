import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { CryptoAsset, MarketData } from '@/shared/types/api';

interface CryptoState {
  // Data
  assets: Record<string, CryptoAsset>;
  marketData: MarketData | null;
  selectedAsset: string | null;
  watchlist: string[];
  
  // UI State
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // WebSocket State
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  
  // Actions
  setAssets: (assets: CryptoAsset[]) => void;
  updateAsset: (asset: CryptoAsset) => void;
  setMarketData: (data: MarketData) => void;
  setSelectedAsset: (symbol: string | null) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnectionStatus: (status: CryptoState['connectionStatus']) => void;
  reset: () => void;
}

const initialState = {
  assets: {},
  marketData: null,
  selectedAsset: null,
  watchlist: ['BTCUSDT', 'ETHUSDT', 'ADAUSDT'],
  isLoading: false,
  error: null,
  lastUpdated: null,
  isConnected: false,
  connectionStatus: 'disconnected' as const,
};

export const useCryptoStore = create<CryptoState>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    setAssets: (assets) => {
      const assetsMap = assets.reduce((acc, asset) => {
        acc[asset.symbol] = asset;
        return acc;
      }, {} as Record<string, CryptoAsset>);
      
      set({
        assets: assetsMap,
        lastUpdated: new Date(),
        error: null,
      });
    },
    
    updateAsset: (asset) => {
      set((state) => ({
        assets: {
          ...state.assets,
          [asset.symbol]: asset,
        },
        lastUpdated: new Date(),
      }));
    },
    
    setMarketData: (data) => {
      set({ marketData: data });
    },
    
    setSelectedAsset: (symbol) => {
      set({ selectedAsset: symbol });
    },
    
    addToWatchlist: (symbol) => {
      const { watchlist } = get();
      if (!watchlist.includes(symbol)) {
        set({ watchlist: [...watchlist, symbol] });
      }
    },
    
    removeFromWatchlist: (symbol) => {
      const { watchlist } = get();
      set({ watchlist: watchlist.filter(s => s !== symbol) });
    },
    
    setLoading: (loading) => {
      set({ isLoading: loading });
    },
    
    setError: (error) => {
      set({ error, isLoading: false });
    },
    
    setConnectionStatus: (status) => {
      set({ 
        connectionStatus: status,
        isConnected: status === 'connected',
      });
    },
    
    reset: () => {
      set(initialState);
    },
  }))
);

// Selectors
export const selectAssetBySymbol = (symbol: string) => (state: CryptoState) =>
  state.assets[symbol];

export const selectWatchlistAssets = (state: CryptoState) =>
  state.watchlist.map(symbol => state.assets[symbol]).filter(Boolean);

export const selectTopGainers = (limit: number = 5) => (state: CryptoState) =>
  Object.values(state.assets)
    .sort((a, b) => b.changePercent24h - a.changePercent24h)
    .slice(0, limit);

export const selectTopLosers = (limit: number = 5) => (state: CryptoState) =>
  Object.values(state.assets)
    .sort((a, b) => a.changePercent24h - b.changePercent24h)
    .slice(0, limit);