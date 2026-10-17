# Modulith — Build Spec MVP

Fecha: 7 de octubre de 2026. Versión: cierre 1.0. Estado: para aprobación del PHASE 2 DECISION GATE. **Especificación, sin código de producción.**

## 1. Objetivo y alcance

Publicar pronto un website profesional para explicar la oferta modular, ayudar a preparar decisiones y generar conversaciones atendibles. La calidad P0 se concentra en contenido claro, identidad consistente, móvil, accesibilidad, contacto fiable y aprendizaje comercial. No automatizar el negocio para lanzar el website.

| Prioridad | Incluye |
|---|---|
| **P0 — lanzamiento** | Inicio; servicios en una página; Content Hub con dos pilares y un artículo; quiz de cuatro decisiones con resultado local; contacto directo; privacidad; 404; diseño estático; SEO técnico; seguimiento comercial manual y atribución voluntaria. |
| **P1 — aprendizaje siguiente** | Video hero; páginas independientes de servicios cuando tengan contenido propio; siguientes cuatro clusters; CMS visual si el flujo editorial lo exige; medición de eventos con proveedor revisado; nurturing consentido; integración CRM y agenda; ampliación del quiz solo con utilidad demostrada; primeros casos reales autorizados. |
| **P2 — evolución** | Portal de cliente; gestión digital del pool/concursos; pagos online; estimaciones calibradas con datos propios; catálogo aprendido; personalización persistente y estudios agregados. |

El piloto multi-arquitecto puede probarse manualmente sin construir software P1/P2. Su especificación está en la síntesis. P0 no incluye publicación de convocatoria ni captura de propuestas.

## 2. Páginas, rutas y navegación

| Ruta P0 | Propósito y contenido | Acción |
|---|---|---|
| `/` | Servicio y valor; entradas del cliente; etapas; ejemplo didáctico; método/confianza; tres guías; FAQ; cierre | Contacto principal, quiz secundario. |
| `/servicios/` | Orientación, diagnóstico opcional, diseño, coordinación/presupuesto, permisos y construcción; entregables, límites y entradas | Contacto con etapa precargada. |
| `/guias/` | Hub «Guías para construir»; introducción y tres recursos clasificados | Leer, sin captura. |
| `/guias/presupuesto-completo/` | Pilar: rubros, alcance, estimación frente a cotización/contrato, cambios y preguntas | Comparación relacionada; contacto para presupuesto/planeación. |
| `/guias/preparar-lote/` | Pilar: búsqueda o lote controlado, documentos/vacíos, servicios, acceso y verificaciones profesionales | Quiz; contacto de orientación. |
| `/guias/comparar-cotizaciones/` | Apoyo: plantilla vacía de alcance y comparación equivalente | Pilar de presupuesto; contacto para revisión. |
| `/proximos-pasos/` | Quiz, revisión y resultado; alternativa estática accesible | Contacto opcional o guía. |
| `/contacto/` | Solicitud mínima, expectativa de revisión humana, cobertura y canal alternativo | Enviar solicitud. |
| `/privacidad/` | Identidad del responsable real, finalidades, terceros, conservación y derechos aprobados | Canal de derechos real. |
| URL inválida, HTTP 404 | Mensaje, enlace a inicio, guías y contacto | Recuperar navegación. |

Navbar desktop: Servicios, Guías, Contacto. Marca enlaza a inicio. Menú móvil desplegable con las mismas rutas y enlace al quiz. Footer: servicios, guías, próximos pasos, contacto y privacidad. No ruta de portfolio, catálogo, página geográfica ni newsletter vacíos.

Anclas de servicio: `#orientacion`, `#diagnostico`, `#diseno`, `#coordinacion`, `#permisos`, `#construccion`. CTA añade únicamente un enum público al contacto: `?servicio=diseno`, por ejemplo; nunca respuestas, contacto, presupuesto ni dirección en URL. Valores desconocidos se ignoran.

## 3. Contenido y copy P0

Inicio, orden fijo inicial:

