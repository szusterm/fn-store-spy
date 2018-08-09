import {fetchItems} from '../api';

export const updateItems = (data) => async (dispatch) => {
	const {data: responseData} = await fetchItems(data);
	if (!responseData.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			items: responseData.data.items
		});

		dispatch({
			type: 'SET_NEXT_PAGE_AVAILABILITY',
			data: responseData.data.nextPageAvailable
		});

		dispatch({
			type: 'SET_MAX_ITEMS_PER_PAGE',
			data: responseData.data.maxItemsPerPage
		});
	}

	return !responseData.err;
};