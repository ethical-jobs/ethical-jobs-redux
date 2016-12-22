import Immutable from 'immutable';
import { createAction } from 'utils';
import { responses, error } from 'invoices/__tests__/_fixtures';
import invoiceReducer, { initialState } from 'invoices';
import * as ActionTypes from 'invoices/actions';
import {
  clearInvoices,
  updateFilter,
  updateQuery,
} from 'invoices/actions';

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
    },
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  const actual = invoiceReducer(undefined);
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearInvoices action correctly', () => {
  const action = clearInvoices();
  const actual = invoiceReducer(initialState, action);
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', Immutable.Set());
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateQuery action correctly', () => {
  const state = initialState
    .update('entities', entities => entities.mergeDeep(responses[0].data.entities))
    .update('result', result => result.union(responses[0].data.result));
  const actual = invoiceReducer(state, updateQuery('Foo bar bam'));
  const expected = initialState
    .set('query', 'Foo bar bam');
  expect(Immutable.is(actual, expected)).toBe(true);
});


test('should handle updateInvoicesFilter action correctly', () => {
  let actual = invoiceReducer(initialState, updateFilter({ organisationId: 123 }));
  actual = invoiceReducer(actual, updateFilter({ query: 'bees and birds' }));
  actual = invoiceReducer(actual, updateFilter({ organisationId: 456 }));
  const expected = initialState.set('filters', Immutable.fromJS({
    organisationId: 456,
    query: 'bees and birds',
  }));
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
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle FETCH_ENTITY_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_REQUEST`,
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_REQUEST`,
  };
  const actual = invoiceReducer(initialState, action);
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
  .update('entities', entities => entities.mergeDeep(responses[0].data.entities))
  .update('result', result => result.union(responses[0].data.result));

test('should handle FETCH_COLLECTION_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_COLLECTION}_SUCCESS`,
    payload: responses[0],
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle FETCH_ENTITY_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_SUCCESS`,
    payload: responses[0],
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle CREATE_SUCCESS action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_SUCCESS`,
    payload: responses[0],
  };
  const actual = invoiceReducer(initialState, action);
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
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle FETCH_ENTITY_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.FETCH_ENTITY}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle CREATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.CREATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle UPDATE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.UPDATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ARCHIVE_FAILURE action correctly', () => {
  const action = {
    type: `${ActionTypes.ARCHIVE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = invoiceReducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
