import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import SvgIconCamera from 'material-ui/svg-icons/image/camera';
import * as Colors from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import SvgIconCommunicationChatBubble from 'material-ui/svg-icons/communication/chat';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import {ChartGuage} from '../common/ChartGuage';

export class ChipLanguage extends Component{

	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};

		//this.gmap = this.gmap.bind(this);

	}

	handleTouchTap(event){

		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose(){
		this.setState({
			open: false,
		});
	};

	render(){
		//let{name, id, place_id, icon, latitude, longitude, rating, reference, types, scope} = this.props;
		let{id, textObjects} = this.props;
		let textArray = [];
		let textContainer;

		for(let key in textObjects){
			textArray.push(textObjects[key]);
		}

		if(textArray.length > 1){
			textContainer = (
				<Tabs>
					{textArray.map((value, index)=>{
						return(
							<Tab label={index+1} key={index}>
								{this.renderTextObject(value)}
							</Tab>
						)
					})}
				</Tabs>
			)
		}else{
			textContainer = this.renderTextObject(textArray[0]);
		}

		return(
			<div>
				<Chip style={styles.chip} onTouchTap={this.handleTouchTap.bind(this)} backgroundColor={Colors.grey300}>
					<Avatar backgroundColor={Colors.grey400} color={Colors.grey300} icon={<SvgIconCommunicationChatBubble />} />
					{id}
				</Chip>
				<Popover
					style={styles.popOver}
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={() => this.handleRequestClose()}>
					{textContainer}
				</Popover>
			</div>
		);
	}

	renderTextObject(textObject){

		console.log('textObject', textObject);

		let {message, name, salience, score, metadata} = textObject;
		let newName = name;
		let newMessage = message;
		let wikipediaURL

		if(metadata && metadata.wikipedia_url){
			wikipediaURL = metadata.wikipedia_url;
		}

		if(newName && newMessage){
			// console.log('name', newName);
			// //var messageItem = this.HighlightName(newName, message);
			// console.log('RENEDERED MESSAGE ITEM', messageItem)
			// console.log(messageItem)
		}



		return(
			<div>
				<List>
					<Subheader>Natural Language</Subheader>
					<HighlightName name={name} message={message} />
					<WikipediaLink wikipediaURL={wikipediaURL} />
					<SentimentChart score={score} />
				</List>
				<Divider />
			</div>
		)
	}

	// renderWikipediaLink(reference){
	// if(typeof(reference)!=='string') return;
	// 	return(
			
	// 	)
	// }

}

const SentimentChart = ({score}) => {

		if(typeof(score) == 'undefined')
			return null;

		let roundedScore = Number((score).toFixed(2));

		return (
			<div>
			<Divider />
				<ListItem
					primaryText="Sentiment"
					secondaryText={
						<p>A measure guage determining the positive or negative userage of a word in a chat message.</p>
					}
					disabled={true}
				/>
				<div style={{width:"400px; margin:0 auto"}}>
					<ChartGuage value={roundedScore} center={['50%', '100%']} />
				</div>
			</div>
		)
}





const HighlightName = ({name, message}) => {

		if(!name || !message)
			return null;
		
		let re = new RegExp(name,"g");
		message = message.replace(re, "<span class='user-meta-card-language-highlight'>"+name+"</span>");
		return (
			<div>
				<Divider />
				<ListItem
					primaryText="Message"
					secondaryText={<div className="content" dangerouslySetInnerHTML={{__html: message }} />}
					secondaryTextLines={2}
					disabled={true}
				/>
			</div>
	)
}

const WikipediaLink = ({ wikipediaURL }) => {
	if(!wikipediaURL)
		return null;
  	return(
		<div>
			<Divider />
			<ListItem
				primaryText="Wikipedia Reference"
				secondaryText={
					<a href={wikipediaURL}>{wikipediaURL}</a>
				}
				disabled={true}
			/>
			<Divider />
		</div>
  	)

};

const styles = {
	loading:{},
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
	},
	popOver:{
		minWidth:'400px'
	}
};

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChipLanguage);

