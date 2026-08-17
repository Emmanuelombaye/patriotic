'use client';

import Link from 'next/link';
import ResponsiveImage from '@/components/ResponsiveImage';
import ScrollReveal from '@/components/ScrollReveal';
import { translations } from '@/lib/translations';
import type { Locale } from '@/lib/types';
import { startCheckoutHref } from '@/lib/treatments';

type AboutContentProps = {
  locale: Locale;
};

export default function AboutContent({ locale }: AboutContentProps) {
  const t = (key: string) => translations[locale][key] || key;
  const features = [
    {
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      image: '/images/feature_medical_team_1783030032632.webp',
    },
    {
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      image: '/images/feature_personalized_plan_1783030048726.webp',
    },
    {
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      image: '/images/feature_telehealth_1783030058457.webp',
    },
    {
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      image: '/images/feature_discreet_shipping_1783030073250.webp',
    },
    {
      title: t('feat5Title'),
      desc: t('feat5Desc'),
      image: '/images/feature_ongoing_support_1783030084188.webp',
    },
    {
      title: t('feat6Title'),
      desc: t('feat6Desc'),
      image: '/images/feature_science_backed_1783030014752.webp',
    },
  ];

  const stories =
    locale === 'en'
      ? [
          {
            kicker: 'Licensed review',
            title: 'A U.S.-licensed clinician reviews every intake.',
            body: 'Care is not automated. After you complete the 4-step qualifier, an affiliated licensed provider reviews your information and decides whether treatment is clinically appropriate.',
            image: '/images/telehealth_doctor.webp',
            alt: 'Licensed clinician reviewing a telehealth consultation',
            flip: false,
          },
          {
            kicker: 'Two treatments',
            title: 'Semaglutide $239/mo. Tirzepatide $345/mo.',
            body: 'Those prices apply only if a licensed provider prescribes. The public catalog is limited to these two options. Compounded medication is used only when clinically appropriate and is not FDA-approved.',
            image: '/images/efexia-goal-longevity.webp',
            alt: 'Calm setting associated with metabolic wellness',
            flip: true,
          },
          {
            kicker: 'Private fulfillment',
            title: 'Discreet shipping when a prescription is issued.',
            body: 'If prescribed, medication is dispensed by a licensed U.S. pharmacy partner and shipped in discreet packaging. Availability depends on your location, clinical review, and pharmacy authorization.',
            image: '/images/discreet_packaging.webp',
            alt: 'Discreet pharmacy packaging',
            flip: false,
          },
        ]
      : [
          {
            kicker: 'Revisión con licencia',
            title: 'Un clínico con licencia en EE. UU. revisa cada evaluación.',
            body: 'El cuidado no es automático. Después del calificador de 4 pasos, un proveedor afiliado con licencia revisa su información y decide si el tratamiento es clínicamente apropiado.',
            image: '/images/telehealth_doctor.webp',
            alt: 'Clínico con licencia revisando una consulta de telesalud',
            flip: false,
          },
          {
            kicker: 'Dos tratamientos',
            title: 'Semaglutida $239/mes. Tirzepatida $345/mes.',
            body: 'Esos precios aplican solo si un proveedor con licencia receta. El catálogo público se limita a estas dos opciones. El medicamento compuesto se usa solo cuando es clínicamente apropiado y no está aprobado por la FDA.',
            image: '/images/efexia-goal-longevity.webp',
            alt: 'Entorno calmado de bienestar metabólico',
            flip: true,
          },
          {
            kicker: 'Surtido privado',
            title: 'Envío discreto cuando se emite una receta.',
            body: 'Si se receta, el medicamento lo surte una farmacia asociada con licencia en EE. UU. y se envía en empaque discreto. La disponibilidad depende de su ubicación, la revisión clínica y la autorización de la farmacia.',
            image: '/images/discreet_packaging.webp',
            alt: 'Empaque discreto de farmacia',
            flip: false,
          },
        ];

  return (
    <section className="about-yucca about-yucca--page">
      <div className="retro-container">
        <ScrollReveal variant="fade-up" eager className="about-yucca__head">
          <span className="retro-tag">{locale === 'en' ? 'About Efexia' : 'Sobre Efexia'}</span>
          <h1 className="retro-h2">
            {locale === 'en'
              ? 'Wellness, wellbeing, and the state of good condition.'
              : 'Bienestar, salud y el estado de buena condición.'}
          </h1>
          <p className="about-yucca__lede">
            {locale === 'en'
              ? 'Efexia is the Greek word for wellness, wellbeing, or the state of good condition. The platform connects eligible patients with independent U.S.-licensed clinicians. Completing intake does not guarantee a prescription. If treatment is appropriate, Semaglutide is $239/mo and Tirzepatide is $345/mo, fulfilled through a licensed pharmacy partner.'
              : 'Efexia es la palabra griega para bienestar, salud o el estado de buena condición. La plataforma conecta a pacientes elegibles con clínicos independientes con licencia en EE. UU. Completar la evaluación no garantiza una receta. Si el tratamiento es apropiado, Semaglutida cuesta $239/mes y Tirzepatida $345/mes, surtidas por una farmacia asociada con licencia.'}
          </p>
        </ScrollReveal>

        <div className="about-story-stack">
          {stories.map((story, idx) => (
            <ScrollReveal
              key={story.title}
              variant={idx % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={(idx % 3) + 1}
              className={`about-story${story.flip ? ' about-story--flip' : ''}`}
            >
              <div className="about-story__media">
                <ResponsiveImage
                  src={story.image}
                  alt={story.alt}
                  className="about-story__img"
                  sizes="(max-width: 900px) 92vw, 48vw"
                />
              </div>
              <div className="about-story__copy">
                <p className="about-story__kicker">{story.kicker}</p>
                <h2>{story.title}</h2>
                <p>{story.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="about-mosaic" aria-label={locale === 'en' ? 'How Efexia care works' : 'Cómo funciona el cuidado de Efexia'}>
          {features.map((feat, idx) => (
            <ScrollReveal
              key={feat.title}
              variant="fade-up"
              delay={(idx % 4) + 1}
              className="about-mosaic__card"
            >
              <div className="about-mosaic__media">
                <ResponsiveImage
                  src={feat.image}
                  alt=""
                  className="about-mosaic__img"
                  sizes="(max-width: 767px) 78vw, 280px"
                />
              </div>
              <div className="about-mosaic__copy">
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="about-yucca__cta">
          <Link href={startCheckoutHref()} className="tx-product__cta tx-product__cta--primary">
            {locale === 'en' ? 'Start from $239' : 'Comenzar desde $239'}
          </Link>
          <Link href="/#treatments" className="tx-product__cta tx-product__cta--ghost">
            {locale === 'en' ? 'See treatments' : 'Ver tratamientos'}
          </Link>
        </div>
      </div>
    </section>
  );
}
