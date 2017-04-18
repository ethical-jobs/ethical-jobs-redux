import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE } from 'utils/asyncTypes';
import { initialState } from 'modules/enumerables/reducer';
import * as Fixtures from 'modules/app/__tests__/_fixtures';
import * as Assert from 'testing/assertions';
import App from 'modules/app';
import Enumerables from 'modules/enumerables';

const Reducer = Enumerables.reducer;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    enumerables: {},
  });
  expect(Assert.initialState(Reducer, expectedState)).toBe(true);
});


/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(App.actions.FETCH_APP_DATA),
  ];
  expect(
    Assert.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(App.actions.FETCH_APP_DATA),
    payload: Fixtures.response,
  };
  const expectedState = initialState
    .set('fetching', false)
    .set('error', false)
    .set('enumerables', Immutable.fromJS(Fixtures.response.data.enumerables));
  const actual = Reducer(undefined, action);
  expect(Immutable.is(actual, expectedState)).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(App.actions.FETCH_APP_DATA),
  ];
  expect(
    Assert.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});

