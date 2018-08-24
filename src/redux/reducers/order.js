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
		case types.REMOVE_ITEM_FROM_ORDER_BY_INDEX:
			state.items.splice(action.payload, 1);
			return {
				...state,
				items: [...state.items]
			};
		default:
			return state;
	}
};

export default reducer;