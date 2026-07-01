import React, { useState } from 'react';
import IntakeQuiz from './components/IntakeQuiz';
import { translations } from './translations';

// Translations specific to FAQs (defined at the top to avoid hoisting issues)
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

function App() {
  const [locale, setLocale] = useState('en'); // 'en' or 'es'
  const [quizOpen, setQuizOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const t = (key) => translations[locale][key] || key;

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const treatments = [
    {
      id: 'weight',
      badge: locale === 'en' ? 'Clinically Proven' : 'Clínicamente Probado',
      title: t('weightCardTitle'),
      price: '249',
      image: '/images/semaglutide_vial.jpg',
      description: locale === 'en' 
        ? 'Prescription GLP-1 medications (Semaglutide or Tirzepatide) compounded with Vitamin B12. Designed to suppress appetite, optimize metabolic efficiency, and support sustainable weight reduction.'
        : 'Medicamentos recetados GLP-1 (Semaglutida o Tirzepatida) combinados con Vitamina B12. Diseñado para suprimir el apetito, optimizar la eficiencia metabólica y apoyar la reducción de peso sostenible.',
      features: locale === 'en'
        ? ['Compounded Semaglutide/Tirzepatide', 'Cold-chain discreet shipping', 'Licensed physician review', 'Suppressed appetite support']
        : ['Semaglutida/Tirzepatida compuesta', 'Envío discreto de cadena de frío', 'Revisión por médico con licencia', 'Soporte de control del apetito']
    },
    {
      id: 'trt',
      badge: locale === 'en' ? 'Best Seller' : 'Más Vendido',
      title: t('trtCardTitle'),
      price: '129',
      image: '/images/testosterone_vial.jpg',
      description: locale === 'en'
        ? 'Customized physician-guided testosterone replacement therapy protocols. Reclaim peak physical strength, cognitive focus, muscle recovery, and overall male vitality.'
        : 'Protocolos personalizados de terapia de reemplazo de testosterona guiados por médicos. Recupere la fuerza física máxima, el enfoque cognitivo, la recuperación muscular y la vitalidad masculina en general.',
      features: locale === 'en'
        ? ['Personalized hormone protocols', 'Supplies & syringes included', 'Routine blood panel tracking', 'Direct-to-patient shipment']
        : ['Protocolos hormonales personalizados', 'Suministros y jeringas incluidos', 'Seguimiento de análisis de sangre de rutina', 'Envío directo al paciente']
    },
    {
      id: 'ed',
      badge: locale === 'en' ? 'High Performance' : 'Alto Rendimiento',
      title: locale === 'en' ? 'Sexual Health & ED' : 'Salud Sexual y DE',
      price: '49',
      image: '/images/discreet_packaging.jpg',
      description: locale === 'en'
        ? 'Discreet and highly effective sildenafil or tadalafil treatment plans customized for your lifestyle. Prescribed online by licensed providers and delivered in plain packaging.'
        : 'Planes de tratamiento de sildenafilo o tadalafilo discretos y altamente efectivos adaptados a su estilo de vida. Recetados en línea por proveedores autorizados y entregados en envases sencillos.',
      features: locale === 'en'
        ? ['Sildenafil & Tadalafil options', 'Discreet, unmarked packaging', 'Flexible monthly plans', '24/7 clinical chat access']
        : ['Opciones de Sildenafilo y Tadalafilo', 'Embalaje discreto y sin marcas', 'Planes mensuales flexibles', 'Acceso al chat clínico las 24 horas, los 7 días de la semana']
    },
    {
      id: 'longevity',
      badge: locale === 'en' ? 'Cellular Health' : 'Salud Celular',
      title: locale === 'en' ? 'NAD+ Longevity Booster' : 'Potenciador de Longevidad NAD+',
      price: '179',
      image: '/images/nad_vial.jpg',
      description: locale === 'en'
        ? 'Injectable NAD+ coenzyme therapy targeting cellular mitochondrial repair, cognitive clarity, and sustained metabolic speed to combat physiological aging.'
        : 'Terapia inyectable de coenzima NAD+ dirigida a la reparación mitocondrial celular, la claridad cognitiva y la velocidad metabólica sostenida para combatir el envejecimiento fisiológico.',
      features: locale === 'en'
        ? ['High-purity compounded NAD+', 'Boosts cellular energy & DNA repair', 'Self-injection kit included', 'Physician-monitored progress']
        : ['NAD+ compuesto de alta pureza', 'Aumenta la energía celular y la reparación del ADN', 'Kit de autoinyección incluido', 'Progreso supervisado por un médico']
    },
    {
      id: 'hair',
      badge: locale === 'en' ? 'Restoration' : 'Restauración',
      title: locale === 'en' ? 'Hair Regrowth Therapy' : 'Terapia de Crecimiento Capilar',
      price: '39',
      image: '/images/hair_dropper.jpg',
      description: locale === 'en'
        ? 'Clinical-strength combined Finasteride & Minoxidil daily treatment plans to halt hair thinning, strengthen existing follicles, and promote active scalp regrowth.'
        : 'Planes de tratamiento diario combinados de Finasterida y Minoxidil de fuerza clínica para detener el adelgazamiento del cabello, fortalecer los folículos existentes y promover el crecimiento activo del cuero cabelludo.',
      features: locale === 'en'
        ? ['DHT blocker + follicle stimulator', 'Licensed medical evaluation', 'Convenient daily application', 'Halt thinning & recedence']
        : ['Bloqueador de DHT + estimulador folicular', 'Evaluación médica con licencia', 'Aplicación diaria conveniente', 'Detiene el adelgazamiento y la recesión']
    }
  ];

  const faqItems = [
    {
      question: locale === 'en' ? faqItemsEn[0].question : faqItemsEs[0].question,
      answer: locale === 'en' ? faqItemsEn[0].answer : faqItemsEs[0].answer
    },
    {
      question: locale === 'en' ? faqItemsEn[1].question : faqItemsEs[1].question,
      answer: locale === 'en' ? faqItemsEn[1].answer : faqItemsEs[1].answer
    },
    {
      question: locale === 'en' ? faqItemsEn[2].question : faqItemsEs[2].question,
      answer: locale === 'en' ? faqItemsEn[2].answer : faqItemsEs[2].answer
    },
    {
      question: locale === 'en' ? faqItemsEn[3].question : faqItemsEs[3].question,
      answer: locale === 'en' ? faqItemsEn[3].answer : faqItemsEs[3].answer
    },
    {
      question: locale === 'en' ? faqItemsEn[4].question : faqItemsEs[4].question,
      answer: locale === 'en' ? faqItemsEn[4].answer : faqItemsEs[4].answer
    }
  ];

  const reviews = [
    {
      stars: 5,
      text: locale === 'en' 
        ? "The TRT plan has completely changed my day-to-day. My energy levels are back to what they were ten years ago, and the blood tracking makes me feel safe. Highly recommend."
        : "El plan TRT ha cambiado por completo mi día a día. Mis niveles de energía volvieron a ser los de hace diez años y el control de sangre me hace sentir seguro. Muy recomendable.",
      user: "Mark S.",
      image: "/images/avatar1.jpg",
      location: locale === 'en' ? "Verified Patient" : "Paciente Verificado"
    },
    {
      stars: 5,
      text: locale === 'en'
        ? "I was skeptical about telehealth weight loss, but the Semaglutide plan has been incredible. Down 22 lbs in 3 months. The shipping is fast and always on time."
        : "Estaba escéptico sobre la pérdida de peso por telemedicina, pero el plan de Semaglutida ha sido increíble. Bajé 22 libras en 3 meses. El envío es rápido y a tiempo.",
      user: "David K.",
      image: "/images/avatar2.jpg",
      location: locale === 'en' ? "Verified Patient" : "Paciente Verificado"
    },
    {
      stars: 5,
      text: locale === 'en'
        ? "Very professional and discreet. Navigating doctors appointments in person was such a hassle. Patriot made it fast, simple, and affordable."
        : "Muy profesional y discreto. Coordinar citas médicas en persona era un gran dolor de cabeza. Patriot lo hizo rápido, simple y asequible.",
      user: "James L.",
      image: "/images/avatar3.jpg",
      location: locale === 'en' ? "Verified Patient" : "Paciente Verificado"
    }
  ];

  return (
    <>
      {/* Promo Header Banner */}
      <div className="promo-banner">
        <span>{t('promo')}</span>
        <button className="claim-badge" onClick={() => setQuizOpen(true)}>{t('claimOffer')}</button>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo-wrapper">
            <div className="logo-icon">★</div>
            <div className="logo-text">
              {t('footerBrand')}
              <span className="logo-subtext">{t('footerBrandSub')}</span>
            </div>
          </div>
          
          <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#treatments" onClick={() => setMenuOpen(false)}>{t('treatments')}</a></li>
            <li><a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t('howItWorks')}</a></li>
            <li><a href="#pricing" onClick={() => setMenuOpen(false)}>{t('pricing')}</a></li>
            <li><a href="#about-us" onClick={() => setMenuOpen(false)}>{t('aboutUs')}</a></li>
            <li><a href="#faqs" onClick={() => setMenuOpen(false)}>{t('faq')}</a></li>
            <li><a href="#blog" onClick={() => setMenuOpen(false)}>{t('blog')}</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t('contact')}</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Toggle Button */}
            <button className="btn btn-red" onClick={toggleLocale} style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 'bold', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
              🌐 {locale.toUpperCase()}
            </button>
            <button className="btn btn-red" onClick={() => setQuizOpen(true)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold' }}>
              {t('getStarted')}
            </button>
            {/* Mobile Menu Burger Toggle */}
            <button className="burger-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Trustproof Banner */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-track">
            <div className="trust-item">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{locale === 'en' ? 'U.S. Licensed Pharmacies' : 'Farmacias Autorizadas en EE. UU.'}</span>
            </div>
            <div className="trust-item">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{locale === 'en' ? 'Licensed Providers nationwide' : 'Proveedores con Licencia a Nivel Nacional'}</span>
            </div>
            <div className="trust-item">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{locale === 'en' ? 'Free Expedited Cold-Chain Shipping' : 'Envío de Cadena de Frío Rápido y Gratis'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tag">{t('premiumHealthcare')}</span>
            <h1 className="hero-title">
              {t('heroTitlePre')}
              <span>{t('heroTitleSpan')}</span>
            </h1>
            <p className="hero-description">{t('heroDesc')}</p>
            
            <div className="hero-actions">
              <button className="btn btn-red" onClick={() => setQuizOpen(true)}>
                {t('startConsultation')}
              </button>
              <a href="#treatments" className="btn btn-outline-navy">
                {t('seeTreatments')}
              </a>
            </div>

            <div className="hero-trust-indicators">
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="hero-trust-label">{t('licensedProviders')}</span>
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="hero-trust-label">{t('secureConsult')}</span>
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="hero-trust-label">{t('discreetDelivery')}</span>
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="hero-trust-label">{t('hipaaCompliant')}</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img src="/images/vitality_hero.jpg" alt="Smiling fit healthy man" className="hero-img-main" />
          </div>
        </div>
      </header>

      {/* Our Treatments Section */}
      <section id="treatments" className="section section-grey">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('ourTreatments')}</span>
            <h2 className="section-title">{t('treatmentTitle')}</h2>
          </div>

          <div className="treatments-grid-PMC">
            {treatmentItems.map((item) => (
              <div key={item.id} className="treatment-card-PMC">
                <div className="treatment-icon-PMC">{item.icon}</div>
                <h3 className="treatment-title-PMC">{item.title}</h3>
                <p className="treatment-desc-PMC">{item.desc}</p>
                <a href="#pricing" className="treatment-link-PMC">
                  {t('learnMore')} <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Dark Section */}
      <section id="how-it-works" className="how-it-works-dark">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag" style={{ color: 'var(--red)' }}>{t('howItWorksTag')}</span>
            <h2 className="section-title">{t('howItWorksTitle')}</h2>
          </div>

          <div className="steps-flow-PMC">
            {steps.map((step) => (
              <div key={step.number} className="step-item-PMC">
                <div className="step-icon-wrapper-PMC">
                  <div className="step-badge-PMC">{step.number}</div>
                  {step.icon}
                </div>
                <h3 className="step-title-PMC">{step.title}</h3>
                <p className="step-desc-PMC">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Patriot Section */}
      <section id="about-us" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('whyChooseTag')}</span>
            <h2 className="section-title">{t('whyChooseTitle')}</h2>
          </div>

          <div className="features-grid-PMC">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-item-PMC">
                <div className="feature-icon-PMC">{feat.icon}</div>
                <div className="feature-content-PMC">
                  <h3 className="feature-title-PMC">{feat.title}</h3>
                  <p className="feature-desc-PMC">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Success Stories Slider Section */}
      <section id="reviews" className="section section-grey">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('successTag')}</span>
            <h2 className="section-title">{t('successTitle')}</h2>
          </div>

          <div className="reviews-row-PMC">
            {testimonials.map((test, idx) => (
              <div key={idx} className="review-card-PMC">
                <div className="review-avatar-wrapper-PMC">
                  <img src={test.avatar} alt={test.author} className="review-avatar-PMC" />
                </div>
                <div className="review-stars-PMC">
                  {'★'.repeat(test.stars)}
                </div>
                <p className="review-quote-PMC">"{test.quote}"</p>
                <h4 className="review-author-PMC">{test.author}</h4>
                <span className="review-meta-PMC">{test.meta}</span>
              </div>
            ))}
          </div>

          <div className="slider-nav-PMC">
            <button className="slider-arrow-PMC">←</button>
            <div className="slider-dots-PMC">
              <div className="slider-dot-PMC active"></div>
              <div className="slider-dot-PMC"></div>
              <div className="slider-dot-PMC"></div>
              <div className="slider-dot-PMC"></div>
            </div>
            <button className="slider-arrow-PMC">→</button>
          </div>
        </div>
      </section>

      {/* Crimson Stats Bar */}
      <div className="stats-bar-red">
        <div className="container stats-grid-PMC">
          <div className="stat-item-PMC">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stat-icon-PMC">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="stat-number-PMC">10,000+</span>
            <span className="stat-label-PMC">{t('statPatients')}</span>
          </div>
          <div className="stat-item-PMC">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stat-icon-PMC">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="stat-number-PMC">98%</span>
            <span className="stat-label-PMC">{t('statSatisfaction')}</span>
          </div>
          <div className="stat-item-PMC">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stat-icon-PMC">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="stat-number-PMC">Licensed</span>
            <span className="stat-label-PMC">{t('statProviders')}</span>
          </div>
          <div className="stat-item-PMC">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stat-icon-PMC">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            <span className="stat-number-PMC">Fast</span>
            <span className="stat-label-PMC">{t('statDelivery')}</span>
          </div>
        </div>
      </div>

      {/* Pricing Preview Section */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('pricingTag')}</span>
            <h2 className="section-title">{t('pricingTitle')}</h2>
            <p className="section-subtitle">{t('pricingSub')}</p>
          </div>

          <div className="pricing-grid-PMC">
            <div className="price-card-PMC">
              <h3 className="price-title-PMC">{t('trtTreatment')}</h3>
              <div className="price-val-PMC">
                $149<span>/{t('month')}</span>
              </div>
              <ul className="price-features-PMC">
                <li>Personalized TRT Plan</li>
                <li>Regular Lab Monitoring</li>
                <li>Provider Consultations</li>
                <li>Medication Included</li>
              </ul>
              <button className="btn btn-red" onClick={() => setQuizOpen(true)}>
                {t('getStarted')}
              </button>
            </div>

            <div className="price-card-PMC featured">
              <div className="featured-badge-PMC">{t('mostPopular')}</div>
              <h3 className="price-title-PMC">{t('edTreatment')}</h3>
              <div className="price-val-PMC">
                $99<span>/{t('month')}</span>
              </div>
              <ul className="price-features-PMC">
                <li>ED Medication</li>
                <li>Medical Consultations</li>
                <li>Discreet Shipping</li>
                <li>Ongoing Support</li>
              </ul>
              <button className="btn btn-red" onClick={() => setQuizOpen(true)}>
                {t('getStarted')}
              </button>
            </div>

            <div className="price-card-PMC">
              <h3 className="price-title-PMC">{t('weightProgram')}</h3>
              <div className="price-val-PMC">
                $179<span>/{t('month')}</span>
              </div>
              <ul className="price-features-PMC">
                <li>Personalized Plan</li>
                <li>Medication Included</li>
                <li>Nutrition Guidance</li>
                <li>Regular Check-ins</li>
              </ul>
              <button className="btn btn-red" onClick={() => setQuizOpen(true)}>
                {t('getStarted')}
              </button>
            </div>
          </div>

          <p className="pricing-note-PMC">
            {locale === 'en' 
              ? "*Prices start at and vary by treatment plan. Consultation is subject to medical evaluation."
              : "*Los precios comienzan desde y varían según el plan de tratamiento. La consulta está sujeta a evaluación médica."}
          </p>
        </div>
      </section>

      {/* Pre-Footer FAQ Section (collapsible items) */}
      <section id="faqs" className="section section-grey" style={{ borderTop: '1px solid var(--gray-border)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">{t('faq')}</span>
            <h2 className="section-title">{t('pricingTitle')} FAQs</h2>
          </div>

          <div className="faqs-list-PMC">
            {faqItemsEn.map((item, idx) => (
              <div key={idx} className={`faq-item-PMC ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question-btn-PMC" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question-PMC">
                    {locale === 'en' ? item.question : faqItemsEs[idx].question}
                  </span>
                  <span className="faq-icon-PMC">{openFaq === idx ? '✕' : '+'}</span>
                </button>
                <div className="faq-answer-panel-PMC" style={{ maxHeight: openFaq === idx ? '200px' : '0' }}>
                  <div className="faq-answer-inner-PMC">
                    <p>{locale === 'en' ? item.answer : faqItemsEs[idx].answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Call to Action Banner */}
      <div id="contact" className="cta-banner-PMC">
        <div className="container cta-banner-content-PMC">
          <h2 className="cta-banner-title-PMC">{t('preFooterTitle')}</h2>
          <p className="cta-banner-desc-PMC">{t('preFooterSub')}</p>
          <button className="btn btn-red" onClick={() => setQuizOpen(true)} style={{ padding: '14px 36px', fontWeight: 'bold' }}>
            {t('beginConsultation')}
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-PMC">
        <div className="container">
          <div className="footer-grid-PMC">
            <div className="footer-brand-PMC">
              <div className="logo-wrapper">
                <div className="logo-icon" style={{ backgroundColor: 'var(--white)', color: 'var(--navy-dark)', borderColor: 'var(--red)' }}>★</div>
                <span className="logo-text" style={{ color: '#fff' }}>
                  {t('footerBrand')}
                  <span className="logo-subtext" style={{ color: 'var(--red)' }}>{t('footerBrandSub')}</span>
                </span>
              </div>
              <p className="footer-about-PMC">{t('footerAbout')}</p>
              <div className="footer-socials-PMC">
                <a href="#" className="social-icon-PMC" aria-label="Facebook">f</a>
                <a href="#" className="social-icon-PMC" aria-label="Instagram">i</a>
                <a href="#" className="social-icon-PMC" aria-label="YouTube">y</a>
                <a href="#" className="social-icon-PMC" aria-label="Twitter">t</a>
              </div>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('treatments')}</h4>
              <ul className="footer-links-PMC">
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>TRT Therapy</a></li>
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>ED Treatment</a></li>
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>Weight Loss</a></li>
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>Hair Restoration</a></li>
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>Peptide Therapy</a></li>
                <li><a href="#pricing" onClick={() => setQuizOpen(true)}>Wellness Optimization</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('resources')}</h4>
              <ul className="footer-links-PMC">
                <li><a href="#how-it-works">{t('howItWorks')}</a></li>
                <li><a href="#faqs">{t('faq')}</a></li>
                <li><a href="#blog">{t('blog')}</a></li>
                <li><a href="#reviews">{t('reviews')}</a></li>
                <li><a href="#contact">{t('contact')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('contactUs')}</h4>
              <ul className="footer-links-PMC" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li className="footer-contact-item-PMC">
                  <span>📞</span> (833) 123-4567
                </li>
                <li className="footer-contact-item-PMC">
                  <span>✉️</span> info@patriotmensclinic.com
                </li>
                <li className="footer-contact-item-PMC">
                  <span>📍</span> 123 Freedom Way, Suite 100, Nashville, TN 37203
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-disclaimers-PMC">
            <p className="disclaimer-text-PMC">
              <strong>{locale === 'en' ? 'Medical Disclaimer:' : 'Descargo de Responsabilidad Médica:'}</strong> The content on this website is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Compounded prescription drug preparations are customized formulations prescribed by U.S.-licensed practitioners based on individual patient medical evaluations. Compounded medications are not FDA-approved, meaning the FDA does not verify their safety, effectiveness, or quality prior to marketing.
            </p>
            <p className="disclaimer-text-PMC">
              <strong>{locale === 'en' ? 'Telehealth Services:' : 'Servicios de Telemedicina:'}</strong> Telehealth consultations are provided by independent, U.S.-licensed physicians and nurse practitioners contracted with clinical groups. Prescription eligibility is subject to physician evaluation, clinical protocol guidelines, and lab test results when required. Services are cash-pay; insurance is not billed.
            </p>
          </div>

          <div className="footer-bottom-PMC">
            <p>&copy; 2024 {t('allRightsReserved')}</p>
            <p style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('privacyPolicy')}</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('termsOfService')}</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Intake Quiz Modal */}
      <IntakeQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} />
    </>
  );
}

export default App;
