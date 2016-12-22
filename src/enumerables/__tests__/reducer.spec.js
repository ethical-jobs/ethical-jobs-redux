import Immutable from 'immutable';
import * as AppActions from 'app/actions';
import enumerablesReducer, { initialState } from 'enumerables';
import { REQUEST, SUCCESS, FAILURE } from 'utils';
import { response, error } from 'app/__tests__/_fixtures';

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expected = Immutable.fromJS({
    fetching: false,
    error: false,
    enumerables: {},
  });
  expect(Immutable.is(enumerablesReducer(undefined, {}), expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle FETCH_APP_DATA_REQUEST action correctly', () => {
  const action = {
    type: REQUEST(AppActions.FETCH_APP_DATA),
    payload: response,
  };
  const expected = initialState
    .set('fetching', true)
    .set('error', false);
  const actual = enumerablesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(AppActions.FETCH_APP_DATA),
    payload: response,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', false)
    .set('enumerables', response.data.enumerables);
  const actual = enumerablesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_FAILURE action correctly', () => {
  const action = {
    type: FAILURE(AppActions.FETCH_APP_DATA),
    payload: error,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', Immutable.fromJS(error));
  const actual = enumerablesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

