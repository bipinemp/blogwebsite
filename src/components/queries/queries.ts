import axios from "axios";

const BLOG_BASE_URL = "http://localhost:3000/api/blogs";
const PROFILE_BASE_URL = "http://localhost:3000/api/profile";

// for fetching all blogs the Feed of website
export const fetchAllBlogs = async (pageParam: number) => {
  try {
    const response = await axios.get(
      `${BLOG_BASE_URL}/readall?page=${pageParam}&limit=${10}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error;
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
