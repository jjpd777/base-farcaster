'use client';

import { useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function FramePage() {
  useEffect(() => {
    // Notify Farcaster that the frame is ready
    if (sdk) {
      sdk.actions.ready();
    }
  }, []);

  return (
    <div className="w-full max-w-[600px] mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Farcaster Frame Example</h1>
      <p className="text-center">This is a simple Farcaster Frame for the Base Sepolia app.</p>
    </div>
  );
}