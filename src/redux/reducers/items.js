const reducer = (state = [], action) => {
	switch(action.type) {
		case 'REPLACE_ITEMS':
			return [...action.items];
		default:
			return state;
	}
};

export default reducer;