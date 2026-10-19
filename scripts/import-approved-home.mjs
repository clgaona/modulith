import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2] && resolve(process.argv[2]);
assert.ok(source && source !== repo, 'Pass the approved prototype directory explicitly.');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const htmlBytes = await readFile(join(source, 'index.html'));
const html = htmlBytes.toString('utf8');
const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1];
assert.ok(body?.includes('Explora tu primera idea') && body.includes('Medellín · Colombia'), 'The source must be the final approved homepage.');
const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1]);
const scripts = [...html.matchAll(/<script src="([^"]+)" defer/g)].map(match => match[1]);
const assets = new Set([...html.matchAll(/assets\/([A-Za-z0-9_.-]+)/g)].map(match => match[1]));
const sandbox = { module: { exports: {} } };
vm.runInNewContext(await readFile(join(source, 'quiz-domain.js'), 'utf8'), sandbox, { timeout: 1000 });
for (const question of sandbox.module.exports.questions) {
  for (const option of question.options || []) {
    if (!option[2]?.image) continue;
    assets.add(`${option[2].image}.webp`);
    assets.add(`${option[2].image}-small.webp`);
  }
}
for (const style of styles) {
  const css = await readFile(join(source, style), 'utf8');
  for (const [, asset] of css.matchAll(/assets\/([A-Za-z0-9_.-]+)/g)) assets.add(asset);
}
const paths = [...styles, ...scripts, ...[...assets].sort().map(asset => `assets/${asset}`)];
const files = [];
for (const relative of paths) {
  assert.match(relative, /^(?:[A-Za-z0-9_.-]+\.(?:css|js)|assets\/[A-Za-z0-9_.-]+\.(?:webp|woff2|svg))$/);
  const input = join(source, relative);
  const bytes = await readFile(input);
  const output = join(repo, 'public', relative);
  await mkdir(dirname(output), { recursive: true });
  await copyFile(input, output);
  files.push({ path: relative, bytes: bytes.length, sha256: hash(bytes) });
}
await mkdir(join(repo, 'src/approved'), { recursive: true });
await writeFile(join(repo, 'src/approved/home.html'), body);
await copyFile(join(source, 'quiz-contract.d.ts'), join(repo, 'src/approved/quiz-contract.d.ts'));
await writeFile(join(repo, 'src/approved/manifest.json'), JSON.stringify({
  schemaVersion: 1,
  source: 'creative-sprint/round-1/prototype',
  sourceHtmlSha256: hash(htmlBytes),
  bodySha256: hash(body),
  styles,
  scripts,
  files,
}, null, 2) + '\n');
console.log(`Imported approved body, quiz contract and ${files.length} exact production files (${assets.size} assets).`);
console.log('Source was read only. No Git, dependencies, raw generation files or caches were copied.');
