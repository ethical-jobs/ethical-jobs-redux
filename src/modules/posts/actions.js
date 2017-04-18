import createActionType from '../../utils/createActionType';
import Api from '../../utils/api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('POSTS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('POSTS/FETCH_ENTITY');
export const CLEAR_ENTITIES = createActionType('POSTS/CLEAR_ENTITIES');
export const UPDATE_FILTER = createActionType('POSTS/UPDATE_FILTER');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/content/posts', params),
});

export const fetchEntity = (id) => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/content/posts/${id}`),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearPosts = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  payload: filter,
});
