import Api from 'api';
import Jobs from 'modules/jobs';

const { actions } = Jobs;

const params = { foo: 'bar', bar: 'foo' };

test('clearJobs creates correct action', () => {
  expect(actions.clearJobs()).toEqual({
    type: actions.CLEAR_ENTITIES,
  });
});

test('updateFilter creates correct action', () => {
  const filter = { foo: 'bar' };
  expect(actions.updateFilter(filter)).toEqual({
    type: actions.UPDATE_FILTER,
    payload: filter,
  });
});

test('fetchCollection creates correct action', () => {
  expect(actions.fetchCollection(params)).toEqual({
    type: actions.FETCH_COLLECTION,
    payload: Api.get('/jobs', params),
  });
});

test('fetchEntity creates correct action', () => {
  expect(actions.fetchEntity(123, params)).toEqual({
    type: actions.FETCH_ENTITY,
    payload: Api.get(`/jobs/123`, params),
  });
});

test('search action creates correct action', () => {
  expect(actions.search(params)).toEqual({
    type: actions.SEARCH,
    payload: Api.search('/jobs', params),
  });
});

test('create action creates correct action', () => {
  expect(actions.create(params)).toEqual({
    type: actions.CREATE,
    payload: Api.post('/jobs', params),
  });
});

test('update action creates correct action', () => {
  expect(actions.update(123, params)).toEqual({
    type: actions.UPDATE,
    payload: Api.put(`/jobs/123`, params),
  });
});

test('archive action creates correct action', () => {
  expect(actions.archive(123)).toEqual({
    type: actions.ARCHIVE,
    payload: Api.delete(`/jobs/123`),
  });
});

test('approve action creates correct action', () => {
  expect(actions.approve(123)).toEqual({
    type: actions.APPROVE,
    payload: Api.jobs.approve(123),
  });
});

test('expire action creates correct action', () => {
  expect(actions.expire(123)).toEqual({
    type: actions.EXPIRE,
    payload: Api.jobs.expire(123),
  });
});

test('attachMedia action creates correct action', () => {
  expect(actions.attachMedia(123, 'form-data')).toEqual({
    type: actions.ATTACH,
    payload: Api.jobs.attachMedia(123, 'form-data'),
  });
});

test('detachMedia action creates correct action', () => {
  expect(actions.detachMedia(123, 456)).toEqual({
    type: actions.DETACH,
    payload: Api.jobs.detachMedia(123, 456),
  });
});
