import { createSelector } from 'reselect';

export const rootSelector = (state) => state.getIn(['entities','organisations']);

export const fetchingSelector = (state) => state.getIn(['entities','organisations','fetching']);

export const querySelector = (state) => state.getIn(['entities','organisations','query']);

export const filtersSelector = (state) => state.getIn(['entities','organisations','filters']);

export const resultSelector = (state) => state.getIn(['entities','organisations','result']);

export const organisationsSelector = (state) => state.getIn(['entities','organisations','entities','organisations']);

export const organisationByIdSelector = createSelector(
  [organisationsSelector, resultSelector],
  (organisations, result) => organisations.get(result.toString())
);
