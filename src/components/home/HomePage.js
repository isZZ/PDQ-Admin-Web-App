import React, {Stylesheet} from 'react';
import {Link} from 'react-router';
import TopNav from './../common/TopNav';
import Radium from 'radium';
import color from 'color';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const HomePage = () => {
  return (
	<div style={styles.jumbotron}>
		<div style={styles.logoWrapper}>
			<svg style={styles.logo} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400"  xmlSpace="preserve">
				<defs>
					<filter id="f4">
						<feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
						<feOffset dx="4" dy="4"/>
						<feComponentTransfer>
						<feFuncA type="linear" slope="0.1"/>
						</feComponentTransfer>
						<feMerge> 
							<feMergeNode/>
							<feMergeNode in="SourceGraphic"/> 
						</feMerge>
					</filter>
					<filter id="f3">
						<feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
						<feOffset dx="8" dy="8"/>
						<feComponentTransfer>
						<feFuncA type="linear" slope="0.1"/>
						</feComponentTransfer>
						<feMerge> 
							<feMergeNode/>
							<feMergeNode in="SourceGraphic"/> 
						</feMerge>
					</filter>
				</defs>
				<path style={{fill:'#03A9F4'}} filter="url(#f4)" d="M313,308.9c28.2-28.9,45.7-68.3,45.7-111.8c0-44.1-17.9-84.1-46.9-113.1c-29-29-69-46.9-113.1-46.9
							c-88.2,0-160,71.8-160,160s71.8,160,160,160c17.4,0,34.1-2.8,49.7-7.9l71.9,16.6L313,308.9z M99.1,197.1
							c0-54.9,44.7-99.6,99.6-99.6c54.9,0,99.6,44.7,99.6,99.6c0,54.9-44.7,99.6-99.6,99.6C143.8,296.7,99.1,252,99.1,197.1z"/>
				<path style={{fill:'#B3E5FC'}} filter="url(#f3)" d="M38.8,197.1c0,44.1,17.9,84.1,46.9,113.1l42.6-42.6c-18-18-29.2-43-29.2-70.4
					c0-54.9,44.7-99.6,99.6-99.6c27.5,0,52.4,11.2,70.4,29.2L311.8,84c-29-29-69-46.9-113.1-46.9C110.5,37.1,38.8,108.9,38.8,197.1z"/>
			</svg>
			<svg style={styles.logoText} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 400 400" xmlSpace="preserve">
			<path style={{fill:'#757575'}} d="M106,141c14.5,0,26.3,11.9,26.3,26.5c0,14.5-11.8,26.3-26.3,26.3H95.1v35.1H77.6V141H106z
			 M106,176.2c4.8,0,8.8-3.9,8.8-8.8c0-4.9-4-8.9-8.8-8.9H95.1v17.7H106z"/>
			<path style={{fill:'#757575'}} d="M183.5,141c5.9,0,11.7,1.1,17,3.4c5.3,2.3,9.9,5.4,13.9,9.4c4.1,4.1,7.3,8.8,9.4,14
			c2.4,5.4,3.5,11.2,3.5,17c0,6-1.1,11.8-3.5,17.2c-2.1,5.3-5.3,9.9-9.4,13.9c-4,4-8.7,7.3-13.9,9.4c-5.4,2.4-11.2,3.5-17,3.5h-17.7
			v-0.1h-7.1V141H183.5z M183.5,211.3c14.5,0,26.3-11.9,26.3-26.5c0-14.5-11.8-26.3-26.3-26.3h-7.3v52.8H183.5z"/>
			<path style={{fill:'#757575'}} d="M326.9,217.4c7.9-8.1,12.9-19.2,12.9-31.4c0-24.8-20.2-45-45-45s-45,20.2-45,45
			c0,24.8,20.2,45,45,45c4.9,0,9.6-0.8,14-2.2l20.2,4.7L326.9,217.4z M266.7,185.9c0-15.5,12.6-28,28-28c15.5,0,28,12.6,28,28
			c0,15.5-12.6,28-28,28C279.3,213.9,266.7,201.4,266.7,185.9z"/>
			</svg>
		</div>
		<div style={styles.callout}>
			<h1 style={styles.h1}>PDQ is a suite of learning tools to raise awareness in students to their digital foot prints</h1>
			<h3 style={styles.h3}>Nam malesuada maximus sem, quis dignissim eros tempor sed. Suspendisse scelerisque aliquam lorem vel mattis. Nam malesuada maximus sem, quis dignissim eros tempor sed.</h3>
			<RaisedButton label="Login" primary={true} style={styles.button}  />
		</div>
	</div>		
	);
};

let styles = {
	jumbotron: {
		display:'flex',
		flexDirection:'column',
		alignItems: 'center',
		backgroundColor:'#212121',
		alignSelf:'center',
		padding:'4rem 1rem'
	},
	logo:{
		display: 'block',
		flex:1,
		width:'25rem',
		alignSelf:'center',
		margin:'0 auto'
	},
	logoText:{
		display: 'block',
		width:'15rem',
		alignSelf:'center',
		margin:'0 auto',
		marginTop:'-4rem'
	},
	logoWrapper:{
		margin:'0 auto',
		flex:1,
		alignSelf:'center',
		alignItems: 'center',
  		justifyContent: 'center'
	},
	h1:{
		fontSize:'2.8rem',
		color:'#ffffff',
		fontFamily:'Lato',
		fontWeight:500,
		letterSpacing:'.04em',
	},
	h2:{
		color:'#ffffff',
		fontFamily:'Lato',
		fontWeight:300,
	},
	h3:{
		color:'#ffffff',
		fontFamily:'Lato',
		fontWeight:300,
		letterSpacing:'.03em',
		fontSize:'1.2rem',
		textRendering: 'optimizeLegibility',
		lineHeight:'1.6em',
		marginBottom:'2rem',
		textShadow: '1px 1px 1px rgba(0,0,0,0.004)',
		textRendering: 'optimizeLegibility !important'
	},
	callout:{
		maxWidth:'50rem',
	},
	button:{
		
	}

}

export default HomePage;
