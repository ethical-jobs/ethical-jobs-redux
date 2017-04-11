/**
 * Returns jobs filtered by {organisationId}
 *
 * @param {Map} job entity
 * @param {Number} organisation id
 * @returns {Bool}
 */

export function byOrganisationId(job, organisationId) {
  return !organisationId ? true : job.get('organisation_id') === organisationId;
}

/**
 * Returns jobs filtered by {status}
 *
 * @param {Map} job entity
 * @param {String} jobs status to filter
 * @returns {Bool}
 */

export function byStatus(job, status) {
  return !status ? true : job.get('status') === status;
}

/**
 * Returns jobs filtered by {expired}
 *
 * @param {Map} job entity
 * @param {Bool} true for expired
 * @returns {Bool}
 */

export function byExpiration(job, expiration) {
  return !expiration ? true : job.get('expired') == expiration;
}

/**
 * Returns jobs filtered by {taxonomy}
 *
 * @param {Map} job entity
 * @param {String} taxonomy key
 * @param {List} taxonomy terms
 * @returns {Bool}
 */

export function byTaxonomy(job, taxonomy, terms = []) {
  return !terms.length ? true : job.get(taxonomy).includes(terms);
}

/**
 * Filters job entities
 *
 * @param {Map} Jobs to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered job state.
 */

export default function selectByFilters(jobs, filters) {
  return jobs
    .filter(job => byOrganisationId(job, filters.get('organisationId')))
    .filter(job => byStatus(job, filters.get('status')))
    .filter(job => byExpiration(job, filters.get('expired')))
    .filter(job => byTaxonomy(job, 'categories', filters.get('categories')))
    .filter(job => byTaxonomy(job, 'locations', filters.get('locations')))
    .filter(job => byTaxonomy(job, 'sectors', filters.get('sectors')))
    .filter(job => byTaxonomy(job, 'workTypes', filters.get('workTypes')));
}
