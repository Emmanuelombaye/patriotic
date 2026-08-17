import Link from 'next/link';
import { googleDocPreviewUrl, googleDocViewUrl } from '@/lib/legalDocs';

type LegalDocumentPageProps = {
  title: string;
  description: string;
  docId: string;
};

export default function LegalDocumentPage({ title, description, docId }: LegalDocumentPageProps) {
  const previewUrl = googleDocPreviewUrl(docId);
  const viewUrl = googleDocViewUrl(docId);

  return (
    <div className="legal-doc">
      <div className="container legal-doc__shell">
        <p className="legal-doc__kicker">Legal</p>
        <h1>{title}</h1>
        <p className="legal-doc__lede">{description}</p>
        <div className="legal-doc__actions">
          <a href={viewUrl} target="_blank" rel="noreferrer">
            Open full document
          </a>
          <Link href="/">Back to home</Link>
        </div>
        <div className="legal-doc__frame-wrap">
          <iframe
            src={previewUrl}
            title={title}
            className="legal-doc__frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="legal-doc__note">
          If the document does not display above, use Open full document. Completing intake does not guarantee a
          prescription.
        </p>
      </div>
    </div>
  );
}
