import { combineReducers } from 'redux';

import profile from './profile.js'
import team from './team'

const rootReducer = combineReducers({
   profile,
   team
});

export default rootReducer;