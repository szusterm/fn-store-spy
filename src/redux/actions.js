import {fetchItems} from '../api';

export const updateItems = (data) => async (dispatch) => {
	const {data: responseData} = await fetchItems(data);
	if (!responseData.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			items: responseData.data.items
		});
	}

	return !responseData.err;
};