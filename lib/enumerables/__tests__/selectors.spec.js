'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _fixtures = require('app/__tests__/_fixtures');

var _selectors = require('enumerables/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  entities: _immutable2.default.fromJS({
    enumerables: {
      fetching: true,
      error: false,
      enumerables: {
        roles: {
          SUPER_ADMIN: 'Super admin',
          SUPER_USER: 'Super user'
        },
        jobStatus: {
          PENDING: 'Pending approval',
          APPROVED: 'Approved',
          DRAFT: 'Draft'
        }
      }
    }
  })
};

test('rootSelector returns correct state slice', function () {
  var expected = state.entities.get('enumerables');
  var actual = (0, _selectors.rootSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', function () {
  expect((0, _selectors.fetchingSelector)(state)).toBe(true);
});

test('enumerables selector returns correct state slice', function () {
  var expected = state.entities.getIn(['enumerables', 'enumerables']);
  var actual = (0, _selectors.enumerablesSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});