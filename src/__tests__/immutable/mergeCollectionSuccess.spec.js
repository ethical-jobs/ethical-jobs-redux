import { fromJS, is, isOrdered, OrderedMap, List, Set, OrderedSet, Map } from 'immutable';
import ImmutableUtils from '../../immutable';

describe('mergeCollectionSuccess function', () => {

  const state = fromJS({
    fetching: true,
    error: false,
    entities: {
      countries: {
        22: { id: 22, title: 'Ethiopia' },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
        66: { id: 66, title: 'Sudan' },
        77: { id: 77, title: 'Chile' },
        11: {id: 11, title: 'Australia'}
      },
      continents: {
        12: { id: 12, title: 'Africa' },
        7: { id: 7, title: 'South America' },
      }
    },
    results: [22,11,55,44,66,77],
  });

  const actual = ImmutableUtils.mergeCollectionSuccess(state, {
    data: {
      entities: {
        countries: {
          122: { id: 122, title: 'Austria' },
          66: { id: 66, title: 'South Sudan' },
          88: { id: 88, title: 'Somalia' },
        },
        continents: {
          7: { id: 7, title: 'South America' },
          12: { id: 12, title: 'Europe' },
        }
      },
      result: [88,122,66],
    },
  });

  it('returns correct request lifecycle state', () => {
    expect(actual.get('fetching')).toBe(false);
    expect(actual.get('error')).toBe(false);
  });

  it('it maintains the result order', () => {
    expect(isOrdered(actual.get('results'))).toBe(true);
  });

  it('returns correct entities state', () => {
    const expected = fromJS({
      countries: {
        11: {id: 11, title: 'Australia'},
        22: { id: 22, title: 'Ethiopia' },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
        66: { id: 66, title: 'South Sudan' },
        77: { id: 77, title: 'Chile' },
        88: { id: 88, title: 'Somalia' },
        122: { id: 122, title: 'Austria' },
      },
      continents: {
        12: { id: 12, title: 'Africa' },
        7: { id: 7, title: 'South America' },
        12: { id: 12, title: 'Europe' },
      }
    });
    expect(is(actual.get('entities'), expected)).toBe(true);
  });

  it('returns correct results state', () => {
    const expected = OrderedSet([88,122,66]);

    expect(is(actual.get('results'), expected)).toBe(true);
  });
});