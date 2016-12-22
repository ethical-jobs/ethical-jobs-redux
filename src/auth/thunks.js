import { removeAuthCookie, setAuthCookie } from 'library/auth';
import {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RECOVER_REQUEST,
  RECOVER_SUCCESS,
  RECOVER_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
} from './constants';

/**
 * Load auth state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function loadAuth() {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (api) => api.get('/auth/load').catch(response => {
      removeAuthCookie();
      throw response;
    }),
  };
}

/**
 * Login
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function login(loginHandle, password) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (api) => api.post('/auth/login', { login: loginHandle, password }).then(response => {
      setAuthCookie(response.meta.token);
      return response;
    }),
    log: { loginHandle },
  };
}

/**
 * Logout
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function logout() {
  return {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (api) => api.get('/auth/logout').then(response => {
      removeAuthCookie();
      return response;
    }),
    log: true,
  };
}

/**
 * Recover password
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function recover(email) {
  return {
    types: [RECOVER_REQUEST, RECOVER_SUCCESS, RECOVER_FAILURE],
    promise: (api) => api.post('/auth/recover', { email }),
    log: { email },
  };
}

/**
 * Reset password
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function reset(values) { // eslint-disable-line
  return {
    types: [RESET_REQUEST, RESET_SUCCESS, RESET_FAILURE],
    promise: (api) => api.post('/auth/reset', values),
    log: { values },
  };
}

