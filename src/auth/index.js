import {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './constants';

// Initial state
export const initialState = {
  _requesting: null,
  result: null,
  entities: {
    user: null,
    organisation: null,
  },
};

/**
 * Jobs reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        _requesting: LOGIN_REQUEST,
      };
    case LOGIN_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        _requesting: null,
        result: action.data.result,
        entities: { ...action.data.entities },
      };
    case LOGIN_FAILURE:
    case LOAD_FAILURE:
    case LOGOUT_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
