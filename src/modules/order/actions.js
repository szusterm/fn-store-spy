import * as types from './actionTypes';

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