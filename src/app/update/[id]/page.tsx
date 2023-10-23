"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogDetails } from "@/hooks/blogs/use-blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "@/components/queries/queries";
import { Loader2 } from "lucide-react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] max-w-[900px] bg-gray-800 animate-pulse rounded-md"></div>
  ),
});

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [blogId, setBlogId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { data: BlogData, isLoading: BlogDataLoading } = useBlogDetails(id);
  // mutation function for updating Blog
  const { mutate: UpdateBlog, isLoading: UpdatingBlog } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      alert("Blog Updated Successfully");
    },
    onSettled(data) {
      router.push(`/details/${data?.updatedBlog?._id}`);
    },
    onError: () => alert("Something went wrong try again"),
  });

  if (BlogDataLoading) {
    return (
      <Container>
        <div className="max-w-[900px] mx-auto mt-10 flex flex-col gap-4 justify-center">
          <div className="bg-gray-700 animate-pulse rounded w-[170px] h-[30px]"></div>
          <div className="bg-gray-700 animate-pulse rounded w-full h-[35px]"></div>
          <div className="bg-gray-700 animate-pulse rounded w-full h-[35px]"></div>
          <div className="bg-gray-700 animate-pulse rounded w-full h-[300px]"></div>
          <div className="bg-gray-700 animate-pulse rounded-md w-full h-[40px]"></div>
        </div>
      </Container>
    );
  }

  if (!title || !description || !body || !blogId) {
    setTitle(BlogData?.blog?.title as string);
    setDescription(BlogData?.blog?.description as string);
    setBody(BlogData?.blog?.body as string);
    setBlogId(BlogData?.blog?._id as string);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogDataa = { blogId, title, body, description };
    UpdateBlog(blogDataa);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
  ];

  const module = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <Container>
      <div className="max-w-[900px] mx-auto mt-10 flex flex-col gap-5">
        <h1 className="text-xl font-bold tracking-widest underline underline-offset-8">
          Update Blog ::
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title..."
            className="border-zinc-500 text-lg"
          />

          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Description..."
            className="border-zinc-500 text-lg"
          />

          <div className="relative h-[300px]">
            <ReactQuill
              modules={module}
              theme="snow"
              value={body}
              onChange={setBody}
            />
          </div>

          <Button
            disabled={UpdatingBlog}
            variant="default"
            size="lg"
            className="font-bold tracking-wider text-[1rem]"
          >
            {UpdatingBlog ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Update Blog"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
