# Patriot System Index

## Snapshot

Patriot is a Vite + React single-page marketing and intake site for a men's telehealth clinic. It has no backend in this repo. The current app is client-rendered, mostly static content, with React state for language switching, the mobile menu, FAQ accordion behavior, a rotating hero text effect, and an intake quiz modal.

## Runtime

- Framework: React 19 via Vite.
- Entry HTML: `index.html`.
- React entry: `src/main.jsx`.
- Main app: `src/App.jsx`.
- Styles: `src/index.css`.
- Build command: `npm run build`.
- Lint command: `npm run lint`.
- Deploy config: `vercel.json` rewrites all paths to `index.html`.

## File Map

- `package.json`: scripts and dependencies.
- `vite.config.js`: default Vite React plugin config.
- `index.html`: root mount, favicon, title, description, and image preloads.
- `src/main.jsx`: mounts `<App />` into `#root`.
- `src/App.jsx`: full page layout, page data arrays, hero animation, language toggle, FAQ state, and quiz modal open state.
- `src/translations.js`: English and Spanish translation dictionary for shared site copy.
- `src/components/IntakeQuiz.jsx`: four-step intake assessment modal and recommendation logic.
- `src/index.css`: active global styles, layout, hero, cards, responsive rules, footer, and most visual design tokens.
- `src/App.css`: leftover Vite starter CSS; not imported by the current app.
- `public/images/*`: visual assets used by hero, treatments, gallery, doctors, CTA, and reviews.
- `public/social-proof-*.svg`: hero trust/social proof badges.
- `dist/`: generated Vite production build output.

## App Flow

1. `index.html` loads `/src/main.jsx`.
2. `src/main.jsx` renders `App` inside React `StrictMode`.
3. `App` initializes local UI state:
   - `locale`: English or Spanish content.
   - `quizOpen`: shows or hides `IntakeQuiz`.
   - `menuOpen`: controls the mobile nav.
   - `openFaq`: controls the FAQ accordion.
   - hero typing state: `wordIndex`, `currentText`, `isDeleting`, `typeSpeed`.
4. `App` builds arrays for treatments, steps, features, FAQs, and testimonials.
5. The page renders a promo banner, trust bar, nav, hero, treatments, process, features, reviews, doctors, stats, gallery, FAQ, CTA, footer, and quiz modal.
6. CTA buttons call `setQuizOpen(true)`.
7. `IntakeQuiz` collects goal, symptoms, and age, then displays a recommendation card.

## Page Sections

- Promo banner: limited-time offer CTA.
- Trust bar: pharmacy/provider/shipping claims.
- Navbar: logo, section anchors, language toggle, intake CTA, mobile menu.
- Hero: animated treatment keyword, primary CTA, treatment anchor, social proof badges, hero image.
- Treatments: TRT, ED, weight loss, hair, wellness, peptide cards.
- How It Works: four-step process.
- Why Choose Patriot: six feature/value cards.
- Reviews: three patient testimonial cards.
- Doctors: two physician profile cards.
- Stats: patients, satisfaction, providers, delivery timing.
- Gallery: clinical/product image grid.
- FAQ: accordion with five questions.
- Pre-footer CTA: final conversion block.
- Footer: brand, links, contact, medical/telehealth disclaimers.

## Intake Quiz

The quiz is local-only and does not submit data anywhere.

- Step 1: choose primary goal.
- Step 2: choose symptoms.
- Step 3: choose age range.
- Step 4: show recommendation.
- Recommendation is based only on `goal`.
- The final "Start Secure Intake" button currently shows an alert and closes the modal.

## Content Sources

Primary content lives in two places:

- `src/translations.js`: most site-wide English and Spanish copy.
- `src/App.jsx`: FAQ copy, testimonials, badges, section-specific inline copy, stats, doctors, footer links, and disclaimers.
- `src/components/IntakeQuiz.jsx`: quiz labels, recommendation copy, prices, and modal text.

For a top-notch content system, these should eventually be consolidated so all user-facing copy is easier to audit.

## Current Verification

- `npm run build`: passes.
- `npm run lint`: blocked because the native `@oxlint/binding-win32-x64-msvc` optional dependency is missing from `node_modules`.

## Highest-Value Improvement Areas

1. Restore lint by refreshing dependencies so `oxlint` can load its native Windows binding.
2. Add missing CSS for classes already used in JSX, especially:
   - `modal-overlay`
   - `quiz-modal`
   - `quiz-close-btn`
   - `quiz-progress-bar`
   - `quiz-progress-fill`
   - `quiz-options`
   - `quiz-option-card`
   - `quiz-option-number`
   - `recommendations-box`
   - `rec-card`
   - `treatment-features`
   - `sr-only`
   - `retro-section`
   - `retro-container`
   - `retro-section-head`
   - `retro-h2`
   - `retro-sub`
   - `retro-dark-section`
   - `retro-cream-section`
   - `retro-faq-section`
   - `retro-stats-bar`
   - `footer-disclaimers-PMC`
   - `disclaimer-text-PMC`
3. Split `src/App.jsx` into sections/components so the page is easier to improve safely.
4. Move inline SVG icons and repeated content arrays into small reusable components or data modules.
5. Consolidate translations and inline copy into a single content structure.
6. Replace placeholder footer links/contact info with real destinations.
7. Make the intake quiz submit or route to the real secure intake platform.
8. Add accessibility checks: focus trapping for modal, Escape-to-close, labels, keyboard selection, and visually hidden heading support.
9. Optimize images and confirm mobile/desktop visual framing in browser screenshots.
10. Add trustworthy medical/legal compliance review for claims, pricing, doctors, pharmacy language, and compounded medication disclaimers.

## Notes For Next Work

- The git worktree already has user edits in app files and image assets. Preserve them unless asked otherwise.
- `dist/` exists and may be generated output.
- The current README is still the default Vite template and should be replaced with project-specific setup notes.
