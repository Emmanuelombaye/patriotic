import Link from 'next/link';
import { LEGAL_BODIES } from '@/lib/legalBodies';
import { LEGAL_DOC_LIST } from '@/lib/legalDocs';

type LegalDocumentPageProps = {
  slug: string;
  title: string;
  description: string;
};

function renderParagraph(paragraph: string) {
  if (paragraph.includes('\n• ') || paragraph.startsWith('• ')) {
    const items = paragraph
      .split('\n')
      .map((item) => item.replace(/^•\s*/, '').trim())
      .filter(Boolean);
    return (
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{paragraph}</p>;
}

export default function LegalDocumentPage({ slug, title, description }: LegalDocumentPageProps) {
  const hosted = LEGAL_BODIES[slug];

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
          <Link href="/">Back to home</Link>
        </div>

        <article className="legal-doc__article">
          <p className="legal-doc__updated">Last updated: {hosted?.updated || 'August 17, 2026'}</p>
          {hosted?.intro ? <p>{hosted.intro}</p> : null}
          {(hosted?.blocks || []).map((block, index) => (
            <section key={`${block.heading || 'block'}-${index}`}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <div key={`${index}-${paragraphIndex}`}>{renderParagraph(paragraph)}</div>
              ))}
            </section>
          ))}
        </article>
        <p className="legal-doc__note">
          These documents are required for clinical and pharmacy compliance. Completing intake does not
          guarantee a prescription.
        </p>
      </div>
    </div>
  );
}
