'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/types';
import {
  COMPLIANCE_PAYMENT,
  FEATURED_TREATMENT_IDS,
  getTreatmentLabel,
  type TreatmentId,
} from '@/lib/treatments';

type PatientIntakeProps = {
  locale: Locale;
  treatmentId?: TreatmentId | null;
};

type SexAtBirth = 'male' | 'female' | '';
type ScreeningAnswer = 'yes' | 'no' | '';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  sexAtBirth: SexAtBirth;
  selectedTreatment: TreatmentId | '';
  street: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  medicalConditions: ScreeningAnswer;
  agreeTerms: boolean;
  authorizeClinicians: boolean;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
] as const;

const INITIAL: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  sexAtBirth: '',
  selectedTreatment: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  medicalConditions: '',
  agreeTerms: false,
  authorizeClinicians: false,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function isAdult(dob: string) {
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age >= 18;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function StepIcon({ step }: { step: number }) {
  if (step === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" fill="currentColor" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 4 7v3h16V7Zm-7 10v7h4v-5h6v5h4v-7Z" fill="currentColor" />
      </svg>
    );
  }
  if (step === 3) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3H5a2 2 0 0 0-2 2v14l4-3h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-2 10H7v-2h10Zm0-4H7V7h10Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z" fill="currentColor" />
    </svg>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optionalLabel,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optionalLabel?: string;
  children: ReactNode;
}) {
  return (
    <label className={`patient-field${error ? ' has-error' : ''}`} htmlFor={htmlFor}>
      <span className="patient-field__label">
        {label}
        {optionalLabel ? <em>{optionalLabel}</em> : <span aria-hidden="true">*</span>}
      </span>
      {children}
      {error ? <span className="patient-field__error" role="alert">{error}</span> : null}
    </label>
  );
}

