import Immutable from 'immutable';
import { response, error } from 'auth/__tests__/_fixtures';
import authReducer, { initialState } from 'auth';
import * as ActionTypes from 'auth/actions';
import { REQUEST, SUCCESS, FAILURE } from 'utils';

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state ', () => {
  const expected = Immutable.fromJS({
    fetching: false,
    error: false,
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  const actual = authReducer(undefined);
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

test('should handle LOGIN_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(ActionTypes.LOGIN),
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle LOGOUT_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(ActionTypes.LOGOUT),
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(ActionTypes.LOAD),
  };
  const actual = authReducer(initialState, action);
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

test('should handle LOGIN_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(ActionTypes.LOGIN),
    payload: response,
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle LOAD_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(ActionTypes.LOAD),
    payload: response,
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle LOGOUT_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(ActionTypes.LOGOUT),
    payload: response,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear());
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| FAILURE actions
|--------------------------------------------------------------------------
*/

const expectedFailureState = initialState
  .set('fetching', false)
  .set('error', Immutable.fromJS(error));

test('should handle LOGIN_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(ActionTypes.LOGIN),
    payload: error,
    error: true,
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle LOGOUT_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(ActionTypes.LOGOUT),
    payload: error,
    error: true,
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle LOAD_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(ActionTypes.LOAD),
    payload: error,
    error: true,
  };
  const actual = authReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
