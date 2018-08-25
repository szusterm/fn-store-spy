import * as types from '../actionTypes';

const initialState = {
	items: []
};

const reducer = (state = initialState, action) => {
	const {type, payload} = action;

	switch (type) {
		case types.ADD_ITEM_TO_ORDER:
			return {
				...state,
				items: [...state.items, payload]
			};
		case types.REMOVE_ITEM_FROM_ORDER_BY_INDEX:
			state.items.splice(payload, 1);
			return {
				...state,
				items: [...state.items]
			};
		default:
			return state;
	}
};

export default reducer;