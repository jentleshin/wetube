"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.editProfile = exports.userDetail = exports.users = exports.logout = exports.login = exports.join = void 0;

var join = function join(req, res) {
  return res.send("join");
};

exports.join = join;

var login = function login(req, res) {
  return res.send("login");
};

exports.login = login;

var logout = function logout(req, res) {
  return res.send("logout");
};

exports.logout = logout;

var users = function users(req, res) {
  return res.send("users");
};

exports.users = users;

var userDetail = function userDetail(req, res) {
  return res.send("userDetail");
};

exports.userDetail = userDetail;

var editProfile = function editProfile(req, res) {
  return res.send("editProfile");
};

exports.editProfile = editProfile;

var changePassword = function changePassword(req, res) {
  return res.send("changePassword");
};

exports.changePassword = changePassword;