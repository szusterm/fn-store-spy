const initialState = {
	items: [],
	filters: {
		page: 1,
		name: ''
	},
	nextPageAvailable: false,
	maxItemsPerPage: 0
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REPLACE_ITEMS':
			return {
				...state,
				items: action.items
			};

		case 'SET_PAGE':
			return {
				...state,
				filters: {
					...state.filters,
					page: action.page
				}
			};

		case 'SET_NAME':
			return {
				...state,
				filters: {
					...state.filters,
					name: action.name
				}
			};

		case 'SET_NEXT_PAGE_AVAILABILITY':
			return {
				...state,
				nextPageAvailable: action.nextPageAvailable
			};

		case 'SET_MAX_ITEMS_PER_PAGE':
			return {
				...state,
				maxItemsPerPage: action.maxItemsPerPage
			};

		default:
			return state;
	}
};

export default reducer;