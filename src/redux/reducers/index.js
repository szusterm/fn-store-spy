import {combineReducers} from 'redux';

import searching from './searching';
import order from './order';
import config from './config';

export default combineReducers({
	searching,
	order,
	config
});