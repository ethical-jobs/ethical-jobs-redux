import sinon from 'sinon';
import Jobs from 'modules/jobs';

const { actions } = Jobs;

const params = { foo: 'bar', bar: 'foo' };

beforeEach(() => {
  sinon.stub(window, 'fetch').resolves({ ok: true });
});

afterEach(() => {
  window.fetch.restore();
});

test('clearJobs creates correct action', () => {
  expect(actions.clearJobs()).toEqual({
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

test('approve action creates correct action', () => {
  expect(actions.approve(123)).toEqual({
    type: actions.APPROVE,
    payload: new Promise(() => {}),
  });
});

test('expire action creates correct action', () => {
  expect(actions.expire(123)).toEqual({
    type: actions.EXPIRE,
    payload: new Promise(() => {}),
  });
});

test('attachMedia action creates correct action', () => {
  expect(actions.attachMedia(123, 'form-data')).toEqual({
    type: actions.ATTACH,
    payload: new Promise(() => {}),
  });
});

test('detachMedia action creates correct action', () => {
  expect(actions.detachMedia(123, 456)).toEqual({
    type: actions.DETACH,
    payload: new Promise(() => {}),
  });
});
