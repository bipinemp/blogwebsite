"use client";

import AddComment from "@/components/AddComment";
import BlogOptions from "@/components/BlogOptions";
import Container from "@/components/Container";
import AvatarDemo from "@/components/header/Avatar";
import { useFormatDate } from "@/hooks/useFormatDate";
import { Blog, BlogDetail, ProfileResponse } from "@/types/postTypes";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = useSession();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      const getProfile = async () => {
        const response = await axios.get<ProfileResponse>(
          `http://localhost:3000/api/profile/email/${session?.data?.user?.email}`
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

  useEffect(() => {
    const getBlogDetails = async (id: string) => {
      const response = await axios.get<BlogDetail>(
        `http://localhost:3000/api/blogs/details/${id}`
      );
      setBlogDetails(response?.data?.blog);
    };
    getBlogDetails(id);
  }, [id]);

  const formattedDate = useFormatDate(blogDetails?.createdAt || "");

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

  return (
    <Container>
      <section className="">
        <div className="flex flex-col justify-between pb-3 border-[2px] mt-5 px-4 py-5 rounded-lg">
          <div className="mt-2 flex justify-between items-center gap-2 border-b border-zinc-400">
            <div className="flex gap-2 items-center mb-5">
              <AvatarDemo
                image={`${blogDetails?.user?.image}`}
                id={blogDetails?.user?._id || ""}
              />
              <div className="flex flex-col">
                <p className="text-[0.85rem] font-semibold tracking-wide">
                  {blogDetails?.user?.name}
                </p>
                <p className="text-[0.7rem] italic">{formattedDate}</p>
              </div>
            </div>
            {blogDetails?.user._id === userId ? (
              <BlogOptions
                onDelete={handleBlogDelete}
                id={blogDetails?._id}
                blogId={blogDetails?._id}
              />
            ) : null}
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <h1 className="font-bold text-2xl tracking-wide flex gap-1 items-center">
              <ChevronRight className="w-4 h-4 font-bold" />
              {blogDetails?.title}
            </h1>
            <p className="pl-5 opacity-80">{blogDetails?.body}</p>
          </div>
        </div>
        <AddComment
          blogId={blogDetails?._id || ""}
          blogDetails={blogDetails || null}
        />
      </section>
    </Container>
  );
};

export default page;
