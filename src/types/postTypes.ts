import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(10, "Title is too short (minimum is 10 characters long)")
    .max(128, "Title is too Long (maximum is 128 characters)"),
  body: z
    .string()
    .nonempty("Body is required")
    .min(10, "Body is too short (minimum is 10 characters long)"),
});

export type TBlogSchema = z.infer<typeof blogSchema>;

// All blogs GET response
type UserDetail = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null;
  createdAt: string;
};

export type CommentType = {
  user: UserDetail;
  comment: string;
  _id: string;
  replies: [];
  createdAt: string;
};

export type Blog = {
  _id: string;
  user: UserDetail;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  upvotes: UserDetail[];
  downvotes: UserDetail[];
  __v: number;
};

export interface Blogs {
  message: string;
  blogs: Blog[];
}
