"use client";

import { Blog } from "@/types/postTypes";
import AvatarDemo from "./header/Avatar";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useFormatDate } from "@/hooks/useFormatDate";
import BlogOptions from "./BlogOptions";
import { useRouter } from "next/navigation";

interface BlogProps {
  blog: Blog;
}

type UserData = {
  email: string;
  emailVerified: string | null;
  image: string;
  name: string;
  _id: string;
};

export type ProfileResponse = {
  message: string;
  userData: UserData[];
};

export default function BlogDetails({ blog }: BlogProps) {
  const session = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      const getProfile = async () => {
        const response = await axios.get<ProfileResponse>(
          `http://localhost:3000/api/profile/email/${session?.data.user?.email}`
        );
        if (response.status === 200) {
          const id = response?.data?.userData[0]?._id;
          if (id) {
            setUserId(id);
          }
        }
      };
      getProfile();
    }
  }, [session]);

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

  return (
    <div
      onClick={() => router.push(`/details/${blog?._id}`)}
      className="z-20 cursor-pointer border-[2px] border-zinc-500 rounded-lg p-4 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-zinc-400 pb-3">
        <div className="flex items-center gap-2">
          <AvatarDemo image={`${blog.user.image}`} id={blog?.user?._id} />
          <div className="flex flex-col">
            <p className="text-[0.85rem]  font-semibold tracking-wide">
              {blog.user.name}
            </p>
            <p className="text-[0.7rem] italic">{formattedDate}</p>
          </div>
        </div>

        {blog.user._id === userId ? (
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
        </h1>
        <p className="pl-5 opacity-80">{blog.body}</p>
      </div>
    </div>
  );
}
