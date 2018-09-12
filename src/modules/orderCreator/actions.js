import * as types from './actionTypes';

export const addItemToOrder = (item) => ({
	type: types.ADD_ITEM,
	payload: item
});

export const removeItemFromOrderByIndex = (itemIndex) => ({
	type: types.REMOVE_ITEM_BY_INDEX,
	payload: itemIndex
});

export const openOrderList = () => ({
	type: types.OPEN_ORDER_LIST
});

export const closeOrderList = () => ({
	type: types.CLOSE_ORDER_LIST
});