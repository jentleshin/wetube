import express from "express";
import { postIncrementView } from "../controllers/videoController";
import routes from "../routes";

export const apiRouter = express.Router();

apiRouter.post(routes.incrementView(), postIncrementView);

export default apiRouter;
