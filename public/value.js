(() => {
  const section = document.querySelector('#propuesta');
  if (!section) return;
  const visual = section.querySelector('.value-visual');
  const pillars = [...section.querySelectorAll('[data-value-pillar]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 901px)');
  if (window.location.hash === '#propuesta') {
    document.fonts.ready.then(() => section.scrollIntoView({ behavior: 'instant' }));
  }
  // Follow the reading position; no pinned scroll or input interception.
  let scheduled = false;
  const updateVisual = () => {
    scheduled = false;
    if (!desktop.matches || motion.matches) {
      visual.dataset.valueState = 'budget';
      return;
    }
    const readingLine = window.innerHeight * .55;
    const current = pillars.find(pillar => pillar.getBoundingClientRect().bottom > readingLine) || pillars[pillars.length - 1];
    visual.dataset.valueState = current.dataset.valuePillar;
  };
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateVisual);
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  motion.addEventListener('change', updateVisual);
  updateVisual();
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: .15 });
  section.querySelectorAll('[data-value-reveal]').forEach(element => observer.observe(element));
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    section.querySelectorAll('.is-revealed').forEach(element => element.classList.remove('is-revealed'));
  });
})();
