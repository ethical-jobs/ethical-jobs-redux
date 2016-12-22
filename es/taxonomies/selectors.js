'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootSelector = function rootSelector(state) {
  return state.entities.get('enumberables');
};

var fetchingSelector = function fetchingSelector(state) {
  return state.entities.getIn(['enumberables', 'fetching']);
};

var taxonomiesSelector = function taxonomiesSelector(state) {
  return state.entities.getIn(['credits', 'taxonomies']);
};

exports.rootSelector = rootSelector;
exports.fetchingSelector = fetchingSelector;
exports.taxonomiesSelector = taxonomiesSelector;