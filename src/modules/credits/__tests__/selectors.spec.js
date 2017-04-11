import Immutable from 'immutable';
import { response, error } from 'modules/app/__tests__/_fixtures';
import Credits from 'modules/credits';

const state = {
  entities: Immutable.fromJS({
    credits: {
      fetching: true,
      error: false,
      creditPacks: [
        {
          id: 1,
          price: 110,
          service_type: 'REGULAR',
        },
        {
          id: 2,
          price: 130,
          service_type: 'MANAGED',
        },
      ],
    }
  }),
};

test('rootSelector returns correct state slice ', () => {
  const expected = state.entities.get('credits');
  const actual = Credits.selectors.rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(Credits.selectors.fetchingSelector(state)).toBe(true);
});

test('creditPacks selector returns correct state slice', () => {
  const expected = state.entities.getIn(['credits','creditPacks']);
  const actual = Credits.selectors.creditPacksSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

