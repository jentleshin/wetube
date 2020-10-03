import express from "express";
import {
  getChangePassword,
  postChangePassword,
  getEditProfile,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import routes from "../routes";

export const userRouter = express.Router();

userRouter.get(routes.editProfile(), getEditProfile);
userRouter.post(routes.editProfile(), postEditProfile);
userRouter.get(routes.changePassword(), getChangePassword);
userRouter.post(routes.changePassword(), postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
