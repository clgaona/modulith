# Modulith - Homepage aprobado / feedback estatico

Repositorio oficial: `https://github.com/clgaona/modulith.git`. El homepage `/` contiene la version cinematografica aprobada, sincronizada el 18 de octubre de 2026 desde `creative-sprint/round-1/prototype`: hero con laptop, nueve secciones, proceso de ocho etapas, quiz visual, FAQ y cierre/footer.

## Ejecutar

Node probado y fijado en `.node-version`: **24.21.0**. No se necesitan secretos ni variables de entorno.

```sh
npm ci
npm run check
npm run build
npm test
npm run preview -- --port 4322
```

Abrir `http://127.0.0.1:4322/`. Para desarrollo: `npm run dev`. La preview necesita un servidor local activo; el dominio publicado no depende de ese proceso.

## Fuente oficial del homepage

- `src/pages/index.astro`: entrada Astro.
- `src/layouts/ApprovedLayout.astro`: documento estatico, canonical, noindex y carga ordenada de CSS/JS.
- `src/approved/home.html`: cuerpo HTML aprobado, sin cambios visuales durante la sincronizacion.
- `public/*.css`, `public/*.js`, `public/assets/`: estilos, interacciones, quiz, imagenes y fuentes aprobados.
- `src/approved/quiz-contract.d.ts`: contrato preparado para una futura integracion de generacion y entrega.
- `src/approved/manifest.json`: procedencia y hashes de los 65 archivos de runtime transferidos.

Las siguientes ediciones deben realizarse en este repositorio. `creative-sprint` no participa en el build ni debe seguir siendo una segunda fuente automatica. Su contenido original se conserva intacto. `scripts/import-approved-home.mjs` permite una importacion manual explicita; no se ejecuta al construir o desplegar.

Las antiguas rutas `/preview/` y sus seis variantes se conservan como archivo historico. No son el homepage actual. Sus componentes, estilos Inter/Source Serif y configuracion historica no se cargan en `/`. El homepage aprobado usa Instrument Sans autoalojada; sus licencias se conservan en `public/fonts/`.

## Funcionalidades y limites actuales

El quiz funciona en el navegador: ocho pasos, programa de vivienda, referencias visuales, hasta dos materiales, sintesis pre-lead, formulario y validaciones. Nombre, correo, telefono con indicativo, municipio, departamento y consentimiento son obligatorios. La captura y generacion real siguen desactivadas: el adaptador devuelve siempre `disabled`, sin red ni almacenamiento. Tampoco se permiten simulaciones locales de exito. No existe backend conectado ni politica aprobada.

`/privacidad/` contiene los 17 apartados de la politica consolidada suministrada por MODULITH S.A.S., version 1.0 para aprobacion interna, con indice y contactos enlazados. Conserva los pendientes de aprobacion y no habilita captura. Se abre en otra pestana sin perder el formulario. Ver [docs/PRIVACY_REVIEW.md](docs/PRIVACY_REVIEW.md) para los bloqueos legales y operativos. `/contacto/` mantiene su dialogo de destino pendiente. No se inventaron correos ni telefonos empresariales. La coleccion de guias sigue vacia.

## Comprobaciones

`npm test` verifica paridad byte a byte del HTML y de los assets importados, todas las secciones, configuracion estatica, recursos, anchors y comportamiento del dominio/transporte del quiz. `npm run check` revisa Astro y TypeScript. Las advertencias de guias vacias y los hints por variables no utilizadas en el JS aprobado no alteran el build.

`npm run test:browser` es un script de regresion para Chrome/Edge instalado; requiere una preview activa (por defecto puerto 4321, configurable con `PREVIEW_URL`). No descarga navegadores. Incluye las variantes historicas y el homepage aprobado. Los resultados y capturas locales se guardan en `artifacts/`, ignorado por Git. La validacion visual de esta sincronizacion se documenta en [docs/SYNC_AUDIT_2026-10-18.md](docs/SYNC_AUDIT_2026-10-18.md).

## Cloudflare Pages

Se conserva Astro **7.3.6**, `output: 'static'`, sin adaptador, Workers ni Functions. Configuracion: rama `main`, raiz del repositorio, `npm run build`, salida `dist`, Node **24.21.0**, dominio `https://modulith.com.co`. `astro.config.mjs`, dependencias y lockfile no cambian durante esta sincronizacion.

Todas las paginas mantienen `noindex, nofollow` temporal. El homepage lo define en `ApprovedLayout.astro`; las variantes historicas y el 404 en `BaseLayout.astro`. Ver [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) antes de autorizar un lanzamiento indexable.

La rama local `codex/backup-published-2026-10-18` conserva el commit anterior a la sincronizacion. Esta entrega prepara un commit local en `main`; no realiza push ni publica cambios en Cloudflare.
