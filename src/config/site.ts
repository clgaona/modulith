export const coverage = {
  base: 'Medellín y el Valle de Aburrá',
  construction: 'Medellín y el Valle de Aburrá',
  nearby: 'Proyectos cercanos en Antioquia, caso por caso',
  remoteDesign: 'Colombia, cuando sea viable',
  availability: 'Confirmamos disponibilidad y alcance después de revisar tu proyecto.',
  updatedAt: '2026-10-07',
} as const;

export const heroHeadlines = {
  claridad: 'Tu casa empieza con decisiones claras.',
  diseno: 'Una mejor manera de diseñar y construir tu casa.',
  tranquilidad: 'Construir tu casa no debería convertirse en otro trabajo.',
} as const;

export type HeadlineId = keyof typeof heroHeadlines;
export type DirectionId = 'editorial' | 'mineral';
export const directions: Record<DirectionId, { name: string; description: string }> = {
  editorial: {
    name: 'A · Editorial cálida',
    description: 'Marfil, verde profundo y títulos serif. Una voz arquitectónica cercana y pausada.',
  },
  mineral: {
    name: 'B · Mineral contemporánea',
    description: 'Caliza, azul tinta y títulos sans. Una voz más directa, gráfica y estructurada.',
  },
};

export const homeCopy = {
  intro: 'Diseño y construcción de vivienda, por etapas. Partimos de tus prioridades y de la información de tu proyecto para definir alcance, responsables y próximos pasos.',
  primaryCta: 'Conversemos sobre tu proyecto',
  secondaryCta: 'Ver mis próximos pasos',
  conceptCaption: 'Concepto ilustrativo. No corresponde a una obra construida por Modulith.',
};
