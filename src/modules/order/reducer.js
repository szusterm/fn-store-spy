import * as types from './actionTypes';

const initialState = {
	items: [],
	listOpened: false
};

const reducer = (state = initialState, action) => {
	const {type, payload} = action;

	switch (type) {
		case types.ADD_ITEM:
			return {
				...state,
				items: [...state.items, payload]
			};
		case types.REMOVE_ITEM_BY_INDEX:
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