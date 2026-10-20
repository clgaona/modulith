(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ModulithQuizDomain = factory();
})(typeof window === 'undefined' ? this : window, () => {
  const questions = [
    { key: 'intent', title: '¿Qué te gustaría hacer?', options: [['design_build', 'Diseñar y construir mi casa'], ['have_design', 'Avanzar con un diseño que ya tengo'], ['find_land', 'Encontrar el lote para mi casa'], ['explore', 'Explorar posibilidades antes de decidir']] },
    { key: 'land', title: '¿Ya tienes el lote?', options: [['owned', 'Sí, ya es mío'], ['buying', 'Estoy por comprarlo'], ['searching', 'Lo estoy buscando'], ['none', 'Aún no he empezado a buscar']] },
    { key: 'location', title: '¿Dónde estaría el proyecto?' },
    { key: 'design', title: '¿Con qué cuentas para el diseño?', options: [['none', 'Voy a empezar de cero'], ['references', 'Ideas, bocetos o referencias'], ['preliminary', 'Un diseño inicial'], ['advanced', 'Un diseño arquitectónico avanzado']] },
    { key: 'timing', title: '¿Cuándo te gustaría empezar?', options: [['soon', 'Lo antes posible'], ['3_6', 'En 3 a 6 meses'], ['6_12', 'En 6 a 12 meses'], ['later', 'Más adelante']] },
    { key: 'program', title: '¿Cómo imaginas tu casa?', groups: [
      { key: 'floors', title: 'Pisos', options: [['one', '1 piso'], ['two', '2 pisos'], ['unsure', 'Todavía no lo sé']] },
      { key: 'bedrooms', title: 'Habitaciones', options: [['one_two', '1–2'], ['three', '3'], ['four', '4'], ['five_plus', '5 o más']] },
      { key: 'area', title: 'Área aproximada', options: [['under_100', 'Menos de 100 m²'], ['100_150', '100–150 m²'], ['150_220', '150–220 m²'], ['over_220', 'Más de 220 m²'], ['unsure', 'Todavía no lo sé']] }
    ] },
    { key: 'style', title: '¿Qué estilo te atrae más?', options: [
      ['contemporary', 'Contemporáneo', { description: 'Volúmenes definidos, materiales combinados y grandes aperturas.', image: 'quiz-style-contemporary-v4' }],
      ['minimal', 'Minimalista', { description: 'Formas simples, pocos elementos y calma.', image: 'quiz-style-minimal-v3' }],
      ['warm', 'Mediterráneo y cálido', { description: 'Muros claros, arcos y una atmósfera cálida.', image: 'quiz-style-warm-v3' }],
      ['industrial', 'Industrial y sobrio', { description: 'Concreto, metal y estructura a la vista.', image: 'quiz-style-industrial-v3' }],
      ['unsure', 'Aún no lo tengo claro', { description: 'Quiero comparar distintas formas de vivir.', image: 'quiz-style-unsure-v3' }]
    ] },
    { key: 'materials', title: '¿Qué materiales te gustaría que tuvieran más presencia?', multiple: true, options: [
      ['concrete', 'Concreto aparente y superficies minerales', { description: 'Superficies continuas y una textura sobria.', image: 'quiz-material-concrete-v3' }],
      ['wood', 'Madera y tonos cálidos', { description: 'Vetas naturales y espacios acogedores.', image: 'quiz-material-wood-v3' }],
      ['stone', 'Piedra y texturas naturales', { description: 'Relieves y tonos que conectan con el lugar.', image: 'quiz-material-stone-v3' }],
      ['metal_glass', 'Metal y vidrio', { description: 'Estructura ligera, perfiles visibles y transparencia.', image: 'quiz-material-metal-glass-v4' }],
      ['unsure', 'Prefiero que el diseño lo defina', { description: 'Dejo abierta la elección. Esta opción se elige sola.', image: 'quiz-material-unsure-v3' }]
    ] }
  ];
  const blank = () => ({ intent: '', land: '', municipality: '', department: '', locationUnknown: false, design: '', timing: '', floors: '', bedrooms: '', area: '', style: '', materials: [] });
  const field = key => questions.find(q => q.key === key) || questions.find(q => q.key === 'program').groups.find(group => group.key === key);
  const label = (key, value) => field(key)?.options?.find(option => option[0] === value)?.[1] || '';
  const validEnum = (key, value) => Boolean(label(key, value));
  function selectMaterial(current, value, selected) {
    if (!validEnum('materials', value)) return { values: [...current], error: 'Elige un material de la lista.' };
    if (!selected) return { values: current.filter(item => item !== value), error: '' };
    if (value === 'unsure') return { values: ['unsure'], error: '' };
    const values = current.filter(item => item !== 'unsure');
    if (values.includes(value)) return { values, error: '' };
    if (values.length >= 2) return { values: [...current], error: 'Puedes elegir hasta dos. Desmarca una opción para cambiarla.' };
    return { values: [...values, value], error: '' };
  }
  function validateStep(index, answers) {
    if (index === 2) {
      if (answers.locationUnknown) return '';
      return answers.municipality.trim().length >= 2 && answers.municipality.trim().length <= 80 && answers.department.trim().length >= 2 && answers.department.trim().length <= 80 ? '' : 'Escribe la ciudad o municipio y el departamento, o indica que aún no lo has definido.';
    }
    if (index === 5) return ['floors', 'bedrooms', 'area'].every(key => validEnum(key, answers[key])) ? '' : 'Elige pisos, habitaciones y área aproximada para continuar.';
    if (index === 7) return Array.isArray(answers.materials) && answers.materials.length >= 1 && answers.materials.length <= 2 && new Set(answers.materials).size === answers.materials.length && answers.materials.every(value => validEnum('materials', value)) && !(answers.materials.includes('unsure') && answers.materials.length > 1) ? '' : 'Elige uno o dos materiales, o deja que el diseño lo defina.';
    return validEnum(questions[index].key, answers[questions[index].key]) ? '' : 'Selecciona una opción para continuar.';
  }
  function result(answers) {
    if (questions.some((q, i) => validateStep(i, answers))) throw new Error('Incomplete quiz');
    let stage;
    let steps;
    if (answers.land === 'buying') {
      stage = 'Tu proyecto está en etapa de definición.';
      steps = ['Reúne la información del lote que estás comprando y las dudas que necesitas revisar.', 'Contrasta el terreno con los espacios y la forma de vida que quieres para tu casa.', 'Acordar una revisión del lote con un profesional te ayudará a definir cómo avanzar.'];
    } else if (answers.land !== 'owned') {
      stage = 'Tu proyecto está en etapa de definición.';
      steps = ['Escribe qué espacios necesitas y qué cosas no quieres dejar por fuera de tu casa.', 'Reúne información de los lotes que te interesan y revisa sus condiciones con apoyo profesional.', 'Ordena lo que destinarías al lote y a la casa antes de desarrollar un diseño.'];
    } else if (['preliminary', 'advanced'].includes(answers.design)) {
      stage = 'Tu proyecto está en etapa de preparación.';
      steps = ['Reúne las versiones del diseño, los estudios del lote y los documentos disponibles.', 'Revisa con los profesionales qué falta por coordinar entre arquitectura e ingeniería.', 'Define el alcance de obra, sus cantidades y un primer presupuesto y cronograma.'];
    } else {
      stage = 'Tu proyecto está en etapa de diseño.';
      steps = ['Convierte tus espacios, prioridades y referencias en un brief para la vivienda.', 'Reúne los documentos e información del lote que servirán para desarrollar el diseño.', 'Explora una dirección de diseño que responda a tu lote, tu forma de vivir y tu presupuesto.'];
    }
    if ((answers.intent === 'have_design' || ['preliminary', 'advanced'].includes(answers.design)) && answers.land !== 'owned') {
      steps[0] = 'Reúne tu diseño y tus prioridades para revisar después cómo encajan en el lote que elijas.';
      steps[2] = 'Revisa cómo se adaptaría el diseño al lote que elijas antes de avanzar hacia la obra.';
    }
    if (answers.intent === 'find_land' && answers.land === 'owned') steps[1] = 'Aclara cuál será el lote del proyecto y reúne la información disponible de ese terreno.';
    const timingNote = ['soon', '3_6'].includes(answers.timing) ? 'Como quieres empezar pronto, prepara esa información para una primera conversación. La fecha de obra se define con el alcance del proyecto.' : 'Puedes avanzar a tu ritmo reuniendo esa información antes de comprometerte con la siguiente etapa.';
    const styles = {
      contemporary: ['Así podría empezar tu casa contemporánea.', 'Una dirección contemporánea, con volúmenes definidos y espacios conectados.'],
      minimal: ['Así podría empezar tu casa de líneas simples.', 'Una dirección minimalista, con pocos elementos y espacios que dejan respirar.'],
      warm: ['Así podría empezar tu casa cálida y mediterránea.', 'Una dirección cálida, con espacios recogidos y una relación cercana con el exterior.'],
      industrial: ['Así podría empezar tu casa sobria e industrial.', 'Una dirección sobria, con materiales a la vista y una estructura que participa del diseño.'],
      unsure: ['Tu casa puede empezar por explorar.', 'Podemos empezar comparando referencias para descubrir qué espacios y ambientes van contigo.']
    };
    const materialLabels = answers.materials.map(value => label('materials', value)).join(' + ');
    const houseLabels = [label('floors', answers.floors), answers.bedrooms === 'one_two' ? '1–2 habitaciones' : answers.bedrooms === 'five_plus' ? '5 o más habitaciones' : `${label('bedrooms', answers.bedrooms)} habitaciones`, label('area', answers.area)];
    const place = answers.locationUnknown ? 'Ubicación por definir' : `${answers.municipality.trim()}, ${answers.department.trim()}`;
    const profile = [
      ['Tu idea', label('intent', answers.intent)], ['Ubicación', place],
      ['Lote', label('land', answers.land)], ['Diseño actual', label('design', answers.design)],
      ['Cuándo empezar', label('timing', answers.timing)], ['Pisos', label('floors', answers.floors)],
      ['Habitaciones', houseLabels[1]], ['Área aproximada', label('area', answers.area)],
      ['Estilo', label('style', answers.style)], ['Materiales', materialLabels]
    ];
    const programLabels = [answers.floors === 'unsure' ? 'Pisos por definir' : houseLabels[0], houseLabels[1], answers.area === 'unsure' ? 'Área por definir' : houseLabels[2]];
    return { stage, steps, timingNote, profile, proposal: { title: 'Ya tenemos una primera dirección para tu casa.', summary: styles[answers.style][1] }, context: [label('style', answers.style), materialLabels, ...programLabels].join(' · ') };
  }
  function brief(answers) {
    if (questions.some((q, index) => validateStep(index, answers))) throw new Error('Incomplete quiz');
    return {
      schema_version: 'modulith-house-brief-v1',
      intent: answers.intent, land: answers.land,
      location: answers.locationUnknown ? null : { municipality: answers.municipality.trim(), department: answers.department.trim() },
      design: answers.design, timing: answers.timing,
      program: { floors: answers.floors, bedrooms: answers.bedrooms, area_band: answers.area },
      style: answers.style, materials: [...answers.materials],
      requested_assets: ['concept_render', 'concept_plan', 'initial_route']
    };
  }
  function validateContact(contact) {
    const errors = {};
    const name = (contact.name || '').trim();
    const email = (contact.email || '').trim();
    const phone = (contact.whatsapp || '').replace(/[\s()-]/g, '');
    if (!name || name.length > 80) errors.name = 'Escribe tu nombre, con un máximo de 80 caracteres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.includes('..') || email.length > 254) errors.email = 'Escribe un correo válido. Por ejemplo: nombre@dominio.com.';
    if (!/^\+[1-9]\d{7,14}$/.test(phone) || (phone.startsWith('+57') && !/^\+57\d{10}$/.test(phone))) errors.whatsapp = 'Escribe un teléfono con indicativo y número completo. En Colombia: +57 y 10 dígitos.';
    for (const [key, label] of [['municipality', 'la ciudad o municipio'], ['department', 'el departamento']]) {
      const value = (contact[key] || '').trim();
      if (value.length < 2 || value.length > 80 || !/\p{L}/u.test(value)) errors[key] = `Escribe ${label}, con un máximo de 80 caracteres.`;
    }
    if (contact.authorization !== true) errors.authorization = 'Marca la autorización de tratamiento de datos para continuar.';
    return errors;
  }
  function payload(answers, contact, route, config, attemptId) {
    if (Object.keys(validateContact(contact)).length) throw new Error('Invalid contact');
    const services = { design_build: 'diseno_construccion', have_design: 'construccion_diseno_existente', find_land: 'orientacion', explore: 'aun_no_lo_se' };
    const landStates = { owned: 'tengo_lote', buying: 'negociacion', searching: 'buscando', none: 'aun_no_lo_se' };
    const body = {
      name: contact.name.trim(), service: services[answers.intent], land_status: landStates[answers.land],
      municipality: contact.municipality.trim(),
      department: contact.department.trim(),
      channel: 'email', authorization: true, form_version: config.formVersion, consent_version: config.consentVersion,
      attempt_id: attemptId, website: contact.website || '',
      message: JSON.stringify(brief(answers))
    };
    if (body.message.length > 1000) throw new Error('Route message too long');
    body.email = contact.email.trim();
    if (contact.whatsapp) body.whatsapp = contact.whatsapp.replace(/[\s()-]/g, '');
    return body;
  }
  function proposalRequest(answers, contact, config, attemptId) {
    if (Object.keys(validateContact(contact)).length) throw new Error('Invalid contact');
    const project = brief(answers);
    project.location = { municipality: contact.municipality.trim(), department: contact.department.trim() };
    return { schema_version: 'modulith-proposal-request-v1', attempt_id: attemptId, brief: project, contact: { name: contact.name.trim(), email: contact.email.trim(), whatsapp: contact.whatsapp.replace(/[\s()-]/g, '') }, consent: { authorized: true, version: config.consentVersion } };
  }
  return { questions, blank, label, validateStep, selectMaterial, result, brief, proposalRequest, validateContact, payload };
});
