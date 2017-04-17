import { createActionType } from '../../utils';
import Api from '../../api';

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
