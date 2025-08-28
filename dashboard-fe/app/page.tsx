"use client";

import { useState } from "react";
import Plasma from "../components/Plasma";
import { BalanceDisplay } from "../components/BalanceDisplay";
import { NetworkToggle } from "../components/NetworkToggle";
import { WalletSelector } from "../components/WalletSelector";

export default function Home() {
  const [isTestnet, setIsTestnet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('0xa5ea1Cb1033F5d3BD207bF6a2a2504cF1c3e9F42');

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Plasma Background */}
      <div className="fixed inset-0 z-0">
        <Plasma 
          color="#808080"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>
      
      {/* Full Screen Glass Dashboard Container */}
      <div className="relative z-10 h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="h-full">
          <div className="glass-container h-full p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col relative">
            {/* Top Right Controls */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              <WalletSelector 
                selectedWallet={selectedWallet}
                onWalletChange={setSelectedWallet}
              />
              <NetworkToggle 
                isTestnet={isTestnet} 
                onToggle={() => setIsTestnet(!isTestnet)} 
              />
            </div>
            
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6 mt-8 sm:mt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                Caer Dashboard
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Multi-Chain Wallet Balance Monitor
              </p>
              <p className="text-xs sm:text-sm text-white/60 mt-2">
                Monitoring: {selectedWallet}
              </p>
            </div>
            
            {/* Balance Display Section - Mobile & Exit Fullscreen: absolute positioning, Full Desktop: flex */}
            <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2">
              <BalanceDisplay isTestnet={isTestnet} walletAddress={selectedWallet} />
            </div>
            
            <div className="hidden md:flex flex-1 flex-col justify-center">
              <div className="max-w-7xl mx-auto w-full px-4">
                <BalanceDisplay isTestnet={isTestnet} walletAddress={selectedWallet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

