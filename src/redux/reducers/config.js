const initialState = {};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CONFIG':
			return {...state, ...action.config};
		default:
			return state;
	}
};

export default reducer;