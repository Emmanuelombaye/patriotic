'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

const COPY = {
  en: {
    eyebrow: 'Treatments',
    title: (
      <>
        Choose the category that matches your <em>goals.</em>
      </>
    ),
    intro:
      'Browse physician-guided care by category. Every path starts with a $2 clinical intake and provider review — completing intake does not guarantee a prescription.',
    goalLabel: 'Treatment categories',
    explore: 'View treatment',
    start: 'Start $2 intake',
    note: 'Licensed U.S. providers · Private delivery · Compounded meds only when clinically appropriate',
    goals: [
      {
        id: 'strength',
        tab: 'Strength & metabolism',
        kicker: 'Energy & body composition',
        title: 'Hormone and metabolic support',
        description:
          'TRT and GLP-1 options considered when a licensed provider determines they fit your history and goals.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Man focused on strength and metabolic wellness',
        treatments: [
          {
            id: 'trt',
            title: 'Testosterone (TRT)',
            description: 'Clinician-reviewed hormone care with monitoring when prescribed.',
          },
          {
            id: 'weight',
            title: 'Weight management',
            description: 'GLP-1 pathways discussed only after clinical eligibility review.',
          },
        ],
      },
      {
        id: 'confidence',
        tab: 'Confidence & appearance',
        kicker: 'Sexual health & hair',
        title: 'Private care for confidence',
        description:
          'Discreet ED and hair protocols — prescribed only when clinically appropriate.',
        image: '/images/efexia-goal-confidence.webp',
        imageAlt: 'Man preparing with quiet confidence',
        treatments: [
          {
            id: 'ed',
            title: 'Erectile dysfunction',
            description: 'Private evaluation and provider-directed options.',
          },
          {
            id: 'hair',
            title: 'Hair restoration',
            description: 'Topical or oral plans guided by clinical judgment.',
          },
        ],
      },
      {
        id: 'longevity',
        tab: 'Longevity & recovery',
        kicker: 'Cellular wellness',
        title: 'Recovery and longevity-minded care',
        description:
          'NAD+ and regenerative options considered under licensed provider oversight.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Calm longevity-focused wellness setting',
        treatments: [
          {
            id: 'wellness',
            title: 'Wellness optimization',
            description: 'Cellular support discussed in clinical context.',
          },
          {
            id: 'peptide',
            title: 'Regenerative therapy',
            description: 'Peptide protocols only when a provider finds them appropriate.',
          },
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Tratamientos',
    title: (
      <>
        Elija la categoría que coincide con sus <em>objetivos.</em>
      </>
    ),
    intro:
      'Explore el cuidado guiado por médicos por categoría. Cada camino comienza con una evaluación clínica de $2 y revisión del proveedor — completar la evaluación no garantiza una receta.',
    goalLabel: 'Categorías de tratamiento',
    explore: 'Ver tratamiento',
    start: 'Iniciar evaluación de $2',
    note: 'Proveedores licenciados en EE. UU. · Entrega privada · Medicamentos compuestos solo cuando sea clínicamente apropiado',
    goals: [
      {
        id: 'strength',
        tab: 'Fuerza y metabolismo',
        kicker: 'Energía y composición corporal',
        title: 'Apoyo hormonal y metabólico',
        description:
          'Opciones de TRT y GLP-1 consideradas cuando un proveedor determina que encajan con su historial.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Hombre enfocado en fuerza y bienestar metabólico',
        treatments: [
          {
            id: 'trt',
            title: 'Testosterona (TRT)',
            description: 'Cuidado hormonal con revisión clínica y monitoreo si se receta.',
          },
          {
            id: 'weight',
            title: 'Control de peso',
            description: 'Vías GLP-1 solo tras revisión de elegibilidad clínica.',
          },
        ],
      },
      {
        id: 'confidence',
        tab: 'Confianza y apariencia',
        kicker: 'Salud sexual y cabello',
        title: 'Cuidado privado para la confianza',
        description:
          'Protocolos discretos de DE y cabello — recetados solo cuando son clínicamente apropiados.',
        image: '/images/efexia-goal-confidence.webp',
        imageAlt: 'Hombre preparándose con confianza',
        treatments: [
          {
            id: 'ed',
            title: 'Disfunción eréctil',
            description: 'Evaluación privada y opciones dirigidas por el proveedor.',
          },
          {
            id: 'hair',
            title: 'Restauración capilar',
            description: 'Planes tópicos u orales con criterio clínico.',
          },
        ],
      },
      {
        id: 'longevity',
        tab: 'Longevidad y recuperación',
        kicker: 'Bienestar celular',
        title: 'Cuidado de recuperación y longevidad',
        description:
          'Opciones de NAD+ y regeneración bajo supervisión de proveedores con licencia.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Entorno de bienestar centrado en longevidad',
        treatments: [
          {
            id: 'wellness',
            title: 'Optimización del bienestar',
            description: 'Apoyo celular en contexto clínico.',
          },
          {
            id: 'peptide',
            title: 'Terapia regenerativa',
            description: 'Protocolos de péptidos solo cuando el proveedor lo considera apropiado.',
          },
        ],
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
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeGoal = copy.goals[activeIndex];

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabsRef.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % copy.goals.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + copy.goals.length) % copy.goals.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = copy.goals.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <section id="treatments" className="tx-cat" aria-labelledby="tx-cat-title">
      <div className="tx-cat__shell">
        <ScrollReveal variant="fade-up" className="tx-cat__header">
          <p className="tx-cat__eyebrow">{copy.eyebrow}</p>
          <h2 id="tx-cat-title">{copy.title}</h2>
          <p className="tx-cat__intro">{copy.intro}</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={1} className="tx-cat__tabs-wrap">
          <div className="tx-cat__tabs" role="tablist" aria-label={copy.goalLabel}>
            {copy.goals.map((goal, index) => (
              <button
                key={goal.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                id={`tx-tab-${goal.id}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`tx-panel-${goal.id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                className={`tx-cat__tab${activeIndex === index ? ' is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {goal.tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div
          key={`${locale}-${activeGoal.id}`}
          id={`tx-panel-${activeGoal.id}`}
          className="tx-cat__panel"
          role="tabpanel"
          aria-labelledby={`tx-tab-${activeGoal.id}`}
        >
          <div className="tx-cat__visual">
            <ResponsiveImage
              src={activeGoal.image}
              alt={activeGoal.imageAlt}
              className="tx-cat__image"
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="tx-cat__visual-copy">
              <span>{activeGoal.kicker}</span>
              <strong>{activeGoal.title}</strong>
              <p>{activeGoal.description}</p>
            </div>
          </div>

          <div className="tx-cat__cards">
            {activeGoal.treatments.map((treatment) => (
              <article key={treatment.id} className="tx-cat__card">
                <div>
                  <h3>{treatment.title}</h3>
                  <p>{treatment.description}</p>
                </div>
                <div className="tx-cat__card-actions">
                  <Link href={`/treatment/${treatment.id}`} className="tx-cat__link">
                    {copy.explore}
                  </Link>
                  <Link href={startCheckoutHref(treatment.id)} className="tx-cat__cta">
                    {copy.start}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
            <p className="tx-cat__note">{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
