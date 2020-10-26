import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import Video from "./models/Video";

const creds = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3({
  credentials: creds,
  region: process.env.AWS_REGION,
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_VIDEO,
  }),
});
export const uploadVideoToAWS = multerVideo.single("videoFile");

export const deleteVideoFromAWS = async (req, res) => {
  try {
    const key = res.locals.fileUrl.split("video/")[1];
    const params = {
      Bucket: process.env.AWS_BUCKET_VIDEO,
      Key: key,
    };
    const response = await s3.deleteObject(params).promise();
    res.end();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_AVATAR,
  }),
});
export const uploadAvatarToAWS = multerAvatar.single("avatar");

export const deleteAvatarFromAWS = async (req, res) => {
  if (res.locals.avatarUrl) {
    try {
      const key = res.locals.avatarUrl.split("avatar/")[1];
      const params = {
        Bucket: process.env.AWS_BUCKET_AVATAR,
        Key: key,
      };
      const response = await s3.deleteObject(params).promise();
      res.end();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  } else {
    res.end();
  }
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WETUBE";
  res.locals.routes = routes;
  res.locals.currentUser = req.user;
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
