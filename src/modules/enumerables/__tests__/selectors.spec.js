import Immutable from 'immutable';
import { response, error } from 'modules/app/__tests__/_fixtures';
import Enums from 'modules/enumerables';

const state = {
  entities: Immutable.fromJS({
    enumerables: {
      fetching: true,
      error: false,
      enumerables: {
        roles: {
          SUPER_ADMIN: 'Super admin',
          SUPER_USER: 'Super user'
        },
        jobStatus: {
          PENDING: 'Pending approval',
          APPROVED: 'Approved',
          DRAFT: 'Draft'
        },
      },
    }
  }),
};

test('rootSelector returns correct state slice ', () => {
  const expected = state.entities.get('enumerables');
  const actual = Enums.selectors.rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(Enums.selectors.fetchingSelector(state)).toBe(true);
});

test('enumerables selector returns correct state slice', () => {
  const expected = state.entities.getIn(['enumerables','enumerables']);
  const actual = Enums.selectors.enumerablesSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

