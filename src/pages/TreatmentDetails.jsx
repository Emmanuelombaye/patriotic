import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { translations } from '../translations';

const treatmentData = {
  trt: {
    title: 'trtTitle',
    desc: 'trtDesc',
    heroImg: '/images/testosterone_vial.webp',
    benefits: [
      'Increased energy levels',
      'Enhanced libido and sexual function',
      'Improved muscle mass and strength',
      'Better mood and cognitive function'
    ],
    benefitsEs: [
      'Aumento de los niveles de energía',
      'Mejora de la libido y la función sexual',
      'Mejora de la masa y fuerza muscular',
      'Mejor estado de ánimo y función cognitiva'
    ],
    details: 'Our Testosterone Replacement Therapy is a clinically proven, physician-guided protocol designed to optimize your hormone levels safely. Using bio-identical testosterone, our treatment targets the root cause of low energy, decreased libido, and muscle loss.',
    detailsEs: 'Nuestra Terapia de Reemplazo de Testosterona es un protocolo clínicamente probado y guiado por médicos diseñado para optimizar sus niveles hormonales de manera segura. Usando testosterona bioidéntica, nuestro tratamiento ataca la causa raíz de la baja energía, disminución de la libido y pérdida muscular.'
  },
  ed: {
    title: 'edTitle',
    desc: 'edDesc',
    heroImg: '/images/telehealth_doctor.webp',
    benefits: [
      'Rapid onset of action',
      'FDA-approved active ingredients',
      'Discreet home delivery',
      'Customized dosage plans'
    ],
    benefitsEs: [
      'Rápido inicio de acción',
      'Ingredientes activos aprobados por la FDA',
      'Entrega discreta a domicilio',
      'Planes de dosificación personalizados'
    ],
    details: 'Erectile dysfunction is common and treatable. Our ED protocols utilize compounded versions of proven medications, tailored specifically to your needs by our licensed physicians. Regain your confidence with treatments delivered discreetly to your door.',
    detailsEs: 'La disfunción eréctil es común y tratable. Nuestros protocolos de DE utilizan versiones compuestas de medicamentos probados, adaptados específicamente a sus necesidades por nuestros médicos autorizados. Recupere su confianza con tratamientos entregados discretamente en su puerta.'
  },
  weight: {
    title: 'weightTitle',
    desc: 'weightDesc',
    heroImg: '/images/semaglutide_vial.webp',
    benefits: [
      'Significant weight loss',
      'Reduced appetite and cravings',
      'Improved metabolic health',
      'Physician-monitored progress'
    ],
    benefitsEs: [
      'Pérdida de peso significativa',
      'Reducción del apetito y los antojos',
      'Mejora de la salud metabólica',
      'Progreso supervisado por el médico'
    ],
    details: 'Achieve sustainable weight loss with our GLP-1 compounding protocols. Semaglutide and Tirzepatide work by regulating appetite and improving blood sugar control. Combined with our medical supervision, it\'s a powerful tool for transforming your health.',
    detailsEs: 'Logre una pérdida de peso sostenible con nuestros protocolos de compuestos GLP-1. La Semaglutida y la Tirzepatida funcionan regulando el apetito y mejorando el control del azúcar en la sangre. Combinado con nuestra supervisión médica, es una poderosa herramienta para transformar su salud.'
  },
  hair: {
    title: 'hairTitle',
    desc: 'hairDesc',
    heroImg: '/images/hair_dropper.webp',
    benefits: [
      'Stimulates new hair growth',
      'Prevents further hair loss',
      'Topical and oral options',
      'Clinically formulated compounds'
    ],
    benefitsEs: [
      'Estimula el crecimiento de cabello nuevo',
      'Previene una mayor pérdida de cabello',
      'Opciones tópicas y orales',
      'Compuestos formulados clínicamente'
    ],
    details: 'Don\'t accept hair loss as inevitable. Our comprehensive hair restoration protocols include custom-compounded topical solutions and oral medications combining Finasteride, Minoxidil, and essential vitamins to halt hair loss and stimulate regrowth.',
    detailsEs: 'No acepte la caída del cabello como inevitable. Nuestros protocolos integrales de restauración capilar incluyen soluciones tópicas compuestas a medida y medicamentos orales que combinan finasterida, minoxidil y vitaminas esenciales para detener la caída del cabello y estimular el rebrote.'
  },
  wellness: {
    title: 'wellnessTitle',
    desc: 'wellnessDesc',
    heroImg: '/images/nad_vial.webp',
    benefits: [
      'Enhanced cellular energy',
      'Improved cognitive focus',
      'Anti-aging cellular repair',
      'Boosted immune system'
    ],
    benefitsEs: [
      'Energía celular mejorada',
      'Enfoque cognitivo mejorado',
      'Reparación celular antienvejecimiento',
      'Sistema inmunológico reforzado'
    ],
    details: 'Optimize your health at the cellular level. Our wellness injections, including NAD+ and Glutathione, provide powerful antioxidants and coenzymes directly into your system, bypassing digestion for maximum absorption and profound systemic benefits.',
    detailsEs: 'Optimice su salud a nivel celular. Nuestras inyecciones de bienestar, que incluyen NAD+ y glutatión, proporcionan potentes antioxidantes y coenzimas directamente en su sistema, evitando la digestión para una absorción máxima y profundos beneficios sistémicos.'
  },
  peptide: {
    title: 'peptideTitle',
    desc: 'peptideDesc',
    heroImg: '/images/diagnostic_kit.webp',
    benefits: [
      'Accelerated tissue repair',
      'Enhanced muscle recovery',
      'Improved sleep quality',
      'Advanced longevity support'
    ],
    benefitsEs: [
      'Reparación acelerada de tejidos',
      'Mejora de la recuperación muscular',
      'Mejora de la calidad del sueño',
      'Soporte avanzado de longevidad'
    ],
    details: 'Regenerative therapies use targeted cellular signals (like BPC-157 and Sermorelin) designed to accelerate healing, boost human growth hormone naturally, and promote overall longevity.',
    detailsEs: 'Las terapias regenerativas utilizan señales celulares dirigidas (como BPC-157 y Sermorelin) diseñadas para acelerar la curación, aumentar la hormona del crecimiento humano de forma natural y promover la longevidad general.'
  }
};

