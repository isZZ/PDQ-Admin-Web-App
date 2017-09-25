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
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export class ChipPlace extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};

		//this.gmap = this.gmap.bind(this);

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
		let{name, id, place_id, icon, latitude, longitude, rating, reference, types, scope} = this.props;
		let map = this.gmap(latitude, longitude, 18, place_id);

		return(
			<div>
				<Chip style={styles.chip} onTouchTap={this.handleTouchTap.bind(this)} backgroundColor={Colors.grey300}>
					<Avatar backgroundColor={Colors.grey400} color={Colors.grey300} icon={<SvgIconCamera />} />
					{name}
				</Chip>
				<Popover
					style={styles.popOver}
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={() => this.handleRequestClose()}>
						<div className="user-meta-card-place-map">
							{map}
						</div>
				</Popover>
			</div>
		);
	}

	gmap(lat, lng, zoom, place){
		return(
			<section style={{height: "100%"}}>
				<GoogleMapLoader
					containerElement={
						<div style={{height: "100%"}} />
					}
					googleMapElement={
						<GoogleMap
							ref={ this.onGoogleMapLoad }
							defaultZoom={zoom}
							defaultCenter={{lat, lng}}
						>
								<Marker
									//place={place}
									position={{lat, lng}}										
								// onClick={_.noop}
								// onRightClick={_.noop}
								// onDragStart={_.noop}
							/>
						</GoogleMap>
					}
				>
				</GoogleMapLoader>
			</section>
		);
	}

}

const styles = {
	loading:{},
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

export default connect(mapStateToProps, mapDispatchToProps)(ChipPlace);

