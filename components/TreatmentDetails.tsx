'use client';

import { useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import PeptideTreatment from '@/components/PeptideTreatment';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

type LocaleBlock = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  back: string;
  primary: string;
  secondary: string;
  proof: string[];
  scienceEyebrow: string;
  scienceTitle: string;
  scienceBody: string;
  scienceNote: string;
  scienceLabel: string;
  scienceAlt: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: [string, string][];
  processEyebrow: string;
  processTitle: string;
  steps: [string, string][];
  lifestyleEyebrow: string;
  lifestyleTitle: string;
  lifestyleBody: string;
  lifestylePoints: string[];
  lifestyleAlt: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: [string, string][];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  disclaimer: string;
};

type TreatmentPage = {
  heroImg: string;
  scienceImg: string;
  lifestyleImg: string;
  en: LocaleBlock;
  es: LocaleBlock;
};

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

const sharedProcess = {
  en: {
    processEyebrow: 'Simple from the start',
    processTitle: 'Your care, in three steps',
    steps: [
      ['Complete the clinical intake', 'Answer a secure questionnaire so a licensed provider can review your history.'],
      ['Provider review', 'A U.S.-licensed clinician determines whether treatment is appropriate for you.'],
      ['Care, if prescribed', 'If approved, medication ships discreetly and your care team stays available.'],
    ] as [string, string][],
    primary: 'Start $2 clinical intake',
    secondary: 'See how it works',
    back: 'All treatments',
    proof: ['$2 verification intake', 'U.S.-licensed providers', 'Private home delivery'],
    ctaEyebrow: 'Your next step',
    ctaTitle: 'Begin with a clinical review.',
    ctaBody: 'The $2 intake starts your provider review. Completing it does not guarantee a prescription.',
    disclaimer:
      'Prescription treatment requires an online medical evaluation. Results vary. Compounded medications are not FDA-approved and are prescribed only when clinically appropriate.',
  },
  es: {
    processEyebrow: 'Simple desde el inicio',
    processTitle: 'Su cuidado, en tres pasos',
    steps: [
      ['Complete la evaluación clínica', 'Responda un cuestionario seguro para que un proveedor revise su historial.'],
      ['Revisión del proveedor', 'Un clínico con licencia en EE. UU. determina si el tratamiento es apropiado.'],
      ['Cuidado, si se receta', 'Si se aprueba, el medicamento se envía de forma discreta y su equipo permanece disponible.'],
    ] as [string, string][],
    primary: 'Iniciar evaluación clínica de $2',
    secondary: 'Ver cómo funciona',
    back: 'Todos los tratamientos',
    proof: ['Evaluación de verificación $2', 'Proveedores licenciados en EE. UU.', 'Entrega privada a domicilio'],
    ctaEyebrow: 'Su próximo paso',
    ctaTitle: 'Comience con una revisión clínica.',
    ctaBody: 'La evaluación de $2 inicia la revisión del proveedor. Completarla no garantiza una receta.',
    disclaimer:
      'El tratamiento con receta requiere una evaluación médica en línea. Los resultados varían. Los medicamentos compuestos no están aprobados por la FDA.',
  },
};

