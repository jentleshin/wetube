import routes from "./routes";
import multer from "multer";
import Video from "./models/Video";

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

export const creatorOnly = async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;
  try {
    const video = await Video.findById(id);
    const isCreator = currentUser
      ? currentUser._id.equals(video.creator)
      : false;
    if (!isCreator) {
      res.redirect(routes.home);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
