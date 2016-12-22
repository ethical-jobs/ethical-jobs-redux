import Immutable from 'immutable';
import { response, error } from 'auth/__tests__/_fixtures';
import {
  rootSelector,
  fetchingSelector,
  resultSelector,
  userSelector,
  organisationSelector,
} from 'auth/selectors';

const state = {
  auth: Immutable.fromJS({
    fetching: true,
    error: false,
    result: [10],
    entities: {
      users: {
        10: {
          "id": 10,
          "organisation_id": 8,
          "first_name": "Andrew",
          "last_name": "McLagan",
        }
      },
      organisations: {
        8: {
          "id": 8,
          "owner_id": 10,
          "uid": "EthicalJobs",
          "name": "EthicalJobs.com.au",
        },
      }
    },
  }),
};

test('rootSelector returns correct state slice', () => {
  const expected = state.auth;
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice ', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.auth.get('result');
  const actual = resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('userSelector selector returns correct state slice', () => {
  const expected = state.auth.getIn(['entities','users']).first();
  const actual = userSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('organisationSelector selector returns correct state slice', () => {
  const expected = state.auth.getIn(['entities','organisations']).first();
  const actual = organisationSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});
