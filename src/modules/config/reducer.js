import {SET_CONFIG} from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CONFIG:
			return {...state, ...action.payload};
		default:
			return state;
	}
};

export default reducer;