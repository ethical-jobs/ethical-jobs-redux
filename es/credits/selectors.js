'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootSelector = function rootSelector(state) {
  return state.entities.get('credits');
};

var fetchingSelector = function fetchingSelector(state) {
  return state.entities.getIn(['credits', 'fetching']);
};

var creditPacksSelector = function creditPacksSelector(state) {
  return state.entities.getIn(['credits', 'creditPacks']);
};

exports.rootSelector = rootSelector;
exports.fetchingSelector = fetchingSelector;
exports.creditPacksSelector = creditPacksSelector;