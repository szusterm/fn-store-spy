const initialState = {
	list: [],
	nextPageAvailable: false,
	maxItemsPerPage: 0
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REPLACE_ITEMS':
			return Object.assign({}, state, {
				list: action.items
			});

		case 'SET_NEXT_PAGE_AVAILABILITY':
			return Object.assign({}, state, {
				nextPageAvailable: action.nextPageAvailable
			});

		case 'SET_MAX_ITEMS_PER_PAGE':
			return Object.assign({}, state, {
				maxItemsPerPage: action.maxItemsPerPage
			});

		default:
			return state;
	}
};

export default reducer;