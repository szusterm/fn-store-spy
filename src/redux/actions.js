import {getItems} from '../api';

export const replaceItems = (data) => async (dispatch) => {
	const response = await getItems(data);
	if (!response.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			items: response.data
		});
	}

	return !response.err;
};