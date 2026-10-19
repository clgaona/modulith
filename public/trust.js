(() => {
  const section = document.querySelector('#por-que-modulith');
  if (!section) return;
  // Optional copy-only comparison; the default is the institutional criterion headline.
  if (new URLSearchParams(window.location.search).get('trustHeadline') === 'construction') {
    section.querySelector('#trust-title').textContent = 'Más de 20 años de experiencia en construcción.';
  }
  if (window.location.hash !== '#por-que-modulith') return;
  // Keep direct previews aligned after fonts and native scroll restoration.
  const align = () => document.fonts.ready.then(() => window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant' }));
  }));
  if (document.readyState === 'complete') align();
  else window.addEventListener('load', align, { once: true });
})();
