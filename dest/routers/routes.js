"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/:id/edit-profile";
var CHANGE_PASSWORD = "/:id/change-password"; //Videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete";
var routes = {
  //   global: {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  //   },
  //   user: {
  users: USERS,
  userDetail: function userDetail() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref.fullRoute,
        id = _ref.id;

    return fullRoute && id ? "/users/".concat(id) : USER_DETAIL;
  },
  editProfile: function editProfile() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref2.fullRoute,
        id = _ref2.id;

    return fullRoute ? "/users/".concat(id, "/edit-profile") : EDIT_PROFILE;
  },
  changePassword: function changePassword() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref3.fullRoute,
        id = _ref3.id;

    return fullRoute ? "/users/".concat(id, "/change-password") : CHANGE_PASSWORD;
  },
  //   },
  //   video: {
  videos: VIDEOS,
  upload: function upload() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref4.fullRoute;

    return fullRoute ? "/videos".concat(UPLOAD) : UPLOAD;
  },
  videoDetail: function videoDetail() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref5.fullRoute,
        id = _ref5.id;

    return fullRoute && id ? "/videos/".concat(id) : VIDEO_DETAIL;
  },
  editVideo: function editVideo() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref6.fullRoute,
        id = _ref6.id;

    return fullRoute && id ? "/videos/".concat(id, "/edit") : EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fullRoute = _ref7.fullRoute,
        id = _ref7.id;

    return fullRoute && id ? "/videos/".concat(id, "/delete") : DELETE_VIDEO;
  } //   },

};
var _default = routes;
exports["default"] = _default;