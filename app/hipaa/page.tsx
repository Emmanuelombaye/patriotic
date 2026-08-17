import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { LEGAL_DOCS } from '@/lib/legalDocs';

const doc = LEGAL_DOCS.hipaa;

export const metadata: Metadata = {
  title: `${doc.title} | Efexia`,
  description: doc.description,
};

export default function HipaaPage() {
  return <LegalDocumentPage {...doc} />;
}
