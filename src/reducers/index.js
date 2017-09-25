import {combineReducers} from 'redux';
import user from './userReducer';
import userMeta from './userMetaReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import groups from './groupsReducer';
import group from './groupReducer';
import groupFeed from './groupFeedReducer';
import users from './usersReducer';
import tracking from './trackingReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  userMeta,
  auth,
  ajaxCallsInProgress,
  groups,
  group,
  groupFeed,
  users,
  tracking
});

export default rootReducer;
