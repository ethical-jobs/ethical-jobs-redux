import { createActionType } from '../utils';
import Api from '../api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('JOBS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('JOBS/FETCH_ENTITY');
export const CREATE = createActionType('JOBS/CREATE');
export const UPDATE = createActionType('JOBS/UPDATE');
export const ARCHIVE = createActionType('JOBS/ARCHIVE');
export const APPROVE = createActionType('JOBS/APPROVE');
export const EXPIRE = createActionType('JOBS/EXPIRE');
export const ATTACH = createActionType('JOBS/ATTACH');
export const DETACH = createActionType('JOBS/DETACH');
export const CLEAR_ENTITIES = createActionType('JOBS/CLEAR_ENTITIES');
export const UPDATE_FILTER = createActionType('JOBS/UPDATE_FILTER');
export const UPDATE_QUERY = createActionType('JOBS/UPDATE_QUERY');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = (params) => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/jobs', params),
});

export const fetchEntity = (id) => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/jobs/${id}`),
});

export const create = (params) => ({
  type: CREATE,
  payload: Api.post('/jobs', params),
});

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`/jobs/${id}`, params),
});

export const archive = (id) => ({
  type: ARCHIVE,
  payload: Api.delete(`/jobs/${id}`),
});

export const approve = (id) => ({
  type: APPROVE,
  payload: Api.approve(id),
});

export const expire = (id) => ({
  type: EXPIRE,
  payload: Api.expire(id),
});

export const attachMedia = (id, formData) => ({
  type: ATTACH,
  payload: Api.attachMedia(id, formData),
});

export const detachMedia = (id, attachmentId) => ({
  type: DETACH,
  payload: Api.detachMedia(id, attachmentId),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearJobs = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const updateQuery = (query) => ({
  type: UPDATE_QUERY,
  payload: query,
});
