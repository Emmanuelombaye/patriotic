'use client';

import PatientIntake from '@/components/PatientIntake';
import type { Locale } from '@/lib/types';
import type { TreatmentId } from '@/lib/treatments';

type StartPageProps = {
  locale: Locale;
  treatmentId?: TreatmentId | null;
};

export default function StartPage({ locale, treatmentId = null }: StartPageProps) {
  return (
    <div className="start-page-container">
      <PatientIntake locale={locale} treatmentId={treatmentId} />
    </div>
  );
}
