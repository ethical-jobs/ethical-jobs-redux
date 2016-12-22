'use strict';

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

var _actions = require('jobs/actions');

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('clearJobs creates correct action', function () {
  expect((0, _actions.clearJobs)()).toEqual({
    type: ActionTypes.CLEAR_ENTITIES
  });
});

test('updateQuery creates correct action', function () {
  expect((0, _actions.updateFilter)('Foo bar bam...')).toEqual({
    type: ActionTypes.UPDATE_FILTER,
    payload: 'Foo bar bam...'
  });
});

test('updateFilter creates correct action', function () {
  var filter = { foo: 'bar' };
  expect((0, _actions.updateFilter)(filter)).toEqual({
    type: ActionTypes.UPDATE_FILTER,
    payload: filter
  });
});

test('fetchCollection creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.fetchCollection)(params)).toEqual({
    type: ActionTypes.FETCH_COLLECTION,
    payload: _api2.default.fetchJobs(params)
  });
});

test('fetchEntity creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.fetchEntity)(params)).toEqual({
    type: ActionTypes.FETCH_ENTITY,
    payload: _api2.default.fetchJob(params)
  });
});

test('create action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.create)(params)).toEqual({
    type: ActionTypes.CREATE,
    payload: _api2.default.createJob(params)
  });
});

test('update action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.update)(params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: _api2.default.updateJob(params)
  });
});

test('archive action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.archive)(params)).toEqual({
    type: ActionTypes.ARCHIVE,
    payload: _api2.default.archiveJob(params)
  });
});

test('approve action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.approve)(params)).toEqual({
    type: ActionTypes.APPROVE,
    payload: _api2.default.approveJob(params)
  });
});

test('expire action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.expire)(params)).toEqual({
    type: ActionTypes.EXPIRE,
    payload: _api2.default.expireJob(params)
  });
});

test('attachMedia action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.attachMedia)(params)).toEqual({
    type: ActionTypes.ATTACH,
    payload: _api2.default.attachJobMedia(params)
  });
});

test('detachMedia action creates correct action', function () {
  var params = { foo: 'bar', bar: 'foo' };
  expect((0, _actions.detachMedia)(params)).toEqual({
    type: ActionTypes.DETACH,
    payload: _api2.default.detachJobMedia(params)
  });
});