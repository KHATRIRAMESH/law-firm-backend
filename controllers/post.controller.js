import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";

export const createPost = async (req, res, next) => {
  // console.log(`file`, req.file);
  
  console.log(`title`, req.body.title);

  
  console.log(`content`, req.body.content);
  
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
    
    //image upload handler
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // const cldRes = await uploadOnCloudinary(dataURI);
    console.log(`errortesting for file upload:`);

    const filePath = req.file.path;
    console.log(`file path:`, filePath);
    // console.log(`)
    const fileData = await fs.readFile(filePath); //Read file into memory
    console.log(`errortesting for file upload:`);
    
    const b64 = fileData.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    // console.log(`dataURI: ${dataURI}`);
    const cldRes = await uploadOnCloudinary(dataURI);
    
    // res.json(cldRes);
    console.log(`error testing`)

    await fs.unlink(filePath); // Delete the temporary file
    
    console.log(`imageurl: ${cldRes.url}`);
    // console.log(req.body, req.user.id);
    const newPost = new Post({
      ...req.body,
      image: cldRes.url,
      // author: req.user._id, // req.user.id,

      // userId: req.user.id,,
      // createdAt,
      slug,
    });

    // console.log(newPost);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Duplicate key error"));
    }
    // console.log(`error: ${error.message}`);
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.postId && { _id: req.query.postId }),
    }).sort({ createdAt: -1 }); // Sort by most recent first

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
  // console.log(req.params)
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(
  //     errorHandler(403, "You are not authorized to delete this post")
  //   );
  // }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  console.log(req.body);
  const slug = req.body.data.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  console.log(slug);
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.data.title,
          content: req.body.data.content,
          slug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
    console.log("updated successfully");
  } catch (error) {
    next(error);
  }
};
