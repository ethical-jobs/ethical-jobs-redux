'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _fixtures = require('app/__tests__/_fixtures');

var _selectors = require('credits/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  entities: _immutable2.default.fromJS({
    credits: {
      fetching: true,
      error: false,
      creditPacks: [{
        id: 1,
        price: 110,
        service_type: 'REGULAR'
      }, {
        id: 2,
        price: 130,
        service_type: 'MANAGED'
      }]
    }
  })
};

test('rootSelector returns correct state slice', function () {
  var expected = state.entities.get('credits');
  var actual = (0, _selectors.rootSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', function () {
  expect((0, _selectors.fetchingSelector)(state)).toBe(true);
});

test('creditPacks selector returns correct state slice', function () {
  var expected = state.entities.getIn(['credits', 'creditPacks']);
  var actual = (0, _selectors.creditPacksSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});