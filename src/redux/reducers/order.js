import * as types from '../actionTypes';

const initialState = {
	items: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_ITEM_TO_ORDER:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		default:
			return state;
	}
};

export default reducer;