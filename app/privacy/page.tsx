import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { LEGAL_DOCS } from '@/lib/legalDocs';

const doc = LEGAL_DOCS.privacy;

export const metadata: Metadata = {
  title: `${doc.title} | Efexia`,
  description: doc.description,
};

export default function PrivacyPage() {
  return <LegalDocumentPage title={doc.title} description={doc.description} docId={doc.docId} />;
}
