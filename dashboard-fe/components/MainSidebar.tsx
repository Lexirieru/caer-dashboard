"use client";

import { useState } from "react";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import {
  IconServer,
  IconTrophy,
  IconChevronDown,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { RelayerPage } from "./RelayerPage";

export function MainSidebar() {
  const links = [
    {
      label: "Relayer",
      href: "#relayer",
      icon: (
        <IconServer className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Hackathon",
      href: "#hackathon",
      icon: (
        <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("relayer");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody>
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(link.label.toLowerCase())}
                  className={cn(
                    "group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer",
                    open ? "gap-3 w-full" : "justify-center w-12",
                    currentPage === link.label.toLowerCase()
                      ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  )}
                >
                  <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                    {link.icon}
                  </div>
                  {open && (
                    <span className="whitespace-nowrap">
                      {link.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-hidden">
        {currentPage === "relayer" && <RelayerPage sidebarOpen={open} />}
        {currentPage === "hackathon" && <HackathonPage sidebarOpen={open} />}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <img 
        src="/caerwhitecut.png" 
        alt="Caer Logo" 
        className="h-5 w-6 shrink-0 object-contain"
      />
      <span className="font-medium whitespace-pre text-black dark:text-white">
        Caer Dashboard
      </span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center justify-center w-full py-1 text-sm font-normal text-black dark:text-white"
    >
      <img 
        src="/caerwhitecut.png" 
        alt="Caer Logo" 
        className="h-5 w-6 shrink-0 object-contain"
      />
    </a>
  );
};

// Hackathon page component with toggle buttons
const HackathonPage = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const [isTestnet, setIsTestnet] = useState(true);
  const [selectedHackathon, setSelectedHackathon] = useState('onchain-summer');
  const [isHackathonDropdownOpen, setIsHackathonDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState('base');
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  const hackathons = [
    {
      id: 'onchain-summer',
      name: 'Onchain Summer',
      status: 'active'
    },
    {
      id: 'kaia-hackathon',
      name: 'Kaia Hackathon',
      status: 'coming-soon'
    }
  ];

  const chains = [
    {
      id: "base",
      name: "Base Sepolia",
      logo: "/base.png"
    },
    {
      id: "arbitrum",
      name: "Arbitrum Sepolia",
      logo: "/arb.png"
    },
    {
      id: "optimism",
      name: "Optimism Sepolia",
      logo: "/op.png"
    }
  ];

  const tokens = [
    {
      id: "usdc",
      name: "USDC",
      image: "/usdcbase.png",
      baseImage: "/usdcbase.png",
      arbImage: "/usdcarb.png",
      opImage: "/usdcop.png"
    },
    {
      id: "usdt",
      name: "USDT",
      image: "/usdtbase.png",
      baseImage: "/usdtbase.png",
      arbImage: "/usdtarb.png",
      opImage: "/usdtop.png"
    },
    {
      id: "wbtc",
      name: "WBTC",
      image: "/wbtcbase.png",
      baseImage: "/wbtcbase.png",
      arbImage: "/wbtcarb.png",
      opImage: "/wbtcop.png"
    },
    {
      id: "weth",
      name: "WETH",
      image: "/wethbase.png",
      baseImage: "/wethbase.png",
      arbImage: "/wetharb.png",
      opImage: "/wethop.png"
    }
  ];

  return (
    <div className="relative h-full overflow-hidden">
      {/* Full Screen Glass Dashboard Container */}
      <div className="relative z-10 h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="h-full">
          <div className="glass-container h-full p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col relative">
            {/* Top Right Controls - Hackathon Selector + Network Toggle */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              {/* Hackathon Selector */}
              <div 
                className="relative"
                style={{
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <button
                  onClick={() => setIsHackathonDropdownOpen(!isHackathonDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  style={{
                    paddingLeft: sidebarOpen ? "0.625rem" : "0.5rem",
                    paddingRight: sidebarOpen ? "0.625rem" : "0.5rem",
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  {hackathons.find(h => h.id === selectedHackathon)?.name}
                  <IconChevronDown className="h-3 w-3 transition-transform duration-200" style={{ transform: isHackathonDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                
                {isHackathonDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50">
                    {hackathons.map((hackathon) => (
                      <button
                        key={hackathon.id}
                        onClick={() => {
                          if (hackathon.status === 'active') {
                            setSelectedHackathon(hackathon.id);
                            setIsHackathonDropdownOpen(false);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-white/20 ${
                          selectedHackathon === hackathon.id
                            ? 'bg-white/20 text-white'
                            : hackathon.status === 'coming-soon'
                            ? 'text-white/60 cursor-not-allowed opacity-50'
                            : 'text-white/80'
                        }`}
                        disabled={hackathon.status === 'coming-soon'}
                        style={{
                          fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                          transition: "all 0.3s ease-in-out"
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span>{hackathon.name}</span>
                          {hackathon.status === 'coming-soon' && (
                            <span className="text-xs text-white/40">(coming soon)</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Network Toggle */}
              <div 
                className="flex items-center gap-1 sm:gap-2"
                style={{
                  gap: sidebarOpen ? "0.5rem" : "0.25rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <span 
                  className="text-white/40 text-xs sm:text-sm"
                  style={{
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  Mainnet
                </span>
                <button
                  disabled={true}
                  className="relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors bg-transparent border border-white/20 cursor-not-allowed opacity-50"
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
                      transform: "translateX(1.25rem)",
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

            {/* Header */}
            <div 
              className="text-center mb-4 sm:mb-6 mt-24 sm:mt-8"
              style={{
                marginLeft: sidebarOpen ? "0px" : "0px",
                marginTop: sidebarOpen ? "2rem" : "4rem",
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
                Hackathon Dashboard
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80"
                style={{
                  fontSize: sidebarOpen ? "1.25rem" : "1.125rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                Cross-Chain Token Bridge Monitor
              </p>
              <p 
                className="text-sm sm:text-base md:text-lg text-white/60 mt-2"
                style={{
                  fontSize: sidebarOpen ? "1rem" : "0.875rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                Origin: Base
              </p>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-7xl mx-auto w-full px-4">
                {selectedHackathon === 'onchain-summer' ? (
                  // Onchain Summer - Token Tables
                  <div className="overflow-x-auto">
                    {/* Chain Selector */}
                    <div className="mb-6 flex justify-center overflow-visible">
                      <div className="relative z-[9998] overflow-visible">
                        <button
                          onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 bg-white/20 text-white border border-white/30 hover:bg-white/30"
                        >
                          <img
                            src={chains.find(c => c.id === selectedChain)?.logo}
                            alt={chains.find(c => c.id === selectedChain)?.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{chains.find(c => c.id === selectedChain)?.name}</span>
                          <IconChevronDown className="h-4 w-4 transition-transform duration-200" style={{ transform: isChainDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>
                        
                        {isChainDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-[9999] overflow-hidden">
                            {chains.map((chain, index) => (
                              <button
                                key={chain.id}
                                onClick={() => {
                                  setSelectedChain(chain.id);
                                  setIsChainDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/20 flex items-center gap-3 ${
                                  selectedChain === chain.id
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80'
                                } ${
                                  index === 0 ? 'rounded-t-lg' : ''
                                } ${
                                  index === chains.length - 1 ? 'rounded-b-lg' : ''
                                }`}
                              >
                                <img
                                  src={chain.logo}
                                  alt={chain.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{chain.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <table className="w-full min-w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">
                            Token
                          </th>
                          <th className="text-right p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">
                            Destination
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokens.map((token) => (
                          <tr key={token.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            {/* Token Column */}
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 p-1">
                                  <a
                                    href={selectedChain === 'base' ? 
                                      (token.id === 'usdc' ? 'https://sepolia.basescan.org/address/0xDa11C806176678e4228C904ec27014267e128fb5' :
                                       token.id === 'usdt' ? 'https://sepolia.basescan.org/address/0xA391a85B3B8D9cC90555E848aF803BF97067aA81' :
                                       token.id === 'wbtc' ? 'https://sepolia.basescan.org/address/0x7CC19AdfCB73A81A6769dC1A9f7f9d429b27f000' :
                                       token.id === 'weth' ? 'https://sepolia.basescan.org/address/0xB5155367af0Fab41d1279B059571715068dE263C' : '#') :
                                      selectedChain === 'arbitrum' ?
                                      (token.id === 'usdc' ? 'https://sepolia.arbiscan.io/address/0x1e965B05CF6336c3162a5CA0Eb9f7a908f0Bb6a6' :
                                       token.id === 'usdt' ? 'https://sepolia.arbiscan.io/address/0x4c7432B98a68E09B14C2d13F5B9e7fa4e8F6Ee66' :
                                       token.id === 'wbtc' ? 'https://sepolia.arbiscan.io/address/0xdDc6E8700d1207Ea9347793Ba84914Ae34A37c6D' :
                                       token.id === 'weth' ? 'https://sepolia.arbiscan.io/address/0x455Dd69cB8845354a240e68fc79508502024cf8D' : '#') :
                                      selectedChain === 'optimism' ?
                                      (token.id === 'usdc' ? 'https://sepolia-optimism.etherscan.io/address/0xd60DC891520f85Eb55346A077390D32b747fd30c' :
                                       token.id === 'usdt' ? 'https://sepolia-optimism.etherscan.io/address/0x7f6486552841bE742FC396C8AB1fa9Cb20053983' :
                                       token.id === 'wbtc' ? 'https://sepolia-optimism.etherscan.io/address/0xAc8C44c09Cfd282EBdE45CDFc7fd213402c5e614' :
                                       token.id === 'weth' ? 'https://sepolia-optimism.etherscan.io/address/0x4C1cA3C06ff0AFA986B68FF4C75b3357E6AB0D2A' : '#') :
                                      '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                  >
                                    <img
                                      src={selectedChain === 'base' ? token.image : selectedChain === 'arbitrum' ? token.arbImage : token.opImage}
                                      alt={token.name}
                                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain"
                                    />
                                  </a>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-white font-medium text-sm sm:text-base">
                                    {token.name}
                                  </span>
                                  <span className="text-white/60 text-xs sm:text-sm">
                                    {selectedChain === 'base' ? 'Base Sepolia' : selectedChain === 'arbitrum' ? 'Arbitrum Sepolia' : 'Optimism Sepolia'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            
                            {/* Chain Version Column */}
                            <td className="p-3 sm:p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {selectedChain === 'base' ? (
                                  <span className="text-white/40 text-lg font-medium">-</span>
                                ) : (
                                  <>
                                    <div className="flex-shrink-0 p-1">
                                      <a
                                        href={token.id === 'usdc' ? 'https://sepolia.basescan.org/address/0x8bdD245899fF5fcaB4C413FAFb0aa20748DD2E48' :
                                               token.id === 'usdt' ? 'https://sepolia.basescan.org/address/0x204f67926C8E32CDBEE3804d9eAAd1285E90F536' :
                                               token.id === 'wbtc' ? 'https://sepolia.basescan.org/address/0xbF5d87C06d9928F7C26F8e2c4389Bc7C9aC87Da4' :
                                               token.id === 'weth' ? 'https://sepolia.basescan.org/address/0xA610d431d569fd19F725161c7F1C2C0c52Ad06F9' : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                      >
                                        <img
                                          src="/arb.png"
                                          alt="Arbitrum"
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
                                        />
                                      </a>
                                    </div>
                                    <div className="flex-shrink-0 p-1">
                                      <a
                                        href={token.id === 'usdc' ? 'https://sepolia.basescan.org/address/0x0EDc826Bf5aDBD3A54925C34dF268786Ba4481cC' :
                                               token.id === 'usdt' ? 'https://sepolia.basescan.org/address/0x1959A5a8b287a2bbF32aC861A39cB6F6943121f9' :
                                               token.id === 'wbtc' ? 'https://sepolia.basescan.org/address/0xb89Fee7901055088e013dEFED1d0D9e180DB909D' :
                                               token.id === 'weth' ? 'https://sepolia.basescan.org/address/0x19d50139E91C6E5c97679a18D4700eeEcE0CDBF5' : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                      >
                                        <img
                                          src="/op.png"
                                          alt="Optimism"
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
                                        />
                                      </a>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  // Kaia Hackathon - Coming Soon
                  <div className="text-center">
                    <IconTrophy className="h-16 w-16 mx-auto text-white/40 mb-4" />
                    <h2 className="text-2xl font-bold text-white/60 mb-2">
                      Kaia Hackathon
                    </h2>
                    <p className="text-white/40">
                      Coming soon...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
