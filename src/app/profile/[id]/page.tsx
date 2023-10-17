"use client";

import Container from "@/components/Container";
import Image from "next/image";
import { FileText } from "lucide-react";
import { Loader2 } from "lucide-react";
import BlogDetails from "@/components/BlogDetails";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useUserProfileDetails } from "@/hooks/blogs/use-blog";
import { UserProfileLoading } from "@/components/BlogLoading";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { userDataa, profileLoading, userBlogs, blogsLoading } =
    useUserProfileDetails(id);

  if (profileLoading) {
    return (
      <Container>
        <UserProfileLoading />
      </Container>
    );
  }

  const formattedDate = useFormatDate(`${userDataa?.createdAt}`);

  return (
    <Container>
      <div className="flex flex-col gap-10 mt-10">
        <div className="relative min-h-[200px] flex flex-col gap-4 items-center border-[2px] p-3 rounded-lg">
          <div>
            <Image
              src={`${userDataa?.image}`}
              width={100}
              height={100}
              alt="profile picture of user"
              className="rounded-full border-[5px] border-gray-800"
            />
          </div>
          <h1 className="font-black text-xl tracking-widest">
            {userDataa?.name}
          </h1>
          <h1 className="flex gap-2 items-center text-gray-500">
            <span>🎂 Joined On : </span>
            {formattedDate}
          </h1>
        </div>

        {!profileLoading && blogsLoading ? (
          <div className="mt-7">
            <div className="w-[100px] mx-auto">
              <Loader2 className="w-16 h-16 text-gray-400 mt-20 animate-spin" />
            </div>
          </div>
        ) : null}

        <div className="flex gap-5 justify-between">
          {userBlogs?.blogs ? (
            <div className="min-w-[250px] h-[100px] flex gap-2 border-[2px] px-4 pt-5 rounded-lg">
              <FileText className="w-5 h-5" />
              <h1 className="text-gray-400">
                {userBlogs?.blogs.length > 1
                  ? `${userBlogs?.blogs.length} blogs published`
                  : `${userBlogs?.blogs.length} blog published`}
              </h1>
            </div>
          ) : null}
          <div className="w-full flex flex-col gap-5 mb-10">
            {userBlogs?.blogs.map((blog) => {
              return <BlogDetails blog={blog} key={blog._id} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
