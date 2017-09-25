import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userMetaReducer(state = initialState.userMeta, action) {
	switch (action.type) {
		case types.USER_META_FETCHING:
			return Object.assign({}, state, {
				isFetching:true,
				error:false});
		case types.USER_META_ERROR:
			return Object.assign({}, state, {
				isFetching:false, 
				error:action.error});
		case types.USER_META_SUCCESS:
			return Object.assign({}, state, {
				isFetching:false,
				userMeta: Object.assign({}, state.userMeta, action.userMeta), 
				error:false});
		default:
			return state;
	}
}
