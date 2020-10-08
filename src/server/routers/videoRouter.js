import express from "express";
import {
  deleteVideo,
  getEditVideo,
  postEditVideo,
  getUpload,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { creatorOnly, privateOnly, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.upload(), privateOnly, getUpload);
videoRouter.post(routes.upload(), uploadVideo, postUpload);
//should change to creator only
videoRouter.get(routes.editVideo(), creatorOnly, getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.deleteVideo(), creatorOnly, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
