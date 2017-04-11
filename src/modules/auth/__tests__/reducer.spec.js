import Immutable from 'immutable';
import { response, error } from './_fixtures';
import Auth from 'modules/auth';
import { initialState } from 'modules/auth/reducer';
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
    entities: {
      users: Immutable.Map(),
      organisations: Immutable.Map(),
    },
  });
  const actual = Auth.reducer(undefined);
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
    type: REQUEST(Auth.actions.LOGIN),
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle LOGOUT_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(Auth.actions.LOGOUT),
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(Auth.actions.LOAD),
  };
  const actual = Auth.reducer(initialState, action);
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
    type: SUCCESS(Auth.actions.LOGIN),
    payload: response,
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle LOAD_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(Auth.actions.LOAD),
    payload: response,
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle LOGOUT_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(Auth.actions.LOGOUT),
    payload: response,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', false)
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear());
  const actual = Auth.reducer(initialState, action);
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
    type: FAILURE(Auth.actions.LOGIN),
    payload: error,
    error: true,
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle LOGOUT_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(Auth.actions.LOGOUT),
    payload: error,
    error: true,
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle LOAD_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(Auth.actions.LOAD),
    payload: error,
    error: true,
  };
  const actual = Auth.reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
