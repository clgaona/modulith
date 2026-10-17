# Frontera de analytics (Fase 6)

Los componentes utilizarán un adaptador de eventos con allowlist; no importarán Plausible directamente. Plausible es el default reemplazable, no una dependencia de render ni de contacto. Fases 1–2 no cargan trackers ni envían eventos. El build estático de feedback no necesita variables de entorno; las variables de una integración futura se documentarán en `.env.example` al implementarla.
