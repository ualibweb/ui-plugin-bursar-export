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
