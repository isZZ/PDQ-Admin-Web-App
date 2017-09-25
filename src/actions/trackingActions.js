import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {groupFetch, groupWatchGroup} from './groupActions';

var userCallbacks = {};
// export function trackUsers(){
// 	return (dispatch, getState)  => {
// 		let state = getState();
// 		let group = state.group.group;
// 		let users = group.users;
// 		let userCallbacks = {};
// 		let trackedUsers = state.tracking.users;
// 		console.log('TYPE OF');
// 		console.log(typeof(users)!=='undefined');
// 		console.log(users);
// 		if(typeof(users)!=='undefined' && Object.keys(group.users).length>0){
// 			for(let userId in users){
// 				if( trackedUsers )
// 				userCallbacks[userId] = firebaseApi.GetValueChanges('/userLocations/', userId, function(data){
// 					//let coords = data;
// 					let coords = []
// 					for(let key in data){
// 						let GPSPosition = data[key];
// 						if(GPSPosition.latitude, GPSPosition.longitude){
// 							let latlon = {
// 								lat: GPSPosition.latitude,
// 								lng: GPSPosition.longitude
// 							}
// 							coords.push(latlon);
// 						}
// 					}
// 					dispatch(trackingAddData(userId, coords));
// 				}, 'time', 10000);
// 			}
// 		}
// 	};
// }

export function trackGroup(id){
	return dispatch => {
		return dispatch(groupWatchGroup(id, function(){
			return dispatch(test());
		}));
	}
}

export function test(){
	return (dispatch, getState) => {
		console.log('TRACK GROUP CHANGED');
		let state = getState();
		return dispatch(trackUsers());
	}
}


export function fetchTrackingGroup(id){
	return (dispatch, getState) =>{
		return groupFetch(id)
	}
}

export function trackingAddTime(timeStart, timeEnd) {
	return {
		type: types.TRACKING_ADD_TIME,
		timeStart:  timeStart,
		timeEnd: timeEnd
	};
}

export function trackingTimeUpdate(timeStart, timeEnd){
	return (dispatch, getState)  => {
		
		dispatch(trackingAddTime(timeStart, timeEnd));
		return Promise.resolve();
	}
}

export function trackingTimeUsersUpdate(timeStart, timeEnd){
	return (dispatch, getState)  => {
		return dispatch(trackingTimeUpdate(timeStart, timeEnd))
		.then(()=>{
			dispatch(trackUsers());
		});
	}
}

export function trackUsers(){
	return (dispatch, getState)  => {
		let state = getState();
		console.log('TRACK USERS');
		console.log(state);
		let group = state.group.group;
		let users = group.users;
		let trackedUsers = state.tracking.users;
		let timeStart = state.tracking.timeStart;
		let timeEnd = state.tracking.timeEnd;
		for(let val in userCallbacks){
			let ref = userCallbacks[val];
			console.log(ref.off());
		}
		if(typeof(users)!=='undefined' && Object.keys(group.users).length>0){
			console.log('TRACKING USERS');
			for(let userId in users){
				
				userCallbacks[userId] = firebaseApi.GetValueChanges('/userLocations/'+ userId, function(data){
					let coords = [];
					for(let key in data){
						let GPSPosition = data[key];
						if(GPSPosition.latitude, GPSPosition.longitude){
							let latlon = {
								lat: GPSPosition.latitude,
								lng: GPSPosition.longitude
							};
							coords.push(latlon);
						}
					}
					console.log('TRACKING START'+timeStart);
					console.log('TRACKING END'+timeEnd);
					console.log('TRACKING START'+timeStart.getTime());
					console.log('TRACKING END'+timeEnd.getTime());
					dispatch(trackingAddData(userId, coords));
				}, 'time', timeStart.getTime(), timeEnd.getTime(), 10000);

					// console.log('REF');
					// console.log(typeof(ref.off()));
					
					
			}
		}
	};
}

// export function trackingAddData(userId, coords){
// 	return (dispatch, getState)  => {
// 		let state = getState();
// 	};
// }

export function trackingAddData(userId, coords) {
	let trackingData = {};
	trackingData[userId] = coords;
	return {
		type: types.TRACKING_ADD_DATA,
		trackingData
	};
}



// export function trackingStart(id){
// 	return dispatch => {
// 		dispatch(groupFetch(id)).then(function(group){
// 			if(group.users){
// 				let users = group.users;
// 				dispatch(trackingFetchUsersLocations(Object.keys(users)))
// 			}else{

// 			}
// 		});
// 	};
// }

// export function trackingFetchUsersLocations(users){
// 	return dispatch => {
// 		console.log('USER');
// 		console.log(users);
// 	};
// }

// return (dispatch) => {
//     dispatch(authInitializedDone());
//     if (user) {
//       dispatch(authLoggedIn(user.uid));
//     } else {
//       dispatch(authLoggedOutSuccess());
//     }
//   };