
'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import LoginButton from '@/components/LoginButton';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWagmiConfig } from '@/wagmi';

// Initialize QueryClient for React Query
const queryClient = new QueryClient();

export default function FramePage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const wagmiConfig = useWagmiConfig();

  useEffect(() => {
    const load = async () => {
      // Notify Farcaster that our frame is ready
      sdk.actions.ready();
    };
    
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full max-w-[600px] mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold text-center mb-8">Connect Your Wallet</h1>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
