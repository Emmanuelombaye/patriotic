import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../translations';

const faqItemsEn = [
  {
    question: 'How does Patriot Men\'s Health telehealth work?',
    answer: 'It\'s simple and fully virtual. First, you complete a brief online health questionnaire sharing your goals and history. Next, one of our licensed U.S. physicians reviews your intake. If eligible, they prescribe a personalized treatment protocol. Finally, our partner compounding pharmacy ships your medications directly to your door in discreet packaging.'
  },
  {
    question: 'Do I need insurance to use your services?',
    answer: 'No, insurance is not required. We operate on a direct-to-consumer cash-pay subscription model. This allows us to keep pricing transparent, affordable, and free from insurance pre-approvals or co-pays. The price you see covers the physician consult, prescription, shipping, and all treatment supplies.'
  },
  {
    question: 'Are the medications real and FDA-regulated?',
    answer: 'We work exclusively with state-licensed, U.S. compounding pharmacies that comply with strict federal quality standards. Compounded medications are customized preparations made by licensed pharmacists based on a physician\'s prescription, incorporating active pharmaceutical ingredients identical to brand-name alternatives.'
  },
  {
    question: 'How often will my blood work be monitored for TRT?',
    answer: 'Safety is our absolute priority. For TRT patients, we require an initial blood panel prior to beginning therapy to establish baseline levels. We then schedule regular follow-up blood work (typically at 3 months, 6 months, and annually) to monitor free and total testosterone, hematocrit, PSA, and other biomarkers to ensure your protocol is safe and optimal.'
  },
  {
    question: 'Can I cancel my subscription or change treatments?',
    answer: 'Yes, absolutely. All of our plans are flexible monthly subscriptions. You can request changes to your dosage, adjust your shipping frequency, or pause/cancel your account at any time by contacting our patient support team without any hidden cancellation fees.'
  }
];

const faqItemsEs = [
  {
    question: '¿Cómo funciona la telemedicina de Patriot Men\'s Health?',
    answer: 'Es simple y totalmente virtual. Primero, complete un breve cuestionario de salud en línea compartiendo sus objetivos e historial. Luego, uno de nuestros médicos con licencia en EE. UU. revisa su información. Si califica, le recetará un protocolo de tratamiento personalizado. Finalmente, nuestra farmacia de compuestos asociada envía sus medicamentos directamente a su puerta en un empaque discreto.'
  },
  {
    question: '¿Necesito seguro para usar sus servicios?',
    answer: 'No, no se requiere seguro. Operamos en un modelo de suscripción de pago en efectivo directo al consumidor. Esto nos permite mantener precios transparentes, asequibles y libres de aprobaciones previas de seguros o copagos. El precio que ve cubre la consulta médica, la receta, el envío y todos los suministros de tratamiento.'
  },
  {
    question: '¿Los medicamentos son reales y están regulados por la FDA?',
    answer: 'Trabajamos exclusivamente con farmacias de compuestos con licencia estatal en EE. UU. que cumplen con los estrictos estándares de calidad federales. Los medicamentos compuestos son preparaciones personalizadas realizadas por farmacéuticos autorizados basadas en la receta de un médico, incorporando ingredientes farmacéuticos activos idénticos a las alternativas de marca.'
  },
  {
    question: '¿Con qué frecuencia se controlarán mis análisis de sangre para TRT?',
    answer: 'La seguridad es nuestra absoluta prioridad. Para los pacientes de TRT, requerimos un panel de sangre inicial antes de comenzar la terapia para establecer los niveles de referencia. Luego programamos análisis de sangre de seguimiento regulares (generalmente a los 3 meses, 6 meses y anualmente) para monitorear la testosterona libre y total, el hematocrito, el PSA y otros biomarcadores para garantizar que su protocolo sea seguro y óptimo.'
  },
  {
    question: '¿Puedo cancelar mi suscripción o cambiar de tratamiento?',
    answer: 'Sí, absolutamente. Todos nuestros planes son suscripciones mensuales flexibles. Puede solicitar cambios en su dosis, ajustar la frecuencia de envío o pausar/cancelar su cuenta en cualquier momento comunicándose con nuestro equipo de atención al paciente sin cargos de cancelación ocultos.'
  }
];

