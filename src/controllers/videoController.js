import routes from "../routers/routes";
import Video from "../models/Video";
import regeneratorRuntime from "regenerator-runtime"; //how?
import videoRouter from "../routers/videoRouter";

//problemetic because it import whole promise
import { promises as fs } from "fs";

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
  console.log(id);
  try {
    const { fileUrl } = await Video.findByIdAndDelete(id);
    console.log(fileUrl);

    (() => {
      try {
        fs.unlink(fileUrl);
        console.log("====succsessfully unlink");
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
