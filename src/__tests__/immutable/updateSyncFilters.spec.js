import { fromJS, is, OrderedMap, List, Set, Map } from 'immutable';
import ImmtuableUtils from '../../immutable';


describe('updateSyncFilters function', () => {

  const state = fromJS({ syncFilters: { foo: 'bar' } });

  it('it can add a new syncFilters', () => {
    const expected = fromJS({ syncFilters: { foo: 'bar', bar: 'foo' } });
    expect(is(ImmtuableUtils.updateSyncFilters(state, { bar: 'foo' }), expected)).toBe(true);
  });

  it('it can update a syncFilters', () => {
    const expected = fromJS({ syncFilters: { foo: 'bam' } });
    expect(is(ImmtuableUtils.updateSyncFilters(state, { foo: 'bam' }), expected)).toBe(true);
  });
});