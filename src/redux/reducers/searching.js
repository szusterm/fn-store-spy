import * as types from '../actionTypes';

const initialState = {
	items: [],
	filters: {
		page: 1,
		name: ''
	},
	nextPageAvailable: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.REPLACE_ITEMS:
			return {
				...state,
				items: action.payload
			};

		case types.SET_PAGE:
			return {
				...state,
				filters: {
					...state.filters,
					page: action.payload
				}
			};

		case types.SET_NAME:
			return {
				...state,
				filters: {
					...state.filters,
					name: action.payload
				}
			};

		case types.SET_NEXT_PAGE_AVAILABILITY:
			return {
				...state,
				nextPageAvailable: action.payload
			};

		default:
			return state;
	}
};

export default reducer;