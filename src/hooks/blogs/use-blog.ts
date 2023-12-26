import {
  fetchBlogDetails,
  fetchSearchBlogs,
  fetchUserBlogs,
  fetchUserDetails,
  fetchUserProfile,
} from "@/components/queries/queries";
import {
  BlogDetail,
  Blogs,
  ProfileDetails,
  SearchResults,
} from "@/types/postTypes";
import { useQuery } from "@tanstack/react-query";

// for fetching user Details
export const useUserDetails = (email: string) => {
  const { data, isLoading, isError, error } = useQuery<ProfileDetails>({
    queryKey: ["profile", email],
    queryFn: () => fetchUserDetails(email),
    keepPreviousData: false,
  });

  return { data, isLoading, isError, error };
};

// for fetching Blog Details
export const useBlogDetails = (id: string) => {
  const { data, isLoading, isError, error, isFetched, refetch, isFetching } =
    useQuery<BlogDetail>({
      queryKey: ["blogDetails", id],
      queryFn: () => fetchBlogDetails(id),
      keepPreviousData: false,
    });

  return { data, isLoading, isError, error, isFetched, refetch, isFetching };
};

// for fetching userDetails using email
export const useFetchProfileDetails = (email: string) => {
  const { data, isLoading, isError, error } = useQuery<ProfileDetails>({
    queryKey: ["profiledetails", email],
    queryFn: () => fetchUserDetails(email),
  });

  return { data, isLoading, isError, error };
};

// for searching blogs
export const useSearchBlogs = (query: string) => {
  const { data, isLoading, isError, error } = useQuery<SearchResults>({
    queryKey: ["searchblog", query],

    queryFn: () => fetchSearchBlogs(query),
  });

  return { data, isLoading, isError, error };
};

// for fetching user profile details
export const useUserProfileDetails = (id: string) => {
  const { data: userData, isLoading: profileLoading } =
    useQuery<ProfileDetails>({
      queryKey: ["userprofile", id],
      queryFn: () => fetchUserProfile(id),
    });

  const { data: userBlogs, isLoading: blogsLoading } = useQuery<Blogs>({
    queryKey: ["userblogs", id],
    queryFn: () => fetchUserBlogs(id),
    // enabled: userData?.userData?._id !== null,
  });

  const userDataa = userData?.userData;

  return {
    userDataa,
    profileLoading,
    userBlogs,
    blogsLoading,
  };
};
