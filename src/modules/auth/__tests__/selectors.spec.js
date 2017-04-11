import Immutable from 'immutable';
import { response, error } from './_fixtures';
import Auth from 'modules/auth';

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
  const actual = Auth.selectors.rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice ', () => {
  expect(Auth.selectors.fetchingSelector(state)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.auth.get('result');
  const actual = Auth.selectors.resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('userSelector selector returns correct state slice', () => {
  const expected = state.auth.getIn(['entities','users']).first();
  const actual = Auth.selectors.userSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('userSelector selector returns a Map when state is empty', () => {
  const state = { auth: Immutable.fromJS({ result: [10] }) };
  const expected = Immutable.fromJS({});
  const actual = Auth.selectors.userSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('organisationSelector selector returns correct state slice', () => {
  const expected = state.auth.getIn(['entities','organisations']).first();
  const actual = Auth.selectors.organisationSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('organisationSelector selector returns a Map when state is empty', () => {
  const state = { auth: Immutable.fromJS({ result: [10] }) };
  const expected = Immutable.fromJS({});
  const actual = Auth.selectors.organisationSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});