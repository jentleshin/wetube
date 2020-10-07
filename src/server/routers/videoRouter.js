import express from "express";
import {
  deleteVideo,
  getEditVideo,
  postEditVideo,
  getUpload,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { privateOnly, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.upload(), privateOnly, getUpload);
videoRouter.post(routes.upload(), uploadVideo, postUpload);
//should change to creator only
videoRouter.get(routes.editVideo(), privateOnly, getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.deleteVideo(), privateOnly, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
