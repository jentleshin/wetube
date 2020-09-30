"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _videoController = require("../controllers/videoController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].join, _userController.getJoin);
globalRouter.post(_routes["default"].join, _userController.postJoin);
globalRouter.get(_routes["default"].login, _userController.getLogin);
globalRouter.post(_routes["default"].login, _userController.postLogin);
globalRouter.get(_routes["default"].logout, _userController.logout);
globalRouter.get(_routes["default"].search, _videoController.search);
var _default = globalRouter;
exports["default"] = _default;