1. Hero: «Tu casa empieza con decisiones claras.» Subtexto de la síntesis; CTA «Conversemos sobre tu proyecto» / «Ver mis próximos pasos».
2. Entradas: «Quiero diseñar», «Ya tengo un diseño», «Estoy buscando lote» y «Quiero organizar el proyecto completo». Destinos: diseño, construcción, guía de lote y servicios, respectivamente.
3. Oferta: «Puedes entrar en la etapa que necesitas». Explicar diseño → coordinación/planeación → permisos → construcción → entrega; etapas contratadas por separado y presupuesto iterativo.
4. Método: «Prioridades, alcance y responsabilidades visibles». Tres muestras didácticas: brief, registro de decisión y alcance incluido/excluido. Sin nombre de cliente, precio ficticio ni aspecto de contrato real.
5. Confianza: fundador y roles solo confirmados; honestidad sobre experiencia atribuida y etapa de la empresa. Si no hay credenciales autorizadas, sostener con método y límites; no insertar placeholders públicos.
6. Tres guías iniciales con títulos descriptivos, resumen y fecha.
7. FAQ y cierre de contacto.

Servicio de construcción: «Si ya tienes diseño, revisamos la documentación antes de acordar el alcance de construcción.» Cobertura: «Nuestra base es Medellín y el Valle de Aburrá. Evaluamos proyectos de construcción cercanos en Antioquia caso por caso y proyectos de diseño remoto en Colombia cuando sean viables.» Añadir: «Confirmamos disponibilidad y alcance después de revisar tu proyecto.» El contenido educativo tiene alcance nacional.

Modelo de servicio: «Modulith coordina las etapas que contrates y es tu interlocutor principal. Trabajamos con una red de profesionales y contratistas; cada especialidad tiene responsables definidos según el encargo.» No publicar capacidad interna, firma profesional ni modalidad contractual no confirmadas.

Configuración de cobertura P0, en un único dato editorial versionado: base operativa; zonas de construcción prioritarias; zona de evaluación cercana; alcance de diseño remoto; nota de viabilidad/disponibilidad; fecha de actualización. Valores iniciales: Medellín/Valle de Aburrá; Medellín/Valle de Aburrá; proyectos cercanos de Antioquia caso por caso; Colombia cuando viable. Inicio, servicios, FAQ, contacto y quiz leen esa misma configuración. Cambiarla no exige rediseñar páginas ni reescribir la lógica fundamental. No geocodificación, cálculo de radio ni rechazo automático P0.

Contacto: «Cuéntanos en qué etapa estás. Revisaremos tu solicitud para acordar si podemos atenderla y cuál sería el siguiente paso.» Sin SLA público hasta confirmar capacidad. Confirmación: «Recibimos tu solicitud. Revisaremos el encaje de tu proyecto y te responderemos por el canal elegido.» No confundir recepción con aceptación o cita.

FAQ de servicios: lote no obligatorio; etapas independientes; revisión de terceros; quiz educativo; cobertura diferenciada por etapa; costos/plazos por alcance; cambios documentados; interlocutor Modulith y responsabilidad técnica según especialidad y contrato. No anunciar múltiples propuestas incluidas, ahorro ni plazos garantizados.

## 4. Quiz P0: reglas completas

Versión `quiz-v1`. Cuatro preguntas, una por pantalla; avance explícito, atrás y revisión antes del resultado. Todas admiten incertidumbre. No contacto, presupuesto, documentos ni información financiera dentro del quiz.

| Paso | Pregunta | Opciones |
|---|---|---|
| 1 | ¿Qué necesitas ahora? | Orientación para empezar; diseño de mi vivienda; construcción con diseño existente; coordinación/presupuesto/permisos; diseño y construcción; aún no lo sé. |
| 2 | ¿En qué situación está el lote? | Tengo o comparto un lote; tengo un predio en negociación; estoy buscando; aún no lo sé. |
| 3 | ¿Dónde sería tu proyecto? | Municipio y departamento en dos campos opcionales; alternativa «Aún no he elegido». No dirección exacta ni coordenadas. |
| 4 | ¿Cuándo quisieras avanzar en la siguiente etapa? | Próximos 3 meses; entre 3 y 6; entre 6 y 12; más adelante; no tengo fecha. |

