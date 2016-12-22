import Api from 'api';
import * as ActionTypes from 'invoices/actions';
import {
  fetchCollection,
  fetchEntity,
  create,
  update,
  archive,
  clearInvoices,
  updateQuery,
  updateFilter,
} from 'invoices/actions';

test('clearInvoices creates correct action', () => {
  expect(clearInvoices()).toEqual({
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
    payload: Api.fetchInvoices(params),
  });
});

test('fetchEntity creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(fetchEntity(params)).toEqual({
    type: ActionTypes.FETCH_ENTITY,
    payload: Api.fetchInvoice(params),
  });
});

test('create action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(create(params)).toEqual({
    type: ActionTypes.CREATE,
    payload: Api.createInvoice(params),
  });
});

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(update(params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: Api.updateInvoice(params),
  });
});

test('archive action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(archive(params)).toEqual({
    type: ActionTypes.ARCHIVE,
    payload: Api.archiveInvoice(params),
  });
});
