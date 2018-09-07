import {combineReducers} from 'redux';

import searching from '../modules/itemsSearching/reducer';
import order from '../modules/orderCreator/reducer';
import ending from '../modules/orderConfirming/reducer';
import config from '../modules/config/reducer';

export default combineReducers({
	searching,
	order,
	ending,
	config
});