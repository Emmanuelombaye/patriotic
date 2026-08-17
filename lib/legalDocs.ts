export const LEGAL_DOCS = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Efexia collects, uses, and protects patient information during clinical intake and care.',
    docId: '1KqqG02w2JGfX0MO6XV-xva3zY_LA-PoEufXpF4jm-sI',
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description:
      'The terms that govern use of Efexia telehealth services, intake, and related clinical protocols.',
    docId: '1JpEGqC3ppH84M83br1w5_4MAVXFaPpLlNrN80ap45cQ',
  },
  medicalConsent: {
    slug: 'medical-consent',
    title: 'Medical Consent',
    description:
      'Informed medical consent for specialized protocols reviewed by affiliated licensed clinicians.',
    docId: '1oKVJa7VfJws4zOSywOX0xxPZKjSST-sNQ4gFqZ4vFG8',
  },
  telehealthConsent: {
    slug: 'telehealth-consent',
    title: 'Telehealth Informed Consent',
    description:
      'Consent for telehealth evaluation, prescribing, and follow-up through Efexia affiliated clinicians.',
    docId: '1Hcn-t3q5S9XoeYE24FnAhrBveSiVkKX3ygqOVDj-6pg',
  },
  mensrx: {
    slug: 'mensrx',
    title: 'MensRX',
    description:
      'MensRX pharmacy and fulfillment information for prescriptions issued after licensed-provider review.',
    docId: '17WuPlOkyH8oM_N7U6jh_2Yr-QmUSNIbY39okRs_vNOU',
  },
} as const;

export type LegalDocKey = keyof typeof LEGAL_DOCS;

export function googleDocPreviewUrl(docId: string) {
  return `https://docs.google.com/document/d/${docId}/preview`;
}

export function googleDocViewUrl(docId: string) {
  return `https://docs.google.com/document/d/${docId}/edit?usp=sharing`;
}
