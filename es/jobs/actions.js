'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuery = exports.updateFilter = exports.clearJobs = exports.detachMedia = exports.attachMedia = exports.expire = exports.approve = exports.archive = exports.update = exports.create = exports.fetchEntity = exports.fetchCollection = exports.UPDATE_QUERY = exports.UPDATE_FILTER = exports.CLEAR_ENTITIES = exports.DETACH = exports.ATTACH = exports.EXPIRE = exports.APPROVE = exports.ARCHIVE = exports.UPDATE = exports.CREATE = exports.FETCH_ENTITY = exports.FETCH_COLLECTION = undefined;

var _utils = require('utils');

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION = exports.FETCH_COLLECTION = (0, _utils.createActionType)('JOBS/FETCH_COLLECTION');
var FETCH_ENTITY = exports.FETCH_ENTITY = (0, _utils.createActionType)('JOBS/FETCH_ENTITY');
var CREATE = exports.CREATE = (0, _utils.createActionType)('JOBS/CREATE');
var UPDATE = exports.UPDATE = (0, _utils.createActionType)('JOBS/UPDATE');
var ARCHIVE = exports.ARCHIVE = (0, _utils.createActionType)('JOBS/ARCHIVE');
var APPROVE = exports.APPROVE = (0, _utils.createActionType)('JOBS/APPROVE');
var EXPIRE = exports.EXPIRE = (0, _utils.createActionType)('JOBS/EXPIRE');
var ATTACH = exports.ATTACH = (0, _utils.createActionType)('JOBS/ATTACH');
var DETACH = exports.DETACH = (0, _utils.createActionType)('JOBS/DETACH');
var CLEAR_ENTITIES = exports.CLEAR_ENTITIES = (0, _utils.createActionType)('JOBS/CLEAR_ENTITIES');
var UPDATE_FILTER = exports.UPDATE_FILTER = (0, _utils.createActionType)('JOBS/UPDATE_FILTER');
var UPDATE_QUERY = exports.UPDATE_QUERY = (0, _utils.createActionType)('JOBS/UPDATE_QUERY');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection = exports.fetchCollection = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION,
    payload: _api2.default.fetchJobs(params)
  };
};

var fetchEntity = exports.fetchEntity = function fetchEntity(params) {
  return {
    type: FETCH_ENTITY,
    payload: _api2.default.fetchJob(params)
  };
};

var create = exports.create = function create(params) {
  return {
    type: CREATE,
    payload: _api2.default.createJob(params)
  };
};

var update = exports.update = function update(params) {
  return {
    type: UPDATE,
    payload: _api2.default.updateJob(params)
  };
};

var archive = exports.archive = function archive(params) {
  return {
    type: ARCHIVE,
    payload: _api2.default.archiveJob(params)
  };
};

var approve = exports.approve = function approve(params) {
  return {
    type: APPROVE,
    payload: _api2.default.approveJob(params)
  };
};

var expire = exports.expire = function expire(params) {
  return {
    type: EXPIRE,
    payload: _api2.default.expireJob(params)
  };
};

var attachMedia = exports.attachMedia = function attachMedia(params) {
  return {
    type: ATTACH,
    payload: _api2.default.attachJobMedia(params)
  };
};

var detachMedia = exports.detachMedia = function detachMedia(params) {
  return {
    type: DETACH,
    payload: _api2.default.detachJobMedia(params)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clearJobs = exports.clearJobs = function clearJobs() {
  return {
    type: CLEAR_ENTITIES
  };
};

var updateFilter = exports.updateFilter = function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    payload: filter
  };
};

var updateQuery = exports.updateQuery = function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  };
};