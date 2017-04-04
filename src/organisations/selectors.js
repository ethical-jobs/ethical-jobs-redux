import { createSelector } from 'reselect';

const rootSelector = (state) => state.entities.get('organisations');

const fetchingSelector = (state) => state.entities.getIn(['organisations','fetching']);

const querySelector = (state) => state.entities.getIn(['organisations','query']);

const filtersSelector = (state) => state.entities.getIn(['organisations','filters']);

const resultSelector = (state) => state.entities.getIn(['organisations','result']);

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
