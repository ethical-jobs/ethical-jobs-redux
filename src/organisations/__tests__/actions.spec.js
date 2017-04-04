import Api from 'api';
import * as ActionTypes from 'organisations/actions';
import {
  fetchCollection,
  fetchEntity,
  create,
  update,
  archive,
  clearOrganisations,
  updateQuery,
  updateFilter,
} from 'organisations/actions';

test('clearOrganisations creates correct action', () => {
  expect(clearOrganisations()).toEqual({
    type: ActionTypes.CLEAR_ENTITIES,
  });
});

test('updateQuery creates correct action', () => {
  expect(updateQuery('Foo bar bam...')).toEqual({
    type: ActionTypes.UPDATE_QUERY,
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
    payload: Api.get('/organisations', params),
  });
});

test('fetchEntity creates correct action', () => {
  expect(fetchEntity(123)).toEqual({
    type: ActionTypes.FETCH_ENTITY,
    payload: Api.get(`/organisation/123`),
  });
});

test('create action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(create(params)).toEqual({
    type: ActionTypes.CREATE,
    payload: Api.post('/organisations', params),
  });
});

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(update(123, params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: Api.put(`/organisations/123`, params),
  });
});

test('archive action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(archive(123)).toEqual({
    type: ActionTypes.ARCHIVE,
    payload: Api.delete(`/organisations/123`),
  });
});

