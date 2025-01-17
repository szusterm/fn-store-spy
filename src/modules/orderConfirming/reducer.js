import * as types from './actionTypes';

const initialState = {
	endingScreenOpened: false,
	code: ''
};

const reducer = (state = initialState, action) => {
	const {type, payload} = action;

	switch (type) {
		case types.SHOW_ORDER_CONFIRMATION:
			return {
				...state,
				endingScreenOpened: true
			};

		case types.HIDE_ORDER_CONFIRMATION:
			return {
				...state,
				endingScreenOpened: false
			};

		case types.SET_CODE:
			return {
				...state,
				code: payload
			};

		default:
			return state;
	}
};

export default reducer;