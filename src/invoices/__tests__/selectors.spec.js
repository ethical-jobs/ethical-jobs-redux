import Immutable from 'immutable';
import { response, error } from 'invoices/__tests__/_fixtures';
import {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  invoicesSelector,
  invoiceByIdSelector,
  invoicesByFiltersSelector,
} from 'invoices/selectors';

const state = {
  entities: Immutable.fromJS({
    invoices: {
      fetching: true,
      error: false,
      filters: {
        organisationId: 33,
      },
      result: Immutable.Set([1, 2, 3]),
      entities: Immutable.fromJS({
        invoices: {
          1: { organisation_id: 100, uudi: '00-00-1' },
          2: { organisation_id: 33, uudi: '00-00-2' },
          3: { organisation_id: 33, uudi: '00-00-3' },
        }
      }),
    }
  }),
};

test('rootSelector returns correct state slice', () => {
  const expected = state.entities.get('invoices');
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice ', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('querySelector returns correct state slice', () => {
  const expected = state.entities.getIn(['invoices','query']);
  const actual = querySelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  const expected = state.entities.getIn(['invoices','filters']);
  const actual = filtersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['invoices','result']);
  const actual = resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('invoicesSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['invoices','entities','invoices']);
  const actual = invoicesSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('invoiceByIdSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['invoices','entities','invoices']).first();
  const actual = invoiceByIdSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('invoicesByFiltersSelector selector returns correct state slice', () => {
  const expected = Immutable.fromJS({
    2: { organisation_id: 33, uudi: '00-00-2' },
    3: { organisation_id: 33, uudi: '00-00-3' },
  });
  const actual = invoicesByFiltersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('invoicesByFiltersSelector selector returns correct state with complex filters', () => {
  const complexState = {
    entities: Immutable.fromJS({
      invoices: {
        filters: {
          organisationId: 33,
        },
        entities: Immutable.fromJS({
          invoices: {
            1: { organisation_id: 33, uuid: '00-00-21' },
            2: { organisation_id: 34, uuid: '00-00-22' },
            3: { organisation_id: 107, uuid: '00-00-23' },
          }
        }),
      }
    }),
  };
  const expected = Immutable.fromJS({ 1: { organisation_id: 33, uuid: '00-00-21' } });
  const actual = invoicesByFiltersSelector(complexState);
  expect(Immutable.is(expected, actual)).toBe(true);
});

