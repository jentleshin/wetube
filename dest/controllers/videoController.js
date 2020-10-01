"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

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

var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee2(req, res) {
    var _req$body, title, description, path, newVideo;

    return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, path = req.file.path;
            _context2.prev = 1;
            _context2.next = 4;
            return _Video["default"].create({
              fileUrl: path,
              title: title,
              description: description
            });

          case 4:
            newVideo = _context2.sent;
            res.redirect(_routes["default"].videoDetail({
              fullRoute: true,
              id: newVideo.id
            }));
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0); //where to go?

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee3(req, res) {
    var id, video;
    return _regeneratorRuntime["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context3.sent;
            res.render("videoDetail", {
              pageTitle: "Video Detail",
              video: video
            });
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function videoDetail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = function getEditVideo(req, res) {
  var id = req.params.id;
  res.render("editVideo", {
    pageTitle: "Edit Video",
    id: id
  });
};

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee4(req, res) {
    var _req$body2, title, description, id;

    return _regeneratorRuntime["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            id = req.params.id;
            _context4.prev = 2;
            _context4.next = 5;
            return _Video["default"].findByIdAndUpdate(id, {
              title: title,
              description: description
            });

          case 5:
            res.redirect(_routes["default"].videoDetail({
              fullRoute: true,
              id: id
            }));
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0); //where to go when error?

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8]]);
  }));

  return function postEditVideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = function deleteVideo(req, res) {
  return res.render("deleteVideo", {
    pageTitle: "Delete Video"
  });
};

exports.deleteVideo = deleteVideo;