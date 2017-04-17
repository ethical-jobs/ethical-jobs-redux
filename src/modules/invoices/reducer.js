import Immutable from 'immutable';
import * as InvoiceActions from './actions';
import * as Utils from '../../utils';
import { REQUEST, SUCCESS, FAILURE } from '../../actionTypes';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  filters: Immutable.Map(),
  result: Immutable.Set(),
  entities: Immutable.Map(),
});

/**
 * Purchase reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case InvoiceActions.CLEAR_ENTITIES:
      return Utils.clearEntities(state);

    case InvoiceActions.UPDATE_FILTER:
      return Utils.updateFilters(state, action.payload);

    case REQUEST(InvoiceActions.SEARCH):
      return Utils.mergeSearchRequest(state);

    case REQUEST(InvoiceActions.FETCH_COLLECTION):
    case REQUEST(InvoiceActions.FETCH_ENTITY):
    case REQUEST(InvoiceActions.CREATE):
    case REQUEST(InvoiceActions.UPDATE):
    case REQUEST(InvoiceActions.ARCHIVE):
      return Utils.mergeRequest(state);

    case SUCCESS(InvoiceActions.FETCH_COLLECTION):
    case SUCCESS(InvoiceActions.FETCH_ENTITY):
    case SUCCESS(InvoiceActions.CREATE):
    case SUCCESS(InvoiceActions.UPDATE):
    case SUCCESS(InvoiceActions.ARCHIVE):
      return Utils.mergeSuccess(state, action.payload);

    case FAILURE(InvoiceActions.FETCH_COLLECTION):
    case FAILURE(InvoiceActions.FETCH_ENTITY):
    case FAILURE(InvoiceActions.CREATE):
    case FAILURE(InvoiceActions.UPDATE):
    case FAILURE(InvoiceActions.ARCHIVE):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
