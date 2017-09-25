import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Router, Link} from 'react-router';
import GroupFeedItem from './GroupFeedItem';
import Paper from 'material-ui/Paper';

class GroupFeed extends Component {
	
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		let {feedItems, users} = this.props;
		let feedItemswithUsers = [];

		for(let key in feedItems){
			let item = feedItems[key];
			console.log('ITEM',item);
			let UID = item.UID;

			if(users[UID]){
				item.user = users[UID];
			}

			feedItemswithUsers.push(item);

		}

		return(
			<div>
				{feedItemswithUsers.map((value, index)=><GroupFeedItem {...value} key={index} />)};
			</div>
		)
	}

}

export default GroupFeed

