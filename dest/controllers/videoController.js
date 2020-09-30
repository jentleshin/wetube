"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.editVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _db = require("../db");

var _routes = _interopRequireDefault(require("../routers/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = function home(req, res) {
  res.render("home", {
    pageTitle: "Home",
    videos: _db.videos
  });
};

exports.home = home;

var search = function search(req, res) {
  var searchingBy = req.query.term;
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos: _db.videos
  });
};

exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload = function postUpload(req, res) {
  var _req$body = req.body,
      file = _req$body.file,
      title = _req$body.title,
      description = _req$body.description; //upload and save video
  //fake id

  res.redirect(_routes["default"].videoDetail({
    fullRoute: true,
    id: 11111
  }));
};

exports.postUpload = postUpload;

var videoDetail = function videoDetail(req, res) {
  return res.render("videoDetail", {
    pageTitle: "Video Detail"
  });
};

exports.videoDetail = videoDetail;

var editVideo = function editVideo(req, res) {
  return res.render("editVideo", {
    pageTitle: "Edit Video"
  });
};

exports.editVideo = editVideo;

var deleteVideo = function deleteVideo(req, res) {
  return res.render("deleteVideo", {
    pageTitle: "Delete Video"
  });
};

exports.deleteVideo = deleteVideo;