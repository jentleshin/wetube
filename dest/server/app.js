"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRouter = _interopRequireDefault(require("../routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("../routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("../routers/globalRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev"));
app.use("/", _globalRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/video", _videoRouter["default"]);
var _default = app;
exports["default"] = _default;