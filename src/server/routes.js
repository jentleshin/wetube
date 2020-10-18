// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const CURRENT_USER_DETAIL = "/my-profile";
//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const GITHUB_LOGIN = "/auth/github";
const GITHUB_LOGIN_CALLBACK = "/auth/github/callback";
const FACEBOOK_LOGIN = "/auth/facebook";
const FACEBOOK_LOGIN_CALLBACK = "/auth/facebook/callback";
//API
const API = "/api";
const INCREMENT_VIEW = "/:id/increment-view";

const routes = {
  api: API,
  incrementView: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/api/${id}/${INCREMENT_VIEW}` : INCREMENT_VIEW,
  //   global: {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  //   },
  ghLogin: GITHUB_LOGIN,
  ghLoginCallback: GITHUB_LOGIN_CALLBACK,
  fbLogin: FACEBOOK_LOGIN,
  fbLoginCallback: FACEBOOK_LOGIN_CALLBACK,
  //   user: {
  users: USERS,
  userDetail: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/users/${id}` : USER_DETAIL,
  editProfile: ({ fullRoute } = {}) =>
    fullRoute ? `/users${EDIT_PROFILE}` : EDIT_PROFILE,
  changePassword: ({ fullRoute } = {}) =>
    fullRoute ? `/users/${CHANGE_PASSWORD}` : CHANGE_PASSWORD,
  currentUserDetail: ({ fullRoute } = {}) =>
    fullRoute ? `/users${CURRENT_USER_DETAIL}` : CURRENT_USER_DETAIL,
  //   },
  //   video: {
  videos: VIDEOS,
  upload: ({ fullRoute } = {}) => (fullRoute ? `/videos${UPLOAD}` : UPLOAD),
  videoDetail: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/videos/${id}` : VIDEO_DETAIL,
  editVideo: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/videos/${id}/edit` : EDIT_VIDEO,
  deleteVideo: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/videos/${id}/delete` : DELETE_VIDEO,
  //   },
};

export default routes;
