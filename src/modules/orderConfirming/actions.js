import * as types from './actionTypes';
import api from '../../api';

export const sendOrder = (itemsIds) => async (dispatch) => {
	const {err, data} = await api.addOrder(itemsIds);

	if (!err) {
		dispatch({
			type: types.SHOW_ORDER_CONFIRMATION
		});
	}
};