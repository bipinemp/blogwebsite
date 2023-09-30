"use client";

import Container from "@/components/Container";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Blogs } from "@/types/postTypes";
import BlogDetails from "@/components/BlogDetails";
import { useFormatDate } from "@/hooks/useFormatDate";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null | undefined;
  createdAt: string;
}

export interface ProfileProps {
  message: string;
  userData: UserData;
}

const page = ({ params }: { params: { id: string } }) => {
  const [profileData, setProfileData] = useState<UserData>();
  const [blogs, setBlogs] = useState<Blogs>();
  const { id } = params;

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get<ProfileProps>(
        `http://localhost:3000/api/profile/${id}`
      );
      setProfileData(response?.data?.userData);
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      const getBlogs = async () => {
        const response = await axios.get<Blogs>(
          `http://localhost:3000/api/blogs/readuserblogs/${id}`
        );
        setBlogs(response?.data);
      };
      getBlogs();
    }
  }, [profileData]);

  const formattedDate = useFormatDate(`${profileData?.createdAt}`);

  return (
    <Container>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-4 items-center border-[2px] p-3 rounded-lg">
          <div>
            {profileData?.image !== undefined ? (
              <Image
                src={`${profileData?.image}`}
                width={100}
                height={100}
                alt="profile picture of user"
                className="rounded-full border-[5px] border-gray-800"
              />
            ) : null}
          </div>
          <h1 className="font-black text-xl tracking-widest">
            {profileData?.name}
          </h1>
          <h1 className="flex gap-2 items-center text-gray-500">
            <span>🎂 Joined On : </span>
            {formattedDate !== "undefined NaN, NaN" ? (
              formattedDate
            ) : (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
          </h1>
        </div>

        <div className="flex gap-5 justify-between">
          {blogs?.blogs.length !== undefined && blogs?.blogs.length !== 0 ? (
            <div className="min-w-[250px] h-[100px] flex gap-2 border-[2px] px-4 pt-5 rounded-lg">
              <FileText className="w-5 h-5" />
              <h1 className="text-gray-400">
                {blogs &&
                blogs?.blogs &&
                blogs?.blogs.length &&
                blogs?.blogs.length > 1 &&
                blogs?.blogs.length !== undefined
                  ? `${blogs?.blogs.length} blogs published`
                  : blogs?.blogs.length !== undefined
                  ? `${blogs?.blogs.length} blog published`
                  : null}
              </h1>
            </div>
          ) : null}
          <div className="w-full flex flex-col gap-5 mb-10">
            {blogs?.blogs.map((blog) => {
              return <BlogDetails blog={blog} key={blog._id} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
