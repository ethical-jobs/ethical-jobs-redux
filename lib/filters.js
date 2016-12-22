'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterEntitiesByOrgId = filterEntitiesByOrgId;
exports.filterJobsByType = filterJobsByType;

var _jobTypes = require('jobTypes');

/**
 * Returns entities filtered by {organisationId}
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function filterEntitiesByOrgId(entity, organisationId) {
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

function filterJobsByType(job, jobType) {
  switch (jobType) {
    case _jobTypes.APPROVED:
      return job.get('status') === _jobTypes.APPROVED && job.get('expired') === false;
    case _jobTypes.PENDING:
      return job.get('status') === _jobTypes.PENDING && job.get('expired') === false;
    case _jobTypes.EXPIRED:
      return job.get('expired') === true;
    default:
      return true;
  }
}