const treatmentPages: Record<string, TreatmentPage> = {
  weight: {
    heroImg: '/images/semaglutide_vial.webp',
    scienceImg: '/images/semaglutide_vial.webp',
    lifestyleImg: '/images/efexia-goal-strength.webp',
    en: {
      ...sharedProcess.en,
      eyebrow: 'Physician-guided metabolic care',
      title: (
        <>
          Weight care guided by a <em>licensed provider.</em>
        </>
      ),
      intro:
        'GLP-1 options may be prescribed when clinically appropriate — after a provider reviews your history, goals, and eligibility.',
      scienceEyebrow: 'How care is approached',
      scienceTitle: 'Appetite signals, reviewed clinically.',
      scienceBody:
        'GLP-1 medications work with pathways your body already uses to regulate appetite and fullness. A licensed provider decides whether a compounded or other protocol is right for you — never from marketing claims alone.',
      scienceNote:
        'Completing intake does not create a prescription. Your provider reviews risks, benefits, and alternatives before any treatment decision.',
      scienceLabel: 'Metabolic support',
      scienceAlt: 'Clinical GLP-1 vial photography',
      benefitsEyebrow: 'What this path may support',
      benefitsTitle: 'Built around medical judgment',
      benefits: [
        ['Appetite regulation', 'When appropriate, therapy may help steady hunger signals under clinical supervision.'],
        ['Structured follow-up', 'Progress is monitored so dosing and guidance can adapt to how you respond.'],
        ['Metabolic context', 'Care considers labs, medications, and goals — not a one-size protocol.'],
        ['Discreet delivery', 'If prescribed, medication ships privately with ongoing access to your care team.'],
      ],
      lifestyleEyebrow: 'More than a vial',
      lifestyleTitle: 'Care that continues after shipping.',
      lifestyleBody:
        'Efexia pairs clinician oversight with clear next steps so your plan can evolve. Eligibility always depends on medical review.',
      lifestylePoints: ['Provider-directed dosing', 'Ongoing clinical access', 'Adjustments based on response'],
      lifestyleAlt: 'Man focused on sustainable wellness habits',
      faqEyebrow: 'Good to know',
      faqTitle: 'Questions, answered',
      faqs: [
        ['Does intake guarantee treatment?', 'No. A licensed provider must review your information and determine eligibility.'],
        ['Are compounded GLP-1s FDA-approved?', 'Compounded medications are not FDA-approved. They may be prescribed only when a clinician finds them clinically appropriate.'],
        ['What is the $2 payment for?', 'It is a verification payment for this clinical qualifier only — not a full treatment charge.'],
        ['How fast is the review?', 'Most intakes are reviewed promptly. Timing can vary based on clinical follow-up needs.'],
      ],
    },
    es: {
      ...sharedProcess.es,
      eyebrow: 'Cuidado metabólico guiado por médicos',
      title: (
        <>
          Control de peso con <em>revisión clínica.</em>
        </>
      ),
      intro:
        'Las opciones GLP-1 pueden recetarse cuando son clínicamente apropiadas, después de que un proveedor revise su historial y elegibilidad.',
      scienceEyebrow: 'Cómo se aborda el cuidado',
      scienceTitle: 'Señales de apetito, revisadas clínicamente.',
      scienceBody:
        'Los medicamentos GLP-1 actúan con vías que el cuerpo ya usa para regular el apetito. Un proveedor con licencia decide si un protocolo es adecuado para usted.',
      scienceNote:
        'Completar la evaluación no crea una receta. Su proveedor revisa riesgos, beneficios y alternativas antes de decidir.',
      scienceLabel: 'Apoyo metabólico',
      scienceAlt: 'Fotografía clínica de vial GLP-1',
      benefitsEyebrow: 'Qué puede apoyar este camino',
      benefitsTitle: 'Basado en criterio médico',
      benefits: [
        ['Regulación del apetito', 'Cuando es apropiado, la terapia puede ayudar a estabilizar señales de hambre con supervisión.'],
        ['Seguimiento estructurado', 'El progreso se monitorea para adaptar la dosis y la orientación.'],
        ['Contexto metabólico', 'El cuidado considera laboratorios, medicamentos y objetivos.'],
        ['Entrega discreta', 'Si se receta, el envío es privado con acceso continuo al equipo de cuidado.'],
      ],
      lifestyleEyebrow: 'Más que un vial',
      lifestyleTitle: 'Cuidado que continúa después del envío.',
      lifestyleBody:
        'Efexia combina supervisión clínica con pasos claros. La elegibilidad siempre depende de la revisión médica.',
      lifestylePoints: ['Dosificación dirigida por el proveedor', 'Acceso clínico continuo', 'Ajustes según la respuesta'],
      lifestyleAlt: 'Hombre enfocado en hábitos sostenibles de bienestar',
      faqEyebrow: 'Buen saber',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        ['¿La evaluación garantiza tratamiento?', 'No. Un proveedor con licencia debe revisar su información y decidir.'],
        ['¿Los GLP-1 compuestos están aprobados por la FDA?', 'Los medicamentos compuestos no están aprobados por la FDA.'],
        ['¿Para qué es el pago de $2?', 'Es un pago de verificación de este calificador clínico, no el cargo completo del tratamiento.'],
        ['¿Qué tan rápida es la revisión?', 'La mayoría se revisa con prontitud; el tiempo puede variar.'],
      ],
    },
  },
  trt: {
    heroImg: '/images/testosterone_vial.webp',
    scienceImg: '/images/testosterone_vial.webp',
    lifestyleImg: '/images/efexia-goal-strength.webp',
    en: {
      ...sharedProcess.en,
      eyebrow: 'Physician-guided hormone care',
      title: (
        <>
          Testosterone care with <em>clinical oversight.</em>
        </>
      ),
      intro:
        'TRT protocols are considered only after a licensed provider reviews symptoms, labs when indicated, and your overall health picture.',
      scienceEyebrow: 'How care is approached',
      scienceTitle: 'Hormone support, never assumed.',
      scienceBody:
        'Low energy, mood changes, or performance concerns can have many causes. Treatment is not automatic — your provider evaluates whether testosterone therapy is appropriate and discusses monitoring needs.',
      scienceNote:
        'A prescription is issued only when clinically indicated. Intake alone does not establish treatment.',
      scienceLabel: 'Hormone health',
      scienceAlt: 'Clinical testosterone vial photography',
      benefitsEyebrow: 'What this path may support',
      benefitsTitle: 'Care shaped by your labs and goals',
      benefits: [
        ['Individual evaluation', 'Decisions consider symptoms, history, and clinical findings — not templates.'],
        ['Monitored protocols', 'When prescribed, therapy includes guidance on follow-up and safety.'],
        ['Clear expectations', 'Your provider explains benefits, risks, and alternatives before you begin.'],
        ['Private fulfillment', 'If prescribed, medication and supplies ship discreetly.'],
      ],
      lifestyleEyebrow: 'Ongoing partnership',
      lifestyleTitle: 'Built for responsible hormone care.',
      lifestyleBody:
        'Efexia emphasizes provider judgment and follow-through so therapy stays aligned with your health over time.',
      lifestylePoints: ['Clinician-directed plans', 'Safety-focused follow-up', 'Discreet delivery when prescribed'],
      lifestyleAlt: 'Man maintaining an active, healthy routine',
      faqEyebrow: 'Good to know',
      faqTitle: 'Questions, answered',
      faqs: [
        ['Will I automatically get TRT?', 'No. Eligibility depends on clinical review and medical judgment.'],
        ['Do I need labs?', 'Your provider may require labs or other information before prescribing.'],
        ['What is the $2 payment for?', 'Verification for this clinical qualifier only — not a full treatment charge.'],
        ['Are compounded hormones FDA-approved?', 'Compounded medications are not FDA-approved and are used only when clinically appropriate.'],
      ],
    },
    es: {
      ...sharedProcess.es,
      eyebrow: 'Cuidado hormonal guiado por médicos',
      title: (
        <>
          Cuidado de testosterona con <em>supervisión clínica.</em>
        </>
      ),
      intro:
        'Los protocolos de TRT se consideran solo después de que un proveedor revise síntomas, laboratorios cuando correspondan y su salud general.',
      scienceEyebrow: 'Cómo se aborda el cuidado',
      scienceTitle: 'Apoyo hormonal, nunca asumido.',
      scienceBody:
        'La baja energía o los cambios de ánimo pueden tener muchas causas. El tratamiento no es automático: su proveedor evalúa si la terapia es apropiada.',
      scienceNote: 'La receta se emite solo cuando está clínicamente indicada.',
      scienceLabel: 'Salud hormonal',
      scienceAlt: 'Fotografía clínica de vial de testosterona',
      benefitsEyebrow: 'Qué puede apoyar este camino',
      benefitsTitle: 'Cuidado según sus estudios y objetivos',
      benefits: [
        ['Evaluación individual', 'Las decisiones consideran síntomas, historial y hallazgos clínicos.'],
        ['Protocolos monitoreados', 'Cuando se receta, hay orientación de seguimiento y seguridad.'],
        ['Expectativas claras', 'Su proveedor explica beneficios, riesgos y alternativas.'],
        ['Cumplimiento privado', 'Si se receta, el envío es discreto.'],
      ],
      lifestyleEyebrow: 'Alianza continua',
      lifestyleTitle: 'Diseñado para un cuidado hormonal responsable.',
      lifestyleBody: 'Efexia prioriza el criterio clínico para que la terapia se mantenga alineada con su salud.',
      lifestylePoints: ['Planes dirigidos por clínicos', 'Seguimiento centrado en seguridad', 'Entrega discreta si se receta'],
      lifestyleAlt: 'Hombre manteniendo una rutina activa y saludable',
      faqEyebrow: 'Buen saber',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        ['¿Recibiré TRT automáticamente?', 'No. La elegibilidad depende de la revisión clínica.'],
        ['¿Necesito laboratorios?', 'Su proveedor puede requerir estudios antes de recetar.'],
        ['¿Para qué es el pago de $2?', 'Verificación de este calificador clínico únicamente.'],
        ['¿Las hormonas compuestas están aprobadas por la FDA?', 'Los medicamentos compuestos no están aprobados por la FDA.'],
      ],
    },
  },
  ed: {
    heroImg: '/images/telehealth_doctor.webp',
    scienceImg: '/images/telehealth_doctor.webp',
    lifestyleImg: '/images/efexia-goal-confidence.webp',
    en: {
      ...sharedProcess.en,
      eyebrow: 'Private sexual health care',
      title: (
        <>
          ED care handled with <em>discretion and judgment.</em>
        </>
      ),
      intro:
        'Erectile concerns are common and treatable. A licensed provider reviews your history before recommending any medication option.',
      scienceEyebrow: 'How care is approached',
      scienceTitle: 'Personalized options after clinical review.',
      scienceBody:
        'Treatment may include proven active ingredients in forms tailored by a clinician. The right path depends on your health history, medications, and goals — determined in a private evaluation.',
      scienceNote: 'No prescription is guaranteed by completing intake online.',
      scienceLabel: 'Sexual wellness',
      scienceAlt: 'Private telehealth consultation setting',
      benefitsEyebrow: 'What this path may support',
      benefitsTitle: 'Discreet care, clinical standards',
      benefits: [
        ['Private evaluation', 'Share history securely; decisions stay between you and your provider.'],
        ['Tailored options', 'Dosing and formulation are guided by clinical appropriateness.'],
        ['Clear counseling', 'Risks, benefits, and alternatives are discussed before prescribing.'],
        ['Home delivery', 'If prescribed, fulfillment is discreet and straightforward.'],
      ],
      lifestyleEyebrow: 'Confidence with care',
      lifestyleTitle: 'Support that respects your privacy.',
      lifestyleBody: 'Efexia keeps the process clinical and confidential from intake through follow-up.',
      lifestylePoints: ['Confidential intake', 'Provider-directed plans', 'Discreet shipping when prescribed'],
      lifestyleAlt: 'Man preparing confidently in a refined wellness space',
      faqEyebrow: 'Good to know',
      faqTitle: 'Questions, answered',
      faqs: [
        ['Is this confidential?', 'Yes. Your intake and care discussions are handled as protected clinical information.'],
        ['Will I get medication automatically?', 'No. A provider must determine that treatment is appropriate.'],
        ['What is the $2 payment for?', 'Verification for this clinical qualifier only.'],
        ['Are compounded ED meds FDA-approved?', 'Compounded medications are not FDA-approved.'],
      ],
    },
    es: {
      ...sharedProcess.es,
      eyebrow: 'Cuidado privado de salud sexual',
      title: (
        <>
          Cuidado de DE con <em>discreción y criterio.</em>
        </>
      ),
      intro:
        'Los problemas de erección son comunes y tratables. Un proveedor con licencia revisa su historial antes de recomendar opciones.',
      scienceEyebrow: 'Cómo se aborda el cuidado',
      scienceTitle: 'Opciones personalizadas tras revisión clínica.',
      scienceBody:
        'El tratamiento puede incluir ingredientes activos probados en formas adaptadas por un clínico, según su historial y objetivos.',
      scienceNote: 'Completar la evaluación no garantiza una receta.',
      scienceLabel: 'Bienestar sexual',
      scienceAlt: 'Entorno de consulta de telesalud privada',
      benefitsEyebrow: 'Qué puede apoyar este camino',
      benefitsTitle: 'Cuidado discreto, estándares clínicos',
      benefits: [
        ['Evaluación privada', 'Comparta su historial de forma segura.'],
        ['Opciones adaptadas', 'La dosis y formulación siguen criterio clínico.'],
        ['Orientación clara', 'Se analizan riesgos, beneficios y alternativas.'],
        ['Entrega a domicilio', 'Si se receta, el cumplimiento es discreto.'],
      ],
      lifestyleEyebrow: 'Confianza con cuidado',
      lifestyleTitle: 'Apoyo que respeta su privacidad.',
      lifestyleBody: 'Efexia mantiene el proceso clínico y confidencial desde la evaluación hasta el seguimiento.',
      lifestylePoints: ['Evaluación confidencial', 'Planes dirigidos por el proveedor', 'Envío discreto si se receta'],
      lifestyleAlt: 'Hombre preparándose con confianza',
      faqEyebrow: 'Buen saber',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        ['¿Es confidencial?', 'Sí. Su información se maneja como información clínica protegida.'],
        ['¿Recibiré medicamento automáticamente?', 'No. Un proveedor debe determinar que es apropiado.'],
        ['¿Para qué es el pago de $2?', 'Verificación de este calificador clínico únicamente.'],
        ['¿Los medicamentos compuestos de DE están aprobados por la FDA?', 'Los medicamentos compuestos no están aprobados por la FDA.'],
      ],
    },
  },
  hair: {
    heroImg: '/images/hair_dropper.webp',
    scienceImg: '/images/hair_dropper.webp',
    lifestyleImg: '/images/efexia-goal-confidence.webp',
    en: {
      ...sharedProcess.en,
      eyebrow: 'Physician-guided hair care',
      title: (
        <>
          Hair restoration with a <em>clinical plan.</em>
        </>
      ),
      intro:
        'Topical and oral options may be considered when a licensed provider determines they fit your history and goals.',
      scienceEyebrow: 'How care is approached',
      scienceTitle: 'Targeted options, clinical judgment.',
      scienceBody:
        'Hair protocols can combine established ingredients when appropriate. Your provider reviews suitability, expected timelines, and monitoring — results vary by individual.',
      scienceNote: 'No outcome is guaranteed. Treatment begins only if prescribed after review.',
      scienceLabel: 'Hair health',
      scienceAlt: 'Clinical hair treatment dropper photography',
      benefitsEyebrow: 'What this path may support',
      benefitsTitle: 'A plan tailored to you',
      benefits: [
        ['Clinical screening', 'History and goals guide whether therapy is appropriate.'],
        ['Formulation choices', 'Providers may recommend topical, oral, or combined approaches.'],
        ['Realistic timelines', 'Expectations are set with clinical honesty, not marketing hype.'],
        ['Ongoing guidance', 'Follow-up helps refine the plan if treatment continues.'],
      ],
      lifestyleEyebrow: 'Consistency matters',
      lifestyleTitle: 'Care designed for the long view.',
      lifestyleBody: 'Hair protocols work best with adherence and provider check-ins. Efexia keeps that path private and structured.',
      lifestylePoints: ['Provider-selected options', 'Clear use guidance', 'Discreet fulfillment when prescribed'],
      lifestyleAlt: 'Man focused on personal care and confidence',
      faqEyebrow: 'Good to know',
      faqTitle: 'Questions, answered',
      faqs: [
        ['Will hair grow back for everyone?', 'No. Responses vary; your provider sets realistic expectations.'],
        ['Are compounded hair meds FDA-approved?', 'Compounded medications are not FDA-approved.'],
        ['What is the $2 payment for?', 'Verification for this clinical qualifier only.'],
        ['Can I stop anytime?', 'Discuss changes with your provider before stopping prescribed therapy.'],
      ],
    },
    es: {
      ...sharedProcess.es,
      eyebrow: 'Cuidado capilar guiado por médicos',
      title: (
        <>
          Restauración capilar con un <em>plan clínico.</em>
        </>
      ),
      intro:
        'Las opciones tópicas y orales se consideran cuando un proveedor determina que encajan con su historial y objetivos.',
      scienceEyebrow: 'Cómo se aborda el cuidado',
      scienceTitle: 'Opciones dirigidas, criterio clínico.',
      scienceBody:
        'Los protocolos capilares pueden combinar ingredientes establecidos cuando corresponde. Los resultados varían.',
      scienceNote: 'Ningún resultado está garantizado. El tratamiento inicia solo si se receta.',
      scienceLabel: 'Salud capilar',
      scienceAlt: 'Fotografía clínica de gotero capilar',
      benefitsEyebrow: 'Qué puede apoyar este camino',
      benefitsTitle: 'Un plan adaptado a usted',
      benefits: [
        ['Evaluación clínica', 'El historial guía si la terapia es apropiada.'],
        ['Opciones de formulación', 'Tópica, oral o combinada según el proveedor.'],
        ['Plazos realistas', 'Expectativas con honestidad clínica.'],
        ['Orientación continua', 'El seguimiento refina el plan si continúa el tratamiento.'],
      ],
      lifestyleEyebrow: 'La constancia importa',
      lifestyleTitle: 'Cuidado pensado a largo plazo.',
      lifestyleBody: 'Los protocolos capilares funcionan mejor con adherencia y revisiones del proveedor.',
      lifestylePoints: ['Opciones elegidas por el proveedor', 'Guía de uso clara', 'Cumplimiento discreto si se receta'],
      lifestyleAlt: 'Hombre enfocado en el cuidado personal',
      faqEyebrow: 'Buen saber',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        ['¿El cabello vuelve a crecer en todos?', 'No. Las respuestas varían.'],
        ['¿Los medicamentos compuestos están aprobados por la FDA?', 'No están aprobados por la FDA.'],
        ['¿Para qué es el pago de $2?', 'Verificación de este calificador clínico únicamente.'],
        ['¿Puedo detener el tratamiento?', 'Consulte a su proveedor antes de suspender una terapia recetada.'],
      ],
    },
  },
  wellness: {
    heroImg: '/images/nad_vial.webp',
    scienceImg: '/images/nad_vial.webp',
    lifestyleImg: '/images/efexia-goal-longevity.webp',
    en: {
      ...sharedProcess.en,
      eyebrow: 'Physician-guided cellular wellness',
      title: (
        <>
          NAD+ and wellness care with <em>clinical intent.</em>
        </>
      ),
      intro:
        'Cellular wellness options are considered when a licensed provider finds them appropriate for your history and goals.',
      scienceEyebrow: 'How care is approached',
      scienceTitle: 'Support at the cellular level — carefully.',
      scienceBody:
        'NAD+ and related protocols are discussed in clinical context. Your provider weighs evidence, safety, and alternatives before any prescription decision.',
      scienceNote: 'Marketing language is not a medical recommendation. Eligibility requires review.',
      scienceLabel: 'Cellular wellness',
      scienceAlt: 'Clinical NAD+ vial photography',
      benefitsEyebrow: 'What this path may support',
      benefitsTitle: 'Thoughtful longevity-minded care',
      benefits: [
        ['Clinical screening', 'History and goals determine whether therapy belongs in your plan.'],
        ['Energy & focus context', 'Providers may discuss options that support day-to-day vitality when appropriate.'],
        ['Safety first', 'Risks and interactions are reviewed before prescribing.'],
        ['Continued access', 'If prescribed, your care team remains available for questions.'],
      ],
      lifestyleEyebrow: 'Longevity with discipline',
      lifestyleTitle: 'Wellness care that stays medical.',
      lifestyleBody: 'Efexia keeps advanced wellness options grounded in provider oversight — not hype.',
      lifestylePoints: ['Provider judgment first', 'Clear counseling', 'Discreet shipping when prescribed'],
      lifestyleAlt: 'Healthy mature man in a calm wellness environment',
      faqEyebrow: 'Good to know',
      faqTitle: 'Questions, answered',
      faqs: [
        ['Is NAD+ right for everyone?', 'No. Suitability depends on clinical review.'],
        ['Are compounded wellness meds FDA-approved?', 'Compounded medications are not FDA-approved.'],
        ['What is the $2 payment for?', 'Verification for this clinical qualifier only.'],
        ['Will I feel results immediately?', 'Experiences vary; your provider sets expectations.'],
      ],
    },
    es: {
      ...sharedProcess.es,
      eyebrow: 'Bienestar celular guiado por médicos',
      title: (
        <>
          Cuidado de NAD+ y bienestar con <em>intención clínica.</em>
        </>
      ),
      intro:
        'Las opciones de bienestar celular se consideran cuando un proveedor las encuentra apropiadas para su historial.',
      scienceEyebrow: 'Cómo se aborda el cuidado',
      scienceTitle: 'Apoyo celular — con cuidado.',
      scienceBody:
        'NAD+ y protocolos relacionados se analizan en contexto clínico. Su proveedor evalúa evidencia, seguridad y alternativas.',
      scienceNote: 'El lenguaje de marketing no es una recomendación médica.',
      scienceLabel: 'Bienestar celular',
      scienceAlt: 'Fotografía clínica de vial NAD+',
      benefitsEyebrow: 'Qué puede apoyar este camino',
      benefitsTitle: 'Cuidado de longevidad con criterio',
      benefits: [
        ['Evaluación clínica', 'El historial determina si la terapia pertenece a su plan.'],
        ['Contexto de energía y enfoque', 'Se pueden discutir opciones cuando sean apropiadas.'],
        ['Seguridad primero', 'Se revisan riesgos e interacciones antes de recetar.'],
        ['Acceso continuo', 'Si se receta, su equipo permanece disponible.'],
      ],
      lifestyleEyebrow: 'Longevidad con disciplina',
      lifestyleTitle: 'Bienestar que permanece médico.',
      lifestyleBody: 'Efexia mantiene las opciones avanzadas bajo supervisión del proveedor.',
      lifestylePoints: ['Criterio del proveedor primero', 'Orientación clara', 'Envío discreto si se receta'],
      lifestyleAlt: 'Hombre maduro saludable en un entorno de bienestar',
      faqEyebrow: 'Buen saber',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        ['¿El NAD+ es para todos?', 'No. Depende de la revisión clínica.'],
        ['¿Los medicamentos compuestos están aprobados por la FDA?', 'No están aprobados por la FDA.'],
        ['¿Para qué es el pago de $2?', 'Verificación de este calificador clínico únicamente.'],
        ['¿Notaré resultados de inmediato?', 'Las experiencias varían; su proveedor fija expectativas.'],
      ],
    },
  },
};

