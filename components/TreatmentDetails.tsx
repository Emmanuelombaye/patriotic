'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/translations';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

type TreatmentInfo = {
  title: string;
  desc: string;
  heroImg: string;
  benefits: string[];
  benefitsEs: string[];
  details: string;
  detailsEs: string;
};

const treatmentData: Record<string, TreatmentInfo> = {
  tirzepatide: {
    title: 'tirzepatideTitle',
    desc: 'tirzepatideDesc',
    heroImg: '/images/nad_vial.webp',
    benefits: [
      'Licensed clinician review before any prescription',
      'Dual-pathway GLP-1 + GIP option when clinically appropriate',
      'Provider oversight if treatment continues',
      'Discreet fulfillment through pharmacy partners',
    ],
    benefitsEs: [
      'Revisión de clínico con licencia antes de cualquier receta',
      'Opción dual GLP-1 + GIP cuando sea clínicamente apropiada',
      'Supervisión del proveedor si el tratamiento continúa',
      'Surtido discreto mediante farmacias asociadas',
    ],
    details:
      'Tirzepatide may be considered after a $2 clinical intake and review by a U.S.-licensed clinician. Completing intake does not guarantee a prescription. If appropriate, care is individualized and fulfilled through a licensed pharmacy partner.',
    detailsEs:
      'La tirzepatida puede considerarse después de una evaluación clínica de $2 y la revisión de un clínico con licencia en EE. UU. Completar la evaluación no garantiza una receta. Si es apropiado, el cuidado se individualiza y se surte mediante una farmacia asociada con licencia.',
  },
  semaglutide: {
    title: 'semaglutideTitle',
    desc: 'semaglutideDesc',
    heroImg: '/images/semaglutide_vial.webp',
    benefits: [
      'Clinical eligibility review first',
      'GLP-1 pathway discussed when appropriate',
      'Provider oversight if treatment continues',
      'Discreet fulfillment when prescribed',
    ],
    benefitsEs: [
      'Primero revisión de elegibilidad clínica',
      'Vía GLP-1 discutida cuando sea apropiado',
      'Supervisión del proveedor si el tratamiento continúa',
      'Surtido discreto cuando se receta',
    ],
    details:
      'Semaglutide may be discussed only after clinical intake and licensed-provider review. Completing the $2 intake does not guarantee eligibility or a prescription.',
    detailsEs:
      'La semaglutida puede discutirse solo después de la evaluación clínica y revisión de un proveedor con licencia. Completar la evaluación de $2 no garantiza elegibilidad ni una receta.',
  },
};

type TreatmentDetailsProps = { locale: Locale };