Intro: «Ordena tus próximos pasos sin dejar datos de contacto. Esta orientación no cotiza la vivienda ni verifica el lote.» No prometer duración hasta medirla. Localización no valida cobertura; no crear listas de municipios atendidos inexistentes.

Resultado determinista, tres pasos, primera regla coincidente:

| Condición | Tres próximos pasos |
|---|---|
| Buscando / lote desconocido | Definir necesidades y presupuesto global incluyendo compra; revisar condiciones de predios candidatos antes de comprometerse; conversar si existe una decisión de compra o preparación concreta. |
| Predio en negociación | Reunir información del predio y acordar verificaciones competentes; contrastar costo total y dudas antes de compra; definir si conviene una revisión profesional acotada. |
| Lote declarado + construcción con diseño | Reunir versiones, estudios y autorizaciones de uso del diseño; solicitar revisión técnica/documental y alcance; acordar ajustes y condiciones antes de contratar obra. |
| Lote declarado + diseño / diseño y construcción | Priorizar necesidades y objetivo económico; identificar datos/estudios faltantes del sitio; acordar alcance de diseño y decidir después siguientes etapas. |
| Lote declarado + coordinación | Inventariar documentos y decisiones existentes; precisar la coordinación/presupuesto/permisos requeridos; acordar revisión, responsables y entregable. |
| Lote declarado + orientación / no sé | Identificar qué se conoce del lote; ordenar necesidades y rubros de inversión; conversar para elegir orientación, revisión o diseño según información. |

El estado del lote prevalece sobre etapa solicitada: buscar lote no se convierte en listo para construir por seleccionar construcción. El resultado aclara que la entrada solicitada puede revisarse cuando exista predio. Horizonte solo añade una nota: próximos seis meses → preparar documentos para conversar; posterior/desconocido → avanzar con guías a su ritmo. No produce ICP/score definitivo. Municipio se muestra como declarado con escape seguro; no determina aceptación. Mostrar nota de cobertura desde la configuración común: diseño remoto viable en Colombia y construcción desde Medellín/Valle de Aburrá con proyectos cercanos de Antioquia evaluados. No rechazar por localización ni quitar valor educativo del resultado.

Cada paso indica motivo y responsable sugerido (cliente, profesional competente o Modulith tras encaje); guías relacionadas por lote o presupuesto. Botones: «Editar respuestas», «Consultar guías», «Conversemos sobre mi proyecto».

Respuestas en memoria de la sesión de página, sin localStorage, cookies ni envío parcial. Se conservan al avanzar/retroceder; recargar o cerrar reinicia, avisado en intro. El enlace al contacto lleva solo enum de servicio. No transportar resumen ni adjuntarlo automáticamente: el contacto puede completarse independientemente. «Aún no he elegido» limpia localización anterior. Cambio de respuesta recalcula sin acumulación de ramas.

Sin JavaScript/error de carga: en la misma ruta, checklist general accesible con los tres caminos lote/búsqueda/diseño existente, guías y contacto. No pantalla vacía ni promesa de resultado personalizado inexistente. Copia/PDF/email automático P1; P0 permite lectura y selección de texto normales.

## 5. Contacto y operación comercial

Formulario P0, misma entrada desde todas las páginas:

| Campo | Regla |
|---|---|
| Nombre de uso | Obligatorio, 2–80 caracteres; no pedir cédula. |
| Servicio | Enum del quiz; obligatorio, incluye «aún no lo sé»; precargado por query válida y corregible. |
| Estado del lote | Mismas cuatro opciones; obligatorio, sin verificación automática. |
| Localización | Municipio/departamento opcionales, máximo 80 caracteres cada uno; «aún no he elegido» permitido. |
| Canal preferido | Email o WhatsApp; obligatorio, solo un dato de contacto requerido. |
| Dato del canal | Email de formato válido o teléfono con indicativo; no inferir cuenta WhatsApp válida por formato. |
| Mensaje | Opcional, máximo 1000 caracteres; advertir no enviar documentos, datos financieros ni de otras personas. |
| Cómo nos conociste | Opcional: búsqueda, Cristianbuilder/redes, referido, otro, prefiero no responder. |
| Autorización de atención | Casilla obligatoria no premarcada, texto y versión aprobados; enlace a privacidad. No marketing ni suscripción. |

