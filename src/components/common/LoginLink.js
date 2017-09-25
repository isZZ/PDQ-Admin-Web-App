import React from 'react';
import {Link} from 'react-router';
import {Menu} from 'semantic-ui-react';

const LoginLink = () => {
	return (
		<span>
			<Link to="/login"><Menu.Item name="login" activeClassName="active"   /></Link>
		</span>
	);
};

export default LoginLink;

// <Link to="/login" activeClassName="active">Login</Link>
