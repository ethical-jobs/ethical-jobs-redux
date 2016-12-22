'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _fixtures = require('app/__tests__/_fixtures');

var _selectors = require('taxonomies/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  entities: _immutable2.default.fromJS({
    credits: {
      fetching: true,
      error: false,
      taxonomies: {
        categories: [{
          id: 1,
          title: 'Administration',
          slug: 'administration'
        }, {
          id: 2,
          title: 'Advocacy and Campaigns',
          slug: 'advocacy'
        }],
        locations: [{
          id: 1,
          title: 'Melbourne',
          slug: 'VIC'
        }, {
          id: 2,
          title: 'Regional VIC',
          slug: 'REGVIC'
        }]
      }
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

test('taxonomies selector returns correct state slice', function () {
  var expected = state.entities.getIn(['taxonomies', 'taxonomies']);
  var actual = (0, _selectors.taxonomiesSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});