import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import Groups from '../groups/Groups';
import {GroupMenu} from '../groups/GroupMenu';
import {trackUsers, trackingTimeUpdate, trackingGroup, trackGroup, trackingTimeUsersUpdate} from '../../actions/trackingActions';
import {groupFetch, groupWatchGroup} from '../../actions/groupActions';
import {TrackingMap} from './TrackingMap';
import DateRange from '../common/DateRange';
import UserCard from '../common/UserCard';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import _ from 'underscore';
import SideNav from '../common/SideNav';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors'; 

var colorArr = [
Colors.deepPurple500,
Colors.red500,
Colors.blue500,
Colors.cyan500,
Colors.teal500,
Colors.green500,
Colors.lime500,
Colors.yellow500,
Colors.amber500,
Colors.orange500,
Colors.deepOrange500,
Colors.pink500,
Colors.purple500,
Colors.lightBlue500,
Colors.lightGreen500,
]

export class TrackingPage extends Component {

	constructor(props, context) {
		super(props, context);
		let{actions} = props;

		this.state = {
			defaultDate: new Date()
		};

		let timeStart = moment(new Date()).startOf('day').toDate();
		let timeEnd = moment(new Date()).endOf('day').toDate();

		console.log('OFFICIAL START TIME'+timeStart.getTime());

		actions.trackingTimeUpdate(timeStart, timeEnd);
		this.userClick = this.userClick.bind(this);
	}
	componentWillMount(){
		let {actions, group} = this.props;
		actions.trackGroup(group.id);
	}

	componentDidMount(){
		let {params, actions} = this.props;
		let groupId = params.groupId;
		//actions.trackingGroup(groupId);
		//actions.groupWatchGroup(groupId);
		//actions.trackUsers();
		//actions.groupWatchGroup(groupId);
		//let date = moment();
		//actions.trackGroup(groupId);
		//console.log(date.startOf('day').toDate());
		// let timeStart = moment().startOf('day').toDate();
		// let timeEnd = moment().endOf('day').toDate();
		// actions.trackingTimeUpdate({
		// 	timeStart: date.startOf('day').toDate(),
		// 	timeEnd: date.endOf('day').toDate()
		// })
		//let trackedUsers = actions.trackUsers();
		//let trackedUsers = actions.trackUsers();
		//console.log('trackedUsers');
		// console.log(trackedUsers);
	}

	componentWillReceiveProps(nextProps){
		// let {params, actions, group} = this.props;
		// console.log('NEXT GROUP USERS');
		// console.log(Object.keys(nextProps.group.users));
		// console.log('GROUP.USERS');
		// console.log(Object.keys(group.users));
		// if(!_.isEqual(nextProps.group.users, group.users)){
		// 	console.log('NOT EQUAL TO');
		// 	console.log(_.difference(nextProps.group.users, group.users));
		// 	actions.trackUsers();
		// }else{
		// 	console.log('IS EQUAL TO');
		// }

		//actions.groupWatchGroup(groupId);
		// if(){

		// }
		// console.log(nextProps);
		// console.log('trackedUsers');
		// console.log(trackedUsers);
	}

	userClick(id){

		console.log(id);
	}

	render(){
		let {params, actions, group, trackingData, date, timeStart, timeEnd, users, groups} = this.props;
		let groupArray = [];
		let groupId = params.groupId;
		let groupUsers = group.users;

		for(let key in groupUsers){
			if(users[key]){
				let user = users[key];
				user.id = key;
				groupArray.push(user);
			}
		}

		console.log('GROUP ARRAY', groupArray);

		return (
			<div>
				<div className="row expanded full-width-header">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-12 columns">
								<div className='pageDesc'>
									<h2>Group Tracking</h2>
									<p>Tracking data from the PDQ application</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row expanded user-meta-content">
					<div className="large-2 columns">
						<SideNav />
					</div>
					<div className="large-8 columns">
						<Paper>
							<DateRange
								timestampChange={actions.trackingTimeUsersUpdate} 
								date={date}
								timeStart={timeStart}
								timeEnd={timeEnd}
								defaultDate={this.state.defaultDate}
							/>
							<TrackingMap trackingData={trackingData} users={users} group={group} colors={colorArr} />
						</Paper>
					</div>
					<div className="large-2 columns">
						<Paper>
							<List>
								<Subheader>Group</Subheader>
								{groupArray.map((cardProps, i)=>{
									return <UserCard key={cardProps.id} {...cardProps} onClick={this.userClick} highlightColor={colorArr[i]} />
								})}
							</List>
						</Paper>
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state, ownProps) {
		
	return {
		group:state.group.group,
		groups:state.groups,
		trackingData:state.tracking.trackingData,
		date:state.tracking.date,
		timeStart:state.tracking.timeStart,
		timeEnd:state.tracking.timeEnd,
		users:state.users.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({groupFetch, groupWatchGroup, trackUsers, trackingTimeUpdate, trackingGroup, trackGroup, trackingTimeUsersUpdate}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);