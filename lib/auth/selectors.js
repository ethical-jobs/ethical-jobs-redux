'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSuperAdminSelector = exports.organisationSelector = exports.userSelector = exports.authSelector = undefined;

var _reselect = require('reselect');

var _auth = require('library/auth');

var authSelector = function authSelector(state) {
  return state.auth;
};

var entitiesSelector = (0, _reselect.createSelector)(authSelector, function (auth) {
  return auth.entities;
});

var userSelector = (0, _reselect.createSelector)([entitiesSelector, authSelector], function (entities, auth) {
  return entities.users && auth.result ? entities.users[auth.result] : null;
} // assume its the first user, cause it just is!
);

var organisationSelector = (0, _reselect.createSelector)(entitiesSelector, userSelector, function (entities, user) {
  return entities && entities.organisations && user ? entities.organisations[user.organisation_id] : null;
});

var isSuperAdminSelector = (0, _reselect.createSelector)(userSelector, function (user) {
  return (0, _auth.isSuperAdmin)(user);
});

exports.authSelector = authSelector;
exports.userSelector = userSelector;
exports.organisationSelector = organisationSelector;
exports.isSuperAdminSelector = isSuperAdminSelector;