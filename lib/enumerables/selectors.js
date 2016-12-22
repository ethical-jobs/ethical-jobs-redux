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

var enumberablesSelector = function enumberablesSelector(state) {
  return state.entities.getIn(['credits', 'enumberables']);
};

exports.rootSelector = rootSelector;
exports.fetchingSelector = fetchingSelector;
exports.enumberablesSelector = enumberablesSelector;