'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initial state
var initialState = exports.initialState = {
  _requesting: null,
  result: null,
  entities: {
    organisations: null,
    users: null
  }
};

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants.CLEAR:
      return _extends({}, state, {
        result: initialState.result,
        entities: _extends({}, initialState.entities)
      });
    case _constants.ARCHIVE_REQUEST:
    case _constants.FETCH_ORGS_REQUEST:
    case _constants.FETCH_ORG_REQUEST:
      return _extends({}, state, {
        _requesting: _constants.FETCH_ORGS_REQUEST
      });
    case _constants.FETCH_ORGS_SUCCESS:
    case _constants.FETCH_ORG_SUCCESS:
      return _extends({}, state, {
        _requesting: null,
        // BUG: action.result can be array or value!!
        result: action.data.result,
        entities: (0, _merge2.default)({}, state.entities, action.data.entities)
      });
    case _constants.ARCHIVE_FAILURE:
    case _constants.ARCHIVE_SUCCESS:
    case _constants.FETCH_ORGS_FAILURE:
    case _constants.FETCH_ORG_FAILURE:
      return _extends({}, state, {
        _requesting: null
      });
    default:
      return state;
  }
}