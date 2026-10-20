# Revision de privacidad y captura - 20 de octubre de 2026

## Estado bloqueado para captura real

`/privacidad/` es una pagina estatica consultable, claramente pendiente de revision. No contiene una politica legal inventada ni aprobada. Se abre en otra pestana desde el formulario para conservar las respuestas transitorias. El consentimiento permanece desmarcado inicialmente.

Antes de activar captura, el responsable de Modulith debe confirmar:

- Razon social e identificacion tributaria; identidad del responsable del tratamiento.
- Domicilio, direccion, email y telefono reales de contacto.
- Persona o area y canal efectivo para ejercer derechos; procedimiento de atencion aprobado.
- Finalidades y alcance del tratamiento para la propuesta conceptual; texto de autorizacion aprobado.
- Proveedores de almacenamiento, generacion y correo; ubicaciones y transferencias aplicables.
- Conservacion, eliminacion, controles de acceso y proteccion.
- Version, vigencia y aprobacion final de la politica y el consentimiento.

Referencia institucional, no sustituto de revision juridica: [SIC: identificacion del responsable y cambios de politica](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/boletin/cambios-sustanciales-en-politica-de-tratamientos-de-datos-personales).

## Formulario preparado, no operativo

Nombre, correo, telefono con indicativo, municipio, departamento y consentimiento son obligatorios. El telefono comienza en `+57` y admite otros indicativos. Se valida formato internacional de 8 a 15 digitos; para `+57`, diez digitos nacionales. Esto comprueba formato, no existencia, titularidad ni disponibilidad en WhatsApp. Referencia: [CRC: esquema colombiano de diez digitos](https://www.crcom.gov.co/es/noticias/comunicado-prensa/inicia-implementacion-definitiva-nuevo-esquema-numeracion-y-marcacion).

No hay catalogo geografico de Colombia en el proyecto. Se mantienen campos libres requeridos, de 2 a 80 caracteres y al menos una letra, precargados desde la pregunta 3 cuando existe respuesta. No se inventan listas ni se afirma validar un municipio contra DIVIPOLA. La ubicacion confirmada en contacto es la que recibe el contrato estructurado, sin cambiar preguntas ni algoritmo de resultados.

`quiz-transport.js` es un adaptador inerte: siempre devuelve `disabled`, incluso con parametros locales de simulacion o flags alterados. No hace fetch, no guarda datos, no genera referencias ficticias ni confirma recepcion. El formulario solo valida en memoria durante la pagina abierta. No hay localStorage, sessionStorage, envio a analytics ni PII en URL. No usar datos reales para la revision.

El contrato `ProposalRequest` queda preparado con telefono y ubicacion obligatorios. Una integracion futura exige reemplazar el adaptador inerte y validar todo tambien en servidor; cambiar flags no activa el formulario. Backend, politica y canales reales siguen pendientes de aprobacion y pruebas.
