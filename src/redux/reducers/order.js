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
		case types.SET_ORDERED_ITEM_ACTIVE:
			state.items[action.payload.index].active = action.payload.active;
			return {
				...state
			};
		default:
			return state;
	}
};

export default reducer;