import * as types from './actionTypes';
import {fetchConfig} from '../../api';

export const setConfig = () => async (dispatch) => {
	const {data: config} = await fetchConfig();

	dispatch({
		type: types.SET_CONFIG,
		payload: config
	});
};