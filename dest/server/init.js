"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;

var handleListening = function handleListening() {
  return console.log("Listening on https://localhost:".concat(PORT));
};

_app["default"].listen(4000, handleListening);