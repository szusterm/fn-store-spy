import {fetchItems, fetchConfig} from '../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().searching.filters;

	const {data: responseData} = await fetchItems(requestData);

	if (!responseData.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			payload: responseData.data.items
		});

		dispatch({
			type: 'SET_NEXT_PAGE_AVAILABILITY',
			payload: responseData.data.nextPageAvailable
		});
	}

	return !responseData.err;
};

export const setPageFilter = (page) => {
	return {
		type: 'SET_PAGE',
		payload: page
	};
};

export const setNameFilter = (name) => {
	return {
		type: 'SET_NAME',
		payload: name
	};
};

export const setConfig = () => async (dispatch) => {
	const {data: config} = await fetchConfig();

	dispatch({
		type: 'SET_CONFIG',
		payload: config
	});
};