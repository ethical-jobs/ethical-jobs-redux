import { fromJS, is, OrderedMap } from 'immutable';
import ImmtuableUtils from '../immutable';

describe('clearEntities function', () => {
  const state = fromJS({
    entities: { foo: 'bar' },
    results: [123,456,789],
    result: 123,
  });
  const expected = fromJS({
    entities: {},
    results: [],
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

describe('mergeSearchRequest function', () => {
  const state = fromJS({
    entities: { foo: 'bar' },
    results: [123,456,789],
    fetching: false,
    error: false,
  });
  it('returns correct request state and clears entities', () => {
    const expected = fromJS({
      entities: {},
      results: [],
      fetching: true,
      error: false,
    });
    expect(is(ImmtuableUtils.mergeSearchRequest(state), expected)).toBe(true);
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

describe('mergeSuccess function', () => {
  const state = fromJS({
    fetching: true,
    error: false,
    entities: { foo: 'bar' },
    result: 298,
  });
  const expected = fromJS({
    fetching: false,
    error: false,
    entities: { foo: 'bar', bar: 'foo' },
    result: 123,
  });
  const actual = ImmtuableUtils.mergeSuccess(state, {
    data: {
      entities: { bar: 'foo' },
      result: 123,
    },
  });
  it('returns correct success state', () => {
    expect(is(actual, expected)).toBe(true);
  });
});

describe('mergeCollectionSuccess function', () => {
  const state = fromJS({
    fetching: true,
    error: false,
    entities: { foo: 'bar' },
    results: [298],
  });
  const expected = fromJS({
    fetching: false,
    error: false,
    entities: { foo: 'bar', bar: 'foo', bing: 'bang' },
    results: [298, 123, 456],
  });
  const actual = ImmtuableUtils.mergeCollectionSuccess(state, {
    data: {
      entities: { bar: 'foo', bing: 'bang' },
      result: [123, 456],
    },
  });
  it('returns correct success state', () => {
    expect(is(actual, expected)).toBe(true);
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
  it('can order a map byt a list of keys', () => {
    const orderedList = fromJS([
      22,
      33,
      55,
      88,
    ]);
    const unorderedMap = fromJS({
      22: { id: 22, title: 'Number 22' },
      88: { id: 88, title: 'Number 88' },
      55: { id: 55, title: 'Number 55' },
      33: { id: 33, title: 'Number 33' },
    });
    const expected = fromJS({
      22: { id: 22, title: 'Number 22' },
      33: { id: 33, title: 'Number 33' },
      55: { id: 55, title: 'Number 55' },
      88: { id: 88, title: 'Number 88' },
    }).toOrderedMap();
    const actual = ImmtuableUtils.createOrderedMap(orderedList, unorderedMap);
    expect(is(actual, expected)).toBe(true);
  });
});