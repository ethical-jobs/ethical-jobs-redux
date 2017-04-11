import Immutable from 'immutable';
import * as AppActions from '../app/actions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  creditPacks: [],
});

/**
 * Jobs reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AppActions.FETCH_APP_DATA):
      return state
        .set('fetching', true)
        .set('error', false);

    case SUCCESS(AppActions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', false)
        .set('creditPacks', action.payload.data.creditPacks);

    case FAILURE(AppActions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', Immutable.fromJS(action.payload));

    default:
      return state;
  }
}
