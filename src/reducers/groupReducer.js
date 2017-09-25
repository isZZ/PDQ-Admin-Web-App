import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function groupReducer(state = initialState.group, action) {
  console.log('GROUP ACTION');
  console.log(action);
  console.log('GROUP ACTION');
  switch (action.type) {
    case types.GROUP_FETCHING:
      return Object.assign({}, state, { isFetching:true, error:false });
    case types.GROUP_ERROR:
      return Object.assign({}, state, { isFetching:false, error:action.error });
    case types.GROUP_SUCCESS:
      return Object.assign({}, state, { isFetching:false, group:action.group, error:false });
    case types.GROUP_RESET:
      return Object.assign({}, state, { isFetching:false, group: {}, error:false });
    default:
      return state;
  }
}
