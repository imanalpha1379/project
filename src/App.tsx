import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [activeSection, setActiveSection] = useState('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner variant="cyber" size="lg" />
          <span className="text-cyan-400 font-mono">
            Initializing Neural Network...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Neon gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/15 via-transparent to-blue-900/15"></div>
        
        {/* Animated light rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/50 via-transparent to-transparent opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-400/40 via-transparent to-transparent opacity-30 animate-pulse delay-500"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-pink-400/30 via-transparent to-transparent opacity-25 animate-pulse delay-1000"></div>
        
        {/* Holographic grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px'
          }}></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/5 w-24 h-24 bg-gradient-to-r from-pink-400/15 to-orange-600/15 rounded-full blur-2xl animate-bounce delay-2000"></div>
        
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-300"></div>
        </div>
      </div>
      
      {/* Main Interface */}
      <div className="relative z-10 flex w-full">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <Dashboard activeSection={activeSection} />
      </div>
      
      {/* Glowing borders */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20"></div>
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent z-20"></div>
      <div className="fixed top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent z-20"></div>
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-pink-400/50 to-transparent z-20"></div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
