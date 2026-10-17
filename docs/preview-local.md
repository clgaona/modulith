# Preview local persistente

Configurada: 2026-10-15.

URL del homepage: http://127.0.0.1:4317/index.html

La preview aprobada usa el servidor Node de:
`C:\Users\CRISTIAN\.codex\.chatgpt-projects\g-p-6ac3c74ed79c81919acc3c861c305719\creative-sprint\round-1\preview-server.cjs`

Ese servidor sirve la carpeta `prototype` contigua. No es el servidor Astro de la raiz Desktop/Modulith. No se modificaron el servidor, el diseno ni el contenido para esta reparacion.

## Arranque y recuperacion

- Tarea programada de Windows: `Modulith Preview 4317`.
- Se inicia al entrar el usuario CRISTIAN en Windows, sin privilegios de administrador y sin ventana visible.
- Supervisor: `scripts/preview-supervisor.ps1`.
- Revisa cada 20 segundos la pagina y vuelve a iniciar Node si se detiene.
- Windows reinicia el supervisor tras un fallo, con intervalo de un minuto.
- Sin limite de duracion de tarea ni restriccion por bateria.
- Solo escucha en 127.0.0.1. No hay publicacion ni apertura de puertos externos.
- No depende de mantener Codex ni una terminal abiertos. Requiere que los archivos fuente y el runtime Node sigan disponibles en sus rutas.
- La excepcion de ExecutionPolicy se limita a los procesos PowerShell de estos scripts. No se cambio la politica global de Windows.

## Diagnostico

En PowerShell:

```powershell
Get-ScheduledTask -TaskName 'Modulith Preview 4317'
Start-ScheduledTask -TaskName 'Modulith Preview 4317'
Invoke-WebRequest 'http://127.0.0.1:4317/index.html' -UseBasicParsing
```

Registros: `artifacts/preview/supervisor.log`, `server.log`, `server-error.log`.

Para desactivar este arranque, deshabilitar la tarea en el Programador de tareas. Para detener tambien la instancia actual, detener la tarea y el proceso Node verificado de esta preview. No finalizar otros procesos Node.

## Verificacion realizada

- Puerto inicial sin listener; era la causa de ERR_CONNECTION_REFUSED.
- Tarea registrada y en estado Running, trigger de logon, usuario limitado.
- HTTP 200 con el HTML esperado.
- Se detuvo solo el proceso verificado del servidor: PID 11384.
- El supervisor lo recupero como PID 10592; HTTP 200 nuevamente.
- Homepage cargado en navegador integrado; captura `artifacts/preview/restaurada-2026-10-15.jpg`.
- No se reinicio Windows durante esta prueba. El arranque en la siguiente sesion queda configurado mediante el trigger registrado.
