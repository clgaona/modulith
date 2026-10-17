# Contacto: límite previsto para la Fase 5

No hay endpoint de captura ni base remota activada en Fases 1–2.

La integración posterior separará persistencia y notificación:

1. Validar y guardar la solicitud y su pendiente de notificación en una misma transacción D1. El identificador del intento tendrá unicidad.
2. Confirmar recepción después del commit. D1 es la fuente de verdad; el transporte de notificaciones nunca condiciona esta respuesta.
3. Intentar un aviso simple al responsable con referencia interna y sin texto libre ni datos de contacto. Un fallo conserva el pendiente para reintento.
4. Incorporar un procesador de pendientes al seleccionar el transporte en la Fase de Contacto. Notificación idempotente, con intentos y estado privados; sin depender de visitas diarias al panel.

El aviso no reemplaza el registro durable. El proveedor y los secretos se eligen en Fase 5. Esta decisión no añade cola, CRM, endpoint, cron ni email activo a la fase visual.
