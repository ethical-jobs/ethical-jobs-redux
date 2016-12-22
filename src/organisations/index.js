import Immutable from 'immutable';
import * as OrgActions from 'organisations/actions';
import { REQUEST, SUCCESS, FAILURE } from 'utils';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  query: '',
  filters: {},
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
      return state
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case OrgActions.UPDATE_QUERY:
      return state
        .set('query', action.payload)
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case OrgActions.UPDATE_FILTER:
      return state
        .mergeDeep({ filters: action.payload });

    case REQUEST(OrgActions.FETCH_COLLECTION):
    case REQUEST(OrgActions.FETCH_ENTITY):
    case REQUEST(OrgActions.CREATE):
    case REQUEST(OrgActions.UPDATE):
    case REQUEST(OrgActions.ARCHIVE):
    case REQUEST(OrgActions.CREATE_CREDITS):
    case REQUEST(OrgActions.DEDUCT_CREDITS):
    case REQUEST(OrgActions.UPLOAD_LOGO):
      return state
        .set('fetching', true)
        .set('error', false);

    case SUCCESS(OrgActions.FETCH_COLLECTION):
    case SUCCESS(OrgActions.FETCH_ENTITY):
    case SUCCESS(OrgActions.CREATE):
    case SUCCESS(OrgActions.CREATE):
    case SUCCESS(OrgActions.UPDATE):
    case SUCCESS(OrgActions.ARCHIVE):
      return state
        .set('fetching', false)
        .set('error', false)
        .update('entities', entities => entities.mergeDeep(action.payload.data.entities))
        .update('result', result => result.union(action.payload.data.result));

    case FAILURE(OrgActions.CREATE_CREDITS):
    case FAILURE(OrgActions.DEDUCT_CREDITS):
    case FAILURE(OrgActions.UPLOAD_LOGO):
      return state
        .set('fetching', false)
        .set('error', false);

    case FAILURE(OrgActions.FETCH_COLLECTION):
    case FAILURE(OrgActions.FETCH_ENTITY):
    case FAILURE(OrgActions.CREATE):
    case FAILURE(OrgActions.CREATE):
    case FAILURE(OrgActions.UPDATE):
    case FAILURE(OrgActions.ARCHIVE):
    case FAILURE(OrgActions.CREATE_CREDITS):
    case FAILURE(OrgActions.DEDUCT_CREDITS):
    case FAILURE(OrgActions.UPLOAD_LOGO):
      return state
        .set('fetching', false)
        .set('error', Immutable.fromJS(action.payload));

    default:
      return state;
  }
}
