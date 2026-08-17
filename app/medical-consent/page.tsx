import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { LEGAL_DOCS } from '@/lib/legalDocs';

const doc = LEGAL_DOCS.medicalConsent;

export const metadata: Metadata = {
  title: `${doc.title} | Efexia`,
  description: doc.description,
};

export default function MedicalConsentPage() {
  return <LegalDocumentPage {...doc} />;
}
