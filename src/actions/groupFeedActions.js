import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

var groupFetchListener;

export function groupFeedFetching() {
	return {
		type: types.GROUPFEED_FETCHING
	};
}

export function groupFeedError(error) {
	return {
		type: types.GROUPFEED_ERROR,
		error
	};
}

// export function groupFeedSuccess(data) {
// 	return {
// 		type: types.GROUPFEED_SUCCESS,
// 		...data
// 	};
// }

export function groupFeedSuccess({feedItems, feedItemsById}) {
	return {
		type: types.GROUPFEED_SUCCESS,
		feedItems:feedItems,
		feedItemsById:feedItemsById
	};
}

// export function groupFeedSuccess(data) {
// 	return {
// 		type: types.GROUPFEED_SUCCESS,
// 		feedItem:data
// 	};
// }
  
export function groupFeedReset() {
	return {
		type: types.GROUPFEED_RESET
	};
}

export function groupFeedFetch(groupId){
	return (dispatch, getState) => {

		if(!typeof(groupFetchListener)=='undefined'){
			groupFetchListener.off('child_added');
		}

		groupFetchListener = firebaseApi.GetValueChanges('/groupFeed/'+groupId, function(data){
			
			let feedItems = [];
			let feedData = {};

			for(let key in data){
				feedItems.push(key)
			}

			feedData = {
				feedItems,
				feedItemsById:data
			}

			dispatch(groupFeedSuccess(feedData));
		},
		'createdAt'
		);

		return groupFetchListener;
			
		// dispatch(groupFetching());
		// console.log('groupFetchId');
		// console.log(id);

		// if(!typeof(groupFetchListener)=='undefined'){
		// 	groupFetchListener.off('child_added');				
		// }
		// return firebaseApi.GetChildAddedByKeyOnce('/groups/', id)
		// 	.then(
		// 		data => {
		// 			let group = data.val();
		// 			group.id = id;
		// 			dispatch(groupSuccess(group));
		// 			return group
		// 		})
		// 		.catch(
		// 			error => {
		// 				dispatch(groupError(error));
		// 				throw(error);
		// 	});
	};
}