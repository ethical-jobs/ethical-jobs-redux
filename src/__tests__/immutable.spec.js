import { fromJS, is, OrderedMap, List, Map } from 'immutable';
import ImmtuableUtils from '../immutable';

describe('clearEntities function', () => {
  const state = fromJS({
    entities: { foo: 'bar' },
    results: List([123,456,789]),
    result: 123,
  });
  const expected = fromJS({
    entities: {},
    results: List([]),
    result: false,
  });
  it('clears entity state', () => {
    expect(is(ImmtuableUtils.clearEntities(state), expected)).toBe(true);
  });
});

describe('updateFilters function', () => {
  const state = fromJS({ filters: { foo: 'bar' } });
  it('it can add a new filter', () => {
    const expected = fromJS({ filters: { foo: 'bar', bar: 'foo' } });
    expect(is(ImmtuableUtils.updateFilters(state, { bar: 'foo' }), expected)).toBe(true);
  });
  it('it can update a filter', () => {
    const expected = fromJS({ filters: { foo: 'bam' } });
    expect(is(ImmtuableUtils.updateFilters(state, { foo: 'bam' }), expected)).toBe(true);
  });
});

describe('clearFilters function', () => {
  const state = fromJS({ filters: { foo: 'bar', bam: 'wham' } });
  it('it can clear all filters', () => {
    expect(is(ImmtuableUtils.clearFilters(state), fromJS({ filters: {} }))).toBe(true);
  });
});

describe('mergeRequest function', () => {
  const state = fromJS({
    fetching: false,
    error: false,
  });
  it('returns correct request state', () => {
    const expected = fromJS({
      fetching: true,
      error: false,
    });
    expect(is(ImmtuableUtils.mergeRequest(state), expected)).toBe(true);
  });
});

describe('mergeFailure function', () => {
  const state = fromJS({
    fetching: false,
    error: false,
  });
  const expected = fromJS({
    fetching: false,
    error: { foo: 'bar' },
  });
  const actual = ImmtuableUtils.mergeFailure(state, {
    foo: 'bar'
  });
  it('returns correct failure state', () => {
    expect(is(actual, expected)).toBe(true);
  });
});

describe('createOrderedMap function', () => {

  it('can order a map by a List of keys', () => {
    const results = fromJS([
      22,33,55,88,
    ]);
    const entities = fromJS({
      22: { id: 22, title: 'Number 22' },
      88: { id: 88, title: 'Number 88' },
      55: { id: 55, title: 'Number 55' },
      33: { id: 33, title: 'Number 33' },
    });
    const shouldBeOrdered = ImmtuableUtils.createOrderedMap(results, entities);
    expect(shouldBeOrdered.keySeq().toArray()).toEqual([
      '22','33','55','88',
    ]);
  });

  it('order is preserved when converted to List', () => {
    const results = fromJS([
      22,33,55,88,
    ]);
    const entities = fromJS({
      22: { id: 22, title: 'Number 22' },
      88: { id: 88, title: 'Number 88' },
      55: { id: 55, title: 'Number 55' },
      33: { id: 33, title: 'Number 33' },
    });
    const shouldBeOrdered = ImmtuableUtils.createOrderedMap(results, entities);
    const asList = shouldBeOrdered.toList();
    expect(asList.get(0).get('id')).toBe(22);
    expect(asList.get(1).get('id')).toBe(33);
    expect(asList.get(2).get('id')).toBe(55);
    expect(asList.get(3).get('id')).toBe(88);
  });
});
