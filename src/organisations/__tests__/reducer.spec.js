import Immutable from 'immutable';
import { createAction } from 'utils';
import { response, error } from './_fixtures';
import orgReducer, { initialState } from 'organisations';
import * as ActionTypes from 'organisations/actions';
import {
  clearOrganisations,
  updateFilter,
  updateQuery,
} from 'organisations/actions';

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expected = Immutable.fromJS({
    fetching: false,
    error: false,
    query: '',
    filters: {},
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  const actual = orgReducer(undefined);
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearOrganisations action correctly', () => {
  const action = clearOrganisations();
  const actual = orgReducer(initialState, action);
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', Immutable.Set());
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateFilter action correctly', () => {
  let actual = orgReducer(initialState, updateFilter({ limit: 5 }));
  actual = orgReducer(actual, updateFilter({ limit: 10 }));
  const expected = initialState.set('filters', Immutable.fromJS({
    limit: 10,
  }));
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateQuery action correctly', () => {
  const state = initialState
    .update('entities', entities => entities.mergeDeep(response.data.entities))
    .update('result', result => result.union(response.data.result));
  const actual = orgReducer(state, updateQuery('Foo bar bam'));
  const expected = initialState
    .set('query', 'Foo bar bam');
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| REQUEST actions
|--------------------------------------------------------------------------
*/

const expectedRequestState = initialState
  .set('fetching', true)
  .set('error', false);

test('should handle FETCH_COLLECTION_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_COLLECTION}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle FETCH_ENTITY_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle UPDATE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle ARCHIVE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_CREDITS action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE_CREDITS}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle DEDUCT_CREDITS action correctly', () => {
  const action = {
    type: `${ActionTypes.DEDUCT_CREDITS}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle UPLOAD_LOGO action correctly', () => {
  const action = {
    type: `${ActionTypes.UPLOAD_LOGO}_REQUEST`,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| SUCCESS actions
|--------------------------------------------------------------------------
*/

const expectedSuccessState = initialState
  .set('fetching', false)
  .set('error', false)
  .update('entities', entities => entities.mergeDeep(response.data.entities))
  .update('result', result => result.union(response.data.result));

test('should handle FETCH_COLLECTION_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_COLLECTION}_SUCCESS`,
    payload: response,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle FETCH_ENTITY_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_SUCCESS`,
    payload: response,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle CREATE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_SUCCESS`,
    payload: response,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle UPDATE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_SUCCESS`,
    payload: response,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle ARCHIVE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_SUCCESS`,
    payload: response,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| FAILURE actions
|--------------------------------------------------------------------------
*/

const expectedFailureState = initialState
  .set('fetching', false)
  .set('error', Immutable.fromJS(error));

test('should handle FETCH_COLLECTION_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_COLLECTION}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle FETCH_ENTITY_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle CREATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle UPDATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ARCHIVE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = orgReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