function TreatmentDetails({ locale, setQuizOpen }) {
  const { id } = useParams();
  const treatment = treatmentData[id];
  const t = (key) => translations[locale][key] || key;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!treatment) {
    return (
      <div className="retro-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Treatment Not Found</h2>
        <Link to="/" className="btn btn-red" style={{ marginTop: '20px' }}>Return Home</Link>
      </div>
    );
  }

  const benefitsList = locale === 'en' ? treatment.benefits : treatment.benefitsEs;
  const detailedText = locale === 'en' ? treatment.details : treatment.detailsEs;

  return (
    <div className="treatment-details-page">
      {/* Cinematic Hero */}
      <div className="treatment-hero" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(13, 46, 98, 0.95) 0%, rgba(13, 46, 98, 0.7) 50%, transparent 100%), url(${treatment.heroImg})`
      }}>
        <div className="container treatment-hero-content">
          <Link to="/" className="back-link">
            ← {locale === 'en' ? 'Back to All Treatments' : 'Volver a Todos los Tratamientos'}
          </Link>
          <span className="treatment-tag-badge">Premium Protocol</span>
          <h1 className="treatment-hero-title">{t(treatment.title)}</h1>
          <p className="treatment-hero-desc">{t(treatment.desc)}</p>
          <button className="btn btn-red" onClick={() => window.location.href = '/start'} style={{ marginTop: '24px', padding: '16px 32px', fontSize: '1.1rem' }}>
            {t('beginConsultation')}
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container treatment-main-layout">
        <div className="treatment-content-left">
          <h2 className="treatment-section-h2">{locale === 'en' ? 'How It Works' : 'Cómo Funciona'}</h2>
          <p className="treatment-detailed-text">{detailedText}</p>
          
          <h2 className="treatment-section-h2" style={{ marginTop: '48px' }}>{locale === 'en' ? 'Key Benefits' : 'Beneficios Clave'}</h2>
          <ul className="treatment-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="treatment-sidebar-right">
          <div className="treatment-sticky-card">
            <h3 className="sticky-card-title">{locale === 'en' ? 'Ready to optimize your health?' : '¿Listo para optimizar tu salud?'}</h3>
            <p className="sticky-card-desc">
              {locale === 'en' 
                ? 'Complete our quick medical intake form to see if you qualify. No commitment required.' 
                : 'Complete nuestro rápido formulario médico para ver si califica. No se requiere compromiso.'}
            </p>
            <div className="sticky-card-features">
              <span>✓ {locale === 'en' ? 'U.S. Licensed Physicians' : 'Médicos Licenciados'}</span>
              <span>✓ {locale === 'en' ? 'Discreet Delivery' : 'Entrega Discreta'}</span>
              <span>✓ {locale === 'en' ? 'Ongoing Medical Support' : 'Apoyo Médico Continuo'}</span>
            </div>
            <button className="btn btn-red" style={{ width: '100%', marginTop: '20px' }} onClick={() => window.location.href = '/start'}>
              {locale === 'en' ? 'Start Intake Quiz' : 'Comenzar Cuestionario'}
            </button>
          </div>
        </div>
      </div>

      {/* CSS specific to this page (can be moved to index.css later, included here for rapid deployment) */}
      <style dangerouslySetInnerHTML={{__html: `
        .treatment-hero {
          height: 60vh;
          min-height: 500px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          position: relative;
          color: white;
          margin-top: -80px; /* pull up under transparent nav */
          padding-top: 80px;
        }
        .treatment-hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
        }
        .back-link {
          display: inline-block;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 24px;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: white;
        }
        .treatment-tag-badge {
          display: inline-block;
          background-color: var(--red);
          padding: 6px 12px;
          border-radius: 4px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .treatment-hero-title {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .treatment-hero-desc {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        .treatment-main-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          padding: 80px 20px;
        }
        .treatment-section-h2 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--navy-dark);
          margin-bottom: 24px;
        }
        .treatment-detailed-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-dark);
        }
        .treatment-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .treatment-benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--navy-dark);
        }
        .treatment-benefits-list li svg {
          width: 24px;
          height: 24px;
          color: var(--red);
          flex-shrink: 0;
        }
        .treatment-sticky-card {
          position: sticky;
          top: 100px;
          background-color: var(--white);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: 32px;
        }
        .sticky-card-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--navy-dark);
          margin-bottom: 12px;
        }
        .sticky-card-desc {
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .sticky-card-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sticky-card-features span {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--navy-dark);
        }
        
        @media (max-width: 991px) {
          .treatment-main-layout {
            grid-template-columns: 1fr;
          }
          .treatment-hero-title {
            font-size: 2.5rem;
          }
        }
      `}} />
    </div>
  );
}

export default TreatmentDetails;
