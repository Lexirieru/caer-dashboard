'use client';

interface WalletSelectorProps {
  selectedWallet: string;
  onWalletChange: (wallet: string) => void;
}

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

export function WalletSelector({ selectedWallet, onWalletChange }: WalletSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/80 text-xs sm:text-sm">Wallet:</span>
      <div className="flex bg-white/10 rounded-lg p-1">
        {WALLETS.map((wallet, index) => (
          <button
            key={wallet.address}
            onClick={() => onWalletChange(wallet.address)}
            className={`px-2 py-1 text-xs sm:text-sm rounded transition-colors ${
              selectedWallet === wallet.address
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            {wallet.label}
          </button>
        ))}
      </div>
    </div>
  );
}
