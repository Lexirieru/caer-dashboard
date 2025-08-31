"use client";

import React, { useState } from "react";
import { BalanceDisplay } from "./BalanceDisplay";
import { IconChevronDown } from "@tabler/icons-react";

interface RelayerPageProps {
  sidebarOpen: boolean;
}

export function RelayerPage({ sidebarOpen }: RelayerPageProps) {
  const [isTestnet, setIsTestnet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('0xa5ea1Cb1033F5d3BD207bF6a2a2504cF1c3e9F42');
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);

  const WALLETS = [
    {
      address: '0xa5ea1Cb1033F5d3BD207bF6a2a2504cF1c3e9F42',
      label: 'Relayer Etherlink'
    },
    {
      address: '0xBB241303F947f6E223CA400aECEe04693e854b44',
      label: 'Relayer Core'
    }
  ];

  return (
    <div className="relative h-full overflow-hidden">
      {/* Full Screen Glass Dashboard Container */}
      <div className="relative z-10 h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="h-full">
          <div className="glass-container h-full p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col relative">
            {/* Top Right Controls - Responsive to Sidebar */}
            <div 
              className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4"
              style={{
                right: sidebarOpen ? "1.5rem" : "0.75rem",
                transition: "all 0.3s ease-in-out"
              }}
            >
              {/* Wallet Selector - Responsive to Sidebar */}
              <div 
                className="relative"
                style={{
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <button
                  onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  style={{
                    paddingLeft: sidebarOpen ? "0.625rem" : "0.5rem",
                    paddingRight: sidebarOpen ? "0.625rem" : "0.5rem",
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  {WALLETS.find(w => w.address === selectedWallet)?.label}
                  <IconChevronDown className="h-3 w-3 transition-transform duration-200" style={{ transform: isWalletDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                
                {isWalletDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full min-w-max bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50">
                    {WALLETS.map((wallet) => (
                      <button
                        key={wallet.address}
                        onClick={() => {
                          setSelectedWallet(wallet.address);
                          setIsWalletDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-white/20 ${
                          selectedWallet === wallet.address
                            ? 'bg-white/20 text-white'
                            : 'text-white/80'
                        }`}
                        style={{
                          fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                          transition: "all 0.3s ease-in-out"
                        }}
                      >
                        {wallet.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Network Toggle - Responsive to Sidebar */}
              <div 
                className="flex items-center gap-1 sm:gap-2"
                style={{
                  gap: sidebarOpen ? "0.5rem" : "0.25rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <span 
                  className="text-white/80 text-xs sm:text-sm"
                  style={{
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  Mainnet
                </span>
                <button
                  onClick={() => setIsTestnet(!isTestnet)}
                  className="relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors bg-transparent border border-white/20"
                  style={{
                    height: sidebarOpen ? "1.375rem" : "1.25rem",
                    width: sidebarOpen ? "2.5rem" : "2.25rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  <span
                    className="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
                    style={{
                      height: sidebarOpen ? "0.875rem" : "0.75rem",
                      width: sidebarOpen ? "0.875rem" : "0.75rem",
                      transform: isTestnet 
                        ? (sidebarOpen ? "translateX(1.375rem)" : "translateX(1.25rem)")
                        : "translateX(0.25rem)",
                      transition: "all 0.3s ease-in-out"
                    }}
                  />
                </button>
                <span 
                  className="text-white/80 text-xs sm:text-sm"
                  style={{
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  Testnet
                </span>
              </div>
            </div>

            {/* Header - Responsive to Sidebar */}
            <div 
              className="text-center mb-4 sm:mb-6 mt-8 sm:mt-0"
              style={{
                marginLeft: sidebarOpen ? "0px" : "0px",
                marginTop: sidebarOpen ? "0rem" : "2rem",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2"
                style={{
                  fontSize: sidebarOpen ? "2.5rem" : "2rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                Caer Dashboard
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80"
                style={{
                  fontSize: sidebarOpen ? "1.25rem" : "1.125rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                Multi-Chain Wallet Balance Monitor
              </p>
              <p 
                className="text-sm sm:text-base md:text-lg text-white/60 mt-2"
                style={{
                  fontSize: sidebarOpen ? "1rem" : "0.875rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
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
