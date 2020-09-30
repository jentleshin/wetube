"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.userRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

exports.userRouter = userRouter;
userRouter.get(_routes["default"].editProfile(), _userController.getEditProfile);
userRouter.post(_routes["default"].editProfile(), _userController.postEditProfile);
userRouter.get(_routes["default"].changePassword(), _userController.getChangePassword);
userRouter.post(_routes["default"].changePassword(), _userController.postChangePassword);
userRouter.get(_routes["default"].userDetail(), _userController.userDetail);
var _default = userRouter;
exports["default"] = _default;