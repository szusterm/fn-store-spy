import * as types from '../actionTypes';

const initialState = {
	items: [],
	listOpened: false
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
		case types.OPEN_ORDER_LIST:
			return {
				...state,
				listOpened: true
			};
		case types.CLOSE_ORDER_LIST:
			return {
				...state,
				listOpened: false
			};
		default:
			return state;
	}
};

export default reducer;