import { APPROVED, PENDING, EXPIRED } from './jobTypes';

/**
 * Returns entities filtered by {organisationId}
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function filterEntitiesByOrgId(entity, organisationId) {
  if (!organisationId) {
    return true;
  }
  return entity.get('organisation_id') === organisationId;
}

/**
 * Returns jobs filtered by {jobType}
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function filterJobsByType(job, jobType) {
  switch (jobType) {
    case APPROVED:
      return job.get('status') === APPROVED && job.get('expired') === false;
    case PENDING:
      return job.get('status') === PENDING && job.get('expired') === false;
    case EXPIRED:
      return job.get('expired') === true;
    default:
      return true;
  }
}