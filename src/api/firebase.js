import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

	constructor() {
		this.groupFeedListener = null;
	}

	static initAuth() {
		firebase.initializeApp(firebaseConfig);
		return new Promise((resolve, reject) => {
			const unsub = firebase.auth().onAuthStateChanged(
				user => {
					unsub();
					resolve(user);
				},
				error => reject(error)
			);
		});
	}

	static createUserWithEmailAndPassword(user){
		return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
	}

	static signInWithEmailAndPassword(user) {
		return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
	}

	static authSignOut(){
		return firebase.auth().signOut();
	}

	static databasePush(path, value) {
		return new Promise((resolve, reject) => {
			firebase
				.database()
				.ref(path)
				.push(value, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
		});
	}

	static GetValueByKeyOnce(path, key) {
		return firebase
			.database()
			.ref(path)
			.orderByKey()
			.equalTo(key)
			.once('value');
	}

	static GetChildAddedByKeyOnce(path, key) {
		return firebase
			.database()
			.ref(path)
			.orderByKey()
			.equalTo(key)
			.once('child_added');
	}

	static databaseSet(path, value) {
		return firebase
			.database()
			.ref(path)
			.set(value);
	}

	static GetChildren(path){
		return firebase
			.database()
			.ref(path)
			.once('value');
	}

	static GetChildAdded(path, callback = null, orderByChild = null, startAt = null, endAt = null, limit = 120000){

		let query = firebase
			.database()
			.ref(path);

			if(orderByChild)
				query = query.orderByChild(orderByChild)

			query
			.limitToLast(limit)
			.on("child_added", function(dataSnapshot){
				let data = dataSnapshot.val();
				let key = dataSnapshot.key;
				data.id = key;
				if(typeof(callback)=='function'){
					callback(data);
				}
			})

			return query;
	}

	static GetValueChanges(path, callback, orderByChild = null, startAt = null, endAt = null, limit = 120000){

		console.log('START AND END');
		console.log(startAt);
		console.log(endAt);

		var query = firebase
			.database()
			.ref(path)

		if(orderByChild)
			query = query.orderByChild(orderByChild);

		if(startAt)
			query = query.startAt(startAt);

		if(endAt)
			query = query.endAt(endAt);

		query
		.limitToLast(limit)
		.on('value', function(dataSnapshot){
			let data = dataSnapshot.val();
			console.log('DATA TEST');
			console.log(data);
			if(typeof(callback)=='function'){
				callback(data);
			}
		});

		return query;

	}

}

export default FirebaseApi;