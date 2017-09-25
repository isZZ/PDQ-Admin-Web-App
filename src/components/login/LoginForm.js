import React from 'react';
import TextInput from '../common/TextInput';
import {Form, Checkbox, Button, Icon} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import * as Colors from 'material-ui/styles/colors';

const LoginForm = ({user, onSave, onChange, saving, errors}) => {

	console.log('ERRORS');
	console.log(errors);

	return (
		<div style={styles.loginForm}>
			<div style={styles.fieldSet}>
				<TextField
					style={styles.textField}
					hintText="Email"
					floatingLabelText="Email"
					errorText={errors.email}
					errorStyle={styles.errorStyle}
					onChange={onChange}
					name="email" />
				<TextField
					style={styles.textField}
					hintText="Password"
					floatingLabelText="Password"
					type="password"
					errorText={errors.password}
					errorStyle={styles.errorStyle}
					onChange={onChange}
					name="password" />
			</div>
			<Divider />
			<div style={styles.actionsContainer}>
				<RaisedButton style={styles.button} label="Login" primary onTouchTap={onSave} />
			</div>
		</div>
	);
};

let styles = {
	loginForm: {
		textAlign:'left',
		flexDirection: 'column',
		flex:1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	fieldSet:{
		padding:'2rem 3rem 5rem'
	},
	textField:{
		display:'block',
		margin:'0 auto',
		width:'100%',
	},
	actionsContainer:{
		textAlign:'right',
		padding:'1rem 3rem'
	},
	errorStyle:{
		color:Colors.redA200
	}
};

LoginForm.propTypes = {
	onSave: React.PropTypes.func.isRequired,
	saving: React.PropTypes.bool,
	user: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errors: React.PropTypes.object.isRequired
};

export default LoginForm;
