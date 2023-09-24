import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      minLength: 10,
      maxLength: 128,
      required: true,
    },
    body: {
      type: String,
      minLength: 10,
      required: true,
    },
  },
  { timestamps: true }
);

type BlogType = InferSchemaType<typeof schema>;

const Blog = mongoose?.models?.Blog || mongoose.model<BlogType>("Blog", schema);

export default Blog;
