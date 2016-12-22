import Client from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Configure & Export SDK singleton
|--------------------------------------------------------------------------
|
| No need to re-envoke the class.
| This would be a performance hit everytime we make a request to the server.
|
*/

const api = new Client();

const environment = window && window.__env && window.__env.ETHICAL_JOBS_ENV.toLowerCase();

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

export default api;
