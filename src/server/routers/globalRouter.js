import express from "express";
import {
  postJoin,
  getJoin,
  getLogin,
  postLogin,
  logout,
  getGithubLogin,
  getGithubLoginCallback,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnly } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, publicOnly, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, publicOnly, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.ghLogin, publicOnly, getGithubLogin); //routes.js
globalRouter.get(routes.ghLoginCallback, getGithubLoginCallback); //routes.js

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
