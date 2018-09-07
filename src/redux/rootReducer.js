import {combineReducers} from 'redux';

import itemsSearching from '../modules/itemsSearching/reducer';
import orderCreator from '../modules/orderCreator/reducer';
import orderConfirming from '../modules/orderConfirming/reducer';
import config from '../modules/config/reducer';

export default combineReducers({
	itemsSearching,
	orderCreator,
	orderConfirming,
	config
});