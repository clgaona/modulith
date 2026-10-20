export type Intent = 'design_build' | 'have_design' | 'find_land' | 'explore';
export type Land = 'owned' | 'buying' | 'searching' | 'none';
export type Design = 'none' | 'references' | 'preliminary' | 'advanced';
export type Timing = 'soon' | '3_6' | '6_12' | 'later';
export type Floors = 'one' | 'two' | 'unsure';
export type Bedrooms = 'one_two' | 'three' | 'four' | 'five_plus';
export type AreaBand = 'under_100' | '100_150' | '150_220' | 'over_220' | 'unsure';
export type Style = 'contemporary' | 'minimal' | 'warm' | 'industrial' | 'unsure';
export type Material = 'concrete' | 'wood' | 'stone' | 'metal_glass';
export type MaterialSelection = [Material] | [Material, Material] | ['unsure'];
export type AssetKind = 'concept_render' | 'concept_plan' | 'initial_route';

export interface HouseBrief {
  schema_version: 'modulith-house-brief-v1';
  intent: Intent;
  land: Land;
  location: { municipality: string; department: string } | null;
  design: Design;
  timing: Timing;
  program: { floors: Floors; bedrooms: Bedrooms; area_band: AreaBand };
  style: Style;
  materials: MaterialSelection;
  requested_assets: ['concept_render', 'concept_plan', 'initial_route'];
}

export interface ProposalRequest {
  schema_version: 'modulith-proposal-request-v1';
  attempt_id: string;
  brief: HouseBrief & { location: NonNullable<HouseBrief['location']> };
  contact: { name: string; email: string; whatsapp: string };
  consent: { authorized: true; version: string | null };
}

export interface ProposalReceipt {
  reference: string;
  status: 'received';
}

export type ProposalJob =
  | { status: 'awaiting_lead' | 'received' | 'queued' | 'generating' | 'failed'; assets?: never }
  | { status: 'ready'; assets: ReadonlyArray<{ kind: AssetKind; privateAssetId: string }> };

// Future SERVER interfaces only. No provider SDK or browser generation is implemented.
export interface ProposalBackend {
  submit(request: ProposalRequest): Promise<ProposalReceipt>;
  status(reference: string, accessToken: string): Promise<ProposalJob>;
}
export interface ConceptGenerator {
  render(brief: HouseBrief): Promise<{ bytes: Uint8Array; mimeType: string }>;
  plan(brief: HouseBrief, renderAssetId: string): Promise<{ bytes: Uint8Array; mimeType: string }>;
}
export interface PrivateAssetStore {
  save(reference: string, kind: AssetKind, bytes: Uint8Array, mimeType: string): Promise<string>;
  authorizedDownload(assetId: string, accessToken: string): Promise<{ url: string; expiresAt: string }>;
}
export interface ProposalDelivery {
  send(reference: string, recipient: ProposalRequest['contact']): Promise<void>;
}
