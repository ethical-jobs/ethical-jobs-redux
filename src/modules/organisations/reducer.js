import Immutable from 'immutable';
import * as OrgActions from './actions';
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
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OrgActions.CLEAR_ENTITIES:
      return Utils.clearEntities(state);

    case OrgActions.UPDATE_FILTER:
      return Utils.updateFilters(state, action.payload);

    case REQUEST(OrgActions.SEARCH):
      return Utils.mergeSearchRequest(state);

    case REQUEST(OrgActions.FETCH_COLLECTION):
    case REQUEST(OrgActions.FETCH_ENTITY):
    case REQUEST(OrgActions.CREATE):
    case REQUEST(OrgActions.UPDATE):
    case REQUEST(OrgActions.ARCHIVE):
    case REQUEST(OrgActions.CREATE_CREDITS):
    case REQUEST(OrgActions.DEDUCT_CREDITS):
      return Utils.mergeRequest(state);

    case SUCCESS(OrgActions.FETCH_COLLECTION):
    case SUCCESS(OrgActions.FETCH_ENTITY):
    case SUCCESS(OrgActions.CREATE):
    case SUCCESS(OrgActions.UPDATE):
    case SUCCESS(OrgActions.ARCHIVE):
    case SUCCESS(OrgActions.CREATE_CREDITS):
    case SUCCESS(OrgActions.DEDUCT_CREDITS):
      return Utils.mergeSuccess(state, action.payload);

    case FAILURE(OrgActions.FETCH_COLLECTION):
    case FAILURE(OrgActions.FETCH_ENTITY):
    case FAILURE(OrgActions.CREATE):
    case FAILURE(OrgActions.CREATE):
    case FAILURE(OrgActions.UPDATE):
    case FAILURE(OrgActions.ARCHIVE):
    case FAILURE(OrgActions.CREATE_CREDITS):
    case FAILURE(OrgActions.DEDUCT_CREDITS):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
