import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { LEGAL_DOCS } from '@/lib/legalDocs';

const doc = LEGAL_DOCS.terms;

export const metadata: Metadata = {
  title: `${doc.title} | Efexia`,
  description: doc.description,
};

export default function TermsPage() {
  return <LegalDocumentPage title={doc.title} description={doc.description} docId={doc.docId} />;
}
