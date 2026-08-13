import QUESTIONNAIRE from './questionnaire.json'

export type QuestionnaireQuestion = {
  id: string
  question: string
  type: 'number' | 'text' | 'boolean' | 'select'
  required?: boolean
  options?: string[]
  condition?: { question_id: string; value: string }
  disqualifier?: boolean
  disqualifier_value?: string
}

export const INTAKE_PHASES = [
  { id: 'metrics', label: 'Body metrics' },
  { id: 'screening', label: 'Screening' },
  { id: 'patient', label: 'Patient info' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'consent', label: 'Agreements' },
] as const

export type IntakePhaseId = (typeof INTAKE_PHASES)[number]['id']

const METRICS_IDS = new Set(['weight', 'height', 'gender', 'dob'])

export type IntakeAnswers = Record<string, string>

export type ClinicalIntake = {
  answers: IntakeAnswers
  height: string
  weight: string
  sexAtBirth: string
  dob: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  consentTelehealth: boolean
  consentReview: boolean
}

export function emptyClinicalIntake(): ClinicalIntake {
  return {
    answers: {},
    height: '',
    weight: '',
    sexAtBirth: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    consentTelehealth: false,
    consentReview: false,
  }
}

export const QUESTIONS = QUESTIONNAIRE as QuestionnaireQuestion[]

function answerForCondition(
  condition: NonNullable<QuestionnaireQuestion['condition']>,
  intake: Pick<ClinicalIntake, 'answers' | 'sexAtBirth'>,
) {
  if (condition.question_id === 'gender') return intake.sexAtBirth || ''
  return intake.answers?.[condition.question_id] || ''
}

export function getActiveScreeningQuestions(
  intake: Pick<ClinicalIntake, 'answers' | 'sexAtBirth'>,
): QuestionnaireQuestion[] {
  return QUESTIONS.filter((q) => {
    if (METRICS_IDS.has(q.id)) return false
    if (!q.condition) return true
    const related = answerForCondition(q.condition, intake)
    return String(related).toLowerCase() === String(q.condition.value).toLowerCase()
  })
}

export function questionIsDisqualified(q: QuestionnaireQuestion, answer: string | undefined) {
  if (!q.disqualifier) return false
  return String(answer || '').toLowerCase() === String(q.disqualifier_value || '').toLowerCase()
}

export function screeningHasDisqualifier(intake: Pick<ClinicalIntake, 'answers' | 'sexAtBirth'>) {
  return getActiveScreeningQuestions(intake).some((q) => questionIsDisqualified(q, intake.answers?.[q.id]))
}

export function isScreeningComplete(intake: Pick<ClinicalIntake, 'answers' | 'sexAtBirth'>) {
  const questions = getActiveScreeningQuestions(intake)
  const answered = questions.every((q) => {
    if (!q.required) return true
    const ans = intake.answers?.[q.id]
    return ans != null && String(ans).trim().length > 0
  })
  return answered && !screeningHasDisqualifier(intake)
}

export function isValidAdultDob(val: string) {
  if (!val) return false
  const birthDate = new Date(val)
  if (Number.isNaN(birthDate.getTime())) return false
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1
  return age >= 18 && age <= 120
}

export function isValidZip(val: string) {
  return /^\d{5}(-\d{4})?$/.test(String(val || '').trim())
}

export function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim())
}

export function isValidPhone(val: string) {
  return String(val || '').replace(/\D/g, '').length >= 10
}

export const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
] as const
