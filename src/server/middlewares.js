import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WETUBE";
  res.locals.routes = routes;
  res.locals.user = req.user;
  next();
};

export const publicOnly = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const privateOnly = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
