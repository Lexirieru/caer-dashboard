'use client';

interface NetworkToggleProps {
  isTestnet: boolean;
  onToggle: () => void;
}

export function NetworkToggle({ isTestnet, onToggle }: NetworkToggleProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <span className="text-white/80 text-xs sm:text-sm">Mainnet</span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors bg-transparent border border-white/20"
      >
        <span
          className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
            isTestnet ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-white/80 text-xs sm:text-sm">Testnet</span>
    </div>
  );
}
