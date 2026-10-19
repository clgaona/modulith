# Deployment estatico de feedback - Modulith

## Configuracion conservada

- Repositorio: `https://github.com/clgaona/modulith.git`.
- Rama de produccion: `main`.
- Framework: Astro 7.3.6, `output: 'static'`, sin adaptador.
- Dominio canonico: `https://modulith.com.co`, sin base path.
- Raiz de build: raiz del repositorio.
- Comando: `npm run build`.
- Salida: `dist` (incluye `index.html` en su raiz).
- Node: **24.21.0**, fijado en `.node-version`.
- Variables de entorno y secretos para esta version: ninguno.

El HTML publicado, CSS, JavaScript, imagenes y fuentes son estaticos. No hay Node de produccion, Workers, Pages Functions, D1 ni API de generacion. La sincronizacion de octubre de 2026 no cambia `astro.config.mjs`, `package.json`, `package-lock.json` ni `.node-version`.

## Verificacion local

```sh
npm ci
npm run check
npm run build
npm test
npm run preview -- --port 4322
```

Abrir `http://127.0.0.1:4322/`. El servidor es exclusivamente local. `dist/` se genera desde este repositorio, sin acceder a `creative-sprint`.

El homepage aprobado es `/`. `/preview/` y sus seis variantes se conservan como archivo historico. No usar esas variantes para evaluar la version actual. El manifiesto `src/approved/manifest.json` registra los hashes de la transferencia; los tests verifican su integridad en `public/` y `dist/`.

El script opcional `npm run test:browser` usa un navegador instalado y el puerto 4321 por defecto. En PowerShell, para este servidor:

```powershell
$env:PREVIEW_URL = 'http://127.0.0.1:4322'
npm run test:browser
```

## Quiz y destinos pendientes

El quiz aprobado es frontend estatico y conserva sus ocho pasos y validaciones. `public/quiz-config.js` mantiene `captureEnabled: false` y `policyApproved: false`; `/api/contacto` no existe. No activar esos flags sin backend y politica aprobados. Los contratos de `src/approved/quiz-contract.d.ts` preparan la integracion futura, no la implementan.

Los enlaces pendientes `/contacto/` y `/privacidad/` abren el dialogo del preview mediante `public/app.js`, tal como en el original aprobado. No se eliminaron funcionalidades para compilar. La generacion real, el almacenamiento y la entrega requieren otra implementacion autorizada.

## Publicacion: requiere autorizacion

El remote `origin` ya esta configurado. No volver a crearlo ni conectar otro repositorio. Esta sincronizacion termina con un commit local: **no ejecuta push ni modifica la configuracion remota de Cloudflare**.

Una vez que el usuario haya revisado y autorizado el resultado:

```sh
git push origin main
```

El push puede disparar el despliegue automatico existente en Cloudflare. Comprobar alli que se conserva `main`, preset Astro, raiz del repositorio, `npm run build` y salida `dist`. No configurar Workers ni Functions. El dominio canonico local no configura DNS por si solo.

## Noindex temporal

El homepage usa `src/layouts/ApprovedLayout.astro`; las rutas historicas y el 404 usan `src/layouts/BaseLayout.astro`. Ambos mantienen `<meta name="robots" content="noindex, nofollow">`. `public/robots.txt` permite los recursos para que los buscadores puedan leer ese meta.

No retirar noindex durante feedback. Para un lanzamiento indexable autorizado: revisar ambos layouts, tests de noindex y destino de las variantes historicas, reconstruir y verificar el HTML remoto. Noindex no protege el sitio mediante autenticacion.
