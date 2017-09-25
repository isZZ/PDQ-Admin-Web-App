import React, {Component} from 'react';
import MainHeader from './common/MainHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';
import {Grid} from 'semantic-ui-react';
import TopNav from './common/TopNav';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {groupsFetch} from '../actions/groupsActions';
import {groupFetch} from '../actions/groupActions';
import {groupFeedFetch} from '../actions/groupFeedActions'

class Layout extends Component{

	constructor(props, context) {
		super(props, context);
		this.state = {open: false};
	}

	componentDidMount(){
		let {groupsFetch} = this.props;
	}

	componentWillReceiveProps(nextProps){
		if (this.props.auth.isLogged !== nextProps.auth.isLogged) {
			// Do something unrelated to this component, e.g. Event tracking
			groupsFetch();
		}
	}

	render() {
		const {auth, actions, loading, user, groups, group, selectedGroupId, location} = this.props;

		console.log('LAYOUT PROPS', this.props);
		return (
			<div>
				<Drawer open={this.state.open} zDepth={2}>
					<MenuItem>Menu Item</MenuItem>
					<MenuItem>Menu Item 2</MenuItem>
				</Drawer>
				<TopNav isLogged={auth.isLogged} auth={auth} loading={loading} user={user} group={group} selectedGroupId={selectedGroupId} groups={groups} groupFetch={actions.groupFetch} location={location} signOut={actions.signOut} />
				{this.props.children}
			</div>
		);
	}
}

Layout.contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
}

Layout.propTypes =  {
	children: React.PropTypes.object,
	actions: React.PropTypes.object.isRequired,
	auth: React.PropTypes.object.isRequired,
	user: React.PropTypes.object.isRequired,
	group: React.PropTypes.object.isRequired,
	groups: React.PropTypes.object.isRequired,
	loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {

	let selectedGroupId = false;
	console.log('STATE GROUP GROUP',state.group);
	if(state.group.group){
		selectedGroupId = state.group.group.id
	}else if(state.groups.groups){
		let keys = Object.keys(state.groups.groups);
		selectedGroupId = keys[0];
	}

	return {
		auth: state.auth,
		user: state.user,
		loading: state.ajaxCallsInProgress > 0,
		groups: state.groups,
		group:state.group,
		selectedGroupId:selectedGroupId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({signOut, groupsFetch, groupFetch, groupFeedFetch}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


