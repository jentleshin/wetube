"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.editVideo = exports.videoDetail = exports.upload = exports.videos = exports.search = exports.home = void 0;

var home = function home(req, res) {
  return res.render("home", {
    pageTitle: "Home"
  });
};

exports.home = home;

var search = function search(req, res) {
  var searchingBy = req.query.term;
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy
  });
};

exports.search = search;

var videos = function videos(req, res) {
  return res.render("videos", {
    pageTitle: "Videos"
  });
};

exports.videos = videos;

var upload = function upload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.upload = upload;

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