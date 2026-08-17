import type { Locale } from '@/lib/types';

export const TREATMENT_IDS = [
  'trt',
  'ed',
  'weight',
  'hair',
  'wellness',
  'peptide',
] as const;

export type TreatmentId = (typeof TREATMENT_IDS)[number];

/** Public checkout catalog for certification — two treatments only. */
export const FEATURED_TREATMENT_IDS = ['trt', 'weight'] as const;
export type FeaturedTreatmentId = (typeof FEATURED_TREATMENT_IDS)[number];

const LABELS: Record<TreatmentId, { en: string; es: string }> = {
  trt: {
    en: 'Testosterone Replacement Therapy (TRT)',
    es: 'Terapia de Reemplazo de Testosterona (TRT)',
  },
  ed: {
    en: 'Erectile Dysfunction Treatment',
    es: 'Tratamiento de la Disfunción Eréctil',
  },
  weight: {
    en: 'Weight Loss Programs',
    es: 'Programas de Pérdida de Peso',
  },
  hair: {
    en: 'Hair Restoration',
    es: 'Restauración Capilar',
  },
  wellness: {
    en: "Men's Wellness Optimization",
    es: 'Optimización del Bienestar Masculino',
  },
  peptide: {
    en: 'Regenerative Therapy',
    es: 'Terapia Regenerativa',
  },
};

export function isTreatmentId(value: string | null | undefined): value is TreatmentId {
  return !!value && (TREATMENT_IDS as readonly string[]).includes(value);
}

export function isFeaturedTreatmentId(
  value: string | null | undefined,
): value is FeaturedTreatmentId {
  return !!value && (FEATURED_TREATMENT_IDS as readonly string[]).includes(value);
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
