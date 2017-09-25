import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Router, Link} from 'react-router';
import GroupFeed from './GroupFeed';
import SideNav from '../common/SideNav';
import {groupFeedFetch, groupFeedReset} from '../../actions/groupFeedActions';

class GroupFeedPage extends Component {
	
	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillMount(){
		let {actions, group} = this.props;
		console.log('GROUP FEED PAGE PROPS');
		console.log(this.props);
		if(group.id){
			actions.groupFeedFetch(group.id);
		}
	}

	componentWillReceiveProps(nextProps){
		let {group, actions} = this.props;

		if(nextProps.group.id !== group.id){
			console.log('GROUP ID CHANGED', group.id);
			actions.groupFeedReset();
			actions.groupFeedFetch(nextProps.group.id);
		}
	}

	render(){
		let props = this.props
		return(
			<div>
				<div className="row expanded full-width-header">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-12 columns">
								<div className='pageDesc'>
									<h2>Group Feed</h2>
									<p>A realtime feed of the groups messages and user profile data creation.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row expanded user-meta-content">
					<div className="large-3 columns">
						<SideNav />
					</div>
					<div className="large-9 columns">
						<GroupFeed {...props} />
					</div>
				</div>
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {

	let feedItemsArray = [];
	let feedItems = state.groupFeed.feedItems;
	let feedItemsById = state.groupFeed.feedItemsById;
	let feedItemsReversed = feedItems.slice().reverse();

	for(let key in feedItemsReversed){
		let itemKey = feedItemsReversed[key];
		if(itemKey)
			feedItemsArray.push(feedItemsById[itemKey]);
	}

	return {
		group: state.group.group,
		groupFeed:state.groupFeed,
		feedItems:feedItemsArray,
		users:state.users.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({groupFeedFetch, groupFeedReset}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupFeedPage); 

