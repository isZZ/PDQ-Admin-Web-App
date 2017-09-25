import React from 'react';
import {Link} from 'react-router';
import {Menu} from 'semantic-ui-react';

const AdminLink = () => {
  return (
	<Link to="admin"><Menu.Item name='admin'   /></Link>
  );
};

export default AdminLink;
