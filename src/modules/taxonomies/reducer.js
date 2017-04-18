import Immutable from 'immutable';
import * as AppActions from '../app/actions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/asyncTypes';
import * as Utils from '../../utils/immutable';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  taxonomies: Immutable.Map(),
});

/**
 * ...
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AppActions.FETCH_APP_DATA):
      return Utils.mergeRequest(state);

    case SUCCESS(AppActions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', false)
        .set('taxonomies', Immutable.fromJS(action.payload.data.taxonomies));

    case FAILURE(AppActions.FETCH_APP_DATA):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
