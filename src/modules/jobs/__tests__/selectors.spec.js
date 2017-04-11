import Immutable from 'immutable';
import { createStateTree } from 'testing/utils';
import { SUCCESS } from 'actionTypes';
import { response } from './_fixtures';
import { APPROVED, PENDING, EXPIRED } from 'modules/jobs/statuses';
import Jobs from 'modules/jobs';

const { selectors, actions } = Jobs;

const state = createStateTree('jobs', Jobs.reducer, {
  type: SUCCESS(actions.FETCH_COLLECTION),
  payload: response,
});

test('rootSelector returns correct state slice ', () => {
  const expected = state.getIn(['entities','jobs']);
  expect(
    Immutable.is(expected, selectors.rootSelector(state))
  ).toBe(true);
});

test('fetching selector returns correct state slice', () => {
  expect(selectors.fetchingSelector(state)).toBe(false);
});

test('filtersSelector returns correct state slice', () => {
  const expected = state.getIn(['entities','jobs','filters']);
  const actual = selectors.filtersSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  const expected = state.getIn(['entities','jobs','result']);
  const actual = selectors.resultSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

test('jobsSelector selector returns correct state slice', () => {
  const expected = state.getIn(['entities','jobs','entities','jobs']);
  const actual = selectors.jobsSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

// We have this trick base problem of result being always a Sequence
// I propose we change this so its either a sequence OR an integer.
// Let's go!
//           |
//           |
//           V
test('jobByIdSelector selector returns correct state slice', () => {
  const actual = selectors.jobByIdSelector(state);
  expect(Immutable.is(expected, actual)).toBe(true);
});

// test('jobsByFiltersSelector selector returns correct state slice', () => {
//   const expected = Immutable.fromJS({
//     2: { organisation_id: 33, status: PENDING, expired: false, title: 'Bar Two' },
//   });
//   const actual = selectors.jobsByFiltersSelector(state);
//   expect(Immutable.is(expected, actual)).toBe(true);
// });

// test('jobsByFiltersSelector selector returns correct state with complex filters', () => {
//   const complexState = Immutable.fromJS({
//     entities: {
//       jobs: {
//         filters: {
//           organisationId: 10,
//           jobType: APPROVED,
//         },
//         entities: Immutable.fromJS({
//           jobs: {
//             1: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job One' },
//             2: { organisation_id: 15, status: PENDING, expired: true, title: 'Job Two' },
//             3: { organisation_id: 10, status: APPROVED, expired: true, title: 'Job Three' },
//             4: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job Four' },
//             5: { organisation_id: 15, status: PENDING, expired: false, title: 'Job Five' },
//             6: { organisation_id: 14, status: APPROVED, expired: false, title: 'Job Six' },
//           }
//         }),
//       }
//     },
//   });
//   const expected = Immutable.fromJS({
//     1: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job One' },
//     4: { organisation_id: 10, status: APPROVED, expired: false, title: 'Job Four' },
//   });
//   const actual = selectors.jobsByFiltersSelector(complexState);
//   expect(Immutable.is(expected, actual)).toBe(true);
// });
