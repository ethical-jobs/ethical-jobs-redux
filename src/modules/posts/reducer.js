import Immutable from 'immutable';
import * as PostsActions from './actions';
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
    case PostsActions.CLEAR_ENTITIES:
      return Utils.clearEntities(state);

    case PostsActions.UPDATE_FILTER:
      return Utils.updateFilters(state, action.payload);

    case REQUEST(PostsActions.FETCH_COLLECTION):
    case REQUEST(PostsActions.FETCH_ENTITY):
      return Utils.mergeRequest(state);

    case SUCCESS(PostsActions.FETCH_COLLECTION):
    case SUCCESS(PostsActions.FETCH_ENTITY):
      return Utils.mergeSuccess(state, action.payload);

    case FAILURE(PostsActions.FETCH_COLLECTION):
    case FAILURE(PostsActions.FETCH_ENTITY):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
