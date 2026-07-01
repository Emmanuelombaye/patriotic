import React, { useState } from 'react';
import IntakeQuiz from './components/IntakeQuiz';
import { translations } from './translations';

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
            <span className="logo-text">PATRIOT</span>
          </div>
          
          <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#treatments" onClick={() => setMenuOpen(false)}>{t('treatments')}</a></li>
            <li><a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t('howItWorks')}</a></li>
            <li><a href="#clinical-network" onClick={() => setMenuOpen(false)}>{t('clinicalNetwork')}</a></li>
            <li><a href="#reviews" onClick={() => setMenuOpen(false)}>{t('reviews')}</a></li>
            <li><a href="#faqs" onClick={() => setMenuOpen(false)}>{t('faqs')}</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Toggle Button */}
            <button className="btn btn-secondary" onClick={toggleLocale} style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 'bold' }}>
              🌐 {locale.toUpperCase()}
            </button>
            <button className="btn btn-primary" onClick={() => setQuizOpen(true)} style={{ padding: '8px 16px', fontSize: '14px', display: 'flex' }}>
              {t('startAssessment')}
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
            <div className="hero-tag">{t('heroTag')}</div>
            <h1 className="hero-title">
              {t('heroTitlePre')} <br />
              <span>{t('heroTitleSpan')}</span>
            </h1>
            <p className="hero-description">{t('heroDesc')}</p>
            
            <div className="hero-bullets">
              <div className="hero-bullet">
                <div className="hero-bullet-icon">✓</div>
                <span>{t('heroBullet1')}</span>
              </div>
              <div className="hero-bullet">
                <div className="hero-bullet-icon">✓</div>
                <span>{t('heroBullet2')}</span>
              </div>
              <div className="hero-bullet">
                <div className="hero-bullet-icon">✓</div>
                <span>{t('heroBullet3')}</span>
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setQuizOpen(true)}>
                {t('startAssessment')}
              </button>
              <a href="#treatments" className="btn btn-secondary">
                {t('viewTreatments')}
              </a>
            </div>
          </div>

          <div className="hero-images">
            <div className="hero-image-card">
              <img src="/images/vitality_hero.jpg" alt="Active healthy lifestyle" className="hero-img" />
              <div className="hero-card-meta">
                <span className="hero-card-title">{t('trtCardTitle')}</span>
                <span className="hero-card-price">$129/mo</span>
              </div>
            </div>

            <div className="hero-image-card">
              <img src="/images/weightloss_hero.jpg" alt="Athletic training fitness" className="hero-img" />
              <div className="hero-card-meta">
                <span className="hero-card-title">{t('weightCardTitle')}</span>
                <span className="hero-card-price">$249/mo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Treatments Section */}
      <section id="treatments" className="section" style={{ backgroundColor: '#fff', borderTop: '2px solid var(--navy)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{t('treatmentTitle')}</h2>
            <p className="section-subtitle">{t('treatmentSub')}</p>
          </div>

          <div className="treatments-grid">
            {treatments.map((tPlan) => (
              <div key={tPlan.id} className="card treatment-card">
                <div>
                  <div className="treatment-header">
                    <span className="treatment-badge">{tPlan.badge}</span>
                    <span className="treatment-price">{locale === 'en' ? 'from' : 'desde'} <strong>${tPlan.price}</strong>/mo</span>
                  </div>
                  <img src={tPlan.image} alt={tPlan.title} className="treatment-img" />
                  <h3 className="treatment-title">{tPlan.title}</h3>
                  <p className="treatment-description">{tPlan.description}</p>
                </div>
                
                <div>
                  <ul className="treatment-features">
                    {tPlan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <button className="btn btn-navy" onClick={() => setQuizOpen(true)} style={{ width: '100%' }}>
                    {t('getStarted')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section" style={{ borderTop: '2px solid var(--navy)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{t('howItWorks')}</h2>
            <p className="section-subtitle">{t('howItWorksSub')}</p>
          </div>

          <div className="steps-wrapper">
            <div className="card step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">{t('step1Title')}</h3>
              <p className="step-description">{t('step1Desc')}</p>
            </div>
            
            <div className="card step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">{t('step2Title')}</h3>
              <p className="step-description">{t('step2Desc')}</p>
            </div>

            <div className="card step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">{t('step3Title')}</h3>
              <p className="step-description">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors and Lab Network Section */}
      <section id="clinical-network" className="section" style={{ backgroundColor: '#fff', borderTop: '2px solid var(--navy)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{t('networkTitle')}</h2>
            <p className="section-subtitle">{t('networkSub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <img src="/images/telehealth_doctor.jpg" alt="Telehealth Physician" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--navy)' }} />
              <h3 style={{ fontSize: '20px' }}>{t('networkCard1Title')}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>{t('networkCard1Desc')}</p>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <img src="/images/diagnostic_kit.jpg" alt="Diagnostic Blood Panel Kit" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--navy)' }} />
              <h3 style={{ fontSize: '20px' }}>{t('networkCard2Title')}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>{t('networkCard2Desc')}</p>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <img src="/images/clinical_lab.jpg" alt="Compounding Laboratory" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--navy)' }} />
              <h3 style={{ fontSize: '20px' }}>{t('networkCard3Title')}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>{t('networkCard3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews/Testimonials Section */}
      <section id="reviews" className="section" style={{ borderTop: '2px solid var(--navy)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{t('reviewsTitle')}</h2>
            <p className="section-subtitle">{t('reviewsSub')}</p>
          </div>

          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="card review-card" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={r.image} alt={r.user} className="review-avatar" />
                  <div>
                    <h4 style={{ fontSize: '16px', color: 'var(--navy)' }}>{r.user}</h4>
                    <span className="review-verified" style={{ display: 'inline-block', marginTop: '2px' }}>{r.location}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {'★'.repeat(r.stars)}
                </div>
                <p className="review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="section" style={{ backgroundColor: '#fff', borderTop: '2px solid var(--navy)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{t('faqsTitle')}</h2>
            <p className="section-subtitle">{t('faqsSub')}</p>
          </div>

          <div className="faqs-list">
            {faqItems.map((item, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon">{openFaq === idx ? '-' : '+'}</span>
                </button>
                <div className="faq-answer-panel" style={{ maxHeight: openFaq === idx ? '200px' : '0' }}>
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telehealth Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-wrapper">
                <div className="logo-icon" style={{ backgroundColor: 'var(--white)', color: 'var(--navy)', borderColor: 'var(--red)' }}>★</div>
                <span className="logo-text" style={{ color: '#fff' }}>PATRIOT</span>
              </div>
              <p className="footer-about">{t('footerAbout')}</p>
            </div>

            <div>
              <h4 className="footer-links-title">{t('treatments')}</h4>
              <ul className="footer-links">
                <li><a href="#treatments" onClick={() => setQuizOpen(true)}>Hormone Therapy (TRT)</a></li>
                <li><a href="#treatments" onClick={() => setQuizOpen(true)}>Medical Weight Loss</a></li>
                <li><a href="#treatments" onClick={() => setQuizOpen(true)}>ED Treatment Plans</a></li>
                <li><a href="#treatments" onClick={() => setQuizOpen(true)}>NAD+ Injections</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-links-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#how-it-works">{t('howItWorks')}</a></li>
                <li><a href="#reviews">Success Stories</a></li>
                <li><a href="#faqs">{t('faqs')}</a></li>
                <li><a href="mailto:support@patriotmensclinic.com">Contact Clinical Support</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-disclaimers">
            <p className="disclaimer-text">
              <strong>{t('medicalDisclaimerTitle')}</strong> {t('medicalDisclaimerText')}
            </p>
            <p className="disclaimer-text">
              <strong>{t('telehealthServicesTitle')}</strong> {t('telehealthServicesText')}
            </p>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {t('allRightsReserved')}</p>
            <p style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: '#8da4c8', textDecoration: 'none' }}>{t('privacyPolicy')}</a>
              <a href="#" style={{ color: '#8da4c8', textDecoration: 'none' }}>{t('termsOfService')}</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Intake Quiz Modal */}
      <IntakeQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} />
    </>
  );
}

// Translations specific to FAQs (to keep main dictionary cleaner)
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

export default App;
