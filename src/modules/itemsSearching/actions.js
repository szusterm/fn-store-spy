import * as types from './actionTypes';
import api from '../../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().itemsSearching.filters;

	const response = await api.fetchItems(requestData);

	if (!response.err) {
		dispatch({
			type: types.REPLACE_ITEMS,
			payload: response.data.items
		});

		dispatch({
			type: types.SET_NEXT_PAGE_AVAILABILITY,
			payload: response.data.nextPageAvailable
		});
	}

	return !response.err;
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