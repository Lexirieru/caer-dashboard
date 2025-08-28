'use client';

import { useAccount, useBalance } from 'wagmi';
import { mainnet, bsc, arbitrum, optimism, avalanche, base, linea, sepolia, bscTestnet, arbitrumSepolia, optimismSepolia, avalancheFuji, baseSepolia } from 'wagmi/chains';

// Define Core mainnet
const core = {
  id: 1116,
  name: 'Core',
  nativeCurrency: {
    decimals: 18,
    name: 'Core',
    symbol: 'CORE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.coredao.org/'],
    },
    public: {
      http: ['https://rpc.coredao.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Core Explorer',
      url: 'https://scan.coredao.org',
    },
  },
} as const;

// Define Core testnet
const coreTestnet = {
  id: 1114,
  name: 'Core Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Core',
    symbol: 'tCORE2',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test2.btcs.network'],
    },
    public: {
      http: ['https://rpc.test2.btcs.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Core Testnet Explorer',
      url: 'https://scan.test.btcs.network',
    },
  },
} as const;

// Define Etherlink mainnet
const etherlink = {
  id: 42793,
  name: 'Etherlink',
  nativeCurrency: {
    decimals: 18,
    name: 'Tezos',
    symbol: 'XTZ',
  },
  rpcUrls: {
    default: {
      http: ['https://node.mainnet.etherlink.com'],
    },
    public: {
      http: ['https://node.mainnet.etherlink.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherlink Explorer',
      url: 'https://explorer.etherlink.com',
    },
  },
} as const;

// Define Etherlink testnet
const etherlinkTestnet = {
  id: 128123,
  name: 'Etherlink Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Tezos',
    symbol: 'XTZ',
  },
  rpcUrls: {
    default: {
      http: ['https://node.ghostnet.etherlink.com'],
    },
    public: {
      http: ['https://node.ghostnet.etherlink.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherlink Testnet Explorer',
      url: 'https://explorer.ghostnet.etherlink.com',
    },
  },
} as const;

// Define Kaia mainnet
const kaia = {
  id: 8217,
  name: 'Kaia',
  nativeCurrency: {
    decimals: 18,
    name: 'Kaia',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en.node.kaia.io'],
    },
    public: {
      http: ['https://public-en.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kaia Explorer',
      url: 'https://explorer.kaia.io',
    },
  },
} as const;

// Define Kaia Kairos testnet
const kaiaKairos = {
  id: 1001,
  name: 'Kaia Kairos',
  nativeCurrency: {
    decimals: 18,
    name: 'Kaia',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en-kairos.node.kaia.io'],
    },
    public: {
      http: ['https://public-en-kairos.node.kaia.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kaia Kairos Explorer',
      url: 'https://kairos-explorer.kaia.io',
    },
  },
} as const;

// Define Linea testnet with correct RPC
const lineaTestnet = {
  id: 59141,
  name: 'Linea Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.linea.build'],
    },
    public: {
      http: ['https://rpc.sepolia.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Linea Sepolia Explorer',
      url: 'https://sepolia.lineascan.build',
    },
  },
} as const;

const mainnetChains = [
  { id: avalanche.id, name: 'Avalanche', symbol: 'AVAX' },
  { id: arbitrum.id, name: 'Arbitrum', symbol: 'ETH' },
  { id: base.id, name: 'Base', symbol: 'ETH' },
  { id: bsc.id, name: 'BSC', symbol: 'BNB' },
  { id: core.id, name: 'Core', symbol: 'CORE' },
  { id: mainnet.id, name: 'Ethereum', symbol: 'ETH' },
  { id: etherlink.id, name: 'Etherlink', symbol: 'XTZ' },
  { id: kaia.id, name: 'Kaia', symbol: 'KAIA' },
  { id: linea.id, name: 'Linea', symbol: 'ETH' },
  { id: optimism.id, name: 'Optimism', symbol: 'ETH' },
];

const testnetChains = [
  { id: avalancheFuji.id, name: 'Avalanche Fuji', symbol: 'AVAX' },
  { id: arbitrumSepolia.id, name: 'Arbitrum Sepolia', symbol: 'ETH' },
  { id: baseSepolia.id, name: 'Base Sepolia', symbol: 'ETH' },
  { id: bscTestnet.id, name: 'BSC Testnet', symbol: 'tBNB' },
  { id: coreTestnet.id, name: 'Core Testnet', symbol: 'tCORE2' },
  { id: etherlinkTestnet.id, name: 'Etherlink Testnet', symbol: 'XTZ' },
  { id: sepolia.id, name: 'Sepolia', symbol: 'ETH' },
  { id: kaiaKairos.id, name: 'Kaia Kairos', symbol: 'KAIA' },
  { id: lineaTestnet.id, name: 'Linea Testnet', symbol: 'ETH' },
  { id: optimismSepolia.id, name: 'Optimism Sepolia', symbol: 'ETH' },
];

interface BalanceDisplayProps {
  isTestnet: boolean;
}

export function BalanceDisplay({ isTestnet }: BalanceDisplayProps) {
  const { address, isConnected } = useAccount();
  const chains = isTestnet ? testnetChains : mainnetChains;

  if (!isConnected || !address) {
    return (
      <div className="text-center text-white/60">
        Connect your wallet to view balances
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">Chain</th>
            <th className="text-right p-2 sm:p-3 text-white/80 font-medium text-sm sm:text-base">Balance</th>
          </tr>
        </thead>
        <tbody>
          {chains.map((chain) => (
            <TableRow
              key={chain.id}
              chainId={chain.id}
              chainName={chain.name}
              symbol={chain.symbol}
              address={address}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ 
  chainId, 
  chainName, 
  symbol, 
  address 
}: { 
  chainId: number; 
  chainName: string; 
  symbol: string; 
  address: string; 
}) {
  const { data: balance, isLoading, error } = useBalance({
    address: address as `0x${string}`,
    chainId,
  });

  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
      <td className="p-2 sm:p-3 text-white/80 text-sm sm:text-base">{chainName}</td>
      <td className="p-2 sm:p-3 text-right text-white font-medium text-sm sm:text-base">
        {isLoading ? (
          <span className="text-white/60">Loading...</span>
        ) : error ? (
          <span className="text-red-400">Error</span>
        ) : (
          `${Number(balance?.formatted || 0).toFixed(8)} ${symbol}`
        )}
      </td>
    </tr>
  );
}
