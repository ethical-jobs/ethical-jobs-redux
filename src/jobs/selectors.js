import { createSelector } from 'reselect';
import { filterEntitiesByOrgId, filterJobsByType } from '../filters';

const rootSelector = (state) => state.entities.get('jobs');

const fetchingSelector = (state) => state.entities.getIn(['jobs','fetching']);

const querySelector = (state) => state.entities.getIn(['jobs','query']);

const filtersSelector = (state) => state.entities.getIn(['jobs','filters']);

const resultSelector = (state) => state.entities.getIn(['jobs','result']);

const jobsSelector = createSelector(
  rootSelector,
  (jobs) => jobs.getIn(['entities','jobs'])
);

const jobByIdSelector = createSelector(
  [jobsSelector, resultSelector],
  (jobs, result) => jobs.get(result.first().toString())
);

const jobsByFiltersSelector = createSelector(
  [jobsSelector, filtersSelector],
  (jobs, filters) => jobs
    .filter(job => filterEntitiesByOrgId(job, filters.get('organisationId')))
    .filter(job => filterJobsByType(job, filters.get('jobType')))
);

const jobMediaSelector = createSelector(
  rootSelector,
  (jobs) => jobs.getIn(['entities','media'])
);

export {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  jobsSelector,
  jobByIdSelector,
  jobsByFiltersSelector,
  jobMediaSelector,
};
