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

/** Displayed monthly price if a licensed provider prescribes. */
export const TREATMENT_PRICE: Record<TreatmentId, number> = {
  semaglutide: 239,
  tirzepatide: 345,
};

export const STARTING_PRICE = TREATMENT_PRICE.semaglutide;

export function getTreatmentPrice(id: TreatmentId): number {
  return TREATMENT_PRICE[id];
}

export function formatUsd(amount: number): string {
  return `$${amount}`;
}

/** Peak checkout query mode — not the displayed dollar amount. */
export const COMPLIANCE_PAYMENT = 2;

export function startCheckoutHref(treatmentId?: TreatmentId | string | null): string {
  const params = new URLSearchParams({ payment: String(COMPLIANCE_PAYMENT) });
  if (treatmentId && isFeaturedTreatmentId(treatmentId)) {
    params.set('treatment', treatmentId);
  }
  return `/start?${params.toString()}`;
}
