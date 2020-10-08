import express from "express";
import {
  getChangePassword,
  postChangePassword,
  getEditProfile,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { localsUserVideo } from "../controllers/videoController";
import { privateOnly } from "../middlewares";
import routes from "../routes";

export const userRouter = express.Router();

userRouter.get(routes.editProfile(), privateOnly, getEditProfile);
userRouter.post(routes.editProfile(), postEditProfile);
userRouter.get(routes.changePassword(), privateOnly, getChangePassword);
userRouter.post(routes.changePassword(), postChangePassword);
userRouter.get(routes.userDetail(), privateOnly, localsUserVideo, userDetail);

export default userRouter;
