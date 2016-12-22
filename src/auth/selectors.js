import { createSelector } from 'reselect';

const rootSelector = (state) => state.auth;

const fetchingSelector = (state) => state.auth.getIn(['jobs','fetching']);

const resultSelector = (state) => state.auth.getIn(['jobs','result']);

const userSelector = createSelector(
  rootSelector,
  (auth) => auth.getIn(['entities','users'])
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
