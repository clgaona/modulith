// Publish only confirmed channels. Optional pages remain hidden until available.
window.MODULITH_FOOTER = Object.freeze({
  email: null, // { confirmed: true, address: 'approved-address' }
  whatsapp: null, // { confirmed: true, number: 'international-digits' }
  guidesHref: null,
  termsHref: null,
  social: [] // [{ confirmed: true, label: 'channel', href: 'https://...' }]
});
