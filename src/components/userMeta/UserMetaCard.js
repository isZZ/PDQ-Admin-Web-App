import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import * as Colors from 'material-ui/styles/colors';
import _ from 'lodash';
import Popover from 'material-ui/Popover/Popover';
import ChipImage from './ChipImage'
import ChipPlace from './ChipPlace'
import ChipLanguage from './ChipLanguage'

export class UserMetaCard extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			expanded: false
		};
	}

	handleExpandChange (expanded){
		this.setState({expanded: expanded});
	};

	handleToggle(event, toggle){
		this.setState({expanded: toggle});
	};

	handleExpand(){
		this.setState({expanded: true});
	};

	handleReduce(){
		this.setState({expanded: false});
	};

	componentWillMount(){
		
	}

	componentWillReceiveProps(nextProps){
		
	}

	render(){
		let {userMeta, userProfile} = this.props;
		let avatar, email, username;
		if(userMeta){
			let {userImage, userLanguage, userPlaces} = userMeta;
		}

		if(userProfile){
			console.log('userProfile');
			console.log(userProfile);
			let {profile} = userProfile;
			avatar = profile.avatar.url;
			username = profile.username;
			email = userProfile.email;

		}

		return(
			<Card style={styles.card} expanded={this.state.expanded} onExpandChange={(data)=>this.handleExpandChange(data)}>
				<CardHeader
					title={username}
					subtitle={email}
					avatar={avatar}
					actAsExpander={true}
					showExpandableButton={true}
    			/>
    			<CardText>
		          <Toggle
		            toggled={this.state.expanded}
		            onToggle={(event, toggle)=>this.handleToggle(event, toggle)}
		            labelPosition="right"
		            label="Expand to see user data"
		          />
		        </CardText>
				<CardTitle title="User Images" subtitle="Data generated from images uploaded to PDQ chat" expandable={true} />
				<CardText expandable={true}>
					{this.renderUserImage()}
				</CardText>
				<Divider />
				<CardTitle title="User Language" subtitle="Data generated from chat messages in PDQ Chat" expandable={true} />
				<CardText expandable={true}>
					{this.renderUserLanguage()}
				</CardText>
				<Divider />
				<CardTitle title="User Places" subtitle="Data generated from GPS data sent from PDQ Chat" expandable={true} />
				<CardText expandable={true}>
					{this.renderUserPlaces()}
				</CardText>
			</Card>
		)
	}

	renderUserImage(){
		let {userMeta} = this.props;
		let userImage = (userMeta)?userMeta.userImage:false;
		let userImageView;

		if(userImage){
			userImageView = Object.keys(userImage).map((key, images)=>{
				let keyName = _.replace(key, '_', ' ');
				return <div className="user-meta-card"><h6 className="user-meta-card-label" key={key}>{keyName}</h6><div style={styles.wrapper}>{this.renderImageChips(userImage[key])}</div></div>
			});
		}else{
			return <div className="user-meta-card"><span className="user-meta-card-no-data">(no data)</span></div>
		}

		console.log(userImageView);

		return userImageView;
	}

	renderImageChips(images){
		let imageChips = Object.keys(images).map((key, image)=>{
			let imageProps = images[key];

			return <ChipImage images={imageProps} key={key} id={key} />
		});

		return imageChips;

	}

	renderUserLanguage(){
		let {userMeta} = this.props;
		let userLanguage = (userMeta)?userMeta.userLanguage:false;
		let userLanguageView;

		if(userLanguage){
			userLanguageView = Object.keys(userLanguage).map((key, images)=>{
				let keyName = _.replace(key, '_', ' ');
				return <div className="user-meta-card"><h6 className="user-meta-card-label" key={key}>{keyName}</h6><div style={styles.wrapper}>{this.renderLanguageChips(userLanguage[key])}</div></div>
			});
		}else{
			return <div className="user-meta-card"><span className="user-meta-card-no-data">(no data)</span></div>
		}

		return userLanguageView;
	}

	renderLanguageChips(language){
		let languageChips = Object.keys(language).map((key, index)=>{
			let languageProps = language[key];
			return <ChipLanguage textObjects={languageProps} key={key} id={key} />
		});

		return languageChips;
	}

	renderUserPlaces(){
		let {userMeta} = this.props;
		let userPlaces = (userMeta)?userMeta.userPlaces:false;
		let userPlacesView;

		if(userPlaces){
			userPlacesView = Object.keys(userPlaces).map((key, locations)=>{
				let keyName = _.replace(key, '_', ' ');
				return <div className="user-meta-card"><h6 className="user-meta-card-label" key={key}>{keyName}</h6><div style={styles.wrapper}>{this.renderPlacesChips(userPlaces[key])}</div></div>
			});
		}else{
			return <div className="user-meta-card"><span className="user-meta-card-no-data">(no data)</span></div>
		}

		return userPlacesView;
	}

	renderPlacesChips(place){
		let placeChips = Object.keys(place).map((key, location)=>{
			let placeProps = place[key];
			return <ChipPlace {...placeProps} key={key} id={key} />
		});

		return placeChips;
	}

	handleImageChipTouch(){
		console.log('touched image chip');
	}

}

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom:'1rem'
  },
  card:{
  	marginBottom:'2rem'
  }
};

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMetaCard);