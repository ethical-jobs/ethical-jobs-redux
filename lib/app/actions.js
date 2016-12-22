'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAppData = exports.FETCH_APP_DATA = undefined;

var _utils = require('utils');

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_APP_DATA = exports.FETCH_APP_DATA = (0, _utils.createActionType)('APP/FETCH_DATA');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchAppData = exports.fetchAppData = function fetchAppData() {
  return {
    type: FETCH_APP_DATA,
    payload: _api2.default.initialize()
  };
};