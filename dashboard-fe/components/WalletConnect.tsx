'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function WalletConnect() {
  const { isConnected } = useAccount();

  return (
    <div className={isConnected ? "flex justify-end" : "flex justify-center w-full"}>
      <ConnectButton 
        showBalance={false}
        chainStatus="none"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
}
