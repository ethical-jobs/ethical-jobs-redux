import 'isomorphic-fetch';
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

const environment = window.__env && window.__env.ETHICAL_JOBS_ENV && window.__env.ETHICAL_JOBS_ENV;

const api = new Client((environment || 'development').toLowerCase());

export default api;
