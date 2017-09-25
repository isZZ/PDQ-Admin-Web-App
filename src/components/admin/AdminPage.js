import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import Groups from '../groups/Groups';
import {groupsFetch} from '../../actions/groupsActions';
import {groupFetch, groupGoToGroup} from '../../actions/groupActions';
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
import {ChartGuage} from './../common/ChartGuage';
import Subheader from 'material-ui/Subheader';

export class AdminPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	componentWillMount(){
		console.log('MOUNTING ADMIN');
		let groupsListener = this.props.actions.groupsFetch();
		console.log(groupsListener);
	}

	render(){
		let props = this.props;
		return (
			<div>
				<div className="row expanded full-width-header">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-12 columns">
								<div className='pageDesc'>
									<h2>Welcome to PDQ Dashboard</h2>
									<p>Select a group below to watch meta data creation or create a group here.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="large-12 columns group-list">
						<Subheader>Your Groups</Subheader>
						<Groups {...props} />
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
		users: state.users.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({groupsFetch, groupFetch, groupGoToGroup}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

