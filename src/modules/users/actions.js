import createActionType from '../../utils/createActionType';
import Api from '../../utils/api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const UPDATE = createActionType('USERS/UPDATE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`users/${id}`, params),
});
