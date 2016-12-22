'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAuth = loadAuth;
exports.login = login;
exports.logout = logout;
exports.recover = recover;
exports.reset = reset;

var _auth = require('library/auth');

var _constants = require('./constants');

/**
 * Load auth state
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function loadAuth() {
  return {
    types: [_constants.LOAD_REQUEST, _constants.LOAD_SUCCESS, _constants.LOAD_FAILURE],
    promise: function promise(api) {
      return api.get('/auth/load').catch(function (response) {
        (0, _auth.removeAuthCookie)();
        throw response;
      });
    }
  };
}

/**
 * Login
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function login(loginHandle, password) {
  return {
    types: [_constants.LOGIN_REQUEST, _constants.LOGIN_SUCCESS, _constants.LOGIN_FAILURE],
    promise: function promise(api) {
      return api.post('/auth/login', { login: loginHandle, password: password }).then(function (response) {
        (0, _auth.setAuthCookie)(response.meta.token);
        return response;
      });
    },
    log: { loginHandle: loginHandle }
  };
}

/**
 * Logout
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function logout() {
  return {
    types: [_constants.LOGOUT_REQUEST, _constants.LOGOUT_SUCCESS, _constants.LOGOUT_FAILURE],
    promise: function promise(api) {
      return api.get('/auth/logout').then(function (response) {
        (0, _auth.removeAuthCookie)();
        return response;
      });
    },
    log: true
  };
}

/**
 * Recover password
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function recover(email) {
  return {
    types: [_constants.RECOVER_REQUEST, _constants.RECOVER_SUCCESS, _constants.RECOVER_FAILURE],
    promise: function promise(api) {
      return api.post('/auth/recover', { email: email });
    },
    log: { email: email }
  };
}

/**
 * Reset password
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reset(values) {
  // eslint-disable-line
  return {
    types: [_constants.RESET_REQUEST, _constants.RESET_SUCCESS, _constants.RESET_FAILURE],
    promise: function promise(api) {
      return api.post('/auth/reset', values);
    },
    log: { values: values }
  };
}