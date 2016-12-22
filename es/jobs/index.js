'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = reducer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('jobs/actions');

var JobActions = _interopRequireWildcard(_actions);

var _utils = require('utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initial state
var initialState = exports.initialState = _immutable2.default.fromJS({
  fetching: false,
  error: false,
  query: '',
  filters: {
    organisationId: null,
    jobType: null
  },
  result: _immutable2.default.Set(),
  entities: _immutable2.default.Map()
});

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case JobActions.CLEAR_ENTITIES:
      return state.update('entities', function (entities) {
        return entities.clear();
      }).update('result', function (result) {
        return result.clear();
      });

    case JobActions.UPDATE_QUERY:
      return state.set('query', action.payload).update('entities', function (entities) {
        return entities.clear();
      }).update('result', function (result) {
        return result.clear();
      });

    case JobActions.UPDATE_FILTER:
      return state.mergeDeep({ filters: action.payload });

    case (0, _utils.REQUEST)(JobActions.FETCH_COLLECTION):
    case (0, _utils.REQUEST)(JobActions.FETCH_ENTITY):
    case (0, _utils.REQUEST)(JobActions.CREATE):
    case (0, _utils.REQUEST)(JobActions.UPDATE):
    case (0, _utils.REQUEST)(JobActions.ARCHIVE):
    case (0, _utils.REQUEST)(JobActions.APPROVE):
    case (0, _utils.REQUEST)(JobActions.EXPIRE):
    case (0, _utils.REQUEST)(JobActions.ATTACH):
    case (0, _utils.REQUEST)(JobActions.DETACH):
      return state.set('fetching', true).set('error', false);

    case (0, _utils.SUCCESS)(JobActions.FETCH_COLLECTION):
    case (0, _utils.SUCCESS)(JobActions.FETCH_ENTITY):
    case (0, _utils.SUCCESS)(JobActions.CREATE):
    case (0, _utils.SUCCESS)(JobActions.CREATE):
    case (0, _utils.SUCCESS)(JobActions.UPDATE):
    case (0, _utils.SUCCESS)(JobActions.ARCHIVE):
    case (0, _utils.SUCCESS)(JobActions.APPROVE):
    case (0, _utils.SUCCESS)(JobActions.EXPIRE):
    case (0, _utils.SUCCESS)(JobActions.ATTACH):
    case (0, _utils.SUCCESS)(JobActions.DETACH):
      return state.set('fetching', false).set('error', false).update('entities', function (entities) {
        return entities.mergeDeep(action.payload.data.entities);
      }).update('result', function (result) {
        return result.union(action.payload.data.result);
      });

    case (0, _utils.FAILURE)(JobActions.FETCH_COLLECTION):
    case (0, _utils.FAILURE)(JobActions.FETCH_ENTITY):
    case (0, _utils.FAILURE)(JobActions.CREATE):
    case (0, _utils.FAILURE)(JobActions.CREATE):
    case (0, _utils.FAILURE)(JobActions.UPDATE):
    case (0, _utils.FAILURE)(JobActions.ARCHIVE):
    case (0, _utils.FAILURE)(JobActions.APPROVE):
    case (0, _utils.FAILURE)(JobActions.EXPIRE):
    case (0, _utils.FAILURE)(JobActions.ATTACH):
    case (0, _utils.FAILURE)(JobActions.DETACH):
      return state.set('fetching', false).set('error', _immutable2.default.fromJS(action.payload));

    default:
      return state;
  }
}