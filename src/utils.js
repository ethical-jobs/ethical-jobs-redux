import Immutable from 'immutable';
import { ApiError } from 'ethical-jobs-sdk';

/**
 * Promise truthy
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
}

/**
 * Generates a namespaced action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function createActionType(base) {
  return `ej/${base}`;
}

/**
 * Converts javscript to immutable structures
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function fromJS(jsValue) {
  return Immutable.fromJS(jsValue, (key, value, path) => {
    if (key === 'result') {
      return value.toSet();
    }
    return Immutable.isIndexed(value) ? value.toList() : value.toMap();
  });
}

/**
 * Clears a modules entities
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function clearEntities(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear());
}

/**
 * Updates a modules filters
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function updateFilters(state, filters) {
  return state
    .mergeDeep({ filters });
}

/**
 * Sets a modules state on a search request
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function mergeSearchRequest(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear())
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on request actions
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function mergeRequest(state) {
  return state
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on success actions
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function mergeSuccess(state, payload) {
  return state
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => entities.mergeDeep(payload.data.entities))
    .update('result', result => {
      return Array.isArray(payload.data.result) ? result.union(payload.data.result) : payload.data.result;
    });
}

/**
 * Merges a modules state on failure actions
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function mergeFailure(state, payload) {
  const value = (payload instanceof ApiError) ? payload.error : payload;
  return state
    .set('error', Immutable.fromJS(value))
    .set('fetching', false);
}
