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
import IntakeQuiz from '@/components/IntakeQuiz';
import ScrollReveal from '@/components/ScrollReveal';
import { useLocale } from '@/context/LocaleContext';
import { scrollToSection, updateSectionHash } from '@/lib/scrollToSection';

export default function SiteShell({ children }: { children: ReactNode }) {
  const { locale, toggleLocale, t } = useLocale();
  const [quizOpen, setQuizOpen] = useState(false);
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
    document.body.classList.toggle('quiz-open', quizOpen);
    return () => {
      document.body.classList.remove('nav-open');
      document.body.classList.remove('quiz-open');
    };
  }, [menuOpen, quizOpen]);

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
        <button className="promo-link" onClick={() => setQuizOpen(true)}>
          <span>{locale === 'en' ? 'Save up to $400 on your first prescription order!' : 'Ahorra hasta $400 en tu primer pedido de receta!'}</span>
          <span>{t('claimOffer')}</span>
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
              <Link href="/treatment/peptide" onClick={closeMenu}>
                {locale === 'en' ? 'Regenerative Therapy' : 'Terapia Regenerativa'}
              </Link>
            </li>
            <li className="nav-mobile-only">
              <a
                href="/#reviews"
                onClick={(event) => {
                  if (pathname === '/') {
                    event.preventDefault();
                    goToSection('reviews');
                  } else {
                    closeMenu();
                  }
                }}
              >
                {locale === 'en' ? 'Reviews' : 'Reseñas'}
              </a>
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
              <Link href="/start" onClick={closeMenu}>{locale === 'en' ? 'Get Started' : 'Comenzar'}</Link>
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
            <Link href="/start" className="nav-cta-pill" onClick={closeMenu} style={{ textDecoration: 'none' }}>
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
              <div className="footer-socials-PMC">
                <a href="#" className="social-icon-PMC" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon-PMC" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon-PMC" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon-PMC" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('treatments')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/treatment/trt">TRT Therapy</Link></li>
                <li><Link href="/treatment/ed">ED Treatment</Link></li>
                <li><Link href="/treatment/weight">Weight Loss</Link></li>
                <li><Link href="/treatment/hair">Hair Restoration</Link></li>
                <li><Link href="/treatment/peptide">Regenerative Therapy</Link></li>
                <li><Link href="/treatment/wellness">Wellness Optimization</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('resources')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/#how-it-works">{t('howItWorks')}</Link></li>
                <li><Link href="/#faqs">{t('faq')}</Link></li>
                <li><Link href="/">{t('blog')}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Patient Reviews' : 'Reseñas de Pacientes'}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Contact Us' : 'Contáctenos'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('company')}</h4>
              <ul className="footer-links-PMC">
                <li><Link href="/">{t('aboutUs')}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Our Providers' : 'Nuestros Proveedores'}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Careers' : 'Carreras'}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}</Link></li>
                <li><Link href="/">{locale === 'en' ? 'Terms of Service' : 'Términos de Servicio'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title-PMC">{t('contactUs')}</h4>
              <ul className="footer-links-PMC" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li className="footer-contact-item-PMC">
                  <span>📞</span> (833) 123-4567
                </li>
                <li className="footer-contact-item-PMC">
                  <span>✉️</span> info@efexiawellness.com
                </li>
                <li className="footer-contact-item-PMC">
                  <span>📍</span> 123 Freedom Way, Suite 100, Nashville, TN 37203
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
            <p>&copy; 2024 {t('allRightsReserved')}</p>
            <p style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('privacyPolicy')}</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{t('termsOfService')}</a>
            </p>
          </div>
        </div>
      </footer>

      <IntakeQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} />
    </>
  );
}
