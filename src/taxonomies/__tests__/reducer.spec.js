import Immutable from 'immutable';
import * as AppActions from 'app/actions';
import taxonomiesReducer, { initialState } from 'taxonomies';
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
    taxonomies: {},
  });
  expect(Immutable.is(taxonomiesReducer(undefined, {}), expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle FETCH_APP_DATA_REQUEST action correctly', () => {
  const action = {
    type: `${AppActions.FETCH_APP_DATA}_REQUEST`,
    payload: response,
  };
  const expected = initialState
    .set('fetching', true)
    .set('error', false);
  const actual = taxonomiesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_SUCCESS action correctly', () => {
  const action = {
    type: `${AppActions.FETCH_APP_DATA}_SUCCESS`,
    payload: response,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', false)
    .set('taxonomies', response.data.taxonomies);
  const actual = taxonomiesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_FAILURE action correctly', () => {
  const action = {
    type: `${AppActions.FETCH_APP_DATA}_FAILURE`,
    payload: error,
  };
  const expected = initialState
    .set('fetching', false)
    .set('error', Immutable.fromJS(error));
  const actual = taxonomiesReducer(initialState, action);
  expect(Immutable.is(expected, actual)).toBe(true);
});

