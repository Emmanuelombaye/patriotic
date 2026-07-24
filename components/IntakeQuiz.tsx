'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/types';

type IntakeQuizProps = {
  isOpen: boolean;
  onClose: () => void;
  locale?: Locale;
  dismissible?: boolean;
};

export default function IntakeQuiz({ isOpen, onClose, locale = 'en', dismissible = true }: IntakeQuizProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState('');

  useEffect(() => {
    if (!isOpen || !dismissible) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, dismissible, onClose]);

  if (!isOpen) return null;

  const totalSteps = 4;
  const progressPercent = Math.min((step / totalSteps) * 100, 100);

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const getRecommendation = () => {
    if (locale === 'en') {
      switch (goal) {
        case 'trt':
          return {
            title: 'Physician-Guided Testosterone Therapy',
            subtitle: 'Restore Peak Energy & Vitality',
            price: '$129',
            features: [
              'Personalized physician-guided TRT protocol',
              'All medical supplies & syringes included',
              'Ongoing laboratory blood test tracking',
              'Direct messaging access to clinical support team'
            ]
          };
        case 'weight':
          return {
            title: 'Compounded GLP-1 Weight Loss Program',
            subtitle: 'Clinically-Backed Semaglutide / Tirzepatide',
            price: '$249',
            features: [
              'Compounded Semaglutide or Tirzepatide prescriptions',
              'Suppresses appetite & slows digestion for lasting results',
              'Includes Vitamin B12 helper compounds for energy support',
              'No insurance required, direct-to-door cold-chain shipping'
            ]
          };
        case 'ed':
          return {
            title: 'Custom ED & Performance Protocols',
            subtitle: 'Sildenafil & Tadalafil Prescriptions',
            price: '$49',
            features: [
              'Licensed physician prescription evaluation',
              'Discreet plain packaging delivered monthly',
              'Flexible pill counts tailored to your lifestyle',
              'Active customer support team available 24/7'
            ]
          };
        case 'longevity':
          return {
            title: 'NAD+ Cellular Booster Injections',
            subtitle: 'Support DNA Repair & Mitochondrial Function',
            price: '$179',
            features: [
              'Compounded NAD+ high-concentration therapy',
              'Promotes mental clarity & focus',
              'Supports cellular metabolic speed',
              'Convenient self-injection kit with all supplies'
            ]
          };
        case 'hair':
          return {
            title: 'Dual-Action Hair Regrowth Pack',
            subtitle: 'Finasteride & Minoxidil Synergy',
            price: '$39',
            features: [
              'Medical evaluation by licensed U.S. physician',
              'Combined DHT blocker and follicle stimulator',
              'Delivered discreetly to your door',
              'Cancel or modify shipments anytime'
            ]
          };
        default:
          return {
            title: 'Efexia Wellness Consultation',
            subtitle: 'Personalized Clinical Intake Review',
            price: '$99',
            features: [
              'One-on-one medical intake evaluation',
              'Discussion of symptoms, goals, and history',
              'Custom treatment blueprint recommendations',
              'Blood panel orders arranged near you'
            ]
          };
      }
    } else {
      // Spanish recommendations
      switch (goal) {
        case 'trt':
          return {
            title: 'Terapia de Testosterona Guiada por Médicos',
            subtitle: 'Restaure su Energía y Vitalidad Máximas',
            price: '$129',
            features: [
              'Protocolo TRT personalizado guiado por médicos',
              'Suministros médicos y jeringas incluidos',
              'Monitoreo continuo de análisis de sangre en laboratorio',
              'Acceso por mensajería al equipo de soporte clínico'
            ]
          };
        case 'weight':
          return {
            title: 'Programa Compuesto de Pérdida de Peso GLP-1',
            subtitle: 'Semaglutida / Tirzepatida Respaldada Clínicamente',
            price: '$249',
            features: [
              'Recetas compuestas de Semaglutida o Tirzepatida',
              'Suprime el apetito y ralentiza la digestión para resultados duraderos',
              'Incluye compuestos de Vitamina B12 para soporte de energía',
              'Sin necesidad de seguro, envío en cadena de frío directo a su puerta'
            ]
          };
        case 'ed':
          return {
            title: 'Protocolos de Rendimiento y DE Personalizados',
            subtitle: 'Recetas de Sildenafilo y Tadalafilo',
            price: '$49',
            features: [
              'Evaluación de receta por médico con licencia',
              'Embalaje discreto y sencillo entregado mensualmente',
              'Cantidades de pastillas flexibles adaptadas a su estilo de vida',
              'Equipo de soporte activo disponible las 24 horas'
            ]
          };
        case 'longevity':
          return {
            title: 'Inyecciones de Refuerzo Celular NAD+',
            subtitle: 'Apoye la Reparación del ADN y Función Mitocondrial',
            price: '$179',
            features: [
              'Terapia compuesta de NAD+ de alta concentración',
              'Promueve la claridad mental y el enfoque',
              'Apoya la velocidad del metabolismo celular',
              'Kit de autoinyección conveniente con todos los suministros'
            ]
          };
        case 'hair':
          return {
            title: 'Paquete de Doble Acción para Crecimiento Capilar',
            subtitle: 'Sinergia de Finasterida y Minoxidil',
            price: '$39',
            features: [
              'Evaluación médica por médico con licencia en EE. UU.',
              'Bloqueador de DHT y estimulador folicular combinado',
              'Entregado discretamente en su puerta',
              'Cancele o modifique envíos en cualquier momento'
            ]
          };
        default:
          return {
            title: 'Consulta de Bienestar Efexia',
            subtitle: 'Revisión Médica Personalizada',
            price: '$99',
            features: [
              'Evaluación de consulta médica uno a uno',
              'Discusión de síntomas, objetivos e historial',
              'Recomendaciones de plan de tratamiento personalizado',
              'Órdenes de análisis de sangre coordinadas cerca de usted'
            ]
          };
      }
    }
  };

  const handleNext = () => {
    if (step === 1 && !goal) return;
    if (step === 3 && !age) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setSymptoms([]);
    setAge('');
  };

  const rec = getRecommendation();

  // Translations
  const txt = {
    title: locale === 'en' ? 'Efexia Health Assessment' : 'Evaluación de Salud Efexia',
    back: locale === 'en' ? 'Back' : 'Atrás',
    continue: locale === 'en' ? 'Continue' : 'Continuar',
    getRec: locale === 'en' ? 'Get Recommendation' : 'Obtener Recomendación',
    retake: locale === 'en' ? 'Retake Assessment' : 'Rehacer Evaluación',
    startIntake: locale === 'en' ? 'Start Secure Intake' : 'Iniciar Consulta Segura',
    disclaimer: locale === 'en' 
      ? '*Actual prescription eligibility is determined by a licensed medical provider during clinical review.'
      : '*La elegibilidad real para la receta la determina un proveedor de atención médica con licencia durante la revisión clínica.',
    step4Title: locale === 'en' ? 'Assessment Complete!' : '¡Evaluación Completada!',
    step4Desc: locale === 'en'
      ? 'Based on your responses, our clinical team recommends:'
      : 'Según sus respuestas, nuestro equipo clínico recomienda:',
    startingAt: locale === 'en' ? 'Starting at' : 'Desde',
    month: locale === 'en' ? 'month' : 'mes',
    redirectAlert: locale === 'en'
      ? 'Thank you! Directing you to secure medical intake platform...'
      : '¡Gracias! Redirigiéndolo a la plataforma segura de consulta médica...'
  };

  return (
    <div
      className="modal-overlay"
      onClick={dismissible ? onClose : undefined}
      role="presentation"
    >
      <div
        className="quiz-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={txt.title}
      >
        <div className="quiz-header">
          <h3 style={{ fontSize: '18px', color: 'var(--navy)' }}>{txt.title}</h3>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="quiz-body">
          {step === 1 && (
            <div>
              <h2 className="quiz-question">
                {locale === 'en' ? 'Select your primary health goal' : 'Seleccione su principal objetivo de salud'}
              </h2>
              <div className="quiz-options">
                <div className={`quiz-option-card ${goal === 'trt' ? 'selected' : ''}`} onClick={() => setGoal('trt')}>
                  <div className="quiz-option-number">1</div>
                  <span>{locale === 'en' ? 'Optimize Testosterone & Energy (TRT)' : 'Optimizar Testosterona y Energía (TRT)'}</span>
                </div>
                <div className={`quiz-option-card ${goal === 'weight' ? 'selected' : ''}`} onClick={() => setGoal('weight')}>
                  <div className="quiz-option-number">2</div>
                  <span>{locale === 'en' ? 'Sustainable Medical Weight Loss' : 'Pérdida de Peso Médica Sostenible'}</span>
                </div>
                <div className={`quiz-option-card ${goal === 'ed' ? 'selected' : ''}`} onClick={() => setGoal('ed')}>
                  <div className="quiz-option-number">3</div>
                  <span>{locale === 'en' ? 'Restore Sexual Vitality & Performance' : 'Restaurar Vitalidad Sexual y Rendimiento'}</span>
                </div>
                <div className={`quiz-option-card ${goal === 'longevity' ? 'selected' : ''}`} onClick={() => setGoal('longevity')}>
                  <div className="quiz-option-number">4</div>
                  <span>{locale === 'en' ? 'Cellular Longevity & NAD+ Boost' : 'Longevidad Celular y Potenciación de NAD+'}</span>
                </div>
                <div className={`quiz-option-card ${goal === 'hair' ? 'selected' : ''}`} onClick={() => setGoal('hair')}>
                  <div className="quiz-option-number">5</div>
                  <span>{locale === 'en' ? 'Targeted Hair Regrowth Solutions' : 'Soluciones de Crecimiento Capilar Dirigido'}</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="quiz-question">
                {locale === 'en' 
                  ? 'What symptoms are you experiencing? (Select all that apply)' 
                  : '¿Qué síntomas está experimentando? (Seleccione todos los que apliquen)'}
              </h2>
              <div className="quiz-options">
                {(locale === 'en' ? [
                  { id: 'fatigue', text: 'Low energy & persistent fatigue' },
                  { id: 'muscle', text: 'Loss of muscle mass or strength' },
                  { id: 'weight', text: 'Difficulty losing weight or belly fat' },
                  { id: 'fog', text: 'Brain fog & lack of concentration' },
                  { id: 'hair', text: 'Thinning hair or receding hairline' },
                  { id: 'none', text: 'None / Just seeking preventive wellness' }
                ] : [
                  { id: 'fatigue', text: 'Baja energía y fatiga persistente' },
                  { id: 'muscle', text: 'Pérdida de masa muscular o fuerza' },
                  { id: 'weight', text: 'Dificultad para perder peso o grasa abdominal' },
                  { id: 'fog', text: 'Neblina mental y falta de concentración' },
                  { id: 'hair', text: 'Cabello debilitado o entradas pronunciadas' },
                  { id: 'none', text: 'Ninguno / Solo busco bienestar preventivo' }
                ]).map((item, idx) => (
                  <div 
                    key={item.id} 
                    className={`quiz-option-card ${symptoms.includes(item.id) ? 'selected' : ''}`} 
                    onClick={() => toggleSymptom(item.id)}
                  >
                    <div className="quiz-option-number">{idx + 1}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="quiz-question">
                {locale === 'en' ? 'Please select your age range' : 'Por favor seleccione su rango de edad'}
              </h2>
              <div className="quiz-options">
                {['18-29', '30-45', '46-60', '61+'].map((range, idx) => (
                  <div 
                    key={range} 
                    className={`quiz-option-card ${age === range ? 'selected' : ''}`} 
                    onClick={() => setAge(range)}
                  >
                    <div className="quiz-option-number">{idx + 1}</div>
                    <span>{range} {locale === 'en' ? 'Years Old' : 'Años de Edad'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="recommendations-box">
              <div style={{ fontSize: '50px', margin: '0 0 10px' }}>✓</div>
              <h2 className="rec-title-success">{txt.step4Title}</h2>
              <p style={{ marginBottom: '16px', fontSize: '15px' }}>{txt.step4Desc}</p>
              
              <div className="rec-card">
                <h3 style={{ fontSize: '20px', color: 'var(--navy)', marginBottom: '4px' }}>{rec.title}</h3>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#555', marginBottom: '12px' }}>{rec.subtitle}</p>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--red)', marginBottom: '16px' }}>
                  {txt.startingAt} <span style={{ fontSize: '32px' }}>{rec.price}</span>/{txt.month}
                </div>
                <ul className="treatment-features" style={{ margin: '0', border: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rec.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              
              <p style={{ fontSize: '12px', color: '#666', maxWidth: '400px', marginBottom: '10px' }}>
                {txt.disclaimer}
              </p>
            </div>
          )}
        </div>

        <div className="quiz-footer">
          {step > 1 && step < 4 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              {txt.back}
            </button>
          )}
          {step === 1 && <div />}
          
          {step < 3 && (
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={step === 1 && !goal}
              style={{ opacity: (step === 1 && !goal) ? 0.6 : 1 }}
            >
              {txt.continue}
            </button>
          )}

          {step === 3 && (
            <button 
              className="btn btn-navy" 
              onClick={handleNext}
              disabled={!age}
              style={{ opacity: !age ? 0.6 : 1 }}
            >
              {txt.getRec}
            </button>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={handleReset}>
                {txt.retake}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  alert(txt.redirectAlert);
                  onClose();
                }}
              >
                {txt.startIntake}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
