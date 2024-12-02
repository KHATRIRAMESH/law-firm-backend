import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  // if (!req.user || !req.user.isAdmin) {
  //   return next(errorHandler(403, "Unauthorized"));
  // }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }

  // Generate slug
  const slug = req.body.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check for unique slug
  try {
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return next(errorHandler(400, "A post with this title already exists"));
    }

    // console.log(req.body, req.user.id);
    const newPost = new Post({
      ...req.body,
      // userId: req.user.id,
      slug,
    });

    // console.log(newPost);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Duplicate key error"));
    }
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.title && { title: req.query.title }),
    }).sort({ createdAt: -1 }); // Sort by most recent first
    // .populate('userId', 'username'); // If you want to include user details

    console.log(`${posts}`);

    const totalPosts = await Post.countDocuments();
    res.status(200).json({
      posts: posts,
      totalPosts: totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this post")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this post")
    );
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
