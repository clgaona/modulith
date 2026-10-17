# Modulith — UI, marca y dirección creativa

Fecha: 7 de octubre de 2026. Estado: propuesta de cierre para PHASE 2 DECISION GATE. No es un sitio implementado ni una validación con usuarios.

## Dirección elegida

**Arquitectura editorial contemporánea, cálida y precisa.** La aspiración aparece en las imágenes y la composición; la accesibilidad, en el lenguaje, la lectura y la facilidad para conversar. La tecnología se expresa mediante orden, trazabilidad y herramientas útiles, no mediante estética de software.

La marca vende diseño y construcción de vivienda con decisiones más claras. No debe parecer catálogo de prefabricados, inmobiliaria, infoproducto ni SaaS. Evitar contadores, badges ficticios, temporizadores, gradientes tecnológicos, tarjetas excesivas, renders sin identificar y titulares de lujo excluyente.

## Sistema visual de partida

Estas especificaciones son defaults de implementación, ajustables por problemas observados de lectura o contraste. No implican identidad visual registrada.

| Elemento | Decisión | Motivo |
|---|---|---|
| Fondo principal | Marfil `#F4F1EB` | Calidez, materialidad y menor sensación de plantilla corporativa. |
| Superficies | Blanco `#FFFFFF`; fondo secundario `#E8E2D8` | Separar lectura, formularios y muestras sin multiplicar tarjetas. |
| Texto | Carbón `#222620`; secundario `#50574D` | Lectura sobria, compatible con arquitectura editorial. |
| Acción principal | Verde profundo `#34463B`, texto blanco | Reconocible y tranquilo; no compite con la imagen. |
| Acento | Arcilla `#9B674B` | Detalle material; no usar como texto pequeño ni estado sin verificar contraste. |
| Borde | `#CEC7BD` | División editorial; no es color suficiente para identificar inputs por sí solo. |
| Foco | Contorno de 3 px `#1D5C83`, separación de 2 px | Estado inequívoco y visible en superficies claras; verificar también en botones oscuros. |
| Tipografía | Source Serif 4 para títulos; Inter para cuerpo y UI | Contraste entre voz arquitectónica y precisión funcional. Autoalojar WOFF2 con licencia conservada. |
| Fallbacks | Georgia para títulos; system-ui para cuerpo | El sitio sigue siendo legible si las fuentes fallan. |
| Forma | Radios de 4 px; sin sombras por defecto | Precisión y contención. La profundidad se construye con composición e imágenes. |

Usar solo pesos necesarios: serif 400 y sans 400/600. Cuerpo 17 px, interlínea 1,6; textos auxiliares 14 px como mínimo. H1 móvil 38–44 px, desktop 56–64 px; H2 móvil 28–32 px, desktop 38–44 px. No reducir texto para hacer caber titulares: permitir saltos naturales. Limitar lectura de artículos a 68 caracteres aproximados por línea.

Escala de espacio: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Márgenes móviles 20 px; separación de secciones 48–64 px. A partir de 768 px, márgenes 32 px; desde 1200 px, contenedor máximo 1200 px. Una columna móvil; dos cuando exista una relación útil, nunca para imponer el layout desktop. Grilla conceptual desktop de 12 columnas, gap 24 px.

## Jerarquía y componentes

- Header con marca textual Modulith si no existe logo autorizado; navegación breve y menú móvil con botón etiquetado. No inventar símbolo definitivo.
- Hero con título, explicación, CTA principal «Conversemos sobre tu proyecto», CTA secundario «Ver mis próximos pasos» y composición visual.
- Botón principal sólido; secundario con borde; enlace editorial subrayado. Altura táctil mínima de diseño 44 px. Una acción visual dominante por sección.
- Servicios como lista de etapas y entradas, con números discretos y divisores. Evitar una tabla horizontal de paquetes en móvil.
- Muestra del proceso: un brief didáctico, una decisión y su responsable. Rotular «Ejemplo ilustrativo del proceso»; nunca simular expediente de cliente.
- Tarjetas de guías: categoría, título, resumen y fecha. Imagen opcional; el texto debe sostener la navegación.
- FAQ con acordeones accesibles, encabezados y estado expandido; contenido incluido en el HTML.
- Inputs con etiqueta visible, ayuda bajo el campo y borde suficientemente contrastado. Error con texto e icono, no únicamente color. No usar placeholders como etiquetas.
- Quiz: una pregunta por pantalla, progreso «Paso 2 de 4», respuestas como controles etiquetados y botones explícitos para avanzar/retroceder.
- Resultado: resumen corregible, tres pasos y guías pertinentes. No mostrar puntuación comercial ni apariencia de certificación.

## Imágenes y hero

P0: composición estática idea → diseño → realidad. Sketch digital y visualización coherente de una misma vivienda, con encuadres que conserven su identidad. En móvil, imagen después de título y CTA; en desktop, texto a la izquierda e imagen a la derecha. Si no hay material autorizado, usar un sketch editorial original como único visual; no bloquear la construcción por falta de render.

Rótulo obligatorio junto al visual conceptual: **«Concepto ilustrativo. No corresponde a una obra construida por Modulith.»** Incluirlo en tamaño legible, no como texto oculto en hover. El alt describe el contenido visible; el rótulo se mantiene como texto real.

P1: transición sketch/tablet → visualización fotorealista. El estado final sigue siendo concepto salvo evidencia de obra. Video opcional, silencioso, controlable y secundario a texto/poster. Con reduced motion no se inicia movimiento; conexión lenta o error devuelve el estático. El P0 no depende de producir animación.

Dirección de imagen: luz natural, escala humana, relaciones interior/exterior, materiales plausibles y espacios habitables. Evitar mansiones como representación exclusiva del cliente, vidrio imposible, viviendas aisladas sin contexto y fotografías de terceros presentadas como propias. Toda imagen requiere procedencia y permiso/licencia antes de publicar.

## Responsive, movimiento y accesibilidad

En móvil, ningún componente exige hover, arrastre o reproducción de video. No usar carruseles P0. Menú: cierre por botón y Escape; devolver foco al disparador. Si es modal, gestionar foco y fondo inerte; si es desplegable, conservar navegación natural. Elegir desplegable simple en P0.

Transiciones de estado de 120–180 ms, sin animación por scroll ni parallax. Respetar reduced motion. No incluir CTA fijo P0: evita competir con formulario, teclado y lectura; contacto permanece en header y cierres contextuales.

Objetivo WCAG 2.2 AA para el recorrido completo: contraste de texto normal 4,5:1, texto grande 3:1; controles/foco comprobables, reflujo a 320 px, zoom 200 %, teclado y lector de pantalla. La paleta no equivale a conformidad: validar cada combinación y estado durante implementación.

## Aceptación de la dirección

La experiencia debe permitir explicar qué hace Modulith, elegir una etapa y contactar sin ver video. Probar reconocimiento de concepto frente a obra, legibilidad en teléfono y comprensión de CTA. La identidad se revisa por esas tareas, no por impacto visual aislado. No se han realizado estas pruebas.

Insumos: PRD; decisiones del fundador D1–D10; Research consolidado, secciones 6 y 10; `funnel_ux.md`. Esta dirección reemplaza la postergación anterior de Creative, sin convertir hipótesis de conversión en hechos.
