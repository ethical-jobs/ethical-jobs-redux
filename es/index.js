'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _jobs = require('jobs');

var _jobs2 = _interopRequireDefault(_jobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _immutable2.default.Map((0, _redux.combineReducers)({
  jobs: _jobs2.default
}));
module.exports = exports['default'];