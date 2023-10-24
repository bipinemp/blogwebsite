"use client";

import AddComment from "@/components/AddComment";
import { BlogLoadingChild } from "@/components/BlogLoading";
import BlogOptions from "@/components/BlogOptions";
import Container from "@/components/Container";
import AvatarDemo from "@/components/header/Avatar";
import { deleteBlog } from "@/components/queries/queries";
import { useBlogDetails, useUserDetails } from "@/hooks/blogs/use-blog";
import { formatDate } from "@/hooks/useFormatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  // User Details
  const { data } = useUserDetails(session?.data?.user?.email || "");

  // Blog details
  const { data: BlogData, isLoading } = useBlogDetails(id);

  console.log(BlogData?.blog.comments);

  // hook for formating the User's account creation date
  const formattedDate = formatDate(BlogData?.blog?.createdAt || "");

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

  // for deleting blog
  const handleBlogDelete = (id: string) => {
    const ans = confirm("Are you sure you want to Delete");
    if (ans) {
      DeleteBlog(id);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="mt-10">
          <BlogLoadingChild />
          <div className="w-[100px] mx-auto">
            <Loader2 className="w-16 h-16 text-gray-400 mt-20 animate-spin" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="">
        <div className="flex flex-col justify-between pb-3 border-[2px] mt-5 px-4 py-5 rounded-lg">
          <div className="mt-2 flex justify-between items-center gap-2 border-b border-zinc-400">
            <div className="flex gap-2 items-center mb-5">
              <AvatarDemo
                image={BlogData?.blog?.user?.image || ""}
                id={BlogData?.blog?.user?._id || ""}
              />

              <div className="flex flex-col">
                <p className="text-[0.85rem] font-semibold tracking-wide">
                  {BlogData?.blog?.user?.name}
                </p>
                <p className="text-[0.7rem] italic">{formattedDate}</p>
              </div>
            </div>
            {BlogData?.blog?.user._id === data?.userData?._id ? (
              <BlogOptions
                onDelete={() => handleBlogDelete(BlogData?.blog._id || "")}
                id={BlogData?.blog?._id || ""}
                blogId={BlogData?.blog?._id || ""}
              />
            ) : null}
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <h1 className="font-bold text-5xl tracking-wide flex gap-1 items-center">
              <ChevronRight className="w-4 h-4 font-bold" />
              {BlogData?.blog?.title}
            </h1>
            <p className="pl-5 mb-4 opacity-80 italic">
              &quot;{BlogData?.blog?.description}&quot;
            </p>
            <hr />
            <div
              className="ql-editor pl-5 opacity-80"
              dangerouslySetInnerHTML={{ __html: BlogData?.blog?.body || "" }}
            />
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

export default Page;
