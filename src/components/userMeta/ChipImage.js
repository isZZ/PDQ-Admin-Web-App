import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import SvgIconCamera from 'material-ui/svg-icons/image/camera';
import * as Colors from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ImagePreloader from '../common/ImagePreloader';
import {Tabs, Tab} from 'material-ui/Tabs';

export class ChipImage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};

	}

	handleTouchTap(event){

		console.log(event.currentTarget);
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
		  open: true,
		  anchorEl: event.currentTarget,
		});
	};

	handleRequestClose(){
		this.setState({
		  open: false,
		});
	};

	render(){
		let{images, id} = this.props;

		let imageObjects = [];
		let imageContainer;
		for(let key in images){
			let imageObj = images[key];
			if(imageObj.image && imageObj.image.url){
				imageObjects.push(imageObj);
			}
		}

		if(imageObjects.length > 1){
			imageContainer = (
				<Tabs>
					{imageObjects.map((value, index)=>{
						return(
							<Tab label={index+1}>
								<ImagePreloader imageUrl={value.image.url} />
							</Tab>
						)
					})}
				</Tabs>
			)
		}else if(imageObjects.length == 1){
			{console.log('LESS THAN IMAGE CONTAINER')}
			imageContainer = (
				<ImagePreloader imageUrl={imageObjects[0].image.url} />
			)
		}


		return(
			<div>
				<Chip style={styles.chip} onTouchTap={this.handleTouchTap.bind(this)} backgroundColor={Colors.grey300}>
					<Avatar backgroundColor={Colors.grey400} color={Colors.grey300} icon={<SvgIconCamera />} />
					{id}
				</Chip>
				<Popover
					style={styles.popOver}
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={() => this.handleRequestClose()}>
						{imageContainer}
				</Popover>
			</div>
		);
	}

}

const styles = {
	loading:{},
	loadingIndicator:{
		position:'absolute',
		display:'block',
		top:'50%',
		left:'50%',
	},
	chip: {
		margin: 4,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom:'1rem'
	},
	card:{
		marginBottom:'2rem'
	},
	popOver:{
		minWidth:'400px'
	}
};

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChipImage);

