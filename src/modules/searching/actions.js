import * as types from './actionTypes';
import {fetchItems} from '../../api';

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