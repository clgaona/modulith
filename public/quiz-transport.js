(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ModulithQuizTransport = factory();
})(typeof window === 'undefined' ? this : window, () => {
  function create({ config, location, fetch: send, wait = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
    const local = ['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname);
    const requested = new URLSearchParams(location.search).get('quizPreview');
    const previewMode = local && config.preview && ['success', 'error', 'field', 'rate'].includes(requested) ? requested : '';
    return {
      previewMode,
      async submit(body) {
        if (previewMode) {
          await wait(1200);
          if (previewMode === 'success') return { ok: true, simulated: true, reference: 'PRUEBA-LOCAL' };
          if (previewMode === 'field') return { ok: false, code: 'fields', fields: { email: 'invalid', whatsapp: 'invalid' } };
          return { ok: false, code: previewMode === 'rate' ? 'rate' : 'unavailable' };
        }
        if (!config.captureEnabled || !config.policyApproved || !config.consentVersion) return { ok: false, code: 'disabled' };
        if (config.endpoint !== '/api/contacto') return { ok: false, code: 'configuration' };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await send(config.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, credentials: 'same-origin', redirect: 'error', cache: 'no-store', signal: controller.signal, body: JSON.stringify(body) });
          let data;
          try { data = await response.json(); } catch { return { ok: false, code: 'unavailable' }; }
          if ([200, 201].includes(response.status) && typeof data.reference === 'string' && /^[A-Za-z0-9_-]{1,80}$/.test(data.reference)) return { ok: true, reference: data.reference, simulated: false };
          if (response.status === 422) return { ok: false, code: 'fields', fields: data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors) ? data.errors : {} };
          if (response.status === 429) return { ok: false, code: 'rate' };
          return { ok: false, code: 'unavailable' };
        } catch { return { ok: false, code: 'unavailable' }; }
        finally { clearTimeout(timeout); }
      }
    };
  }
  return { create };
});
