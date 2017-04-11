import Immutable from 'immutable';
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
  let isValid = true;
  const expected = mergeRequest(initialState);
  actionTypes.forEach(type => {
    const action = { type };
    if (Immutable.is(reducer(undefined, action), expected) === false) {
      isValid = false;
    }
  });
  return isValid;
}

/**
 * Asserts a modules "success" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function successState(reducer, actionTypes = [], initialState, fixture) {
  let isValid = true;
  const expected = mergeSuccess(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture };
    if (Immutable.is(reducer(undefined, action), expected) === false) {
      isValid = false;
    }
  });
  return isValid;
}

/**
 * Asserts a modules "failure" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function failureState(reducer, actionTypes = [], initialState, fixture) {
  let isValid = true;
  const expected = mergeFailure(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture, error: true };
    if (Immutable.is(reducer(undefined, action), expected) === false) {
      isValid = false;
    }
  });
  return isValid;
}
