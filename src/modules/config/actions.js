import * as types from './actionTypes';
import api from '../../api';

export const setConfig = () => async (dispatch) => {
	const {err, data} = await api.fetchConfig();

	if (!err) {
		dispatch({
			type: types.SET_CONFIG,
			payload: data
		});
	}
};