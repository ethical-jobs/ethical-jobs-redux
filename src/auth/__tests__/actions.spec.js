import Api from 'api';
import * as ActionTypes from 'auth/actions';
import {
  login,
  logout,
  load,
  recover,
  reset,
} from 'auth/actions';

test('login creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(login(params)).toEqual({
    type: ActionTypes.LOGIN,
    payload: Api.login(params),
  });
});

test('logout creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(logout(params)).toEqual({
    type: ActionTypes.LOGOUT,
    payload: Api.logout(params),
  });
});

test('load action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(load(params)).toEqual({
    type: ActionTypes.LOAD,
    payload: Api.load(params),
  });
});

test('recover action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(recover(params)).toEqual({
    type: ActionTypes.RECOVER,
    payload: Api.recoverPassword(params),
  });
});

test('reset action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(reset(params)).toEqual({
    type: ActionTypes.RESET,
    payload: Api.resetPassword(params),
  });
});
