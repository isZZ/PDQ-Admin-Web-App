import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Link} from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
//import LoginLink from './LoginLink'
//import LogoutLink from './LogoutLink'

const TopNav = (props) => {

	let loggedMenu = null;
	let logButton = null;
	let {isLogged, groups, groupFetch, selectedGroupId, location, signOut} = props;
	console.log('LOCATION PATH NAME', location);

	let groupsArr = [];
	console.log('TopNavGroups', groups);
	if(groups.groups){
		for(let key in groups.groups){
			let cGroup = groups.groups[key];
			cGroup.ID = key;
			groupsArr.push(cGroup);
		};
	}

	if(isLogged && location.pathname !== '/admin'){
		loggedMenu = <GroupMenu groups={groupsArr} groupFetch={groupFetch} selectedGroupId={selectedGroupId} />;
	}

	if(isLogged){
		logButton = <Logged {...props} />;
	}else{
		logButton = <Login />;
	}

	return(
		<Toolbar style={styles.toolBar}>
			<ToolbarGroup firstChild={true}>
				<svg style={styles.logo} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style={{height:'35px', marginRight:'5px'}} viewBox="0 0 400 400"  xmlSpace="preserve">
					<defs>
						<filter id="f4">
							<feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
							<feOffset result="offOut"  dx="20" dy="20" />
							<feComponentTransfer>
							<feFuncA type="linear" slope="0.1"/>
							</feComponentTransfer>
							<feMerge>
							<feMergeNode/>
							<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
						<filter id="f3">
							<feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
							<feOffset dx="8" dy="8"/>
							<feComponentTransfer>
							<feFuncA type="linear" slope="0.1"/>
							</feComponentTransfer>
							<feMerge>
							<feMergeNode/>
							<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
					</defs>
				<path style={{fill:'#03A9F4'}} filter="url(#f4)" d="M313,308.9c28.2-28.9,45.7-68.3,45.7-111.8c0-44.1-17.9-84.1-46.9-113.1c-29-29-69-46.9-113.1-46.9
				c-88.2,0-160,71.8-160,160s71.8,160,160,160c17.4,0,34.1-2.8,49.7-7.9l71.9,16.6L313,308.9z M99.1,197.1
				c0-54.9,44.7-99.6,99.6-99.6c54.9,0,99.6,44.7,99.6,99.6c0,54.9-44.7,99.6-99.6,99.6C143.8,296.7,99.1,252,99.1,197.1z"/>
				<path style={{fill:'#B3E5FC'}} filter="url(#f3)" d="M38.8,197.1c0,44.1,17.9,84.1,46.9,113.1l42.6-42.6c-18-18-29.2-43-29.2-70.4
				c0-54.9,44.7-99.6,99.6-99.6c27.5,0,52.4,11.2,70.4,29.2L311.8,84c-29-29-69-46.9-113.1-46.9C110.5,37.1,38.8,108.9,38.8,197.1z"/>
				</svg>
				<ToolbarTitle text="PDQ" style={{color:'#ffffff', fontSize:'26px', fontFamily: "'Lato', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif"}} />
				{loggedMenu}
			</ToolbarGroup>
			<ToolbarGroup>
				{logButton}
			</ToolbarGroup>
		</Toolbar>
	)
};

class Login extends Component {
	render() {
		return (
			<Link to="/login">
				<FlatButton {...this.props} label="Login" style={styles.signinButton} />
			</Link>
		);
	}
}

const Logged = (props) => (
	<IconMenu
		iconStyle={{color:'#ffffff'}}
		{...props}
		iconButtonElement={
			<IconButton><MoreVertIcon /></IconButton>
		}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>

		<MenuItem primaryText="Sign out" onTouchTap={()=>{props.signOut()}} />
	</IconMenu>
);

const GroupMenu = (props) => {
	let {groups, groupFetch, selectedGroupId} = props;

	console.log('selectedGroupId', selectedGroupId);

	return(
		<DropDownMenu
			value={selectedGroupId}
			underlineStyle={{
				borderTop: 'solid 1px transparent',
				bottom: 1,
				left: 0,
				right: 0,
				position: 'absolute'
			}}
			labelStyle={{color:'#fff', textShadow: '2px 1px rgba(0,0,0, 0.1)', fontWeight:'400'}}
			style={{height: '56px'}}
			onChange={(event, key, value)=>{
				if(typeof(value)=='string'){
					console.log('typeof');
					console.log(value);
					groupFetch(value);	
				}else{
					console.log('test');
				}	
			}}
			/*selectedMenuItemStyle={{color:'#fff'}}
			menuStyle={{color:'#fff'}}
			menuItemStyle={{color:'#fff'}}
			iconStyle={{color:'#fff'}}
			listStyle={{color:'#fff'}}
			labelStyle={{color:'#fff'}}
			style={{color:'#fff'}}*/>
			<MenuItem value={null} label="Create Group" primaryText="Create Group" />
			<Divider />
			<Subheader>Groups</Subheader>
			{groups.map((itemProps, index) => {
				return <MenuItem key={itemProps['ID']} value={itemProps['ID']} label={itemProps.name} primaryText={itemProps.name} />
			})}
		</DropDownMenu>
	);
};

TopNav.contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
}

let styles = {
	toolBar:{
		backgroundColor: Colors.blue500,
		paddingLeft:'50px'
	},
	signinButton:{
		color:'#ffffff'
	}
}

export default TopNav;



