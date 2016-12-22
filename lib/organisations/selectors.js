'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organisationOwnerSelector = exports.organisationByIdSelector = exports.organisationsArraySelector = exports.organisationsSelector = exports.requestingSelector = undefined;

var _reselect = require('reselect');

var _map = require('library/map');

var baseSelector = function baseSelector(state) {
  return state.entities.organisations;
};

var requestingSelector = (0, _reselect.createSelector)(baseSelector, function (base) {
  return base._requesting;
});

var entitiesSelector = (0, _reselect.createSelector)(baseSelector, function (base) {
  return base.entities;
});

//
// Organisations
//

var organisationsSelector = (0, _reselect.createSelector)(entitiesSelector, function (entities) {
  return entities.organisations;
});

var organisationsArraySelector = (0, _reselect.createSelector)(organisationsSelector, function (organisations) {
  return (0, _map.mapObjectToArray)(organisations);
});

//
// Single Organisation
//

var organisationResultSelector = function organisationResultSelector(state) {
  return state.entities.organisations.result;
};

var organisationByIdSelector = (0, _reselect.createSelector)([organisationsSelector, organisationResultSelector], function (organisations, result) {
  return organisations && result ? organisations[result] : null;
});

//
// Organisation users selectors
//

var usersSelector = (0, _reselect.createSelector)(entitiesSelector, function (entities) {
  return entities.users;
});

var organisationOwnerSelector = (0, _reselect.createSelector)([usersSelector, organisationByIdSelector], function (users, organisation) {
  return users && organisation ? users[organisation.owner_id] : null;
});

exports.requestingSelector = requestingSelector;
exports.organisationsSelector = organisationsSelector;
exports.organisationsArraySelector = organisationsArraySelector;
exports.organisationByIdSelector = organisationByIdSelector;
exports.organisationOwnerSelector = organisationOwnerSelector;