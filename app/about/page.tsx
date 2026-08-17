import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Efexia | Efexia Wellness',
  description:
    'Efexia connects eligible patients with independent U.S.-licensed clinicians. Completing intake does not guarantee a prescription.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
