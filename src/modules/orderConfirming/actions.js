import * as types from './actionTypes';
import api from '../../api';

export const sendOrder = (itemsIds) => async (dispatch) => {
	const {err, data} = await api.addOrder(itemsIds);

	if (!err) {
		const {code} = data;

		dispatch({
			type: types.SET_CODE,
			payload: code
		});

		dispatch({
			type: types.SHOW_ORDER_CONFIRMATION
		});
	}
};

export const hideEndingScreen = () => ({
	type: types.HIDE_ORDER_CONFIRMATION
});