Validación de cliente y servidor; datos desconocidos permitidos, campos incompatibles del canal eliminado antes de enviar. No exigencia de presupuesto mínimo, financiación o lote para contactar. No subida de archivos.

Interfaz de integración para planificación técnica: `POST /api/contacto`, JSON con los campos anteriores, `form_version`, `consent_version` e identificador único del intento. El servidor controla fecha de recepción y texto legal asociado a versión. Un mismo intento reintentado no duplica solicitud. Solo acepta enums conocidos, longitudes, canal y autorización válidos; el navegador no decide si el registro es aceptable.

Estados: reposo → validando → enviando → recibido; o error de campo/error temporal. Éxito HTTP 201 para nueva solicitud y 200 para reintento ya aceptado; 422 errores asociados a campos, 429 exceso de solicitudes, 503 no disponible. Respuesta de éxito con referencia, sin devolver PII. Durante envío deshabilitar repetición pero conservar lectura; anuncio accesible del estado.

Éxito requiere escritura durable en repositorio privado, no solo intento de notificación por email. Si aviso al responsable falla después de guardar, solicitud sigue recibida y pendiente de notificación/revisión. Si almacenamiento falla, responder error; conservar campos en página y permitir reintento con el mismo identificador. Mensaje: «No pudimos confirmar la recepción. Tus datos siguen en esta pantalla. Intenta de nuevo o usa el canal alternativo.» Nunca mostrar enviado antes de aceptación.

Antispam: campo señuelo accesible correctamente excluido, comprobación de origen, límites de envío y validación servidor; sin CAPTCHA visual obligatorio inicial. Limitar por señales técnicas sin rechazar presupuestos, territorios o perfiles. Logs y tokens no incluyen texto libre/contactos; revisar registros automáticos del host.

Canal alternativo P0: un email real visible y enlace de composición, configurable. WhatsApp externo se añade solo si hay número confirmado; mensaje genérico, sin respuestas/presupuesto en URL. Avisar salida a servicio externo; clic no equivale a solicitud recibida. El canal alternativo nunca se inventa.

Operación manual: un responsable de Modulith revisa nuevas solicitudes cada día hábil; objetivo interno inicial de respuesta en dos días hábiles, sin promesa pública. Estados: nueva, revisión, aclaración, conversación acordada, conversación realizada, propuesta, contratada, pospuesta, no atendible, cerrada. Cada registro mantiene responsable, siguiente acción/fecha, motivo y origen declarado. Clasificación A/B/C por revisión humana de lote, intención, fondos discutidos y horizonte; B puede ser oportunidad. No score automático ni rechazo por ausencia de lote. En proyectos activos, Modulith asigna coordinador, centraliza comunicación y registro de decisiones y coordina especialistas externos; las firmas y obligaciones técnicas se asignan a responsables habilitados y se acuerdan antes de contratar, sin trasladar al cliente la coordinación de proveedores.

Modelo mínimo privado: solicitud/contacto separado de proyecto/oportunidad mediante IDs internos; relación manual si un hogar hace varias consultas. Registrar contratación por servicio; solicitud de obra no es obra contratada. No necesita UI propia de CRM: repositorio exportable y registro comercial con acceso restringido, herramientas concretas elegidas en planificación técnica.

## 6. Content Hub, datos editoriales y SEO

Contenido P0 en Markdown con metadatos, revisión y control de versiones; sin CMS visual. Editor prepara/corrige, profesional revisa asuntos sensibles cuando existan y fundador aprueba publicación. CMS P1 únicamente si este flujo impide operar.

