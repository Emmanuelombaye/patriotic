import { useEffect, useRef } from 'react';

const observers = new Map();

function getObserver(options) {
  const key = JSON.stringify(options);
  if (!observers.has(key)) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, options);
    observers.set(key, observer);
  }
  return observers.get(key);
}

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

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || eager) {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = getObserver({ threshold, rootMargin });
    observer.observe(node);

    return () => {
      if (!once) return;
      observer.unobserve(node);
    };
  }, [once, threshold, rootMargin, eager]);

  const delayClass = delay > 0 ? ` reveal-delay-${Math.min(delay, 8)}` : '';
  const classes = `reveal reveal-${variant}${delayClass}${className ? ` ${className}` : ''}`;

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
}
