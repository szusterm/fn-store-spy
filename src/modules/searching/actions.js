import isRequestSuccessful from '../../../helpers/isRequestSuccessful';

import * as types from './actionTypes';
import {fetchItems} from '../../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().searching.filters;

	const response = await fetchItems(requestData);

	const isSuccess = isRequestSuccessful(response.status);

	if (isSuccess) {
		dispatch({
			type: types.REPLACE_ITEMS,
			payload: response.data.items
		});

		dispatch({
			type: types.SET_NEXT_PAGE_AVAILABILITY,
			payload: response.data.nextPageAvailable
		});
	}

	return isSuccess;
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