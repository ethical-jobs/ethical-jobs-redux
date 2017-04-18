import Immutable from 'immutable';
import { ApiError } from 'ethical-jobs-sdk';

/**
 * Converts javscript to immutable structures
 * @return Object
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
 * @return Object
 */
export function clearEntities(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear());
}

/**
 * Updates a modules filters
 * @return Object
 */
export function updateFilters(state, filters) {
  return state
    .mergeDeep({ filters });
}

/**
 * Sets a modules state on a search request
 * @return Object
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
 * @return Object
 */
export function mergeRequest(state) {
  return state
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on success actions
 * @return Object
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
 * @return Object
 */
export function mergeFailure(state, payload) {
  const value = (payload instanceof ApiError) ? payload.error : payload;
  return state
    .set('error', Immutable.fromJS(value))
    .set('fetching', false);
}