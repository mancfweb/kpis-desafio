import {combineReducers} from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import research from './research/reducer';

export default combineReducers({
  auth,
  user,
  research,
});
