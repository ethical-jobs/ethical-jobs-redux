import Immutable from 'immutable';
import { response, error } from 'app/__tests__/_fixtures';
import {
  rootSelector,
  fetchingSelector,
  taxonomiesSelector,
} from 'taxonomies/selectors';

const state = {
  entities: Immutable.fromJS({
    taxonomies: {
      fetching: true,
      error: false,
      taxonomies: {
        categories: [
          {
            id: 1,
            title: 'Administration',
            slug: 'administration'
          },
          {
            id: 2,
            title: 'Advocacy and Campaigns',
            slug: 'advocacy'
          },
        ],
        locations: [
          {
            id: 1,
            title: 'Melbourne',
            slug: 'VIC'
          },
          {
            id: 2,
            title: 'Regional VIC',
            slug: 'REGVIC'
          },
        ],
      },
    }
  }),
};

test('rootSelector returns correct state slice', () => {
  const expected = state.entities.get('taxonomies');
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('taxonomies selector returns correct state slice', () => {
  const expected = state.entities.getIn(['taxonomies','taxonomies']);
  const actual = taxonomiesSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

