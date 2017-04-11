import Api from 'api';
import Auth from 'modules/auth';

test('login creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Auth.actions.login(params)).toEqual({
    type: Auth.actions.LOGIN,
    payload: Api.auth.login(params),
  });
});

test('logout creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Auth.actions.logout(params)).toEqual({
    type: Auth.actions.LOGOUT,
    payload: Api.auth.logout(params),
  });
});

test('load action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Auth.actions.load(params)).toEqual({
    type: Auth.actions.LOAD,
    payload: Api.auth.load(params),
  });
});

test('recover action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Auth.actions.recover(params)).toEqual({
    type: Auth.actions.RECOVER,
    payload: Api.auth.recoverPassword(params),
  });
});

test('reset action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(Auth.actions.reset(params)).toEqual({
    type: Auth.actions.RESET,
    payload: Api.auth.resetPassword(params),
  });
});
