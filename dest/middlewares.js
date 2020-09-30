"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localsMiddleware = exports.uploadVideo = void 0;

var _routes = _interopRequireDefault(require("./routers/routes"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multerVideo = (0, _multer["default"])({
  dest: "videos/"
});
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "Wetube";
  res.locals.routes = _routes["default"];
  res.locals.user = {
    isAuthenticated: true,
    name: "haha123",
    id: "123123"
  };
  next();
};

exports.localsMiddleware = localsMiddleware;