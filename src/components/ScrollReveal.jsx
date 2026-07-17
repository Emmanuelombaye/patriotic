import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  as: Tag = 'div',
  className = '',
  variant = 'fade-up',
  delay = 0,
  once = true,
  eager = false,
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || eager) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin, eager]);

  const delayClass = delay > 0 ? ` reveal-delay-${Math.min(delay, 8)}` : '';
  const classes = `reveal reveal-${variant}${delayClass}${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`;

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
}
