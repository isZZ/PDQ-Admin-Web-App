import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';
import AdminLink from './AdminLink';
import {Segment, Menu, Header} from 'semantic-ui-react';

const MainHeader = ({loading, signOut, auth, user}) => {
  let loginLogoutLink = auth.isLogged ? <LogoutLink signOut={signOut} /> : <LoginLink />;
  let adminLink = user.isAdmin ? <AdminLink /> : null;
  return (
    <Segment clearing inverted padded className='main-header' >
      <Header floated='left' inverted>
        <Segment inverted>
          <Menu secondary inverted>
            <Link to="/"><Menu.Item name='home' activeClassName="active"  /></Link>
            <Link to="about"><Menu.Item name='about' activeClassName="active"  /></Link>
            {adminLink}
          </Menu>
        </Segment>
      </Header>
      <Header floated='right'>
        <Segment inverted>
          <Menu inverted secondary>
            {loginLogoutLink}
          </Menu>
        </Segment>
      </Header>
    </Segment>
  );
};

// Header.propTypes = {
//   signOut: React.PropTypes.func.isRequired,
//   auth: React.PropTypes.object.isRequired,
//   user: React.PropTypes.object.isRequired,
//   loading: PropTypes.bool.isRequired
// };

export default MainHeader;
