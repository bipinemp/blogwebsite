"use client";

import AddComment from "@/components/AddComment";
import BlogOptions from "@/components/BlogOptions";
import Container from "@/components/Container";
import AvatarDemo from "@/components/header/Avatar";
import { useBlogDetails, useUserDetails } from "@/hooks/blogs/use-blog";
import { useFormatDate } from "@/hooks/useFormatDate";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = useSession();

  // User Details
  const { data } = useUserDetails(session?.data?.user?.email || "");

  // Blog details
  const { data: BlogData } = useBlogDetails(id);

  // hook for formating the User's account creation date
  const formattedDate = useFormatDate(BlogData?.blog?.createdAt || "");

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
                image={`${BlogData?.blog?.user?.image}`}
                id={BlogData?.blog?.user?._id || ""}
              />
              <div className="flex flex-col">
                <p className="text-[0.85rem] font-semibold tracking-wide">
                  {BlogData?.blog?.user?.name}
                </p>
                <p className="text-[0.7rem] italic">{formattedDate}</p>
              </div>
            </div>
            {BlogData?.blog?.user._id === data?.userData[0]?._id ? (
              <BlogOptions
                onDelete={handleBlogDelete}
                id={BlogData?.blog?._id || ""}
                blogId={BlogData?.blog?._id || ""}
              />
            ) : null}
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <h1 className="font-bold text-2xl tracking-wide flex gap-1 items-center">
              <ChevronRight className="w-4 h-4 font-bold" />
              {BlogData?.blog?.title}
            </h1>
            <p className="pl-5 opacity-80">{BlogData?.blog?.body}</p>
          </div>
        </div>
        <AddComment
          blogId={BlogData?.blog?._id || ""}
          blogDetails={BlogData?.blog || null}
        />
      </section>
    </Container>
  );
};

export default page;
