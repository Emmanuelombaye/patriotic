'use client';

import StartPage from '@/components/StartPage';
import { useLocale } from '@/context/LocaleContext';

export default function StartRoutePage() {
  const { locale } = useLocale();
  return <StartPage locale={locale} />;
}
