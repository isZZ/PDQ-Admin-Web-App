import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function groupFetching() {
	return {
		type: types.GROUP_FETCHING
	};
}

export function groupError(error) {
	return {
		type: types.GROUP_ERROR,
		error
	};
}

export function groupSuccess(group) {
	console.log('GROUP SUCCESS');
	console.log(group);
	return {
		type: types.GROUP_SUCCESS,
		group
	};
}

export function groupReset() {
	return {
		type: types.GROUP_RESET
	};
}

export function groupFetch(id){
	return (dispatch, getState) => {
		dispatch(groupFetching());
		console.log('groupFetchId');
		console.log(id);
		return firebaseApi.GetChildAddedByKeyOnce('/groups/', id)
			.then(
				data => {
					let group = data.val();
					group.id = id;
					group['test'] = id;
					console.log('FETCHED GROUP', group);
					dispatch(groupSuccess(group));
					return group
				})
				.catch(
					error => {
						dispatch(groupError(error));
						throw(error);
			});
	};
}

export function groupGoToGroup(id){
	return (dispatch) => {
		dispatch(groupFetch(id)).then(()=>{
			console.log('Going to group');
			dispatch(push('/userMeta'));
		});
	}
}

export function groupWatchGroup(id, callback = false){
	var id =  id;
	return (dispatch) => {
		dispatch(groupFetching());
		return firebaseApi.GetValueChanges('/groups/' + id, function(data){
			let group = data;
			group.id = id;
			if(group){
				dispatch(groupSuccess(group));
				if(typeof(callback)==='function'){
					dispatch(callback());
				}
			}else{
				dispatch(groupError('groupWatchGroup returned null'));
			}
		});
	};
}
