import Immutable from 'immutable';
import * as JobActions from './actions';
import { REQUEST, SUCCESS, FAILURE } from '../utils';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  query: '',
  filters: {
    organisationId: null,
    jobType: null,
  },
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
    case JobActions.CLEAR_ENTITIES:
      return state
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case JobActions.UPDATE_QUERY:
      return state
        .set('query', action.payload)
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case JobActions.UPDATE_FILTER:
      return state
        .mergeDeep({ filters: action.payload });

    case REQUEST(JobActions.FETCH_COLLECTION):
    case REQUEST(JobActions.FETCH_ENTITY):
    case REQUEST(JobActions.CREATE):
    case REQUEST(JobActions.UPDATE):
    case REQUEST(JobActions.ARCHIVE):
    case REQUEST(JobActions.APPROVE):
    case REQUEST(JobActions.EXPIRE):
    case REQUEST(JobActions.ATTACH):
    case REQUEST(JobActions.DETACH):
      return state
        .set('fetching', true)
        .set('error', false);

    case SUCCESS(JobActions.FETCH_COLLECTION):
    case SUCCESS(JobActions.FETCH_ENTITY):
    case SUCCESS(JobActions.CREATE):
    case SUCCESS(JobActions.CREATE):
    case SUCCESS(JobActions.UPDATE):
    case SUCCESS(JobActions.ARCHIVE):
    case SUCCESS(JobActions.APPROVE):
    case SUCCESS(JobActions.EXPIRE):
    case SUCCESS(JobActions.ATTACH):
    case SUCCESS(JobActions.DETACH):
      return state
        .set('fetching', false)
        .set('error', false)
        .update('entities', entities => entities.mergeDeep(action.payload.data.entities))
        .update('result', result => result.union(action.payload.data.result));

    case FAILURE(JobActions.FETCH_COLLECTION):
    case FAILURE(JobActions.FETCH_ENTITY):
    case FAILURE(JobActions.CREATE):
    case FAILURE(JobActions.CREATE):
    case FAILURE(JobActions.UPDATE):
    case FAILURE(JobActions.ARCHIVE):
    case FAILURE(JobActions.APPROVE):
    case FAILURE(JobActions.EXPIRE):
    case FAILURE(JobActions.ATTACH):
    case FAILURE(JobActions.DETACH):
      return state
        .set('fetching', false)
        .set('error', Immutable.fromJS(action.payload));

    default:
      return state;
  }
}
