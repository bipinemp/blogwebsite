import axios from "axios";

const BLOG_BASE_URL = "http://localhost:3000/api/blogs";
const PROFILE_BASE_URL = "http://localhost:3000/api/profile";

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
