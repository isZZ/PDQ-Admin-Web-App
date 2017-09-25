import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

export function userMetaFetching() {
	return {
		type: types.USER_META_FETCHING
	};
}

export function userMetaError(error) {
	return {
		type: types.USER_META_ERROR,
		error
	};
}

export function userMetaSuccess(userMeta) {
	return {
		type: types.USER_META_SUCCESS,
		userMeta
	};
}

export function userMetaFetch(id){
	return (dispatch, getState) => {
		dispatch(userMetaFetching());
		firebaseApi.GetValueChanges('/userMeta/'+id, function(data){
			console.log(data);
			dispatch(userMetaSuccess({[id]:data}));
		});
	};
}

export function usersMetaFetch(){
	return (dispatch, getState) => {
		let state = getState();
		let users = {};
		console.log('STATE GROUP');
		console.log(state.group);
		if(state.group.group.users){
			users = state.group.group.users;
			console.log('users users');
			console.log(users);
			for(let key in users){
				if(typeof(state.userMeta.userMeta)=='undefined' || typeof(state.userMeta.userMeta[key])=='undefined'){
					dispatch(userMetaFetch(key));
				}
			}
		}
	};
}


// return firebaseApi.GetChildAddedByKeyOnce('/userMeta/', id)
// 			.then(
// 				data => {
// 					let group = data.val();
// 					group.id = id;
// 					dispatch(groupSuccess(group));
// 					return group
// 				})
// 				.catch(
// 					error => {
// 						dispatch(groupError(error));
// 						throw(error);
// 			});


// firebaseApi.GetValueChanges('/groups/', function(data){
// 				let groups = data;
// 				groups = (groups === null)?{}:groups;
// 				dispatch(groupsSuccess(groups));
// 				//Get user profiles ids
// 				if(Object.keys(groups) !== 0){
// 					let userProfiles = {};
// 					for(let key in groups){
// 						let group = groups[key];
// 						userProfiles = Object.assign({}, userProfiles, group.users);
// 					}
// 					dispatch(groupsFetchUserProfiles(userProfiles)).then(function( userProfiles ){
// 						let userProfilesObj = {};
// 						Array.prototype.forEach.call(userProfiles,function(elem) {
// 							let keys = Object.keys(elem);
// 							userProfilesObj[keys[0]] = elem[keys[0]];
// 						});
// 						dispatch(usersSuccess(userProfilesObj));
// 					});
// 				}
// 			},
// 			null,
// 			null,
// 			null,
// 			12000
// 			);