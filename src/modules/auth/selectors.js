import { createSelector } from 'reselect';
import Immutable from 'immutable';

const rootSelector = (state) => state.auth;

const fetchingSelector = (state) => state.auth.get('fetching');

const resultSelector = (state) => state.auth.get('result');

const userSelector = createSelector(
  [rootSelector, resultSelector],
  (auth, result) => auth.getIn(['entities','users'], Immutable.Map())
    .get(result.first().toString(), Immutable.Map())
);

const organisationSelector = createSelector(
  [rootSelector, userSelector],
  (auth, user) => auth.getIn(['entities','organisations'], Immutable.Map())
    .get(user.get('organisation_id', '').toString(), Immutable.Map())
);

export {
  rootSelector,
  fetchingSelector,
  resultSelector,
  userSelector,
  organisationSelector,
};
