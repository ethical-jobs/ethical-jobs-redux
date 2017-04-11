import Immutable from 'immutable';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const rootSelector = (state) => state.getIn(['entities','jobs']);

export const fetchingSelector = (state) => state.getIn(['entities','jobs','fetching']);

export const errorSelector = (state) => state.getIn(['entities','jobs','error']);

export const filtersSelector = (state) => state.getIn(['entities','jobs','filters']);

export const resultSelector = (state) => state.getIn(['entities','jobs','result'], Immutable.Set());

export const jobsSelector = createSelector(
  rootSelector,
  (jobs) => jobs.getIn(['entities','jobs'], Immutable.Map())
);

export const jobByIdSelector = createSelector(
  [jobsSelector, resultSelector],
  (jobs, result) => jobs.get(result.first().toString(), Immutable.Map())
  // Maybe we should make this either an integer || Set depending on the state?
  // We do need to sit and think practically how the "defaults" and non-values will work in the reducers...
);

export const jobsByFiltersSelector = createSelector(
  [jobsSelector, filtersSelector],
  (jobs, filters) => selectByFilters(jobs, filters)
);

export const jobMediaSelector = createSelector(
  rootSelector,
  (jobs) => jobs.getIn(['entities','media'])
);
