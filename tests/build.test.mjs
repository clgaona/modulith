import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = join(process.cwd(), 'dist');
const directions = ['editorial', 'mineral'];
const headlines = ['claridad', 'diseno', 'tranquilidad'];
const expected = {
  claridad: 'Tu casa empieza con decisiones claras.',
  diseno: 'Una mejor manera de diseñar y construir tu casa.',
  tranquilidad: 'Construir tu casa no debería convertirse en otro trabajo.',
};
const read = (path) => readFileSync(join(root, path), 'utf8');

test('six real HTML variants share all essential content except the selected headline', () => {
  let commonMain;
  for (const direction of directions) for (const headline of headlines) {
    const html = read(`preview/${direction}/${headline}/index.html`);
    assert.match(html, new RegExp(`data-direction="${direction}"`));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes(expected[headline]));
    assert.match(html, /Concepto ilustrativo\. No corresponde a una obra construida por Modulith\./);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)[0].replace(/<h1\b[\s\S]*?<\/h1>/, '<h1>VARIANT</h1>');
    if (!commonMain) commonMain = main;
    assert.equal(main, commonMain, `${direction}/${headline} changed essential structure`);
  }
});

test('preview cannot capture data or load a tracker', () => {
  for (const direction of directions) for (const headline of headlines) {
    const html = read(`preview/${direction}/${headline}/index.html`);
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(html, /<form\b|<input\b|plausible\.io|googletagmanager|google-analytics/);
    assert.doesNotMatch(html, /<script[^>]+src="https?:/);
  }
  assert.match(read('robots.txt'), /Allow: \//);
  assert.doesNotMatch(read('robots.txt'), /Disallow:\s*\//);
});

test('comparison page links to every variant and the Home links have real local targets', () => {
  const index = read('preview/index.html');
  for (const direction of directions) for (const headline of headlines) {
    assert.ok(index.includes(`href="/preview/${direction}/${headline}/"`));
  }
  const home = read('index.html');
  const targets = new Set([...home.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
  for (const [, target] of home.matchAll(/href="#([^"]+)"/g)) assert.ok(targets.has(target), target);
});

test('fonts are bundled locally with their licenses', () => {
  const files = readdirSync(join(root, '_astro'));
  assert.ok(files.some((file) => file.startsWith('inter-latin-400') && file.endsWith('.woff2')));
  assert.ok(files.some((file) => file.startsWith('source-serif-4-latin-400') && file.endsWith('.woff2')));
  assert.match(read('fonts/Inter-LICENSE.txt'), /SIL OPEN FONT LICENSE/);
  assert.match(read('fonts/Source-Serif-4-LICENSE.txt'), /SIL OPEN FONT LICENSE/);
});

test('production output is static, uses the public domain and has valid local resources and anchors', () => {
  for (const path of ['client', 'server', '_worker.js', 'api/runtime', 'wrangler.json', 'wrangler.jsonc']) {
    assert.equal(existsSync(join(root, path)), false, `${path} must not be emitted`);
  }
  const files = readdirSync(root, { recursive: true }).filter((path) => statSync(join(root, path)).isFile());
  const origin = 'https://modulith.com.co';
  for (const path of files) {
    if (!/\.(html|css|js|svg|txt|json)$/.test(path)) continue;
    const content = read(path);
    // The approved transport deliberately limits synthetic previews to localhost.
    // Production must never request a development URL or a server runtime.
    assert.doesNotMatch(content, /https?:\/\/(?:localhost|127\.0\.0\.1)|:4321|:4317|cloudflare:workers/i, path);
    if (!path.endsWith('.html')) continue;
    const pageUrl = new URL(path.replaceAll('\\', '/').replace(/index\.html$/, ''), `${origin}/`);
    if (path === '404.html') assert.doesNotMatch(content, /rel="canonical"/);
    else assert.ok(content.includes(`<link rel="canonical" href="${pageUrl.href}"`), path);
    assert.match(content, /name="robots" content="noindex, nofollow"/, path);
    for (const [, reference] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(reference, pageUrl);
      if (url.origin !== origin) continue;
      if (path === 'index.html' && url.pathname === '/contacto/') {
        assert.match(htmlPage(), /id="destination-dialog"/);
        assert.ok(read('app.js').includes("document.querySelectorAll('a[href^=\"/\"]')"));
        assert.match(read('app.js'), /event\.preventDefault\(\)[\s\S]*dialog\.showModal\(\)/);
        continue;
      }
      const target = decodeURIComponent(url.pathname).replace(/^\//, '');
      const targetFile = extname(target) ? target : join(target, 'index.html');
      assert.ok(existsSync(join(root, targetFile)), `${path}: missing ${reference}`);
      if (url.hash && targetFile.endsWith('.html')) {
        assert.ok(read(targetFile).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: missing anchor ${reference}`);
      }
    }
  }
  for (const path of files.filter((path) => path.endsWith('.css'))) {
    for (const [, reference] of read(path).matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const url = new URL(reference, new URL(path.replaceAll('\\', '/'), `${origin}/`));
      if (url.origin === origin) assert.ok(existsSync(join(root, decodeURIComponent(url.pathname))), `${path}: missing ${reference}`);
    }
  }
});

function htmlPage() { return read('index.html'); }
