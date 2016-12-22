import Immutable from 'immutable';
import { createAction } from 'utils';
import { response, error } from 'jobs/__tests__/_fixtures';
import jobReducer, { initialState } from 'jobs';
import * as ActionTypes from 'jobs/actions';
import {
  clearJobs,
  updateFilter,
  updateQuery,
} from 'jobs/actions';

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
    filters: {
      organisationId: null,
      jobType: null,
    },
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  const actual = jobReducer(undefined);
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearJobs action correctly', () => {
  const action = clearJobs();
  const actual = jobReducer(initialState, action);
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', Immutable.Set());
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateFilter action correctly', () => {
  let actual = jobReducer(initialState, updateFilter({ organisationId: 123 }));
  actual = jobReducer(actual, updateFilter({ jobType: 'APPROVED' }));
  actual = jobReducer(actual, updateFilter({ organisationId: 456 }));
  const expected = initialState.set('filters', Immutable.fromJS({
    organisationId: 456,
    jobType: 'APPROVED',
  }));
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateQuery action correctly', () => {
  const state = initialState
    .update('entities', entities => entities.mergeDeep(response.data.entities))
    .update('result', result => result.union(response.data.result));
  const actual = jobReducer(state, updateQuery('Foo bar bam'));
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
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle FETCH_ENTITY_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});


test('should handle UPDATE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle ARCHIVE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle APPROVE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.APPROVE}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle EXPIRE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.EXPIRE}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle ATTACH_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.ATTACH}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle DETACH_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.DETACH}_REQUEST`,
  };
  const actual = jobReducer(initialState, action);
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
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle FETCH_ENTITY_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle CREATE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle UPDATE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle APPROVE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.APPROVE}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle ARCHIVE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle EXPIRE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.EXPIRE}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle ATTACH_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.ATTACH}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle DETACH_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.DETACH}_SUCCESS`,
    payload: response,
  };
  const actual = jobReducer(initialState, action);
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
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle FETCH_ENTITY_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle CREATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle UPDATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ARCHIVE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle APPROVE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.APPROVE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle EXPIRE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.EXPIRE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ATTACH_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.ATTACH}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle DETACH_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.DETACH}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = jobReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
