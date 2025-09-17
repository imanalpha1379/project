import React, { useState } from 'react';
import { Bot, Play, Pause, Settings, TrendingUp, Activity, Zap } from 'lucide-react';
import { tradingBots } from '../data/mockData';

const BotPanel: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState(tradingBots[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'inactive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-400/20 to-green-600/20 border-green-400/30';
      case 'paused': return 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30';
      case 'inactive': return 'from-red-400/20 to-red-600/20 border-red-400/30';
      default: return 'from-gray-400/20 to-gray-600/20 border-gray-400/30';
    }
  };

  const toggleBotStatus = (botId: string) => {
    // Mock function - would integrate with actual bot API
    console.log(`Toggling bot ${botId}`);
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-cyan-500/5 to-blue-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg">
            <Bot size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Trading Bots</h2>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <Activity size={16} className="animate-pulse" />
          <span className="text-sm font-mono">NEURAL</span>
        </div>
      </div>

      {/* Bot List */}
      <div className="relative z-10 space-y-4 mb-6">
        {tradingBots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => setSelectedBot(bot)}
            className={`
              p-4 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden
              ${selectedBot.id === bot.id 
                ? 'bg-gradient-to-r from-cyan-500/20 via-green-500/20 to-blue-500/20 border border-cyan-400/40' 
                : 'bg-black/20 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-green-500/10 hover:to-blue-500/10 border border-gray-700/30 hover:border-cyan-400/20'
              }
            `}
          >
            {/* Selection Indicator */}
            {selectedBot.id === bot.id && (
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-400 via-cyan-400 to-blue-400"></div>
            )}
            
            <div className="flex items-center justify-between relative z-10">
              {/* Bot Info */}
              <div className="flex items-center space-x-4">
                <div className={`
                  relative w-12 h-12 rounded-xl flex items-center justify-center
                  bg-gradient-to-r ${getStatusBg(bot.status)} border
                `}>
                  <Bot size={20} className={`${getStatusColor(bot.status)}`} />
                  {bot.status === 'active' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{bot.name}</p>
                  <p className={`text-sm font-mono capitalize ${getStatusColor(bot.status)}`}>
                    {bot.status}
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg">
                    +${bot.profit.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">{bot.trades} trades</p>
                </div>
                
                <div className="text-right">
                  <p className="text-cyan-400 font-bold text-lg">{bot.winRate}%</p>
                  <p className="text-gray-400 text-sm">win rate</p>
                </div>
                
                {/* Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBotStatus(bot.id);
                    }}
                    className={`
                      p-2 rounded-lg transition-all duration-300 hover:scale-110
                      ${bot.status === 'active' 
                        ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400' 
                        : 'bg-green-400/20 hover:bg-green-400/30 text-green-400'
                      }
                    `}
                  >
                    {bot.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button className="p-2 rounded-lg bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Performance Bar */}
            <div className="mt-3 relative">
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-1000 relative"
                  style={{ width: `${bot.winRate}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Performance</span>
                <span>{bot.winRate}% efficiency</span>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Selected Bot Details */}
      <div className="relative z-10 p-4 bg-black/30 rounded-xl border border-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center space-x-2">
            <Zap size={16} className="text-green-400" />
            <span>{selectedBot.name} Analytics</span>
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              selectedBot.status === 'active' ? 'bg-green-400' : 
              selectedBot.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
            <span className="text-xs font-mono text-gray-400">
              {selectedBot.status === 'active' ? 'EXECUTING' : selectedBot.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Real-time Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg border border-green-400/20">
            <TrendingUp size={16} className="text-green-400 mx-auto mb-2" />
            <p className="text-green-400 text-xl font-bold">${selectedBot.profit.toLocaleString()}</p>
            <p className="text-gray-400 text-xs">Total Profit</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/20">
            <Activity size={16} className="text-cyan-400 mx-auto mb-2" />
            <p className="text-cyan-400 text-xl font-bold">{selectedBot.trades}</p>
            <p className="text-gray-400 text-xs">Total Trades</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
            <Bot size={16} className="text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xl font-bold">{selectedBot.winRate}%</p>
            <p className="text-gray-400 text-xs">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-green-400/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};

export default BotPanel;