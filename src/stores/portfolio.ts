import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioStats } from '@/shared/types/api';

interface Position {
  id: string;
  symbol: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  profit: number;
  profitPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  fee: number;
  total: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

interface PortfolioState {
  // Data
  positions: Record<string, Position>;
  transactions: Transaction[];
  stats: PortfolioStats | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPositions: (positions: Position[]) => void;
  updatePosition: (position: Position) => void;
  removePosition: (id: string) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  setStats: (stats: PortfolioStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateStats: () => void;
  reset: () => void;
}

const initialState = {
  positions: {},
  transactions: [],
  stats: null,
  isLoading: false,
  error: null,
};

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setPositions: (positions) => {
        const positionsMap = positions.reduce((acc, position) => {
          acc[position.id] = position;
          return acc;
        }, {} as Record<string, Position>);
        
        set({ positions: positionsMap });
        get().calculateStats();
      },
      
      updatePosition: (position) => {
        set((state) => ({
          positions: {
            ...state.positions,
            [position.id]: position,
          },
        }));
        get().calculateStats();
      },
      
      removePosition: (id) => {
        set((state) => {
          const { [id]: removed, ...positions } = state.positions;
          return { positions };
        });
        get().calculateStats();
      },
      
      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map(tx =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        }));
      },
      
      setStats: (stats) => {
        set({ stats });
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      setError: (error) => {
        set({ error, isLoading: false });
      },
      
      calculateStats: () => {
        const { positions, transactions } = get();
        const positionArray = Object.values(positions);
        
        const totalValue = positionArray.reduce(
          (sum, pos) => sum + (pos.amount * pos.currentPrice), 0
        );
        
        const totalCost = positionArray.reduce(
          (sum, pos) => sum + (pos.amount * pos.averagePrice), 0
        );
        
        const totalProfit = totalValue - totalCost;
        const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
        
        const completedTransactions = transactions.filter(tx => tx.status === 'completed');
        const dayTransactions = completedTransactions.filter(
          tx => new Date(tx.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
        );
        
        const dayChange = dayTransactions.reduce((sum, tx) => {
          return sum + (tx.type === 'buy' ? -tx.total : tx.total);
        }, 0);
        
        const stats: PortfolioStats = {
          totalValue,
          dayChange,
          dayChangePercent: totalValue > 0 ? (dayChange / totalValue) * 100 : 0,
          totalProfit,
          totalProfitPercent,
          activePositions: positionArray.length,
          totalNFTs: 0, // Will be updated by NFT store
          activeBots: 0, // Will be updated by bot store
        };
        
        set({ stats });
      },
      
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({
        positions: state.positions,
        transactions: state.transactions,
      }),
    }
  )
);