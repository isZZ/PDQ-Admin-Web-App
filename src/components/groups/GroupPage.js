import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import {Groups} from '../groups/Groups';
import {GroupMenu} from '../groups/GroupMenu';
import {groupsFetch} from '../../actions/groupActions';

export class GroupPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	componentWillMount(){
		let groupId = this.props.params.groupId;
	}

	render(){
		let props = this.props;
		let groupId = this.props.params.groupId;
		console.log(this.props.params)
		return (
			<div>
				<div className="row">
					<div className="large-12 columns">
						<div className='pageDesc'>
							<h4>Your Groups</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum leo vitae est molestie imperdiet. Cras dictum felis dui, eget vehicula urna porttitor non. Pellentesque et euismod lectus. Donec ut odio quis purus volutpat fringilla.</p>
						</div>
					</div>
				</div>
				<div className="row">
					
				</div>
			</div>
		);
	}

}

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);