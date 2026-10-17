# Modulith · Feedback público estático

Versión de feedback de las **Fases 1 y 2**. Astro 7.3.6 + TypeScript + CSS, homepage y seis variantes completamente estáticos. No hay adaptador de servidor, Workers, endpoints, captura de leads, OpenAI API, quiz implementado ni analytics. El diseño, los textos, los croquis y las interacciones visuales se conservan.

## Ejecutar

Requiere Node 22.12+ y npm. La versión probada y fijada en `.node-version` para Cloudflare Pages es **24.21.0**.

```sh
npm ci
npm run dev
```

Abrir `http://localhost:4321/` o `/preview/`. También puede usarse `npm run build` seguido de `npm run preview` para servir los archivos estáticos de `dist/` localmente. Las direcciones locales solo corresponden a desarrollo y pruebas; el HTML publicado no depende de ellas.

| Dirección | Claridad | Diseño | Tranquilidad |
|---|---|---|---|
| A · Editorial cálida | `/preview/editorial/claridad/` | `/preview/editorial/diseno/` | `/preview/editorial/tranquilidad/` |
| B · Mineral contemporánea | `/preview/mineral/claridad/` | `/preview/mineral/diseno/` | `/preview/mineral/tranquilidad/` |

`/` utiliza A / Claridad como default de revisión. Los controles «Variantes» cambian un eje conservando el otro. Todas las combinaciones comparten componentes, contenido y croquis. Los CTA de funcionalidades pendientes llevan a una nota explícita del preview; no son formularios simulados.

## Reversible

- Colores, familia de títulos, radios y tratamientos de superficie: `src/styles/global.css`.
- Tres titulares y texto compartido: `src/config/site.ts`.
- Hero y visual separados: el SVG original se puede reemplazar por un medio posterior sin cambiar copy/CTA. No hay transición animada ni supuesto proyecto construido.
- Fuente editorial: Source Serif 4; cuerpo y alternativa: Inter. WOFF2 autoalojados mediante Fontsource. Licencias conservadas en `public/fonts/`.
- Cobertura: configuración común. No hay geocodificación ni rechazo por territorio.

## Comprobaciones

```sh
npm run check
npm run build
npm test
npm run preview
# En otra terminal, con preview activo:
npm run test:browser
```

El script de navegador utiliza Chrome o Edge instalados (o `BROWSER_EXECUTABLE`), comprueba las seis variantes y el homepage en 320/390/768/1440 px, navegación, favicon, ausencia de tracking, accesibilidad automatizada y que el antiguo endpoint de runtime devuelve 404. Guarda capturas y reporte en `artifacts/` (ignorado). No descarga un navegador ni navega a sitios externos.

Los tests del build comprueban contenido compartido, anchors, fuentes y licencias, noindex, dominio canónico, recursos locales y ausencia de runtime o referencias locales en producción. La colección de guías vacía produce un aviso esperado durante el build; los artículos pertenecen a una fase posterior. La revisión automática no equivale a certificación WCAG ni a pruebas con usuarios.

No se necesitan variables de entorno ni secretos para construir o renderizar esta versión.

## Cloudflare Pages y lanzamiento

Configuración: branch `main`, build `npm run build`, output `dist`, raíz del repositorio y Node **24.21.0** (archivo `.node-version`). Dominio canónico `https://modulith.com.co`, sin base path. Ver los pasos de conexión a GitHub, configuración de Pages y retiro de noindex en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Se retiraron `/api/runtime/`, `wrangler.jsonc`, los tipos generados de Workers, `@astrojs/cloudflare`, Wrangler y sus scripts. `dist/` contiene directamente el HTML y los assets; no hay `dist/client/`, `dist/server/`, Pages Functions ni Worker. Las fuentes están autoalojadas y el croquis es SVG inline. No hay sitemap ni metadatos Open Graph existentes que migrar.

Los documentos de `docs/`, `src/server/README.md` y `src/lib/analytics/README.md` conservan planificación de fases futuras. No activan backend ni integraciones. `scripts/preview-supervisor.ps1`, `scripts/install-preview-startup.ps1` y `docs/preview-local.md` corresponden a otro prototipo local histórico: no participan del build ni del deployment de este proyecto.

Se conserva el override de `sharp` 0.35.5, también utilizado por Astro para optimización de imágenes en build; no es un runtime de producción.

Todas las páginas conservan `<meta name="robots" content="noindex, nofollow">`. `robots.txt` permite el rastreo de recursos para renderizar y leer ese meta. Antes del lanzamiento oficial se debe retirar el meta global de `src/layouts/BaseLayout.astro`, actualizar el test que lo exige y reconstruir; ver `docs/DEPLOYMENT.md`. Esta versión no es el lanzamiento del MVP.
