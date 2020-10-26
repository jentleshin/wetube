import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import Video from "./models/Video";
//transfer
import fetch from "node-fetch";

const creds = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3({
  credentials: creds,
  region: "ap-northeast-1",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-jentleshin/video",
  }),
});
// const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");

export const deletVideoFromAWS = async (req, res) => {
  try {
    const key = res.locals.fileUrl.split("video/")[1];
    const params = {
      Bucket: "wetube-jentleshin/video",
      Key: key,
    };
    const response = await s3.deleteObject(params).promise();
    res.end();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// export const changeVideoFileUrl = async (req, res) => {
//   const videos = await Video.find({});
//   videos.forEach(async (video) => {
//     if (video.fileUrl.includes("video/")) {
//       return;
//     } else {
//       const copy = video.fileUrl + "video/076b09d7c04ace1e0bd39ce55d7d7cb9";
//       console.log(copy);
//       video.fileUrl = copy;
//       video.save();
//     }
//   });
// };
// export const transferVideo = async (req, res) => {
//   const videos = await Video.find({});
//   videos.forEach(async (video) => {
//     if (video.fileUrl.includes("uploads")) {
//       const fileName = video.fileUrl.split("videos/")[1];
//       console.log(fileName);
//       try {
//         //fetch
//         const response = await fetch(`http://localhost:4000/${video.fileUrl}`, {
//           method: "GET",
//         });

//         //upload to s3
//         const params = {
//           Bucket: "wetube-jentleshin",
//           Key: `${fileName}`,
//           Body: response.body,
//           ACL: "public-read",
//         };
//         const s3Response = await s3.upload(params).promise();

//         video.fileUrl = s3Response.Location;
//         video.save();
//       } catch (error) {
//         console.log(error);
//       } finally {
//         console.log(
//           `Upload success ${fileName}, location: ${s3Response.Location} saved
//           to ${video.fileUrl}`
//         );
//         res.end();
//       }
//     }
//   });
// };

const multerAvatar = multer({ dest: "uploads/avatars/" });
export const uploadAvatar = multerAvatar.single("avatar");

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
