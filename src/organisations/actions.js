import { createActionType } from 'utils';
import Api from 'api';

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
  payload: Api.fetchInvoices(params),
});

export const fetchEntity = (params) => ({
  type: FETCH_ENTITY,
  payload: Api.fetchInvoice(params),
});

export const create = (params) => ({
  type: CREATE,
  payload: Api.createInvoice(params),
});

export const update = (params) => ({
  type: UPDATE,
  payload: Api.updateInvoice(params),
});

export const archive = (params) => ({
  type: ARCHIVE,
  payload: Api.archiveInvoice(params),
});

export const createCredits = (params) => ({
  type: CREATE_CREDITS,
  payload: Api.xxx(params),
});

export const deductCredits = (params) => ({
  type: DEDUCT_CREDITS,
  payload: Api.xxx(params),
});

export const uploadLogo = (params) => ({
  type: UPLOAD_LOGO,
  payload: Api.xxx(params),
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

