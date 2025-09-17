import React, { useState } from 'react';
import { Image, Star, TrendingUp, Eye } from 'lucide-react';
import { nftData } from '../data/mockData';

const NFTGallery: React.FC = () => {
  const [hoveredNFT, setHoveredNFT] = useState<string | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-400 to-orange-500';
      case 'Epic': return 'from-purple-400 to-pink-500';
      case 'Rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'shadow-[0_0_30px_rgba(255,165,0,0.3)]';
      case 'Epic': return 'shadow-[0_0_30px_rgba(168,85,247,0.3)]';
      case 'Rare': return 'shadow-[0_0_30px_rgba(59,130,246,0.3)]';
      default: return 'shadow-[0_0_15px_rgba(107,114,128,0.2)]';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
            <Image size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">NFT Collection</h2>
        </div>
        <div className="flex items-center space-x-2 text-purple-400">
          <Eye size={16} />
          <span className="text-sm font-mono">SHOWCASE</span>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nftData.map((nft) => (
          <div
            key={nft.id}
            onMouseEnter={() => setHoveredNFT(nft.id)}
            onMouseLeave={() => setHoveredNFT(null)}
            className={`
              group cursor-pointer relative overflow-hidden rounded-xl transition-all duration-500
              ${hoveredNFT === nft.id ? getRarityGlow(nft.rarity) : ''}
            `}
          >
            {/* Main Card */}
            <div className="bg-black/50 border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-purple-400/40 group-hover:bg-black/70">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Rarity Badge */}
                <div className={`
                  absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white
                  bg-gradient-to-r ${getRarityColor(nft.rarity)}
                  shadow-lg backdrop-blur-sm border border-white/20
                `}>
                  {nft.rarity}
                </div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black/70 backdrop-blur-md rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>

                {/* Scan Line Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {/* Name and Collection */}
                <div className="mb-3">
                  <h3 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors duration-300">
                    {nft.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-mono">{nft.collection}</p>
                </div>
                
                {/* Price and Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white font-bold text-sm">{nft.price} ETH</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400" />
                    <TrendingUp size={12} className="text-green-400" />
                  </div>
                </div>
                
                {/* Progress Bar (Mock Data) */}
                <div className="mt-3">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getRarityColor(nft.rarity)} transition-all duration-1000`}
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Holographic Border Effect */}
            {hoveredNFT === nft.id && (
              <div className={`
                absolute inset-0 bg-gradient-to-r ${getRarityColor(nft.rarity)} 
                opacity-20 rounded-xl animate-pulse -z-10 blur-md
              `}></div>
            )}
            
            {/* Floating Particles */}
            {hoveredNFT === nft.id && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce delay-200"></div>
                <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-400"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Collection Stats */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-black/30 rounded-lg border border-purple-500/20">
          <p className="text-purple-400 text-2xl font-bold">47</p>
          <p className="text-gray-400 text-xs">Total NFTs</p>
        </div>
        <div className="text-center p-3 bg-black/30 rounded-lg border border-cyan-500/20">
          <p className="text-cyan-400 text-2xl font-bold">12.5</p>
          <p className="text-gray-400 text-xs">Floor Price</p>
        </div>
        <div className="text-center p-3 bg-black/30 rounded-lg border border-pink-500/20">
          <p className="text-pink-400 text-2xl font-bold">285</p>
          <p className="text-gray-400 text-xs">Volume ETH</p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-purple-400/40 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  );
};

export default NFTGallery;