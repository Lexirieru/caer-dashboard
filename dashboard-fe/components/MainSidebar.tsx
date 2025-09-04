"use client";

import { useState, useEffect } from "react";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import {
  IconServer,
  IconTrophy,
  IconChevronDown,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { RelayerPage } from "./RelayerPage";
import { useReadContract } from "wagmi";
import { mockUsdcAbi } from "@/lib/abis/testnet/base/mockUsdcAbi";
import { mockUsdtAbi } from "@/lib/abis/testnet/base/mockUsdtAbi";
import { mockWbtcAbi } from "@/lib/abis/testnet/base/mockWbtcAbi";
import { mockWethAbi } from "@/lib/abis/testnet/base/mockWethAbi";
import { usdcAbi } from "@/lib/abis/mainnet/base/usdcAbi";
import { usdtAbi } from "@/lib/abis/mainnet/base/usdtAbi";
import { wbtcAbi } from "@/lib/abis/mainnet/base/wbtcAbi";
import { wethAbi } from "@/lib/abis/mainnet/base/wethAbi";

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
      label: "Onchain Summer",
      href: "#onchain-summer",
      icon: (
        <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Kaia Hackathon",
      href: "#kaia-hackathon",
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
        {currentPage === "onchain summer" && <OnchainSummerPage sidebarOpen={open} />}
        {currentPage === "kaia hackathon" && <KaiaHackathonPage sidebarOpen={open} />}
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

// Onchain Summer page component
const OnchainSummerPage = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const [isTestnet, setIsTestnet] = useState(true);
  
  // Chain ID mappings
  const testnetChainIds = {
    arbitrum: 421614, // Arbitrum Sepolia
    optimism: 11155420, // Optimism Sepolia
  };

  const mainnetChainIds = {
    arbitrum: 42161, // Arbitrum Mainnet
    optimism: 10, // Optimism Mainnet
  };

  // Available chains for dropdown based on network
  const testnetChains = [
    { id: 'arbitrum', name: 'Arbitrum Sepolia', chainId: testnetChainIds.arbitrum, image: '/arb.png' },
    { id: 'optimism', name: 'Optimism Sepolia', chainId: testnetChainIds.optimism, image: '/op.png' }
  ];

  const mainnetChains = [
    { id: 'arbitrum', name: 'Arbitrum Mainnet', chainId: mainnetChainIds.arbitrum, image: '/arb.png' },
    { id: 'optimism', name: 'Optimism Mainnet', chainId: mainnetChainIds.optimism, image: '/op.png' }
  ];

  const availableChains = isTestnet ? testnetChains : mainnetChains;
  const currentChainIds = isTestnet ? testnetChainIds : mainnetChainIds;

  // Token contract addresses
  const testnetTokenAddresses = {
    usdc: "0xDa11C806176678e4228C904ec27014267e128fb5",
    usdt: "0xA391a85B3B8D9cC90555E848aF803BF97067aA81", 
    wbtc: "0x7CC19AdfCB73A81A6769dC1A9f7f9d429b27f000",
    weth: "0xB5155367af0Fab41d1279B059571715068dE263C"
  };

  const mainnetTokenAddresses = {
    usdc: "0x04C37dc1b538E00b31e6bc883E16d97cD7937a10", // MOCK_USDC
    usdt: "0x4Ba8D8083e7F3652CCB084C32652e68566E9Ef23", // MOCK_USDT
    wbtc: "0x5C368bd6cE77b2ca47B4ba791fCC1f1645591c84", // MOCK_WBTC
    weth: "0xC327486Db1417644f201d84414bbeA6C8A948bef"  // MOCK_WETH
  };

  const tokenAddresses = isTestnet ? testnetTokenAddresses : mainnetTokenAddresses;

  // Token ABIs
  const testnetTokenAbis = {
    usdc: mockUsdcAbi,
    usdt: mockUsdtAbi,
    wbtc: mockWbtcAbi,
    weth: mockWethAbi
  };

  const mainnetTokenAbis = {
    usdc: usdcAbi,
    usdt: usdtAbi,
    wbtc: wbtcAbi,
    weth: wethAbi
  };

  const tokenAbis = isTestnet ? testnetTokenAbis : mainnetTokenAbis;


  const tokens = [
    {
      id: "usdc",
      name: "USDC",
      image: "/usdcbase.png"
    },
    {
      id: "usdt",
      name: "USDT",
      image: "/usdtbase.png"
    },
    {
      id: "wbtc",
      name: "WBTC",
      image: "/wbtcbase.png"
    },
    {
      id: "weth",
      name: "WETH",
      image: "/wethbase.png"
    }
  ];

  // TokenRow component for each token with its own dropdown
  const TokenRow = ({ token }: { token: typeof tokens[0] }) => {
    const [selectedChain, setSelectedChain] = useState('arbitrum');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Read bridge token sender for the selected chain
    const { 
      data: bridgeSender, 
      isLoading, 
      error 
    } = useReadContract({
      address: tokenAddresses[token.id as keyof typeof tokenAddresses] as `0x${string}`,
      abi: tokenAbis[token.id as keyof typeof tokenAbis],
      functionName: "bridgeTokenSenders",
      args: [BigInt(availableChains.find(c => c.id === selectedChain)?.chainId || currentChainIds.arbitrum), BigInt(0)],
      chainId: isTestnet ? 84532 : 8453, // Always read from Base (Sepolia or Mainnet)
    });

    const getExplorerUrl = (address: string) => {
      return isTestnet 
        ? `https://sepolia.basescan.org/address/${address}`
        : `https://basescan.org/address/${address}`;
    };

    const getTokenImage = (tokenId: string, chainId: number) => {
      const tokenImages = {
        usdc: {
          arbitrum: '/usdcarb.png',
          optimism: '/usdcop.png'
        },
        usdt: {
          arbitrum: '/usdtarb.png',
          optimism: '/usdtop.png'
        },
        wbtc: {
          arbitrum: '/wbtcarb.png',
          optimism: '/wbtcop.png'
        },
        weth: {
          arbitrum: '/wetharb.png',
          optimism: '/wethop.png'
        }
      };

      if (chainId === testnetChainIds.arbitrum || chainId === mainnetChainIds.arbitrum) {
        return tokenImages[tokenId as keyof typeof tokenImages]?.arbitrum || token.image;
      } else if (chainId === testnetChainIds.optimism || chainId === mainnetChainIds.optimism) {
        return tokenImages[tokenId as keyof typeof tokenImages]?.optimism || token.image;
      }
      return token.image;
    };

    return (
      <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
        {/* Token Column */}
        <td className="w-1/3 p-3 sm:p-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 p-1">
              <a
                href={`https://sepolia.basescan.org/address/${tokenAddresses[token.id as keyof typeof tokenAddresses]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain"
                />
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm sm:text-base">
                {token.name}
              </span>
              <div className="flex flex-col">
                <span className="text-white/60 text-xs sm:text-sm">
                  {isTestnet ? 'Base Sepolia' : 'Base Mainnet'}
                </span>
                <a
                  href={`${isTestnet ? 'https://sepolia.basescan.org' : 'https://basescan.org'}/address/${tokenAddresses[token.id as keyof typeof tokenAddresses]}#readContract`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs underline"
                >
                  View Contract
                </a>
              </div>
            </div>
          </div>
        </td>
        
        {/* Chain Column with Dropdown */}
        <td className="w-1/3 p-3 sm:p-4">
          <div className="flex items-center justify-center">
            {/* Chain Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-white/20 text-white border border-white/30 hover:bg-white/30"
              >
                <img
                  src={availableChains.find(c => c.id === selectedChain)?.image}
                  alt={availableChains.find(c => c.id === selectedChain)?.name}
                  className="w-5 h-5 rounded-full"
                />
                <IconChevronDown className="h-4 w-4 transition-transform duration-200 flex-shrink-0" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
                  {availableChains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setSelectedChain(chain.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-center px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/20 flex items-center justify-center gap-3 ${
                        selectedChain === chain.id
                          ? 'bg-white/20 text-white'
                          : 'text-white/80'
                      }`}
                    >
                      <img
                        src={chain.image}
                        alt={chain.name}
                        className="w-5 h-5 rounded-full"
                      />
                      {chain.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </td>

        {/* Bridge Token Senders Column */}
        <td className="w-1/3 p-3 sm:p-4">
          <div className="flex items-center justify-end">
            {/* Bridge Token Display */}
            <div className="flex-shrink-0">
              {isLoading ? (
                <div className="relative">
                  <img
                    src={getTokenImage(token.id, availableChains.find(c => c.id === selectedChain)?.chainId || currentChainIds.arbitrum)}
                    alt={`${token.name} on ${availableChains.find(c => c.id === selectedChain)?.name}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain opacity-50"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              ) : error ? (
                <div className="relative opacity-50">
                  <img
                    src={getTokenImage(token.id, availableChains.find(c => c.id === selectedChain)?.chainId || currentChainIds.arbitrum)}
                    alt={`${token.name} on ${availableChains.find(c => c.id === selectedChain)?.name}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
              ) : bridgeSender && bridgeSender !== "0x0000000000000000000000000000000000000000" ? (
                <a
                  href={getExplorerUrl(bridgeSender as string)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title={`Bridge Sender: ${bridgeSender as string}`}
                >
                  <div className="relative">
                    <img
                      src={getTokenImage(token.id, availableChains.find(c => c.id === selectedChain)?.chainId || currentChainIds.arbitrum)}
                      alt={`${token.name} on ${availableChains.find(c => c.id === selectedChain)?.name}`}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </a>
              ) : (
                <div className="relative opacity-50">
                  <img
                    src={getTokenImage(token.id, availableChains.find(c => c.id === selectedChain)?.chainId || currentChainIds.arbitrum)}
                    alt={`${token.name} on ${availableChains.find(c => c.id === selectedChain)?.name}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Full Screen Glass Dashboard Container */}
      <div className="relative z-10 h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="h-full">
          <div className="glass-container h-full p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col relative">
            {/* Top Right Controls - Network Toggle */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">

              {/* Network Toggle */}
              <div 
                className="flex items-center gap-1 sm:gap-2"
                style={{
                  gap: sidebarOpen ? "0.5rem" : "0.25rem",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <span 
                  className={`text-xs sm:text-sm transition-colors ${
                    !isTestnet ? 'text-white/80' : 'text-white/40'
                  }`}
                  style={{
                    fontSize: sidebarOpen ? "0.8125rem" : "0.75rem",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  Mainnet
                </span>
                <button
                  onClick={() => setIsTestnet(!isTestnet)}
                  className="relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors bg-transparent border border-white/20 hover:border-white/40"
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
                      transform: isTestnet ? "translateX(1.25rem)" : "translateX(0.25rem)",
                      transition: "all 0.3s ease-in-out"
                    }}
                  />
                </button>
                <span 
                  className={`text-xs sm:text-sm transition-colors ${
                    isTestnet ? 'text-white/80' : 'text-white/40'
                  }`}
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
                Onchain Summer
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
                Origin: {isTestnet ? 'Base Sepolia' : 'Base Mainnet'}
              </p>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-full px-4">
                {/* Onchain Summer - Token Tables */}
                <div className="w-full">
                  <table className="w-full table-fixed">
                      <thead>
                        <tr className="border-b border-white/20">
                        <th className="w-1/3 text-left p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">
                            Token
                          </th>
                        <th className="w-1/3 text-center p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">
                          Chain
                        </th>
                        <th className="w-1/3 text-right p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">
                          bridgeTokenSenders
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokens.map((token) => (
                        <TokenRow key={token.id} token={token} />
                        ))}
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Kaia Hackathon page component
const KaiaHackathonPage = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Full Screen Glass Dashboard Container */}
      <div className="relative z-10 h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="h-full">
          <div className="glass-container h-full p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col relative">
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
                Kaia Hackathon
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
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-7xl mx-auto w-full px-4">
                {/* Kaia Hackathon - Coming Soon */}
                  <div className="text-center">
                    <IconTrophy className="h-16 w-16 mx-auto text-white/40 mb-4" />
                    <h2 className="text-2xl font-bold text-white/60 mb-2">
                      Kaia Hackathon
                    </h2>
                    <p className="text-white/40">
                      Coming soon...
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
