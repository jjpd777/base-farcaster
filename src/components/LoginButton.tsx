'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[120px] py-3 px-6 text-lg font-medium"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
