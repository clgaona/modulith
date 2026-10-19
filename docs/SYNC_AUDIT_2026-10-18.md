# Auditoria y sincronizacion - 18 de octubre de 2026

## Origen y destino

- Origen aprobado, solo lectura: `C:\Users\CRISTIAN\.codex\.chatgpt-projects\g-p-6ac3c74ed79c81919acc3c861c305719\creative-sprint\round-1\prototype`.
- Su HTML/CSS/JS coincidian con la salida aprobada `creative-sprint/hero-iteration/dist`.
- Destino oficial: `C:\Users\CRISTIAN\Desktop\Modulith`.
- `origin`: `https://github.com/clgaona/modulith.git`.
- Estado inicial: `main` limpio, sin cambios en disco pendientes, en `01ad676ad57a99339a446235f8d8d98e9e8498b7`.
- Respaldo local de ese commit: `codex/backup-published-2026-10-18`.

Ambas carpetas eran accesibles. El origen no tenia Git ni proyecto Astro: era un prototipo de HTML, CSS, JavaScript y assets con su propio script de empaquetado local. El destino tenia Astro estatico y las variantes visuales antiguas. No se copiaron `.git`, dependencias, caches, renders de revision ni scripts con rutas locales del prototipo.

## Diferencias y transferencia

El homepage antiguo no contenia el recorrido aprobado ni el quiz. Se integro el cuerpo exacto del HTML aprobado mediante `ApprovedHome.astro` y `ApprovedLayout.astro`, aislado de los estilos y componentes antiguos.

Se transfirieron 65 archivos de produccion: 9 CSS, 15 JavaScript y 41 assets (imagenes WebP, fuentes WOFF2 y logo SVG). `src/approved/manifest.json` enumera cada archivo, sus bytes y SHA-256. Incluye el contrato de quiz para una API futura y la licencia OFL de Instrument Sans. El cuerpo del HTML conserva su propio hash. El importador es manual y no participa en `npm run build`.

Los archivos de texto importados fijan LF en `.gitattributes`: sus hashes se conservan tanto en Windows (donde `core.autocrlf` estaba activo) como en Linux/Cloudflare.

Se conserva el hero luminoso con laptop, CTA diferenciados, comparacion editorial plana, ocho etapas con still lifes actualizados, autoridad institucional sin retrato, quiz visual con programa y materiales multiples, FAQ y footer final sin columna legal. No se modifico el contenido ni el diseno aprobado durante la transferencia.

Las antiguas variantes `/preview/` siguen disponibles como archivo historico. No se borraron componentes ni historial. `creative-sprint` permanece intacto; no es una dependencia del repositorio oficial.

## Compatibilidad y limites existentes

`astro.config.mjs`, `package.json`, `package-lock.json` y `.node-version` permanecen sin cambios. Se conserva Astro 7.3.6 estatico, Node 24.21.0, build `npm run build`, salida `dist/`, dominio `https://modulith.com.co` y noindex temporal.

No se encontro ninguna funcionalidad actual que necesite runtime de servidor. La captura real del quiz y la generacion de render/planta ya estaban desconectadas en el origen y se conservan asi. Los destinos contacto/privacidad mantienen el dialogo de pendientes aprobado. No se inventa un backend, una entrega exitosa, datos de contacto ni paginas nuevas.

## Validacion

- Build de produccion estatico correcto, nueve rutas generadas.
- Astro/TypeScript: cero errores y cero warnings; tres hints de variables sin uso en el JS original, conservado sin cambios.
- 13 tests correctos: paridad de HTML/assets, secciones, quiz, maximo dos materiales, validacion de datos, captura desactivada, dominio, noindex, fuentes, recursos y anchors.
- Aviso esperado: coleccion de guias vacia, sin efecto sobre el homepage.
- Las capturas y comprobaciones de navegador de la sincronizacion se guardan en `artifacts/sync/` (ignorado por Git).
- Navegador integrado a 1440 x 900 y 390 x 844: geometria, tipografia, colores y referencias de imagenes identicos a la fuente aprobada, sin overflow horizontal.
- Proceso: las ocho imagenes cargan; el scroll desktop activa las ocho etapas; mobile conserva su secuencia estatica y sus encuadres especificos.
- Quiz recorrido en ambos tamanos: volver conserva la seleccion, referencias visuales en una columna, limite de dos materiales, sintesis sin render/planta completos, errores de formulario y envio desactivado honesto con datos ficticios.
- CTA comercial abre su dialogo pendiente existente; header conduce al quiz; footer "Como funciona" conduce a `#propuesta`; FAQ abre la respuesta de cobertura aprobada. Sin errores ni warnings en consola durante esas pruebas.

Se uso el navegador integrado para estas pruebas visuales e interactivas. El script opcional de regresion Playwright se actualizo y se comprobo su sintaxis, pero no se ejecuto en esta ronda.

No se ejecuta push. Cloudflare remoto no se modifica en esta entrega. La publicacion depende de una autorizacion posterior.
