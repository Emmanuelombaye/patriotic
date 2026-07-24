'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import type { Locale } from '@/lib/types';

const COPY = {
  en: {
    eyebrow: 'Care designed around you',
    title: 'Personalized treatments to help achieve your goals',
    intro: 'Choose what you want to improve. Efexia connects you with licensed providers who build a plan around your health, biology, and life.',
    goalLabel: 'Choose your health goal',
    personalized: 'Personalized for you',
    qualify: 'See if I qualify',
    explore: 'Explore treatment',
    trust: ['Licensed U.S. providers', 'Personalized protocols', 'Private delivery'],
    goals: [
      {
        id: 'strength',
        tab: 'Strength & metabolism',
        number: '01',
        kicker: 'Strength starts from within',
        title: 'Build energy that keeps up with your ambition.',
        description: 'Physician-guided programs designed to support healthier weight, balanced hormones, and sustained everyday performance.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Confident man in a premium Efexia wellness setting',
        treatments: [
          {
            id: 'trt',
            eyebrow: 'Hormone health',
            title: 'Testosterone Replacement Therapy',
            description: 'A clinically guided protocol built around your symptoms, goals, and lab results.',
          },
          {
            id: 'weight',
            eyebrow: 'Metabolic health',
            title: 'Weight Management',
            description: 'Personalized GLP-1 options paired with ongoing medical oversight.',
          },
        ],
      },
      {
        id: 'confidence',
        tab: 'Confidence & appearance',
        number: '02',
        kicker: 'Feel like yourself again',
        title: 'Restore confidence in the moments that matter.',
        description: 'Discreet, evidence-based care for sexual health and hair restoration, designed around your comfort and goals.',
        image: '/images/efexia-goal-confidence.webp',
        imageAlt: 'Man preparing confidently in a refined wellness space',
        treatments: [
          {
            id: 'ed',
            eyebrow: 'Sexual wellness',
            title: 'Erectile Dysfunction Care',
            description: 'Private, physician-guided treatment with personalized dosing options.',
          },
          {
            id: 'hair',
            eyebrow: 'Hair health',
            title: 'Hair Restoration',
            description: 'Targeted topical and oral options designed to support healthier growth.',
          },
        ],
      },
      {
        id: 'longevity',
        tab: 'Longevity & recovery',
        number: '03',
        kicker: 'Invest in the years ahead',
        title: 'Recover smarter. Age with intention.',
        description: 'Advanced wellness and regenerative protocols built to support cellular energy, recovery, and long-term vitality.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Healthy mature man relaxing in an Efexia wellness environment',
        treatments: [
          {
            id: 'wellness',
            eyebrow: 'Cellular wellness',
            title: 'Wellness Optimization',
            description: 'NAD+ and antioxidant protocols focused on energy, focus, and resilience.',
          },
          {
            id: 'peptide',
            eyebrow: 'Recovery',
            title: 'Regenerative Therapy',
            description: 'Targeted therapies designed to support recovery, sleep, and healthy aging.',
          },
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Atención diseñada para usted',
    title: 'Tratamientos personalizados para ayudarle a alcanzar sus objetivos',
    intro: 'Elija lo que desea mejorar. Efexia le conecta con proveedores autorizados que crean un plan según su salud, biología y estilo de vida.',
    goalLabel: 'Elija su objetivo de salud',
    personalized: 'Personalizado para usted',
    qualify: 'Ver si califico',
    explore: 'Explorar tratamiento',
    trust: ['Proveedores autorizados en EE. UU.', 'Protocolos personalizados', 'Entrega privada'],
    goals: [
      {
        id: 'strength',
        tab: 'Fuerza y metabolismo',
        number: '01',
        kicker: 'La fuerza comienza desde dentro',
        title: 'Desarrolle una energía a la altura de su ambición.',
        description: 'Programas guiados por médicos para apoyar un peso saludable, hormonas equilibradas y un rendimiento diario sostenido.',
        image: '/images/efexia-goal-strength.webp',
        imageAlt: 'Hombre seguro en un entorno premium de bienestar Efexia',
        treatments: [
          {
            id: 'trt',
            eyebrow: 'Salud hormonal',
            title: 'Terapia de Reemplazo de Testosterona',
            description: 'Un protocolo clínico basado en sus síntomas, objetivos y resultados de laboratorio.',
          },
          {
            id: 'weight',
            eyebrow: 'Salud metabólica',
            title: 'Control de Peso',
            description: 'Opciones GLP-1 personalizadas con supervisión médica continua.',
          },
        ],
      },
      {
        id: 'confidence',
        tab: 'Confianza y apariencia',
        number: '02',
        kicker: 'Vuelva a sentirse usted mismo',
        title: 'Recupere la confianza en los momentos importantes.',
        description: 'Atención discreta y basada en evidencia para la salud sexual y la restauración capilar, diseñada según su comodidad y objetivos.',
        image: '/images/efexia-goal-confidence.webp',
        imageAlt: 'Hombre preparándose con confianza en un espacio refinado',
        treatments: [
          {
            id: 'ed',
            eyebrow: 'Bienestar sexual',
            title: 'Cuidado de la Disfunción Eréctil',
            description: 'Tratamiento privado guiado por médicos con opciones de dosis personalizadas.',
          },
          {
            id: 'hair',
            eyebrow: 'Salud capilar',
            title: 'Restauración Capilar',
            description: 'Opciones tópicas y orales dirigidas a favorecer un crecimiento más saludable.',
          },
        ],
      },
      {
        id: 'longevity',
        tab: 'Longevidad y recuperación',
        number: '03',
        kicker: 'Invierta en los años que vienen',
        title: 'Recupérese mejor. Envejezca con intención.',
        description: 'Protocolos avanzados de bienestar y regeneración para apoyar la energía celular, la recuperación y la vitalidad a largo plazo.',
        image: '/images/efexia-goal-longevity.webp',
        imageAlt: 'Hombre maduro saludable en un entorno de bienestar Efexia',
        treatments: [
          {
            id: 'wellness',
            eyebrow: 'Bienestar celular',
            title: 'Optimización del Bienestar',
            description: 'Protocolos de NAD+ y antioxidantes enfocados en energía, concentración y resiliencia.',
          },
          {
            id: 'peptide',
            eyebrow: 'Recuperación',
            title: 'Terapia Regenerativa',
            description: 'Terapias dirigidas para apoyar la recuperación, el sueño y el envejecimiento saludable.',
          },
        ],
      },
    ],
  },
};

function GoalIcon({ type }: { type: string }) {
  if (type === 'strength') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14h3l2-5 4 10 2-5h5" />
      </svg>
    );
  }

  if (type === 'confidence') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v18M5.6 6.5l12.8 11M18.4 6.5l-12.8 11M3 12h18" />
    </svg>
  );
}

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
    <section className="goal-treatments" aria-labelledby="goal-treatments-title">
      <div className="goal-treatments__orb goal-treatments__orb--one" aria-hidden="true" />
      <div className="goal-treatments__orb goal-treatments__orb--two" aria-hidden="true" />

      <div className="retro-container goal-treatments__container">
        <ScrollReveal variant="fade-up" className="goal-treatments__header">
          <span className="goal-treatments__eyebrow">{copy.eyebrow}</span>
          <h2 id="goal-treatments-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={1} className="goal-treatments__tabs-shell">
          <span className="sr-only">{copy.goalLabel}</span>
          <div className="goal-treatments__tabs" role="tablist" aria-label={copy.goalLabel}>
            {copy.goals.map((goal, index) => (
              <button
                key={goal.id}
                ref={(node) => { tabsRef.current[index] = node; }}
                id={`goal-tab-${goal.id}`}
                className={`goal-treatments__tab${activeIndex === index ? ' is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`goal-panel-${goal.id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="goal-treatments__tab-icon"><GoalIcon type={goal.id} /></span>
                <span>{goal.tab}</span>
                <span className="goal-treatments__tab-number">{goal.number}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div
          key={`${locale}-${activeGoal.id}`}
          id={`goal-panel-${activeGoal.id}`}
          className="goal-treatments__stage"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`goal-tab-${activeGoal.id}`}
        >
          <div className="goal-treatments__visual">
            <ResponsiveImage
              src={activeGoal.image}
              alt={activeGoal.imageAlt}
              className="goal-treatments__image"
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 58vw"
            />
            <div className="goal-treatments__image-wash" aria-hidden="true" />
            <div className="goal-treatments__visual-brand" aria-hidden="true">
              <span>EFEXIA</span>
              <small>THE STATE OF GOOD CONDITION</small>
            </div>
            <div className="goal-treatments__visual-copy">
              <span>{activeGoal.kicker}</span>
              <strong>{activeGoal.title}</strong>
            </div>
          </div>

          <div className="goal-treatments__content">
            <div className="goal-treatments__content-top">
              <span className="goal-treatments__personalized">
                <span aria-hidden="true">✦</span> {copy.personalized}
              </span>
              <span className="goal-treatments__index" aria-hidden="true">{activeGoal.number}</span>
            </div>

            <p className="goal-treatments__description">{activeGoal.description}</p>

            <div className="goal-treatments__options">
              {activeGoal.treatments.map((treatment) => (
                <article className="goal-treatments__option" key={treatment.id}>
                  <div>
                    <span>{treatment.eyebrow}</span>
                    <h3>{treatment.title}</h3>
                    <p>{treatment.description}</p>
                  </div>
                  <Link
                    href={`/treatment/${treatment.id}`}
                    className="goal-treatments__option-link"
                    aria-label={`${copy.explore}: ${treatment.title}`}
                  >
                    <span>{copy.explore}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className="goal-treatments__actions">
              <Link href="/start" className="goal-treatments__primary-action">
                {copy.qualify}
                <span aria-hidden="true">→</span>
              </Link>
              <ul className="goal-treatments__trust" aria-label="Efexia care standards">
                {copy.trust.map((item) => (
                  <li key={item}><span aria-hidden="true">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
