import { createSelector } from 'reselect';

const rootSelector = (state) => state.getIn(['entities','organisations']);

const fetchingSelector = (state) => state.getIn(['entities','organisations','fetching']);

const querySelector = (state) => state.getIn(['entities','organisations','query']);

const filtersSelector = (state) => state.getIn(['entities','organisations','filters']);

const resultSelector = (state) => state.getIn(['entities','organisations','result']);

const organisationsSelector = createSelector(
  rootSelector,
  (root) => root.getIn(['entities','organisations'])
);

const organisationByIdSelector = createSelector(
  [organisationsSelector, resultSelector],
  (organisations, result) => organisations.get(result.first().toString())
);

export {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  organisationsSelector,
  organisationByIdSelector,
};
