import Immutable from 'immutable';
import { APPROVED, PENDING, EXPIRED } from 'jobTypes';
import {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  jobsSelector,
  jobsListSelector,
  jobByIdSelector,
  jobsByFiltersSelector,
} from 'jobs/selectors';

const state = {
  entities: Immutable.fromJS({
    jobs: {
      fetching: true,
      error: false,
      filters: {
        organisationId: 33,
        jobType: PENDING,
      },
      result: Immutable.Set([1, 2, 3]),
      entities: Immutable.fromJS({
        jobs: {
          1: { organisation_id: 100, status: APPROVED, expired: false, title: 'Bar One' },
          2: { organisation_id: 33, status: PENDING, expired: false, title: 'Bar Two' },
          3: { organisation_id: 100, status: PENDING, expired: true, title: 'Bar Three' },
        }
      }),
    }
  }),
};

test('rootSelector returns correct state slice ', () => {
  const expected = state.entities.get('jobs');
  const actual = rootSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(fetchingSelector(state)).toBe(true);
});

test('querySelector returns correct state slice', () => {
  const expected = state.entities.getIn(['jobs','query']);
  const actual = querySelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  const expected = state.entities.getIn(['jobs','filters']);
  const actual = filtersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['jobs','result']);
  const actual = resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('jobsSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['jobs','entities','jobs']);
  const actual = jobsSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('jobByIdSelector selector returns correct state slice', () => {
  const expected = state.entities.getIn(['jobs','entities','jobs']).first();
  const actual = jobByIdSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('jobsByFiltersSelector selector returns correct state slice', () => {
  const expected = Immutable.fromJS({
    2: { organisation_id: 33, status: PENDING, expired: false, title: 'Bar Two' },
  });
  const actual = jobsByFiltersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('jobsByFiltersSelector selector returns correct state with complex filters', () => {
  const complexState = {
    entities: Immutable.fromJS({
      jobs: {
        filters: {
          organisationId: 10,
          jobType: APPROVED,
        },
        entities: Immutable.fromJS({
          jobs: {
            1: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job One' },
            2: { organisation_id: 15, status: PENDING, expired: true, title: 'Job Two' },
            3: { organisation_id: 10, status: APPROVED, expired: true, title: 'Job Three' },
            4: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job Four' },
            5: { organisation_id: 15, status: PENDING, expired: false, title: 'Job Five' },
            6: { organisation_id: 14, status: APPROVED, expired: false, title: 'Job Six' },
          }
        }),
      }
    }),
  };
  const expected = Immutable.fromJS({
    1: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job One' },
    4: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job Four' },
  });
  const actual = jobsByFiltersSelector(complexState);
  expect(Immutable.is(expected, actual)).toBe(true);
});
