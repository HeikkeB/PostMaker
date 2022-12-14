/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import BadRequest from '../errors/BadRequest.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res, next) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) return res.json({ message: 'Comment cannot be empty' });

    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }
    res.json(newComment);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      next(new BadRequest('Incorrect data entered'));
    }
  }
};
