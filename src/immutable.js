import Immutable from 'immutable';
import get from 'lodash/get';

/**
 * Merges [entities] properties
 * @param {Immutable} entities
 * @param {Immutable} payload
 * @return {Map}
 */
function entitiesMerger(A, B) {
  if (Immutable.List.isList(A) && Immutable.List.isList(B)) {
    return B; // Replace the nested list
  }
  if (A && A.mergeWith) {
    return A.mergeWith(entitiesMerger, B);
  }
  return B;
}

/**
 * Clears a modules entities
 * @return Object
 */
function clearEntities(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('results', result => result.clear())
    .set('result', false);
}

/**
 * Updates a modules filters
 * @return Object
 */
function updateFilters(state, filters) {
  return state
    .mergeDeep({ filters: Immutable.fromJS(filters) });
}

/**
 * Clears a modules filters
 * @return Object
 */
function clearFilters(state) {
  return state
    .update('filters', filters => filters.clear());
}

/**
 * Updates a modules sync filters
 * @return Object
 */
function updateSyncFilters(state, filters) {
  return state
    .mergeDeep({ syncFilters: Immutable.fromJS(filters) });
}

/**
 * Merges a modules state on request actions
 * @return {Map}
 */
function mergeRequest(state) {
  return state
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on success action
 * @return {Map}
 */
function mergeSuccess(state, payload) {
  return state
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => {
      const selected = get(payload, 'data.entities', {});
      return entities.mergeWith(entitiesMerger, Immutable.fromJS(selected));
    })
    .update('result', result => get(payload, 'data.result', false));
}

/**
 * Removes archived entry on successful archive
 * @return {Map}
 */
function archiveSuccess(state, payload) {
  const selected = get(payload, 'data.entities', {});
  const key = Object.keys(selected)[0];
  const id = Object.keys(selected[key])[0];
 return state
    .set('fetching', false)
    .set('error', false)
    .set('result', false)
    .removeIn(['entities', key, id])
    .update('results', results => results.filter(result => result !== parseInt(id)));
}

/**
 * Merges a modules state on collection success action
 * @return {Map}
 */
function mergeCollectionSuccess(state, payload) {
  return state
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => {
      const selected = get(payload, 'data.entities', {});
      return entities.mergeDeep(Immutable.fromJS(selected));
    })
    .update('results', results => {
      const selected = get(payload, 'data.result', []);
      const payloadResults = Immutable.OrderedSet(selected);
      const resultsSet = Immutable.OrderedSet.isOrderedSet(results) ? results : results.toOrderedSet();
      return resultsSet.union(payloadResults);
    });
}

/**
 * Merges a modules state on failure actions
 * @return Object
 */
function mergeFailure(state, payload) {
  return state
    .set('error', Immutable.fromJS(payload))
    .set('fetching', false);
}

/**
 * Creates an ordered map from a list and a map
 * @param {List}
 * @param {Collection}
 * @return OrderedMap
 */
function createOrderedMap(keys, items) {
  return Immutable.OrderedMap(keys.map(key => [key.toString(), items.get(key.toString())]));
}

export default {
  clearEntities,
  updateFilters,
  clearFilters,
  updateSyncFilters,
  mergeRequest,
  mergeSuccess,
  archiveSuccess,
  mergeCollectionSuccess,
  mergeFailure,
  createOrderedMap,
};
