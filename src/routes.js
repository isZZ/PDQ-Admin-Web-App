import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import ProtectedPage from './components/protected/ProtectedPage';
import UserMetaPage from './components/userMeta/UserMetaPage';
import AboutPage from './components/about/AboutPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import GroupPage from './components/groups/GroupPage'; //eslint-disable-line import/no-named-as-default
import TrackingPage from './components/tracking/TrackingPage'; //eslint-disable-line import/no-named-as-default
import {requireAdmin} from './actions/authActions';
import GroupFeedPage from './components/groupFeed/GroupFeedPage';

export default function Routes(store) {

  const checkAdmin = ( nextState, replace, callback ) => {
    store.dispatch( requireAdmin(nextState, replace, callback) );
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path="layout" component={Layout}/>
      <Route path="about" component={AboutPage}/>
      <Route path="protected" component={ProtectedPage}/>
      <Route path="admin" component={AdminPage} onEnter={checkAdmin}/>
      <Route path="userMeta" component={UserMetaPage} onEnter={checkAdmin}/>
      <Route path="groupFeed" component={GroupFeedPage} onEnter={checkAdmin}/>
      <Route path="login" component={LoginPage}/>
      <Route path="group" component={GroupPage} onEnter={checkAdmin}>
        <Route path="/group/:groupId" component={GroupPage} onEnter={checkAdmin}/>
      </Route>
      <Route path="trackingPage" component={TrackingPage} onEnter={checkAdmin}/>
    </Route>
  );
}
