import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Image } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolio';
import { useCryptoStore } from '@/stores/crypto';
import { formatCurrency, formatPercentage } from '@/shared/lib/utils';

const StatsCards: React.FC = () => {
  const { stats } = usePortfolioStore();
  const { assets } = useCryptoStore();
  
  const dashboardStats = stats || {
    totalValue: 125847.50,
    dayChange: 5.24,
    dayChangePercent: 5.24,
    totalProfit: 12584.75,
    totalProfitPercent: 11.2,
    activePositions: 12,
    totalNFTs: 47,
    activeBots: 3,
  };
  
  const cardData = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(dashboardStats.totalValue),
      change: dashboardStats.dayChangePercent,
      icon: Wallet,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      title: '24h Change',
      value: formatPercentage(dashboardStats.dayChangePercent),
      change: dashboardStats.dayChangePercent,
      icon: dashboardStats.dayChangePercent > 0 ? TrendingUp : TrendingDown,
      gradient: dashboardStats.dayChangePercent > 0 ? 'from-green-400 to-emerald-500' : 'from-red-400 to-red-500'
    },
    {
      title: 'Active Positions',
      value: dashboardStats.activePositions.toString(),
      change: dashboardStats.totalProfitPercent,
      icon: TrendingUp,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: 'NFT Collection',
      value: dashboardStats.totalNFTs.toString(),
      change: 12.3, // Mock data for now
      icon: Image,
      gradient: 'from-pink-400 to-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative group cursor-pointer"
          >
            {/* Main Card */}
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white drop-shadow-lg" />
                </div>
                
                {/* Title */}
                <p className="text-gray-400 text-sm font-medium mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.title}
                </p>
                
                {/* Value */}
                <p className="text-white text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {stat.value}
                </p>
                
                {/* Change Indicator */}
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%
                  </span>
                  <span className="text-gray-500 text-xs">24h</span>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse group-hover:animate-ping"></div>
              <div className="absolute bottom-8 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-200"></div>
              
              {/* Scan Line Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Outer Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-300 -z-10`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;