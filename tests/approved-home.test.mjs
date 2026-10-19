import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const read = file => readFileSync(join(process.cwd(), file), 'utf8');
const manifest = JSON.parse(read('src/approved/manifest.json'));
const hash = value => createHash('sha256').update(value).digest('hex');
const html = read('dist/index.html');
const sourceBody = read('src/approved/home.html');
const sandbox = { module: { exports: {} } };
vm.runInNewContext(read('public/quiz-domain.js'), sandbox);
const domain = sandbox.module.exports;
const plain = value => JSON.parse(JSON.stringify(value));
const configScope = { window: {} };
vm.runInNewContext(read('public/quiz-config.js'), configScope);
const config = configScope.window.MODULITH_QUIZ_CONFIG;
const transportScope = { module: { exports: {} }, URLSearchParams };
vm.runInNewContext(read('public/quiz-transport.js'), transportScope);

const answers = () => ({ ...domain.blank(), intent: 'design_build', land: 'owned', municipality: 'Ciudad de prueba', department: 'Departamento de prueba', design: 'none', timing: '6_12', floors: 'two', bedrooms: 'three', area: '100_150', style: 'contemporary', materials: ['wood', 'stone'] });

test('Astro renders the approved body unchanged, without old homepage styles', () => {
  assert.equal(hash(sourceBody), manifest.bodySha256);
  assert.equal(html.match(/<body>([\s\S]*?)<\/body>/)[1].trim(), sourceBody.trim());
  assert.match(html, /data-hero="cinematic"/);
  assert.match(html, /<h1 id="hero-title">De una idea a una casa de verdad\.<\/h1>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/modulith\.com\.co\/"/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /href="\/_astro\/[^\"]+\.css|class="preview-bar"/);
});

test('all migrated scripts, styles and assets remain byte-identical in source and dist', () => {
  assert.equal(manifest.files.length, 65);
  for (const file of manifest.files) for (const folder of ['public', 'dist']) {
    const bytes = readFileSync(join(process.cwd(), folder, file.path));
    assert.equal(bytes.length, file.bytes, `${folder}/${file.path}: size`);
    assert.equal(hash(bytes), file.sha256, `${folder}/${file.path}: hash`);
  }
  assert.match(read('public/fonts/Instrument-Sans-LICENSE.txt'), /SIL OPEN FONT LICENSE/);
});

test('every approved section and final iteration is present', () => {
  for (const id of ['como-funciona', 'propuesta', 'comparacion', 'proceso', 'por-que-modulith', 'empieza', 'preguntas', 'conversemos', 'footer']) assert.ok(html.includes(`id="${id}"`), id);
  assert.equal((html.match(/data-process-step=/g) || []).length, 8);
  assert.equal((html.match(/<details class="faq-item"/g) || []).length, 12);
  assert.doesNotMatch(html, /process-ending|process-action|footer-legal|menu-toggle/);
  assert.match(html, /Explora tu primera idea/);
  assert.match(html, /href="#propuesta">Cómo funciona/);
  assert.match(html, /Medellín · Colombia/);
  for (const stage of ['brief', 'project', 'budget']) assert.ok(html.includes(`process-${stage}-v4.webp`));
});

test('official favicon preserves the authorized symbol and has 16/32 PNG fallbacks', () => {
  const original = read('public/assets/logo-modulith.svg');
  const favicon = read('public/favicon.svg');
  const paths = svg => [...svg.matchAll(/<path\b([^>]*)\/>/g)].map(match => match[1].trim());
  assert.deepEqual(paths(favicon), paths(original));
  assert.ok(paths(favicon).length > 0);
  assert.match(favicon, /viewBox="280 278 464 464"/);
  assert.doesNotMatch(favicon, /<text\b|Georgia|<image\b/);
  assert.match(html, /href="\/favicon\.svg\?v=modulith-m"/);
  for (const size of [16, 32]) {
    const png = readFileSync(`public/favicon-${size}.png`);
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
    assert.deepEqual(readFileSync(`dist/favicon-${size}.png`), png);
    assert.ok(html.includes(`href="/favicon-${size}.png?v=modulith-m"`));
  }
  assert.equal(read('dist/favicon.svg'), favicon);
});

test('final refinements preserve copy, disclosures in the quiz and protected sections', () => {
  const supporting = 'Del primer boceto a la entrega de tu casa, coordinamos el diseño, la ingeniería y la construcción.';
  assert.ok(html.includes(`<h2 class="hero-description">${supporting}</h2>`));
  assert.ok(read('public/app.js').includes(supporting));
  const start = html.slice(html.indexOf('class="quiz-start-copy"'), html.indexOf('class="quiz-start-image"'));
  assert.doesNotMatch(start, /quiz-sample-notice|quiz-memory-note|Vista previa|Tus respuestas/);
  const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
  assert.doesNotMatch(footer, /image-disclosure|footer-bottom|Imágenes arquitectónicas/);
  assert.match(html, /Referencias conceptuales|Render conceptual de muestra/);
  assert.match(html, /id="quiz-consent"/);
  assert.match(html, /Las imágenes son conceptuales y no sustituyen un diseño arquitectónico desarrollado/);
  const protectedBlock = (a, b) => sourceBody.slice(sourceBody.indexOf(`<section id="${a}"`), sourceBody.indexOf(`<section id="${b}"`));
  assert.equal(hash(protectedBlock('como-funciona', 'empieza')), 'bda9eaa1f2d73c9ac200cdf2d3fda57070e7cf5bdf1fe6c63ecfa55b37ed57e2');
  assert.equal(hash(protectedBlock('preguntas', 'conversemos')), 'd26b1052b00d333f1442cc974f0561bbbf3a211bde4652eecc74e77c503b5306');
});

test('the eight-step quiz validates program and produces the structured conceptual brief', () => {
  assert.equal(domain.questions.length, 8);
  assert.equal(domain.questions[5].key, 'program');
  assert.equal(domain.questions[6].key, 'style');
  assert.equal(domain.questions[7].key, 'materials');
  const a = answers();
  for (let step = 0; step < 8; step++) assert.equal(domain.validateStep(step, a), '');
  const result = domain.result(a);
  assert.match(result.context, /Contemporáneo.*Madera.*Piedra.*2 pisos.*3 habitaciones.*100–150/);
  assert.equal(result.steps.length, 3);
  const brief = domain.brief(a);
  assert.equal(brief.schema_version, 'modulith-house-brief-v1');
  assert.deepEqual(plain(brief.program), { floors: 'two', bedrooms: 'three', area_band: '100_150' });
  assert.deepEqual(plain(brief.requested_assets), ['concept_render', 'concept_plan', 'initial_route']);
  a.floors = '';
  assert.notEqual(domain.validateStep(5, a), '');
  assert.throws(() => domain.result(a), /Incomplete quiz/);
});

test('materials allow at most two; the undecided option is exclusive', () => {
  const two = domain.selectMaterial(['wood'], 'stone', true);
  assert.deepEqual(plain(two.values), ['wood', 'stone']);
  const third = domain.selectMaterial(two.values, 'concrete', true);
  assert.deepEqual(plain(third.values), ['wood', 'stone']);
  assert.match(third.error, /hasta dos/);
  assert.deepEqual(plain(domain.selectMaterial(two.values, 'unsure', true).values), ['unsure']);
  assert.deepEqual(plain(domain.selectMaterial(['unsure'], 'wood', true).values), ['wood']);
});

test('pre-lead shows no complete render, plan or route, and contact errors are validated', () => {
  const preLead = html.slice(html.indexOf('data-quiz-pane="result"'), html.indexOf('<form id="quiz-contact"'));
  assert.doesNotMatch(preLead, /<img|quiz-result-steps/);
  assert.match(preLead, /awaiting-lead/);
  assert.deepEqual(Object.keys(domain.validateContact({ name: '', email: 'bad', whatsapp: 'bad', authorization: false })).sort(), ['authorization', 'email', 'name', 'whatsapp']);
  assert.deepEqual(plain(domain.validateContact({ name: 'Prueba Sintetica', email: 'prueba@example.com', whatsapp: '', authorization: true })), {});
  assert.doesNotMatch(read('public/quiz.js'), /localStorage|sessionStorage|sendBeacon|gtag\(/);
});

test('production keeps capture disabled and cannot enable local simulation by query string', async () => {
  assert.equal(config.captureEnabled, false);
  assert.equal(config.policyApproved, false);
  assert.equal(config.consentVersion, null);
  let requests = 0;
  const transport = transportScope.module.exports.create({ config, location: { hostname: 'modulith.com.co', search: '?quizPreview=success' }, fetch: () => { requests++; throw new Error('Unexpected request'); } });
  assert.equal(transport.previewMode, '');
  assert.equal((await transport.submit({})).code, 'disabled');
  assert.equal(requests, 0);
});

test('local mock states remain honest and never send personal data', async () => {
  for (const mode of ['success', 'error', 'field', 'rate']) {
    const transport = transportScope.module.exports.create({ config, location: { hostname: '127.0.0.1', search: `?quizPreview=${mode}` }, fetch: () => { throw new Error('Unexpected network request'); }, wait: () => Promise.resolve() });
    const result = await transport.submit({});
    if (mode === 'success') assert.equal(result.simulated, true);
    else assert.equal(result.ok, false);
  }
});
