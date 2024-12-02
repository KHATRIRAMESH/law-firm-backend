import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
      unique: false,
    },
    image: {
      type: String,
      required: false,
      default: "https://www.lawimperial.com/wp-content/uploads/2019/02/rsz_company_law-300x225.jpg",
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
