(() => {
  const section = document.querySelector('#preguntas');
  if (!section) return;
  const coverage = window.MODULITH_FAQ_COVERAGE;
  if (coverage?.confirmed === true && typeof coverage.answer === 'string' && coverage.answer.trim()) {
    section.querySelector('#faq-coverage-answer').textContent = coverage.answer;
  }
  if (window.location.hash === '#preguntas') {
    const align = () => document.fonts.ready.then(() => window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant' }));
    }));
    if (document.readyState === 'complete') align();
    else window.addEventListener('load', align, { once: true });
  }
})();
