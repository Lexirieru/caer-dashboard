import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, bsc, arbitrum, optimism, avalanche, base, linea, zora, sepolia, bscTestnet, arbitrumSepolia, optimismSepolia, avalancheFuji, baseSepolia } from 'wagmi/chains';

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

// Define Zora Sepolia with correct RPC
const zoraSepolia = {
  id: 999999999,
  name: 'Zora Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.rpc.zora.energy'],
    },
    public: {
      http: ['https://sepolia.rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Zora Sepolia Explorer',
      url: 'https://sepolia.explorer.zora.energy',
    },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'CAER Dashboard',
  projectId: 'YOUR_PROJECT_ID', // You can get this from WalletConnect Cloud
  chains: [
    // Mainnet chains
    mainnet,
    bsc,
    arbitrum,
    optimism,
    avalanche,
    base,
    core,
    etherlink,
    linea,
    zora,
    kaia,
    // Testnet chains
    sepolia,
    bscTestnet,
    arbitrumSepolia,
    optimismSepolia,
    avalancheFuji,
    baseSepolia,
    coreTestnet,
    etherlinkTestnet,
    lineaTestnet,
    zoraSepolia,
    kaiaKairos,
  ],
  ssr: true,
});
