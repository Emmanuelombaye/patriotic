'use client';

import { useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import type { Locale } from '@/lib/types';
import { startCheckoutHref, type FeaturedTreatmentId } from '@/lib/treatments';

const COPY = {
  en: {
    eyebrow: 'Treatments',
    title: (
      <>
        Personalized care, <em>reviewed by licensed providers.</em>
      </>
    ),
    intro: 'Choose Tirzepatide or Semaglutide, then complete a $2 clinical intake. Completing intake does not guarantee a prescription.',
    explore: 'Learn more',
    start: 'Start $2 intake',
    price: '$2',
    priceNote: 'Clinical intake · charged only to verify this qualifier',
    detailPrefix: 'Licensed-provider review required.',
    note: 'Licensed U.S. providers · MensRX fulfillment when prescribed · Compounded meds only when clinically appropriate',
    treatments: [
      {
        id: 'tirzepatide' as FeaturedTreatmentId,
        tab: 'Tirzepatide',
        badge: 'GLP-1 + GIP',
        title: 'Tirzepatide',
        description:
          'A dual-pathway option that may be considered for weight management after a licensed provider reviews your intake. Completing intake does not guarantee a prescription.',
        detail: 'Tirzepatide · Provider-guided if clinically appropriate.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Man focused on strength and metabolic wellness',
        vial: '/images/nad_vial.webp',
      },
      {
        id: 'semaglutide' as FeaturedTreatmentId,
        tab: 'Semaglutide',
        badge: 'GLP-1',
        title: 'Semaglutide',
        description:
          'A GLP-1 option discussed only after clinical eligibility review. Treatment is never guaranteed by intake alone.',
        detail: 'Semaglutide · Provider-guided if clinically appropriate.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Calm setting focused on metabolic wellness',
        vial: '/images/semaglutide_vial.webp',
      },
    ],
  },
  es: {
    eyebrow: 'Tratamientos',
    title: (
      <>
        Cuidado personalizado, <em>revisado por proveedores con licencia.</em>
      </>
    ),
    intro: 'Elija Tirzepatida o Semaglutida, luego complete una evaluación clínica de $2. Completar la evaluación no garantiza una receta.',
    explore: 'Más información',
    start: 'Iniciar evaluación de $2',
    price: '$2',
    priceNote: 'Evaluación clínica · solo para verificar este calificador',
    detailPrefix: 'Se requiere revisión de un proveedor con licencia.',
    note: 'Proveedores licenciados en EE. UU. · Surtido MensRX si se receta · Medicamentos compuestos solo cuando sea clínicamente apropiado',
    treatments: [
      {
        id: 'tirzepatide' as FeaturedTreatmentId,
        tab: 'Tirzepatida',
        badge: 'GLP-1 + GIP',
        title: 'Tirzepatida',
        description:
          'Una opción de doble vía que puede considerarse para control de peso después de que un proveedor revise su evaluación. Completar la evaluación no garantiza una receta.',
        detail: 'Tirzepatida · Guiada por el proveedor si es clínicamente apropiada.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Hombre enfocado en fuerza y bienestar metabólico',
        vial: '/images/nad_vial.webp',
      },
      {
        id: 'semaglutide' as FeaturedTreatmentId,
        tab: 'Semaglutida',
        badge: 'GLP-1',
        title: 'Semaglutida',
        description:
          'Una opción GLP-1 solo tras revisión de elegibilidad clínica. La evaluación sola no garantiza tratamiento.',
        detail: 'Semaglutida · Guiada por el proveedor si es clínicamente apropiada.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Entorno calmado de bienestar metabólico',
        vial: '/images/semaglutide_vial.webp',
      },
    ],
  },
};

type GoalTreatmentsProps = {
  locale: Locale;
};

export default function GoalTreatments({ locale }: GoalTreatmentsProps) {
  const copy = COPY[locale] || COPY.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = copy.treatments[activeIndex];

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % copy.treatments.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + copy.treatments.length) % copy.treatments.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = copy.treatments.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
  };

  return (
    <section id="treatments" className="tx-cat" aria-labelledby="tx-cat-title">
      <div className="tx-cat__shell">
        <ScrollReveal variant="fade-up" className="tx-cat__header">
          <p className="tx-cat__eyebrow">{copy.eyebrow}</p>
          <h2 id="tx-cat-title">{copy.title}</h2>
          <p className="tx-cat__intro">{copy.intro}</p>
        </ScrollReveal>

        <div className="tx-tablist-wrap">
          <div className="tx-tablist" role="tablist" aria-label={copy.eyebrow}>
            {copy.treatments.map((treatment, index) => (
              <button
                key={treatment.id}
                type="button"
                role="tab"
                id={`tx-tab-${treatment.id}`}
                aria-selected={activeIndex === index}
                aria-controls={`tx-pane-${treatment.id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                className={activeIndex === index ? 'is-active' : undefined}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                {treatment.tab}
              </button>
            ))}
          </div>
        </div>

        <div
          key={active.id}
          id={`tx-pane-${active.id}`}
          className="tx-pane"
          role="tabpanel"
          aria-labelledby={`tx-tab-${active.id}`}
        >
          <div className="tx-cutout" aria-hidden="true">
            <ResponsiveImage
              src={active.image}
              alt=""
              className="tx-cutout__img"
              sizes="(max-width: 900px) 92vw, 46vw"
            />
          </div>

          <article className="tx-product">
            <div className="tx-product__tags">
              <span className="tx-product__tag">{active.tab}</span>
              <span className="tx-product__tag">{active.badge}</span>
            </div>

            <div className="tx-product__top">
              <div className="tx-product__vial">
                <ResponsiveImage
                  src={active.vial}
                  alt=""
                  className="tx-vial"
                  sizes="180px"
                />
              </div>
              <div className="tx-product__meta">
                <div className="tx-product__price">
                  {copy.price}
                  <span>{copy.priceNote}</span>
                </div>
              </div>
            </div>

            <h3>{active.title}</h3>
            <p className="tx-product__desc">{active.description}</p>
            <p className="tx-product__detail">{active.detail}</p>

            <div className="tx-product__ctas">
              <Link href={startCheckoutHref(active.id)} className="tx-product__cta tx-product__cta--primary">
                {copy.start}
              </Link>
              <Link href={`/treatment/${active.id}`} className="tx-product__cta tx-product__cta--ghost">
                {copy.explore}
              </Link>
            </div>
          </article>
        </div>
        <p className="tx-cat__note tx-duo__note">{copy.note}</p>
      </div>
    </section>
  );
}
