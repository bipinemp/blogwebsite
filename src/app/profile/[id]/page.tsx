"use client";

import Container from "@/components/Container";
import Image from "next/image";
import { FileText } from "lucide-react";
import { Loader2 } from "lucide-react";
import BlogDetails from "@/components/BlogDetails";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useFetchUserBlogs, useUserProfile } from "@/hooks/blogs/use-blog";
import { UserProfileLoading } from "@/components/BlogLoading";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // for user profild details like name image
  const { userData, isLoading } = useUserProfile(id);
  // for user's specific blogs
  const { data: AllBlogs, isLoading: BlogsLoading } = useFetchUserBlogs(id);

  if (isLoading) {
    return (
      <Container>
        <UserProfileLoading />
      </Container>
    );
  }

  if (!isLoading && BlogsLoading) {
    return (
      <Container>
        <div className="mt-20">
          <div className="w-[100px] mx-auto">
            <Loader2 className="w-16 h-16 text-gray-400 mt-20 animate-spin" />
          </div>
        </div>
      </Container>
    );
  }

  const formattedDate = useFormatDate(`${userData?.createdAt}`);

  return (
    <Container>
      <div className="flex flex-col gap-10 mt-10">
        <div className="min-h-[200px] flex flex-col gap-4 items-center border-[2px] p-3 rounded-lg">
          <div>
            {userData?.image !== undefined ? (
              <Image
                src={`${userData?.image}`}
                width={100}
                height={100}
                alt="profile picture of user"
                className="rounded-full border-[5px] border-gray-800"
              />
            ) : null}
          </div>
          <h1 className="font-black text-xl tracking-widest">
            {userData?.name}
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
          {AllBlogs?.blogs.length !== undefined &&
          AllBlogs?.blogs.length !== 0 ? (
            <div className="min-w-[250px] h-[100px] flex gap-2 border-[2px] px-4 pt-5 rounded-lg">
              <FileText className="w-5 h-5" />
              <h1 className="text-gray-400">
                {AllBlogs &&
                AllBlogs?.blogs &&
                AllBlogs?.blogs.length &&
                AllBlogs?.blogs.length > 1 &&
                AllBlogs?.blogs.length !== undefined
                  ? `${AllBlogs?.blogs.length} blogs published`
                  : AllBlogs?.blogs.length !== undefined
                  ? `${AllBlogs?.blogs.length} blog published`
                  : null}
              </h1>
            </div>
          ) : null}
          <div className="w-full flex flex-col gap-5 mb-10">
            {AllBlogs?.blogs.map((blog) => {
              return <BlogDetails blog={blog} key={blog._id} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
