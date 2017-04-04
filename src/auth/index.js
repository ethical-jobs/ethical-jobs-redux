import Immutable from 'immutable';
import * as AuthActions from './actions';
import { REQUEST, SUCCESS, FAILURE } from '../utils';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  result: Immutable.Set(),
  entities: {
    users: Immutable.Map(),
    organisations: Immutable.Map(),
  },
});

/**
 * ...
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AuthActions.LOGIN):
    case REQUEST(AuthActions.LOGOUT):
    case REQUEST(AuthActions.LOAD):
      return state
        .set('fetching', true)
        .set('error', false);

    case SUCCESS(AuthActions.LOGIN):
    case SUCCESS(AuthActions.LOAD):
      return state
        .set('fetching', false)
        .set('error', false)
        .update('entities', entities => entities.mergeDeep(action.payload.data.entities))
        .update('result', result => result.union(action.payload.data.result));

    case SUCCESS(AuthActions.LOGOUT):
      return state
        .set('fetching', false)
        .set('error', false)
        .update('entities', entities => entities.clear())
        .update('result', result => result.clear());

    case FAILURE(AuthActions.LOGIN):
    case FAILURE(AuthActions.LOGOUT):
    case FAILURE(AuthActions.LOAD):
      return state
        .set('fetching', false)
        .set('error', Immutable.fromJS(action.payload));

    default:
      return state;
  }
}
