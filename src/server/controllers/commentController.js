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
    res.json({
      avatarUrl: user.avatarUrl,
      currentUserName: user.name,
      commentId: newComment.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.status(200);
  }
};

export const postDeleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const {
      video: videoId,
      creator: creatorId,
    } = await Comment.findByIdAndDelete(commentId);
    const video = await Video.findById(videoId);
    video.comments.pull(commentId);
    video.save();
    const creator = await User.findById(creatorId);
    creator.comments.pull(commentId);
    creator.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.status(200);
    res.end();
  }
};

export const deleteVideoComments = async (req, res, next) => {
  const comments = res.locals.comments;
  try {
    comments.forEach(async (commentId) => {
      //delete comment
      const { creator: creatorId } = await Comment.findByIdAndDelete(commentId);
      //delete comment from creator
      const creator = await User.findById(creatorId);
      creator.comments.pull(commentId);
      creator.save();
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
