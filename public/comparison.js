(() => {
  const section = document.querySelector('#comparacion');
  if (!section) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (window.location.hash === '#comparacion') {
    document.fonts.ready.then(() => section.scrollIntoView({ behavior: 'instant' }));
  }
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  section.querySelectorAll('[data-comparison-reveal]').forEach(element => observer.observe(element));
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    section.querySelectorAll('.is-revealed').forEach(element => element.classList.remove('is-revealed'));
  });
})();
