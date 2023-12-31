import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      minLength: 10,
      maxLength: 128,
      required: true,
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 30,
      required: true,
    },
    body: {
      type: String,
      minLength: 10,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    upvotes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    downvotes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        comment: {
          type: String,
          required: true,
        },
        replies: [
          {
            user: {
              type: mongoose.Types.ObjectId,
              ref: "user",
            },
            reply: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: () => Date.now(),
              immutable: true,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: () => Date.now(),
          immutable: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export type BlogType = InferSchemaType<typeof schema>;

const Blog = mongoose?.models?.Blog || mongoose.model<BlogType>("Blog", schema);

export default Blog;
