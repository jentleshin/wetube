import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`Error on DB connection:${error}`);
db.once("open", handleOpen);
db.on("error", handleError);
// export const videos = [
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
