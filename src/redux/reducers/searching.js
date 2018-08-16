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
			return Object.assign({}, state, {
				items: action.items
			});

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
			return Object.assign({}, state, {
				nextPageAvailable: action.data
			});

		case 'SET_MAX_ITEMS_PER_PAGE':
			return Object.assign({}, state, {
				maxItemsPerPage: action.data
			});

		default:
			return state;
	}
};

export default reducer;