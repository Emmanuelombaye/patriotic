'use client';

import TreatmentDetails from '@/components/TreatmentDetails';
import { useLocale } from '@/context/LocaleContext';

export default function TreatmentRoutePage() {
  const { locale } = useLocale();
  return <TreatmentDetails locale={locale} />;
}
