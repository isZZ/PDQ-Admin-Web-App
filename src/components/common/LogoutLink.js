import React from 'react';
import {Menu} from 'semantic-ui-react';

const LogoutLink = ({signOut}) => {
  return <Menu.Item name='logout'  onClick={ signOut }  />;
};

LogoutLink.propTypes = {
  signOut: React.PropTypes.func.isRequired
};

export default LogoutLink;
