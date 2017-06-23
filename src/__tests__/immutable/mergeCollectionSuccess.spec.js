import { fromJS, is, OrderedMap, List, Set, Map } from 'immutable';
import ImmtuableUtils from '../../immutable';

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
      },
      continents: {
        12: { id: 12, title: 'Africa' },
        7: { id: 7, title: 'South America' },
      }
    },
    results: Set([22,44,55,66,77]),
  });

  const actual = ImmtuableUtils.mergeCollectionSuccess(state, {
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
      result: Set([122,66,88]),
    },
  });

  it('returns correct request lifecycle state', () => {
    expect(actual.get('fetching')).toBe(false);
    expect(actual.get('error')).toBe(false);
  });

  it('returns correct entities state', () => {
    const expected = fromJS({
      countries: {
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
    const expected = Set([22,44,55,66,77,122,88]);
    expect(is(actual.get('results'), expected)).toBe(true);
  });
});