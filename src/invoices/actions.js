import { createActionType } from 'utils';
import Api from 'api';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('INVOICES/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('INVOICES/FETCH_ENTITY');
export const CREATE = createActionType('INVOICES/CREATE');
export const UPDATE = createActionType('INVOICES/UPDATE');
export const ARCHIVE = createActionType('INVOICES/ARCHIVE');
export const CLEAR_ENTITIES = createActionType('INVOICES/CLEAR_ENTITIES');
export const UPDATE_QUERY = createActionType('INVOICES/UPDATE_QUERY');
export const UPDATE_FILTER = createActionType('INVOICES/UPDATE_FILTER');

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

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearInvoices = () => ({
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

