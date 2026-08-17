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
      return {
        title: 'Next step: start from $239',
        subtitle: 'Licensed provider review required',
        price: '$239',
        features: [
          'Monthly pricing if a licensed provider prescribes',
          'U.S.-licensed clinician reviews your intake',
          'Completing intake does not guarantee a prescription',
          'Treatment options discussed only if clinically appropriate'
        ]
      };
    }

    return {
      title: 'Siguiente paso: comenzar desde $239',
      subtitle: 'Se requiere revisión de un proveedor con licencia',
      price: '$239',
      features: [
        'Precio mensual si un proveedor con licencia receta',
        'Un clínico con licencia en EE. UU. revisa su evaluación',
        'Completar la evaluación no garantiza una receta',
        'Opciones de tratamiento solo si son clínicamente apropiadas'
      ]
    };
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
