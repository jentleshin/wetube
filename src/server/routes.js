// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/:id/edit-profile";
const CHANGE_PASSWORD = "/:id/change-password";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  //   global: {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  //   },
  //   user: {
  users: USERS,
  userDetail: ({ fullRoute, id } = {}) =>
    fullRoute && id ? `/users/${id}` : USER_DETAIL,
  editProfile: ({ fullRoute, id } = {}) =>
    fullRoute ? `/users/${id}/edit-profile` : EDIT_PROFILE,
  changePassword: ({ fullRoute, id } = {}) =>
    fullRoute ? `/users/${id}/change-password` : CHANGE_PASSWORD,
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
