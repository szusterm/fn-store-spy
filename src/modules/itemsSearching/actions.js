import * as types from './actionTypes';
import {fetchItems} from '../../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().itemsSearching.filters;

	const response = await fetchItems(requestData);

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

export const setPageFilter = (page) => ({
	type: types.SET_PAGE,
	payload: page
});

export const setNameFilter = (name) => ({
	type: types.SET_NAME,
	payload: name
});