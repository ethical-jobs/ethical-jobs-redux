import merge from 'lodash/merge';
import {
  CLEAR,
  FETCH_ORGS_REQUEST, FETCH_ORGS_SUCCESS, FETCH_ORGS_FAILURE,
  FETCH_ORG_REQUEST, FETCH_ORG_SUCCESS, FETCH_ORG_FAILURE,
  ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILURE,
} from './constants';

// Initial state
export const initialState = {
  _requesting: null,
  result: null,
  entities: {
    organisations: null,
    users: null,
  },
};

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        result: initialState.result,
        entities: { ...initialState.entities },
      };
    case ARCHIVE_REQUEST:
    case FETCH_ORGS_REQUEST:
    case FETCH_ORG_REQUEST:
      return {
        ...state,
        _requesting: FETCH_ORGS_REQUEST,
      };
    case FETCH_ORGS_SUCCESS:
    case FETCH_ORG_SUCCESS:
      return {
        ...state,
        _requesting: null,
        // BUG: action.result can be array or value!!
        result: action.data.result,
        entities: merge({}, state.entities, action.data.entities),
      };
    case ARCHIVE_FAILURE:
    case ARCHIVE_SUCCESS:
    case FETCH_ORGS_FAILURE:
    case FETCH_ORG_FAILURE:
      return {
        ...state,
        _requesting: null,
      };
    default:
      return state;
  }
}
