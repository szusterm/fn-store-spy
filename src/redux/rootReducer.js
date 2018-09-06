import {combineReducers} from 'redux';

import searching from '../modules/searching/reducer';
import order from '../modules/order/reducer';
import ending from '../modules/ending/reducer';
import config from '../modules/config/reducer';

export default combineReducers({
	searching,
	order,
	ending,
	config
});