'use client';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { ONCHAINKIT_LINK } from 'src/links';
import OnchainkitSvg from 'src/svg/OnchainkitSvg';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';


export default function Page() {
  const { address } = useAccount();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {!address ? (
          <LoginButton />
        ) : (
          <>
            <div className="absolute top-4 right-4">
              <WalletWrapper />
            </div>
            <TransactionWrapper address={address} />
          </>
        )}
      </div>
    </div>
  );
}
import dynamic from 'next/dynamic';

const MainContent = dynamic(() => import('src/components/MainContent'), {
  ssr: false,
});

export  function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="container flex flex-col items-center gap-8 px-4">
        <h1 className="text-4xl font-bold text-center">Faith Connect</h1>
        <p className="text-center max-w-md">
          Select your faith tradition and language preference to continue
        </p>
        <MainContent />
      </div>
    </main>
  );
}
