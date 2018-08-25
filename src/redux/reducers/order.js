import * as types from '../actionTypes';

const initialState = {
	items: []
};

const reducer = (state = initialState, action) => {
	const {type, payload} = action;

	if (type === types.ADD_ITEM_TO_ORDER) {
		return {
			...state,
			items: [...state.items, payload]
		};
	}
	else if (type === types.SET_ORDERED_ITEM_ACTIVE){
		const {index, active} = payload;

		const chnagedItems = [...state.items];
		chnagedItems[index].active = active;

		return {
			...state,
			items: chnagedItems
		};
	}
	else {
		return state;
	}
};

export default reducer;