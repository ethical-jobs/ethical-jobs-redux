import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const rootSelector = state => state.getIn(['entities','jobs']);

export const fetchingSelector = state => state.getIn(['entities','jobs','fetching']);

export const errorSelector = state => state.getIn(['entities','jobs','error']);

export const filtersSelector = state => state.getIn(['entities','jobs','filters']);

export const resultSelector = state => state.getIn(['entities','jobs','result']);

export const jobsSelector = state => state.getIn(['entities','jobs','entities','jobs']);

export const jobByIdSelector = createSelector(
  [jobsSelector, resultSelector],
  (jobs, result) => jobs.get(result.toString())
);

export const jobsByFiltersSelector = createSelector(
  [jobsSelector, filtersSelector],
  (jobs, filters) => selectByFilters(jobs, filters)
);

export const jobMediaSelector = createSelector(
  rootSelector,
  jobs => jobs.getIn(['entities','media'])
);
