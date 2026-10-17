import { directions, heroHeadlines, type DirectionId, type HeadlineId } from '../config/site';

export interface PreviewVariant { direction: DirectionId; headline: HeadlineId }

export function resolveVariant(direction?: string, headline?: string): PreviewVariant {
  return {
    direction: Object.hasOwn(directions, direction ?? '') ? direction as DirectionId : 'editorial',
    headline: Object.hasOwn(heroHeadlines, headline ?? '') ? headline as HeadlineId : 'claridad',
  };
}

export function variantUrl(direction: DirectionId, headline: HeadlineId) {
  return `/preview/${direction}/${headline}/`;
}
