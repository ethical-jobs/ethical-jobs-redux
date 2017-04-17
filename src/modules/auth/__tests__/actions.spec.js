import sinon from 'sinon';
import Auth from 'modules/auth';

const params = { foo: 'bar', bar: 'foo' };

const { actions } = Auth;

beforeEach(() => {
  sinon.stub(window, 'fetch').resolves({ ok: true });
});

afterEach(() => {
  window.fetch.restore();
});

test('login creates correct action', () => {
  expect(actions.login(params)).toEqual({
    type: actions.LOGIN,
    payload: new Promise(() => {}),
  });
});

test('logout creates correct action', () => {
  expect(actions.logout(params)).toEqual({
    type: actions.LOGOUT,
    payload: new Promise(() => {}),
  });
});

test('load action creates correct action', () => {
  expect(actions.load(params)).toEqual({
    type: actions.LOAD,
    payload: new Promise(() => {}),
  });
});

test('recover action creates correct action', () => {
  expect(actions.recover(params)).toEqual({
    type: actions.RECOVER,
    payload: new Promise(() => {}),
  });
});

test('reset action creates correct action', () => {
  expect(actions.reset(params)).toEqual({
    type: actions.RESET,
    payload: new Promise(() => {}),
  });
});
