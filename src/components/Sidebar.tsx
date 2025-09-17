import React, { useState } from 'react';
import { 
  User, 
  History, 
  Package, 
  Users, 
  Bot, 
  Settings, 
  MoreHorizontal,
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'history', label: 'History', icon: History },
    { id: 'items', label: 'Items', icon: Package },
    { id: 'mlm', label: 'MLM', icon: Users },
    { id: 'bot', label: 'Bot', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'more', label: 'More', icon: MoreHorizontal }
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-black via-gray-900 to-black border-r border-cyan-500/20 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      {/* Logo Section */}
      <div className="p-8 border-b border-cyan-500/20 relative">
        <div className="relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            PimcoAI
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl rounded-lg opacity-50"></div>
        </div>
        <p className="text-cyan-300/60 text-sm mt-2 font-mono">Neural Trading Platform</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 text-cyan-300' 
                  : 'hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-purple-500/10 hover:to-pink-500/10 text-gray-400 hover:text-cyan-300'
                }
              `}
            >
              {/* Animated Background */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5 
                transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}></div>
              
              {/* Glowing Edge Effect */}
              {isActive && (
                <>
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"></div>
                  <div className="absolute inset-0 border border-cyan-400/20 rounded-xl animate-pulse"></div>
                </>
              )}
              
              {/* Icon */}
              <div className={`
                relative z-10 p-2 rounded-lg transition-all duration-300
                ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'group-hover:bg-cyan-400/10'}
              `}>
                <Icon size={20} className={`
                  transition-all duration-300 
                  ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]' : 'group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]'}
                `} />
              </div>
              
              {/* Label */}
              <span className={`
                relative z-10 font-medium transition-all duration-300
                ${isActive ? 'text-cyan-300 font-semibold' : 'group-hover:text-cyan-300'}
              `}>
                {item.label}
              </span>
              
              {/* Arrow Indicator */}
              <ChevronRight 
                size={16} 
                className={`
                  ml-auto transition-all duration-300 relative z-10
                  ${isActive 
                    ? 'text-cyan-300 transform translate-x-1' 
                    : 'text-gray-600 group-hover:text-cyan-400 group-hover:transform group-hover:translate-x-1'
                  }
                `} 
              />
              
              {/* Particle Effect */}
              {isHovered && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-75"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-400/20 rounded-full animate-ping delay-500"></div>
      </div>
    </div>
  );
};

export default Sidebar;