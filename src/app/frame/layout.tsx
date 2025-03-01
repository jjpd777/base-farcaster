
import { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '@/config';
import '../global.css';

export const metadata: Metadata = {
  title: 'Farcaster Frame',
  description: 'A Farcaster Frame for Base Sepolia app',
  // Frame metadata for Farcaster
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${NEXT_PUBLIC_URL}/favicon.ico`,
    'fc:frame:post_url': `${NEXT_PUBLIC_URL}/frame`,
    'fc:frame:button:1': 'Connect Wallet',
  },
};

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
