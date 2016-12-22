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

const usersSelector = createSelector(
  rootSelector,
  (root) => root.getIn(['entities','users'])
);

const organisationByIdSelector = createSelector(
  [organisationsSelector, resultSelector],
  (organisations, result) => organisations.get(result.first().toString())
);

const organisationOwnerSelector = createSelector(
  [usersSelector, organisationByIdSelector],
  (users, organisation) => users.get(organisation.get('owner_id').toString())
);

export {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  organisationsSelector,
  usersSelector,
  organisationByIdSelector,
  organisationOwnerSelector,
};
