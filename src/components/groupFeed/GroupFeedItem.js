import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Router, Link} from 'react-router';
import SideNav from '../common/SideNav';
import {ChartGuage} from '../common/ChartGuage';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import NavigationCancel from 'material-ui/svg-icons/navigation/close';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: Colors.cyan500,
		primary2Color: Colors.cyan700,
		primary3Color: Colors.grey400,
		accent1Color: Colors.pinkA200,
		accent2Color: Colors.grey100,
		accent3Color: Colors.grey500,
		textColor: '#ffffff'
		//alternateTextColor: Colors.white,
		// canvasColor: Colors.white,
		// borderColor: Colors.grey300,
		// disabledColor: fade(Colors.darkBlack, 0.3),
		// pickerHeaderColor: Colors.cyan500,
		// clockCircleColor: fade(Colors.darkBlack, 0.07),
		// shadowColor: Colors.fullBlack,
	},
		appBar: {
		height: 50,
	},
	listItem: {
		nestedLevelDepth: 18,
		secondaryTextColor: 'rgba(255, 255, 255, 0.54)',
		//leftIconColor: grey600,
		//rightIconColor: grey600,
	}
});

class GroupFeedItem extends Component {
	
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		let {message, type, user} = this.props;

		return(
				<Paper>
					<div className="group-feed-wrapper">
						<div className="row group-feed-item">
							<div className="shrink columns">{this.renderAvatar()}</div>
							<div className="columns">
								<div className="row">
									<div className="columns">
										{this.renderUserDetails()} {this.renderMessageDate()}
									</div>
								</div>
								<div className="row">
									<div className="columns">
										{this.renderMessage()}
									</div>
								</div>
							</div>
							<div className="shrink columns">
								{this.renderSentiment()}
							</div>
							<Divider />
						</div>
						<div className="row group-results-row">
							<div className="columns">
								<MuiThemeProvider muiTheme={muiTheme}>
									<div className="row">
										{this.renderEntities()}
										{this.renderLogos()}
										{this.renderFaces()}
										{this.renderLabels()}
										{this.renderImageText()}
									</div>
								</MuiThemeProvider>
							</div>
						</div>
					</div>
				</Paper>
		)
	}

	renderLabels(){
		let {labels} = this.props;
		let listItems = [];

		if(typeof(labels) !== "object") return null;

		for(let key in labels){
			let listItem = <ListItem
				style={{paddingTop:8, paddingBottom:8}}
				primaryText={labels[key]}
				disabled
			/>
			listItems.push(listItem);
		}
		return (
			<div className="columns small-12 large-2">
				<List>
				<Subheader>Labels</Subheader>
					{listItems}
				</List>
			</div>
		);

	}

	renderFaces(){
		let showProps = ['headwear', 'joy', 'sorrow', 'suprise', 'anger', 'underExposed', 'blurred']
		let {faces} = this.props;
		let listItems = [];
		let renderFace = this.renderFace;

		if(!faces || !faces.length) return null;

		let facesOutput = [];

		for(let key in faces){
			let face = faces[key];
			let faceOutput = [];
			for(let key in face){
				if(showProps.indexOf(key)!==-1){
					let faceProp = {
						name:key,
						value:face[key]
					};
					faceOutput.push(faceProp)
				}
			}
			facesOutput.push(faceOutput);
		}

		// let output = facesOutput.map((props, i)=>{
		// 		return this.renderFace(props)
		// }

		let output = facesOutput.map(function(props, i){
			return renderFace(props, i);
		});

		return output

	}

	renderFace(props, index){
		console.log('RENDERING FACE');
		let results = [];
		props.map((prop)=>{
			let listItem = <ListItem
			style={{paddingTop:8, paddingBottom:8}}
			rightIcon={prop.value?<NavigationCheck color={'#fff'} style={{marginTop:11, width:12, height:12}} />:<NavigationCancel color={'#fff'} style={{marginTop:11, width:12, height:12}} />}
			disabled>{prop.name}{}</ListItem>;
			results.push(listItem);
		})
		return (
			<div className="columns small-12 large-2">
				<List>
					<Subheader>Face {index + 1}</Subheader>
					{results}
				</List>
			</div>
		);
	}

	renderLogos(){
		let {logos} = this.props;
		let listItems = [];

		if(typeof(logos) !== "object") return null;

		for(let key in logos){
			let listItem = <ListItem
				style={{paddingTop:8, paddingBottom:8}}
				primaryText={logos[key]}
				disabled
			/>
			listItems.push(listItem);
		}
		return (
			<div className="columns small-12 large-2">
				<List>
				<Subheader className="group-feed-item-sub-header">Logos</Subheader>
					{listItems}
				</List>
			</div>
		);
	}

	renderImageText(){
		let {imageText} = this.props;
		let listItems = [];

		if(typeof(imageText) !== "object") return null;

		for(let key in imageText){
			let listItem = <ListItem
				style={{paddingTop:8, paddingBottom:8}}
				primaryText={imageText[key]}
				disabled
			/>
			listItems.push(listItem);
		}
		return (
			<div className="columns small-12 large-4">
				<List>
				<Subheader className="group-feed-item-sub-header">Image Text</Subheader>
					{listItems[0]}
				</List>
			</div>
		);
	}

	renderEntities(){
		let {entities} = this.props;
		let listItems = [];

		if(typeof(entities) !== "object") return null;

		for(let key in entities){
			let {name, type, metadata} = entities[key];
			let listItem = <ListItem
				style={{paddingTop:8, paddingBottom:8}}
				primaryText={name}
				disabled
				secondaryText={
					<p className="group-feed-item-entities-seondary-text">{type}</p>
				}
			/>
			listItems.push(listItem);
		}
		return (
			<div className="columns small-12 large-2">
				<List>
				<Subheader className="group-feed-item-sub-header">Entities</Subheader>
					{listItems}
				</List>
			</div>
		);
	}

	renderSentiment(){
		let {documentSentiment} = this.props;
		let score = documentSentiment && documentSentiment.score;

		if(typeof(score) == "undefined") return null;

		score = +score.toFixed(2);

		return (
			<div className="group-feed-item-sentiment-chart">
				<h6 className="group-feed-item-sentiment-chart-title">Emotion</h6>
				<ChartGuage value={score} center={['50%', '25%']}/>
			</div>
		)

	}

	renderUserDetails(){
		let {user} = this.props;
		let userName = user && user.profile && user.profile.username;

		if(typeof(userName) == "undefined") return null;

		return <div className="group-feed-item-user-name">{userName}</div>

	}

	renderUserEmail(){
		let {user} = this.props;
		let email = user && user.email;

		if(typeof(email) == "undefined") return null; 

		return <div className="group-feed-item-user-email"><a href={"mailto:"+email}>{email}</a></div>

	}

	renderMessageDate(){
		let {createdAt} = this.props;

		if(typeof(createdAt) == "undefined") return null;

		let createdAtMoment = moment(createdAt);
		//.locale('en').format('LT'):createdAt

		return <div className="group-feed-item-user-date">{createdAtMoment.locale('en').format('LT YY MMM D')}</div>
	}

	renderMessage(){
			let {type, image, message, faces} = this.props;
			let faceBoxes = [];
			console.log( 'renderMessage');
			console.log( this.props);
			console.log( 'PROPS');

			if(type == "image"){

				if(faces){
					console.log('imageFaces');
					let index = 1;
					for(let key in faces){
						let face = faces[key];
						let bounds = face.bounds.face;
						let x = face.bounds.face[0].x;
						let y = face.bounds.face[0].y;
						let width  = face.bounds.face[1].x-x;
						let height = face.bounds.face[2].y-y;
						let rect = <rect x={x} y={y} width={width} height={height} style={{fill:'rgba(255,255,255,0)', strokeWidth:3, stroke:'rgba(255,255,255,0.8)'}} />
						let label = <text x={x} y={y+height+20} font-family="Verdana" font-size="40"  fill="#ffffff">{index}</text>
						faceBoxes.push(rect);
						faceBoxes.push(label);
						index++;
					}
				}

				console.log("RETURN IMAGE");
				console.log(faceBoxes);
				return (<div className="group-feed-item-image">
							<img src={image.url} alt="image" onLoad={this.handleImageLoaded.bind(this)} />
							<div className="group-feed-item-image-overlay">
								<svg
								    width="100%"
								    height="100%"
									style={{display:'block'}}
									xmlns="http://www.w3.org/2000/svg">
									{faceBoxes}
								</svg>
							</div>
						</div>);
			}else{
				return <div className="group-feed-item-message">{message}</div>
			}
	}

	handleImageLoaded(image){
		let imageRef = image.target;
		console.log('IMAGE REF HEIGHT', imageRef.height);
		let h = imageRef.naturalHeight;
		let w = imageRef.naturalWidth;
		let imageWrapEl = imageRef.parentElement.getElementsByClassName("group-feed-item-image-overlay");
		let imageOverlayEl = imageWrapEl[0];

		if(imageOverlayEl){
			console.log('imageOverlayEl', imageOverlayEl);
			let svgEl = imageOverlayEl.getElementsByTagName('svg')[0];
			svgEl.setAttribute("viewBox","0 0 " + w + " "+h);
		}

		//console.log('imageOverlayEl', imageOverlayEl.getElementsByTagName('svg'));

		// if(imageWrapEl[0].getElementsByTagName('svg').length > 0){
		// 	let svgEl = imageWrapEl.getElementsByTagName('svg')[0];
		// 	console.log('svgEl', svgEl);
		// }
	}

	renderAvatar(){
		let {user} = this.props;
		let avatarURL = user && user.profile && user.profile.avatar && user.profile.avatar.url;
		if(typeof(avatarURL)=='undefined') return null;

		return(
			<div>
				<Avatar
					src={ avatarURL }
					size={80}
					className="group-feed-item-avatar"
    			/>
			</div>
		)

	}
}

const styles = {
	imageWrapper:{
		// zIndex:20,
		// position:'absolute',
		// display:'inline-block',
		// backgroundColor:'red'
	}
}

export default GroupFeedItem

