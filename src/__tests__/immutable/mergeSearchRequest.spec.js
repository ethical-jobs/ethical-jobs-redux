import { fromJS, is, OrderedMap, List, Set, Map } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('mergeSearchRequest function', () => {

  const state = fromJS({
    entities: { foo: 'bar' },
    results: Set([123,456,789]),
    fetching: false,
    error: false,
  });

  it('returns correct request state and clears entities', () => {
    const expected = fromJS({
      entities: {},
      results: Set([]),
      fetching: true,
      error: false,
    });
    expect(is(ImmtuableUtils.mergeSearchRequest(state), expected)).toBe(true);
  });
});