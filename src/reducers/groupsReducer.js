import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function groupsReducer(state = initialState.groups, action) {
  switch (action.type) {
    case types.GROUPS_FETCHING:
      return Object.assign({}, state, { isFetching:true, error:false });
    case types.GROUPS_ERROR:
      return Object.assign({}, state, { isFetching:false, error:action.error });
    case types.GROUPS_SUCCESS:
      return Object.assign({}, state, { isFetching:false, groups: action.groups, error:false });
    default:
      return state;
  }
}
