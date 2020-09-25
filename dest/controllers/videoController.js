"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.editVideo = exports.videoDetail = exports.upload = exports.videos = exports.search = exports.home = void 0;

var home = function home(req, res) {
  return res.send("home");
};

exports.home = home;

var search = function search(req, res) {
  return res.send("search");
};

exports.search = search;

var videos = function videos(req, res) {
  return res.send("videos");
};

exports.videos = videos;

var upload = function upload(req, res) {
  return res.send("upload");
};

exports.upload = upload;

var videoDetail = function videoDetail(req, res) {
  return res.send("videoDetail");
};

exports.videoDetail = videoDetail;

var editVideo = function editVideo(req, res) {
  return res.send("editVideo");
};

exports.editVideo = editVideo;

var deleteVideo = function deleteVideo(req, res) {
  return res.send("deleteVideo");
};

exports.deleteVideo = deleteVideo;