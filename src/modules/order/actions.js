import * as types from './actionTypes';
import api from '../../api';

export const sendOrder = (itemsIds) => async (dispatch) => {
	const {err, data} = await api.addOrder(itemsIds);

	if (!err) {
		dispatch({
			type: types.CLEAR_ITEMS
		});

		dispatch({
			type: types.SHOW_ORDER_CONFIRMATION
		});
	}
};

export const addItemToOrder = (item) => {
	return {
		type: types.ADD_ITEM,
		payload: item
	};
};

export const removeItemFromOrderByIndex = (itemIndex) => {
	return {
		type: types.REMOVE_ITEM_BY_INDEX,
		payload: itemIndex
	};
};

export const openOrderList = () => {
	return {
		type: types.OPEN_ORDER_LIST
	};
};

export const closeOrderList = () => {
	return {
		type: types.CLOSE_ORDER_LIST
	};
};