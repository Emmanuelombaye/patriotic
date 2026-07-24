import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import SiteShell from '@/components/SiteShell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Efexia Wellness | Wellness, Wellbeing & Good Condition',
  description:
    'Efexia is the Greek word for wellness, wellbeing, or the state of good condition. A nationwide telehealth clinic helping men restore strength, energy, confidence, and vitality through modern physician-guided treatment.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap"
        />
        <link rel="preload" as="image" type="image/webp" href="/efexia-logo-384.webp" />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/images/hero-bg-960.avif"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/images/hero-bg.avif"
          media="(min-width: 768px)"
        />
      </head>
      <body>
        <LocaleProvider>
          <SiteShell>{children}</SiteShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
