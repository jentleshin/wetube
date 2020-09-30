"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localsMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routers/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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