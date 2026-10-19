(() => {
  const section = document.querySelector('#proceso');
  if (!section) return;
  const steps = [...section.querySelectorAll('[data-process-step]')];
  const layers = [...section.querySelectorAll('[data-process-image]')];
  const progress = section.querySelector('.process-progress span');
  const enhanced = window.matchMedia('(min-width: 1101px) and (prefers-reduced-motion: no-preference)');
  let active = -1;
  let frame = 0;
  let near = false;
  let imageRequest = 0;
  function showImage(image) {
    const target = layers.find(layer => layer.dataset.processImage === image);
    if (!target) return;
    const request = ++imageRequest;
    target.loading = 'eager';
    // Keep the previous frame until the next asset can crossfade without a blank frame.
    const ready = target.complete && target.naturalWidth ? Promise.resolve() : target.decode();
    ready.then(() => {
      if (request !== imageRequest || !enhanced.matches) return;
      layers.forEach(layer => layer.classList.toggle('is-current', layer === target));
    }).catch(() => {});
  }
  function update() {
    frame = 0;
    if (!enhanced.matches || !near) return;
    const readingLine = window.innerHeight * .48;
    let current = 0;
    steps.forEach((step, index) => {
      if (step.getBoundingClientRect().top <= readingLine) current = index;
    });
    if (current === active) return;
    active = current;
    const image = steps[current].dataset.processStep;
    showImage(image);
    progress.style.transform = `scaleX(${(current + 1) / steps.length})`;
    section.dataset.processActive = String(current + 1);
  }
  function schedule() {
    if (enhanced.matches && near && !frame) frame = window.requestAnimationFrame(update);
  }
  function mode() {
    section.classList.toggle('process-enhanced', enhanced.matches && 'IntersectionObserver' in window);
    active = -1;
    schedule();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      near = entries[0].isIntersecting;
      schedule();
    }, { rootMargin: '200px' }).observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    enhanced.addEventListener('change', mode);
    mode();
  }
  if (window.location.hash === '#proceso') {
    // Align after fonts, hero measurements and native scroll restoration settle.
    const align = () => document.fonts.ready.then(() => window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant' }));
    }));
    if (document.readyState === 'complete') align();
    else window.addEventListener('load', align, { once: true });
  }
})();
