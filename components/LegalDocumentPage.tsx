import Link from 'next/link';
import { LEGAL_BODIES } from '@/lib/legalBodies';
import { LEGAL_DOC_LIST, googleDocPreviewUrl, googleDocViewUrl } from '@/lib/legalDocs';

type LegalDocumentPageProps = {
  slug: string;
  title: string;
  description: string;
  docId: string;
};

export default function LegalDocumentPage({ slug, title, description, docId }: LegalDocumentPageProps) {
  const hosted = LEGAL_BODIES[slug];
  const previewUrl = googleDocPreviewUrl(docId);
  const viewUrl = googleDocViewUrl(docId);

  return (
    <div className="legal-doc">
      <div className="legal-doc__shell">
        <p className="legal-doc__kicker">Efexia legal</p>
        <h1>{title}</h1>
        <p className="legal-doc__lede">{description}</p>

        <nav className="legal-doc__switch" aria-label="Legal documents">
          {LEGAL_DOC_LIST.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${doc.slug}`}
              className={doc.slug === slug ? 'is-active' : ''}
              aria-current={doc.slug === slug ? 'page' : undefined}
            >
              {doc.title}
            </Link>
          ))}
        </nav>

        <div className="legal-doc__actions">
          {hosted ? (
            <Link href="/">Back to home</Link>
          ) : (
            <>
              <a className="legal-doc__open" href={viewUrl} target="_blank" rel="noreferrer">
                Open full document
              </a>
              <Link href="/">Back to home</Link>
            </>
          )}
        </div>

        {hosted ? (
          <article className="legal-doc__article">
            <p className="legal-doc__updated">Last updated: {hosted.updated}</p>
            {hosted.intro ? <p>{hosted.intro}</p> : null}
            {hosted.blocks.map((block) => (
              <section key={block.heading || block.paragraphs[0]}>
                {block.heading ? <h2>{block.heading}</h2> : null}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        ) : (
          <div className="legal-doc__frame-wrap">
            <iframe
              src={previewUrl}
              title={title}
              className="legal-doc__frame"
              loading="eager"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
        <p className="legal-doc__note">
          These documents are required for clinical and pharmacy compliance. Completing intake does not
          guarantee a prescription.
        </p>
      </div>
    </div>
  );
}
