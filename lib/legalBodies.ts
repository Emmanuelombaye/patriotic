export type LegalBlock = {
  heading?: string;
  paragraphs: string[];
};

export const LEGAL_BODIES: Record<string, { updated: string; intro?: string; blocks: LegalBlock[] }> = {
  'medical-consent': {
    updated: 'August 17, 2026',
    intro:
      'The information provided through the Efexia® website, assessments, product pages, checkout flows, communications, and related services is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.',
    blocks: [
      {
        heading: '1. Informational Use Only',
        paragraphs: [
          'All content on the Efexia® Services—including text, graphics, images, assessments, product descriptions, and other materials—is provided for general informational purposes only. It is not intended to be, and should not be relied upon as, medical advice or a recommendation for any particular treatment, medication, or course of action.',
        ],
      },
      {
        heading: '2. Not Medical Advice',
        paragraphs: [
          'Use of the Efexia® Services does not create a doctor-patient relationship with Efexia®. Content on the Services does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding your health or a medical condition.',
        ],
      },
      {
        heading: '3. Efexia® Is Not a Pharmacy',
        paragraphs: [
          'Efexia® is not a pharmacy and does not itself practice medicine. Medical services, if available, are provided by independent US-licensed providers or affiliated clinical partners.',
        ],
      },
      {
        heading: '4. Provider Review Required',
        paragraphs: [
          'Prescription treatment, if any, is provided only after review by a US-licensed provider and only if clinically appropriate.',
          'Completing an assessment, checkout, payment authorization, or account creation does not guarantee that treatment will be prescribed.',
        ],
      },
      {
        heading: '5. No Emergency Services',
        paragraphs: [
          'The Services are not intended for emergency medical needs. If you are experiencing a medical emergency, call 911 or seek emergency medical care immediately.',
        ],
      },
      {
        heading: '6. No Guaranteed Results',
        paragraphs: [
          'Efexia® does not guarantee specific outcomes, results, eligibility, prescriptions, weight loss, hair regrowth, performance improvement, energy improvement, anti-aging benefits, or treatment availability.',
        ],
      },
      {
        heading: '7. Treatment Availability',
        paragraphs: [
          'Services may not be available in all states. Treatment options may vary based on state laws, provider review, clinical appropriateness, pharmacy availability, medication availability, and other operational or legal factors.',
        ],
      },
      {
        heading: '8. Prescription Products',
        paragraphs: [
          'Certain products available through the Services require a valid prescription from a licensed healthcare provider. A prescription will only be issued if a provider determines that treatment is clinically appropriate.',
        ],
      },
      {
        heading: '9. Compounded Medication Notice',
        paragraphs: [
          'Some medications, if prescribed, may be compounded medications. Compounded medications are prepared by a licensed compounding pharmacy pursuant to a prescription for an individual patient and are not reviewed by the FDA for safety, effectiveness, or quality in the same manner as FDA-approved medications. Compounded medications are not generic versions of, equivalent to, interchangeable with, or the same as FDA-approved medications.',
        ],
      },
      {
        heading: '10. Product Images and Packaging',
        paragraphs: [
          'Product images, packaging, labels, and descriptions are for illustrative purposes only and may differ from the medication, packaging, or instructions provided by a pharmacy or licensed provider.',
        ],
      },
      {
        heading: '11. Individual Results May Vary',
        paragraphs: [
          'Individual results vary. Any timelines, benefits, or descriptions on the Services are general in nature and may not apply to every individual.',
        ],
      },
      {
        heading: '12. Third-Party Providers and Pharmacies',
        paragraphs: [
          'Efexia® may coordinate access to independent providers, pharmacies, payment processors, fulfillment partners, or other service providers. These third parties may have their own policies, notices, and responsibilities.',
        ],
      },
      {
        heading: '13. When to Seek Medical Care',
        paragraphs: [
          'Contact a licensed healthcare provider if you have questions about your health, symptoms, medications, side effects, allergies, or treatment options. Seek urgent or emergency care if symptoms are severe, sudden, or life-threatening.',
        ],
      },
      {
        heading: '14. Contact Us',
        paragraphs: [
          'Questions about this Medical Disclaimer can be sent to support@efexiamd.com.',
          'Efexia MD LLC d/b/a Efexia®',
        ],
      },
    ],
  },
  'telehealth-consent': {
    updated: 'August 17, 2026',
    intro:
      'This Telehealth Consent explains how telehealth services may be provided through the Efexia® platform. By using the Efexia® Services, completing an assessment, submitting information, or proceeding with provider review, you consent to receive care through telehealth where permitted by applicable law. Efexia® is not a pharmacy and does not itself practice medicine. Medical services, if available, are provided by independent US-licensed providers or affiliated clinical partners.',
    blocks: [
      {
        heading: '1. What Telehealth Is',
        paragraphs: [
          'Telehealth is the delivery of health-related services and clinical information through electronic communications between a patient and a provider who are in different locations.',
          'Telehealth may include online questionnaires, secure messaging, uploaded photos or documents, remote provider review, and other electronic communications. A live video or phone visit may not always be required unless requested by a provider or required by law.',
        ],
      },
      {
        heading: '2. Asynchronous Care',
        paragraphs: [
          'Care through Efexia® is often delivered asynchronously, meaning a US-licensed provider reviews your information and communicates with you at separate times rather than during a real-time visit.',
          'Asynchronous telehealth may not be appropriate for all medical conditions. A provider may request more information, require a live consultation, decline treatment, or recommend in-person care.',
        ],
      },
      {
        heading: '3. Provider Review',
        paragraphs: [
          'The information you submit through assessments, intake forms, secure messages, and uploads is reviewed by an independent US-licensed provider to determine whether treatment is clinically appropriate for you.',
          'Providers may ask follow-up questions, request additional information, or recommend alternative care, including in-person evaluation.',
        ],
      },
      {
        heading: '4. No Guarantee of Prescription',
        paragraphs: [
          'Completing an assessment, checkout, payment authorization, or account creation does not guarantee that treatment will be prescribed.',
          'Prescription treatment, if any, is provided only after a US-licensed provider reviews your information and determines that treatment is clinically appropriate.',
        ],
      },
      {
        heading: '5. Potential Benefits of Telehealth',
        paragraphs: [
          'Potential benefits include more convenient access to licensed providers, the ability to receive care from a private location, reduced travel and wait times, and discreet communication about sensitive health concerns.',
        ],
      },
      {
        heading: '6. Potential Risks and Limitations',
        paragraphs: [
          'Telehealth has potential risks and limitations, including but not limited to: information transmitted may be insufficient to allow appropriate clinical decision-making; delays in evaluation or treatment may occur due to technology failures; and, in rare cases, security protocols could fail, causing a breach of privacy of personal health information.',
          'A provider may determine that telehealth is not appropriate for your situation and may recommend in-person evaluation or care.',
        ],
      },
      {
        heading: '7. Your Responsibilities',
        paragraphs: [
          'You are responsible for providing complete, accurate, and current information, including medical history, medications, allergies, symptoms, and any changes in your health.',
          'You agree to follow provider instructions, ask questions if anything is unclear, and notify your provider promptly of any new or worsening symptoms or side effects.',
        ],
      },
      {
        heading: '8. Emergency Care',
        paragraphs: [
          'If you are experiencing a medical emergency, call 911 or seek emergency medical care immediately. Efexia® should not be used for emergencies.',
        ],
      },
      {
        heading: '9. Medical Records and Privacy',
        paragraphs: [
          'Your information may become part of your medical record and may be shared with providers, pharmacies, fulfillment partners, payment processors, or service providers as described in the Privacy Policy and applicable notices.',
          'Efexia® uses reasonable administrative, technical, and physical safeguards designed to protect your information.',
        ],
      },
      {
        heading: '10. Prescriptions and Pharmacy Fulfillment',
        paragraphs: [
          'If a provider determines that prescription treatment is clinically appropriate, a prescription may be sent to a licensed dispensing pharmacy, where permitted by law.',
          'Final treatment, dose, formulation, and pricing may vary based on provider review, pharmacy availability, and applicable law.',
        ],
      },
      {
        heading: '11. Right to Decline or Withdraw Consent',
        paragraphs: [
          'You may decline or withdraw consent to telehealth at any time by discontinuing use of the Services or contacting support. Withdrawing consent may limit your ability to receive services through Efexia®.',
        ],
      },
      {
        heading: '12. State Availability',
        paragraphs: [
          'Services may not be available in all states. Available treatments, provider networks, and pharmacy partners may vary based on your location and applicable law.',
        ],
      },
      {
        heading: '13. Contact Us',
        paragraphs: [
          'Questions about this Telehealth Consent can be sent to support@efexiamd.com.',
        ],
      },
    ],
  },
};
