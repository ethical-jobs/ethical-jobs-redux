import Api from 'api';
import Invoices from 'modules/invoices';

test('clearInvoices creates correct action', () => {
  expect(Invoices.actions.clearInvoices()).toEqual({
    type: Invoices.actions.CLEAR_ENTITIES,
  });
});

test('updateQuery creates correct action', () => {
  expect(Invoices.actions.updateFilter('Foo bar bam...')).toEqual({
    type: Invoices.actions.UPDATE_FILTER,
    payload: 'Foo bar bam...',
  });
});

test('updateFilter creates correct action', () => {
  const filter = { foo: 'bar' };
  expect(Invoices.actions.updateFilter(filter)).toEqual({
    type: Invoices.actions.UPDATE_FILTER,
    payload: filter,
  });
});

test('fetchCollection creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Invoices.actions.fetchCollection(params)).toEqual({
    type: Invoices.actions.FETCH_COLLECTION,
    payload: Api.get('/invoices', params),
  });
});

test('fetchEntity creates correct action', () => {
  expect(Invoices.actions.fetchEntity(123)).toEqual({
    type: Invoices.actions.FETCH_ENTITY,
    payload: Api.get('/invoices/123'),
  });
});

test('search action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Invoices.actions.search(params)).toEqual({
    type: Invoices.actions.SEARCH,
    payload: Api.post('/search/invoices', params),
  });
});

test('create action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Invoices.actions.create(params)).toEqual({
    type: Invoices.actions.CREATE,
    payload: Api.post('/invoices', params),
  });
});

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Invoices.actions.update(123, params)).toEqual({
    type: Invoices.actions.UPDATE,
    payload: Api.put('/invoices/123', params),
  });
});

test('archive action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Invoices.actions.archive(123)).toEqual({
    type: Invoices.actions.ARCHIVE,
    payload: Api.delete('/invoices/123'),
  });
});
