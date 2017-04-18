import Immutable from 'immutable';
import * as AuthActions from './actions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/asyncTypes';
import * as Utils from '../../utils/immutable';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  result: Immutable.Set(),
  entities: Immutable.Map(),
});

/**
 * Auth reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AuthActions.LOGIN):
    case REQUEST(AuthActions.LOGOUT):
    case REQUEST(AuthActions.LOAD):
      return Utils.mergeRequest(state);

    case SUCCESS(AuthActions.LOGIN):
    case SUCCESS(AuthActions.LOAD):
      return Utils.mergeSuccess(state, action.payload);

    case SUCCESS(AuthActions.LOGOUT):
      return initialState;

    case FAILURE(AuthActions.LOGIN):
    case FAILURE(AuthActions.LOGOUT):
    case FAILURE(AuthActions.LOAD):
      return Utils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
