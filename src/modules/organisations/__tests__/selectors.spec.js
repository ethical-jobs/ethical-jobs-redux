import Immutable from 'immutable';
import {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  usersSelector,
  organisationsSelector,
  organisationByIdSelector,
  organisationOwnerSelector,
} from 'organisations/selectors';

const state = {
  entities: Immutable.fromJS({
    organisations: {
      fetching: true,
      error: false,
      filters: {},
      result: Immutable.Set([1, 2, 3]),
      entities: Immutable.fromJS({
        organisations: {
          1: { id: 1, name: "Bayside City Council", "credit_balance": 0 },
          2: { id: 2, name: "City of Greater Geraldton ", "credit_balance": 0 },
          3: { id: 3, name: "Karralika Programs", "credit_balance": 0 },
        },
        users: {
          11: { id: 11, first_name: "Andrew McLagan" },
          22: { id: 22, first_name: "Hugh Jass" },
        },
      }),
    }
  }),
};

test('rootSelector returns correct state slice ', () => {
  const expected = state.entities.get('organisations');
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('querySelector returns correct state slice', () => {
  const expected = state.entities.getIn(['organisations','query']);
  const actual = querySelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  const expected = state.entities.getIn(['organisations','filters']);
  const actual = filtersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['organisations','result']);
  const actual = resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('organisationsSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['organisations','entities','organisations']);
  const actual = organisationsSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('organisationByIdSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['organisations','entities','organisations']).first();
  const actual = organisationByIdSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});
