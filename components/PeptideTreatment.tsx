'use client';

import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

type PeptideTreatmentProps = { locale: Locale };

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const content = {
  en: {
    eyebrow: 'Physician-guided regenerative care',
    title: <>Support your body’s <em>next chapter.</em></>,
    intro: 'Personalized peptide protocols designed around your goals, health history, and ongoing clinical support.',
    back: 'All treatments',
    primary: 'Start $2 clinical intake',
    secondary: 'Explore the process',
    proof: ['100% online intake', 'U.S.-licensed providers', 'Private home delivery'],
    scienceEyebrow: 'A more precise approach',
    scienceTitle: 'Small signals. Thoughtful care.',
    scienceBody: 'Peptides are short chains of amino acids that act as messengers throughout the body. When clinically appropriate, a provider may use a personalized protocol to support specific wellness goals—always based on your medical history and an individual evaluation.',
    scienceNote: 'Your provider determines whether treatment is appropriate and discusses expected benefits, risks, and alternatives before prescribing.',
    benefitsEyebrow: 'Designed around you',
    benefitsTitle: 'Care that meets your goals',
    benefits: [
      ['Recovery support', 'A tailored plan that may support tissue recovery and a more consistent return to activity.'],
      ['Rest & resilience', 'Clinical guidance focused on the habits and therapies that support restorative sleep and resilience.'],
      ['Strength & performance', 'A goal-based protocol designed to complement nutrition, movement, and healthy body composition.'],
      ['Healthy aging', 'Ongoing care centered on sustainable energy, function, and long-term wellbeing.']
    ],
    processEyebrow: 'Simple from the start',
    processTitle: 'Your care, in three steps',
    steps: [
      ['Tell us about you', 'Complete a secure health intake from your phone in about five minutes.'],
      ['Meet your provider', 'A licensed clinician reviews your history, goals, and treatment options with you.'],
      ['Begin with support', 'If prescribed, your treatment ships discreetly and your care team stays connected.']
    ],
    lifestyleEyebrow: 'More than a prescription',
    lifestyleTitle: 'Built for real life, backed by real care.',
    lifestyleBody: 'Your plan does not stop at delivery. Efexia combines clinician oversight, clear guidance, and ongoing check-ins so your protocol can evolve with you.',
    lifestylePoints: ['Personalized dosing guidance', 'Ongoing provider access', 'Progress-based adjustments'],
    faqEyebrow: 'Good to know',
    faqTitle: 'Questions, answered',
    faqs: [
      ['Are peptide therapies right for everyone?', 'No. Eligibility depends on your health history, current medications, goals, and a provider’s clinical judgment.'],
      ['How quickly will I notice changes?', 'Experiences vary by person and protocol. Your provider will set realistic expectations and explain how progress should be monitored.'],
      ['Are compounded peptides FDA-approved?', 'Compounded medications are not FDA-approved. They may be prescribed for an individual patient when a licensed clinician determines they are clinically appropriate.'],
      ['Will I have ongoing support?', 'Yes. Your care plan includes access to clinical guidance and follow-up based on your prescribed protocol.']
    ],
    ctaEyebrow: 'Your next step',
    ctaTitle: 'A stronger tomorrow can start today.',
    ctaBody: 'The $2 intake starts your provider review. Completing it does not guarantee a prescription.',
    disclaimer: 'Prescription treatment requires an online medical evaluation. Results vary. Compounded medications are not FDA-approved and are prescribed only when clinically appropriate.'
  },
  es: {
    eyebrow: 'Cuidado regenerativo guiado por médicos',
    title: <>Apoya el <em>próximo capítulo</em> de tu cuerpo.</>,
    intro: 'Protocolos de péptidos personalizados según tus objetivos, historial médico y apoyo clínico continuo.',
    back: 'Todos los tratamientos',
    primary: 'Iniciar evaluación clínica de $2',
    secondary: 'Explorar el proceso',
    proof: ['Evaluación 100% en línea', 'Proveedores licenciados en EE. UU.', 'Entrega privada a domicilio'],
    scienceEyebrow: 'Un enfoque más preciso',
    scienceTitle: 'Pequeñas señales. Atención cuidadosa.',
    scienceBody: 'Los péptidos son cadenas cortas de aminoácidos que actúan como mensajeros en el cuerpo. Cuando es clínicamente apropiado, un proveedor puede usar un protocolo personalizado para apoyar objetivos específicos de bienestar.',
    scienceNote: 'Tu proveedor determina si el tratamiento es apropiado y analiza beneficios, riesgos y alternativas antes de recetar.',
    benefitsEyebrow: 'Diseñado para ti',
    benefitsTitle: 'Atención para tus objetivos',
    benefits: [
      ['Apoyo a la recuperación', 'Un plan personalizado que puede apoyar la recuperación y un regreso constante a la actividad.'],
      ['Descanso y resiliencia', 'Orientación clínica enfocada en hábitos y terapias que apoyan el descanso reparador.'],
      ['Fuerza y rendimiento', 'Un protocolo basado en objetivos que complementa nutrición, movimiento y composición corporal saludable.'],
      ['Envejecimiento saludable', 'Atención continua centrada en energía, función y bienestar sostenible.']
    ],
    processEyebrow: 'Simple desde el inicio',
    processTitle: 'Tu atención en tres pasos',
    steps: [
      ['Cuéntanos sobre ti', 'Completa una evaluación de salud segura desde tu teléfono en unos cinco minutos.'],
      ['Conoce a tu proveedor', 'Un profesional licenciado revisa tu historial, objetivos y opciones de tratamiento.'],
      ['Comienza con apoyo', 'Si se receta, el tratamiento llega discretamente y tu equipo sigue conectado.']
    ],
    lifestyleEyebrow: 'Más que una receta',
    lifestyleTitle: 'Creado para la vida real, respaldado por atención real.',
    lifestyleBody: 'Tu plan no termina con la entrega. Efexia combina supervisión clínica, orientación clara y seguimiento continuo.',
    lifestylePoints: ['Orientación de dosis personalizada', 'Acceso continuo al proveedor', 'Ajustes según tu progreso'],
    faqEyebrow: 'Lo que debes saber',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      ['¿Las terapias con péptidos son para todos?', 'No. La elegibilidad depende de tu historial, medicamentos, objetivos y el criterio clínico del proveedor.'],
      ['¿Cuándo notaré cambios?', 'La experiencia varía según la persona y el protocolo. Tu proveedor establecerá expectativas realistas.'],
      ['¿Los péptidos compuestos están aprobados por la FDA?', 'Los medicamentos compuestos no están aprobados por la FDA. Pueden recetarse cuando un profesional licenciado los considera apropiados.'],
      ['¿Tendré apoyo continuo?', 'Sí. Tu plan incluye orientación clínica y seguimiento según el protocolo recetado.']
    ],
    ctaEyebrow: 'Tu próximo paso',
    ctaTitle: 'Un mañana más fuerte puede comenzar hoy.',
    ctaBody: 'La evaluación de $2 inicia la revisión del proveedor. Completarla no garantiza una receta.',
    disclaimer: 'El tratamiento con receta requiere una evaluación médica en línea. Los resultados varían. Los medicamentos compuestos no están aprobados por la FDA.'
  }
};

