"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _routes = _interopRequireDefault(require("../routers/routes"));

var _userRouter = _interopRequireDefault(require("../routers/userRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = function postJoin(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      password2 = _req$body.password2;

  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "Join"
    });
  } else {
    //Todo: register user
    //Todo: login User
    res.redirect(_routes["default"].home);
  }
};

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Log in"
  });
};

exports.getLogin = getLogin;

var postLogin = function postLogin(req, res) {
  //Todo: Confirm login
  if (false) {
    res.status(400);
    res.render("login", {
      pageTitle: "Log in"
    });
  } else {
    //ToDo: Login User
    res.redirect(_routes["default"].home);
  }
};

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  //logout user
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var userDetail = function userDetail(req, res) {
  return res.render("userDetail", {
    pageTitle: "User Detail"
  });
};

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = function postEditProfile(req, res) {
  //change profile
  res.redirect(_routes["default"].userDetail({
    fullRoute: true,
    id: res.locals.user.id
  }));
};

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = function postChangePassword(req, res) {
  //change password
  res.redirect(_routes["default"].editProfile({
    fullRoute: true,
    id: res.locals.user.id
  }));
};

exports.postChangePassword = postChangePassword;