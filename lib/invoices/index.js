'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = reducer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('invoices/actions');

var InvoiceActions = _interopRequireWildcard(_actions);

var _utils = require('utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initial state
var initialState = exports.initialState = _immutable2.default.fromJS({
  fetching: false,
  error: false,
  query: '',
  filters: {
    organisationId: null
  },
  result: _immutable2.default.Set(),
  entities: _immutable2.default.Map()
});

/**
 * Purchase reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case InvoiceActions.CLEAR_ENTITIES:
      return state.update('entities', function (entities) {
        return entities.clear();
      }).update('result', function (result) {
        return result.clear();
      });

    case InvoiceActions.UPDATE_QUERY:
      return state.set('query', action.payload).update('entities', function (entities) {
        return entities.clear();
      }).update('result', function (result) {
        return result.clear();
      });

    case InvoiceActions.UPDATE_FILTER:
      return state.mergeDeep({ filters: action.payload });

    case (0, _utils.REQUEST)(InvoiceActions.FETCH_COLLECTION):
    case (0, _utils.REQUEST)(InvoiceActions.FETCH_ENTITY):
    case (0, _utils.REQUEST)(InvoiceActions.CREATE):
    case (0, _utils.REQUEST)(InvoiceActions.UPDATE):
    case (0, _utils.REQUEST)(InvoiceActions.ARCHIVE):
      return state.set('fetching', true).set('error', false);

    case (0, _utils.SUCCESS)(InvoiceActions.FETCH_COLLECTION):
    case (0, _utils.SUCCESS)(InvoiceActions.FETCH_ENTITY):
    case (0, _utils.SUCCESS)(InvoiceActions.CREATE):
    case (0, _utils.SUCCESS)(InvoiceActions.UPDATE):
    case (0, _utils.SUCCESS)(InvoiceActions.ARCHIVE):
      return state.set('fetching', false).set('error', false).update('entities', function (entities) {
        return entities.mergeDeep(action.payload.data.entities);
      }).update('result', function (result) {
        return result.union(action.payload.data.result);
      });

    case (0, _utils.FAILURE)(InvoiceActions.FETCH_COLLECTION):
    case (0, _utils.FAILURE)(InvoiceActions.FETCH_ENTITY):
    case (0, _utils.FAILURE)(InvoiceActions.CREATE):
    case (0, _utils.FAILURE)(InvoiceActions.UPDATE):
    case (0, _utils.FAILURE)(InvoiceActions.ARCHIVE):
      return state.set('fetching', false).set('error', _immutable2.default.fromJS(action.payload));

    default:
      return state;
  }
}