function TreatmentDetails({ locale }: TreatmentDetailsProps) {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const treatment = id ? treatmentData[id] : undefined;
  const t = (key: string) => translations[locale][key] || key;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!treatment) {
    return (
      <div className="retro-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Treatment Not Found</h2>
        <Link href="/" className="btn btn-red" style={{ marginTop: '20px' }}>Return Home</Link>
      </div>
    );
  }

  const benefitsList = locale === 'en' ? treatment.benefits : treatment.benefitsEs;
  const detailedText = locale === 'en' ? treatment.details : treatment.detailsEs;

  return (
    <div className="treatment-details-page">
      {/* Cinematic Hero */}
      <div className="treatment-hero">
        <ResponsiveImage
          src={treatment.heroImg}
          alt=""
          className="treatment-hero-image"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        <div className="treatment-hero-overlay" aria-hidden="true" />
        <div className="container treatment-hero-content">
          <ScrollReveal variant="fade-up" eager delay={1}>
            <Link href="/" className="back-link">
              ← {locale === 'en' ? 'Back to All Treatments' : 'Volver a Todos los Tratamientos'}
            </Link>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" eager delay={2}>
            <span className="treatment-tag-badge">{locale === 'en' ? 'Clinical Care' : 'Cuidado Clínico'}</span>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" eager delay={2}>
            <h1 className="treatment-hero-title">{t(treatment.title)}</h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" eager delay={3}>
            <p className="treatment-hero-desc">{t(treatment.desc)}</p>
          </ScrollReveal>
          <ScrollReveal variant="scale-in" eager delay={4}>
            <Link
              href={startCheckoutHref(id)}
              className="btn btn-red"
              style={{ marginTop: '24px', padding: '16px 32px', fontSize: '1.1rem', display: 'inline-flex' }}
            >
              {locale === 'en' ? 'Start $2 clinical intake' : 'Iniciar evaluación clínica de $2'}
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container treatment-main-layout">
        <ScrollReveal variant="slide-left" className="treatment-content-left">
          <h2 className="treatment-section-h2">{locale === 'en' ? 'How It Works' : 'Cómo Funciona'}</h2>
          <p className="treatment-detailed-text">{detailedText}</p>
          
          <h2 className="treatment-section-h2" style={{ marginTop: '48px' }}>{locale === 'en' ? 'Key Benefits' : 'Beneficios Clave'}</h2>
          <ul className="treatment-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <ScrollReveal key={idx} as="li" variant="fade-up" delay={(idx % 4) + 1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {benefit}
              </ScrollReveal>
            ))}
          </ul>
        </ScrollReveal>
        
        <div className="treatment-sidebar-right">
          <ScrollReveal variant="slide-right" delay={2} className="treatment-sticky-card hover-lift">
            <h3 className="sticky-card-title">{locale === 'en' ? 'Start with a clinical review' : 'Comience con una revisión clínica'}</h3>
            <p className="sticky-card-desc">
              {locale === 'en' 
                ? 'Complete the $2 clinical intake so a licensed provider can review your case. Intake alone does not guarantee a prescription.' 
                : 'Complete la evaluación clínica de $2 para que un proveedor con licencia revise su caso. La evaluación sola no garantiza una receta.'}
            </p>
            <div className="sticky-card-features">
              <span>✓ {locale === 'en' ? 'U.S. licensed clinicians' : 'Clínicos con licencia en EE. UU.'}</span>
              <span>✓ {locale === 'en' ? 'Discreet fulfillment when prescribed' : 'Entrega discreta si se receta'}</span>
              <span>✓ {locale === 'en' ? '$2 verification intake only' : 'Solo evaluación de verificación de $2'}</span>
            </div>
            <Link href={startCheckoutHref(id)} className="btn btn-red" style={{ width: '100%', marginTop: '20px', display: 'inline-flex', justifyContent: 'center' }}>
              {locale === 'en' ? 'Start $2 clinical intake' : 'Iniciar evaluación clínica de $2'}
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* CSS specific to this page (can be moved to index.css later, included here for rapid deployment) */}
      <style dangerouslySetInnerHTML={{__html: `
        .treatment-hero {
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          color: white;
          margin-top: -80px; /* pull up under transparent nav */
          padding-top: 80px;
        }
        .treatment-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center right;
          background: #0a1024;
        }
        .treatment-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(10, 16, 36, 0.96) 0%, rgba(10, 16, 36, 0.74) 50%, transparent 100%);
        }
        .treatment-hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
        }
        .back-link {
          display: inline-block;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 24px;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: white;
        }
        .treatment-tag-badge {
          display: inline-block;
          background: var(--brand-highlight);
          color: var(--brand-text);
          padding: 6px 12px;
          border-radius: 4px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .treatment-hero-title {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .treatment-hero-desc {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        .treatment-main-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          padding: 80px 20px;
        }
        .treatment-section-h2 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--navy-dark);
          margin-bottom: 24px;
        }
        .treatment-detailed-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-dark);
        }
        .treatment-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .treatment-benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--navy-dark);
        }
        .treatment-benefits-list li svg {
          width: 24px;
          height: 24px;
          color: var(--red);
          flex-shrink: 0;
        }
        .treatment-sticky-card {
          position: sticky;
          top: 100px;
          background-color: var(--white);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: 32px;
        }
        .sticky-card-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--navy-dark);
          margin-bottom: 12px;
        }
        .sticky-card-desc {
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .sticky-card-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sticky-card-features span {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--navy-dark);
        }
        
        @media (max-width: 991px) {
          .treatment-main-layout {
            grid-template-columns: 1fr;
          }
          .treatment-hero {
            height: auto;
            min-height: 0;
            display: flex;
            flex-direction: column;
            margin-top: 0;
            padding-top: 24px;
          }
          .treatment-hero-image {
            position: relative;
            height: 42vw;
            min-height: 220px;
            max-height: 320px;
            object-fit: contain;
            object-position: center;
          }
          .treatment-hero-overlay {
            background: linear-gradient(180deg, rgba(10, 16, 36, 0.18) 0%, rgba(10, 16, 36, 0.88) 100%);
          }
          .treatment-hero-content {
            padding-bottom: 28px;
          }
          .treatment-hero-title {
            font-size: 2.15rem;
          }
        }
      `}} />
    </div>
  );
}

export default TreatmentDetails;
