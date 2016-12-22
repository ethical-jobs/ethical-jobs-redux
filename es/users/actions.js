'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.UPDATE = undefined;

var _utils = require('utils');

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var UPDATE = exports.UPDATE = (0, _utils.createActionType)('USERS/UPDATE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var update = exports.update = function update(params) {
  return {
    type: UPDATE,
    payload: _api2.default.updateUser(params)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/