import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { LEGAL_DOCS } from '@/lib/legalDocs';

const doc = LEGAL_DOCS.mensrx;

export const metadata: Metadata = {
  title: `${doc.title} | Efexia`,
  description: doc.description,
};

export default function MensrxPage() {
  return <LegalDocumentPage title={doc.title} description={doc.description} docId={doc.docId} />;
}
