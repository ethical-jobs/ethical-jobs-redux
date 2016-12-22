import { createSelector } from 'reselect';

const rootSelector = (state) => state.auth;

const fetchingSelector = (state) => state.auth.get('fetching');

const resultSelector = (state) => state.auth.get('result');

const userSelector = createSelector(
  [rootSelector, resultSelector],
  (auth, result) => auth.getIn(['entities','users']).get(result.first().toString())
);

const organisationSelector = createSelector(
  [rootSelector, userSelector],
  (auth, user) => auth.getIn(['entities','organisations']).get(user.get('organisation_id').toString())
);

export {
  rootSelector,
  fetchingSelector,
  resultSelector,
  userSelector,
  organisationSelector,
};
