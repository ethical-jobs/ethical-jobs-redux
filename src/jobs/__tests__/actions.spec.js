import Api from 'api';
import * as ActionTypes from 'jobs/actions';
import {
  fetchCollection,
  fetchEntity,
  create,
  update,
  archive,
  approve,
  expire,
  attachMedia,
  detachMedia,
  clearJobs,
  updateFilter,
  updateQuery,
} from 'jobs/actions';

test('clearJobs creates correct action', () => {
  expect(clearJobs()).toEqual({
    type: ActionTypes.CLEAR_ENTITIES,
  });
});

test('updateQuery creates correct action', () => {
  expect(updateFilter('Foo bar bam...')).toEqual({
    type: ActionTypes.UPDATE_FILTER,
    payload: 'Foo bar bam...',
  });
});

test('updateFilter creates correct action', () => {
  const filter = { foo: 'bar' };
  expect(updateFilter(filter)).toEqual({
    type: ActionTypes.UPDATE_FILTER,
    payload: filter,
  });
});

test('fetchCollection creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(fetchCollection(params)).toEqual({
    type: ActionTypes.FETCH_COLLECTION,
    payload: Api.get('/jobs', params),
  });
});

test('fetchEntity creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(fetchEntity(123, params)).toEqual({
    type: ActionTypes.FETCH_ENTITY,
    payload: Api.get(`/jobs/123`, params),
  });
});

test('create action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(create(params)).toEqual({
    type: ActionTypes.CREATE,
    payload: Api.post('/jobs', params),
  });
});

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(update(123, params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: Api.put(`/jobs/123`, params),
  });
});

test('archive action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(archive(123)).toEqual({
    type: ActionTypes.ARCHIVE,
    payload: Api.delete(`/jobs/123`),
  });
});

test('approve action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(approve(123)).toEqual({
    type: ActionTypes.APPROVE,
    payload: Api.approve(123),
  });
});

test('expire action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(expire(123)).toEqual({
    type: ActionTypes.EXPIRE,
    payload: Api.expire(123),
  });
});

test('attachMedia action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(attachMedia(123, 'form-data')).toEqual({
    type: ActionTypes.ATTACH,
    payload: Api.attachMedia(123, 'form-data'),
  });
});

test('detachMedia action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(detachMedia(123, 456)).toEqual({
    type: ActionTypes.DETACH,
    payload: Api.detachMedia(123, 456),
  });
});

