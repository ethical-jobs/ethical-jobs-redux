import Immutable from 'immutable';
import ImmutableUtils from './immutable';

/**
 * Asserts a modules "initial" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function initialState(reducer, expectedState) {
  return Immutable.is(reducer(undefined), expectedState);
}

/**
 * Asserts a modules "cleared" state
 * @param {object} reducer
 * @param {function} action
 * @param {object} initialState
 * @return {bool}
 */
function clearedEntities(reducer, action, initialState) {
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', false);
  return Immutable.is(reducer(undefined, action), expected);
}

/**
 * Asserts a modules updated filter state
 * @param {object} reducer
 * @param {function} actionCreator
 * @param {object} initialState
 * @return {boolean}
 */
function updatedFilters(reducer, actionCreator, initialState) {
  let state;
  state = reducer(undefined, actionCreator({ foo: 'bar' }));
  state = reducer(state, actionCreator({ bar: 123 }));
  state = reducer(state, actionCreator({ foo: 10000 }));
  const expected = initialState.set('filters', Immutable.fromJS({ bar: 123, foo: 10000 }));
  return Immutable.is(state, expected);
}

/**
 * Asserts a modules cleared filter state
 * @param {object} reducer
 * @param {function} actionCreator
 * @param {object} initialState
 * @return {boolean}
 */
function clearedFilters(reducer, actionCreator, initialState) {
  const expected = initialState.set('filters', Immutable.Map());
  let state = reducer(initialState.set('filters', Immutable.Map({ foo: 'bar' })));
  state = reducer(state, actionCreator());
  return Immutable.is(state, expected);
}

/**
 * Asserts a modules updated syncFilter state
 * @param {object} reducer
 * @param {function} actionCreator
 * @param {object} initialState
 * @return {boolean}
 */
function updatedSyncFilters(reducer, actionCreator, initialState) {
  let state;
  state = reducer(undefined, actionCreator({ foo: 'bar' }));
  state = reducer(state, actionCreator({ bar: 123 }));
  state = reducer(state, actionCreator({ foo: 10000 }));
  const expected = initialState.set('syncFilters', Immutable.fromJS({ bar: 123, foo: 10000 }));
  return Immutable.is(state, expected);
}

/**
 * Asserts a modules "search request" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function searchRequestState(reducer, actionType, initialState) {
  const expected = ImmutableUtils.mergeSearchRequest(initialState);
  return Immutable.is(reducer(undefined, { type: `${actionType}_REQUEST` }), expected);
}

/**
 * Asserts a modules "request" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function requestState(reducer, actionTypes = [], initialState) {
  let passes = true;
  const expected = ImmutableUtils.mergeRequest(initialState);
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

function successState(reducer, actionTypes = [], initialState, fixture) {
  let passes = true;
  const expected = ImmutableUtils.mergeSuccess(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture };
    if (false === Immutable.is(reducer(undefined, action), expected)) {
      passes = false;
    }
  });
  return passes;
}

function archiveSuccessState(reducer, actionType, initialState, archivedEntry) {
  const action = { type: actionType, payload: archivedEntry };
  const expected = ImmutableUtils.archiveSuccess(initialState, archivedEntry);
  return Immutable.is(reducer(initialState, action), expected);
}

/**
 * Asserts a modules "failure" state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function failureState(reducer, actionTypes = [], initialState, fixture) {
  let passes = true;
  const expected = ImmutableUtils.mergeFailure(initialState, fixture);
  actionTypes.forEach(type => {
    const action = { type, payload: fixture, error: true };
    if (false === Immutable.is(reducer(undefined, action), expected)) {
      passes = false;
    }
  });
  return passes;
}

/**
 * Asserts a modules fetchingSelector
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function fetchingSelector(key, selector) {
  const state = Immutable.fromJS({
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

function filtersSelector(key, selector) {
  const state = Immutable.fromJS({
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

function resultSelector(key, selector) {
  const state = Immutable.fromJS({
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

function entitiesSelector(moduleKey, entitiesKey, selector) {
  const state = Immutable.fromJS({
    entities: {
      [moduleKey]: {
        entities: {
          [entitiesKey]: 'foo-bar-bam',
        },
      },
    }
  });
  const correctState = Immutable.is('foo-bar-bam', selector(state));
  const defaultState = Immutable.is(Immutable.Map(), selector(Immutable.fromJS({})));
  return correctState && defaultState;
}

export default {
  initialState,
  clearedEntities,
  updatedFilters,
  clearedFilters,
  updatedSyncFilters,
  searchRequestState,
  requestState,
  successState,
  archiveSuccessState,
  failureState,
  fetchingSelector,
  filtersSelector,
  resultSelector,
  entitiesSelector,
};
