import {
  deleteBlog,
  fetchBlogDetails,
  fetchUserBlogs,
  fetchUserDetails,
  fetchUserProfile,
} from "@/components/queries/queries";
import {
  BlogDetail,
  Blogs,
  ProfileDetails,
  ProfileResponse,
} from "@/types/postTypes";
import { useQuery } from "@tanstack/react-query";

// for fetching user Details
export const useUserDetails = (email: string) => {
  const { data, isLoading, isError, error } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: () => fetchUserDetails(email),
  });

  return { data, isLoading, isError, error };
};

// for fetching Blog Details
export const useBlogDetails = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<BlogDetail>({
    queryKey: ["blogDetails", id],
    queryFn: () => fetchBlogDetails(id),
  });

  return { data, isLoading, isError, error };
};

// for fetching user profile details
export const useUserProfile = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<ProfileDetails>({
    queryKey: ["userprofile"],
    queryFn: () => fetchUserProfile(id),
  });

  const userData = data?.userData;

  return { userData, isLoading, isError, error };
};

// for fetching user's all personal blogs
export const useFetchUserBlogs = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<Blogs>({
    queryKey: ["userblogs"],
    queryFn: () => fetchUserBlogs(id),
  });

  return { data, isLoading, isError, error };
};
