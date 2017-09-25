import React, {Component} from 'react'
import dateFormat from 'dateformat';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import * as Colors from 'material-ui/styles/colors';

class GroupCard extends Component{

	constructor(props){
		super(props);
	}

	render(){
		let { ID:groupId, createdAt, users, name, description } = this.props;
		let date = dateFormat(createdAt, 'd/mm/yy');
		console.log('groupId', groupId);
		console.log(this.props);
		return(
			<Paper zDepth={1}>
				<Card>
					<CardTitle style={styles.cardTitle} title={name} subtitle={date} />
					<Divider />
					<CardText style={styles.cardDescription}>
						{description}
					</CardText>
					<Divider />
					<CardActions>
						<FlatButton label="View" onTouchTap={this.clickView.bind(this, groupId)} />
					</CardActions>
				</Card>
			</Paper>
		)
	}

	clickView(groupId){
		let {actions} = this.props;
		let {groupGoToGroup} = actions;
		groupGoToGroup(groupId);
	}
}

let styles = {
	cardTitle:{
		
	},
	cardDescription:{
		minHeight:'100px'
	}
}

export default GroupCard;