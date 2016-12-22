'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethicalJobsSdk = require('ethical-jobs-sdk');

var _ethicalJobsSdk2 = _interopRequireDefault(_ethicalJobsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Configure & Export SDK singleton
|--------------------------------------------------------------------------
|
| No need to re-envoke the class.
| This would be a performance hit everytime we make a request to the server.
|
*/

var api = new _ethicalJobsSdk2.default();

var environment = window && window.__env && window.__env.ETHICAL_JOBS_ENV.toLowerCase();

switch (environment) {
  case 'production':
    api.setEnvironment('production');
    break;
  case 'staging':
    api.setEnvironment('test');
    break;
  default:
  case 'development':
    api.setEnvironment('development');
    break;
}

exports.default = api;
module.exports = exports['default'];