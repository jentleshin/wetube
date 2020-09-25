"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/", _videoController.videos);
videoRouter.get(_routes["default"].upload, _videoController.upload);
videoRouter.get(_routes["default"].videoDetail, _videoController.videoDetail);
videoRouter.get(_routes["default"].editVideo, _videoController.editVideo);
videoRouter.get(_routes["default"].deleteVideo, _videoController.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;