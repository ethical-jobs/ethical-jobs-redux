'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = reducer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('app/actions');

var AppActions = _interopRequireWildcard(_actions);

var _utils = require('utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initial state
var initialState = exports.initialState = _immutable2.default.fromJS({
  fetching: false,
  error: false,
  enumberables: {}
});

/**
 * ...
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case (0, _utils.REQUEST)(AppActions.FETCH_APP_DATA):
      return state.set('fetching', true).set('error', false);

    case (0, _utils.SUCCESS)(AppActions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('enumberables', action.payload.data.taxonomies);

    case (0, _utils.FAILURE)(AppActions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', _immutable2.default.fromJS(action.payload));

    default:
      return state;
  }
}