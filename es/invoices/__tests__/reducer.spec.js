'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('utils');

var _fixtures = require('invoices/__tests__/_fixtures');

var _invoices = require('invoices');

var _invoices2 = _interopRequireDefault(_invoices);

var _actions = require('invoices/actions');

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', function () {
  var expected = _immutable2.default.fromJS({
    fetching: false,
    error: false,
    query: '',
    filters: {
      organisationId: null
    },
    result: _immutable2.default.Set(),
    entities: _immutable2.default.Map()
  });
  var actual = (0, _invoices2.default)(undefined);
  expect(_immutable2.default.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearInvoices action correctly', function () {
  var action = (0, _actions.clearInvoices)();
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  var expected = _invoices.initialState.set('entities', _immutable2.default.Map()).set('result', _immutable2.default.Set());
  expect(_immutable2.default.is(actual, expected)).toBe(true);
});

test('should handle updateQuery action correctly', function () {
  var state = _invoices.initialState.update('entities', function (entities) {
    return entities.mergeDeep(_fixtures.responses[0].data.entities);
  }).update('result', function (result) {
    return result.union(_fixtures.responses[0].data.result);
  });
  var actual = (0, _invoices2.default)(state, (0, _actions.updateQuery)('Foo bar bam'));
  var expected = _invoices.initialState.set('query', 'Foo bar bam');
  expect(_immutable2.default.is(actual, expected)).toBe(true);
});

test('should handle updateInvoicesFilter action correctly', function () {
  var actual = (0, _invoices2.default)(_invoices.initialState, (0, _actions.updateFilter)({ organisationId: 123 }));
  actual = (0, _invoices2.default)(actual, (0, _actions.updateFilter)({ query: 'bees and birds' }));
  actual = (0, _invoices2.default)(actual, (0, _actions.updateFilter)({ organisationId: 456 }));
  var expected = _invoices.initialState.set('filters', _immutable2.default.fromJS({
    organisationId: 456,
    query: 'bees and birds'
  }));
  expect(_immutable2.default.is(actual, expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| REQUEST actions
|--------------------------------------------------------------------------
*/

var expectedRequestState = _invoices.initialState.set('fetching', true).set('error', false);

test('should handle FETCH_COLLECTION_REQUEST action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_COLLECTION + '_REQUEST'
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedRequestState)).toBe(true);
});

test('should handle FETCH_ENTITY_REQUEST action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_ENTITY + '_REQUEST'
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedRequestState)).toBe(true);
});

test('should handle CREATE_REQUEST action correctly', function () {
  var action = {
    type: ActionTypes.CREATE + '_REQUEST'
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedRequestState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| SUCCESS actions
|--------------------------------------------------------------------------
*/

var expectedSuccessState = _invoices.initialState.set('fetching', false).set('error', false).update('entities', function (entities) {
  return entities.mergeDeep(_fixtures.responses[0].data.entities);
}).update('result', function (result) {
  return result.union(_fixtures.responses[0].data.result);
});

test('should handle FETCH_COLLECTION_SUCCESS action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_COLLECTION + '_SUCCESS',
    payload: _fixtures.responses[0]
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle FETCH_ENTITY_SUCCESS action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_ENTITY + '_SUCCESS',
    payload: _fixtures.responses[0]
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedSuccessState)).toBe(true);
});

test('should handle CREATE_SUCCESS action correctly', function () {
  var action = {
    type: ActionTypes.CREATE + '_SUCCESS',
    payload: _fixtures.responses[0]
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedSuccessState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| FAILURE actions
|--------------------------------------------------------------------------
*/

var expectedFailureState = _invoices.initialState.set('fetching', false).set('error', _immutable2.default.fromJS(_fixtures.error));

test('should handle FETCH_COLLECTION_FAILURE action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_COLLECTION + '_FAILURE',
    payload: _fixtures.error,
    error: true
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedFailureState)).toBe(true);
});

test('should handle FETCH_ENTITY_FAILURE action correctly', function () {
  var action = {
    type: ActionTypes.FETCH_ENTITY + '_FAILURE',
    payload: _fixtures.error,
    error: true
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedFailureState)).toBe(true);
});

test('should handle CREATE_FAILURE action correctly', function () {
  var action = {
    type: ActionTypes.CREATE + '_FAILURE',
    payload: _fixtures.error,
    error: true
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedFailureState)).toBe(true);
});

test('should handle UPDATE_FAILURE action correctly', function () {
  var action = {
    type: ActionTypes.UPDATE + '_FAILURE',
    payload: _fixtures.error,
    error: true
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedFailureState)).toBe(true);
});

test('should handle ARCHIVE_FAILURE action correctly', function () {
  var action = {
    type: ActionTypes.ARCHIVE + '_FAILURE',
    payload: _fixtures.error,
    error: true
  };
  var actual = (0, _invoices2.default)(_invoices.initialState, action);
  expect(_immutable2.default.is(actual, expectedFailureState)).toBe(true);
});