import routes from "../routes";
import Video from "../models/Video";
import { promises as fs } from "fs";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //what does it mean
    await Video.populate(videos, {
      path: "creator",
      select: { name: 1, avatarUrl: 1 },
    });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  try {
    const videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).sort({ _id: -1 });
    await Video.populate(videos, {
      path: "creator",
      select: { name: 1, avatarUrl: 1 },
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
    user: { _id: creator },
    user: currentUser,
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
      creator,
    });
    await currentUser.videos.push(newVideo.id);
    await currentUser.save();

    res.redirect(routes.videoDetail({ fullRoute: true, id: newVideo.id }));
  } catch (error) {
    console.log(error);
    //where to go?
  }
};

export const videoDetail = async (req, res) => {
  const id = req.params.id;

  try {
    const videoTemp = await Video.findById(id).populate({
      path: "comments",
      populate: "creator",
      options: { sort: { _id: 1 } },
    });
    const video = await videoTemp
      .populate({
        path: "creator",
        select: { name: 1, avatarUrl: 1 },
      })
      .execPopulate();
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
    user: currentUser,
  } = req;

  try {
    const { fileUrl } = await Video.findByIdAndDelete(id);

    await currentUser.videos.pull(id);
    await currentUser.save();

    fs.unlink(fileUrl);
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
    //TODO: add safe
  }
};

export const postIncrementView = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    video.views++;
    video.save();
    res.json(video.views);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.status(200);
  }
};
