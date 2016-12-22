import { combineReducers } from 'redux';
import Immutable from 'immutable';

import jobs from 'jobs';

export default Immutable.Map(combineReducers({
  jobs,
}));
