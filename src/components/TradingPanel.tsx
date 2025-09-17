import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { cryptoData } from '../data/mockData';
import { CyberCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage } from '@/shared/lib/utils';

const TradingPanel: React.FC = () => {
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>(cryptoData[0]?.id || '1');
  const [chartData, setChartData] = useState<number[]>([]);

  const currentSelectedCrypto = useMemo(() => {
    return cryptoData.find(asset => asset.id === selectedCryptoId) || cryptoData[0];
  }, [selectedCryptoId]);

  useEffect(() => {
    if (!currentSelectedCrypto) return;
    
    // Animate chart data
    let interval: NodeJS.Timeout;
    const updateChart = () => {
      const newPoint = currentSelectedCrypto.price + (Math.random() - 0.5) * 100;
      setChartData(prev => [...prev.slice(-50), newPoint]);
    };
    
    // Initial data
    setChartData(currentSelectedCrypto.sparkline || [currentSelectedCrypto.price]);
    
    // Update every 2 seconds
    interval = setInterval(updateChart, 2000);
    
    return () => clearInterval(interval);
  }, [currentSelectedCrypto]);

  const MiniChart: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-1 h-12">
        {data.map((point, index) => {
          const height = range > 0 ? ((point - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className={`w-1 bg-gradient-to-t ${color} opacity-70 hover:opacity-100 transition-all duration-200`}
              style={{ height: `${height}%`, minHeight: '2px' }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <CyberCard className="p-6" glowColor="cyan">
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg">
            <BarChart3 size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Trading Hub</h2>
        </div>
        <div className="flex items-center space-x-2 text-cyan-400">
          <Activity size={16} className={'animate-pulse'} />
          <Badge variant="cyber" className="text-xs">DEMO</Badge>
        </div>
      </div>

      {/* Crypto List */}
      <div className="relative z-10 space-y-4">
        {cryptoData.map((crypto, index) => (
          <div
            key={crypto.id}
            onClick={() => setSelectedCryptoId(crypto.id)}
            className={`
              p-4 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden
              ${currentSelectedCrypto?.id === crypto.id 
                ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/40' 
                : 'bg-black/20 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-purple-500/10 hover:to-pink-500/10 border border-gray-700/30 hover:border-cyan-400/20'
              }
            `}
          >
            {/* Selection Indicator */}
            {currentSelectedCrypto?.id === crypto.id && (
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"></div>
            )}
            
            <div className="flex items-center justify-between relative z-10">
              {/* Crypto Info */}
              <div className="flex items-center space-x-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                  ${crypto.symbol === 'BTC' ? 'bg-gradient-to-r from-orange-400 to-yellow-500' :
                    crypto.symbol === 'ETH' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
                    'bg-gradient-to-r from-purple-400 to-pink-500'
                  }
                `}>
                  {crypto.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-white font-semibold">{crypto.name}</p>
                  <p className="text-gray-400 text-sm font-mono">{crypto.symbol}</p>
                </div>
              </div>
              
              {/* Price and Chart */}
              <div className="flex items-center space-x-6">
                {/* Mini Chart */}
                <div className="w-20">
                  <MiniChart 
                    data={crypto.sparkline} 
                    color={crypto.change24h > 0 ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'}
                  />
                </div>
                
                {/* Price Info */}
                <div className="text-right">
                  <p className="text-white font-bold text-lg">
                    ${crypto.price.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1">
                    {crypto.change24h > 0 ? 
                      <TrendingUp size={14} className="text-green-400" /> : 
                      <TrendingDown size={14} className="text-red-400" />
                    }
                    <span className={`text-sm font-medium ${
                      crypto.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {currentSelectedCrypto && (
      <div className="relative z-10 mt-6 p-4 bg-black/30 rounded-xl border border-cyan-500/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{currentSelectedCrypto.name} Live Chart</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-mono">DEMO</span>
          </div>
        </div>
        
        {/* Large Chart */}
        <div className="h-32 flex items-end justify-center space-x-1">
          {chartData.map((point, index) => {
            const max = Math.max(...chartData);
            const min = Math.min(...chartData);
            const range = max - min;
            const height = range > 0 ? ((point - min) / range) * 100 : 50;
            const isLatest = index === chartData.length - 1;
            
            return (
              <div
                key={index}
                className={`w-2 transition-all duration-500 ${
                  isLatest 
                    ? 'bg-gradient-to-t from-cyan-400 to-purple-400 animate-pulse' 
                    : 'bg-gradient-to-t from-cyan-600/60 to-purple-600/60'
                }`}
                style={{ height: `${height}%`, minHeight: '4px' }}
              />
            );
          })}
        </div>
      </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
      </div>
    </CyberCard>
  );
};

export default TradingPanel;