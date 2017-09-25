import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

export function groupsFetching() {
	return {
		type: types.GROUPS_FETCHING
	};
}

export function groupsError(error) {
	return {
		type: types.GROUPS_ERROR,
		error
	};
}

export function groupsSuccess(groups) {
	return {
		type: types.GROUPS_SUCCESS,
		groups
	};
}

export function usersFetching() {
	return {
		type: types.USERS_FETCHING
	};
}

export function usersError(error) {
	return {
		type: types.USERS_ERROR,
		error
	};
}

export function usersSuccess(users) {
	return {
		type: types.USERS_SUCCESS,
		users
	};
}

export function groupsFetch(){
	return (dispatch, getState) => {
		let state = getState();
		if(state.auth.isLogged){
			dispatch(groupsFetching());
			firebaseApi.GetValueChanges('/groups/', function(data){
				let groups = data;
				groups = (groups === null)?{}:groups;
				dispatch(groupsSuccess(groups));
				//Get user profiles ids
				if(Object.keys(groups) !== 0){
					let userProfiles = {};
					for(let key in groups){
						let group = groups[key];
						userProfiles = Object.assign({}, userProfiles, group.users);
					}
					dispatch(groupsFetchUserProfiles(userProfiles)).then(function( userProfiles ){
						let userProfilesObj = {};
						Array.prototype.forEach.call(userProfiles,function(elem) {
							let keys = Object.keys(elem);
							userProfilesObj[keys[0]] = elem[keys[0]];
						});
						dispatch(usersSuccess(userProfilesObj));
					});
				}
			},
			null,
			null,
			null,
			12000
			);
		}
	}
}

export function groupsFetchUserProfiles(users) {
	return (dispatch) => {
		let reads = [];
		for( let key in users ){
			let promise = firebaseApi.GetValueByKeyOnce('/users/', key)
			.then(
				data => {
					return data.val();
			})
			.catch(
				error => {
					console.log(error);
			});
			reads.push( promise );
		}
		return Promise.all(reads);
	};
}