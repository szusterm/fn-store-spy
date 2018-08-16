import {fetchItems} from '../api';

export const updateItems = () => async (dispatch, getState) => {
	const requestData = getState().searching.filters;

	const {data: responseData} = await fetchItems(requestData);

	if (!responseData.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			items: responseData.data.items
		});

		dispatch({
			type: 'SET_NEXT_PAGE_AVAILABILITY',
			nextPageAvailable: responseData.data.nextPageAvailable
		});

		dispatch({
			type: 'SET_MAX_ITEMS_PER_PAGE',
			maxItemsPerPage: responseData.data.maxItemsPerPage
		});
	}

	return !responseData.err;
};

export const setPageFilter = (page) => {
	return {
		type: 'SET_PAGE',
		page
	};
};

export const setNameFilter = (name) => {
	return {
		type: 'SET_NAME',
		name
	};
};