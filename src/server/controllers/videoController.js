import routes from "../routes";
import Video from "../models/Video";
// eslint-disable-next-line
import regeneratorRuntime from "regenerator-runtime";
import { promises as fs } from "fs";

export const localsCurrentUserVideo = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw "currentUser is not defined.";
    }

    const videos = await Video.find({
      creator: currentUser._id,
    }).sort({ _id: -1 });
    res.locals.videos = videos;
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const localsUserVideo = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const videos = await Video.find({
      creator: targetUserId,
    }).sort({ _id: -1 });
    res.locals.videos = videos;
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //what does it mean
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  try {
    const videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    res.render("search", { pageTitle: "Search", searchingBy, videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
    user: { _id: creator, name: creatorName },
  } = req;
  // const creatorName =
  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
      creator,
      creatorName,
    });
    res.redirect(routes.videoDetail({ fullRoute: true, id: newVideo.id }));
  } catch (error) {
    console.log(error);
    //where to go?
  }
};

export const videoDetail = async (req, res) => {
  const id = req.params.id;

  try {
    const video = await Video.findById(id);
    const currentUser = req.user;
    const isCreator = currentUser
      ? currentUser._id.equals(video.creator)
      : false;
    res.render("videoDetail", { pageTitle: "Video Detail", video, isCreator });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  res.render("editVideo", { pageTitle: "Edit Video", video });
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.redirect(routes.videoDetail({ fullRoute: true, id }));
  } catch (error) {
    console.log(error);
    //where to go when error?
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const { fileUrl } = await Video.findByIdAndDelete(id);

    (() => {
      try {
        fs.unlink(fileUrl);
      } catch (error) {
        console.error(error);
      }
    })();

    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
    //TODO: add safe
  }
};
