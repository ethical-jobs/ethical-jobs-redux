'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _jobTypes = require('jobTypes');

var _selectors = require('jobs/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  entities: _immutable2.default.fromJS({
    jobs: {
      fetching: true,
      error: false,
      filters: {
        organisationId: 33,
        jobType: _jobTypes.PENDING
      },
      result: _immutable2.default.Set([1, 2, 3]),
      entities: _immutable2.default.fromJS({
        jobs: {
          1: { organisation_id: 100, status: _jobTypes.APPROVED, expired: false, title: 'Bar One' },
          2: { organisation_id: 33, status: _jobTypes.PENDING, expired: false, title: 'Bar Two' },
          3: { organisation_id: 100, status: _jobTypes.PENDING, expired: true, title: 'Bar Three' }
        }
      })
    }
  })
};

test('rootSelector returns correct state slice', function () {
  var expected = state.entities.get('jobs');
  var actual = (0, _selectors.rootSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', function () {
  expect((0, _selectors.fetchingSelector)(state)).toBe(true);
});

test('querySelector returns correct state slice', function () {
  var expected = state.entities.getIn(['jobs', 'query']);
  var actual = (0, _selectors.querySelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('filtersSelector returns correct state slice', function () {
  var expected = state.entities.getIn(['jobs', 'filters']);
  var actual = (0, _selectors.filtersSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['jobs', 'result']);
  var actual = (0, _selectors.resultSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('jobsSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['jobs', 'entities', 'jobs']);
  var actual = (0, _selectors.jobsSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('jobByIdSelector selector returns correct state slice', function () {
  var expected = state.entities.getIn(['jobs', 'entities', 'jobs']).first();
  var actual = (0, _selectors.jobByIdSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('jobsByFiltersSelector selector returns correct state slice', function () {
  var expected = _immutable2.default.fromJS({
    2: { organisation_id: 33, status: _jobTypes.PENDING, expired: false, title: 'Bar Two' }
  });
  var actual = (0, _selectors.jobsByFiltersSelector)(state);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});

test('jobsByFiltersSelector selector returns correct state with complex filters', function () {
  var complexState = {
    entities: _immutable2.default.fromJS({
      jobs: {
        filters: {
          organisationId: 10,
          jobType: _jobTypes.APPROVED
        },
        entities: _immutable2.default.fromJS({
          jobs: {
            1: { organisation_id: 10, status: _jobTypes.APPROVED, expired: false, title: 'Job One' },
            2: { organisation_id: 15, status: _jobTypes.PENDING, expired: true, title: 'Job Two' },
            3: { organisation_id: 10, status: _jobTypes.APPROVED, expired: true, title: 'Job Three' },
            4: { organisation_id: 10, status: _jobTypes.APPROVED, expired: false, title: 'Job Four' },
            5: { organisation_id: 15, status: _jobTypes.PENDING, expired: false, title: 'Job Five' },
            6: { organisation_id: 14, status: _jobTypes.APPROVED, expired: false, title: 'Job Six' }
          }
        })
      }
    })
  };
  var expected = _immutable2.default.fromJS({
    1: { organisation_id: 10, status: _jobTypes.APPROVED, expired: false, title: 'Job One' },
    4: { organisation_id: 10, status: _jobTypes.APPROVED, expired: false, title: 'Job Four' }
  });
  var actual = (0, _selectors.jobsByFiltersSelector)(complexState);
  expect(_immutable2.default.is(expected, actual)).toBe(true);
});