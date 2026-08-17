import type { Locale } from '@/lib/types';

export const TREATMENT_IDS = ['tirzepatide', 'semaglutide'] as const;

export type TreatmentId = (typeof TREATMENT_IDS)[number];

/** Public catalog — two treatments only. */
export const FEATURED_TREATMENT_IDS = TREATMENT_IDS;
export type FeaturedTreatmentId = TreatmentId;

const LABELS: Record<TreatmentId, { en: string; es: string }> = {
  tirzepatide: {
    en: 'Tirzepatide',
    es: 'Tirzepatida',
  },
  semaglutide: {
    en: 'Semaglutide',
    es: 'Semaglutida',
  },
};

export function isTreatmentId(value: string | null | undefined): value is TreatmentId {
  return !!value && (TREATMENT_IDS as readonly string[]).includes(value);
}

export function isFeaturedTreatmentId(
  value: string | null | undefined,
): value is FeaturedTreatmentId {
  return isTreatmentId(value);
}

export function getTreatmentLabel(id: TreatmentId, locale: Locale): string {
  return LABELS[id][locale] || LABELS[id].en;
}

/** Peak / compliance checkout — payment mode 2 only. */
export const COMPLIANCE_PAYMENT = 2;

export function startCheckoutHref(treatmentId?: TreatmentId | string | null): string {
  const params = new URLSearchParams({ payment: String(COMPLIANCE_PAYMENT) });
  if (treatmentId && isFeaturedTreatmentId(treatmentId)) {
    params.set('treatment', treatmentId);
  }
  return `/start?${params.toString()}`;
}
