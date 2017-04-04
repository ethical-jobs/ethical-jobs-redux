import { createActionType } from '../utils';
import Api from '../api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('ORGANISATIONS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('ORGANISATIONS/FETCH_ENTITY');
export const CREATE = createActionType('ORGANISATIONS/CREATE');
export const UPDATE = createActionType('ORGANISATIONS/UPDATE');
export const ARCHIVE = createActionType('ORGANISATIONS/ARCHIVE');
export const CREATE_CREDITS = createActionType('ORGANISATIONS/CREATE_CREDITS');
export const DEDUCT_CREDITS = createActionType('ORGANISATIONS/DEDUCT_CREDITS');
export const UPLOAD_LOGO = createActionType('ORGANISATIONS/UPLOAD_LOGO');
export const CLEAR_ENTITIES = createActionType('ORGANISATIONS/CLEAR_ENTITIES');
export const UPDATE_QUERY = createActionType('ORGANISATIONS/UPDATE_QUERY');
export const UPDATE_FILTER = createActionType('ORGANISATIONS/UPDATE_FILTER');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = (params) => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/organisations', params),
});

export const fetchEntity = (id) => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/organisation/${id}`),
});

export const create = (params) => ({
  type: CREATE,
  payload: Api.post('/organisations', params),
});

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`/organisations/${id}`, params),
});

export const archive = (id) => ({
  type: ARCHIVE,
  payload: Api.delete(`/organisations/${id}`),
});

export const createCredits = (params) => ({
  type: CREATE_CREDITS,
  payload: Api.post('/credits', params),
});

export const deductCredits = (params) => ({
  type: DEDUCT_CREDITS,
  payload: Api.delete('/credits', params),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearOrganisations = () => ({
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

