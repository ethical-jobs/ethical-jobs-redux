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
    .get('filters').clear();
}

/**
 * Sets a modules state on a search request
 * @return Object
 */
function mergeSearchRequest(state) {
  return state
    .update('entities', entities => entities.clear())
    .update('results', result => Immutable.List())
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
    .update('results', results => Immutable.List(payload && payload.data && payload.data.result, Immutable.List()));
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
 * @param {Map}
 * @return OrderedMap
 */
function createOrderedMap(keys, items) {
  return Immutable.OrderedMap(keys.map(key => [key.toString(), items.get(key.toString())]));
}

export default {
  clearEntities,
  updateFilters,
  clearFilters,
  mergeSearchRequest,
  mergeRequest,
  mergeSuccess,
  mergeCollectionSuccess,
  mergeFailure,
  createOrderedMap,
};
