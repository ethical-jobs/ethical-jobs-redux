'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _constants = require('./constants');

// Initial state
var initialState = exports.initialState = {
  _requesting: null,
  result: null,
  entities: {
    user: null,
    organisation: null
  }
};

/**
 * Jobs reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants.LOGIN_REQUEST:
    case _constants.LOAD_REQUEST:
    case _constants.LOGOUT_REQUEST:
      return _extends({}, state, {
        _requesting: _constants.LOGIN_REQUEST
      });
    case _constants.LOGIN_SUCCESS:
    case _constants.LOAD_SUCCESS:
      return _extends({}, state, {
        _requesting: null,
        result: action.data.result,
        entities: _extends({}, action.data.entities)
      });
    case _constants.LOGIN_FAILURE:
    case _constants.LOAD_FAILURE:
    case _constants.LOGOUT_FAILURE:
    case _constants.LOGOUT_SUCCESS:
      return _extends({}, state, initialState);
    default:
      return state;
  }
}