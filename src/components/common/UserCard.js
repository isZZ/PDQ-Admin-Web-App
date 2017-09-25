import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export class UserCard extends Component {

	constructor(props){
		super(props);
		let{actions} = props;
		this.state = {
			style:{
				backgroundColor:'blue'
			}
		};

		this.listClick = this.listClick.bind(this);
	}

	listClick(){
		let {onClick, id} = this.props;
		onClick(id);
		console.log("LIST CLICK", this.props);
	}
	
	render(){
		console.log('USERSSS PROPS');
		console.log(this.props);
		let {name, src, profile, userClick, id, highlightColor} = this.props;
		let {avatar, username, color} = profile;
		console.log('avatar', avatar)
		console.log('highlightColor', highlightColor)
		return(
			<ListItem
				primaryText={username}
				leftAvatar={
					<Avatar 
						src={avatar.url}
						style={{
							borderColor: highlightColor,
							borderWidth: 2,
							borderStyle: 'solid'
						}}
					/>
				}
				onTouchTap={()=>{
					this.listClick();
				}}
      		/>
		);
	}

}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
