import express from "express";
import { deleteVideoComments } from "../controllers/commentController";
import {
  deleteVideo,
  getEditVideo,
  postEditVideo,
  getUpload,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import {
  creatorOnly,
  deletVideoFromAWS,
  privateOnly,
  uploadVideo,
} from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.upload(), privateOnly, getUpload);
videoRouter.post(routes.upload(), uploadVideo, postUpload);
//should change to creator only
videoRouter.get(routes.editVideo(), creatorOnly, getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(
  routes.deleteVideo(),
  creatorOnly,
  deleteVideo,
  deleteVideoComments,
  deletVideoFromAWS
);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
