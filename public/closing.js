(() => {
  const footer = document.querySelector('.site-footer');
  const section = document.querySelector('#conversemos');
  const config = window.MODULITH_FOOTER || {};
  const contact = footer.querySelector('[data-footer-contact]');
  const appendLink = (parent, label, href, external = false) => {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', `${label} (abre un servicio externo)`); }
    parent.append(link);
    parent.hidden = false;
  };
  if (config.whatsapp?.confirmed === true && /^\d{8,15}$/.test(config.whatsapp.number)) {
    appendLink(contact, 'WhatsApp', `https://wa.me/${config.whatsapp.number}`, true);
  }
  if (config.email?.confirmed === true && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email.address)) {
    appendLink(contact, 'Email', `mailto:${config.email.address}`);
    contact.lastElementChild.setAttribute('aria-label', `Email: ${config.email.address}`);
  }
  if (window.location.hash === '#conversemos') {
    const align = () => document.fonts.ready.then(() => window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant' }));
    }));
    if (document.readyState === 'complete') align();
    else window.addEventListener('load', align, { once: true });
  }
})();
