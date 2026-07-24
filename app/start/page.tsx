'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StartPage from '@/components/StartPage';
import { useLocale } from '@/context/LocaleContext';
import { isTreatmentId } from '@/lib/treatments';

function StartRouteInner() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const raw = searchParams.get('treatment');
  const treatmentId = isTreatmentId(raw) ? raw : null;

  return <StartPage locale={locale} treatmentId={treatmentId} />;
}

export default function StartRoutePage() {
  return (
    <Suspense fallback={<div className="start-page-container" />}>
      <StartRouteInner />
    </Suspense>
  );
}
