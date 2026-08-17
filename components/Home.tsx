'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { translations } from '@/lib/translations';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import GoalTreatments from '@/components/GoalTreatments';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';
import { scrollToSection, updateSectionHash } from '@/lib/scrollToSection';

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
                  <a
                    href="/#treatments"
                    className="retro-home-hero-action retro-home-hero-action--secondary"
                    onClick={(event) => {
                      event.preventDefault();
                      updateSectionHash('treatments');
                      scrollToSection('treatments');
                    }}
                  >
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

      <section id="about-us" className="about-teaser">
        <div className="retro-container">
          <ScrollReveal variant="fade-up" className="about-teaser__card">
            <div className="about-teaser__media">
              <ResponsiveImage
                src="/images/telehealth_doctor.webp"
                alt=""
                className="about-teaser__img"
                sizes="(max-width: 900px) 92vw, 42vw"
              />
            </div>
            <div className="about-teaser__copy">
              <span className="retro-tag">{locale === 'en' ? 'About Efexia' : 'Sobre Efexia'}</span>
              <h2>
                {locale === 'en'
                  ? 'Wellness, wellbeing, and the state of good condition.'
                  : 'Bienestar, salud y el estado de buena condición.'}
              </h2>
              <p>
                {locale === 'en'
                  ? 'Efexia connects eligible patients with independent U.S.-licensed clinicians. Completing intake does not guarantee a prescription.'
                  : 'Efexia conecta a pacientes elegibles con clínicos independientes con licencia en EE. UU. Completar la evaluación no garantiza una receta.'}
              </p>
              <Link href="/about" className="tx-product__cta tx-product__cta--primary">
                {locale === 'en' ? 'Read about Efexia' : 'Leer sobre Efexia'}
              </Link>
            </div>
          </ScrollReveal>
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
