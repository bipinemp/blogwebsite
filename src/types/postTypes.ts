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
export type Blog = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: string | null;
  };
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Blogs {
  message: string;
  blogs: Blog[];
}
