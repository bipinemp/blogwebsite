import { TBlogSchema } from "@/types/postTypes";
import axios from "axios";

// const BLOG_BASE_URL = process.env.BLOG_BASE_URL;
// const PROFILE_BASE_URL = process.env.PROFILE_BASE_URL;
const BLOG_BASE_URL = "http://localhost:3000/api/blogs";
const PROFILE_BASE_URL = "http://localhost:3000/api/profile";

// for creating a new blog
export const createNewBlog = async (blogData: TBlogSchema) => {
  try {
    const response = await axios.post(`${BLOG_BASE_URL}/create`, blogData);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// for commenting in blog
type COMMENTDATATYPE = {
  blogId: string;
  comment: string;
};

export const createNewComment = async (data: COMMENTDATATYPE) => {
  try {
    const response = await axios.post(
      `${BLOG_BASE_URL}/comment/${data.blogId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// for posting reply on comment
export type REPLYDATATYPE = {
  blogId: string;
  commentId: string;
  reply: string;
};

export const createNewReply = async (data: REPLYDATATYPE) => {
  try {
    const response = await axios.post(
      `${BLOG_BASE_URL}/reply?blogId=${data.blogId}&commentId=${data.commentId}`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for fetching all blogs the Feed of website
export const fetchAllBlogs = async (pageParam: number) => {
  try {
    const response = await axios.get(
      `${BLOG_BASE_URL}/readall?page=${pageParam}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// for upvoting blog
export const upvoteTheBlog = async (id: string) => {
  try {
    const response = axios.post(`${BLOG_BASE_URL}/upvote/${id}`);
    return response;
  } catch (error) {
    error;
  }
};

// for downvoting blog
export const downvoteTheBlog = async (id: string) => {
  try {
    const response = axios.post(`${BLOG_BASE_URL}/downvote/${id}`);
    return response;
  } catch (error) {
    error;
  }
};

// for fetching user Details like name , email , image , id , createdAt by using the email of currently logged In user
export const fetchUserDetails = async (email: string) => {
  try {
    const response = await axios.get(`${PROFILE_BASE_URL}/email/${email}`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// for fetching the Details of individual blog using it's id
export const fetchBlogDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BLOG_BASE_URL}/details/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// for deleting Blog
export const deleteBlog = async (id: string) => {
  try {
    const response = await axios.delete(`${BLOG_BASE_URL}/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

type BLOGDATATYPE = {
  blogId: string;
  title: string;
  description: string;
  body: string;
};

// for updating Blog
export const updateBlog = async (dataa: BLOGDATATYPE) => {
  try {
    const response = await axios.patch(
      `${BLOG_BASE_URL}/edit/${dataa.blogId}`,
      dataa
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// for searching blog
export const fetchSearchBlogs = async (query: string) => {
  try {
    const response = await axios.get(`${BLOG_BASE_URL}/search?query=${query}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

// for getting user's profile details using id
export const fetchUserProfile = async (id: string) => {
  try {
    const response = await axios.get(`${PROFILE_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// for getting the user's all blogs
export const fetchUserBlogs = async (id: string) => {
  try {
    const response = await axios.get(`${BLOG_BASE_URL}/readuserblogs/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
