export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  users:{
    users:{},
    isFetching: false,
    error: false
  },
  userMeta: {
    userMeta:{},
    isFetching: false,
    error: false
  },
  groups: {
    groups:{},
    isFetching: false,
    error: false
  },
  group: {
    group:{
      users:{}
    },
    isFetching: false,
    error: false
  },
  groupFeed:{
    isFetching:false,
    feedItems:[],
    feedItemsById:{},
    error:false,
    timeStart:false,
    timeEnd:false
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  tracking:{
    users:[],
    trackingData:{},
    timeStart:new Date(),
    timeEnd:new Date(),
    errors:false
  },
  ajaxCallsInProgress: 0
};
