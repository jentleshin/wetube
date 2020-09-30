import routes from "./routers/routes";
import multer from "multer";

const multerVideo = multer({ dest: "videos/" });
export const uploadVideo = multerVideo.single("videoFile");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    name: "haha123",
    id: "123123",
  };
  next();
};
