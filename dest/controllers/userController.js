"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.editProfile = exports.userDetail = exports.logout = exports.login = exports.join = void 0;

var join = function join(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.join = join;

var login = function login(req, res) {
  return res.render("login", {
    pageTitle: "Log in"
  });
};

exports.login = login;

var logout = function logout(req, res) {
  return res.render("logout", {
    pageTitle: "Log out"
  });
};

exports.logout = logout;

var userDetail = function userDetail(req, res) {
  return res.render("userDetail", {
    pageTitle: "User Detail"
  });
};

exports.userDetail = userDetail;

var editProfile = function editProfile(req, res) {
  return res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.editProfile = editProfile;

var changePassword = function changePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "Change Password"
  });
};

exports.changePassword = changePassword;