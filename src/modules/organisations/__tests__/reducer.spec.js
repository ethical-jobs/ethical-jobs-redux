import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE } from 'utils/asyncTypes';
import { initialState } from 'modules/organisations/reducer';
import * as Assert from 'testing/assertions';
import * as Fixtures from './_fixtures';
import Organisations from 'modules/organisations';

const Reducer = Organisations.reducer;
const Actions = Organisations.actions;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    filters: Immutable.Map(),
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  expect(Assert.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Sync action handling
|--------------------------------------------------------------------------
*/

test('should handle clearOrganisations action correctly', () => {
  expect(
    Assert.clearedEntities(Reducer, Actions.clearOrganisations(), initialState)
  ).toBe(true);
});

test('should handle updateFilters action correctly', () => {
  expect(
    Assert.updatedFilters(Reducer, Actions.updateFilter, initialState)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| REQUEST actions
|--------------------------------------------------------------------------
*/

test('should handle SEARCH_REQUEST action correctly', () => {
  expect(
    Assert.searchRequestState(Reducer, Actions.SEARCH, initialState)
  ).toBe(true);
});

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
    REQUEST(Actions.CREATE),
    REQUEST(Actions.UPDATE),
    REQUEST(Actions.ARCHIVE),
    REQUEST(Actions.CREATE_CREDITS),
    REQUEST(Actions.DEDUCT_CREDITS),
  ];
  expect(
    Assert.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.FETCH_COLLECTION),
    SUCCESS(Actions.FETCH_ENTITY),
    SUCCESS(Actions.CREATE),
    SUCCESS(Actions.UPDATE),
    SUCCESS(Actions.ARCHIVE),
    SUCCESS(Actions.CREATE_CREDITS),
    SUCCESS(Actions.DEDUCT_CREDITS),
  ];
  expect(
    Assert.successState(Reducer, actionTypes, initialState, Fixtures.collection)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
    FAILURE(Actions.CREATE),
    FAILURE(Actions.UPDATE),
    FAILURE(Actions.ARCHIVE),
    FAILURE(Actions.CREATE_CREDITS),
    FAILURE(Actions.DEDUCT_CREDITS),
  ];
  expect(
    Assert.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
