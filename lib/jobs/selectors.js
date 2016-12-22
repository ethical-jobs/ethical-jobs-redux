'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobMediaSelector = exports.jobsByFiltersSelector = exports.jobByIdSelector = exports.jobsSelector = exports.resultSelector = exports.filtersSelector = exports.querySelector = exports.fetchingSelector = exports.rootSelector = undefined;

var _reselect = require('reselect');

var _filters = require('filters');

var rootSelector = function rootSelector(state) {
  return state.entities.get('jobs');
};

var fetchingSelector = function fetchingSelector(state) {
  return state.entities.getIn(['jobs', 'fetching']);
};

var querySelector = function querySelector(state) {
  return state.entities.getIn(['jobs', 'query']);
};

var filtersSelector = function filtersSelector(state) {
  return state.entities.getIn(['jobs', 'filters']);
};

var resultSelector = function resultSelector(state) {
  return state.entities.getIn(['jobs', 'result']);
};

var jobsSelector = (0, _reselect.createSelector)(rootSelector, function (jobs) {
  return jobs.getIn(['entities', 'jobs']);
});

var jobByIdSelector = (0, _reselect.createSelector)([jobsSelector, resultSelector], function (jobs, result) {
  return jobs.get(result.first().toString());
});

var jobsByFiltersSelector = (0, _reselect.createSelector)([jobsSelector, filtersSelector], function (jobs, filters) {
  return jobs.filter(function (job) {
    return (0, _filters.filterEntitiesByOrgId)(job, filters.get('organisationId'));
  }).filter(function (job) {
    return (0, _filters.filterJobsByType)(job, filters.get('jobType'));
  });
});

var jobMediaSelector = (0, _reselect.createSelector)(rootSelector, function (jobs) {
  return jobs.getIn(['entities', 'media']);
});

exports.rootSelector = rootSelector;
exports.fetchingSelector = fetchingSelector;
exports.querySelector = querySelector;
exports.filtersSelector = filtersSelector;
exports.resultSelector = resultSelector;
exports.jobsSelector = jobsSelector;
exports.jobByIdSelector = jobByIdSelector;
exports.jobsByFiltersSelector = jobsByFiltersSelector;
exports.jobMediaSelector = jobMediaSelector;