function PeptideTreatment({ locale }: PeptideTreatmentProps) {
  const copy = content[locale] || content.en;

  return (
    <div className="peptide-page">
      <section className="peptide-hero">
        <ResponsiveImage
          className="peptide-hero__image"
          src="/images/efexia-peptide-hero.webp"
          alt=""
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        <div className="peptide-hero__veil" aria-hidden="true" />
        <div className="container peptide-hero__inner">
          <ScrollReveal eager variant="fade-up" className="peptide-hero__copy">
            <Link href="/#treatments" className="peptide-back"><span>←</span> {copy.back}</Link>
            <p className="peptide-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="peptide-hero__intro">{copy.intro}</p>
            <div className="peptide-actions">
              <Link href={startCheckoutHref('peptide')} className="peptide-button peptide-button--primary">{copy.primary}<ArrowIcon /></Link>
              <a href="#peptide-process" className="peptide-button peptide-button--glass">{copy.secondary}</a>
            </div>
          </ScrollReveal>
          <div className="peptide-proof">
            {copy.proof.map((item) => <span key={item}><CheckIcon />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="peptide-section peptide-science">
        <div className="container peptide-split">
          <ScrollReveal variant="slide-left" className="peptide-image-card peptide-image-card--science">
            <ResponsiveImage
              src="/images/efexia-peptide-science.webp"
              alt="Abstract visualization of peptide and cellular signaling structures"
              sizes="(max-width: 991px) calc(100vw - 48px), 50vw"
            />
            <span className="peptide-image-label">Cellular signaling</span>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" className="peptide-copy-block">
            <p className="peptide-kicker">{copy.scienceEyebrow}</p>
            <h2>{copy.scienceTitle}</h2>
            <p>{copy.scienceBody}</p>
            <aside className="peptide-clinical-note"><span>i</span><p>{copy.scienceNote}</p></aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="peptide-section peptide-benefits">
        <div className="container">
          <ScrollReveal variant="fade-up" className="peptide-section-heading">
            <p className="peptide-kicker">{copy.benefitsEyebrow}</p>
            <h2>{copy.benefitsTitle}</h2>
          </ScrollReveal>
          <div className="peptide-benefit-grid">
            {copy.benefits.map(([title, body], index) => (
              <ScrollReveal key={title} variant="fade-up" delay={index + 1} className="peptide-benefit-card">
                <span className="peptide-benefit-card__number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="peptide-section peptide-process" id="peptide-process">
        <div className="container">
          <ScrollReveal variant="fade-up" className="peptide-section-heading peptide-section-heading--light">
            <p className="peptide-kicker">{copy.processEyebrow}</p>
            <h2>{copy.processTitle}</h2>
          </ScrollReveal>
          <div className="peptide-steps">
            {copy.steps.map(([title, body], index) => (
              <ScrollReveal key={title} variant="fade-up" delay={index + 1} className="peptide-step">
                <span>{index + 1}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="scale-in" className="peptide-process__action">
            <Link href={startCheckoutHref('peptide')} className="peptide-button peptide-button--teal">{copy.primary}<ArrowIcon /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="peptide-section peptide-lifestyle">
        <div className="container peptide-lifestyle__card">
          <div className="peptide-lifestyle__image">
            <ResponsiveImage
              src="/images/efexia-peptide-recovery.webp"
              alt="Man stretching as part of a healthy morning routine"
              sizes="(max-width: 991px) calc(100vw - 48px), 54vw"
            />
          </div>
          <ScrollReveal variant="slide-right" className="peptide-lifestyle__copy">
            <p className="peptide-kicker">{copy.lifestyleEyebrow}</p>
            <h2>{copy.lifestyleTitle}</h2>
            <p>{copy.lifestyleBody}</p>
            <ul>{copy.lifestylePoints.map((point) => <li key={point}><CheckIcon />{point}</li>)}</ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="peptide-section peptide-faq">
        <div className="container">
          <ScrollReveal variant="fade-up" className="peptide-section-heading">
            <p className="peptide-kicker">{copy.faqEyebrow}</p>
            <h2>{copy.faqTitle}</h2>
          </ScrollReveal>
          <div className="peptide-faq__grid">
            {copy.faqs.map(([question, answer], index) => (
              <ScrollReveal key={question} variant="fade-up" delay={(index % 2) + 1} className="peptide-faq__item">
                <span>0{index + 1}</span><div><h3>{question}</h3><p>{answer}</p></div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="peptide-final">
        <div className="container">
          <ScrollReveal variant="scale-in" className="peptide-final__card">
            <p className="peptide-kicker">{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaBody}</p>
            <Link href={startCheckoutHref('peptide')} className="peptide-button peptide-button--teal">{copy.primary}<ArrowIcon /></Link>
            <small>{copy.disclaimer}</small>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default PeptideTreatment;
