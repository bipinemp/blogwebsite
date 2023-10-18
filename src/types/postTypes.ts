import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(10, "Title is too short (minimum is 10 characters long)")
    .max(128, "Title is too Long (maximum is 128 characters)"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(10, "Description is too short (minimum is 10 characters long)")
    .max(50, "Description is too long (maximum is 30 characters)"),
  body: z
    .string()
    .nonempty("Body is required")
    .min(10, "Body is too short (minimum is 10 characters long)"),
});

export type TBlogSchema = z.infer<typeof blogSchema>;

// All blogs GET response
export type UserDetail = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null;
  createdAt: string;
};

export type ReplyType = {
  user: UserDetail;
  reply: string;
  _id: string;
  createdAt: string;
};

export type CommentType = {
  user: UserDetail;
  comment: string;
  _id: string;
  replies: ReplyType[];
  createdAt: string;
};

export type Blog = {
  _id: string;
  user: UserDetail;
  title: string;
  body: string;
  description: string;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  upvotes: UserDetail[];
  downvotes: UserDetail[];
  __v: number;
};

export interface Blogs {
  blogs: Blog[];
}

export interface BlogDetail {
  blog: Blog;
}

// for user profile ..
export type ProfileResponse = {
  message: string;
  userData: UserDetail[];
};

export type ProfileDetails = {
  message: string;
  userData: UserDetail;
};