Campos por artículo: título, slug estable, descripción, cluster, tipo pilar/apoyo, autor, revisor cuando corresponda, fecha de publicación, fecha de actualización real, fuentes con enlace/fecha/contexto, guías relacionadas y servicio pertinente. Imágenes opcionales con alt, procedencia y licencia. Borradores excluidos de build/sitemap; no autor o revisor ficticio.

Tres briefs de lanzamiento:

- **Presupuesto completo:** respuesta inicial sin cifra nacional; tabla de rubros (terreno separado, diseño/estudios, trámites, obra, conexiones/exteriores, contingencias); diferencia entre estimación, oferta y contrato; preguntas de alcance; enlaces a comparación y lote.
- **Preparar el lote:** diferencia búsqueda/control; inventario de información, uso y restricciones por comprobar, acceso/servicios, necesidades y recursos; fuentes ya disponibles cuando sean pertinentes; no declarar viabilidad de un predio ni simplificar licencias por sistema.
- **Comparar cotizaciones:** misma área/alcance/fecha/etapa; tabla vacía para incluir/excluir/por confirmar; responsabilidades, cambios y dependencias; enlace al pilar de presupuesto y coordinación.

No son artículos ya redactados ni investigación adicional autorizada: la implementación prepara texto útil con material existente. Si una afirmación requiere comprobación normativa no disponible, retirarla o limitarse a indicar la verificación necesaria; no bloquear los tres recursos por incluir asesoría jurídica innecesaria. No páginas vacías, texto SEO repetido ni tarifas de competidores trasladadas a Modulith.

SEO P0: HTML principal legible sin JS, un H1 por página, titles/descriptions únicos, canonical absoluto, OG, sitemap de rutas públicas, robots y 404 reales. URLs con slash final y una sola variante canónica; redirect 301 si se cambia slug. Dominio final de configuración, nunca dominio ficticio indexable. Preview protegido o noindex; producción indexable.

Schema solo fiel a lo visible: Organization con identidad confirmada; Article y BreadcrumbList en guías. Autoría enlaza al bloque identificable de autor; revisor visible cuando aplica. Sin ratings, premios ni LocalBusiness con dirección/cobertura inventada. FAQ no requiere rich result para cumplir P0. No prometer indexación/citas IA; no generar archivos especiales para IA en P0. Noindex para `/proximos-pasos/`, `/contacto/` y `/privacidad/`, excluidas del sitemap editorial; siguen navegables. Resultado del quiz nunca se publica como URL personal.

Siete clusters disponibles como taxonomía; P0 no crea hubs vacíos para los restantes. Cada guía enlaza a su pilar o apoyo, una dependencia relacionada y el servicio. Cristianbuilder distribuye interpretación con enlace a recurso canónico; no duplica automáticamente el texto.

## 7. Móvil, accesibilidad y medios

Aplicar dirección de `05_UI_BRAND_CREATIVE_DIRECTION.md`. Rangos: hasta 767 px una columna; 768–1199 composición intermedia; 1200+ contenedor 1200 px. Sin cambios de lógica entre tamaños. Testear 320, 390, 768 y 1440 px; sin desbordamiento horizontal ni acciones ocultas al abrir teclado. Tablas de alcance se presentan como filas apiladas en móvil con etiquetas, conservando relaciones semánticas.

Objetivo WCAG 2.2 AA: teclado, foco, skip link, etiquetas, errores asociados, live regions de envío/resultado, contraste y reflujo/zoom. Touch cómodo de 44 px; nada esencial depende de hover/color. Quiz no autoavanza al marcar; FAQ/menu con estado expandido. No declarar conformidad por test automático aislado.

P0 hero estático y rótulo de concepto; recurso responsive con tamaños explícitos para evitar saltos. Servir formatos modernos y fallback compatible. Cargar prioritariamente el recurso LCP, diferir imágenes inferiores. Presupuesto orientativo: hero móvil ≤200 KB, total de imágenes iniciales ≤350 KB, JS inicial comprimido ≤80 KB fuera de interacción; justificar desvíos con medición. No video ni librería de animación P0; fuentes limitadas/autoalojadas con fallbacks.

