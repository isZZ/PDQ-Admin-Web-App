import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.USERS_FETCHING:
      return Object.assign({}, state, {
        isFetching:true,
        error:false});
    case types.USERS_ERROR:
      return Object.assign({}, state, {
        isFetching:false, 
        error:action.error});
    case types.USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching:false,
        users: Object.assign({}, state.users, action.users), 
        error:false});
    default:
      return state;
  }
}
