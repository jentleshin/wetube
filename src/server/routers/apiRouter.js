import express from "express";
import { postAddComment } from "../controllers/commentController";
import { postIncrementView } from "../controllers/videoController";
import routes from "../routes";

export const apiRouter = express.Router();

apiRouter.post(routes.incrementView(), postIncrementView);
apiRouter.post(routes.addComment(), postAddComment);

export default apiRouter;