export default function PatientIntake({ locale, treatmentId = null }: PatientIntakeProps) {
  const router = useRouter();
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copy = useMemo(() => {
    if (locale === 'es') {
      return {
        brand: 'Efexia',
        kicker: 'Calificación de cumplimiento',
        title: 'Calificador de elegibilidad',
        subtitle:
          'Este formulario breve de 4 pasos es obligatorio para cumplimiento clínico. Confirma identidad, envío, seguridad médica y consentimientos antes de que un clínico pueda revisar su caso.',
        trust: [
          'Requerido para elegibilidad de tratamiento',
          'Revisión clínica con licencia en EE. UU.',
          'Registros privados y cifrados',
        ],
        steps: [
          { title: 'Información del paciente', short: 'Paciente' },
          { title: 'Dirección de envío', short: 'Envío' },
          { title: 'Evaluación médica', short: 'Salud' },
          { title: 'Acuerdos y pago', short: 'Acuerdos' },
        ],
        stepOf: (current: number) => `Paso ${current} de 4`,
        back: 'Atrás',
        continue: 'Continuar',
        submit: 'Enviar calificación',
        submitting: 'Enviando…',
        email: 'Correo electrónico',
        firstName: 'Nombre',
        lastName: 'Apellido',
        phone: 'Número de teléfono',
        dob: 'Fecha de nacimiento',
        sex: 'Sexo asignado al nacer',
        male: 'Masculino',
        female: 'Femenino',
        street: 'Dirección',
        apartment: 'Apartamento / Suite',
        optional: 'Opcional',
        city: 'Ciudad',
        state: 'Estado',
        zip: 'Código postal',
        screeningTitle: '¿Le aplica alguna de las siguientes condiciones?',
        screeningHint:
          'Responda con honestidad. Esta pregunta de cumplimiento ayuda a determinar si el tratamiento puede ser considerado de forma segura.',
        yes: 'Sí, una o más',
        no: 'No, ninguna aplica',
        agreeTerms:
          'Acepto los Términos de Servicio, el formulario de Consentimiento Médico y reconozco el Consentimiento Informado de Telemedicina para protocolos médicos especializados.',
        authorize:
          'Autorizo a los clínicos afiliados de Peakcare a revisar de forma segura mis registros médicos y recetar la medicación necesaria si soy candidato.',
        required: 'Este campo es obligatorio',
        invalidEmail: 'Ingrese un correo válido',
        invalidPhone: 'Ingrese un teléfono válido',
        invalidDob: 'Debe tener al menos 18 años',
        invalidZip: 'Ingrese un código postal válido',
        successTitle: 'Calificación enviada',
        successBody:
          'Gracias. Su calificación de cumplimiento fue recibida. Un clínico afiliado revisará su información de forma segura y determinará la elegibilidad.',
        successCta: 'Volver al inicio',
        privacy:
          'Esta calificación se usa solo para elegibilidad y cumplimiento clínico. Su información está protegida y solo la revisa el equipo clínico.',
        selectedTreatment: 'Tratamiento seleccionado',
        noTreatment: 'Elija un tratamiento para continuar',
        chooseTreatment: 'Seleccione un tratamiento',
        paymentNote: `Verificación de pago: $${COMPLIANCE_PAYMENT}. No hay otro cargo en este calificador.`,
      };
    }

    return {
      brand: 'Efexia',
      kicker: 'Compliance qualification',
      title: 'Eligibility qualifier',
      subtitle:
        'This required 4-step form is a mini compliance qualifier. It confirms identity, shipping, medical safety screening, and consent before a clinician can review your case.',
      trust: [
        'Required for treatment eligibility',
        'U.S.-licensed clinical review',
        'Private, encrypted records',
      ],
      steps: [
        { title: 'Patient Information', short: 'Patient' },
        { title: 'Shipping Address', short: 'Shipping' },
        { title: 'Medical Screening', short: 'Screening' },
        { title: 'Agreements & Checkout', short: 'Agreements' },
      ],
      stepOf: (current: number) => `Step ${current} of 4`,
      back: 'Back',
      continue: 'Continue',
      submit: 'Submit qualification',
      submitting: 'Submitting…',
      email: 'Email Address',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone Number',
      dob: 'Date of Birth',
      sex: 'Sex Assigned at Birth',
      male: 'Male',
      female: 'Female',
      street: 'Street Address',
      apartment: 'Apartment / Suite',
      optional: 'Optional',
      city: 'City',
      state: 'State',
      zip: 'ZIP / Postcode',
      screeningTitle: 'Do any of the following conditions apply to you?',
      screeningHint:
        'Answer honestly. This compliance question helps determine whether treatment can be safely considered.',
      yes: 'Yes, one or more',
      no: 'No, none apply',
      agreeTerms:
        'I agree to the Terms of Service, Medical Consent form, and acknowledge the Telehealth Informed Consent for specialized medical protocols.',
      authorize:
        "I authorize Peakcare's affiliated clinicians to securely review my medical records and prescribe the necessary medication if candidate.",
      required: 'This field is required',
      invalidEmail: 'Enter a valid email address',
      invalidPhone: 'Enter a valid phone number',
      invalidDob: 'You must be at least 18 years old',
      invalidZip: 'Enter a valid ZIP / postcode',
      successTitle: 'Qualification submitted',
      successBody:
        'Thank you. Your compliance qualification was received. An affiliated clinician will securely review your information and determine eligibility.',
      successCta: 'Back to home',
      privacy:
        'This qualifier is used only for eligibility and clinical compliance. Your information is protected and reviewed only by the clinical team.',
      selectedTreatment: 'Selected treatment',
      noTreatment: 'Choose a treatment to continue',
      chooseTreatment: 'Select a treatment',
      paymentNote: `Verification payment: $${COMPLIANCE_PAYMENT}. No other charge in this qualifier.`,
    };
  }, [locale]);

  const resolvedTreatment = treatmentId || data.selectedTreatment || null;
  const selectedLabel = resolvedTreatment ? getTreatmentLabel(resolvedTreatment, locale) : null;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, submitted]);

  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateStep = useCallback((current: number): boolean => {
    const nextErrors: FieldErrors = {};

    if (current === 1) {
      if (!data.email.trim()) nextErrors.email = copy.required;
      else if (!isValidEmail(data.email)) nextErrors.email = copy.invalidEmail;
      if (!data.firstName.trim()) nextErrors.firstName = copy.required;
      if (!data.lastName.trim()) nextErrors.lastName = copy.required;
      if (!data.phone.trim()) nextErrors.phone = copy.required;
      else if (!isValidPhone(data.phone)) nextErrors.phone = copy.invalidPhone;
      if (!data.dateOfBirth) nextErrors.dateOfBirth = copy.required;
      else if (!isAdult(data.dateOfBirth)) nextErrors.dateOfBirth = copy.invalidDob;
      if (!data.sexAtBirth) nextErrors.sexAtBirth = copy.required;
      if (!treatmentId && !data.selectedTreatment) nextErrors.selectedTreatment = copy.required;
    }

    if (current === 2) {
      if (!data.street.trim()) nextErrors.street = copy.required;
      if (!data.city.trim()) nextErrors.city = copy.required;
      if (!data.state) nextErrors.state = copy.required;
      if (!data.zip.trim()) nextErrors.zip = copy.required;
      else if (!/^\d{5}(-\d{4})?$/.test(data.zip.trim())) nextErrors.zip = copy.invalidZip;
    }

    if (current === 3) {
      if (!data.medicalConditions) nextErrors.medicalConditions = copy.required;
    }

    if (current === 4) {
      if (!data.agreeTerms) nextErrors.agreeTerms = copy.required;
      if (!data.authorizeClinicians) nextErrors.authorizeClinicians = copy.required;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [copy, data, treatmentId]);

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    setStep((value) => Math.min(value + 1, 4));
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((value) => Math.max(value - 1, 1));
  }, []);

  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(4)) return;

    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setSubmitting(false);
    setSubmitted(true);
  }, [validateStep]);

  if (submitted) {
    return (
      <div className="patient-intake">
        <div className="patient-intake__shell patient-intake__shell--success">
          <div className="patient-intake__success" role="status">
            <div className="patient-intake__success-mark" aria-hidden="true">✓</div>
            <h1 tabIndex={-1} ref={headingRef}>{copy.successTitle}</h1>
            <p>{copy.successBody}</p>
            <button type="button" className="patient-intake__primary" onClick={() => router.push('/')}>
              {copy.successCta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-intake">
      <div className="patient-intake__shell">
        <aside className="patient-intake__aside" aria-hidden="false">
          <div className="patient-intake__aside-glow" aria-hidden="true" />
          <p className="patient-intake__kicker">{copy.kicker}</p>
          <p className="patient-intake__brand-mark">{copy.brand}</p>
          <h1 className="patient-intake__brand">{copy.title}</h1>
          <p className="patient-intake__lede">{copy.subtitle}</p>
          <ul className="patient-intake__trust">
            {copy.trust.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <ol className="patient-intake__rail" aria-label={copy.stepOf(step)}>
            {copy.steps.map((item, index) => {
              const number = index + 1;
              const state = number < step ? 'is-done' : number === step ? 'is-active' : '';
              return (
                <li key={item.title} className={state}>
                  <span className="patient-intake__rail-icon"><StepIcon step={number} /></span>
                  <span>
                    <strong>{item.short}</strong>
                    <small>{item.title}</small>
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="patient-intake__panel">
          <header className="patient-intake__header">
            <p className="patient-intake__step-label">{copy.stepOf(step)}</p>
            <h2 tabIndex={-1} ref={headingRef}>{copy.steps[step - 1].title}</h2>
            <div className={`patient-intake__product${selectedLabel ? ' is-selected' : ''}`}>
              <span>{copy.selectedTreatment}</span>
              <strong>{selectedLabel || copy.noTreatment}</strong>
            </div>
            <div className="patient-intake__progress" aria-hidden="true">
              <span style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </header>

          <form id={formId} className="patient-intake__form" onSubmit={onSubmit} noValidate>
            {step === 1 && (
              <div className="patient-intake__grid" key="step-1">
                <Field label={copy.email} htmlFor={`${formId}-email`} error={errors.email}>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={data.email}
                    onChange={(event) => update('email', event.target.value)}
                    placeholder="you@email.com"
                  />
                </Field>

                <div className="patient-intake__row">
                  <Field label={copy.firstName} htmlFor={`${formId}-first`} error={errors.firstName}>
                    <input
                      id={`${formId}-first`}
                      type="text"
                      autoComplete="given-name"
                      value={data.firstName}
                      onChange={(event) => update('firstName', event.target.value)}
                    />
                  </Field>
                  <Field label={copy.lastName} htmlFor={`${formId}-last`} error={errors.lastName}>
                    <input
                      id={`${formId}-last`}
                      type="text"
                      autoComplete="family-name"
                      value={data.lastName}
                      onChange={(event) => update('lastName', event.target.value)}
                    />
                  </Field>
                </div>

                <Field label={copy.phone} htmlFor={`${formId}-phone`} error={errors.phone}>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={data.phone}
                    onChange={(event) => update('phone', formatPhone(event.target.value))}
                    placeholder="(555) 123-4567"
                  />
                </Field>

                <Field label={copy.dob} htmlFor={`${formId}-dob`} error={errors.dateOfBirth}>
                  <input
                    id={`${formId}-dob`}
                    type="date"
                    autoComplete="bday"
                    value={data.dateOfBirth}
                    onChange={(event) => update('dateOfBirth', event.target.value)}
                  />
                </Field>

                <fieldset className={`patient-choice${errors.sexAtBirth ? ' has-error' : ''}`}>
                  <legend>
                    {copy.sex} <span aria-hidden="true">*</span>
                  </legend>
                  <div className="patient-choice__options">
                    <button
                      type="button"
                      className={data.sexAtBirth === 'male' ? 'is-selected' : ''}
                      onClick={() => update('sexAtBirth', 'male')}
                      aria-pressed={data.sexAtBirth === 'male'}
                    >
                      {copy.male}
                    </button>
                    <button
                      type="button"
                      className={data.sexAtBirth === 'female' ? 'is-selected' : ''}
                      onClick={() => update('sexAtBirth', 'female')}
                      aria-pressed={data.sexAtBirth === 'female'}
                    >
                      {copy.female}
                    </button>
                  </div>
                  {errors.sexAtBirth ? <span className="patient-field__error" role="alert">{errors.sexAtBirth}</span> : null}
                </fieldset>

                {!treatmentId ? (
                  <fieldset className={`patient-choice${errors.selectedTreatment ? ' has-error' : ''}`}>
                    <legend>
                      {copy.chooseTreatment} <span aria-hidden="true">*</span>
                    </legend>
                    <div className="patient-choice__options patient-choice__options--stack">
                      {FEATURED_TREATMENT_IDS.map((id) => (
                        <button
                          key={id}
                          type="button"
                          className={data.selectedTreatment === id ? 'is-selected' : ''}
                          onClick={() => update('selectedTreatment', id)}
                          aria-pressed={data.selectedTreatment === id}
                        >
                          {getTreatmentLabel(id, locale)}
                        </button>
                      ))}
                    </div>
                    {errors.selectedTreatment ? (
                      <span className="patient-field__error" role="alert">{errors.selectedTreatment}</span>
                    ) : null}
                  </fieldset>
                ) : null}
              </div>
            )}

            {step === 2 && (
              <div className="patient-intake__grid" key="step-2">
                <Field label={copy.street} htmlFor={`${formId}-street`} error={errors.street}>
                  <input
                    id={`${formId}-street`}
                    type="text"
                    autoComplete="street-address"
                    value={data.street}
                    onChange={(event) => update('street', event.target.value)}
                  />
                </Field>

                <Field label={copy.apartment} htmlFor={`${formId}-apt`} optionalLabel={copy.optional}>
                  <input
                    id={`${formId}-apt`}
                    type="text"
                    autoComplete="address-line2"
                    value={data.apartment}
                    onChange={(event) => update('apartment', event.target.value)}
                    placeholder={copy.optional}
                  />
                </Field>

                <div className="patient-intake__row patient-intake__row--address">
                  <Field label={copy.city} htmlFor={`${formId}-city`} error={errors.city}>
                    <input
                      id={`${formId}-city`}
                      type="text"
                      autoComplete="address-level2"
                      value={data.city}
                      onChange={(event) => update('city', event.target.value)}
                    />
                  </Field>
                  <Field label={copy.state} htmlFor={`${formId}-state`} error={errors.state}>
                    <select
                      id={`${formId}-state`}
                      autoComplete="address-level1"
                      value={data.state}
                      onChange={(event) => update('state', event.target.value)}
                    >
                      <option value="">—</option>
                      {US_STATES.map((code) => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={copy.zip} htmlFor={`${formId}-zip`} error={errors.zip}>
                    <input
                      id={`${formId}-zip`}
                      type="text"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      value={data.zip}
                      onChange={(event) => update('zip', event.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="patient-intake__grid" key="step-3">
                <fieldset className={`patient-screening${errors.medicalConditions ? ' has-error' : ''}`}>
                  <legend>{copy.screeningTitle} <span aria-hidden="true">*</span></legend>
                  <p className="patient-screening__hint">{copy.screeningHint}</p>
                  <div className="patient-choice__options patient-choice__options--stack">
                    <button
                      type="button"
                      className={data.medicalConditions === 'yes' ? 'is-selected' : ''}
                      onClick={() => update('medicalConditions', 'yes')}
                      aria-pressed={data.medicalConditions === 'yes'}
                    >
                      {copy.yes}
                    </button>
                    <button
                      type="button"
                      className={data.medicalConditions === 'no' ? 'is-selected' : ''}
                      onClick={() => update('medicalConditions', 'no')}
                      aria-pressed={data.medicalConditions === 'no'}
                    >
                      {copy.no}
                    </button>
                  </div>
                  {errors.medicalConditions ? (
                    <span className="patient-field__error" role="alert">{errors.medicalConditions}</span>
                  ) : null}
                </fieldset>
              </div>
            )}

            {step === 4 && (
              <div className="patient-intake__grid" key="step-4">
                <label className={`patient-check${errors.agreeTerms ? ' has-error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={data.agreeTerms}
                    onChange={(event) => update('agreeTerms', event.target.checked)}
                  />
                  <span>
                    {locale === 'en' ? (
                      <>
                        I agree to the <Link href="/terms" target="_blank" rel="noreferrer">Terms of Service</Link>,{' '}
                        <Link href="/medical-consent" target="_blank" rel="noreferrer">Medical Consent</Link> form, and
                        acknowledge the{' '}
                        <Link href="/telehealth-consent" target="_blank" rel="noreferrer">Telehealth Informed Consent</Link>{' '}
                        for specialized medical protocols.
                      </>
                    ) : (
                      <>
                        Acepto los <Link href="/terms" target="_blank" rel="noreferrer">Términos de Servicio</Link>, el
                        formulario de <Link href="/medical-consent" target="_blank" rel="noreferrer">Consentimiento Médico</Link> y
                        reconozco el{' '}
                        <Link href="/telehealth-consent" target="_blank" rel="noreferrer">Consentimiento Informado de Telemedicina</Link>{' '}
                        para protocolos médicos especializados.
                      </>
                    )}
                    {' '}<strong aria-hidden="true">*</strong>
                  </span>
                </label>
                {errors.agreeTerms ? <span className="patient-field__error" role="alert">{errors.agreeTerms}</span> : null}

                <label className={`patient-check${errors.authorizeClinicians ? ' has-error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={data.authorizeClinicians}
                    onChange={(event) => update('authorizeClinicians', event.target.checked)}
                  />
                  <span>{copy.authorize} <strong aria-hidden="true">*</strong></span>
                </label>
                {errors.authorizeClinicians ? (
                  <span className="patient-field__error" role="alert">{errors.authorizeClinicians}</span>
                ) : null}

                <p className="patient-intake__privacy">{copy.privacy}</p>
                <p className="patient-intake__privacy">{copy.paymentNote}</p>
              </div>
            )}
          </form>

          <footer className="patient-intake__footer">
            {step > 1 ? (
              <button type="button" className="patient-intake__ghost" onClick={goBack}>
                {copy.back}
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button type="button" className="patient-intake__primary" onClick={goNext}>
                {copy.continue}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                type="submit"
                form={formId}
                className="patient-intake__primary"
                disabled={submitting}
              >
                {submitting ? copy.submitting : copy.submit}
                {!submitting ? <span aria-hidden="true">→</span> : null}
              </button>
            )}
          </footer>
        </section>
      </div>
    </div>
  );
}
