import { createActionType } from 'utils';
import Api from 'api';

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
  payload: Api.fetchJobs(params),
});

export const fetchEntity = (params) => ({
  type: FETCH_ENTITY,
  payload: Api.fetchJob(params),
});

export const create = (params) => ({
  type: CREATE,
  payload: Api.createJob(params),
});

export const update = (params) => ({
  type: UPDATE,
  payload: Api.updateJob(params),
});

export const archive = (params) => ({
  type: ARCHIVE,
  payload: Api.archiveJob(params),
});

export const approve = (params) => ({
  type: APPROVE,
  payload: Api.approveJob(params),
});

export const expire = (params) => ({
  type: EXPIRE,
  payload: Api.expireJob(params),
});

export const attachMedia = (params) => ({
  type: ATTACH,
  payload: Api.attachJobMedia(params),
});

export const detachMedia = (params) => ({
  type: DETACH,
  payload: Api.detachJobMedia(params),
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
