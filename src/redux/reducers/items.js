const initialState = {
	list: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REPLACE_ITEMS':
			return Object.assign({}, state, {
				list: action.items
			});
		default:
			return state;
	}
};

export default reducer;