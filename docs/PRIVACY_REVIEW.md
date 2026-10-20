# Revision de privacidad y captura - 20 de octubre de 2026

## Estado bloqueado para captura real

`/privacidad/` contiene la politica consolidada suministrada por el responsable: version 1.0, para aprobacion interna, elaborada el 20 de octubre de 2026. La fuente esta en `src/approved/privacy.md`. Se conservaron los 17 apartados, las listas y el texto del adjunto; solo se adapto el marcado de encabezados y enlaces. La entrada en vigor y la fecha de aprobacion siguen pendientes. No es una politica aprobada ni habilita captura real.

El documento identifica a MODULITH S.A.S., NIT 900723127-4, y conserva la direccion, el telefono y el canal `constructora.veta@gmail.com` proporcionados en el adjunto. No se cambiaron los contactos del resto del sitio. Tanto el enlace independiente del formulario como la expresion enlazada dentro de la autorizacion abren el documento completo en otra pestana para conservar las respuestas transitorias. El consentimiento permanece desmarcado inicialmente.

Antes de activar captura, el responsable de Modulith debe confirmar:

- Aprobacion formal de la politica y de la autorizacion; fechas de aprobacion y entrada en vigor.
- Designacion interna de Administracion como area encargada de atender derechos y operacion efectiva del procedimiento descrito.
- Periodo operativo de conservacion de leads no contratados y procedimientos de revision, eliminacion o anonimizacion.
- Proveedores de almacenamiento, generacion y correo; condiciones, acuerdos, ubicaciones y transmisiones o transferencias aplicables antes de habilitarlos.
- Backend, controles de acceso, seguridad y respuesta ante incidentes en los servicios que realmente se implementen.
- Evidencia verificable de autorizacion previa, expresa e informada: version aprobada, finalidades, momento y mecanismos de consulta y revocatoria.

La integracion conserva el contenido suministrado; no constituye revision juridica ni aprobacion de la politica. La mencion condicional de cookies y medicion en el documento no instala esas herramientas.

## Formulario preparado, no operativo

Nombre, correo, telefono con indicativo, municipio, departamento y consentimiento son obligatorios. El telefono comienza en `+57` y admite otros indicativos. Se valida formato internacional de 8 a 15 digitos; para `+57`, diez digitos nacionales. Esto comprueba formato, no existencia, titularidad ni disponibilidad en WhatsApp. Referencia: [CRC: esquema colombiano de diez digitos](https://www.crcom.gov.co/es/noticias/comunicado-prensa/inicia-implementacion-definitiva-nuevo-esquema-numeracion-y-marcacion).

No hay catalogo geografico de Colombia en el proyecto. Se mantienen campos libres requeridos, de 2 a 80 caracteres y al menos una letra, precargados desde la pregunta 3 cuando existe respuesta. No se inventan listas ni se afirma validar un municipio contra DIVIPOLA. La ubicacion confirmada en contacto es la que recibe el contrato estructurado, sin cambiar preguntas ni algoritmo de resultados.

`quiz-transport.js` es un adaptador inerte: siempre devuelve `disabled`, incluso con parametros locales de simulacion o flags alterados. No hace fetch, no guarda datos, no genera referencias ficticias ni confirma recepcion. El formulario solo valida en memoria durante la pagina abierta. No hay localStorage, sessionStorage, envio a analytics ni PII en URL. No usar datos reales para la revision.

El contrato `ProposalRequest` queda preparado con telefono y ubicacion obligatorios. Una integracion futura exige reemplazar el adaptador inerte y validar todo tambien en servidor; cambiar flags no activa el formulario. `captureEnabled` y `policyApproved` permanecen en `false`, y `consentVersion` en `null`. La politica consolidada y la nueva autorizacion aun requieren aprobacion, implementacion verificable y pruebas antes de recibir datos.
