import { createSelector } from 'reselect';
import { Map } from 'immutable';

const rootSelector = (state) => state.auth;

const fetchingSelector = (state) => state.auth.get('fetching');

const resultSelector = (state) => state.auth.get('result');

const userSelector = createSelector(
  [rootSelector, resultSelector],
  (auth, result) => auth.getIn(['entities','users'], Map())
    .get(result.first().toString(), Map())
);

const organisationSelector = createSelector(
  [rootSelector, userSelector],
  (auth, user) => auth.getIn(['entities','organisations'], Map())
    .get(user.get('organisation_id', '').toString(), Map())
);

export {
  rootSelector,
  fetchingSelector,
  resultSelector,
  userSelector,
  organisationSelector,
};
