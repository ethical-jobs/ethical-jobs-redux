'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _fixtures = require('invoices/__tests__/_fixtures');

var _selectors = require('invoices/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  entities: _immutable2.default.fromJS({
    invoices: {
      fetching: true,
      error: false,
      filters: {
        organisationId: 33
      },
      result: _immutable2.default.Set([1, 2, 3]),
      entities: _immutable2.default.fromJS({
        invoices: {
          1: { organisation_id: 100, uudi: '00-00-1' },
          2: { organisation_id: 33, uudi: '00-00-2' },
          3: { organisation_id: 33, uudi: '00-00-3' }
        }
      })
    }
  })
};

test('rootSelector returns correct state slice', function () {
  var expected = state.entities.get('invoices');
  var actual = (0, _selectors.rootSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', function () {
  expect((0, _selectors.fetchingSelector)(state)).toBe(true);
});

test('querySelector returns correct state slice', function () {
  var expected = state.entities.getIn(['invoices', 'query']);
  var actual = (0, _selectors.querySelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('filtersSelector returns correct state slice', function () {
  var expected = state.entities.getIn(['invoices', 'filters']);
  var actual = (0, _selectors.filtersSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['invoices', 'result']);
  var actual = (0, _selectors.resultSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('invoicesSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['invoices', 'entities', 'invoices']);
  var actual = (0, _selectors.invoicesSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('invoiceByIdSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['invoices', 'entities', 'invoices']).first();
  var actual = (0, _selectors.invoiceByIdSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('invoicesByFiltersSelector selector returns correct state slice', function () {
  var expected = _immutable2.default.fromJS({
    2: { organisation_id: 33, uudi: '00-00-2' },
    3: { organisation_id: 33, uudi: '00-00-3' }
  });
  var actual = (0, _selectors.invoicesByFiltersSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('invoicesByFiltersSelector selector returns correct state with complex filters', function () {
  var complexState = {
    entities: _immutable2.default.fromJS({
      invoices: {
        filters: {
          organisationId: 33
        },
        entities: _immutable2.default.fromJS({
          invoices: {
            1: { organisation_id: 33, uuid: '00-00-21' },
            2: { organisation_id: 34, uuid: '00-00-22' },
            3: { organisation_id: 107, uuid: '00-00-23' }
          }
        })
      }
    })
  };
  var expected = _immutable2.default.fromJS({ 1: { organisation_id: 33, uuid: '00-00-21' } });
  var actual = (0, _selectors.invoicesByFiltersSelector)(complexState);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});