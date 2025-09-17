import React from 'react';
import StatsCards from './StatsCards';
import TradingPanel from './TradingPanel';
import NFTGallery from './NFTGallery';
import BotPanel from './BotPanel';

interface DashboardProps {
  activeSection: string;
}

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TradingPanel />
              <NFTGallery />
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
                <p className="text-gray-400">Advanced trading history with AI-powered analytics coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'items':
        return (
          <div className="space-y-8">
            <NFTGallery />
          </div>
        );
      case 'mlm':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">Multi-Level Marketing</h2>
                <p className="text-gray-400">Referral network and rewards system interface in development...</p>
              </div>
            </div>
          </div>
        );
      case 'bot':
        return (
          <div className="space-y-8">
            <BotPanel />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-cyan-500/5 to-blue-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">System Settings</h2>
                <p className="text-gray-400">Advanced configuration panel and preferences coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'more':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-orange-500/5 to-red-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">Additional Features</h2>
                <p className="text-gray-400">Extended functionality and advanced tools will be available here...</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <TradingPanel />
              <div className="space-y-8">
                <NFTGallery />
                <BotPanel />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400/35 rounded-full animate-pulse delay-1500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;