type TreatmentDetailsProps = { locale: Locale };

function TreatmentDetails({ locale }: TreatmentDetailsProps) {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (id === 'peptide') {
    return <PeptideTreatment locale={locale} />;
  }

  const page = id ? treatmentPages[id] : undefined;

  if (!page || !id) {
    return (
      <div className="retro-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>{locale === 'en' ? 'Treatment Not Found' : 'Tratamiento no encontrado'}</h2>
        <Link href="/#treatments" className="btn btn-red" style={{ marginTop: '20px' }}>
          {locale === 'en' ? 'Return to treatments' : 'Volver a tratamientos'}
        </Link>
      </div>
    );
  }

  const copy = page[locale] || page.en;
  const checkout = startCheckoutHref(id);

  return (
    <div className="peptide-page">
      <section className="peptide-hero">
        <ResponsiveImage
          className="peptide-hero__image"
          src={page.heroImg}
          alt=""
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        <div className="peptide-hero__veil" aria-hidden="true" />
        <div className="container peptide-hero__inner">
          <ScrollReveal eager variant="fade-up" className="peptide-hero__copy">
            <Link href="/#treatments" className="peptide-back">
              <span>←</span> {copy.back}
            </Link>
            <p className="peptide-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="peptide-hero__intro">{copy.intro}</p>
            <div className="peptide-actions">
              <Link href={checkout} className="peptide-button peptide-button--primary">
                {copy.primary}
                <ArrowIcon />
              </Link>
              <a href="#treatment-process" className="peptide-button peptide-button--glass">
                {copy.secondary}
              </a>
            </div>
          </ScrollReveal>
          <div className="peptide-proof">
            {copy.proof.map((item) => (
              <span key={item}>
                <CheckIcon />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="peptide-section peptide-science">
        <div className="container peptide-split">
          <ScrollReveal variant="slide-left" className="peptide-image-card peptide-image-card--science">
            <ResponsiveImage
              src={page.scienceImg}
              alt={copy.scienceAlt}
              sizes="(max-width: 991px) calc(100vw - 48px), 50vw"
            />
            <span className="peptide-image-label">{copy.scienceLabel}</span>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" className="peptide-copy-block">
            <p className="peptide-kicker">{copy.scienceEyebrow}</p>
            <h2>{copy.scienceTitle}</h2>
            <p>{copy.scienceBody}</p>
            <aside className="peptide-clinical-note">
              <span>i</span>
              <p>{copy.scienceNote}</p>
            </aside>
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

      <section className="peptide-section peptide-process" id="treatment-process">
        <div className="container">
          <ScrollReveal variant="fade-up" className="peptide-section-heading peptide-section-heading--light">
            <p className="peptide-kicker">{copy.processEyebrow}</p>
            <h2>{copy.processTitle}</h2>
          </ScrollReveal>
          <div className="peptide-steps">
            {copy.steps.map(([title, body], index) => (
              <ScrollReveal key={title} variant="fade-up" delay={index + 1} className="peptide-step">
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="scale-in" className="peptide-process__action">
            <Link href={checkout} className="peptide-button peptide-button--teal">
              {copy.primary}
              <ArrowIcon />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="peptide-section peptide-lifestyle">
        <div className="container peptide-lifestyle__card">
          <div className="peptide-lifestyle__image">
            <ResponsiveImage
              src={page.lifestyleImg}
              alt={copy.lifestyleAlt}
              sizes="(max-width: 991px) calc(100vw - 48px), 54vw"
            />
          </div>
          <ScrollReveal variant="slide-right" className="peptide-lifestyle__copy">
            <p className="peptide-kicker">{copy.lifestyleEyebrow}</p>
            <h2>{copy.lifestyleTitle}</h2>
            <p>{copy.lifestyleBody}</p>
            <ul>
              {copy.lifestylePoints.map((point) => (
                <li key={point}>
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
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
                <span>0{index + 1}</span>
                <div>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
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
            <Link href={checkout} className="peptide-button peptide-button--teal">
              {copy.primary}
              <ArrowIcon />
            </Link>
            <small>{copy.disclaimer}</small>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default TreatmentDetails;
