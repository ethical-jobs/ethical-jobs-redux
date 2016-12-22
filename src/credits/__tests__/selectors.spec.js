import Immutable from 'immutable';
import { response, error } from 'app/__tests__/_fixtures';
import {
  rootSelector,
  fetchingSelector,
  creditPacksSelector,
} from 'credits/selectors';

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

test('rootSelector returns correct state slice', () => {
  const expected = state.entities.get('credits');
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('creditPacks selector returns correct state slice', () => {
  const expected = state.entities.getIn(['credits','creditPacks']);
  const actual = creditPacksSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

