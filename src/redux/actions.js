import * as types from './actionTypes';
import {fetchItems, fetchConfig} from '../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().searching.filters;

	const {data: responseData} = await fetchItems(requestData);

	if (!responseData.err) {
		dispatch({
			type: types.REPLACE_ITEMS,
			payload: responseData.data.items
		});

		dispatch({
			type: types.SET_NEXT_PAGE_AVAILABILITY,
			payload: responseData.data.nextPageAvailable
		});
	}

	return !responseData.err;
};

export const setPageFilter = (page) => {
	return {
		type: types.SET_PAGE,
		payload: page
	};
};

export const setNameFilter = (name) => {
	return {
		type: types.SET_NAME,
		payload: name
	};
};


export const addItemToOrder = (item) => {
	return {
		type: types.ADD_ITEM_TO_ORDER,
		payload: item
	};
};

export const removeItemFromOrderByIndex = (itemIndex) => {
	return {
		type: types.REMOVE_ITEM_FROM_ORDER_BY_INDEX,
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


export const setConfig = () => async (dispatch) => {
	const {data: config} = await fetchConfig();

	dispatch({
		type: types.SET_CONFIG,
		payload: config
	});
};