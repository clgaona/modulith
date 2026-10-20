(() => {
  const query = new URLSearchParams(window.location.search);
  const direction = query.get('direction') === 'estados' ? 'estados' : 'plano';
  const copy = ['A', 'B', 'C', 'D'].includes(query.get('copy')) ? query.get('copy') : 'D';
  const headlines = {
    A: 'Una mejor manera de diseñar y construir tu casa.',
    B: 'Construir tu casa no debería convertirse en otro trabajo.',
    C: 'Tu casa empieza con decisiones claras.',
    D: 'De una idea a una casa de verdad.'
  };
  document.documentElement.dataset.direction = direction;
  document.documentElement.dataset.copy = copy;
  const title = document.querySelector('h1');
  if (copy === 'B') {
    title.replaceChildren(...['Construir tu casa', 'no debería convertirse', 'en otro trabajo.'].map((text, index) => {
      const line = document.createElement('span');
      line.textContent = text + (index < 2 ? ' ' : '');
      return line;
    }));
  } else title.textContent = headlines[copy];
  if (copy === 'D') {
    const description = document.querySelector('.hero-description');
    description.textContent = 'Del primer boceto a la entrega de tu casa, coordinamos el diseño, la ingeniería y la construcción.';
    // Preserve the desktop footprint; mobile copy flows naturally above the house.
    const preserveActionPosition = () => {
      if (window.matchMedia('(max-width: 700px)').matches) {
        title.style.minHeight = '';
        return;
      }
      const reference = document.querySelector('.hero-copy').cloneNode(true);
      reference.setAttribute('aria-hidden', 'true');
      reference.inert = true;
      reference.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      Object.assign(reference.style, { position: 'absolute', top: '0', left: '0', right: '0', visibility: 'hidden', pointerEvents: 'none' });
      const referenceTitle = reference.querySelector('h1');
      referenceTitle.style.minHeight = '';
      referenceTitle.replaceChildren(...['Construir tu casa', 'no debería convertirse', 'en otro trabajo.'].map(text => {
        const line = document.createElement('span');
        line.textContent = text;
        return line;
      }));
      const referenceDescription = reference.querySelector('.hero-description');
      referenceDescription.textContent = 'Diseño y construcción de tu casa, con un interlocutor y decisiones claras.';
      document.querySelector('.hero').append(reference);
      title.style.minHeight = `${Math.max(0, referenceTitle.getBoundingClientRect().height + referenceDescription.getBoundingClientRect().height - description.getBoundingClientRect().height)}px`;
      reference.remove();
    };
    preserveActionPosition();
    document.fonts.ready.then(preserveActionPosition);
    window.addEventListener('resize', preserveActionPosition);
  } else document.querySelector('.hero-description').textContent = 'Diseño y construcción de tu casa, con un interlocutor y decisiones claras.';
  const heroImage = document.querySelector('#hero-image');
  heroImage.src = 'assets/hero-daylight-v2.webp';
  heroImage.alt = 'Escena conceptual de una vivienda y un laptop apoyado sobre piedra con el sketch de la misma casa.';

  const headerAction = document.querySelector('.header-action');
  const headerActionConfig = window.MODULITH_PREVIEW?.headerAction;
  if (headerAction && headerActionConfig) {
    headerAction.href = headerActionConfig.href;
    headerAction.setAttribute('aria-label', headerActionConfig.label);
    headerAction.querySelector('.header-action-full').textContent = headerActionConfig.label;
    headerAction.querySelector('.header-action-short').textContent = headerActionConfig.mobileLabel;
  }
  const dialog = document.querySelector('#destination-dialog');
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    if (link.getAttribute('href') === '/privacidad/') return;
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.querySelector('#destination-path').textContent = link.getAttribute('href');
      dialog.showModal();
    });
  });
  document.querySelector('.brand').addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    dialog.close();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
