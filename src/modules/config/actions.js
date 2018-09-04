import * as types from './actionTypes';
import {fetchConfig} from '../../api';

export const setConfig = () => async (dispatch) => {
	const {err, data} = await fetchConfig();

	if (!err) {
		dispatch({
			type: types.SET_CONFIG,
			payload: data
		});
	}
};