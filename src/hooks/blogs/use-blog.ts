import {
  deleteBlog,
  fetchBlogDetails,
  fetchUserDetails,
} from "@/components/queries/queries";
import { BlogDetail, ProfileResponse } from "@/types/postTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

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

// for deleting blog
export const useDeleteBlog = (id: string) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteBlog(id),
    onSuccess: () => {
      alert("Blog deleted Successfully");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => alert("something went wrong try again"),
  });

  return { mutate, isLoading };
};
