import Immutable from 'immutable';
import * as InvoiceActions from './actions';
import { REQUEST, SUCCESS, FAILURE } from '../utils';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  query: '',
  filters: {
    organisationId: null,
  },
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
      return state
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case InvoiceActions.UPDATE_QUERY:
      return state
        .set('query', action.payload)
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case InvoiceActions.UPDATE_FILTER:
      return state
        .mergeDeep({ filters: action.payload });

    case REQUEST(InvoiceActions.FETCH_COLLECTION):
    case REQUEST(InvoiceActions.FETCH_ENTITY):
    case REQUEST(InvoiceActions.CREATE):
    case REQUEST(InvoiceActions.UPDATE):
    case REQUEST(InvoiceActions.ARCHIVE):
      return state
        .set('fetching', true)
        .set('error', false);

    case SUCCESS(InvoiceActions.FETCH_COLLECTION):
    case SUCCESS(InvoiceActions.FETCH_ENTITY):
    case SUCCESS(InvoiceActions.CREATE):
    case SUCCESS(InvoiceActions.UPDATE):
    case SUCCESS(InvoiceActions.ARCHIVE):
      return state
        .set('fetching', false)
        .set('error', false)
        .update('entities', entities => entities.mergeDeep(action.payload.data.entities))
        .update('result', result => result.union(action.payload.data.result));

    case FAILURE(InvoiceActions.FETCH_COLLECTION):
    case FAILURE(InvoiceActions.FETCH_ENTITY):
    case FAILURE(InvoiceActions.CREATE):
    case FAILURE(InvoiceActions.UPDATE):
    case FAILURE(InvoiceActions.ARCHIVE):
      return state
        .set('fetching', false)
        .set('error', Immutable.fromJS(action.payload));

    default:
      return state;
  }
}
