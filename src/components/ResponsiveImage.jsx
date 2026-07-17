const imageMetadata = {
  '/images/avatar1.webp': [60, 60],
  '/images/avatar2.webp': [60, 60],
  '/images/avatar3.webp': [60, 60],
  '/images/clinical_lab.webp': [1200, 896],
  '/images/cta-transformation.webp': [1024, 1024],
  '/images/diagnostic_kit.webp': [1024, 1024],
  '/images/discreet_packaging.webp': [1024, 1024],
  '/images/feature_discreet_shipping_1783030073250.webp': [1024, 1024],
  '/images/feature_medical_team_1783030032632.webp': [1024, 1024],
  '/images/feature_ongoing_support_1783030084188.webp': [1024, 1024],
  '/images/feature_personalized_plan_1783030048726.webp': [1024, 1024],
  '/images/feature_science_backed_1783030014752.webp': [1024, 1024],
  '/images/feature_telehealth_1783030058457.webp': [1024, 1024],
  '/images/hair_dropper.webp': [1024, 1024],
  '/images/hero-bg.webp': [1376, 768],
  '/images/nad_vial.webp': [1024, 1024],
  '/images/semaglutide_vial.webp': [1024, 1024],
  '/images/telehealth_doctor.webp': [1200, 896],
  '/images/testosterone_vial.webp': [1024, 1024],
  '/images/vitality_hero.webp': [332, 398],
};

const candidateWidths = [320, 640, 960];

function imagePath(src, width, format) {
  const [intrinsicWidth] = imageMetadata[src];
  const stem = src.replace(/\.webp$/, '');
  return width === intrinsicWidth
    ? `${stem}.${format}`
    : `${stem}-${width}.${format}`;
}

function getSrcSet(src, format) {
  const metadata = imageMetadata[src];
  if (!metadata) return undefined;

  const [intrinsicWidth] = metadata;
  return [...new Set([
    ...candidateWidths.filter((width) => width < intrinsicWidth),
    intrinsicWidth,
  ])]
    .map((width) => `${imagePath(src, width, format)} ${width}w`)
    .join(', ');
}

export default function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const metadata = imageMetadata[src];

  if (!metadata) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...props}
      />
    );
  }

  const [width, height] = metadata;

  return (
    <picture className="responsive-picture">
      <source
        type="image/avif"
        srcSet={getSrcSet(src, 'avif')}
        sizes={sizes}
      />
      <img
        src={src}
        srcSet={getSrcSet(src, 'webp')}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...props}
      />
    </picture>
  );
}
