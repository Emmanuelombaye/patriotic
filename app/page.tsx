'use client';

import Home from '@/components/Home';
import { useLocale } from '@/context/LocaleContext';

export default function HomePage() {
  const { locale } = useLocale();
  return <Home locale={locale} />;
}
