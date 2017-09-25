import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function groupFeedReducer(state = initialState.groupFeed, action) {
	switch (action.type) {
		case types.GROUPFEED_FETCHING:
			return Object.assign({}, state, { 
				isFetching:true,
				error:false
			});
		case types.GROUPFEED_ERROR:
			return Object.assign({}, state, {
				isFetching:false,
				error:action.error
			});
		case types.GROUPFEED_SUCCESS:

			return Object.assign({}, state, {
				isFetching:false,
				feedItems:action.feedItems,
				feedItemsById:action.feedItemsById,
				error:false,
				// timeStart:action.timeStart,
				// timeEnd:action.timeEnd
			});

			// let newFeedItems = state.feedItems.slice();
			// newFeedItems.push(action.id)

			// return Object.assign({}, state, {
			// 	isFetching:false,
			// 	feedItems:newFeedItems,
			// 	feedItemsById:{
			// 		...state.feedItemsById,
			// 		[action.id]:action.feedItem
			// 	},
			// 	error:false,
			// 	// timeStart:action.timeStart,
			// 	// timeEnd:action.timeEnd
			// });
		case types.GROUPFEED_RESET:
			return Object.assign({}, state, { 
				isFetching:false,
				feedItems:[],
				feedItemsById:{},
				error:false
			});
		default:
			return state;
	}
}
