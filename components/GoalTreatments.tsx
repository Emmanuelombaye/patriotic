'use client';

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
        Two physician-guided paths for <em>men’s health.</em>
      </>
    ),
    intro:
      'Efexia currently offers TRT and weight management. Both start with a $2 clinical intake and licensed-provider review — completing intake does not guarantee a prescription.',
    explore: 'View treatment',
    start: 'Start $2 intake',
    note: 'Licensed U.S. providers · MensRX fulfillment when prescribed · Compounded meds only when clinically appropriate',
    treatments: [
      {
        id: 'trt' as FeaturedTreatmentId,
        kicker: 'Hormone care',
        title: 'Testosterone (TRT)',
        description:
          'Clinician-reviewed hormone support, considered only when a licensed provider determines it fits your history and goals.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Man focused on strength and metabolic wellness',
      },
      {
        id: 'weight' as FeaturedTreatmentId,
        kicker: 'Metabolic care',
        title: 'Weight management',
        description:
          'GLP-1 and related options discussed only after clinical eligibility review. Treatment is never guaranteed by intake alone.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Calm setting focused on metabolic wellness',
      },
    ],
  },
  es: {
    eyebrow: 'Tratamientos',
    title: (
      <>
        Dos caminos guiados por médicos para la <em>salud masculina.</em>
      </>
    ),
    intro:
      'Efexia ofrece actualmente TRT y control de peso. Ambos comienzan con una evaluación clínica de $2 y revisión de un proveedor con licencia — completar la evaluación no garantiza una receta.',
    explore: 'Ver tratamiento',
    start: 'Iniciar evaluación de $2',
    note: 'Proveedores licenciados en EE. UU. · Surtido MensRX si se receta · Medicamentos compuestos solo cuando sea clínicamente apropiado',
    treatments: [
      {
        id: 'trt' as FeaturedTreatmentId,
        kicker: 'Cuidado hormonal',
        title: 'Testosterona (TRT)',
        description:
          'Apoyo hormonal con revisión clínica, considerado solo cuando un proveedor determina que encaja con su historial.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Hombre enfocado en fuerza y bienestar metabólico',
      },
      {
        id: 'weight' as FeaturedTreatmentId,
        kicker: 'Cuidado metabólico',
        title: 'Control de peso',
        description:
          'Opciones GLP-1 solo tras revisión de elegibilidad clínica. La evaluación sola no garantiza tratamiento.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Entorno calmado de bienestar metabólico',
      },
    ],
  },
};

type GoalTreatmentsProps = {
  locale: Locale;
};

export default function GoalTreatments({ locale }: GoalTreatmentsProps) {
  const copy = COPY[locale] || COPY.en;

  return (
    <section id="treatments" className="tx-cat" aria-labelledby="tx-cat-title">
      <div className="tx-cat__shell">
        <ScrollReveal variant="fade-up" className="tx-cat__header">
          <p className="tx-cat__eyebrow">{copy.eyebrow}</p>
          <h2 id="tx-cat-title">{copy.title}</h2>
          <p className="tx-cat__intro">{copy.intro}</p>
        </ScrollReveal>

        <div className="tx-duo">
          {copy.treatments.map((treatment, index) => (
            <ScrollReveal
              key={treatment.id}
              variant={index === 0 ? 'slide-left' : 'slide-right'}
              delay={index + 1}
              className="tx-duo__card"
            >
              <ResponsiveImage
                src={treatment.image}
                alt={treatment.imageAlt}
                className="tx-duo__image"
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="tx-duo__copy">
                <span>{treatment.kicker}</span>
                <h3>{treatment.title}</h3>
                <p>{treatment.description}</p>
                <div className="tx-duo__actions">
                  <Link href={`/treatment/${treatment.id}`} className="tx-cat__link">
                    {copy.explore}
                  </Link>
                  <Link href={startCheckoutHref(treatment.id)} className="tx-cat__cta">
                    {copy.start}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="tx-cat__note tx-duo__note">{copy.note}</p>
      </div>
    </section>
  );
}
