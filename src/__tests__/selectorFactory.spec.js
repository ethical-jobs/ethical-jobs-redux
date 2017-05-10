import { fromJS, is, Map } from 'immutable';
import SelectorFactory from 'SelectorFactory'

describe('create selector factory', () => {
  const state = fromJS({
    entities: {
      jobs: {
        foo: 'bar',
      },
    },
  });
  const selector = SelectorFactory.create('jobs', 'foo');
  it('creates a selector that selects correct state', () => {
    expect(selector(state)).toBe('bar');
  });
});

describe('createWithDefault selector factory', () => {
  const selector = SelectorFactory.createWithDefault('jobs', 'foo', 192939);
  it('creates a selector that selects correct state', () => {
    const state = fromJS({
      entities: {
        jobs: {
          foo: 'bar',
        },
      },
    });
    expect(selector(state)).toBe('bar');
  });
  it('creates a selector that selects a default state', () => {
    const state = fromJS({
      entities: {
        jobs: {},
      },
    });
    expect(selector(state)).toBe(192939);
  });
});

describe('createFiltersSelector selector factory', () => {
  const selector = SelectorFactory.createFiltersSelector('jobs');
  it('creates a selector that selects filters state', () => {
    const state = fromJS({
      entities: {
        jobs: {
          filters: { foo: 'bar' },
        },
      },
    });
    const expected = fromJS({ foo: 'bar' });
    expect(is(selector(state), expected)).toBe(true);
  });
  it('creates a selector that selects a default state', () => {
    const state = fromJS({
      entities: {
        jobs: {},
      },
    });
    expect(is(selector(state), Map())).toBe(true);
  });
});

describe('createPropFiltersSelector selector factory', () => {
  const selector = SelectorFactory.createPropFiltersSelector();
  it('creates a selector that selects a components prop filters', () => {
    const props = { filters: { foo: 'bar', bar: 'foo' }};
    expect(is(selector(undefined, props), Map(props.filters))).toBe(true);
  });
  it('creates a selector that returns a Map by default', () => {
    expect(is(selector(undefined, {}), Map())).toBe(true);
  });
});

describe('createResultSelector selector factory', () => {
 // to do...
});
