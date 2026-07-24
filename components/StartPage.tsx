'use client';

import PatientIntake from '@/components/PatientIntake';
import type { Locale } from '@/lib/types';

type StartPageProps = {
  locale: Locale;
};

export default function StartPage({ locale }: StartPageProps) {
  return (
    <div className="start-page-container">
      <PatientIntake locale={locale} />
    </div>
  );
}
