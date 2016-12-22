'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('app/actions');

var AppActions = _interopRequireWildcard(_actions);

var _enumberables = require('enumberables');

var _enumberables2 = _interopRequireDefault(_enumberables);

var _fixtures = require('app/__tests__/_fixtures');

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
    enumberables: {}
  });
  expect(_immutable2.default.is((0, _enumberables2.default)(undefined, {}), expected)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle FETCH_APP_DATA_REQUEST action correctly', function () {
  var action = {
    type: AppActions.FETCH_APP_DATA + '_REQUEST',
    payload: _fixtures.response
  };
  var expected = _enumberables.initialState.set('fetching', true).set('error', false);
  var actual = (0, _enumberables2.default)(_enumberables.initialState, action);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_SUCCESS action correctly', function () {
  var action = {
    type: AppActions.FETCH_APP_DATA + '_SUCCESS',
    payload: _fixtures.response
  };
  var expected = _enumberables.initialState.set('fetching', false).set('error', false).set('enumberables', _fixtures.response.data.enumberables);
  var actual = (0, _enumberables2.default)(_enumberables.initialState, action);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('should handle FETCH_APP_DATA_FAILURE action correctly', function () {
  var action = {
    type: AppActions.FETCH_APP_DATA + '_FAILURE',
    payload: _fixtures.error
  };
  var expected = _enumberables.initialState.set('fetching', false).set('error', _immutable2.default.fromJS(_fixtures.error));
  var actual = (0, _enumberables2.default)(_enumberables.initialState, action);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});