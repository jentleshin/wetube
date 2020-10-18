// import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const postAddComment = async (req, res) => {
  try {
    const {
      user: { id: creator },
      params: { id: videoId },
      body: { text },
    } = req;

    const newComment = await Comment.create({
      text,
      creator,
      video: videoId,
    });

    const video = await Video.findById(videoId);
    video.comments.push(newComment);
    video.save();

    const user = await User.findById(creator);
    user.comments.push(newComment);
    user.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.status(200);
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { video, creator } = await Comment.findByIdAndDelete(commentId);
    video.comments.pull(commentId);
    creator.comments.pull(commentId);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.status(200);
    res.end();
  }
};
