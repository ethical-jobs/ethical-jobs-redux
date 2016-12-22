'use strict';

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

var _actions = require('users/actions');

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('update action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.update)(params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: _api2.default.updateUser(params)
  });
});