Objetivos de referencia heredados de Research: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 en p75 móvil cuando exista muestra de campo. Antes del lanzamiento medir laboratorio en dispositivo/red documentados; no afirmar CWV de campo a partir de laboratorio. Priorizar texto, CTA y contacto ante medios fallidos.

## 8. Medición, privacidad y seguridad

P0 no requiere proveedor de trackers para lanzar. Aprendizaje mínimo desde registro comercial: solicitudes válidas por origen declarado, etapa, A/B/C revisados, conversaciones realizadas, siguiente acción, propuestas, servicios contratados, horas de respuesta y motivos de pausa/pérdida. Reportar número, denominador y periodo; no atribución causal de último clic. No usar clic WhatsApp como lead ni quiz como lead.

Después de publicar, verificar Search Console con propiedad/dominio reales para rastreo e impresiones/clics disponibles. Sin cuenta/credenciales, queda tarea operativa pendiente; no inventar reportes. Revisar semanalmente y ajustar quincenalmente copy/preguntas según confusión recurrente; no decidir ganadores estadísticos con pocas solicitudes.

P1 define instrumentación: `cta_click`, `quiz_start`, `quiz_step_view`, `quiz_complete`, `contact_submit_success`, `contact_submit_error`, `guide_to_service`. Solo page ID, posición CTA, paso numérico, versión quiz y error enumerado; no municipio, presupuesto, texto libre, respuesta, email, teléfono ni identificadores CRM. Implementar adaptador tras aprobar proveedor, finalidad y controles de consentimiento; este retraso no impide aprender comercialmente en P0. No prometer medir abandonos del quiz antes de instrumentarlo.

P0: quiz sin persistencia; contacto solo para atender solicitud; sin newsletter, retargeting, campañas automáticas ni recuperación de abandonos. Política de datos real antes de activar captura: responsable e identidad legal, contacto de derechos, finalidades, proveedores/transferencias aplicables, seguridad y conservación. `privacidad.md` no existe en fuentes; el texto público no se puede considerar previamente aprobado.

Default propuesto para solicitudes sin contratación: revisión a los 90 días y eliminación/anonimización si no hay gestión pendiente o finalidad justificable; cliente activo/obligaciones se rigen por calendario aprobado aparte. Esta propuesta no es una conclusión legal. Confirmar calendario y proveedores antes de captura real; no publicar plazos genéricos como ley. Autorización de atención no equivale a marketing; derechos de acceso/corrección/supresión por canal real y revisión humana.

Repositorio privado, acceso limitado, cifrado en tránsito, secretos solo servidor, respaldo y recuperación de datos mínimos. No archivos públicos con leads ni PII en logs/analytics/URLs. Captura no usa envío directo al email como única evidencia durable. Proveedores y host pueden registrar datos técnicos: revisar configuración y política antes de activar producción.

## 9. Tecnología y condiciones de publicación

**Recomendación provisional: Astro**, páginas prerenderizadas, contenido Markdown y una interacción local de quiz. Un endpoint de contacto con almacenamiento privado requiere runtime/adaptador o backend compatible; no asumir que hosting estático acepta POST por sí solo. El resto de páginas sigue estático. Hosting, almacenamiento y notificaciones se seleccionan en planificación técnica contra esta interfaz mínima; no se necesitan compras para aprobar Fase 2.

Evidencia disponible: `sources/tecnologia.md` y Research consolidado §11. No se ha ejecutado prueba técnica. Next.js no tiene requisito P0 diferencial identificado; Sites no tiene compatibilidad/cuenta/integración verificadas. No reabrir comparativa completa mientras este alcance se mantenga. Stack definitivo y host se confirman antes del handoff de implementación mediante adecuación del endpoint/datos, dominio y mantenimiento, sin alterar el producto.

