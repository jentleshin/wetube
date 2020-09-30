"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("connected to DB");
};

var handleError = function handleError(error) {
  return console.log("Error on DB connection:".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError); // export const videos = [
//   {
//     id: 11111,
//     title: "awesome video",
//     description: "I love this",
//     views: 3213,
//     videoFile:
//       "https://archive.org/download/electricsheep-flock-244-32500-3/00244%3D32593%3D23650%3D23640.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 22222,
//     title: "spuer video",
//     description: "I love this",
//     views: 224,
//     videoFile:
//       "https://archive.org/download/electricsheep-flock-244-32500-3/00244%3D32593%3D23650%3D23640.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 33333,
//     title: "sex video",
//     description: "I love this",
//     views: 2224,
//     videoFile:
//       "https://archive.org/download/electricsheep-flock-244-32500-3/00244%3D32593%3D23650%3D23640.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
// ];