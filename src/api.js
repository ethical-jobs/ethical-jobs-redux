import { Client } from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Configure & Export SDK singleton
|--------------------------------------------------------------------------
|
| No need to re-envoke the class.
| This would be a performance hit everytime we make a request to the server.
|
*/

const api = new Client('development');

export default api;
