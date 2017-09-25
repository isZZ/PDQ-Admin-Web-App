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
		let { groups, users, actions } = this.props;
		let {groupFetch} = actions;
		let groupsArray = [];
		for(let key in groups){
			groupsArray.push(groups[key]);
		}

		return (
			<div className='row'>
      			{groupsArray.map((props, index)=> {
					return (
						<div className={['medium-6', 'large-4', 'columns'].join(' ')} key={index}>
							<GroupCard key={index} {...props} actions={actions} />
						</div>
					)
  				})}
    		</div>
		)
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
