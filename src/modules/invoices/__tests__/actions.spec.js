import sinon from 'sinon';
import Invoices from 'modules/invoices';

const { actions } = Invoices;

const params = { foo: 'bar', bar: 'foo' };

beforeEach(() => {
  sinon.stub(window, 'fetch').resolves({ ok: true });
});

afterEach(() => {
  window.fetch.restore();
});

test('clearInvoices creates correct action', () => {
  expect(actions.clearInvoices()).toEqual({
    type: actions.CLEAR_ENTITIES,
  });
});

test('updateFilter creates correct action', () => {
  expect(actions.updateFilter(params)).toEqual({
    type: actions.UPDATE_FILTER,
    payload: params,
  });
});

test('fetchCollection creates correct action', () => {
  expect(actions.fetchCollection(params)).toEqual({
    type: actions.FETCH_COLLECTION,
    payload: new Promise(() => {}),
  });
});

test('fetchEntity creates correct action', () => {
  expect(actions.fetchEntity(123)).toEqual({
    type: actions.FETCH_ENTITY,
    payload: new Promise(() => {}),
  });
});

test('search action creates correct action', () => {
  expect(actions.search(params)).toEqual({
    type: actions.SEARCH,
    payload: new Promise(() => {}),
  });
});

test('create action creates correct action', () => {
  expect(actions.create(params)).toEqual({
    type: actions.CREATE,
    payload: new Promise(() => {}),
  });
});

test('update action creates correct action', () => {
  expect(actions.update(123, params)).toEqual({
    type: actions.UPDATE,
    payload: new Promise(() => {}),
  });
});

test('archive action creates correct action', () => {
  expect(actions.archive(123)).toEqual({
    type: actions.ARCHIVE,
    payload: new Promise(() => {}),
  });
});
