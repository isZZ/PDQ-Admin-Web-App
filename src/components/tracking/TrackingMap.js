import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GoogleMapLoader, GoogleMap, Marker, Polyline} from "react-google-maps";

export class TrackingMap extends Component {

	constructor(props){
		super(props);
		this.onGoogleMapLoad = this.onGoogleMapLoad.bind(this);
		this.setBounds = this.setBounds.bind(this);
	}



	onGoogleMapLoad(map){
			this._mapComponent = map;
	    	// console.log(map.props.map.getBounds());
	    	// console.log(map.props.map.getCenter().lat());
	    	// map.props.map.setCenter({lat: -34, lng: 4000});
	    	// this.

		
		
		// this.setState({map:props.map});
		// console.log('GET CENTER');
		// console.log(map.props);
		// console.log('GET CENTER END');
    // Save google map instance
    // on the parent component
    	//
 	}

 	componentWillReceiveProps(nextProps){
 		let {group} = this.props;

 		console.log('nextProps', nextProps.group.id);
 		console.log('group', group);

 		if(nextProps &&  nextProps.group && group && nextProps.group.id !== group.id){
			this.setBounds();
 		}
 		
 		//console.log('NEXT PROPS', nextProps)
 	}

	setBounds(){
		console.log('SETTING BOUNDS');
		let map = this._mapComponent;
		let {trackingData, group} = this.props;

 		if(map){

 			var latlngs = [];
 			console.log('TRACKING DATA');
 			console.log(trackingData);
			for(let key in group.users){
				console.log('groupUsers', group.users);
				latlngs = latlngs.concat(trackingData[key]);
			}

			console.log('LAT LNGS');
			console.log(latlngs);

			if(latlngs.length>0){
				var bounds = new google.maps.LatLngBounds();
				for (var i = 0; i < latlngs.length; i++) {

					let latlng = latlngs[i];
					if(typeof(latlng)==='undefined')
						continue;

					let lat = latlng.lat;
					let lng = latlng.lat;
					if(lat !== undefined && lng !== undefined){
						bounds.extend(latlng);
					}
					// if(latlng.lat !== undefined && latlng.lng !== undefined)
					// 	bounds.extend(latlng);
					// let latlng = latlngs[i];
					//var points = new google.maps.LatLng(latlng.lat, latlng.lng);
					// //console.log(latlngs[i]);
				 // 	
				}

				map.fitBounds(bounds);


			// 	console.log(userKey);
			// 	console.log(group.users);
			// 	console.log(trackingData);
			// 	latlngs = latlngs.concat(trackingData[userKey]);
			// }

			// console.log(latlngs);

			// //var markers = [];//some array
			// var bounds = new google.maps.LatLngBounds();
			// for (var i = 0; i < latlngs.length; i++) {;
			// 	var points = new google.maps.LatLng
			//  	bounds.extend(latlngs[i]);
			// }

			// map.fitBounds(bounds);
			// //var points = new google.maps.LatLng
			// console.log("HERE ARE THE BOUNDS");
			// //console.log(bounds)
			}
 		}
 	}

	render(){

		let {trackingData, group, users, colors} = this.props;
		let usersKeys = [];

		for(let userKey in group.users){
			usersKeys.push(userKey);
		}

		return(
			<section style={{minHeight: "500px"}}>
				<GoogleMapLoader
					containerElement={
						<div style={{height: "100%", minHeight:"600px"}} />
					}
					googleMapElement={
						<GoogleMap
							ref={ this.onGoogleMapLoad }
							defaultZoom={3}
							defaultCenter={{lat: -25.363882, lng: 131.044922}}
						>
							{usersKeys.map((value, i) => {
								return <Path coords={trackingData[value]} user={users[value]} key={i} color={colors[i]} />
							})}
						</GoogleMap>
					}
				>
				</GoogleMapLoader>
			</section>
		);
	}
}
const Path = (props) => {
	let coords = props.coords;
	let user = props.user;
	let color = props.color;
	if(typeof(coords)==='undefined'||coords.length == 0||typeof(user)==='undefined')
		return null;

	return <Polyline mapHolderRef={props.mapHolderRef} options={{strokeColor:color}} strokeOpacity="0.5" strokeWeight="2" path={props.coords} geodesic="true" />;
}

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingMap);