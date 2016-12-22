'use strict';

var _actions = require('app/actions');

var AppActions = _interopRequireWildcard(_actions);

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

test('fetchAppData creates correct async action', function () {
  expect(AppActions.fetchAppData()).toEqual({
    type: AppActions.FETCH_APP_DATA,
    payload: _api2.default.initialize()
  });
});