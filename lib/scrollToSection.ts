const SECTION_IDS = new Set([
  'treatments',
  'how-it-works',
  'about-us',
  'faqs',
  'contact',
]);

let scrollToken = 0;

export function getStickyHeaderOffset(): number {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return 88;

  const { bottom } = navbar.getBoundingClientRect();
  const offset = Math.max(64, Math.ceil(bottom) + 8);
  document.documentElement.style.setProperty('--sticky-nav-offset', `${Math.ceil(bottom)}px`);
  return offset;
}

function lockSectionLayout(el: HTMLElement) {
  el.style.contentVisibility = 'visible';
  el.style.containIntrinsicBlockSize = 'auto';
}

export function scrollToSection(sectionId: string, { behavior: _behavior = 'auto' }: { behavior?: ScrollBehavior } = {}): boolean {
  if (!SECTION_IDS.has(sectionId)) return false;

  const el = document.getElementById(sectionId);
  if (!el) return false;

  const token = ++scrollToken;
  const offset = getStickyHeaderOffset();
  lockSectionLayout(el);
  el.style.scrollMarginTop = `${offset}px`;

  // Prefer precise math over smooth animation so mobile menu lands exactly.
  const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - offset));
  window.scrollTo({ top, behavior: 'auto' });

  // One post-layout correction after sticky header / fonts settle.
  window.requestAnimationFrame(() => {
    if (token !== scrollToken) return;

    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const latestOffset = getStickyHeaderOffset();
    const delta = el.getBoundingClientRect().top - nav.getBoundingClientRect().bottom - 8;
    if (Math.abs(delta) > 4) {
      window.scrollBy({ top: delta, behavior: 'auto' });
      el.style.scrollMarginTop = `${latestOffset}px`;
    }
  });

  return true;
}

export function updateSectionHash(sectionId: string): void {
  if (!SECTION_IDS.has(sectionId)) return;
  const nextHash = `#${sectionId}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
  }
}
