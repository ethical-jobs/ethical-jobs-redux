'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('utils');

describe('createActionType function', function () {

  it('always returns a string', function () {
    expect(_typeof((0, _utils.createActionType)())).toBe('string');
    expect(_typeof((0, _utils.createActionType)('FOOBAR'))).toBe('string');
  });

  it('returns a correctly namespaced action', function () {
    expect((0, _utils.createActionType)('SOME_ACTION')).toBe('ej/SOME_ACTION');
  });
});

describe('async action type functions', function () {

  it('they always return a string', function () {
    expect(_typeof((0, _utils.REQUEST)())).toBe('string');
    expect(_typeof((0, _utils.SUCCESS)())).toBe('string');
    expect(_typeof((0, _utils.FAILURE)())).toBe('string');
  });

  it('they append async action types correctly', function () {
    expect((0, _utils.REQUEST)('SOME_ACTION')).toBe('SOME_ACTION_REQUEST');
    expect((0, _utils.SUCCESS)('SOME_ACTION')).toBe('SOME_ACTION_SUCCESS');
    expect((0, _utils.FAILURE)('SOME_ACTION')).toBe('SOME_ACTION_FAILURE');
  });
});