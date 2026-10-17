# Deployment estático de feedback · Modulith

## Configuración verificada

- Framework: Astro 7.3.6, `output: 'static'`, sin adaptador.
- Dominio canónico: `https://modulith.com.co`, sin base path; canonical por página en `src/layouts/BaseLayout.astro`.
- Rama de producción: `main`.
- Raíz de build: raíz del repositorio.
- Comando de build: `npm run build`.
- Directorio de salida: `dist` (con `index.html` directamente en su raíz).
- Node: **24.21.0**, fijado en `.node-version`; el mínimo de Astro es 22.12.0.
- Variables de entorno y secretos de aplicación: **ninguno**.
- Solo build en Node: el sitio publicado son HTML, CSS, JavaScript, SVG y fuentes estáticos. No necesita Node, Workers, Pages Functions, D1 ni APIs al recibir visitas.

Cloudflare Pages admite `.node-version` para seleccionar Node. Si el proyecto remoto tiene un `NODE_VERSION` previo, eliminarlo o igualarlo a `24.21.0` para que no contradiga el archivo. Referencias oficiales: [build image](https://developers.cloudflare.com/pages/configuration/build-image/) y [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## Verificación local

```sh
npm ci
npm run check
npm run build
npm test
npm run preview
```

En otra terminal, con preview activo en el puerto 4321:

```sh
npm run test:browser
```

`npm run preview` es únicamente un servidor de revisión local. No forma parte de la arquitectura de producción. El script de navegador usa Chrome/Edge instalado y guarda resultados en `artifacts/`, ignorado por Git.

El homepage `/`, la comparación `/preview/`, las seis variantes y `404.html` son estáticos. Contacto, guías y quiz aún dirigen al aviso existente de funcionalidades pendientes; no hay un quiz funcional ni captura de datos que validar o conectar a un backend en esta fase.

## Conectar el repositorio real a GitHub

No hay remote configurado. Crear en GitHub un repositorio **vacío**, sin README, licencia ni `.gitignore` iniciales. Copiar su URL HTTPS o SSH real. Desde la raíz local, en PowerShell:

```powershell
$modulithRemote = Read-Host 'Pega la URL real del repositorio GitHub vacío'
git -c safe.directory=C:/Users/CRISTIAN/Desktop/Modulith remote add origin $modulithRemote
git -c safe.directory=C:/Users/CRISTIAN/Desktop/Modulith remote -v
git -c safe.directory=C:/Users/CRISTIAN/Desktop/Modulith push -u origin main
```

El parámetro `safe.directory` se limita a cada comando porque este checkout tiene un propietario de Windows diferente; no modifica la confianza global de Git. La autenticación se realiza con la cuenta habitual de GitHub. No añadir credenciales ni tokens al remote ni al repositorio.

## Conectar Cloudflare Pages cuando se autorice publicar

La conexión y el primer deployment remoto siguen pendientes. En Cloudflare, crear un proyecto **Pages** mediante integración Git y seleccionar el repositorio real. Configurar `main`, preset Astro, `npm run build` y salida `dist`; no configurar Workers ni Functions. La creación mediante Git puede iniciar el primer deployment automáticamente.

Después del deployment autorizado, agregar `modulith.com.co` en **Custom domains** del proyecto Pages y completar la validación/DNS que Cloudflare indique. El valor `site` y el canonical no crean DNS ni conectan el dominio por sí mismos. Verificar HTTPS y abrir `/` y `/preview/` desde el dominio real.

## Noindex temporal y lanzamiento oficial

`src/layouts/BaseLayout.astro` añade `<meta name="robots" content="noindex, nofollow">` a todas las páginas públicas, incluida la de error. `public/robots.txt` usa `Allow: /` para que los buscadores puedan renderizar recursos y leer el noindex. No hay sitemap ni bloqueo de CSS, JavaScript o fuentes.

Para el lanzamiento oficial:

1. Retirar el meta `robots` global de `src/layouts/BaseLayout.astro` (o cambiar su contenido a `index, follow`).
2. Actualizar las comprobaciones de noindex en `tests/build.test.mjs` y `scripts/verify-preview.mjs` para el nuevo estado.
3. Mantener `public/robots.txt` permitiendo recursos. No hay un `Disallow: /` que retirar.
4. Ejecutar `npm run check`, `npm run build`, `npm test` y las pruebas de navegador; publicar el nuevo build cuando esté autorizado.
5. Revisar en el HTML del dominio real que ya no se envíe noindex. Decidir por separado qué variantes de feedback deben seguir públicas antes de indexarlas.

Noindex evita solicitar indexación, pero el sitio de feedback es público y no está protegido por autenticación.

## Límites de esta entrega

No se rediseña ni modifica copy, imágenes o UI. Se eliminó únicamente el diagnóstico server-side `/api/runtime/` y su infraestructura no utilizada por el homepage. El historial de planificación de backend se conserva como documentación; cualquier API futura requerirá una implementación y deployment autorizados por separado.
