import Immutable from 'immutable';
import App from '../app';
import * as Utils from '../../utils';
import { REQUEST, SUCCESS, FAILURE } from '../../actionTypes';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  creditPacks: [],
});

/**
 * Credits reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(App.actions.FETCH_APP_DATA):
      return Utils.mergeRequest(state);

    case SUCCESS(App.actions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', false)
        .set('creditPacks', Immutable.fromJS(action.payload.data.creditPacks));

    case FAILURE(App.actions.FETCH_APP_DATA):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
