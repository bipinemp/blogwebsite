"use client";

import { Blog } from "@/types/postTypes";
import AvatarDemo from "./header/Avatar";
import {
  ChevronRight,
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { formatDate } from "@/hooks/useFormatDate";
import BlogOptions from "./BlogOptions";
import { useRouter } from "next/navigation";
import { useFetchProfileDetails } from "@/hooks/blogs/use-blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, downvoteTheBlog, upvoteTheBlog } from "./queries/queries";
import { useTheme } from "next-themes";

interface BlogProps {
  blog: Blog;
}

export default function BlogDetails({ blog }: BlogProps) {
  const { theme } = useTheme();
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // for fetching user Details using email
  const { data } = useFetchProfileDetails(session?.data?.user?.email || "");

  const userId = (data && data?.userData?._id) || "";

  const [upvote, setUpvote] = useState<number>(blog?.upvotes?.length);
  const [downvote, setDownvote] = useState<number>(blog?.downvotes?.length);

  let upvoteFind =
    blog?.upvotes && blog?.upvotes.some((upvote) => upvote._id === userId);

  let downvoteFind =
    blog?.downvotes &&
    blog?.downvotes.some((downvote) => downvote._id === userId);

  const [upvoted, setUpvoted] = useState(upvoteFind);
  const [downvoted, setDownvoted] = useState(downvoteFind);

  // for giving the initial state to upvote and downvote of the blog
  useEffect(() => {
    const Isupvote =
      blog?.upvotes && blog?.upvotes.some((upvote) => upvote._id === userId);

    const Isdownvote =
      blog?.downvotes &&
      blog?.downvotes.some((downvote) => downvote._id === userId);

    setUpvoted(Isupvote);

    setDownvoted(Isdownvote);
  }, [data, blog, userId]);

  // muation function for deleting blog
  const { mutate: DeleteBlog } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      alert("Blog deleted Successfully");
      router.push("/");
    },
    onError: () => alert("something went wrong try again"),
  });

  const handleBlogDelete = (id: string) => {
    const ans = confirm("Are you sure you want to Delete");
    if (ans) {
      DeleteBlog(id);
    }
  };

  // hook for formating the date of blog created

  const formattedDate = useMemo(
    () => formatDate(blog?.createdAt),
    [blog?.createdAt]
  );

  // mutation function for upvoting
  const { mutate: UpvoteMutation } = useMutation({
    mutationFn: upvoteTheBlog,

    onMutate: async (updatedBlogId) => {
      await queryClient.cancelQueries(["blogs"]);

      const previousData = queryClient.getQueriesData(["blogs"]);

      const optimisticBlog = {
        ...blog,
        upvotes: upvoted
          ? blog?.upvotes.filter((user) => user._id !== userId)
          : [...blog.upvotes, userId],

        downvotes: downvoted
          ? blog.downvotes.filter((user) => user?._id !== userId)
          : blog.downvotes,
      };

      queryClient.setQueryData(["blogs", blog?._id], optimisticBlog);

      return { updatedBlogId, previousData };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(["blogs", context?.previousData], blog);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleUpvote = () => {
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }
    setDownvoted(false);
    if (!upvoted && downvoted) {
      setUpvote(upvote + 1);
      setDownvote(downvote - 1);
    } else if (!upvoted && !downvoted) {
      setUpvote(upvote + 1);
    } else {
      setUpvote(upvote - 1);
    }
    setUpvoted(!upvoted);
    UpvoteMutation(blog?._id);
  };

  // mutation function for downvoting
  const { mutate: DownvoteMutation } = useMutation({
    mutationFn: downvoteTheBlog,

    onMutate: async (updatedBlogId) => {
      await queryClient.cancelQueries(["blogs"]);

      const previousData = queryClient.getQueriesData(["blogs"]);

      const optimisticBlog = {
        ...blog,
        upvotes: upvoted
          ? blog?.upvotes.filter((user) => user._id !== userId)
          : blog.upvotes,

        downvotes: downvoted
          ? blog.downvotes.filter((user) => user?._id !== userId)
          : [...blog.downvotes, userId],
      };

      queryClient.setQueryData(["blogs", blog?._id], optimisticBlog);

      return { updatedBlogId, previousData };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(["blogs", context?.previousData], blog);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleDownvote = () => {
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }
    setUpvoted(false);
    if (!downvoted && upvoted) {
      setDownvote(downvote + 1);
      setUpvote(upvote - 1);
    } else if (!upvoted && !downvoted) {
      setDownvote(downvote + 1);
    } else {
      setDownvote(downvote - 1);
    }
    setDownvoted(!downvoted);
    DownvoteMutation(blog?._id);
  };

  return (
    <div
      key={blog?._id}
      className="min-h-[220px] cursor-pointer border-[2px] border-zinc-500 rounded-lg p-4 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-zinc-400 pb-3">
        <div className="flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger>
              <AvatarDemo image={blog?.user?.image} id={blog?.user?._id} />
            </HoverCardTrigger>
            <HoverCardContent className="w-fit z-30">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 justify-between">
                  <AvatarDemo image={blog?.user?.image} id={blog?.user?._id} />
                  <div className="flex flex-col">
                    <h3>{blog?.user.name}</h3>
                    <p className="text-xs text-gray-400 tracking-wide">
                      {blog?.user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(`/profile/${blog?.user?._id}`)}
                >
                  View Profile
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div className="flex flex-col">
            <p className="text-[0.85rem]  font-semibold tracking-wide">
              {blog?.user?.name}
            </p>
            <p className="text-[0.7rem] italic">{formattedDate}</p>
          </div>
        </div>

        {blog?.user?._id === userId ? (
          <BlogOptions
            onDelete={handleBlogDelete}
            id={blog?._id}
            blogId={blog?._id || ""}
          />
        ) : null}
      </div>
      <div
        onClick={() => router.push(`/details/${blog?._id}`)}
        className="flex flex-col gap-2"
      >
        <h1 className="font-bold text-2xl tracking-wide flex gap-1 items-center">
          <ChevronRight className="w-4 h-4 font-bold" /> {blog?.title}
          <span className="text-xs text-gray-400">
            {blog?.edited ? "(edited)" : null}
          </span>
        </h1>
        <p className="pl-5 opacity-80">{blog?.description}</p>
      </div>
      <div
        onClick={() => router.push(`/details/${blog?._id}`)}
        className="flex gap-5 items-center pl-5"
      >
        <div className="flex gap-1 items-center opacity-80">
          <ArrowBigUp
            onClick={(e) => {
              handleUpvote();
              e.stopPropagation();
            }}
            className={`${
              upvoted ? "fill-green-500 stroke-green-500" : ""
            } w-9 h-9 ${
              theme === "light"
                ? "hover:bg-neutral-300"
                : "hover:bg-neutral-800"
            } p-[0.2rem] rounded-full transition`}
          />
          <h3 className="w-[20px] text-center">{upvote - downvote} </h3>
          <ArrowBigDown
            onClick={(e) => {
              handleDownvote();
              e.stopPropagation();
            }}
            className={`${
              downvoted ? "fill-red-500 stroke-red-500" : ""
            } w-9 h-9 ${
              theme === "light"
                ? "hover:bg-neutral-300"
                : "hover:bg-neutral-800"
            } hover:bg-neutral-800 p-[0.2rem] rounded-full transition`}
          />
        </div>
        <div>
          {blog?.comments?.length > 0 ? (
            <Button size="sm" variant="ghost" className="flex gap-2 opacity-80">
              <MessageCircle className="w-5 h-5" />{" "}
              <p>
                {blog?.comments?.length}{" "}
                {blog?.comments?.length === 1 && blog?.comments.length > 0
                  ? "Comment"
                  : "Comments"}
              </p>
            </Button>
          ) : (
            <Button size="sm" variant="ghost" className="flex gap-2 opacity-80">
              <MessageCircle className="w-5 h-5" /> Add Comment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
