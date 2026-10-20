(() => {
  const section = document.querySelector('#empieza');
  const domain = window.ModulithQuizDomain;
  const config = window.MODULITH_QUIZ_CONFIG;
  if (!section || !domain || !config || !window.ModulithQuizTransport) return;
  const byId = id => document.getElementById(id);
  const transport = window.ModulithQuizTransport.create();
  const answers = domain.blank();
  const panes = [...section.querySelectorAll('[data-quiz-pane]')];
  const contactForm = byId('quiz-contact');
  const errorIds = { name: 'quiz-name-error', email: 'quiz-email-error', whatsapp: 'quiz-whatsapp-error', municipality: 'quiz-contact-city-error', department: 'quiz-contact-department-error', authorization: 'quiz-consent-error' };
  const inputIds = { name: 'quiz-name', email: 'quiz-email', whatsapp: 'quiz-whatsapp', municipality: 'quiz-contact-city', department: 'quiz-contact-department', authorization: 'quiz-consent' };
  let index = 0;
  let route = null;
  let busy = false;
  let attemptId = null;
  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  function show(view, focusId) {
    section.dataset.quizView = view;
    panes.forEach(pane => { pane.hidden = pane.dataset.quizPane !== view; pane.classList.remove('is-entering'); });
    const pane = panes.find(item => item.dataset.quizPane === view);
    pane.classList.add('is-entering');
    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: 'instant' });
      if (focusId) byId(focusId).focus({ preventScroll: true });
    });
  }
  function locationField(id, labelText, value, onInput) {
    const field = node('div', undefined, 'quiz-form-field');
    const label = node('label', labelText);
    label.htmlFor = id;
    const input = node('input');
    Object.assign(input, { id, type: 'text', value, maxLength: 80, required: !answers.locationUnknown, disabled: answers.locationUnknown });
    input.setAttribute('autocomplete', id.endsWith('city') ? 'address-level2' : 'address-level1');
    input.setAttribute('aria-describedby', 'quiz-question-error');
    input.addEventListener('input', () => onInput(input.value));
    field.append(label, input);
    return field;
  }
  function renderQuestion() {
    const question = domain.questions[index];
    byId('quiz-question').textContent = question.title;
    byId('quiz-step-count').textContent = `Pregunta ${index + 1} de ${domain.questions.length}`;
    byId('quiz-progress').value = index + 1;
    byId('quiz-progress').max = domain.questions.length;
    byId('quiz-question-error').hidden = true;
    const options = byId('quiz-options');
    options.replaceChildren();
    if (question.key === 'program') {
      question.groups.forEach(group => {
        const field = node('div', undefined, 'quiz-form-field quiz-program-field');
        const label = node('label', group.title);
        label.htmlFor = `quiz-${group.key}`;
        const select = node('select');
        Object.assign(select, { id: label.htmlFor, name: group.key, required: true });
        select.setAttribute('aria-describedby', 'quiz-question-error');
        const placeholder = node('option', 'Elige una opción');
        placeholder.value = '';
        placeholder.disabled = true;
        select.append(placeholder);
        group.options.forEach(([value, text]) => {
          const option = node('option', text);
          option.value = value;
          select.append(option);
        });
        select.value = answers[group.key];
        select.addEventListener('change', () => { answers[group.key] = select.value; byId('quiz-question-error').hidden = true; });
        field.append(label, select);
        options.append(field);
      });
    } else if (question.key === 'location') {
      const grid = node('div', undefined, 'quiz-location-grid');
      grid.append(locationField('quiz-city', 'Ciudad o municipio', answers.municipality, value => { answers.municipality = value; }), locationField('quiz-department', 'Departamento', answers.department, value => { answers.department = value; }));
      const unknown = node('label', undefined, 'quiz-location-unknown');
      const checkbox = node('input');
      Object.assign(checkbox, { type: 'checkbox', checked: answers.locationUnknown });
      checkbox.addEventListener('change', () => {
        answers.locationUnknown = checkbox.checked;
        if (checkbox.checked) { answers.municipality = ''; answers.department = ''; }
        grid.querySelectorAll('input').forEach(input => { input.disabled = checkbox.checked; input.required = !checkbox.checked; if (checkbox.checked) input.value = ''; });
      });
      unknown.append(checkbox, node('span', 'Aún no lo he definido'));
      options.append(grid, unknown);
    } else {
      if (question.multiple) {
        const hint = node('p', 'Puedes elegir hasta dos.', 'quiz-material-hint');
        hint.id = 'quiz-material-hint';
        hint.setAttribute('role', 'status');
        options.append(hint);
      }
      question.options.forEach(([value, text, reference]) => {
        const label = node('label', undefined, 'quiz-option');
        const input = node('input');
        Object.assign(input, { type: question.multiple ? 'checkbox' : 'radio', name: question.key, value, checked: question.multiple ? answers.materials.includes(value) : answers[question.key] === value, required: !question.multiple });
        input.setAttribute('aria-describedby', 'quiz-question-error');
        input.addEventListener('change', () => {
          if (question.multiple) {
            const selection = domain.selectMaterial(answers.materials, value, input.checked);
            answers.materials = selection.values;
            options.querySelectorAll('input').forEach(option => { option.checked = answers.materials.includes(option.value); });
            byId('quiz-material-hint').textContent = selection.error || (answers.materials.includes('unsure') ? 'El diseño definirá los materiales.' : `Puedes elegir hasta dos. ${answers.materials.length} de 2 seleccionados.`);
            byId('quiz-question-error').hidden = !selection.error;
            byId('quiz-question-error').textContent = selection.error;
          } else {
            answers[question.key] = value;
            byId('quiz-question-error').hidden = true;
          }
        });
        if (reference) {
          label.classList.add('quiz-option-visual');
          const copy = node('span', undefined, 'quiz-option-copy');
          const title = node('span', text, 'quiz-option-title');
          title.id = `quiz-${question.key}-${value}-title`;
          const description = node('span', reference.description, 'quiz-option-description');
          description.id = `quiz-${question.key}-${value}-description`;
          input.setAttribute('aria-labelledby', title.id);
          input.setAttribute('aria-describedby', `${description.id} ${question.multiple ? 'quiz-material-hint ' : ''}quiz-question-error`);
          const image = node('img', undefined, 'quiz-option-image');
          Object.assign(image, { src: `assets/${reference.image}.webp`, alt: '', width: 432, height: 288, decoding: 'async' });
          image.srcset = `assets/${reference.image}-small.webp 256w, assets/${reference.image}.webp 432w`;
          image.sizes = '(max-width: 700px) 116px, 216px';
          copy.append(title, description);
          label.append(input, copy, image);
        } else {
          label.append(input, node('span', text));
        }
        options.append(label);
      });
      if (question.options.some(option => option[2])) options.append(node('p', 'Referencias conceptuales generadas con IA, no obras de Modulith.', 'quiz-reference-note'));
    }
    const backLabel = index === 0 ? 'Volver al inicio' : 'Pregunta anterior';
    byId('quiz-back').setAttribute('aria-label', backLabel);
    byId('quiz-back').title = backLabel;
    byId('quiz-next').firstElementChild.textContent = index === domain.questions.length - 1 ? 'Ver mi síntesis' : 'Continuar';
    show('question', 'quiz-question');
  }
  function renderResult() {
    route = domain.result(answers);
    byId('quiz-result-title').textContent = route.proposal.title;
    byId('quiz-result-context').textContent = route.context;
    byId('quiz-concept-summary').textContent = route.proposal.summary;
    byId('quiz-result-profile').replaceChildren(...route.profile.map(([label, value]) => {
      const entry = node('div');
      entry.append(node('dt', label), node('dd', value));
      return entry;
    }));
    show('result', 'quiz-result-title');
  }
  byId('quiz-start').addEventListener('click', () => { index = 0; renderQuestion(); });
  byId('quiz-back').addEventListener('click', () => { if (index === 0) show('start', 'quiz-start'); else { index--; renderQuestion(); } });
  byId('quiz-questions').addEventListener('submit', event => {
    event.preventDefault();
    const error = domain.validateStep(index, answers);
    if (error) {
      byId('quiz-question-error').textContent = error;
      byId('quiz-question-error').hidden = false;
      byId('quiz-options').querySelector('select:invalid, input:not(:disabled)')?.focus();
      return;
    }
    if (index === domain.questions.length - 1) renderResult();
    else { index++; renderQuestion(); }
  });
  byId('quiz-edit').addEventListener('click', () => {
    index = 0;
    byId('quiz-consent').checked = false;
    attemptId = null;
    renderQuestion();
  });
  byId('quiz-receive').addEventListener('click', () => {
    for (const key of ['municipality', 'department']) {
      const input = byId(inputIds[key]);
      if (!input.value.trim() && !answers.locationUnknown) input.value = answers[key];
    }
    clearFieldErrors();
    byId('quiz-consent').checked = false;
    byId('quiz-submit-error').hidden = true;
    byId('quiz-submit-status').textContent = '';
    show('contact', 'quiz-contact-title');
  });
  byId('quiz-return').addEventListener('click', renderResult);
  byId('quiz-success-route').addEventListener('click', renderResult);
  function clearFieldErrors() {
    Object.entries(errorIds).forEach(([key, id]) => { byId(id).hidden = true; byId(inputIds[key]).removeAttribute('aria-invalid'); });
  }
  function displayFieldErrors(errors) {
    clearFieldErrors();
    let first;
    Object.entries(errors).forEach(([key, text]) => {
      if (!errorIds[key] || byId(inputIds[key]).disabled) return;
      byId(errorIds[key]).textContent = text;
      byId(errorIds[key]).hidden = false;
      byId(inputIds[key]).setAttribute('aria-invalid', 'true');
      first ||= byId(inputIds[key]);
    });
    first?.focus();
  }
  function setBusy(value) {
    busy = value;
    byId('quiz-contact-fields').disabled = value;
    byId('quiz-submit').disabled = value;
    byId('quiz-return').disabled = value;
    contactForm.setAttribute('aria-busy', String(value));
    byId('quiz-submit').firstElementChild.textContent = value ? 'Comprobando…' : 'Recibir mi propuesta';
  }
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(contactForm);
    const contact = { name: data.get('name') || '', email: data.get('email') || '', whatsapp: data.get('whatsapp') || '', municipality: data.get('municipality') || '', department: data.get('department') || '', authorization: byId('quiz-consent').checked, website: data.get('website') || '' };
    const errors = domain.validateContact(contact);
    byId('quiz-submit-error').hidden = true;
    if (Object.keys(errors).length) {
      displayFieldErrors(errors);
      byId('quiz-submit-error').textContent = 'Revisa los campos señalados para continuar.';
      byId('quiz-submit-error').hidden = false;
      return;
    }
    clearFieldErrors();
    attemptId ||= window.crypto.randomUUID();
    // This structured request is the integration boundary, not a network call.
    const request = domain.proposalRequest(answers, contact, config, attemptId);
    setBusy(true);
    let response;
    try { response = await transport.submit(request); }
    catch { response = { ok: false, code: 'unavailable' }; }
    setBusy(false);
    byId('quiz-submit-status').textContent = '';
    byId('quiz-submit-error').textContent = response.code === 'disabled'
      ? 'El formulario aún no recibe solicitudes. No se han enviado ni guardado tus datos.'
      : 'El envío no está disponible. Puedes volver a tu síntesis.';
    byId('quiz-submit-error').hidden = false;
  });
  byId('quiz-application').hidden = false;
  byId('quiz-fallback').hidden = true;
  if (['#empieza', '#tu-proyecto'].includes(window.location.hash)) {
    const align = () => document.fonts.ready.then(() => window.requestAnimationFrame(() => window.requestAnimationFrame(() => section.scrollIntoView({ behavior: 'instant' }))));
    if (document.readyState === 'complete') align();
    else window.addEventListener('load', align, { once: true });
  }
})();
