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
    payload: Api.fetchJobs(params),
  });
});

test('fetchEntity creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(fetchEntity(params)).toEqual({
    type: ActionTypes.FETCH_ENTITY,
    payload: Api.fetchJob(params),
  });
});

test('create action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(create(params)).toEqual({
    type: ActionTypes.CREATE,
    payload: Api.createJob(params),
  });
});

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(update(params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: Api.updateJob(params),
  });
});

test('archive action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(archive(params)).toEqual({
    type: ActionTypes.ARCHIVE,
    payload: Api.archiveJob(params),
  });
});

test('approve action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(approve(params)).toEqual({
    type: ActionTypes.APPROVE,
    payload: Api.approveJob(params),
  });
});

test('expire action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(expire(params)).toEqual({
    type: ActionTypes.EXPIRE,
    payload: Api.expireJob(params),
  });
});

test('attachMedia action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(attachMedia(params)).toEqual({
    type: ActionTypes.ATTACH,
    payload: Api.attachJobMedia(params),
  });
});

test('detachMedia action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(detachMedia(params)).toEqual({
    type: ActionTypes.DETACH,
    payload: Api.detachJobMedia(params),
  });
});

