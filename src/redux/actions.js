import {getItems} from '../api';

export const replaceItems = (data) => async (dispatch) => {
	const {data: responseData} = await getItems(data);
	if (!responseData.err) {
		dispatch({
			type: 'REPLACE_ITEMS',
			items: responseData.data
		});
	}

	return !responseData.err;
};