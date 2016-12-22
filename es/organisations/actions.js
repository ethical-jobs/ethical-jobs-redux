'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuery = exports.updateFilter = exports.clearOrganisations = exports.uploadLogo = exports.deductCredits = exports.createCredits = exports.archive = exports.update = exports.create = exports.fetchEntity = exports.fetchCollection = exports.UPDATE_FILTER = exports.UPDATE_QUERY = exports.CLEAR_ENTITIES = exports.UPLOAD_LOGO = exports.DEDUCT_CREDITS = exports.CREATE_CREDITS = exports.ARCHIVE = exports.UPDATE = exports.CREATE = exports.FETCH_ENTITY = exports.FETCH_COLLECTION = undefined;

var _utils = require('utils');

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION = exports.FETCH_COLLECTION = (0, _utils.createActionType)('ORGANISATIONS/FETCH_COLLECTION');
var FETCH_ENTITY = exports.FETCH_ENTITY = (0, _utils.createActionType)('ORGANISATIONS/FETCH_ENTITY');
var CREATE = exports.CREATE = (0, _utils.createActionType)('ORGANISATIONS/CREATE');
var UPDATE = exports.UPDATE = (0, _utils.createActionType)('ORGANISATIONS/UPDATE');
var ARCHIVE = exports.ARCHIVE = (0, _utils.createActionType)('ORGANISATIONS/ARCHIVE');
var CREATE_CREDITS = exports.CREATE_CREDITS = (0, _utils.createActionType)('ORGANISATIONS/CREATE_CREDITS');
var DEDUCT_CREDITS = exports.DEDUCT_CREDITS = (0, _utils.createActionType)('ORGANISATIONS/DEDUCT_CREDITS');
var UPLOAD_LOGO = exports.UPLOAD_LOGO = (0, _utils.createActionType)('ORGANISATIONS/UPLOAD_LOGO');
var CLEAR_ENTITIES = exports.CLEAR_ENTITIES = (0, _utils.createActionType)('ORGANISATIONS/CLEAR_ENTITIES');
var UPDATE_QUERY = exports.UPDATE_QUERY = (0, _utils.createActionType)('ORGANISATIONS/UPDATE_QUERY');
var UPDATE_FILTER = exports.UPDATE_FILTER = (0, _utils.createActionType)('ORGANISATIONS/UPDATE_FILTER');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection = exports.fetchCollection = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION,
    payload: _api2.default.fetchInvoices(params)
  };
};

var fetchEntity = exports.fetchEntity = function fetchEntity(params) {
  return {
    type: FETCH_ENTITY,
    payload: _api2.default.fetchInvoice(params)
  };
};

var create = exports.create = function create(params) {
  return {
    type: CREATE,
    payload: _api2.default.createInvoice(params)
  };
};

var update = exports.update = function update(params) {
  return {
    type: UPDATE,
    payload: _api2.default.updateInvoice(params)
  };
};

var archive = exports.archive = function archive(params) {
  return {
    type: ARCHIVE,
    payload: _api2.default.archiveInvoice(params)
  };
};

var createCredits = exports.createCredits = function createCredits(params) {
  return {
    type: CREATE_CREDITS,
    payload: _api2.default.xxx(params)
  };
};

var deductCredits = exports.deductCredits = function deductCredits(params) {
  return {
    type: DEDUCT_CREDITS,
    payload: _api2.default.xxx(params)
  };
};

var uploadLogo = exports.uploadLogo = function uploadLogo(params) {
  return {
    type: UPLOAD_LOGO,
    payload: _api2.default.xxx(params)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clearOrganisations = exports.clearOrganisations = function clearOrganisations() {
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