import routes from "../routers/routes";
import Video from "../models/Video";
import regeneratorRuntime from "regenerator-runtime"; //how?

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); //what does it mean
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
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
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = (req, res) => {
  const id = req.params.id;
  res.render("editVideo", { pageTitle: "Edit Video", id });
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  const id = req.params.id;

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

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
