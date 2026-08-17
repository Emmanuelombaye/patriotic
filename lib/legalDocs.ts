export const LEGAL_DOCS = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Efexia collects, uses, and protects patient information during clinical intake and care.',
    docId: '1oKVJa7VfJws4zOSywOX0xxPZKjSST-sNQ4gFqZ4vFG8',
  },
  hipaa: {
    slug: 'hipaa',
    title: 'HIPAA Notice',
    description:
      'Notice of privacy practices describing how medical information may be used and disclosed.',
    docId: '1JpEGqC3ppH84M83br1w5_4MAVXFaPpLlNrN80ap45cQ',
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    description:
      'The terms that govern use of Efexia telehealth services, intake, and related clinical protocols.',
    docId: '1KqqG02w2JGfX0MO6XV-xva3zY_LA-PoEufXpF4jm-sI',
  },
  medicalConsent: {
    slug: 'medical-consent',
    title: 'Medical Disclaimer',
    description:
      'Medical disclaimer for specialized protocols reviewed by affiliated licensed clinicians.',
    docId: '1Hcn-t3q5S9XoeYE24FnAhrBveSiVkKX3ygqOVDj-6pg',
  },
  telehealthConsent: {
    slug: 'telehealth-consent',
    title: 'Telehealth Consent',
    description:
      'Consent for telehealth evaluation, prescribing, and follow-up through Efexia affiliated clinicians.',
    docId: '17WuPlOkyH8oM_N7U6jh_2Yr-QmUSNIbY39okRs_vNOU',
  },
} as const;

export type LegalDocKey = keyof typeof LEGAL_DOCS;
export type LegalDoc = (typeof LEGAL_DOCS)[LegalDocKey];

export const LEGAL_DOC_LIST: LegalDoc[] = [
  LEGAL_DOCS.privacy,
  LEGAL_DOCS.hipaa,
  LEGAL_DOCS.terms,
  LEGAL_DOCS.medicalConsent,
  LEGAL_DOCS.telehealthConsent,
];

export function googleDocPreviewUrl(docId: string) {
  return `https://docs.google.com/document/d/${docId}/preview`;
}

export function googleDocViewUrl(docId: string) {
  return `https://docs.google.com/document/d/${docId}/preview`;
}
