const initialState = {};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CONFIG':
			return {...state};
		default:
			return state;
	}
};

export default reducer;