function Home({ locale, setQuizOpen }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Rotating header typer effect
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(70);

  const typerWords = locale === 'en'
    ? ["Weight Loss", "TRT Therapy", "ED Care", "Hair Growth", "Wellness"]
    : ["Pérdida de Peso", "Terapia TRT", "Cuidado de DE", "Crecimiento Capilar", "Bienestar"];

  const typerColors = ["#B9A9FE", "#81C777", "#FFBC7D", "#86ceff", "#ffb400"];

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
    let timer;
    const currentWord = typerWords[wordIndex];
    
    if (isDeleting) {
      setTypeSpeed(40);
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, typeSpeed);
    } else {
      setTypeSpeed(70);
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, typeSpeed);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typerWords.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, locale]);

  const t = (key) => translations[locale][key] || key;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const treatmentItems = [
    {
      id: 'trt',
      title: t('trtTitle'),
      desc: t('trtDesc'),
      image: '/images/testosterone_vial.webp',
      badge: locale === 'en' ? 'Clinically Proven' : 'Clínicamente Probado'
    },
    {
      id: 'ed',
      title: t('edTitle'),
      desc: t('edDesc'),
      image: '/images/telehealth_doctor.webp',
      badge: locale === 'en' ? 'FDA Approved Ingredients' : 'Ingredientes Aprobados FDA'
    },
    {
      id: 'weight',
      title: t('weightTitle'),
      desc: t('weightDesc'),
      image: '/images/semaglutide_vial.webp',
      badge: locale === 'en' ? 'Compounded GLP-1' : 'GLP-1 Compuesto'
    },
    {
      id: 'hair',
      title: t('hairTitle'),
      desc: t('hairDesc'),
      image: '/images/hair_dropper.webp',
      badge: locale === 'en' ? 'Physician Guided' : 'Guiado por Médicos'
    },
    {
      id: 'wellness',
      title: t('wellnessTitle'),
      desc: t('wellnessDesc'),
      image: '/images/nad_vial.webp',
      badge: locale === 'en' ? 'Cellular Boosters' : 'Impulsores Celulares'
    },
    {
      id: 'peptide',
      title: t('peptideTitle'),
      desc: t('peptideDesc'),
      image: '/images/diagnostic_kit.webp',
      badge: locale === 'en' ? 'Longevity Protocols' : 'Protocolos de Longevidad'
    }
  ];

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

  const testimonials = [
    {
      stars: 5,
      quote: locale === 'en' 
        ? "Patriot Men's Clinic changed my life. I have more energy, better focus, and my confidence is back."
        : "Patriot Men's Clinic cambió mi vida. Tengo más energía, mejor enfoque y he recuperado mi confianza.",
      author: "Mike R.",
      avatar: "/images/avatar1.webp",
      meta: "45, Dallas, TX"
    },
    {
      stars: 5,
      quote: locale === 'en'
        ? "The process was simple, discreet, and the results have been incredible. Highly recommend."
        : "El proceso fue simple, discreto y los resultados han sido increíbles. Muy recomendable.",
      author: "Jason T.",
      avatar: "/images/avatar2.webp",
      meta: "38, Phoenix, AZ"
    },
    {
      stars: 5,
      quote: locale === 'en'
        ? "Professional care, great results, and outstanding support every step of the way."
        : "Atención profesional, excelentes resultados y un apoyo excepcional en cada paso del camino.",
      author: "Robert L.",
      avatar: "/images/avatar3.webp",
      meta: "52, Nashville, TN"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="retro-home-hero-section">
        <div className="retro-home-hero-card">
          <div className="retro-home-hero-contain">
            <div className="retro-home-hero-wrap">
              <div className="retro-home-hero-top">
                <h1 className="sr-only">{locale === 'en' ? "Men's health treatment that works" : "Tratamiento de salud masculina que funciona"}</h1>
                <div className="retro-home-hero-heading">
                  <span className="italic" style={{ color: typerColors[wordIndex] }}>{currentText}</span>
                  <span className="typer-cursor">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="retro-section">
        <div className="retro-container">
          <div className="retro-section-head">
            <span className="retro-tag">{t('ourTreatments')}</span>
            <h2 className="retro-h2">{t('treatmentTitle')}</h2>
            <p className="retro-sub">{locale === 'en' ? 'Personalized protocols, delivered to your door.' : 'Protocolos personalizados, entregados a tu puerta.'}</p>
          </div>

          <div className="accordion-gallery-PMC">
            {treatmentItems.map((item) => (
              <div key={item.id} className="accordion-item-PMC">
                <div className="accordion-bg-wrapper">
                  <img src={item.image} alt={item.title} className="treatment-image" loading="lazy" decoding="async" />
                  <div className="accordion-gradient-overlay"></div>
                </div>
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <span className="accordion-badge">{item.badge}</span>
                    <h3 className="accordion-title">{item.title}</h3>
                    <p className="accordion-desc">{item.desc}</p>
                    <Link to={`/treatment/${item.id}`} className="accordion-link">
                      {t('learnMore')} <span className="accordion-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works - Sticky Scroll */}
      <section id="how-it-works" className="retro-dark-section how-it-works-sticky">
        <div className="retro-container">
          <div className="retro-section-head retro-section-head--light">
            <span className="retro-tag" style={{color: '#ff9f43'}}>{t('howItWorksTag')}</span>
            <h2 className="retro-h2" style={{color: '#fff'}}>{t('howItWorksTitle')}</h2>
          </div>

          <div className="sticky-scroll-wrapper">
            {/* Left Sticky Column (Images) */}
            <div className="sticky-image-container">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className={`sticky-image-slide ${activeStep === index ? 'active' : ''}`}
                >
                  <img src={step.image} alt={step.title} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>

            {/* Right Scrolling Column (Text Steps) */}
            <div className="sticky-steps-container">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  data-index={index}
                  className={`sticky-step-card ${activeStep === index ? 'active' : ''}`}
                  onClick={() => window.location.href = '/start'}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sticky-step-number">{step.number}</div>
                  <h3 className="sticky-step-title">{step.title}</h3>
                  <p className="sticky-step-desc">{step.desc}</p>
                  <div className="sticky-mobile-img">
                     <img src={step.image} alt={step.title} loading="lazy" decoding="async" />
                  </div>
                  <button className="sticky-step-link">{step.btnText}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Patriot */}
      <section id="about-us" className="retro-section why-choose-premium">
        <div className="retro-container">
          <div className="retro-section-head">
            <span className="retro-tag">{t('whyChooseTag')}</span>
            <h2 className="retro-h2">{t('whyChooseTitle')}</h2>
          </div>

          <div className="premium-features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="premium-feature-card">
                <div className="feature-circle-image">
                  <img src={feat.image} alt={feat.title} loading="lazy" decoding="async" />
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="premium-feature-title">{feat.title}</h3>
                  <p className="premium-feature-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section id="reviews" className="reviews-section-luxury">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('successTag')}</span>
            <h2 className="section-title" style={{color: 'var(--white)'}}>{t('successTitle')}</h2>
          </div>

          <div className="reviews-row-PMC">
            {testimonials.map((test, idx) => (
              <div key={idx} className="review-card-PMC">
                <div className="review-stars-PMC">{'★'.repeat(test.stars)}</div>
                <p className="review-quote-PMC">"{test.quote}"</p>
                <div className="review-footer-PMC">
                  <img src={test.avatar} alt={test.author} className="review-avatar-PMC" loading="lazy" decoding="async" />
                  <div>
                    <h4 className="review-author-PMC">{test.author}</h4>
                    <span className="review-meta-PMC">{test.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Doctors Section */}
      <section className="doctors-section-PMC">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('doctorsTag')}</span>
            <h2 className="section-title">{t('doctorsTitle')}</h2>
          </div>

          <div className="doctors-grid-PMC">
            <div className="doctor-card-PMC">
              <div className="doctor-image-box-PMC">
                <img src="/images/telehealth_doctor.webp" alt={t('doctor1Name')} loading="lazy" decoding="async" />
              </div>
              <div className="doctor-content-PMC">
                <h3 className="doctor-name-PMC">{t('doctor1Name')}</h3>
                <span className="doctor-subtitle-PMC">{t('doctor1Title')}</span>
                <div className="doctor-school-row-PMC">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--red)'}}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                  <span className="doctor-school-PMC">{t('doctor1School')}</span>
                </div>
              </div>
            </div>

            <div className="doctor-card-PMC">
              <div className="doctor-image-box-PMC">
                <img src="/images/vitality_hero.webp" alt={t('doctor2Name')} loading="lazy" decoding="async" style={{objectPosition: 'top'}} />
              </div>
              <div className="doctor-content-PMC">
                <h3 className="doctor-name-PMC">{t('doctor2Name')}</h3>
                <span className="doctor-subtitle-PMC">{t('doctor2Title')}</span>
                <div className="doctor-school-row-PMC">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--red)'}}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                  <span className="doctor-school-PMC">{t('doctor2School')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="retro-stats-bar">
        <div className="retro-container">
          <div className="stats-grid-PMC">
            <div className="stat-item-PMC">
              <span className="stat-number-PMC">10,000+</span>
              <span className="stat-label-PMC">{t('statPatients')}</span>
            </div>
            <div className="stat-item-PMC">
              <span className="stat-number-PMC">98%</span>
              <span className="stat-label-PMC">{t('statSatisfaction')}</span>
            </div>
            <div className="stat-item-PMC">
              <span className="stat-number-PMC">50</span>
              <span className="stat-label-PMC">{t('statProviders')}</span>
            </div>
            <div className="stat-item-PMC">
              <span className="stat-number-PMC">2–4 Days</span>
              <span className="stat-label-PMC">{t('statDelivery')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{locale === 'en' ? 'CLINICAL GALLERY & PRODUCT DISPATCH' : 'GALERÍA CLÍNICA Y DESPACHO DE PRODUCTOS'}</span>
            <h2 className="section-title">{locale === 'en' ? 'Our Facilities & Clinical Assets' : 'Nuestras Instalaciones y Activos Clínicos'}</h2>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/clinical_lab.webp" alt="Clinical Laboratory" loading="lazy" decoding="async" />
            </div>
            <div className="gallery-item">
              <img src="/images/diagnostic_kit.webp" alt="Diagnostic Kit" loading="lazy" decoding="async" />
            </div>
            <div className="gallery-item">
              <img src="/images/discreet_packaging.webp" alt="Discreet Packaging" loading="lazy" decoding="async" />
            </div>
            <div className="gallery-item">
              <img src="/images/nad_vial.webp" alt="NAD+ Longevity Vial" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="retro-faq-section">
        <div className="retro-container">
          <div className="retro-section-head">
            <span className="retro-tag">{t('faq')}</span>
            <h2 className="retro-h2">{locale === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}</h2>
          </div>

          <div className="faqs-list-PMC">
            {locale === 'en' ? faqItemsEn.map((item, idx) => (
              <div key={idx} className={`faq-item-PMC ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question-btn-PMC" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question-PMC">{item.question}</span>
                  <span className="faq-icon-PMC">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-panel-PMC" style={{ maxHeight: openFaq === idx ? '220px' : '0' }}>
                  <div className="faq-answer-inner-PMC">
                     <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )) : faqItemsEs.map((item, idx) => (
              <div key={idx} className={`faq-item-PMC ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question-btn-PMC" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question-PMC">{item.question}</span>
                  <span className="faq-icon-PMC">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-panel-PMC" style={{ maxHeight: openFaq === idx ? '220px' : '0' }}>
                  <div className="faq-answer-inner-PMC">
                     <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Call to Action Banner */}
      <div id="contact" className="cta-banner-PMC">
        <div className="container cta-banner-container-PMC">
          <div className="cta-banner-content-left-PMC">
            <h2 className="cta-banner-title-PMC">{t('preFooterTitle')}</h2>
            <p className="cta-banner-desc-PMC">{t('preFooterSub')}</p>
            <button className="btn btn-red cta-btn-left-PMC" onClick={() => window.location.href = '/start'}>
              {t('beginConsultation')}
            </button>
          </div>
          <div className="cta-banner-image-right-PMC">
            <img src="/images/cta-transformation.webp" alt="Transformation man" className="cta-man-img-PMC" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
