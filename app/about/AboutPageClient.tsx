'use client';

import AboutContent from '@/components/AboutContent';
import { useLocale } from '@/context/LocaleContext';

export default function AboutPageClient() {
  const { locale } = useLocale();
  return <AboutContent locale={locale} />;
}