Se puede construir con defaults y variables de configuración. Para publicar captura real hacen falta: canal alternativo y responsable activos; identidad/política y conservación aprobadas; backend durable probado; fuentes/autoría/licencias reales. Si esos datos faltan, preview puede revisarse con datos sintéticos y captura desactivada; no publicar formularios simulados. La base y cobertura están definidas; confirmar disponibilidad y responsables del encargo antes de ofertar servicio u obra. Tarifas y SLA públicos no son necesarios para P0. Mensaje, hero, CTA, cuatro preguntas y priorización editorial pueden lanzarse como hipótesis: pruebas comerciales amplias no son requisito previo.

## 10. Acceptance criteria y checklist de handoff

| ID | Escenario | Aceptación |
|---|---|---|
| AC01 | Visitante móvil desde Search/social | Entiende servicio y etapas; llega a contacto sin quiz ni video obligatorio. |
| AC02 | A con diseño externo | Encuentra revisión previa y contacto de construcción; no recibe promesa de aceptación automática. |
| AC03 | B sin lote / C sin fecha | Puede leer, completar quiz y contactar; resultado respeta estado, sin exclusión automática. |
| AC04 | Quiz con todas las incertidumbres | Obtiene tres pasos generales sin datos personales, precio, score ni sistema recomendado. |
| AC05 | Cambia lote, canal o servicio | Resultado recalculado; localización incompatible y dato del canal anterior eliminados; nueva elección visible. |
| AC06 | Sin JS, fuente o imagen | Texto, guías y contacto alternativo funcionan; quiz muestra checklist; formulario informa alternativa si requiere JS. |
| AC07 | Campo inválido / servidor caído | Error concreto y accesible, conserva campos y no afirma recepción. Reintento no duplica. |
| AC08 | Guardado correcto, aviso fallido | Solicitud existe durablemente y responsable puede revisarla; no se pierde por email fallido. |
| AC09 | Privacidad | No trackers P0, quiz no transmite respuestas; contacto no suscribe; ningún lead en código/URL/logs públicos. |
| AC10 | Guías y SEO | Tres piezas completas con autor, fechas/fuentes cuando proceden, enlaces y HTML; canonical/sitemap/404 correctos. |
| AC11 | Visual y honestidad | Concepto rotulado; no portfolio, cifras, credenciales, aliados o prueba social sin evidencia. |
| AC12 | Teclado y lector | Navegación, FAQ, quiz/form y errores usables; foco visible, zoom/reflujo sin pérdida de acciones. |
| AC13 | Rendimiento | Medición de laboratorio documentada por página/teléfono; medios no bloquean lectura/CTA; desvíos justificados y corregidos si afectan tarea. |
| AC14 | Aprendizaje real | Responsable registra solicitud, origen, siguiente acción y resultado; distingue recibida, conversación y contrato. |
| AC15 | Cambia cobertura | Una edición de configuración actualiza inicio, servicios, FAQ, contacto y nota del quiz; no cambia rutas ni excluye lectores nacionales. |
| AC16 | Cliente con varios especialistas | Encuentra un interlocutor Modulith; propuesta separa coordinación de responsables técnicos y no exige al cliente coordinar proveedores. |

Pruebas funcionales necesarias durante implementación: matriz de seis ramas del resultado, cambios, validación servidor, idempotencia y fallos de almacenamiento/notificación. Revisión manual de teclado/lector, teléfonos y contenido; verificaciones técnicas de enlaces, SEO y contraste. No se han ejecutado: esto es criterio de construcción, no reporte de tests.

Comprobación cualitativa de lanzamiento: cinco personas con tareas de comprender servicio, distinguir concepto, hallar entrada con/sin lote y solicitar conversación. Corregir bloqueos críticos; opiniones sobre estilo alimentan iteración, no detienen indefinidamente el MVP. Pruebas comerciales amplias, multivariantes o producción de docenas de artículos no son condición de lanzamiento.

Handoff posterior debe recibir estos cuatro documentos, acceso a fuentes, decisiones del gate, configuración real de contactos/datos y backlog P1/P2. No desarrollar ni publicar automáticamente al entregar este Build Spec.
