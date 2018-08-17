import {combineReducers} from 'redux';

import searching from './searching';
import config from './config';

export default combineReducers({
	searching,
	config
});