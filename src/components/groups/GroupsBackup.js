import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import GroupCard from './GroupCard'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import moment from 'moment';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Groups extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleFetchGroup = this.handleFetchGroup.bind(this);
		//this.updateUserState = this.updateUserState.bind(this);
		//this.createUser = this.createUser.bind(this);
	}

	componentWillMount(){
		console.log('GROUPS PROPS');
		console.log(this.props);
	}

	componentDidMount(){
		//console.log('GROUPS PROPS'+this.props)
	}

	handleFetchGroup(id){
		console.log('handleFetchGroup'+id);
	}
	render() {
		let props = this.props;
		let { groups, users, actions } = props;
		let {groupFetch} = actions;
		return (
			<Paper>
				<Table displaySelectAll={false} >
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Group Name</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
							<TableHeaderColumn>No Users</TableHeaderColumn>
							<TableHeaderColumn>Created at</TableHeaderColumn>
							<TableHeaderColumn></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{Object.keys(groups).map(function( key ) {
							let group = groups[key];
							let { createdAt, users, name, description } = group;
							console.log('createdAt');
							console.log(createdAt);
							let dateMoment = moment.unix(createdAt);
							let time = (dateMoment.isSame(moment(), 'day'))?dateMoment.format('HH:mm'):dateMoment.format('MM-DD-YYYY');
							let date = dateFormat(createdAt, 'd/mm/yy');
							let userCount = Object.keys(users).length;
							console.log(createdAt);
							return (
								<TableRow key={key}>
									<TableRowColumn>{key}</TableRowColumn>
									<TableRowColumn>{name}</TableRowColumn>
									<TableRowColumn>{description}</TableRowColumn>
									<TableRowColumn>{userCount}</TableRowColumn>
									<TableRowColumn>{time}</TableRowColumn>
									<TableRowColumn style={{textAlign:'right'}}>
										<RowMenu
											onFetchGroup = {() => this.handleFetchGroup(key)} />
									</TableRowColumn>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Paper>	
		);
	}
}

const RowMenu = (props) => {
	let {onFetchGroup} = props; 
	return(
		<IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem primaryText="Add users" />
				<MenuItem primaryText="Set as active group" onTouchTap={onFetchGroup()} />
		</IconMenu>
	);
};

export default Groups;
