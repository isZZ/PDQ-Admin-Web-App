import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Router, Link} from 'react-router';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconDeviceLocationSearching from 'material-ui/svg-icons/device/location-searching';
import IconActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import IconSocialGroup from 'material-ui/svg-icons/social/group';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import * as Colors from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import {groupFetch} from '../../actions/groupActions';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class SideNav extends Component {

	constructor(props, context) {
      super(props, context);
      console.log('CONTEXT', context);
      this.handleTouch = this.handleTouch.bind(this)
    }

	handleTouch(key){
		console.log('TOUCH TAP EVENT', event);
		// console.log('CONTEXT');
		// console.log(typeof(this.context.router));
		this.context.router.push(key)
		// //this.context.router.transitionTo(value);
	}

	render(){
		let {groups, group} = this.props;
		let currentGroupId = (typeof(group)==='object')?group.id:false;
		return (
			<Paper>
				<List>
					<Subheader>Sections</Subheader>
					<ListItem
						primaryText="User Meta"
						leftIcon={<IconActionFingerprint />}
						onTouchTap={
							()=>{
								this.handleTouch('userMeta');
							}
						}
					/>
					<ListItem
						primaryText="Group Feed"
						leftIcon={<IconSocialGroup />}
						onTouchTap={
							()=>{
								this.handleTouch('groupFeed');
							}
						}
					/>
					<ListItem
						primaryText="Tracking"
						leftIcon={<IconDeviceLocationSearching />}
						onTouchTap={
							()=>{
								this.handleTouch('trackingPage');
							}
						}
					/>
				</List>
			</Paper>
		);
	}
}

const GroupSelector = (props) => {

	let {groups, onChange, currentGroupId} = props;

	console.log(currentGroupId);

	return(
		<SelectField
			floatingLabelText="Current Group"
			autoWidth={true}
			value={currentGroupId}
			onChange={onChange}
		>
			{groups.map((group)=>{
				return <MenuItem primaryText={group.name} value={group.id} />
			})}

		</SelectField>
	)
}

function mapStateToProps(state, ownProps) {

	let groupsObj = state.groups.groups;
	let groups = [];

	for(let key in groupsObj){
		let group = groupsObj[key];
		group.id = key;
		groups.push(group);
	}

	console.log('state.group.group');
	console.log(state.group.group);

	return {
		groups,
		group:state.group.group || false
	};
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({groupFetch}, dispatch)};
}

SideNav.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);