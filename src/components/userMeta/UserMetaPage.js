import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import Groups from '../groups/Groups';
import {groupsFetch} from '../../actions/groupsActions';
import {groupFetch} from '../../actions/groupActions';
import SideNav from '../common/SideNav';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import {usersMetaFetch} from '../../actions/userMetaActions';
import UserMetaCard from './UserMetaCard'


export class AdminPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	componentWillMount(){
		let {actions} = this.props;
		actions.groupsFetch();
		actions.usersMetaFetch();
	}

	componentWillReceiveProps(nextProps){
		let {group, actions} = this.props;

		console.log('NEXT PROPS GROUP');
		console.log(nextProps);
		console.log(nextProps.group.group);

		if(nextProps.group.users !== group.users){
			actions.usersMetaFetch();
		}
		// console.log(nextProps);
		// if(typeof(nextProps.group.group) !== 'undefined' && typeof(nextProps.group.group.users) !== 'undefined'){
		// 	console.log('Fetch user meta');
		//_.isEqual(object, other)
		// }
	}

	render(){
		let {group, groups, userMeta, users} = this.props;
		let userMetaArray = [];
		let groupUsers = group.users;
		let usersObjArr = [];

		if(typeof(groupUsers) == 'object'){
			for(let key in groupUsers){
				let obj = {
					id:key
				};
				obj.userMeta = (typeof(userMeta[key])=='object')?userMeta[key]:null;
				obj.userProfile = (typeof(users[key])=='object')?users[key]:null;
				usersObjArr.push(obj);	
			}
		}
		
		return (
			<div>
				<div className="row expanded full-width-header">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-12 columns">
								<div className='pageDesc'>
									<h2>User Data Profile</h2>
									<p>Entities created from natural language processing, image recognition and GPS data tracking libraries</p>
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
						{usersObjArr.map((props)=><UserMetaCard {...props}  />)}
					</div>
				</div>
			</div>
		);
	}

}

AdminPage.propTypes = {
  actions: React.PropTypes.object
};


function mapStateToProps(state, ownProps) {
	return {
		groups: state.groups.groups,
		group: state.group.group,
		users: state.users.users,
		userMeta: state.userMeta.userMeta
	};
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({groupsFetch, groupFetch, usersMetaFetch}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);