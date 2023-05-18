export const MAX_LIMIT = 2147483647;

/**
 * Returned from GET /groups v15.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-users/r/groups.html#groups_get
 */
export interface PatronGroupResponse {
  totalRecords: number;
  usergroups: PatronGroupDTO[];
}

/**
 * Returned as part of GET /groups v15.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-users/r/groups.html#groups_get
 */
export interface PatronGroupDTO {
  /** Unique UUID for this group */
  id: string;
  /** Unique, human-readable name of this group (e.g. "staff" or "undergraduate") */
  group: string;
  /** A description of the group's members */
  desc?: string;

  // don't care about these
  expirationOffsetInDays?: number;
  metadata?: unknown;
}

/**
 * Returned as part of GET /service-points v3.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/service-point.html
 */
export interface ServicePointResponse {
  servicepoints: ServicePointDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /service-points v3.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/service-point.html
 */
export interface ServicePointDTO {
  /** Unique UUID for this service point */
  id: string;
  /** Human-displayed name for this service point */
  name: string;
  code: string;
  discoveryDisplayName: string;

  // don't care about these
  staffSlips: unknown[];
  metadata: unknown;
}
