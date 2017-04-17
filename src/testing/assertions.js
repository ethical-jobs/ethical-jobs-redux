import Immutable from 'immutable';
import { fromJS } from 'utils';
import {
  mergeSearchRequest,
  mergeRequest,
  mergeSuccess,
  mergeFailure,
} from '../utils';

/**
 * Asserts a modules "initial" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function initialState(reducer, expectedState) {
  return Immutable.is(reducer(undefined), expectedState);
}

/**
 * Asserts a modules "cleared" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function clearedEntities(reducer, action, initialState) {
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', Immutable.Set());
  return Immutable.is(reducer(undefined, action), expected);
}

/**
 * Asserts a modules updated filter state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function updatedFilters(reducer, actionCreator, initialState) {
  let state;
  state = reducer(undefined, actionCreator({ foo: 'bar' }));
  state = reducer(state, actionCreator({ bar: 123 }));
  state = reducer(state, actionCreator({ foo: 10000 }));
  const expected = initialState.set('filters', Immutable.fromJS({ bar: 123, foo: 10000 }));
  return Immutable.is(state, expected);
}

/**
 * Asserts a modules "search request" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function searchRequestState(reducer, actionType, initialState) {
  const expected = mergeSearchRequest(initialState);
  return Immutable.is(reducer(undefined, { type: `${actionType}_REQUEST` }), expected);
}

/**
 * Asserts a modules "request" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function requestState(reducer, actionTypes = [], initialState) {
  let passes = true;
  const expected = mergeRequest(initialState);
  actionTypes.forEach(type => {
    if (false === Immutable.is(reducer(undefined, { type }), expected)) {
      passes = false;
    }
  });
  return passes;
}

/**
 * Asserts a modules "success" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function successState(reducer, actionTypes = [], initialState, fixture) {
  let passes = true;
  const expected = mergeSuccess(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture };
    if (false === Immutable.is(reducer(undefined, action), expected)) {
      passes = false;
    }
  });
  return passes;
}

/**
 * Asserts a modules "failure" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function failureState(reducer, actionTypes = [], initialState, fixture) {
  let passes = true;
  const expected = mergeFailure(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture, error: true };
    if (false === Immutable.is(reducer(undefined, action), expected)) {
      passes = false;
    }
  });
  return passes;
}

/**
 * Asserts a modules rootSelector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function rootSelector(key, selector) {
  const state = fromJS({
    entities: {
      [key]: 'foo-bar-bam',
    }
  });
  return Immutable.is('foo-bar-bam', selector(state));
}

/**
 * Asserts a modules fetchingSelector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function fetchingSelector(key, selector) {
  const state = fromJS({
    entities: {
      [key]: {
        fetching: 'foo-bar-bam',
      },
    }
  });
  return Immutable.is('foo-bar-bam', selector(state));
}

/**
 * Asserts a modules filtersSelector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function filtersSelector(key, selector) {
  const state = fromJS({
    entities: {
      [key]: {
        filters: 'foo-bar-bam',
      },
    }
  });
  return Immutable.is('foo-bar-bam', selector(state));
}

/**
 * Asserts a modules resultSelector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function resultSelector(key, selector) {
  const state = fromJS({
    entities: {
      [key]: {
        result: 'foo-bar-bam',
      },
    }
  });
  return Immutable.is('foo-bar-bam', selector(state));
}

/**
 * Asserts a modules entities selector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function entitiesSelector(moduleKey, entitiesKey, selector) {
  const state = fromJS({
    entities: {
      [moduleKey]: {
        entities: {
          [entitiesKey]: 'foo-bar-bam',
        },
      },
    }
  });
  return Immutable.is('foo-bar-bam', selector(state));
}