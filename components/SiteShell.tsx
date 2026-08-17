'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import { useLocale } from '@/context/LocaleContext';
import { scrollToSection, updateSectionHash } from '@/lib/scrollToSection';

export default function SiteShell({ children }: { children: ReactNode }) {
  const { locale, toggleLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollRequestId, setScrollRequestId] = useState(0);
  const navigationRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goToSection = useCallback((sectionId: string) => {
    pendingSectionRef.current = sectionId;
    updateSectionHash(sectionId);
    closeMenu();
    setScrollRequestId((value) => value + 1);

    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    }
  }, [closeMenu, pathname, router]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (menuOpen) return undefined;

    const sectionId = pendingSectionRef.current;
    if (!sectionId) return undefined;

    const timer = window.setTimeout(() => {
      if (scrollToSection(sectionId, { behavior: 'auto' })) {
        pendingSectionRef.current = null;
      }
    }, 64);

    return () => window.clearTimeout(timer);
  }, [menuOpen, pathname, scrollRequestId]);

  useEffect(() => {
    if (pendingSectionRef.current) return undefined;

    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.slice(1);
      const timer = window.setTimeout(() => {
        scrollToSection(sectionId, { behavior: 'auto' });
      }, 100);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (pendingSectionRef.current) return;
      const hash = window.location.hash;
      if (!hash) return;
      scrollToSection(hash.slice(1), { behavior: 'auto' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const navigation = navigationRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(navigation?.querySelectorAll<HTMLElement>(focusableSelector) || []);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    window.requestAnimationFrame(() => firstFocusable?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <div
        className={`mobile-nav-backdrop ${menuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <div className="promo-banner">
        <button className="promo-link" type="button" onClick={() => router.push('/start?payment=2')}>
          <span>
            {locale === 'en'
              ? 'Start your $2 clinical intake — a licensed provider reviews before any prescription.'
              : 'Inicie su evaluación clínica de $2 — un proveedor revisa antes de cualquier receta.'}
          </span>
          <span>{locale === 'en' ? 'Begin' : 'Comenzar'}</span>
        </button>
      </div>

      <div className="trust-bar">
        <div className="container">
          <div className="trust-track">
            <div className="trust-item">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--navy-light)'}}>
                <path d="M4.166 8.269C4.166 12.312 7.703 15.656 9.269 16.938c.224.183.337.276.504.323.13.037.322.037.452 0 .168-.047.28-.139.505-.322C12.296 15.656 15.833 12.313 15.833 8.27a5.834 5.834 0 10-11.667 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.333 7.5a1.667 1.667 0 103.334 0 1.667 1.667 0 00-3.334 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{locale === 'en' ? 'Trusted Pharmacy Partners' : 'Farmacias Asociadas de Confianza'}</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--champagne-gold)'}}>
                <path d="M7.5 12.5H3.125a.625.625 0 01-.625-.625v-3.75c0-.345.28-.625.625-.625H7.5V3.125c0-.345.28-.625.625-.625h3.75c.345 0 .625.28.625.625V7.5h4.375c.345 0 .625.28.625.625v3.75a.625.625 0 01-.625.625H12.5v4.375a.625.625 0 01-.625.625h-3.75a.625.625 0 01-.625-.625V12.5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{locale === 'en' ? 'Qualified Healthcare Providers' : 'Profesionales de Salud Calificados'}</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--color-purple)'}}>
                <path d="M17.5 10l-15-6.25v5l7.5 1.25-7.5 1.25v5L17.5 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{locale === 'en' ? 'Private, Discreet Delivery' : 'Entrega Privada y Discreta'}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-container">
          <Link href="/" className="logo-wrapper-PMC" style={{textDecoration: 'none'}} onClick={closeMenu}>
            <img
              src="/efexia-logo-transparent.png"
              srcSet="/efexia-logo-384.webp 384w, /efexia-logo-768.webp 768w"
              sizes="(max-width: 768px) 154px, 117px"
              alt="Efexia"
              className="brand-logo"
              width="1536"
              height="1024"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <ul
            className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}
            id="primary-navigation"
            ref={navigationRef}
            aria-label={locale === 'en' ? 'Primary navigation' : 'Navegación principal'}
          >
            <li className="nav-mobile-heading">
              <span>{locale === 'en' ? 'Explore Efexia' : 'Explora Efexia'}</span>
              <small>{locale === 'en' ? 'Personalized care, wherever you are.' : 'Atención personalizada, estés donde estés.'}</small>
            </li>
            <li>
              <a
                href="/#treatments"
                onClick={(event) => {
                  if (pathname === '/') {
                    event.preventDefault();
                    goToSection('treatments');
                  } else {
                    closeMenu();
                  }
                }}
              >
                {t('treatments')}
              </a>
            </li>
            <li>
              <a
                href="/#how-it-works"
                onClick={(event) => {
                  if (pathname === '/') {
                    event.preventDefault();
                    goToSection('how-it-works');
                  } else {
                    closeMenu();
                  }
                }}
              >
                {t('howItWorks')}
              </a>
            </li>
            <li>
              <Link href="/treatment/tirzepatide" onClick={closeMenu}>
                {locale === 'en' ? 'Tirzepatide' : 'Tirzepatida'}
              </Link>
            </li>
            <li className="nav-mobile-only">
              <a
                href="/#faqs"
                onClick={(event) => {
                  if (pathname === '/') {
                    event.preventDefault();
                    goToSection('faqs');
                  } else {
                    closeMenu();
                  }
                }}
              >
                {t('faq')}
              </a>
            </li>
            <li className="nav-mobile-actions">
              <Link href="/start?payment=2" onClick={closeMenu}>{locale === 'en' ? 'Get Started' : 'Comenzar'}</Link>
              <a
                href="/#contact"
                onClick={(event) => {
                  if (pathname === '/') {
                    event.preventDefault();
                    goToSection('contact');
                  } else {
                    closeMenu();
                  }
                }}
              >
                {locale === 'en' ? 'Contact' : 'Contacto'}
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              className="nav-lang-btn"
              onClick={toggleLocale}
              type="button"
              aria-label={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
              data-locale={locale}
            >
              {locale.toUpperCase()}
            </button>
            <a
              href="/#contact"
              className="nav-login-pill"
              onClick={(event) => {
                if (pathname === '/') {
                  event.preventDefault();
                  goToSection('contact');
                } else {
                  closeMenu();
                }
              }}
            >
              {locale === 'en' ? 'Contact' : 'Contacto'}
            </a>
            <Link href="/start?payment=2" className="nav-cta-pill" onClick={closeMenu} style={{ textDecoration: 'none' }}>
              {locale === 'en' ? 'Get Started' : 'Comenzar'}
            </Link>
            <button
              className={`burger-menu-btn ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              type="button"
              ref={menuButtonRef}
            >
              <span className="burger-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="page-enter" key={pathname}>
        {children}
      </main>

      <footer className="footer-PMC">
        <div className="container">
          <ScrollReveal variant="fade-up" className="footer-grid-PMC">
            <div className="footer-brand-PMC">
              <div className="footer-logo-surface">
                <img
                  src="/efexia-logo-transparent.png"
                  srcSet="/efexia-logo-384.webp 384w, /efexia-logo-768.webp 768w"
                  sizes="(max-width: 768px) 280px, 242px"
                  alt="Efexia"
                  className="brand-logo brand-logo-footer"
                  width="1536"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="footer-about-PMC">{t('footerAbout')}</p>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('treatments')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/treatment/tirzepatide">Tirzepatide</Link></li>
                <li><Link href="/treatment/semaglutide">Semaglutide</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('resources')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/#how-it-works">{t('howItWorks')}</Link></li>
                <li><Link href="/#faqs">{t('faq')}</Link></li>
                <li><Link href="/#contact">{locale === 'en' ? 'Contact Us' : 'Contáctenos'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('company')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/#about-us">{t('aboutUs')}</Link></li>
                <li><Link href="/privacy">{locale === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}</Link></li>
                <li><Link href="/terms">{locale === 'en' ? 'Terms of Service' : 'Términos de Servicio'}</Link></li>
                <li><Link href="/medical-consent">{locale === 'en' ? 'Medical Consent' : 'Consentimiento Médico'}</Link></li>
                <li><Link href="/telehealth-consent">{locale === 'en' ? 'Telehealth Consent' : 'Consentimiento de Telesalud'}</Link></li>
                <li><Link href="/mensrx">MensRX</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('contactUs')}</h4>
              <ul className="footer-links-PMC" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li className="footer-contact-item-PMC">
                  <span>✉️</span> support@efexiamd.com
                </li>
                <li className="footer-contact-item-PMC" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {locale === 'en'
                    ? 'Questions are handled through clinical intake and care-team follow-up. Completing the $2 intake does not guarantee a prescription.'
                    : 'Las consultas se manejan mediante la evaluación clínica y el seguimiento del equipo de cuidado. Completar la evaluación de $2 no garantiza una receta.'}
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={2} className="footer-disclaimers-PMC">
            <p className="disclaimer-text-PMC">
              <strong>{locale === 'en' ? 'Medical Disclaimer:' : 'Descargo de Responsabilidad Médica:'}</strong> The content on this website is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Compounded prescription drug preparations are customized formulations prescribed by U.S.-licensed practitioners based on individual patient medical evaluations. Compounded medications are not FDA-approved, meaning the FDA does not verify their safety, effectiveness, or quality prior to marketing.
            </p>
            <p className="disclaimer-text-PMC">
              <strong>{locale === 'en' ? 'Telehealth Services:' : 'Servicios de Telemedicina:'}</strong> Telehealth consultations are provided by independent, U.S.-licensed physicians and nurse practitioners contracted with clinical groups. Prescription eligibility is subject to physician evaluation, clinical protocol guidelines, and lab test results when required. Services are cash-pay; insurance is not billed.
            </p>
          </ScrollReveal>

          <div className="footer-bottom-PMC">
            <p>&copy; {new Date().getFullYear()} {t('allRightsReserved')}</p>
            <p style={{ display: 'flex', gap: '16px' }}>
              <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('privacyPolicy')}</Link>
              <Link href="/terms" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('termsOfService')}</Link>
            </p>
          </div>
        </div>
      </footer>

    </>
  );
}
