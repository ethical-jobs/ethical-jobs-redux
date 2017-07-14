import Immutable from 'immutable';

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
 * Sets a modules state on a search request
 * @return Object
 */
function mergeSearchRequest(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('results', result => Immutable.Set())
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on request actions
 * @return Object
 */
function mergeRequest(state) {
  return state
    .set('fetching', true)
    .set('error', false);
}

/**
 * Merges a modules state on success action
 * @return Object
 */
function mergeSuccess(state, payload) {
  return state
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => Immutable.fromJS(payload.data.entities))
    .update('result', result => payload && payload.data && payload.data.result || false );
}

/**
 * Merges a modules state on success action including a delete action
 * @return Object
 */
function mergeDeleteSuccess(state, payload, deleted) {
    return state
        .set('fetching', false)
        .set('error', false)
        .deleteIn(['entities', deleted])
        .update('entities', entities => entities.mergeDeep(payload.data.entities))
        .update('result', result => payload && payload.data && payload.data.result || false );
}

/**
 * Merges a modules state on collection success action
 * @return Object
 */
function mergeCollectionSuccess(state, payload) {
  return state
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => entities.mergeDeep(payload.data.entities))
    .update('results', results => {
      const payloadResult = Immutable.Set(payload && payload.data && payload.data.result, Immutable.Set());
      const resultsSet = Immutable.Set.isSet(results) ? results : results.toSet();
      return resultsSet.union(payloadResult);
    });
}

/**
 * Merges a modules state on failure actions
 * @return Object
 */
function mergeFailure(state, payload) {
  const value = (payload instanceof Error) ? payload.error : payload;
  return state
    .set('error', Immutable.fromJS(value))
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
  mergeSearchRequest,
  mergeRequest,
  mergeSuccess,
  mergeDeleteSuccess,
  mergeCollectionSuccess,
  mergeFailure,
  createOrderedMap,
};
