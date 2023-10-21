"use client";

import { Blog, ProfileDetails } from "@/types/postTypes";
import AvatarDemo from "./header/Avatar";
import {
  ChevronRight,
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useFormatDate } from "@/hooks/useFormatDate";
import BlogOptions from "./BlogOptions";
import { useRouter } from "next/navigation";

interface BlogProps {
  blog: Blog;
}

export default function BlogDetails({ blog }: BlogProps) {
  const session = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  const [upvote, setUpvote] = useState<number>(blog?.upvotes?.length);
  const [downvote, setDownvote] = useState<number>(blog?.downvotes?.length);

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      const getProfile = async () => {
        const response = await axios.get<ProfileDetails>(
          `http://localhost:3000/api/profile/email/${session?.data.user?.email}`
        );
        if (response.status === 200) {
          console.log(response.data);
          const id = response?.data?.userData?._id;
          if (id) {
            setUserId(id);
            const Isupvote =
              blog.upvotes &&
              blog.upvotes.some((upvote) => upvote._id === userId);

            const Isdownvote =
              blog.downvotes &&
              blog.downvotes.some((downvote) => downvote._id === userId);

            setUpvoted(Isupvote);

            setDownvoted(Isdownvote);
          }
        }
      };
      getProfile();
    }
  }, [session, blog, userId]);

  const handleBlogDelete = async (id: string) => {
    const ans = confirm("Are you sure you want to Delete");
    if (ans) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/blogs/delete/${id}`
        );
        if (response.status === 200) {
          alert("Blog deleted Successfully");
        }
      } catch (error: any) {
        alert(error?.message);
      }
    }
  };

  const formattedDate = useFormatDate(`${blog?.createdAt}`);

  const handleUpvote = async () => {
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
    } else {
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
      try {
        await axios.post(`http://localhost:3000/api/blogs/upvote/${blog?._id}`);
        router.refresh();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  };

  const handleDownvote = async () => {
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
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
    try {
      await axios.post(`http://localhost:3000/api/blogs/downvote/${blog?._id}`);
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  const actualVote = upvote - downvote;

  return (
    <div
      onClick={() => router.push(`/details/${blog?._id}`)}
      className="min-h-[220px] z-20 cursor-pointer border-[2px] border-zinc-500 rounded-lg p-4 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-zinc-400 pb-3">
        <div className="flex items-center gap-2">
          <AvatarDemo image={blog?.user?.image} id={blog?.user?._id} />

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
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-wide flex gap-1 items-center">
          <ChevronRight className="w-4 h-4 font-bold" /> {blog.title}
          <span className="text-xs text-gray-400">
            {blog?.edited ? "(edited)" : null}
          </span>
        </h1>
        <p className="pl-5 opacity-80">{blog?.description}</p>
      </div>
      <div className="flex gap-5 items-center pl-5">
        <div className="flex gap-1 items-center opacity-80">
          <ArrowBigUp
            onClick={(e) => {
              handleUpvote();
              e.stopPropagation();
            }}
            className={`${
              upvoted ? "fill-green-500 stroke-green-500" : ""
            } w-9 h-9 hover:bg-neutral-800 p-[0.2rem] rounded-full transition`}
          />
          <h3>{actualVote} </h3>
          <ArrowBigDown
            onClick={(e) => {
              handleDownvote();
              e.stopPropagation();
            }}
            className={`${
              downvoted ? "fill-red-500 stroke-red-500" : ""
            } w-9 h-9 hover:bg-neutral-800 p-[0.2rem] rounded-full transition`}
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
