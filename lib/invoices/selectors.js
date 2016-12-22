'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invoicesByFiltersSelector = exports.invoiceByIdSelector = exports.invoicesSelector = exports.resultSelector = exports.filtersSelector = exports.querySelector = exports.fetchingSelector = exports.rootSelector = undefined;

var _reselect = require('reselect');

var _filters = require('filters');

var rootSelector = function rootSelector(state) {
  return state.entities.get('invoices');
};

var fetchingSelector = function fetchingSelector(state) {
  return state.entities.getIn(['invoices', 'fetching']);
};

var querySelector = function querySelector(state) {
  return state.entities.getIn(['jobs', 'query']);
};

var filtersSelector = function filtersSelector(state) {
  return state.entities.getIn(['invoices', 'filters']);
};

var resultSelector = function resultSelector(state) {
  return state.entities.getIn(['invoices', 'result']);
};

var invoicesSelector = (0, _reselect.createSelector)(rootSelector, function (invoices) {
  return invoices.getIn(['entities', 'invoices']);
});

var invoiceByIdSelector = (0, _reselect.createSelector)([invoicesSelector, resultSelector], function (invoices, result) {
  return invoices.get(result.first().toString());
});

var invoicesByFiltersSelector = (0, _reselect.createSelector)([invoicesSelector, filtersSelector], function (invoices, filters) {
  return invoices.filter(function (invoice) {
    return (0, _filters.filterEntitiesByOrgId)(invoice, filters.get('organisationId'));
  });
});

exports.rootSelector = rootSelector;
exports.fetchingSelector = fetchingSelector;
exports.querySelector = querySelector;
exports.filtersSelector = filtersSelector;
exports.resultSelector = resultSelector;
exports.invoicesSelector = invoicesSelector;
exports.invoiceByIdSelector = invoiceByIdSelector;
exports.invoicesByFiltersSelector = invoicesByFiltersSelector;