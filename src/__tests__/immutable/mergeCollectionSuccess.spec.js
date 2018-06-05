import { fromJS, is, isOrdered, OrderedMap, List, Set, OrderedSet, Map } from 'immutable';
import prettyFormat from 'pretty-format';
import ImmutableUtils from '../../immutable';

describe('mergeCollectionSuccess function', () => {

  const beforeState = fromJS({
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

  const afterState = ImmutableUtils.mergeCollectionSuccess(beforeState, {
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
    expect(afterState.get('fetching')).toBe(false);
    expect(afterState.get('error')).toBe(false);
  });

  it('maintains the result order', () => {
    expect(isOrdered(afterState.get('results'))).toBe(true);
  });

  it('returns correct entities state', () => {
    const shouldBe = fromJS({
      countries: {
        22: { id: 22, title: 'Ethiopia' },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
        66: { id: 66, title: 'South Sudan' },
        77: { id: 77, title: 'Chile' },
        11: { id: 11, title: 'Australia' },
        88: { id: 88, title: 'Somalia' },
        122: { id: 122, title: 'Austria' },
      },
      continents: {
        12: { id: 12, title: 'Europe' },
        7: { id: 7, title: 'South America' },
      }
    });
    expect(
      is(afterState.get('entities'), shouldBe)
    ).toBe(true)
  });

  it('returns correct results state', () => {
    const shouldBe = OrderedSet([22,11,55,44,66,77,88,122]);
    expect(
      is(afterState.get('results'), shouldBe)
    ).toBe(true);
  });

  it('can perform complex collection results merging', () => {
    const secondAfterState = ImmutableUtils.mergeCollectionSuccess(afterState, {
      data: {
        entities: {
          countries: {
            207: { id: 207, title: 'Taiwan' },
            88: { id: 88, title: 'Somalia' },
            209: { id: 209, title: 'Japan' },
          },
        },
        result: [207, 88, 209],
      },
    });
    expect(is(
      secondAfterState.get('results'),
      OrderedSet([22, 11, 55, 44, 66, 77, 88, 122, 207, 209])
    )).toBe(true);
    const thirdAfterState = ImmutableUtils.mergeCollectionSuccess(secondAfterState, {
      data: {
        entities: {
          countries: {
            209: { id: 209, title: 'Japan' },
            88: { id: 88, title: 'Somalia' },
            217: { id: 217, title: 'Norway' },
            310: { id: 310, title: 'New Zealand' },
            301: { id: 301, title: 'Tonga' },
          },
        },
        result: [217, 209, 88, 310, 301],
      },
    });
    expect(is(
      thirdAfterState.get('results'),
      OrderedSet([22, 11, 55, 44, 66, 77, 88, 122, 207, 209, 217, 310, 301])
    )).toBe(true);
  });
});
