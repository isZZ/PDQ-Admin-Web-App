// modules
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import $script from 'scriptjs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

// textColor: darkBlack,
// alternateTextColor: white,
// canvasColor: white,
// borderColor: grey300,
// disabledColor: fade(darkBlack, 0.3),
// pickerHeaderColor: cyan500,
// clockCircleColor: fade(darkBlack, 0.07),
// shadowColor: fullBlack,

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// api
import FirebaseApi from './api/firebase';

// actions
import {authInitialized} from './actions/authActions';
import {ajaxCallError, beginAjaxCall} from './actions/ajaxStatusActions';

// components
import App from './components/App';

// Store
import initialState from './reducers/initialState';
import configureStore from './store/configureStore'; //eslint-disable-line import/default

// styles
import './sass/styles.scss'; 
import 'react-dates/lib/css/_datepicker.css';


//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

//import '../semantic/dist/semantic.min.css';
$script('https://maps.googleapis.com/maps/api/js?key=AIzaSyBP6Tr7YPKNXhLlXT7KjNRnrkk51sAvox0&onload=window.gapiCallback','google-maps');


// store initialization
const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

// Initialize Firebase Auth and then start the app
store.dispatch(beginAjaxCall());
FirebaseApi.initAuth()
	.then(
		user => {
			store.dispatch(authInitialized(user));
			ReactDOM.render(
				<AppContainer>
					<MuiThemeProvider muiTheme={muiTheme}>
						<Provider store={store}>
							<App history={history} store={store}/>
						</Provider>
					</MuiThemeProvider>
				</AppContainer>,
				rootEl
			);

			if (module.hot) {
				module.hot.accept('./components/App', () => {
					// If you use Webpack 2 in ES modules mode, you can
					// use <App /> here rather than require() a <NextApp />.
					const NextApp = require('./components/App').default;
					ReactDOM.render(
						<AppContainer>
							<Provider store={store}>
								<NextApp history={history} store={store}/>
							</Provider>
						</AppContainer>,
						rootEl
					);
				});
			}
		})
	.catch(
		error => {
			store.dispatch(ajaxCallError());
			console.error('error while initializing Firebase Auth'); // eslint-disable-line no-console
			console.error(error); // eslint-disable-line no-console
		});

const muiTheme = getMuiTheme({
 palette: {
		primary1Color: Colors.blue500,
		primary2Color: Colors.blue700,
		primary3Color: Colors.grey400,
		accent1Color: Colors.redA200,
		accent2Color: Colors.grey100,
		accent3Color: Colors.grey500,
		textColor: Colors.darkBlack,
		alternateTextColor: Colors.white,
		canvasColor: Colors.white,
		borderColor: Colors.grey300,
		disabledColor: fade(Colors.darkBlack, 0.3),
		pickerHeaderColor: Colors.cyan500,
		clockCircleColor: fade(Colors.darkBlack, 0.07),
		shadowColor: Colors.fullBlack
	},
	appBar: {
		height: 100,
		color:'red'
	}
});