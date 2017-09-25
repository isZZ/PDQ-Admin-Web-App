import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SvgIconErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import * as Colors from 'material-ui/styles/colors';
 
class ImagePreloader extends Component {
	constructor(props) {
		super(props);
		this.state = { imageStautus:'loading' }
	}
 
	handleImageLoaded() {
		this.setState({ imageStautus:'loaded' });
	} 
 
	handleImageErrored(event) {
		this.setState({ imageStatus: 'error' });
		console.log('EVENT TARGET', event.target.style);
	}
 
	render() {
		
		let imageLoading;

		if(this.state.imageStatus == 'loading'){
			imageLoading = <LoadingIndicator />
		}else if(this.state.imageStatus == 'error'){
			imageLoading = <SvgIconErrorOutline style={styles.errorIcon} color={Colors.grey300} />
		}

		return (
			<div className="user-meta-card-image-outer">
				{imageLoading}
				<div className="user-meta-card-image-inner">
					<img
						className="user-meta-image-src"
						style={Object.assign({},
							this.state.imageStatus == 'error' && styles.error)
						}
						src={this.props.imageUrl}
						onLoad={this.handleImageLoaded.bind(this)}
						onError={this.handleImageErrored.bind(this)}
					/>
				</div>
			</div>
		);
	}

}

export default ImagePreloader;

const LoadingIndicator = () => (
	<div style={styles.loadingIndicator}>
		<CircularProgress size={50} thickness={6} style={styles.loading} />
	</div>
);

const styles = {
	error:{
		display:'none',
	},
	errorIcon:{
		position:'absolute',
		top:'50%',
		left:'50%',
		height:'40px',
		width:'40px',
		transform:'translate(-50%, -50%)'
	},
	loading:{},
	loadingIndicator:{
		position:'absolute',
		display:'block',
		top:'50%',
		left:'50%',
		marginLeft:'-25px',
		marginTop:'-25px'
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
	}
};

// <div className="user-meta-card-image-outer">
// 	<LoadingIndicator />
// 	<div className="user-meta-card-image-inner">
// 		<img className="user-meta-image-src" src="https://firebasestorage.googleapis.com/v0/b/socialspy-a69db.appspot.com/o/users%2FGwcXSWk7TqTjNA3KanR9DStzDaZ2%2F8df0a320-2a69-11e7-9556-d5d1a009200d%2Fimage-79c50880-6c45-43b2-a044-befe1d2a24bf1612032239.jpeg?alt=media&token=0234106d-4f6a-4c94-b329-09fc530ed943" alt='image' />
// 	</div>
// </div>