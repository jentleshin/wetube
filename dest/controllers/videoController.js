"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.editVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routers/routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//how?
var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee(req, res) {
    var _videos;

    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({});

          case 3:
            _videos = _context.sent;
            //what does it mean
            res.render("home", {
              pageTitle: "Home",
              videos: _videos
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: "Home",
              videos: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = function search(req, res) {
  var searchingBy = req.query.term;
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos: videos
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