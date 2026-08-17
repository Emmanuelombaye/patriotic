'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { translations } from '@/lib/translations';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import GoalTreatments from '@/components/GoalTreatments';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

type HomeProps = { locale: Locale };

const TYPER_WORDS = {
  en: ['Tirzepatide', 'Semaglutide'],
  es: ['Tirzepatida', 'Semaglutida'],
};

const TYPER_COLORS = ['#F7F9FF', '#00D5C8', '#7B61FF', '#5A4CFF', '#FFFFFF'];

const CARE_MARQUEE_ITEMS = [
  { mark: 'E+', label: 'Efexia Clinical', detail: 'Care Network', className: 'marquee-serif' },
  { mark: 'Rx', label: 'Pharmacy', detail: 'Network', className: 'marquee-modern' },
  { mark: 'MD', label: 'Licensed', detail: 'Providers', className: 'marquee-grotesk' },
  { mark: '◈', label: 'Secure', detail: 'Telehealth', className: 'marquee-editorial' },
  { mark: '→', label: 'Discreet', detail: 'Fulfillment', className: 'marquee-wide' },
  { mark: '✓', label: 'Patient', detail: 'Support', className: 'marquee-serif' },
];

function Home({ locale }: HomeProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Rotating header typer effect
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typerWords = TYPER_WORDS[locale];

  useEffect(() => {
    // Intersection Observer for Sticky Scroll steps
    const stepElements = document.querySelectorAll('.sticky-step-card');
    
    if (stepElements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveStep(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    stepElements.forEach((el) => observer.observe(el));

    return () => {
      stepElements.forEach((el) => observer.unobserve(el));
    };
  }, [locale]); // re-run if language changes because DOM might refresh

  useEffect(() => {
    const currentWord = typerWords[wordIndex];
    if (!isDeleting && currentText === currentWord) {
      const timer = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timer);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typerWords.length);
      return undefined;
    }

    const nextLength = currentText.length + (isDeleting ? -1 : 1);
    const timer = setTimeout(
      () => setCurrentText(currentWord.substring(0, nextLength)),
      isDeleting ? 40 : 70,
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typerWords]);

  const t = (key: string) => translations[locale][key] || key;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      number: 1,
      title: t('step1Title'),
      desc: t('step1Desc'),
      btnText: t('step1Btn'),
      image: '/images/diagnostic_kit.webp'
    },
    {
      number: 2,
      title: t('step2Title'),
      desc: t('step2Desc'),
      btnText: t('step2Btn'),
      image: '/images/telehealth_doctor.webp'
    },
    {
      number: 3,
      title: t('step3Title'),
      desc: t('step3Desc'),
      btnText: t('step3Btn'),
      image: '/images/discreet_packaging.webp'
    },
    {
      number: 4,
      title: t('step4Title'),
      desc: t('step4Desc'),
      btnText: t('step4Btn'),
      image: '/images/semaglutide_vial.webp'
    }
  ];

  const features = [
    {
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      image: "/images/feature_medical_team_1783030032632.webp"
    },
    {
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      image: "/images/feature_personalized_plan_1783030048726.webp"
    },
    {
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      image: "/images/feature_telehealth_1783030058457.webp"
    },
    {
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      image: "/images/feature_discreet_shipping_1783030073250.webp"
    },
    {
      title: t('feat5Title'),
      desc: t('feat5Desc'),
      image: "/images/feature_ongoing_support_1783030084188.webp"
    },
    {
      title: t('feat6Title'),
      desc: t('feat6Desc'),
      image: "/images/feature_science_backed_1783030014752.webp"
    }
  ];

  const faqItemsClean = [
    {
      question: locale === 'en' ? 'What does Efexia mean?' : '¿Qué significa Efexia?',
      answer: locale === 'en'
        ? 'Efexia is the Greek word for wellness, wellbeing, or the state of good condition. Care begins with a clinical intake and licensed-provider review — completing intake does not guarantee a prescription.'
        : 'Efexia es la palabra griega para bienestar. El cuidado comienza con una evaluación clínica y revisión de un proveedor con licencia — completar la evaluación no garantiza una receta.',
    },
    {
      question: locale === 'en' ? 'How does the process work?' : '¿Cómo funciona el proceso?',
      answer: locale === 'en'
        ? 'Complete a clinical intake, then a U.S.-licensed provider reviews your information. If treatment is appropriate, Semaglutide is $239/mo and Tirzepatide is $345/mo, fulfilled through a licensed pharmacy partner.'
        : 'Complete una evaluación clínica; luego un proveedor con licencia en EE. UU. revisa su información. Si el tratamiento es apropiado, Semaglutida cuesta $239/mes y Tirzepatida $345/mes.',
    },
    {
      question: locale === 'en' ? 'Does paying guarantee treatment?' : '¿El pago garantiza tratamiento?',
      answer: locale === 'en'
        ? 'No. Semaglutide is $239/mo and Tirzepatide is $345/mo only if a licensed provider prescribes. Completing intake does not guarantee a prescription.'
        : 'No. Semaglutida cuesta $239/mes y Tirzepatida $345/mes solo si un proveedor con licencia receta. Completar la evaluación no garantiza una receta.',
    },
    {
      question: locale === 'en' ? 'Are compounded medications FDA-approved?' : '¿Los medicamentos compuestos están aprobados por la FDA?',
      answer: locale === 'en'
        ? 'Compounded medications are not FDA-approved. They may be prescribed for an individual patient when a licensed clinician determines they are clinically appropriate.'
        : 'Los medicamentos compuestos no están aprobados por la FDA. Pueden recetarse cuando un clínico con licencia determina que son apropiados.',
    },
    {
      question: locale === 'en' ? 'Who provides the medical review?' : '¿Quién realiza la revisión médica?',
      answer: locale === 'en'
        ? 'Telehealth consultations are provided by independent, U.S.-licensed clinicians. Eligibility is subject to their clinical judgment after reviewing your intake.'
        : 'Las consultas de telesalud las proporcionan clínicos independientes con licencia en EE. UU. La elegibilidad depende de su criterio clínico.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="retro-home-hero-section">
        <ScrollReveal variant="scale-in" eager className="retro-home-hero-card">
          <div className="retro-home-hero-contain">
            <div className="retro-home-hero-wrap">
              <div className="retro-home-hero-copy">
                <div className="retro-home-hero-eyebrow">
                  <span className="retro-home-hero-eyebrow-dot" aria-hidden="true" />
                  <span>{locale === 'en' ? 'Personalized care for' : 'Atención personalizada para'}</span>
                  <span className="retro-home-hero-rotating" style={{ color: TYPER_COLORS[wordIndex] }}>
                    {currentText}
                    <span className="typer-cursor" aria-hidden="true">|</span>
                  </span>
                </div>
                <h1 className="retro-home-hero-title">
                  {locale === 'en' ? 'Beyond Health.' : 'Más allá de la salud.'}
                </h1>
                <p className="retro-home-hero-subtitle">
                  {locale === 'en'
                    ? 'Personalized metabolic care. A licensed U.S. provider reviews your intake before any prescription.'
                    : 'Cuidado metabólico personalizado. Un proveedor con licencia en EE. UU. revisa su evaluación antes de cualquier receta.'}
                </p>
                <div className="retro-home-hero-actions">
                  <Link href={startCheckoutHref()} className="retro-home-hero-action retro-home-hero-action--primary">
                    <span>{locale === 'en' ? 'Start from $239' : 'Comenzar desde $239'}</span>
                    <span className="retro-home-hero-action-icon" aria-hidden="true">→</span>
                  </Link>
                  <a href="#treatments" className="retro-home-hero-action retro-home-hero-action--secondary">
                    <span>{locale === 'en' ? 'Discover Efexia' : 'Descubre Efexia'}</span>
                    <span className="retro-home-hero-action-icon" aria-hidden="true">↓</span>
                  </a>
                </div>
                <p className="retro-home-hero-note">
                  {locale === 'en'
                    ? 'Licensed U.S. providers · From $239/mo · No prescription guaranteed by intake alone'
                    : 'Proveedores con licencia en EE. UU. · Desde $239/mes · La evaluación sola no garantiza receta'}
                </p>
              </div>
              <div className="retro-home-hero-visual" aria-hidden="true">
                <ResponsiveImage
                  src="/images/efexia-goal-strength.webp"
                  alt=""
                  className="retro-home-hero-visual__img"
                  sizes="(max-width: 900px) 86vw, 42vw"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="care-marquee" aria-label={locale === 'en' ? 'Efexia care standards' : 'Estándares de atención de Efexia'}>
        <div className="care-marquee__viewport">
          <div className="care-marquee__track">
            {[0, 1].map((copy) => (
              <div className="care-marquee__group" aria-hidden={copy === 1} key={copy}>
                {CARE_MARQUEE_ITEMS.map((item) => (
                  <span className={`care-marquee__item ${item.className}`} key={`${copy}-${item.label}`}>
                    <span className="care-marquee__mark" aria-hidden="true">{item.mark}</span>
                    <span className="care-marquee__wordmark">
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoalTreatments locale={locale} />

      <section id="how-it-works" className="retro-dark-section how-it-works-sticky">
        <div className="retro-container">
          <ScrollReveal variant="fade-up" className="retro-section-head retro-section-head--light">
            <span className="retro-tag" style={{color: 'var(--champagne-gold)'}}>{t('howItWorksTag')}</span>
            <h2 className="retro-h2" style={{color: '#fff'}}>{t('howItWorksTitle')}</h2>
          </ScrollReveal>

          <div className="sticky-scroll-wrapper">
            {/* Left Sticky Column (Images) */}
            <div className="sticky-image-container">
              <div className="sticky-image-slide active" key={steps[activeStep].number}>
                <ResponsiveImage
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  sizes="500px"
                />
              </div>
            </div>

            {/* Right Scrolling Column (Text Steps) */}
            <div className="sticky-steps-container">
              {steps.map((step, index) => (
                <ScrollReveal
                  key={step.number}
                  as="div"
                  data-index={index}
                  variant={index % 2 === 0 ? 'slide-right' : 'slide-left'}
                  delay={(index % 3) + 1}
                  className={`sticky-step-card ${activeStep === index ? 'active' : ''} hover-lift`}
                  onClick={() => { window.location.href = startCheckoutHref(); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sticky-step-number">{step.number}</div>
                  <h3 className="sticky-step-title">{step.title}</h3>
                  <p className="sticky-step-desc">{step.desc}</p>
                  <div className="sticky-mobile-img">
                    <ResponsiveImage
                      src={step.image}
                      alt={step.title}
                      sizes="calc(100vw - 96px)"
                    />
                  </div>
                  <button className="sticky-step-link">{step.btnText}</button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="about-yucca">
        <div className="retro-container">
          <ScrollReveal variant="fade-up" className="about-yucca__head">
            <span className="retro-tag">{locale === 'en' ? 'About Efexia' : 'Sobre Efexia'}</span>
            <h2 className="retro-h2">
              {locale === 'en'
                ? 'Wellness, wellbeing, and the state of good condition.'
                : 'Bienestar, salud y el estado de buena condición.'}
            </h2>
            <p className="about-yucca__lede">
              {locale === 'en'
                ? 'Efexia is the Greek word for wellness, wellbeing, or the state of good condition. The platform connects eligible patients with independent U.S.-licensed clinicians. Completing intake does not guarantee a prescription. If treatment is appropriate, Semaglutide is $239/mo and Tirzepatide is $345/mo, fulfilled through a licensed pharmacy partner.'
                : 'Efexia es la palabra griega para bienestar, salud o el estado de buena condición. La plataforma conecta a pacientes elegibles con clínicos independientes con licencia en EE. UU. Completar la evaluación no garantiza una receta. Si el tratamiento es apropiado, Semaglutida cuesta $239/mes y Tirzepatida $345/mes, surtidas por una farmacia asociada con licencia.'}
            </p>
          </ScrollReveal>

          <div className="about-story-stack">
            {(locale === 'en'
              ? [
                  {
                    kicker: 'Licensed review',
                    title: 'A U.S.-licensed clinician reviews every intake.',
                    body: 'Care is not automated. After you complete the 4-step qualifier, an affiliated licensed provider reviews your information and decides whether treatment is clinically appropriate.',
                    image: '/images/telehealth_doctor.webp',
                    alt: 'Licensed clinician reviewing a telehealth consultation',
                    flip: false,
                  },
                  {
                    kicker: 'Two treatments',
                    title: 'Semaglutide $239/mo. Tirzepatide $345/mo.',
                    body: 'Those prices apply only if a licensed provider prescribes. The public catalog is limited to these two options. Compounded medication is used only when clinically appropriate and is not FDA-approved.',
                    image: '/images/efexia-goal-longevity.webp',
                    alt: 'Calm setting associated with metabolic wellness',
                    flip: true,
                  },
                  {
                    kicker: 'Private fulfillment',
                    title: 'Discreet shipping when a prescription is issued.',
                    body: 'If prescribed, medication is dispensed by a licensed U.S. pharmacy partner and shipped in discreet packaging. Availability depends on your location, clinical review, and pharmacy authorization.',
                    image: '/images/discreet_packaging.webp',
                    alt: 'Discreet pharmacy packaging',
                    flip: false,
                  },
                ]
              : [
                  {
                    kicker: 'Revisión con licencia',
                    title: 'Un clínico con licencia en EE. UU. revisa cada evaluación.',
                    body: 'El cuidado no es automático. Después del calificador de 4 pasos, un proveedor afiliado con licencia revisa su información y decide si el tratamiento es clínicamente apropiado.',
                    image: '/images/telehealth_doctor.webp',
                    alt: 'Clínico con licencia revisando una consulta de telesalud',
                    flip: false,
                  },
                  {
                    kicker: 'Dos tratamientos',
                    title: 'Semaglutida $239/mes. Tirzepatida $345/mes.',
                    body: 'Esos precios aplican solo si un proveedor con licencia receta. El catálogo público se limita a estas dos opciones. El medicamento compuesto se usa solo cuando es clínicamente apropiado y no está aprobado por la FDA.',
                    image: '/images/efexia-goal-longevity.webp',
                    alt: 'Entorno calmado de bienestar metabólico',
                    flip: true,
                  },
                  {
                    kicker: 'Surtido privado',
                    title: 'Envío discreto cuando se emite una receta.',
                    body: 'Si se receta, el medicamento lo surte una farmacia asociada con licencia en EE. UU. y se envía en empaque discreto. La disponibilidad depende de su ubicación, la revisión clínica y la autorización de la farmacia.',
                    image: '/images/discreet_packaging.webp',
                    alt: 'Empaque discreto de farmacia',
                    flip: false,
                  },
                ]
            ).map((story, idx) => (
              <ScrollReveal
                key={story.title}
                variant={idx % 2 === 0 ? 'slide-left' : 'slide-right'}
                delay={(idx % 3) + 1}
                className={`about-story${story.flip ? ' about-story--flip' : ''}`}
              >
                <div className="about-story__media">
                  <ResponsiveImage
                    src={story.image}
                    alt={story.alt}
                    className="about-story__img"
                    sizes="(max-width: 900px) 92vw, 48vw"
                  />
                </div>
                <div className="about-story__copy">
                  <p className="about-story__kicker">{story.kicker}</p>
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="about-mosaic" aria-label={locale === 'en' ? 'How Efexia care works' : 'Cómo funciona el cuidado de Efexia'}>
            {features.map((feat, idx) => (
              <ScrollReveal
                key={feat.title}
                variant="fade-up"
                delay={(idx % 4) + 1}
                className="about-mosaic__card"
              >
                <div className="about-mosaic__media">
                  <ResponsiveImage
                    src={feat.image}
                    alt={feat.title}
                    className="about-mosaic__img"
                    sizes="(max-width: 767px) 78vw, 280px"
                  />
                </div>
                <div className="about-mosaic__copy">
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="retro-faq-section">
        <div className="retro-container">
          <ScrollReveal variant="fade-up" className="retro-section-head">
            <span className="retro-tag">{t('faq')}</span>
            <h2 className="retro-h2">{locale === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}</h2>
          </ScrollReveal>

          <div className="faqs-list-PMC">
            {faqItemsClean.map((item, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={(idx % 4) + 1} className={`faq-item-PMC ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question-btn-PMC" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question-PMC">{item.question}</span>
                  <span className="faq-icon-PMC">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-panel-PMC" style={{ maxHeight: openFaq === idx ? '800px' : '0' }}>
                  <div className="faq-answer-inner-PMC">
                     <p>{item.answer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div id="contact" className="cta-banner-PMC">
        <div className="container cta-banner-container-PMC">
          <ScrollReveal variant="slide-left" className="cta-banner-content-left-PMC">
            <h2 className="cta-banner-title-PMC">{t('preFooterTitle')}</h2>
            <p className="cta-banner-desc-PMC">{t('preFooterSub')}</p>
            <button className="btn btn-red cta-btn-left-PMC" onClick={() => window.location.href = startCheckoutHref()}>
              {locale === 'en' ? 'Start from $239' : 'Comenzar desde $239'}
            </button>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={2} className="cta-banner-image-right-PMC">
            <ResponsiveImage
              src="/images/cta-transformation.webp"
              alt=""
              className="cta-man-img-PMC"
              sizes="(max-width: 767px) calc(100vw - 48px), 50vw"
            />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

export default Home;
