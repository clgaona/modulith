(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ModulithQuizTransport = factory();
})(typeof window === 'undefined' ? this : window, () => {
  // Replace this adapter only after the backend and data policy are approved.
  function create() {
    return {
      async submit(_request) {
        return { ok: false, code: 'disabled' };
      }
    };
  }
  return { create };
});
