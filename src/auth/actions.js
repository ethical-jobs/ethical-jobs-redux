import { createActionType } from 'utils';
import Api from 'api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const LOGIN = createActionType('AUTH/LOGIN');
export const LOGOUT = createActionType('AUTH/LOGOUT');
export const LOAD = createActionType('AUTH/LOAD');
export const RECOVER = createActionType('AUTH/RECOVER');
export const RESET = createActionType('AUTH/RESET');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const login = (params) => ({
  type: LOGIN,
  payload: Api.login(params),
});

export const logout = () => ({
  type: LOGOUT,
  payload: Api.logout(),
});

export const load = () => ({
  type: LOAD,
  payload: Api.loadAuth(),
});

export const recover = (params) => ({
  type: RECOVER,
  payload: Api.recoverPassword(params),
});

export const reset = (params) => ({
  type: RESET,
  payload: Api.resetPassword(params),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/
