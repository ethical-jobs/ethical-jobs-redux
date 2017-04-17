import sinon from 'sinon';
import Posts from 'modules/posts';

const { actions } = Posts;

const params = { foo: 'bar', bar: 'foo' };

beforeEach(() => {
  sinon.stub(window, 'fetch').resolves({ ok: true });
});

afterEach(() => {
  window.fetch.restore();
});

test('clearPosts creates correct action', () => {
  expect(actions.clearPosts()).toEqual({
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
