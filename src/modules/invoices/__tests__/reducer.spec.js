import Immutable from 'immutable';
import { createAction } from 'utils';
import { responses, error } from './_fixtures';
import { initialState } from 'modules/invoices/reducer';
import Invoices from 'modules/invoices';

const Actions = Invoices.actions;

const Reducer = Invoices.reducer;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state ', () => {
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
  const actual = Reducer(undefined);
  expect(Immutable.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearInvoices action correctly', () => {
  const action = Actions.clearInvoices();
  const actual = Reducer(initialState, action);
  const expected = initialState
    .set('entities', Immutable.Map())
    .set('result', Immutable.Set());
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle updateQuery action correctly', () => {
  const state = initialState
    .update('entities', entities => entities.mergeDeep(responses[0].data.entities))
    .update('result', result => result.union(responses[0].data.result));
  const actual = Reducer(state, Actions.updateQuery('Foo bar bam'));
  const expected = initialState
    .set('query', 'Foo bar bam');
  expect(Immutable.is(actual, expected)).toBe(true);
});


test('should handle updateInvoicesFilter action correctly', () => {
  let actual = Reducer(initialState, Actions.updateFilter({ organisationId: 123 }));
  actual = Reducer(actual, Actions.updateFilter({ query: 'bees and birds' }));
  actual = Reducer(actual, Actions.updateFilter({ organisationId: 456 }));
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
    type: `${Actions.FETCH_COLLECTION}_REQUEST`,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle FETCH_ENTITY_REQUEST action correctly', () => {
  const action = {
    type: `${Actions.FETCH_ENTITY}_REQUEST`,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedRequestState)).toBe(true);
});

test('should handle SEARCH_REQUEST action correctly', () => {
  const action = {
    type: `${Actions.SEARCH}_REQUEST`,
  };
  const actual = Reducer(initialState, action);
  const expected = expectedRequestState
    .update('entities', entities => entities.clear())
    .update('result', result => result.clear());
  expect(Immutable.is(actual, expected)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', () => {
  const action = {
    type: `${Actions.CREATE}_REQUEST`,
  };
  const actual = Reducer(initialState, action);
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
    type: `${Actions.FETCH_COLLECTION}_SUCCESS`,
    payload: responses[0],
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle FETCH_ENTITY_SUCCESS action correctly', () => {
  const action = {
    type: `${Actions.FETCH_ENTITY}_SUCCESS`,
    payload: responses[0],
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle CREATE_SUCCESS action correctly', () => {
  const action = {
    type: `${Actions.CREATE}_SUCCESS`,
    payload: responses[0],
  };
  const actual = Reducer(initialState, action);
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
    type: `${Actions.FETCH_COLLECTION}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle FETCH_ENTITY_FAILURE action correctly', () => {
  const action = {
    type: `${Actions.FETCH_ENTITY}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle CREATE_FAILURE action correctly', () => {
  const action = {
    type: `${Actions.CREATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle UPDATE_FAILURE action correctly', () => {
  const action = {
    type: `${Actions.UPDATE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ARCHIVE_FAILURE action correctly', () => {
  const action = {
    type: `${Actions.ARCHIVE}_FAILURE`,
    payload: error,
    error: true,
  };
  const actual = Reducer(initialState, action);
  expect(Immutable.is(actual, expectedFailureState)).toBe(true);
});
