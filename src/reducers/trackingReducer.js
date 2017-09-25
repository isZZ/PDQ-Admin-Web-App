import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function trackingReducer(state = initialState.tracking, action) {
	switch (action.type) {
		case types.TRACKING_ADD_USER:
			return Object.assign({}, state, {
				//users:state.tracking.slice().push(action.user)
			});
		case types.TRACKING_ADD_DATA:
			return Object.assign({}, state, {
				trackingData:Object.assign({}, state.trackingData, action.trackingData)
			});
		case types.TRACKING_ADD_TIME:
			return Object.assign({}, state, {
				timeStart:action.timeStart,
				timeEnd:action.timeEnd
			});
		default:
			return state;
	}
}
